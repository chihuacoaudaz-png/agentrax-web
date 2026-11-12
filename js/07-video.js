  /* AITI en acción: video animado de 42 s dibujado en canvas.
     Guion: la operación con datos dispersos → se pierden → llega AITI → une todo → control desde el celular → cierre. */
  (() => {
    const root = document.getElementById('avf');
    if (!root) return;
    const cv = document.getElementById('avf-cv'), ctx = cv.getContext('2d'), screenEl = document.getElementById('avf-screen');
    const big = document.getElementById('avf-big'), pp = document.getElementById('avf-pp'), fs = document.getElementById('avf-fs');
    const track = document.getElementById('avf-track'), fill = document.getElementById('avf-fill'), knob = document.getElementById('avf-knob'), curEl = document.getElementById('avf-cur');
    const T = 42, W = 1280, H = 720;
    const FD = '"Barlow Semi Condensed", "Barlow SC Fallback", sans-serif', FB = '"Barlow", "Barlow Fallback", system-ui, sans-serif', FM = '"JetBrains Mono", ui-monospace, monospace';
    const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
    const seg = (t, a, b) => cl((t - a) / (b - a));
    const eio = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const eo = x => 1 - Math.pow(1 - x, 3);
    const win = (t, a, b, c, d) => seg(t, a, b) * (1 - seg(t, c, d));
    const lerp = (a, b, k) => a + (b - a) * k;
    let S = 1;

    const ICON = {
      ops: new Path2D('M2 15h12V8H9l-2 3H2zM14 10h4l3 3v2h-7M8 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0M19.5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0'),
      plant: new Path2D('M3 20V10l5 3v-3l5 3V7h3v13zM2 20h20M17 7V3h2v17'),
      maint: new Path2D('M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z'),
      geo: new Path2D('M12 3 3 8l9 5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5'),
      safety: new Path2D('M4 16a8 8 0 0 1 16 0M2.5 16h19v2.5h-19zM10 8.5V5h4v3.5'),
      fin: new Path2D('M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M14.5 8.5c-.6-.8-1.5-1.2-2.5-1.2-1.6 0-2.8.9-2.8 2.2 0 3 5.6 1.6 5.6 4.6 0 1.3-1.2 2.3-2.8 2.3-1.1 0-2.1-.5-2.7-1.3M12 5.5v1.8M12 16.7v1.8'),
      doc: new Path2D('M6 3h9l4 4v14H6zM9 12h7M9 16h5')
    };
    const ORB = { x: 640, y: 290 };
    const AREAS = [
      { n: 'Despacho', i: 'ops', x: 190, y: 190 }, { n: 'Planta', i: 'plant', x: 170, y: 430 }, { n: 'Mantenimiento', i: 'maint', x: 470, y: 590 },
      { n: 'Geotecnia', i: 'geo', x: 810, y: 590 }, { n: 'Seguridad', i: 'safety', x: 1110, y: 430 }, { n: 'Finanzas', i: 'fin', x: 1090, y: 190 }
    ];
    const HOME = [[330, 140], [345, 215], [300, 305], [305, 395], [470, 470], [615, 528], [775, 470], [915, 505], [990, 385], [990, 300], [945, 215], [935, 140]];
    const KIND = { doc: '#9fb0c8', xls: '#4ade80', msg: '#7fd3ff', radio: '#f3b35c', lost: '#f87171' };
    const FR = [
      ['parte_guardia.pdf', 0, 'doc'], ['Radio: ¿y la pala 3?', 0, 'radio'], ['tonelaje_v3.xlsx', 1, 'xls'], ['Cuaderno de campo', 1, 'lost'],
      ['Hoja de mantenimiento', 2, 'doc'], ['WhatsApp: equipo parado', 2, 'msg'], ['USB con planos', 3, 'lost'], ['Informe de talud.pdf', 3, 'doc'],
      ['IPERC impreso', 4, 'doc'], ['Llamada perdida', 4, 'lost'], ['costos_FINAL_v7.xlsx', 5, 'xls'], ['Correo: reporte pendiente', 5, 'msg']
    ].map(([txt, a, kind], i) => ({ txt, a, kind, i, hx: HOME[i][0], hy: HOME[i][1] }));
    // Esfera de AITI: puntos en espiral de Fibonacci que se ensamblan desde posiciones dispersas
    const NP = 150, PTS = [];
    for (let k = 0; k < NP; k++) {
      const y = 1 - k / (NP - 1) * 2, r = Math.sqrt(1 - y * y), th = k * 2.399963;
      const sx = ((k * 9301 + 49297) % 233280) / 233280 * W, sy = ((k * 4649 + 7919) % 23328) / 23328 * H;
      PTS.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, sx, sy });
    }

    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function icon(name, x, y, size, color, lw = 1.7) { ctx.save(); ctx.translate(x - size / 2, y - size / 2); ctx.scale(size / 24, size / 24); ctx.strokeStyle = color; ctx.lineWidth = lw * 24 / size * 1.1; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(ICON[name]); ctx.restore(); }
    function text(s, x, y, font, color, align = 'left', alpha = 1) { ctx.globalAlpha = alpha; ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.globalAlpha = 1; }

    function background(t) {
      const g = ctx.createRadialGradient(640, 330, 40, 640, 360, 820);
      g.addColorStop(0, '#0f2d63'); g.addColorStop(0.55, '#071631'); g.addColorStop(1, '#02060e');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(56,189,248,0.05)'; ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      // Tono más frío mientras los datos se pierden
      const cold = win(t, 8, 9.5, 14, 16);
      if (cold) { ctx.fillStyle = `rgba(2,6,14,${0.35 * cold})`; ctx.fillRect(0, 0, W, H); }
    }

    function pit(t) {
      const blue = eio(seg(t, 22, 25));
      for (let k = 0; k < 7; k++) {
        const rx = 300 - k * 40, ry = 110 - k * 14.5, cy = 420 + k * 7;
        ctx.beginPath(); ctx.ellipse(640, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(lerp(60, 8, blue))},${Math.round(lerp(52, 32, blue))},${Math.round(lerp(42, 70, blue))},${0.55 + k * 0.05})`; ctx.fill();
        ctx.strokeStyle = blue ? `rgba(56,189,248,${0.15 + 0.45 * blue})` : 'rgba(180,160,130,0.22)'; ctx.lineWidth = 1; ctx.stroke();
      }
    }

    function areaTiles(t) {
      AREAS.forEach((A, i) => {
        const on = eio(seg(t, 22 + i * 0.25, 23.2 + i * 0.25)), lost = win(t, 8, 9, 20, 21);
        ctx.save(); ctx.translate(A.x, A.y);
        const g = ctx.createLinearGradient(-30, -30, 30, 30);
        g.addColorStop(0, `rgba(${Math.round(lerp(40, 33, on))},${Math.round(lerp(58, 96, on))},${Math.round(lerp(92, 184, on))},1)`); g.addColorStop(1, '#0a1d3e');
        if (on) { ctx.shadowColor = 'rgba(56,189,248,0.7)'; ctx.shadowBlur = 24 * on; }
        rr(-30, -30, 60, 60, 16); ctx.fillStyle = g; ctx.fill(); ctx.shadowBlur = 0;
        ctx.strokeStyle = on ? `rgba(191,234,255,${0.4 + 0.5 * on})` : `rgba(159,176,200,${0.35 + 0.3 * lost})`; ctx.lineWidth = 1.4; ctx.stroke();
        ctx.restore();
        icon(A.i, A.x, A.y, 30, on ? '#e6f6ff' : '#9fb0c8');
        text(A.n, A.x, A.y + 48, `600 17px ${FD}`, on ? '#ffffff' : '#9fb0c8', 'center');
      });
    }

    function brokenLinks(t) {
      const a = win(t, 1.5, 3, 20, 21.5);
      if (!a) return;
      [[0, 1], [1, 2], [3, 4], [4, 5], [0, 5], [2, 3]].forEach(([i, j], k) => {
        const A = AREAS[i], B = AREAS[j], mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        const flick = 0.55 + 0.45 * Math.sin(t * 3 + k * 1.7);
        ctx.setLineDash([6, 10]); ctx.lineWidth = 1.4; ctx.strokeStyle = `rgba(248,113,113,${0.35 * a * flick})`;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(mx - 10, my); ctx.moveTo(mx + 10, my); ctx.lineTo(B.x, B.y); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = `rgba(248,113,113,${0.8 * a})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(mx - 5, my - 5); ctx.lineTo(mx + 5, my + 5); ctx.moveTo(mx + 5, my - 5); ctx.lineTo(mx - 5, my + 5); ctx.stroke();
      });
    }

    function fragments(t) {
      FR.forEach(f => {
        const appear = eo(seg(t, 0.8 + f.i * 0.18, 1.6 + f.i * 0.18));
        if (!appear) return;
        const absorb = eio(seg(t, 20 + f.i * 0.22, 22.4 + f.i * 0.22));
        if (absorb >= 1) return;
        const isLost = f.kind === 'lost', lost = isLost ? eio(seg(t, 9 + f.i * 0.1, 11 + f.i * 0.1)) * (1 - seg(t, 19, 20)) : 0;
        let x = f.hx + Math.sin(t * 0.7 + f.i) * 10, y = f.hy + Math.cos(t * 0.55 + f.i * 1.3) * 8 + lost * 26;
        const jitter = win(t, 8, 9, 13, 14) * (isLost ? 0 : 1);
        x += Math.sin(t * 9 + f.i * 3) * 1.6 * jitter;
        if (absorb) { const cx = (x + ORB.x) / 2, cy = Math.min(y, ORB.y) - 120; const u = absorb; x = (1 - u) * (1 - u) * x + 2 * (1 - u) * u * cx + u * u * ORB.x; y = (1 - u) * (1 - u) * y + 2 * (1 - u) * u * cy + u * u * ORB.y; }
        const sc = (0.92 + 0.08 * appear) * (1 - 0.75 * absorb), alpha = appear * (1 - lost * 0.7) * (1 - seg(absorb, 0.7, 1));
        ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = alpha;
        ctx.font = `500 14px ${FB}`; const w = ctx.measureText(f.txt).width + 40;
        const col = absorb ? '#7fd3ff' : (isLost && lost > 0.3 ? KIND.lost : KIND[f.kind]);
        rr(-w / 2, -17, w, 34, 9); ctx.fillStyle = absorb ? 'rgba(0,88,196,0.85)' : 'rgba(14,30,62,0.92)'; ctx.fill();
        ctx.strokeStyle = col; ctx.globalAlpha = alpha * 0.8; ctx.lineWidth = 1.2; ctx.stroke(); ctx.globalAlpha = alpha;
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(-w / 2 + 15, 0, 4, 0, Math.PI * 2); ctx.fill();
        text(f.txt, -w / 2 + 27, 1, `500 14px ${FB}`, '#e6ecf5', 'left', alpha);
        if (isLost && lost > 0.3) text('DATO PERDIDO', 0, 30, `600 10px ${FM}`, '#f87171', 'center', alpha * seg(lost, 0.3, 0.8));
        ctx.restore(); ctx.globalAlpha = 1;
      });
    }

    function pending(t) {
      const a = win(t, 10, 11, 19, 20);
      if (!a) return;
      ctx.save(); ctx.globalAlpha = a;
      rr(930, 40, 300, 42, 21); ctx.fillStyle = 'rgba(243,179,92,0.14)'; ctx.fill(); ctx.strokeStyle = 'rgba(243,179,92,0.7)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.strokeStyle = '#f3b35c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(956, 61, 9, 0, Math.PI * 2); ctx.moveTo(956, 55); ctx.lineTo(956, 61); ctx.lineTo(961, 64); ctx.stroke();
      text('Reporte de guardia: pendiente', 976, 61, `600 16px ${FD}`, '#ffd28a', 'left', a);
      ctx.restore();
    }

    function orb(t) {
      const form = eio(seg(t, 14.4, 17.6));
      if (!form) return;
      const R = 70, ang = t * 0.45, tilt = 0.35, ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);
      // Haz de llegada
      const beam = win(t, 14, 14.8, 16.5, 18);
      if (beam) { const g = ctx.createLinearGradient(0, 0, 0, ORB.y); g.addColorStop(0, 'rgba(191,234,255,0)'); g.addColorStop(1, `rgba(191,234,255,${0.5 * beam})`); ctx.fillStyle = g; ctx.fillRect(ORB.x - 3, 0, 6, ORB.y); }
      const halo = ctx.createRadialGradient(ORB.x, ORB.y, 10, ORB.x, ORB.y, 230);
      halo.addColorStop(0, `rgba(56,189,248,${0.45 * form})`); halo.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = halo; ctx.fillRect(ORB.x - 240, ORB.y - 240, 480, 480);
      ctx.globalCompositeOperation = 'lighter';
      const P = PTS.map(p => { const x1 = p.x * ca + p.z * sa, z1 = -p.x * sa + p.z * ca; const tx = ORB.x + x1 * R, ty = ORB.y + (p.y * ct - z1 * st) * R; return [lerp(p.sx, tx, form), lerp(p.sy, ty, form), p.y * st + z1 * ct]; });
      if (form > 0.6) {
        ctx.lineWidth = 0.8;
        for (let i = 0; i < NP; i++) for (let j = i + 1; j < Math.min(NP, i + 9); j++) {
          const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]);
          if (d < 34) { ctx.strokeStyle = `rgba(95,200,255,${0.25 * (form - 0.6) / 0.4 * (1 - d / 34)})`; ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); }
        }
      }
      P.forEach(p => { const d = (p[2] + 1) / 2; ctx.fillStyle = `rgba(191,234,255,${(0.3 + 0.7 * d) * form})`; ctx.beginPath(); ctx.arc(p[0], p[1], 1 + 1.6 * d, 0, Math.PI * 2); ctx.fill(); });
      const core = ctx.createRadialGradient(ORB.x, ORB.y, 0, ORB.x, ORB.y, 46);
      core.addColorStop(0, `rgba(255,255,255,${form})`); core.addColorStop(0.3, `rgba(159,226,255,${0.7 * form})`); core.addColorStop(1, 'rgba(47,140,255,0)');
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(ORB.x, ORB.y, 46 + Math.sin(t * 2.4) * 3, 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      const lbl = eo(seg(t, 17.4, 18.6));
      if (lbl) text('AITI', ORB.x, ORB.y + 104, `700 30px ${FD}`, '#ffffff', 'center', lbl);
    }

    function links(t) {
      const a = seg(t, 22.4, 25);
      if (!a) return;
      AREAS.forEach((A, i) => {
        const p = eio(seg(t, 22.4 + i * 0.25, 24.2 + i * 0.25));
        if (!p) return;
        const cx = (A.x + ORB.x) / 2, cy = (A.y + ORB.y) / 2 - 40;
        ctx.strokeStyle = 'rgba(127,211,255,0.55)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(A.x, A.y);
        const steps = 30;
        for (let s = 1; s <= steps * p; s++) { const u = s / steps; ctx.lineTo((1 - u) * (1 - u) * A.x + 2 * (1 - u) * u * cx + u * u * ORB.x, (1 - u) * (1 - u) * A.y + 2 * (1 - u) * u * cy + u * u * ORB.y); }
        ctx.stroke();
        if (p >= 1) for (let n = 0; n < 2; n++) {
          const u = ((t * 0.5 + i * 0.17 + n * 0.5) % 1), x = (1 - u) * (1 - u) * A.x + 2 * (1 - u) * u * cx + u * u * ORB.x, y = (1 - u) * (1 - u) * A.y + 2 * (1 - u) * u * cy + u * u * ORB.y;
          ctx.fillStyle = 'rgba(230,246,255,0.95)'; ctx.shadowColor = '#38bdf8'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(x, y, 3.4, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        }
      });
    }

    function phone(t) {
      const k = eo(seg(t, 28.2, 29.8));
      if (!k) return;
      const px = lerp(1380, 840, k), py = 70, pw = 290, ph = 580;
      // Haz de datos de AITI al celular
      const ox = 640 - 0.72 * 330, oy = 360 + 0.72 * (ORB.y - 360);
      const bm = seg(t, 29.4, 30.2);
      if (bm) { const g = ctx.createLinearGradient(ox, oy, px, py + 280); g.addColorStop(0, `rgba(127,211,255,${0.55 * bm})`); g.addColorStop(1, 'rgba(127,211,255,0.05)'); ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.setLineDash([2, 8]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(ox + 60, oy); ctx.lineTo(px, py + 280); ctx.stroke(); ctx.setLineDash([]); }
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 20;
      rr(px, py, pw, ph, 42); ctx.fillStyle = '#05080f'; ctx.fill(); ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
      ctx.strokeStyle = 'rgba(127,211,255,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
      rr(px + 10, py + 10, pw - 20, ph - 20, 34); const sg = ctx.createLinearGradient(0, py, 0, py + ph); sg.addColorStop(0, '#0f2b5e'); sg.addColorStop(1, '#081a3a'); ctx.fillStyle = sg; ctx.fill();
      ctx.save(); rr(px + 10, py + 10, pw - 20, ph - 20, 34); ctx.clip();
      rr(px + pw / 2 - 45, py + 18, 90, 22, 11); ctx.fillStyle = '#05080f'; ctx.fill();
      const X = px + 28, Wd = pw - 56;
      const hd = seg(t, 29.6, 30.2);
      ctx.globalAlpha = hd;
      const hg = ctx.createRadialGradient(X + 12, py + 66, 0, X + 12, py + 66, 12); hg.addColorStop(0, '#fff'); hg.addColorStop(0.4, '#7fd3ff'); hg.addColorStop(1, 'rgba(0,88,196,0)');
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(X + 12, py + 66, 12, 0, Math.PI * 2); ctx.fill();
      text('AITI', X + 32, py + 62, `700 20px ${FD}`, '#fff', 'left', hd); text('Guardia día · en línea', X + 32, py + 80, `500 11px ${FM}`, '#4ade80', 'left', hd);
      ctx.globalAlpha = 1;
      // Indicadores
      const kp = eo(seg(t, 30, 31.6));
      [['TONELAJE', 12480, ' t'], ['DISPONIB.', 87, ' %'], ['COSTO/t', 2.85, '']].forEach(([lb, v, u], i) => {
        const a = seg(t, 30 + i * 0.15, 30.6 + i * 0.15); if (!a) return;
        const bx = X + i * (Wd / 3), bw = Wd / 3 - 6;
        ctx.globalAlpha = a; rr(bx, py + 104, bw, 62, 10); ctx.fillStyle = 'rgba(5,11,24,0.55)'; ctx.fill(); ctx.strokeStyle = 'rgba(127,211,255,0.25)'; ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1;
        text(lb, bx + 8, py + 120, `500 9px ${FM}`, '#9fb0c8', 'left', a);
        const val = i === 2 ? 'US$ ' + (v * kp).toFixed(2).replace('.', ',') : Math.round(v * kp).toLocaleString('es-PE').replace(/,/g, ' ') + u;
        text(val, bx + 8, py + 146, `700 ${i === 2 ? 15 : 17}px ${FD}`, '#fff', 'left', a);
      });
      // Gráfico
      const ch = seg(t, 30.6, 32.2);
      if (ch) {
        ctx.globalAlpha = seg(t, 30.6, 31); rr(X, py + 178, Wd, 110, 12); ctx.fillStyle = 'rgba(5,11,24,0.55)'; ctx.fill(); ctx.globalAlpha = 1;
        text('PRODUCCIÓN t/h', X + 12, py + 196, `500 9px ${FM}`, '#7fd3ff', 'left', seg(t, 30.6, 31));
        const pts = [0.6, 0.45, 0.52, 0.32, 0.38, 0.24, 0.3, 0.18, 0.22, 0.12];
        ctx.strokeStyle = '#7fd3ff'; ctx.lineWidth = 2.4; ctx.lineJoin = 'round'; ctx.beginPath();
        const n = Math.max(2, Math.ceil(pts.length * eio(ch)));
        for (let i = 0; i < n; i++) { const x = X + 12 + i * (Wd - 24) / (pts.length - 1), y = py + 208 + pts[i] * 70; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke();
      }
      // Alerta con acción
      const al = eo(seg(t, 32, 32.6));
      if (al) {
        const ay = py + 304 + (1 - al) * 20, done = seg(t, 33.4, 33.6);
        ctx.globalAlpha = al; rr(X, ay, Wd, 118, 14); ctx.fillStyle = done ? 'rgba(22,163,74,0.14)' : 'rgba(243,179,92,0.14)'; ctx.fill(); ctx.strokeStyle = done ? 'rgba(74,222,128,0.7)' : 'rgba(243,179,92,0.75)'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.globalAlpha = 1;
        text(done ? 'RESUELTO' : 'FLUJO CRÍTICO', X + 14, ay + 22, `600 10px ${FM}`, done ? '#4ade80' : '#f3b35c', 'left', al);
        text('Cola en el acarreo', X + 14, ay + 44, `700 17px ${FD}`, '#fff', 'left', al);
        text('Reasignar 2 camiones a la pala 3', X + 14, ay + 64, `500 13px ${FB}`, '#d6e2f2', 'left', al);
        rr(X + 14, ay + 80, 104, 28, 14); ctx.globalAlpha = al; ctx.fillStyle = done ? '#16a34a' : '#0058C4'; ctx.fill(); ctx.globalAlpha = 1;
        text(done ? 'Aplicado ✓' : 'Aplicar', X + 66, ay + 94, `600 13px ${FB}`, '#fff', 'center', al);
        const tap = seg(t, 33.1, 33.9);
        if (tap > 0 && tap < 1) { ctx.strokeStyle = `rgba(255,255,255,${0.8 * (1 - tap)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X + 66, ay + 94, 10 + 30 * tap, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = `rgba(255,255,255,${0.35 * (1 - tap)})`; ctx.beginPath(); ctx.arc(X + 66, ay + 94, 14, 0, Math.PI * 2); ctx.fill(); }
      }
      // Notificación del reporte
      const nt = eo(seg(t, 34.2, 34.8));
      if (nt) {
        const ny = py + 438 + (1 - nt) * 30;
        ctx.globalAlpha = nt; rr(X, ny, Wd, 64, 14); ctx.fillStyle = 'rgba(255,255,255,0.94)'; ctx.fill(); ctx.globalAlpha = 1;
        icon('doc', X + 26, ny + 32, 24, '#0058C4', 2);
        text('Reporte de guardia listo', X + 48, ny + 24, `700 15px ${FD}`, '#0b1730', 'left', nt);
        text('Integrado · listo para gerencia', X + 48, ny + 43, `500 12px ${FB}`, '#56657a', 'left', nt);
      }
      ctx.restore(); ctx.restore();
    }

    function captions(t) {
      const CAPS = [[0.6, 7.4, 'LA OPERACIÓN HOY', 'Cada área trabaja por su lado.'], [8, 13.6, 'EL PROBLEMA', 'Los datos se pierden entre papeles, hojas, radios y correos.'], [14.6, 19.6, 'EL CAMBIO', 'Entonces llega AITI.'], [20.2, 27.6, 'AITI UNE TODO', 'Cada área y cada dato, en un solo lugar.'], [28.6, 35.6, 'EL CONTROL', 'Alertas, decisiones y reportes, desde su celular.']];
      CAPS.forEach(([a, b, k, s]) => {
        const v = win(t, a, a + 0.5, b - 0.5, b);
        if (!v) return;
        ctx.font = `600 26px ${FD}`; const w = Math.max(ctx.measureText(s).width, 160) + 48, y = 30 - (1 - v) * 10;
        ctx.globalAlpha = v; rr(40, y, w, 70, 12); ctx.fillStyle = 'rgba(3,8,18,0.72)'; ctx.fill(); ctx.strokeStyle = 'rgba(127,211,255,0.25)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = '#38bdf8'; ctx.fillRect(40, y + 12, 3, 46); ctx.globalAlpha = 1;
        text(k, 62, y + 22, `600 12px ${FM}`, '#7fd3ff', 'left', v);
        text(s, 62, y + 47, `600 26px ${FD}`, '#ffffff', 'left', v);
      });
    }

    function endCard(t) {
      const o = seg(t, 36, 37.2);
      if (!o) return;
      ctx.fillStyle = `rgba(3,8,18,${0.94 * o})`; ctx.fillRect(0, 0, W, H);
      const a = eo(seg(t, 37, 38.3)), sc = lerp(0.9, 1, a);
      if (a) {
        const g = ctx.createRadialGradient(640, 300, 0, 640, 300, 260); g.addColorStop(0, `rgba(56,189,248,${0.35 * a})`); g.addColorStop(1, 'rgba(56,189,248,0)');
        ctx.fillStyle = g; ctx.fillRect(380, 40, 520, 520);
        ctx.save(); ctx.translate(640, 300); ctx.scale(sc, sc);
        const tg = ctx.createLinearGradient(-200, 0, 200, 0); tg.addColorStop(0, '#ffffff'); tg.addColorStop(0.5, '#7fd3ff'); tg.addColorStop(1, '#ffffff');
        ctx.globalAlpha = a; ctx.font = `700 150px ${FD}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = tg; ctx.fillText('A I T I', 0, 0); ctx.globalAlpha = 1;
        ctx.restore();
      }
      text('Toda su operación, en su mano.', 640, 430, `600 34px ${FD}`, '#e6ecf5', 'center', eo(seg(t, 38, 39)));
      text('UNA SOLUCIÓN DE AGENTRAX', 640, 482, `600 14px ${FM}`, '#7fd3ff', 'center', eo(seg(t, 38.8, 39.8)));
    }

    function render(t) {
      ctx.setTransform(S, 0, 0, S, 0, 0);
      background(t);
      // La red se aleja y se hace a un lado cuando entra el celular
      const k = eio(seg(t, 28, 29.6)), s = 1 - 0.28 * k;
      ctx.save(); ctx.translate(640, 360); ctx.scale(s, s); ctx.translate(-640 - 330 * k, -360);
      ctx.globalAlpha = 1 - 0.25 * k;
      pit(t); brokenLinks(t); links(t); areaTiles(t); fragments(t); orb(t);
      ctx.restore(); ctx.globalAlpha = 1;
      pending(t); phone(t); captions(t); endCard(t);
      const vg = ctx.createRadialGradient(640, 360, 300, 640, 360, 800); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    }

    // Reproductor
    let t = 0, playing = false, last = 0, raf = 0;
    const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    function ui() { const p = t / T * 100; fill.style.width = p + '%'; knob.style.left = p + '%'; curEl.textContent = fmt(t); track.setAttribute('aria-valuenow', Math.floor(t)); }
    function frame(now) {
      if (last) t = Math.min(T, t + (now - last) / 1000);
      last = now; render(t); ui();
      if (t >= T) { pause(); return; }
      raf = playing ? requestAnimationFrame(frame) : 0;
    }
    function play() { if (t >= T) t = 0; playing = true; root.classList.add('is-playing'); pp.setAttribute('aria-label', 'Pausar'); last = 0; if (!raf) raf = requestAnimationFrame(frame); }
    function pause() { playing = false; root.classList.remove('is-playing'); pp.setAttribute('aria-label', 'Reproducir'); cancelAnimationFrame(raf); raf = 0; }
    function size() { const r = screenEl.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); S = cv.width / W; render(!playing && t === 0 ? 6.2 : t); }
    big.addEventListener('click', play);
    pp.addEventListener('click', () => (playing ? pause() : play()));
    cv.addEventListener('click', () => (playing ? pause() : play()));
    const seek = e => { const r = track.getBoundingClientRect(); t = cl((e.clientX - r.left) / r.width) * T; render(t); ui(); };
    track.addEventListener('pointerdown', e => { seek(e); track.setPointerCapture(e.pointerId); const mv = ev => seek(ev); track.addEventListener('pointermove', mv); track.addEventListener('pointerup', () => track.removeEventListener('pointermove', mv), { once: true }); });
    track.addEventListener('keydown', e => { const d = { ArrowRight: 5, ArrowLeft: -5 }[e.key]; if (d) { e.preventDefault(); t = cl(t + d, 0, T); render(t); ui(); } });
    fs.addEventListener('click', () => { if (document.fullscreenElement) document.exitFullscreen(); else if (screenEl.requestFullscreen) screenEl.requestFullscreen(); });
    new ResizeObserver(size).observe(screenEl);
    new IntersectionObserver(es => { if (!es.some(e => e.isIntersecting) && playing) pause(); }).observe(screenEl);
    // Fotograma de portada: la operación con los datos dispersos
    t = 6.2; (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { size(); t = 0; ui(); render(6.2); });
  })();
