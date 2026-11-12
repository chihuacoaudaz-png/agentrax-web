  /* AITI: la esfera central emite sus funciones; cada función se muestra en la consola */
  (() => {
    const ait = document.getElementById('ait');
    if (!ait) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const NS = 'http://www.w3.org/2000/svg';
    const stage = document.getElementById('ait-stage'), core = ait.querySelector('.ait__core'), wires = document.getElementById('ait-wires');
    const cv = document.getElementById('ait-orb'), ctx = cv.getContext('2d');
    const fns = [...ait.querySelectorAll('.ait__fn')], views = [...ait.querySelectorAll('.ait__view')];
    const kEl = document.getElementById('ait-k'), hEl = document.getElementById('ait-h'), pEl = document.getElementById('ait-p'), bEl = document.getElementById('ait-b'), aEl = document.getElementById('ait-a'), paEl = ait.querySelector('.ait__pa');
    const prog = ait.querySelector('.ait__prog i'), chat = ait.querySelector('.av-chat');
    const fmt = n => n.toLocaleString('es-PE').replace(/,/g, ' ');
    let cur = 0, timer = 0, chatT = 0, paused = false, seen = false, hatched = false, raf = 0, last = 0;
    let wireEls = [], anchors = [], dirs = [], W = 0, H = 0;

    // Esfera de red neuronal (puntos en espiral de Fibonacci unidos con sus vecinos)
    const N = 170, pts = [];
    for (let k = 0; k < N; k++) {
      const y = 1 - k / (N - 1) * 2, rad = Math.sqrt(1 - y * y), th = k * 2.399963, j = 0.88 + 0.12 * ((k * 7919) % 17) / 17;
      pts.push([Math.cos(th) * rad * j, y * j, Math.sin(th) * rad * j]);
    }
    const edges = [];
    pts.forEach((p, i) => pts.map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2])
      .filter(([j]) => j > i).sort((a, b) => a[1] - b[1]).slice(0, 3).forEach(([j]) => edges.push([i, j])));
    const sparks = Array.from({ length: 14 }, (_, k) => ({ e: edges[(k * 37) % edges.length], t: k / 14 }));
    let ang = 0, yaw = 0, tilt = 0.35, tYaw = 0, tTilt = 0.35, burst = 1, burstDir = 0;

    function size() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Cables desde la esfera hasta cada función (medidos sin transformaciones)
    function layout() {
      size();
      const sw = stage.offsetWidth, sh = stage.offsetHeight;
      const cx = core.offsetLeft + core.offsetWidth / 2, cy = core.offsetTop + core.offsetHeight / 2, r = core.offsetWidth * 0.4;
      wires.setAttribute('viewBox', `0 0 ${sw} ${sh}`);
      wires.textContent = ''; wireEls = []; anchors = []; dirs = [];
      fns.forEach(b => {
        const li = b.parentElement, bx = li.offsetLeft, by = li.offsetTop, bw = li.offsetWidth, bh = li.offsetHeight;
        const mx = bx + bw / 2, my = by + bh / 2;
        li.style.setProperty('--dx', `${(cx - mx).toFixed(0)}px`); li.style.setProperty('--dy', `${(cy - my).toFixed(0)}px`);
        const ax = mx < cx ? bx + bw : bx, ay = my;
        const a = Math.atan2(ay - cy, ax - cx), sx = cx + Math.cos(a) * r, sy = cy + Math.sin(a) * r;
        const k = Math.abs(ax - sx) * 0.5, side = ax < cx ? -1 : 1;
        const d = `M${sx.toFixed(1)} ${sy.toFixed(1)}C${(sx + Math.cos(a) * k).toFixed(1)} ${(sy + Math.sin(a) * k).toFixed(1)} ${(ax - side * k).toFixed(1)} ${ay.toFixed(1)} ${ax.toFixed(1)} ${ay.toFixed(1)}`;
        const path = document.createElementNS(NS, 'path'); path.setAttribute('d', d); path.setAttribute('class', 'ait__wire'); path.setAttribute('pathLength', '1');
        const dot = document.createElementNS(NS, 'circle'); dot.setAttribute('cx', ax.toFixed(1)); dot.setAttribute('cy', ay.toFixed(1)); dot.setAttribute('r', 4.5); dot.setAttribute('class', 'ait__anchor');
        const pulses = [0, 1, 2].map(() => { const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', 2.6); c.setAttribute('class', 'ait__pulse'); c.style.opacity = 0; return c; });
        wires.append(path, dot, ...pulses);
        wireEls.push({ path, dot, pulses, len: path.getTotalLength() });
        dirs.push(a);
      });
      if (!hatched && !still) wireEls.forEach(w => { w.path.style.strokeDashoffset = 1; });
      mark();
      if (!raf) draw(performance.now());
    }

    function mark() {
      wireEls.forEach((w, k) => { w.path.classList.toggle('is-on', k === cur); w.dot.classList.toggle('is-on', k === cur); });
      burstDir = dirs[cur] || 0;
    }

    function countUp(view) {
      view.querySelectorAll('[data-count]').forEach(b => {
        const end = +b.dataset.count, t0 = performance.now(), dur = still ? 0 : 1300;
        const step = now => { const k = dur ? Math.min(1, (now - t0) / dur) : 1; b.textContent = fmt(Math.round(end * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
    }

    function select(i, focus) {
      cur = (i + fns.length) % fns.length;
      fns.forEach((b, k) => { const on = k === cur; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
      if (focus) fns[cur].focus();
      views.forEach((v, k) => v.classList.toggle('is-on', k === cur));
      const b = fns[cur];
      kEl.textContent = `AITI › FUNCIÓN ${String(cur + 1).padStart(2, '0')}`;
      hEl.textContent = b.querySelector('b').textContent; pEl.textContent = b.querySelector('.t').textContent;
      bEl.textContent = b.dataset.before; aEl.textContent = b.dataset.after;
      paEl.classList.remove('is-in'); void paEl.offsetWidth; paEl.classList.add('is-in');
      countUp(views[cur]);
      clearTimeout(chatT); chat.classList.remove('is-said');
      if (views[cur].contains(chat)) chatT = setTimeout(() => chat.classList.add('is-said'), still ? 0 : 1700);
      mark(); burst = 0;
      schedule();
    }

    function schedule() {
      clearTimeout(timer);
      prog.classList.remove('run'); void prog.offsetWidth;
      if (still || !seen) return;
      prog.classList.add('run');
      timer = setTimeout(function tick() { if (paused) { timer = setTimeout(tick, 400); return; } select(cur + 1); }, 6500);
    }

    fns.forEach((b, k) => b.addEventListener('click', () => select(k)));
    stage.querySelector('[role=tablist]').addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); select(cur + d, true); }
    });
    [stage, document.getElementById('ait-console')].forEach(el => {
      el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { paused = true; ait.classList.add('is-paused'); } });
      el.addEventListener('pointerleave', () => { paused = false; ait.classList.remove('is-paused'); });
    });
    stage.addEventListener('pointermove', e => {
      const r = core.getBoundingClientRect();
      tYaw = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / r.width)) * 0.7;
      tTilt = 0.35 + Math.max(-1, Math.min(1, (e.clientY - r.top - r.height / 2) / r.height)) * 0.4;
    });
    stage.addEventListener('pointerleave', () => { tYaw = 0; tTilt = 0.35; });

    function draw(now) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now;
      const t = now / 1000;
      ang += dt * 0.32; yaw += (tYaw - yaw) * 0.06; tilt += (tTilt - tilt) * 0.06; burst = Math.min(1, burst + dt * 0.9);
      const cx = W / 2, cy = H / 2, R = W * 0.3;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // Halo
      let g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.65);
      g.addColorStop(0, 'rgba(56,189,248,0.30)'); g.addColorStop(0.5, 'rgba(0,88,196,0.12)'); g.addColorStop(1, 'rgba(0,88,196,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // Anillo de control (HUD): marcas que giran lento y arcos de energía alrededor de AITI
      ctx.save(); ctx.translate(cx, cy);
      const hr = R * 1.48;
      ctx.rotate(t * 0.06);
      for (let i = 0; i < 120; i++) {
        const a = i / 120 * Math.PI * 2, long = i % 10 === 0, r1 = hr - (long ? 9 : 4);
        ctx.strokeStyle = `rgba(127,211,255,${long ? 0.55 : 0.2})`; ctx.lineWidth = long ? 1.4 : 0.8;
        ctx.beginPath(); ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1); ctx.lineTo(Math.cos(a) * hr, Math.sin(a) * hr); ctx.stroke();
      }
      ctx.rotate(-t * 0.16);
      ctx.lineCap = 'round';
      [[0.2, 0.9, 0.7], [2.3, 0.5, 0.45], [3.6, 1.1, 0.6], [5.2, 0.35, 0.4]].forEach(([s0, len, al]) => {
        ctx.strokeStyle = `rgba(56,189,248,${al})`; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.arc(0, 0, hr + 9, s0, s0 + len); ctx.stroke();
      });
      ctx.strokeStyle = 'rgba(127,211,255,0.12)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 0, hr + 18, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();

      // Anillos orbitales con satélites
      [[1.34, 0.30, -0.35, 0.5], [1.18, 0.42, 0.5, -0.7]].forEach(([rx, ry, rot, sp], k) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot + Math.sin(t * 0.2 + k) * 0.05);
        ctx.strokeStyle = 'rgba(127,211,255,0.22)'; ctx.lineWidth = 1; ctx.setLineDash([2, 6]);
        ctx.beginPath(); ctx.ellipse(0, 0, R * rx, R * ry, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
        for (let s = 0; s < 2; s++) {
          const a = t * sp + s * Math.PI, x = Math.cos(a) * R * rx, y = Math.sin(a) * R * ry;
          ctx.fillStyle = 'rgba(191,234,255,0.9)'; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
          const sg = ctx.createRadialGradient(x, y, 0, x, y, 10); sg.addColorStop(0, 'rgba(56,189,248,0.5)'); sg.addColorStop(1, 'rgba(56,189,248,0)');
          ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      });

      // Proyección de la esfera
      const a1 = ang + yaw, ca = Math.cos(a1), sa = Math.sin(a1), ct = Math.cos(tilt), st = Math.sin(tilt);
      const breathe = 1 + Math.sin(t * 1.4) * 0.015;
      const P = pts.map(([x, y, z]) => { const x1 = x * ca + z * sa, z1 = -x * sa + z * ca; return [cx + x1 * R * breathe, cy + (y * ct - z1 * st) * R * breathe, y * st + z1 * ct]; });
      ctx.lineWidth = 0.8;
      edges.forEach(([i, j]) => {
        const d = ((P[i][2] + P[j][2]) / 2 + 1) / 2;
        ctx.strokeStyle = `rgba(95,200,255,${(0.06 + 0.34 * d).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke();
      });

      // Núcleo luminoso
      const cr = R * (0.5 + Math.sin(t * 2) * 0.03);
      g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(0.18, 'rgba(191,234,255,0.75)'); g.addColorStop(0.5, 'rgba(56,189,248,0.32)'); g.addColorStop(1, 'rgba(0,88,196,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.fill();

      // Haz hacia la función activa
      if (W > 0 && dirs.length && window.innerWidth > 900) {
        const bx = cx + Math.cos(burstDir) * R * 1.02, by = cy + Math.sin(burstDir) * R * 1.02;
        const lg = ctx.createLinearGradient(cx, cy, bx, by); lg.addColorStop(0, 'rgba(191,234,255,0.7)'); lg.addColorStop(1, 'rgba(56,189,248,0)');
        ctx.strokeStyle = lg; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
      }
      // Onda que sale al cambiar de función
      if (burst < 1) {
        ctx.strokeStyle = `rgba(127,211,255,${(0.7 * (1 - burst)).toFixed(3)})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, R * (0.55 + burst * 0.95), 0, Math.PI * 2); ctx.stroke();
      }

      P.forEach(p => {
        const d = (p[2] + 1) / 2;
        ctx.fillStyle = `rgba(191,234,255,${(0.25 + 0.75 * d).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p[0], p[1], 0.7 + 1.5 * d, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = '#ffffff';
      sparks.forEach((s, k) => {
        s.t += dt * 0.8;
        if (s.t > 1) { s.t = 0; s.e = edges[(Math.floor(now / 53) + k * 29) % edges.length]; }
        const [i, j] = s.e, x = P[i][0] + (P[j][0] - P[i][0]) * s.t, y = P[i][1] + (P[j][1] - P[i][1]) * s.t;
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';

      // Impulsos que viajan de AITI hacia cada función
      if (hatched) wireEls.forEach((w, k) => {
        const on = k === cur;
        w.pulses.forEach((c, n) => {
          if (!on && n > 0) { c.style.opacity = 0; return; }
          const u = ((t * (on ? 0.55 : 0.28) + n / 3 + k * 0.17) % 1), pt = w.path.getPointAtLength(u * w.len);
          c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
          c.setAttribute('r', on ? 3.2 : 2.2);
          c.style.opacity = (Math.sin(u * Math.PI) * (on ? 1 : 0.55)).toFixed(2);
        });
      });

      raf = seen && !still ? requestAnimationFrame(draw) : 0;
    }

    function hatch() {
      if (hatched) return;
      hatched = true;
      if (still) return;
      requestAnimationFrame(() => {
        ait.classList.remove('is-hatch');
        wireEls.forEach((w, k) => { w.path.style.transition = `stroke-dashoffset 0.9s ease-out ${0.9 + k * 0.11}s, stroke 0.4s, stroke-width 0.4s`; w.path.style.strokeDashoffset = 0; });
      });
    }

    if (!still) ait.classList.add('is-hatch');
    layout();
    select(0);
    new ResizeObserver(() => layout()).observe(stage);
    new IntersectionObserver(es => {
      seen = es.some(e => e.isIntersecting);
      if (seen) { hatch(); if (!raf) { last = 0; raf = requestAnimationFrame(draw); } schedule(); }
      else clearTimeout(timer);
    }, { threshold: 0.12 }).observe(ait);
    if (still) { hatched = true; draw(0); }
  })();
