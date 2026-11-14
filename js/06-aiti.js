  /* AITI: la esfera central emite sus funciones; cada función se muestra en la consola */
  (() => {
    const ait = document.getElementById('ait');
    if (!ait) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!still) ait.classList.add('is-hatch');

    let ready = false;
    function init() {
      if (ready) return;
      ready = true;
      const NS = 'http://www.w3.org/2000/svg';
      const stage = document.getElementById('ait-stage'), core = ait.querySelector('.ait__core'), wires = document.getElementById('ait-wires');
      const cv = document.getElementById('ait-orb'), ctx = cv.getContext('2d');
      const fns = [...ait.querySelectorAll('.ait__fn')], views = [...ait.querySelectorAll('.ait__view')];
      const kEl = document.getElementById('ait-k'), hEl = document.getElementById('ait-h'), pEl = document.getElementById('ait-p'), bEl = document.getElementById('ait-b'), aEl = document.getElementById('ait-a'), paEl = ait.querySelector('.ait__pa');
      const prog = ait.querySelector('.ait__prog i'), chat = ait.querySelector('.av-chat');
      const fmt = n => n.toLocaleString('es-PE').replace(/,/g, ' ');
      let cur = 0, timer = 0, chatT = 0, paused = false, seen = false, hatched = still, raf = 0, last = 0;
      let wireEls = [], dirs = [], W = 0, H = 0, dpr = 1;

      // Esfera de red neuronal (puntos en espiral de Fibonacci unidos con sus vecinos)
      const N = 170, ptsX = new Float32Array(N), ptsY = new Float32Array(N), ptsZ = new Float32Array(N);
      const ptsTmp = [];
      for (let k = 0; k < N; k++) {
        const y = 1 - k / (N - 1) * 2, rad = Math.sqrt(1 - y * y), th = k * 2.399963, j = 0.88 + 0.12 * ((k * 7919) % 17) / 17;
        const px = Math.cos(th) * rad * j, py = y * j, pz = Math.sin(th) * rad * j;
        ptsX[k] = px; ptsY[k] = py; ptsZ[k] = pz;
        ptsTmp.push([px, py, pz]);
      }
      const edgeList = [];
      ptsTmp.forEach((p, i) => ptsTmp.map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2])
        .filter(([j]) => j > i).sort((a, b) => a[1] - b[1]).slice(0, 3).forEach(([j]) => edgeList.push(i, j)));
      const NE = edgeList.length >> 1;
      const edgeA = new Uint16Array(NE), edgeB = new Uint16Array(NE);
      for (let e = 0; e < NE; e++) { edgeA[e] = edgeList[e * 2]; edgeB[e] = edgeList[e * 2 + 1]; }
      const sparks = Array.from({ length: 14 }, (_, k) => ({ e: (k * 37) % NE, t: k / 14 }));

      // Tablas por profundidad para agrupar trazos y puntos por lote (16 tonos: a lo más 6/255 del tono exacto)
      const BUCKETS = 16;
      const EDGE_COLS = Array.from({ length: BUCKETS }, (_, b) => `rgba(95,200,255,${(0.06 + 0.34 * ((b + 0.5) / BUCKETS)).toFixed(3)})`);
      const PT_COLS = Array.from({ length: BUCKETS }, (_, b) => `rgba(191,234,255,${(0.25 + 0.75 * ((b + 0.5) / BUCKETS)).toFixed(3)})`);
      const PT_RAD = Array.from({ length: BUCKETS }, (_, b) => 0.7 + 1.5 * ((b + 0.5) / BUCKETS));
      const Px = new Float32Array(N), Py = new Float32Array(N), Pz = new Float32Array(N);
      const edgeBuckets = Array.from({ length: BUCKETS }, () => []);
      const ptBuckets = Array.from({ length: BUCKETS }, () => []);

      let ang = still ? 0.45 : 0, yaw = 0, tilt = 0.35, tYaw = 0, tTilt = 0.35, burst = 1, burstDir = 0;

      // Lo que no depende del tiempo se prepara al cambiar el tamaño: degradados y trazados del anillo HUD
      // (se dibujan con stroke/fill, igual que antes, solo que en lote: marcas y arcos no se tocan entre sí)
      const RINGS = [[1.34, 0.30, -0.35, 0.5], [1.18, 0.42, 0.5, -0.7]];
      const ARCS = [[0.2, 0.9, 0.7], [2.3, 0.5, 0.45], [3.6, 1.1, 0.6], [5.2, 0.35, 0.4]].map(([s0, len, al]) => ({ s0, len, col: `rgba(56,189,248,${al})` }));
      const LUT_STEPS = 64;
      let haloG = null, satG = null, beamG = null, beamBx = 0, beamBy = 0, tickLong = null, tickShort = null, outer = null, ellipses = [];

      function updateBeam() {
        if (W <= 0 || H <= 0 || !dirs.length) { beamG = null; return; }
        const cx = W / 2, cy = H / 2, R = W * 0.3;
        beamBx = cx + Math.cos(burstDir) * R * 1.02;
        beamBy = cy + Math.sin(burstDir) * R * 1.02;
        beamG = ctx.createLinearGradient(cx, cy, beamBx, beamBy);
        beamG.addColorStop(0, 'rgba(191,234,255,0.7)'); beamG.addColorStop(1, 'rgba(56,189,248,0)');
      }

      function buildCaches() {
        const cx = W / 2, cy = H / 2, R = W * 0.3, hr = R * 1.48;
        haloG = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.65);
        haloG.addColorStop(0, 'rgba(56,189,248,0.30)'); haloG.addColorStop(0.5, 'rgba(0,88,196,0.12)'); haloG.addColorStop(1, 'rgba(0,88,196,0)');
        tickLong = new Path2D(); tickShort = new Path2D();
        for (let i = 0; i < 120; i++) {
          const a = i / 120 * Math.PI * 2, long = i % 10 === 0, r1 = hr - (long ? 9 : 4), p = long ? tickLong : tickShort;
          p.moveTo(Math.cos(a) * r1, Math.sin(a) * r1); p.lineTo(Math.cos(a) * hr, Math.sin(a) * hr);
        }
        ARCS.forEach(A => { A.p = new Path2D(); A.p.arc(0, 0, hr + 9, A.s0, A.s0 + A.len); });
        outer = new Path2D(); outer.arc(0, 0, hr + 18, 0, Math.PI * 2);
        ellipses = RINGS.map(([rx, ry]) => { const p = new Path2D(); p.ellipse(0, 0, R * rx, R * ry, 0, 0, Math.PI * 2); return p; });
        satG = ctx.createRadialGradient(0, 0, 0, 0, 0, 10); satG.addColorStop(0, 'rgba(56,189,248,0.5)'); satG.addColorStop(1, 'rgba(56,189,248,0)');
        updateBeam();
      }

      function size() {
        dpr = Math.min(2, window.devicePixelRatio || 1);
        W = cv.clientWidth; H = cv.clientHeight;
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildCaches();
      }

      // Cables desde la esfera hasta cada función (medidos sin transformaciones)
      function layout() {
        size();
        const sw = stage.offsetWidth, sh = stage.offsetHeight;
        const cx = core.offsetLeft + core.offsetWidth / 2, cy = core.offsetTop + core.offsetHeight / 2, r = core.offsetWidth * 0.4;
        wires.setAttribute('viewBox', `0 0 ${sw} ${sh}`);
        wires.textContent = ''; wireEls = []; dirs = [];
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
          const len = path.getTotalLength();
          const lut = new Float32Array((LUT_STEPS + 1) * 2);
          for (let s = 0; s <= LUT_STEPS; s++) {
            const pt = path.getPointAtLength((s / LUT_STEPS) * len);
            lut[s * 2] = pt.x; lut[s * 2 + 1] = pt.y;
          }
          wireEls.push({ path, dot, pulses, lut });
          dirs.push(a);
        });
        if (!hatched && !still) wireEls.forEach(w => { w.path.style.strokeDashoffset = 1; });
        mark();
        if (!raf) draw(still ? 0 : performance.now());
      }

      function mark() {
        wireEls.forEach((w, k) => {
          const on = k === cur;
          w.path.classList.toggle('is-on', on);
          w.dot.classList.toggle('is-on', on);
          w.pulses.forEach((c, n) => {
            c.setAttribute('r', on ? 3.2 : 2.2);
            if (!on && n > 0) c.style.opacity = 0;
          });
        });
        burstDir = dirs[cur] || 0;
        updateBeam();
      }

      function countUp(view) {
        view.querySelectorAll('[data-count]').forEach(b => {
          const end = +b.dataset.count;
          if (still) { b.textContent = fmt(end); return; }
          const t0 = performance.now(), dur = 1300;
          const step = now => { const k = Math.min(1, (now - t0) / dur); b.textContent = fmt(Math.round(end * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
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
        if (views[cur].contains(chat)) {
          if (still) chat.classList.add('is-said');
          else chatT = setTimeout(() => chat.classList.add('is-said'), 1700);
        }
        mark();
        burst = still ? 1 : 0;
        if (still && !raf) draw(0);
        schedule();
      }

      function schedule() {
        clearTimeout(timer);
        prog.classList.remove('run'); void prog.offsetWidth;
        if (still || !seen || document.hidden) return;
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
      if (!still) {
        stage.addEventListener('pointermove', e => {
          const r = core.getBoundingClientRect();
          tYaw = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / r.width)) * 0.7;
          tTilt = 0.35 + Math.max(-1, Math.min(1, (e.clientY - r.top - r.height / 2) / r.height)) * 0.4;
        });
        stage.addEventListener('pointerleave', () => { tYaw = 0; tTilt = 0.35; });
      }

      function draw(now) {
        if (!still && (!seen || document.hidden)) { raf = 0; return; }
        const dt = still ? 0 : (last ? Math.min(0.05, (now - last) / 1000) : 0);
        last = now;
        const t = still ? 2.4 : now / 1000;
        if (!still) {
          ang += dt * 0.32;
          yaw += (tYaw - yaw) * 0.06;
          tilt += (tTilt - tilt) * 0.06;
          burst = Math.min(1, burst + dt * 0.9);
        }
        const cx = W / 2, cy = H / 2, R = W * 0.3;
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';

        // Halo
        ctx.fillStyle = haloG; ctx.fillRect(0, 0, W, H);

        // Anillo de control (HUD): marcas que giran lento y arcos de energía alrededor de AITI
        ctx.save(); ctx.translate(cx, cy);
        ctx.rotate(t * 0.06);
        ctx.strokeStyle = 'rgba(127,211,255,0.55)'; ctx.lineWidth = 1.4; ctx.stroke(tickLong);
        ctx.strokeStyle = 'rgba(127,211,255,0.2)'; ctx.lineWidth = 0.8; ctx.stroke(tickShort);
        ctx.rotate(-t * 0.16);
        ctx.lineCap = 'round'; ctx.lineWidth = 2.2;
        for (let k = 0; k < ARCS.length; k++) { ctx.strokeStyle = ARCS[k].col; ctx.stroke(ARCS[k].p); }
        ctx.strokeStyle = 'rgba(127,211,255,0.12)'; ctx.lineWidth = 1; ctx.stroke(outer);
        ctx.restore();

        // Anillos orbitales con satélites
        for (let k = 0; k < RINGS.length; k++) {
          const [rx, ry, rot, sp] = RINGS[k];
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot + Math.sin(t * 0.2 + k) * 0.05);
          ctx.strokeStyle = 'rgba(127,211,255,0.22)'; ctx.lineWidth = 1; ctx.setLineDash([2, 6]);
          ctx.stroke(ellipses[k]); ctx.setLineDash([]);
          for (let s = 0; s < 2; s++) {
            const a = t * sp + s * Math.PI, x = Math.cos(a) * R * rx, y = Math.sin(a) * R * ry;
            ctx.translate(x, y);
            ctx.fillStyle = 'rgba(191,234,255,0.9)'; ctx.beginPath(); ctx.arc(0, 0, 2.4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = satG; ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
            ctx.translate(-x, -y);
          }
          ctx.restore();
        }

        // Proyección de la esfera (sin reservar arreglos por cuadro)
        const a1 = ang + yaw, ca = Math.cos(a1), sa = Math.sin(a1), ct = Math.cos(tilt), st = Math.sin(tilt);
        const Rb = R * (1 + Math.sin(t * 1.4) * 0.015);
        for (let b = 0; b < BUCKETS; b++) { edgeBuckets[b].length = 0; ptBuckets[b].length = 0; }
        for (let i = 0; i < N; i++) {
          const x = ptsX[i], y = ptsY[i], z = ptsZ[i];
          const x1 = x * ca + z * sa, z1 = -x * sa + z * ca;
          const pz = y * st + z1 * ct;
          Px[i] = cx + x1 * Rb;
          Py[i] = cy + (y * ct - z1 * st) * Rb;
          Pz[i] = pz;
          let b = (((pz + 1) * 0.5) * BUCKETS) | 0;
          if (b < 0) b = 0; else if (b >= BUCKETS) b = BUCKETS - 1;
          ptBuckets[b].push(i);
        }
        for (let e = 0; e < NE; e++) {
          const i = edgeA[e], j = edgeB[e];
          let b = ((((Pz[i] + Pz[j]) * 0.25 + 0.5)) * BUCKETS) | 0;
          if (b < 0) b = 0; else if (b >= BUCKETS) b = BUCKETS - 1;
          edgeBuckets[b].push(i, j);
        }
        ctx.lineWidth = 0.8;
        for (let b = 0; b < BUCKETS; b++) {
          const list = edgeBuckets[b];
          if (!list.length) continue;
          ctx.strokeStyle = EDGE_COLS[b];
          ctx.beginPath();
          for (let q = 0; q < list.length; q += 2) {
            const i = list[q], j = list[q + 1];
            ctx.moveTo(Px[i], Py[i]); ctx.lineTo(Px[j], Py[j]);
          }
          ctx.stroke();
        }

        // Núcleo luminoso
        const cr = R * (0.5 + Math.sin(t * 2) * 0.03);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(0.18, 'rgba(191,234,255,0.75)'); g.addColorStop(0.5, 'rgba(56,189,248,0.32)'); g.addColorStop(1, 'rgba(0,88,196,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.fill();

        // Haz hacia la función activa
        if (beamG && window.innerWidth > 900) {
          ctx.strokeStyle = beamG; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(beamBx, beamBy); ctx.stroke();
        }
        // Onda que sale al cambiar de función
        if (burst < 1) {
          ctx.strokeStyle = `rgba(127,211,255,${(0.7 * (1 - burst)).toFixed(3)})`; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(cx, cy, R * (0.55 + burst * 0.95), 0, Math.PI * 2); ctx.stroke();
        }

        // Puntos agrupados por cubeta de profundidad
        for (let b = 0; b < BUCKETS; b++) {
          const list = ptBuckets[b];
          if (!list.length) continue;
          const r = PT_RAD[b];
          ctx.fillStyle = PT_COLS[b];
          ctx.beginPath();
          for (let q = 0; q < list.length; q++) {
            const idx = list[q], px = Px[idx], py = Py[idx];
            ctx.moveTo(px + r, py); ctx.arc(px, py, r, 0, Math.PI * 2);
          }
          ctx.fill();
        }

        // Destellos agrupados en un solo trazo
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        for (let k = 0; k < sparks.length; k++) {
          const s = sparks[k];
          if (!still) {
            s.t += dt * 0.8;
            if (s.t > 1) { s.t = 0; s.e = (Math.floor(now / 53) + k * 29) % NE; }
          }
          const i = edgeA[s.e], j = edgeB[s.e];
          const sx = Px[i] + (Px[j] - Px[i]) * s.t, sy = Py[i] + (Py[j] - Py[i]) * s.t;
          ctx.moveTo(sx + 1.8, sy); ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Impulsos sobre los cables (tabla precalculada, sin getPointAtLength)
        if (hatched) {
          for (let k = 0; k < wireEls.length; k++) {
            const w = wireEls[k], on = k === cur, lut = w.lut;
            for (let n = 0; n < w.pulses.length; n++) {
              if (!on && n > 0) continue;
              const u = (t * (on ? 0.55 : 0.28) + n / 3 + k * 0.17) % 1;
              const pos = u * LUT_STEPS, i0 = pos | 0, f = pos - i0, o = i0 * 2;
              const x = lut[o] + (lut[o + 2] - lut[o]) * f;
              const y = lut[o + 1] + (lut[o + 3] - lut[o + 1]) * f;
              const c = w.pulses[n];
              c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1));
              c.style.opacity = (Math.sin(u * Math.PI) * (on ? 1 : 0.55)).toFixed(2);
            }
          }
        }

        raf = seen && !still && !document.hidden ? requestAnimationFrame(draw) : 0;
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

      layout();
      select(0);
      new ResizeObserver(() => layout()).observe(stage);
      new IntersectionObserver(es => {
        seen = es.some(e => e.isIntersecting);
        if (seen) {
          hatch();
          if (!still && !raf && !document.hidden) { last = 0; raf = requestAnimationFrame(draw); }
          schedule();
        } else {
          clearTimeout(timer);
        }
      }, { threshold: 0.12 }).observe(ait);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { clearTimeout(timer); }
        else if (seen) {
          if (!still && !raf) { last = 0; raf = requestAnimationFrame(draw); }
          schedule();
        }
      });
    }

    // Construcción perezosa cuando la sección se acerca a ~1 pantalla
    const nearIO = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      nearIO.disconnect();
      init();
    }, { rootMargin: '100% 0px' });
    nearIO.observe(ait);
  })();
