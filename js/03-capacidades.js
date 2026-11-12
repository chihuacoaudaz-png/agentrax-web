  /* Capacidades y Productos */
  (() => {
    // Capacidades: un panel abierto a la vez (al pasar el cursor o al tocar)
    const panels = [...document.querySelectorAll('.cap__panel')];
    const open = p => panels.forEach(o => { o.classList.toggle('is-on', o === p); o.setAttribute('aria-expanded', String(o === p)); });
    panels.forEach(p => {
      p.addEventListener('click', () => open(p));
      p.addEventListener('mouseenter', () => { if (window.matchMedia('(hover: hover)').matches) open(p); });
      p.addEventListener('focus', () => open(p));
    });

    // Coach digital: el súper agente de la portada (esfera de red neuronal con impulsos) girando en 3D
    document.querySelectorAll('.coach-orb').forEach(g => {
      const NS = 'http://www.w3.org/2000/svg', R = +g.dataset.r, N = 56, pts = [];
      for (let k = 0; k < N; k++) {
        const y = 1 - k / (N - 1) * 2, rad = Math.sqrt(1 - y * y), th = k * 2.399963, j = 0.86 + 0.14 * ((k * 7919) % 13) / 13;
        pts.push([Math.cos(th) * rad * j, y * j, Math.sin(th) * rad * j]);
      }
      const edges = [];
      pts.forEach((p, i) => pts.map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2])
        .filter(([j]) => j > i).sort((a, b) => a[1] - b[1]).slice(0, 3).forEach(([j]) => edges.push([i, j])));
      const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); g.appendChild(e); return e; };
      const lines = edges.map(() => el('line', { stroke: '#5fc8ff', 'stroke-width': 0.7 }));
      const dots = pts.map(() => el('circle', { fill: '#bfeaff' }));
      const sparks = [0, 1, 2, 3, 4, 5].map(k => ({ c: el('circle', { r: 1.7, fill: '#ffffff' }), e: edges[(k * 17) % edges.length], t: k / 6 }));
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const panel = g.closest('.cap__panel');
      let raf = 0, last = 0, ang = 0, seen = false;
      function frame(now) {
        const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now; ang += dt * 0.45;
        const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(0.35), st = Math.sin(0.35);
        const P = pts.map(([x, y, z]) => { const x1 = x * ca + z * sa, z1 = -x * sa + z * ca; return [x1 * R, (y * ct - z1 * st) * R, y * st + z1 * ct]; });
        edges.forEach(([i, j], k) => {
          const l = lines[k];
          l.setAttribute('x1', P[i][0].toFixed(1)); l.setAttribute('y1', P[i][1].toFixed(1));
          l.setAttribute('x2', P[j][0].toFixed(1)); l.setAttribute('y2', P[j][1].toFixed(1));
          l.setAttribute('opacity', (0.1 + 0.32 * ((P[i][2] + P[j][2]) / 2 + 1) / 2).toFixed(2));
        });
        P.forEach((p, k) => {
          const d = (p[2] + 1) / 2;
          dots[k].setAttribute('cx', p[0].toFixed(1)); dots[k].setAttribute('cy', p[1].toFixed(1));
          dots[k].setAttribute('r', (0.9 + 1.1 * d).toFixed(2)); dots[k].setAttribute('opacity', (0.3 + 0.7 * d).toFixed(2));
        });
        sparks.forEach((s, k) => {
          s.t += dt * 0.9;
          if (s.t > 1) { s.t = 0; s.e = edges[(Math.floor(now / 97) + k * 13) % edges.length]; }
          const [i, j] = s.e;
          s.c.setAttribute('cx', (P[i][0] + (P[j][0] - P[i][0]) * s.t).toFixed(1));
          s.c.setAttribute('cy', (P[i][1] + (P[j][1] - P[i][1]) * s.t).toFixed(1));
        });
        raf = !still && seen && (!panel || panel.classList.contains('is-on')) ? requestAnimationFrame(frame) : 0;
      }
      const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
      frame(0);
      new IntersectionObserver(es => { seen = es.some(e => e.isIntersecting); if (seen) kick(); }).observe(panel || g.closest('svg'));
      if (panel) new MutationObserver(() => { if (panel.classList.contains('is-on')) kick(); }).observe(panel, { attributes: true, attributeFilter: ['class'] });
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('.cap__art').forEach(s => s.pauseAnimations && s.pauseAnimations());

  })();
