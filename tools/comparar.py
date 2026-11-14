"""Compara la pagina con la linea base visual.

  python tools/comparar.py              compara; termina con error si algo cambio
  python tools/comparar.py --crear-base guarda la linea base (solo con aprobacion)
  python tools/comparar.py --libre      ademas genera hojas en movimiento normal (revision a ojo)

Capturas estables: reloj fijo, azar con semilla y "reducir movimiento" activo.
"""
import os, sys
from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright
from _comun import CHROME_ARGS, VISTAS, servir

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(AQUI, 'linea_base', 'capturas')
SALIDA = os.path.join(AQUI, 'salida')
UMBRAL_CANAL = 24      # diferencia minima por canal para contar un pixel
UMBRAL_PCT = 0.5       # % maximo de pixeles distintos por captura
FIJAR = """(() => { let s = 12345; Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647; })();"""
# En modo quieto cada cuadro recibe la misma marca de tiempo: lo que se dibuja una vez no depende del instante
TIEMPO_FIJO = """(() => { const o = window.requestAnimationFrame.bind(window); window.requestAnimationFrame = cb => o(() => cb(5000)); performance.now = () => 5000; })();"""
# Las animaciones CSS que siguen activas con "reducir movimiento" se llevan a su instante 0
# El orbe de AITI gira segun cuantas veces se redibuja: no es comparable al pixel. Se revisa a ojo con --libre.
OCULTAR = '#ait-orb { visibility: hidden !important; }'
CONGELAR = "document.getAnimations().forEach(a => { try { a.pause(); a.currentTime = 0; } catch (e) {} })"
PAGINAS = ['index.html', 'privacy.html', 'terms.html', '404.html']
# La portada esta lista cuando la escena 3D termino de construirse (sin .is-swapping) y el avance
# automatico quedo en su punto final (#rail-play en "end"; con "reducir movimiento" arranca ahi).
# Sin esta espera, un equipo cargado capturaba la portada a medio armar (escena en blanco, 0 areas).
LISTO = """() => { const i = document.getElementById('intro'), b = document.getElementById('rail-play');
  return !i || (!i.classList.contains('is-swapping') && b && b.dataset.state === 'end'); }"""


def esperar_portada(pg):
    pg.wait_for_function(LISTO, timeout=60000)


def capturar(pg, destino, pref, alto, quieto=True):
    """Recorre la pagina de pantalla en pantalla. Devuelve la lista de archivos."""
    if quieto:
        pg.add_style_tag(content=OCULTAR)
        esperar_portada(pg)
    pg.wait_for_timeout(3000)
    archivos, y, i = [], 0, 0
    total = pg.evaluate('document.documentElement.scrollHeight')
    while y < total:
        pg.evaluate(f'window.scrollTo(0,{y})')
        pg.wait_for_timeout(1500)
        if quieto:
            pg.evaluate(CONGELAR)
        f = os.path.join(destino, f'{pref}_{i:02d}.png')
        pg.screenshot(path=f)
        archivos.append(f)
        y += alto
        i += 1
    return archivos


def tomar(url, destino, quieto=True):
    os.makedirs(destino, exist_ok=True)
    for f in os.listdir(destino):
        if f.endswith('.png'):
            os.remove(os.path.join(destino, f))
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome', headless=True, args=CHROME_ARGS)
        for modo, vista in VISTAS.items():
            ctx = b.new_context(reduced_motion='reduce' if quieto else 'no-preference', **vista)
            ctx.add_init_script(FIJAR)
            if quieto:
                ctx.add_init_script(TIEMPO_FIJO)
            pg = ctx.new_page()
            pg.clock.set_fixed_time('2026-11-12T15:00:00-05:00')
            alto = vista['viewport']['height']
            for pagina in PAGINAS if quieto else PAGINAS[:1]:
                pg.goto(f'{url}/{pagina}', wait_until='load')
                capturar(pg, destino, f'{modo}_{pagina.split(".")[0]}', alto, quieto)
            # Portada con la mina subterranea
            pg.goto(f'{url}/index.html', wait_until='load')
            pg.wait_for_timeout(2500)
            pg.click('[data-mine="sub"]')
            pg.wait_for_timeout(500)
            if quieto:
                esperar_portada(pg)
            pg.wait_for_timeout(2000)
            pg.screenshot(path=os.path.join(destino, f'{modo}_sub_00.png'))
            ctx.close()
        b.close()


def diferencia(a, b):
    """% de pixeles que difieren entre dos capturas (100 si el tamano cambia)."""
    ia, ib = Image.open(a).convert('RGB'), Image.open(b).convert('RGB')
    if ia.size != ib.size:
        return 100.0
    d = ImageChops.difference(ia, ib).convert('L').point(lambda v: 255 if v > UMBRAL_CANAL else 0)
    return 100.0 * sum(1 for v in d.getdata() if v) / (ia.width * ia.height)


def hoja(archivos, destino, ancho=360, cols=6):
    ims = [Image.open(f).convert('RGB') for f in archivos]
    ims = [i.resize((ancho, int(i.height * ancho / i.width))) for i in ims]
    alto = max(i.height for i in ims)
    filas = (len(ims) + cols - 1) // cols
    h = Image.new('RGB', (cols * ancho, filas * alto), 'black')
    for k, i in enumerate(ims):
        h.paste(i, ((k % cols) * ancho, (k // cols) * alto))
    h.save(destino, quality=82)


def main():
    url = servir()
    if '--crear-base' in sys.argv:
        tomar(url, BASE)
        print('Linea base guardada:', len(os.listdir(BASE)), 'capturas')
        return 0
    actual = os.path.join(SALIDA, 'capturas')
    tomar(url, actual)
    base, act = sorted(os.listdir(BASE)), sorted(os.listdir(actual))
    fallas = []
    if base != act:
        fallas.append(f'cambio el numero o nombre de capturas: faltan {sorted(set(base) - set(act))}, sobran {sorted(set(act) - set(base))}')
    for f in sorted(set(base) & set(act)):
        pct = diferencia(os.path.join(BASE, f), os.path.join(actual, f))
        if pct > UMBRAL_PCT:
            fallas.append(f'{f}: {pct:.2f} % de pixeles distintos')
    if '--libre' in sys.argv:
        libre = os.path.join(SALIDA, 'libre')
        tomar(url, libre, quieto=False)
        for modo in VISTAS:
            hoja([os.path.join(libre, f) for f in sorted(os.listdir(libre)) if f.startswith(modo + '_')],
                 os.path.join(SALIDA, f'hoja_libre_{modo}.jpg'))
    if fallas:
        print('COMPARAR: FALLA')
        for x in fallas:
            print('  -', x)
        return 1
    print(f'COMPARAR: OK ({len(act)} capturas, ninguna supera {UMBRAL_PCT} %)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
