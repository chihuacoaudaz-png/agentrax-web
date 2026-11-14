"""Genera los favicons a partir de brand-app-icon.png.

  python tools/favicons.py            escribe favicon.ico, favicon-32.png, favicon-192.png,
                                      apple-touch-icon.png e icon-512.png en la raiz
  python tools/favicons.py --hoja X   ademas guarda en X una hoja de comparacion (16, 32, 180 px)

brand-app-icon.png es una captura del icono: un cuadro oscuro redondeado sobre un marco gris.
Se recorta solo el cuadro (detectado por umbral de oscuridad), se lleva a cuadrado y se le
aplica una mascara redondeada (esquinas transparentes; en apple-touch-icon, fondo oscuro solido).
A 16 y 32 px se usa un recorte mas cerrado del emblema para que la estrella se distinga.
"""
import os, sys
from PIL import Image, ImageDraw

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
FUENTE = os.path.join(RAIZ, 'brand-app-icon.png')
OSCURO = 330          # suma R+G+B por debajo de la cual un pixel es del cuadro oscuro
RADIO = 27 / 137      # radio de esquina del cuadro, como fraccion del lado (medido en la fuente)
MARGEN = 1.3          # px de la fuente que se recortan del borde para no arrastrar el gris del antialias
SS = 8                # sobremuestreo de la mascara


def caja_oscura(im):
    """Caja (x0, y0, x1, y1) del cuadro oscuro: filas y columnas con mas de 20 px oscuros."""
    w, h = im.size
    px = im.load()
    osc = lambda x, y: sum(px[x, y]) < OSCURO
    cols = [x for x in range(w) if sum(osc(x, y) for y in range(h)) > 20]
    filas = [y for y in range(h) if sum(osc(x, y) for x in range(w)) > 20]
    # La ultima fila suele ser la sombra inferior: solo cuenta si tiene oscuro en el centro
    while filas and not osc(w // 2, filas[-1]):
        filas.pop()
    return cols[0], filas[0], cols[-1] + 1, filas[-1] + 1


def mascara(n, radio):
    m = Image.new('L', (n * SS, n * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, n * SS - 1, n * SS - 1), radius=radio * n * SS, fill=255)
    return m.resize((n, n), Image.LANCZOS)


def cuadro(im, caja, n, zoom=1.0):
    """Recorte cuadrado de n px; zoom > 1 acerca al centro (emblema mas grande)."""
    x0, y0, x1, y1 = caja
    x0, y0, x1, y1 = x0 + MARGEN, y0 + MARGEN, x1 - MARGEN, y1 - MARGEN
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    hw, hh = (x1 - x0) / 2 / zoom, (y1 - y0) / 2 / zoom
    return im.resize((n, n), Image.LANCZOS, box=(cx - hw, cy - hh, cx + hw, cy + hh))


def redondeado(im, caja, n, zoom=1.0):
    out = cuadro(im, caja, n, zoom).convert('RGBA')
    out.putalpha(mascara(n, RADIO))
    return out


def solido(im, caja, n):
    """Cuadro completo sobre fondo oscuro: las esquinas toman el color del borde de su misma fila."""
    c = cuadro(im, caja, n).convert('RGB')
    fondo = Image.new('RGB', (n, n))
    px, fp = c.load(), fondo.load()
    for y in range(n):
        # Mezcla del borde izquierdo y derecho de la fila, en la franja media vertical (fuera de esquinas)
        lado = [px[2, min(max(y, n // 4), 3 * n // 4)], px[n - 3, min(max(y, n // 4), 3 * n // 4)]]
        col = tuple((lado[0][i] + lado[1][i]) // 2 for i in range(3))
        for x in range(n):
            fp[x, y] = col
    fondo.paste(c, (0, 0), mascara(n, RADIO))
    return fondo


def main():
    im = Image.open(FUENTE).convert('RGB')
    caja = caja_oscura(im)
    print('Cuadro oscuro detectado:', caja, f'({caja[2] - caja[0]}x{caja[3] - caja[1]} px)')
    chico = {16: redondeado(im, caja, 16, 1.25), 32: redondeado(im, caja, 32, 1.25), 48: redondeado(im, caja, 48)}
    # Pillow arma el .ico desde la imagen mas grande y toma las demas tal cual de append_images
    chico[48].save(os.path.join(RAIZ, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)],
                   append_images=[chico[16], chico[32]])
    chico[32].save(os.path.join(RAIZ, 'favicon-32.png'), optimize=True)
    redondeado(im, caja, 192).save(os.path.join(RAIZ, 'favicon-192.png'), optimize=True)
    redondeado(im, caja, 512).save(os.path.join(RAIZ, 'icon-512.png'), optimize=True)
    solido(im, caja, 180).save(os.path.join(RAIZ, 'apple-touch-icon.png'), optimize=True)
    print('Favicons escritos en', RAIZ)
    if '--hoja' in sys.argv:
        hoja(im, caja, sys.argv[sys.argv.index('--hoja') + 1])


def hoja(im, caja, destino):
    """Hoja: fila 1 sobre pestana clara, fila 2 sobre pestana oscura; cada icono a tamano real y ampliado x6."""
    piezas = [('16 cerrado', redondeado(im, caja, 16, 1.25)), ('16 completo', redondeado(im, caja, 16)),
              ('32 cerrado', redondeado(im, caja, 32, 1.25)), ('32 completo', redondeado(im, caja, 32)),
              ('180 apple', solido(im, caja, 180).convert('RGBA')), ('192', redondeado(im, caja, 192))]
    celda, pad = 220, 10
    h = Image.new('RGB', (celda * len(piezas), celda * 2 + 30), (255, 255, 255))
    d = ImageDraw.Draw(h)
    for fila, fondo in enumerate([(222, 225, 230), (32, 33, 36)]):
        for i, (nombre, ic) in enumerate(piezas):
            x0, y0 = i * celda, fila * celda
            d.rectangle((x0, y0, x0 + celda - 1, y0 + celda - 1), fill=fondo)
            n = ic.width
            if n <= 32:  # tamano real arriba a la izquierda y ampliado x5 (pixeles visibles)
                h.paste(ic, (x0 + pad, y0 + pad), ic)
                grande = ic.resize((n * 5,) * 2, Image.NEAREST)
                h.paste(grande, (x0 + celda - grande.width - pad, y0 + celda - grande.height - pad), grande)
            else:  # tamano real (192 se muestra a 180 para caber)
                ic = ic.resize((180, 180), Image.LANCZOS)
                h.paste(ic, (x0 + (celda - 180) // 2, y0 + (celda - 180) // 2), ic)
            if fila == 1:
                d.text((x0 + pad, celda * 2 + 8), nombre, fill=(0, 0, 0))
    h.save(destino)
    print('Hoja guardada en', destino)


if __name__ == '__main__':
    main()
