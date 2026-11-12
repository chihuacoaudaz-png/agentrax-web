"""Comprueba las metas de rendimiento y limpieza del plan.

  python tools/presupuesto.py            todas las metas
  python tools/presupuesto.py --tarea N  solo las exigibles hasta la tarea N
  python tools/presupuesto.py --textos   guarda el texto de las paginas legales como linea base

Termina con error si alguna meta no se cumple. Las cifras quedan en tools/salida/medidas_*.json
"""
import json, os, re, sys
from _comun import RAIZ
from medir import medir

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(AQUI, 'salida')
TEXTOS = os.path.join(AQUI, 'linea_base', 'textos')
BORRADOS = ['contexto.md', 'audit_gate4.py', 'render_preview.py', 'globals.css', 'logo.jpg',
            'brand-emblem-hi.png', 'brand-emblem.png', 'brand-industries.png', 'brand-pillars.png']
LEGALES = ['privacy.html', 'terms.html', '404.html']


def texto_visible(ruta):
    html = open(ruta, encoding='utf-8').read()
    html = re.sub(r'<(script|style)\b.*?</\1>', ' ', html, flags=re.S)
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', html)).strip()


def guardar_textos():
    os.makedirs(TEXTOS, exist_ok=True)
    for f in LEGALES:
        open(os.path.join(TEXTOS, f + '.txt'), 'w', encoding='utf-8').write(texto_visible(os.path.join(RAIZ, f)))


def metas(hasta):
    m, d = medir('m'), medir('d')
    os.makedirs(SALIDA, exist_ok=True)
    for k, v in (('m', m), ('d', d)):
        json.dump(v, open(os.path.join(SALIDA, f'medidas_{k}.json'), 'w'), indent=1)
    M, D = m['medidas'], d['medidas']
    portada = [v for k, v in M.items() if k.startswith('intro@')]
    pedidos = m['pedidos'] + d['pedidos']
    errores = m['errores'] + d['errores']
    R = []   # (tarea, descripcion, valor, cumple)

    def meta(t, desc, valor, ok):
        R.append((t, desc, valor, bool(ok)))

    def ms(seccion, funcion):
        return (M.get(seccion, {}).get('raf', {}).get(funcion) or [0, 0])[1]

    meta(1, 'sin errores de consola', len(errores), not errores)
    meta(1, 'index.html sin programa incrustado', m['incrustados'], m['incrustados'] == 0)
    x = sum('cdnjs.cloudflare.com' in p for p in pedidos)
    meta(1, 'sin pedidos a cdnjs', x, x == 0)
    x = max(v['over33'] for k, v in D.items() if k != 'recorrido')
    meta(1, 'escritorio: cuadros de mas de 34 ms por seccion <= 2', x, x <= 2)
    x = max(v['glDrawsPerFrame'] for v in portada)
    meta(2, 'portada: ordenes de dibujo por cuadro <= 120', x, x <= 120)
    x = max(v['raf'].get('introLoop', [0, 0])[1] for v in portada)
    meta(2, 'portada: introLoop <= 12 ms', x, 0 < x <= 12)
    x = min(v['fps'] for v in portada)
    meta(3, 'portada: cuadros por segundo >= 28', x, x >= 28)
    x = max([t[1] for t in m['long']] or [0])
    meta(3, 'bloqueo mas largo al abrir <= 800 ms', x, x <= 800)
    x = M['recorrido']['over50']
    meta(3, 'recorrido: tirones de mas de 50 ms <= 10', x, x <= 10)
    x = ms('productos', 'draw')
    meta(4, 'orbe AITI: draw <= 3 ms', x, 0 < x <= 3)
    x = ms('industrias', 'frame')
    meta(4, 'maqueta industrias: frame <= 3 ms', x, 0 < x <= 3)
    x = M['industrias']['glDrawsPerFrame']
    meta(4, 'maqueta industrias: ordenes de dibujo <= 60', x, 0 < x <= 60)
    meta(4, 'un solo contexto WebGL al abrir', m['webgl_al_abrir'], m['webgl_al_abrir'] == 1)
    x = sum('cdn.jsdelivr.net' in p for p in pedidos)
    meta(5, 'sin pedidos a jsdelivr', x, x == 0)
    x = sum('-660.webp' in p for p in m['pedidos'])
    meta(5, 'celular descarga las 3 fotos de 660 px', x, x == 3)
    x = [f for f in BORRADOS if os.path.exists(os.path.join(RAIZ, f))]
    meta(6, 'archivos internos o sin uso retirados (quedan)', len(x), not x)
    x = [p for p in pedidos if any(p.endswith('/' + f) for f in BORRADOS)]
    meta(6, 'ninguna pagina pide archivos retirados', len(x), not x)
    for f in LEGALES:
        ruta = os.path.join(RAIZ, f)
        con = 'cdn.tailwindcss.com' in open(ruta, encoding='utf-8').read()
        meta(8, f'{f} sin Tailwind por CDN', int(con), not con)
        base = open(os.path.join(TEXTOS, f + '.txt'), encoding='utf-8').read()
        igual = texto_visible(ruta) == base
        meta(8, f'{f} conserva el texto', 'igual' if igual else 'cambio', igual)
    return [r for r in R if r[0] <= hasta]


def main():
    if '--textos' in sys.argv:
        guardar_textos()
        print('Textos legales guardados')
        return 0
    hasta = int(sys.argv[sys.argv.index('--tarea') + 1]) if '--tarea' in sys.argv else 99
    R = metas(hasta)
    for t, desc, valor, ok in R:
        print(f"  [{'OK   ' if ok else 'FALLA'}] T{t} {desc}: {valor}")
    mal = [r for r in R if not r[3]]
    print('PRESUPUESTO: OK' if not mal else f'PRESUPUESTO: FALLA ({len(mal)} de {len(R)})')
    return 1 if mal else 0


if __name__ == '__main__':
    sys.exit(main())
