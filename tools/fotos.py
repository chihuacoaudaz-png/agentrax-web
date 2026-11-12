import sys, threading, http.server, socketserver, functools
from playwright.sync_api import sync_playwright
from PIL import Image
root, out = sys.argv[1], sys.argv[2]
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Q, directory=root))
port = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True, args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'])
    for mode, vp, dsf in (('d', {'width': 1440, 'height': 900}, 1), ('m', {'width': 390, 'height': 844}, 2)):
        ctx = b.new_context(viewport=vp, device_scale_factor=dsf, is_mobile=(mode == 'm'), has_touch=(mode == 'm'))
        pg = ctx.new_page(); pg.goto(f'http://127.0.0.1:{port}/index.html', wait_until='load'); pg.wait_for_timeout(2500)
        H = pg.evaluate("document.documentElement.scrollHeight"); ims = []; y = 0; i = 0
        while y < H:
            pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(1300)
            f = f"{out}/{mode}_{i:02d}.png"; pg.screenshot(path=f); ims.append(f); y += vp['height']; i += 1
        # hoja de contacto
        th = [Image.open(f).convert('RGB') for f in ims]
        w = 480 if mode == 'd' else 240; th = [t.resize((w, int(t.height * w / t.width))) for t in th]
        cols = 4 if mode == 'd' else 8; rows = (len(th) + cols - 1) // cols
        sheet = Image.new('RGB', (cols * w, rows * th[0].height), 'black')
        for k, t in enumerate(th): sheet.paste(t, ((k % cols) * w, (k // cols) * th[0].height))
        sheet.save(f"{out}/hoja_{mode}.jpg", quality=80); print(mode, len(ims), sheet.size)
        ctx.close()
    b.close()
