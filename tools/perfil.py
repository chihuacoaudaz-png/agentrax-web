import sys, json, threading, http.server, socketserver, functools, collections
from playwright.sync_api import sync_playwright
root = sys.argv[1]
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Q, directory=root))
port = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
def top(prof, n=22):
    nodes = prof['nodes']; dt = prof['timeDeltas']; samples = prof['samples']
    self_t = collections.Counter()
    for s, d in zip(samples, dt): self_t[s] += d
    byid = {x['id']: x for x in nodes}
    parent = {}
    for x in nodes:
        for c in x.get('children', []): parent[c] = x['id']
    agg = collections.Counter(); own = collections.Counter()
    for nid, t in self_t.items():
        cf = byid[nid]['callFrame']; agg[(cf['functionName'] or '(anon)', cf['url'].split('/')[-1][:18], cf['lineNumber'] + 1)] += t
        # atribuir al primer ancestro que este en index.html
        k = nid; who = None
        while k is not None:
            c = byid[k]['callFrame']
            if 'index.html' in c['url']: who = (c['functionName'] or '(anon)', c['lineNumber'] + 1); break
            k = parent.get(k)
        own[who or (byid[nid]['callFrame']['functionName'], 0)] += t
    tot = sum(self_t.values())
    print(' total ms', round(tot / 1000))
    print(' -- tiempo propio'); [print('   ', round(t / 1000), 'ms', k) for k, t in agg.most_common(n)]
    print(' -- atribuido a funcion de la pagina (incluye three.js llamado desde ella)'); [print('   ', round(t / 1000), 'ms', k) for k, t in own.most_common(n)]
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True, args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'])
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=3, is_mobile=True, has_touch=True)
    pg = ctx.new_page(); cdp = ctx.new_cdp_session(pg)
    cdp.send('Profiler.enable'); cdp.send('Profiler.setSamplingInterval', {'interval': 500})
    cdp.send('Profiler.start')
    pg.goto(f'http://127.0.0.1:{port}/index.html', wait_until='load'); pg.wait_for_timeout(1500)
    print('== CARGA (sin freno de CPU)'); top(cdp.send('Profiler.stop')['profile'])
    cdp.send('Profiler.start'); pg.wait_for_timeout(3000)
    print('== PORTADA 3 s en reposo'); top(cdp.send('Profiler.stop')['profile'])
    for sid in ('productos', 'industrias'):
        pg.evaluate(f"document.getElementById('{sid}').scrollIntoView()"); pg.wait_for_timeout(1200)
        cdp.send('Profiler.start'); pg.wait_for_timeout(3000)
        print('==', sid, '3 s'); top(cdp.send('Profiler.stop')['profile'], 10)
    b.close()
