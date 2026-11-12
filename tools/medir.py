"""Mide fluidez y arranque de la pagina por seccion.

  python tools/medir.py d|m      imprime el resultado en JSON
"""
import json, sys
from playwright.sync_api import sync_playwright
from _comun import CHROME_ARGS, servir

# Se inyecta antes del programa de la pagina: cuenta cuadros, ordenes de dibujo y bloqueos
INIT = r"""
(() => {
  const S = window.__m = { raf: {}, draws: 0, d2: 0, frames: [], long: [], ctx: [] };
  const oraf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = cb => oraf(t => { const n = cb.name || 'anon'; const t0 = performance.now(); try { cb(t); } finally { const d = performance.now() - t0; const r = S.raf[n] || (S.raf[n] = { n: 0, ms: 0 }); r.n++; r.ms += d; } });
  for (const C of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) { if (!C) continue;
    for (const k of ['drawElements', 'drawArrays', 'drawElementsInstanced', 'drawArraysInstanced']) { const o = C.prototype[k]; if (o) C.prototype[k] = function () { S.draws++; return o.apply(this, arguments); }; } }
  const P = CanvasRenderingContext2D.prototype;
  for (const k of ['fill', 'stroke', 'fillRect', 'drawImage', 'fillText', 'strokeRect']) { const o = P[k]; P[k] = function () { S.d2++; return o.apply(this, arguments); }; }
  const og = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t) { const c = og.apply(this, arguments); if (c) S.ctx.push(t); return c; };
  try { new PerformanceObserver(l => l.getEntries().forEach(e => S.long.push([Math.round(e.startTime), Math.round(e.duration)]))).observe({ type: 'longtask', buffered: true }); } catch (e) {}
  let last = 0; const tick = t => { if (last) S.frames.push(t - last); last = t; oraf(tick); }; oraf(tick);
})();
"""

MUESTRA = r"""
async (ms) => { const S = window.__m; S.raf = {}; S.draws = 0; S.d2 = 0; S.frames = [];
  await new Promise(r => setTimeout(r, ms));
  const f = S.frames.slice().sort((a, b) => a - b); const n = f.length || 1;
  const sum = f.reduce((a, b) => a + b, 0);
  const raf = Object.fromEntries(Object.entries(S.raf).map(([k, v]) => [k, [v.n, +(v.ms / Math.max(1, v.n)).toFixed(2)]]));
  return { fps: +(1000 * n / sum).toFixed(1), p95: +f[Math.floor(n * 0.95)].toFixed(1), max: +f[n - 1].toFixed(1), over33: f.filter(x => x > 34).length, frames: n,
    glDrawsPerFrame: Math.round(S.draws / n), c2dOpsPerFrame: Math.round(S.d2 / n), raf }; }
"""

RECORRIDO = r"""
async () => { const S = window.__m; S.frames = []; const H = document.documentElement.scrollHeight - innerHeight; const T = 14000; const t0 = performance.now();
  await new Promise(r => { const st = () => { const k = Math.min(1, (performance.now() - t0) / T); window.scrollTo(0, H * k); k < 1 ? setTimeout(st, 8) : r(); }; st(); });
  const f = S.frames.slice().sort((a, b) => a - b); const n = f.length; const sum = f.reduce((a, b) => a + b, 0);
  return { fps: +(1000 * n / sum).toFixed(1), p95: +f[Math.floor(n * 0.95)].toFixed(1), max: +f[n - 1].toFixed(1), over33: f.filter(x => x > 34).length, over50: f.filter(x => x > 50).length, frames: n }; }
"""

SECCIONES = "() => [...document.querySelectorAll('main > section, main section[id], footer')].filter(e => !e.hidden && e.offsetHeight).map(e => [e.id || e.className, Math.round(e.getBoundingClientRect().top + scrollY), e.offsetHeight])"
INCRUSTADOS = "() => [...document.scripts].filter(s => !s.src && s.type !== 'application/ld+json' && s.textContent.trim()).length"


def medir(modo, url=None):
    """modo 'd' = escritorio 1440x900; 'm' = celular 390x844 con procesador 4 veces mas lento."""
    url = url or servir()
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome', headless=True, args=CHROME_ARGS)
        if modo == 'm':
            ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=3, is_mobile=True, has_touch=True)
        else:
            ctx = b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=1)
        ctx.add_init_script(INIT)
        pg = ctx.new_page()
        cdp = ctx.new_cdp_session(pg)
        errs, reqs = [], []
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('request', lambda r: reqs.append(r.url.replace(url, '')))
        freno = 4 if modo == 'm' else 1
        cdp.send('Emulation.setCPUThrottlingRate', {'rate': freno})
        pg.goto(f'{url}/index.html', wait_until='load')
        pg.wait_for_timeout(3000)
        out = {'modo': modo, 'freno': freno}
        out['long'] = pg.evaluate('() => window.__m.long')
        out['webgl_al_abrir'] = pg.evaluate("() => window.__m.ctx.filter(t => t.startsWith('webgl')).length")
        out['incrustados'] = pg.evaluate(INCRUSTADOS)
        vh = 844 if modo == 'm' else 900
        pts = []
        for sid, top, h in pg.evaluate(SECCIONES):
            if sid == 'intro':
                pts += [(f'intro@{k}', top + int((h - vh) * k)) for k in (0, 0.35, 0.7, 0.98)]
            else:
                pts.append((sid, top + min(120, max(0, h - vh) // 2)))
        res = {}
        for nombre, y in pts:
            pg.evaluate(f'window.scrollTo(0,{y})')
            pg.wait_for_timeout(1200)
            res[nombre] = pg.evaluate(MUESTRA, 3000)
        pg.evaluate('window.scrollTo(0,0)')
        pg.wait_for_timeout(800)
        res['recorrido'] = pg.evaluate(RECORRIDO)
        out['medidas'] = res
        out['errores'] = errs[:15]
        out['pedidos'] = sorted(set(reqs))
        b.close()
    return out


if __name__ == '__main__':
    print(json.dumps(medir(sys.argv[1] if len(sys.argv) > 1 else 'm'), ensure_ascii=True, indent=1))
