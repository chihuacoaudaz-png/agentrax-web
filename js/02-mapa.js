  /* Nosotros y Videos */
  (() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const watch = (el, cb) => new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting)), { threshold: 0.25 }).observe(el);

    // Mapa de alcance: Perú (por regiones) → Latinoamérica (países mineros) → Mundo. Cambia solo cuando el visitante elige.
    const mapSvg = document.getElementById('reach-map'), mapG = document.getElementById('reach-g'), reachNote = document.getElementById('reach-note');
    const reachTabs = [...document.querySelectorAll('[data-reach]')];
    const LATAM = [484, 320, 84, 340, 222, 558, 188, 591, 192, 214, 332, 170, 862, 328, 740, 218, 604, 76, 68, 600, 152, 32, 858];
    const MINING_LA = [484, 170, 218, 604, 68, 76, 152, 32];
    const NAMES = { 604: 'Perú', 152: 'Chile', 484: 'México', 76: 'Brasil', 170: 'Colombia', 32: 'Argentina', 68: 'Bolivia', 218: 'Ecuador', 124: 'Canadá', 840: 'Estados Unidos', 36: 'Australia', 710: 'Sudáfrica' };
    const LABEL_AT = { 604: [-75, -9.6], 152: [-67.5, -27], 484: [-102, 23.5], 76: [-51, -10], 170: [-73, 4.5], 32: [-65, -36], 68: [-64.5, -17], 218: [-80.5, -1.2], 124: [-104, 58], 840: [-99, 39], 36: [134, -25], 710: [24, -29.5] };
    // Regiones del Perú (límites departamentales) y las principales regiones mineras
    const REGION_NAME = { AMAZONAS: 'Amazonas', ANCASH: 'Áncash', APURIMAC: 'Apurímac', AREQUIPA: 'Arequipa', AYACUCHO: 'Ayacucho', CAJAMARCA: 'Cajamarca', CALLAO: 'Callao', CUSCO: 'Cusco', HUANCAVELICA: 'Huancavelica', HUANUCO: 'Huánuco', ICA: 'Ica', JUNIN: 'Junín', 'LA LIBERTAD': 'La Libertad', LAMBAYEQUE: 'Lambayeque', LIMA: 'Lima', LORETO: 'Loreto', 'MADRE DE DIOS': 'Madre de Dios', MOQUEGUA: 'Moquegua', PASCO: 'Pasco', PIURA: 'Piura', PUNO: 'Puno', 'SAN MARTIN': 'San Martín', TACNA: 'Tacna', TUMBES: 'Tumbes', UCAYALI: 'Ucayali' };
    const MINING_PE = ['CAJAMARCA', 'LA LIBERTAD', 'ANCASH', 'PASCO', 'JUNIN', 'ICA', 'APURIMAC', 'CUSCO', 'AREQUIPA', 'PUNO', 'MOQUEGUA', 'TACNA'];
    const STAGES = [
      { focus: [604], hi: [], strong: [], labels: [], arcs: [], regions: true, pad: 1.3, note: 'Nuestra base: Lima. Desde aquí, conectados con las principales regiones mineras del país.' },
      { focus: LATAM, hi: MINING_LA, strong: [], labels: MINING_LA, arcs: [484, 170, 218, 68, 76, 152, 32], pad: 1.08, note: 'Los países mineros de la región, de la mano de aliados locales.' },
      { focus: null, hi: [...MINING_LA, 710], strong: [124, 840, 36], labels: [124, 840, 36, 604], arcs: [124, 840, 36, 710, 76, 484, 152], pad: 1, note: 'Productos escalables para las grandes regiones mineras del mundo: Canadá, Estados Unidos y Australia.' }
    ];
    const SVGNS = 'http://www.w3.org/2000/svg';
    let mapReady = false, mapStage = 0, countries = [], labels = {}, regions = [], regionsG = null, homeDot = null, homeRing = null, path = null, proj = null, topoData = null, peruData = null, MW = 960, MH = 500;
    let arcsG = null, arcTimers = [];
    const mapDims = () => window.innerWidth < 600 ? [600, 560] : [840, 520];
    const loadScript = src => new Promise((ok, fail) => { const s = document.createElement('script'); s.src = src; s.async = false; s.onload = ok; s.onerror = fail; document.head.appendChild(s); });
    const svgEl = (tag, attrs, cls) => { const e = document.createElementNS(SVGNS, tag); Object.entries(attrs || {}).forEach(([a, v]) => e.setAttribute(a, v)); if (cls) e.setAttribute('class', cls); return e; };
    async function buildMap() {
      [, , , topoData, peruData] = await Promise.all([
        loadScript('js/vendor/d3-array.min.js'),
        loadScript('js/vendor/d3-geo.min.js'),
        loadScript('js/vendor/topojson-client.min.js'),
        fetch('datos/countries-110m.json').then(r => r.json()),
        fetch('peru-regiones.json').then(r => r.json()).catch(() => null)
      ]);
      drawMap();
    }
    function drawMap() {
      [MW, MH] = mapDims();
      mapSvg.setAttribute('viewBox', `0 0 ${MW} ${MH}`);
      mapG.textContent = ''; countries = []; labels = {}; regions = [];
      const all = topojson.feature(topoData, topoData.objects.countries).features.filter(f => +f.id !== 10);
      proj = d3.geoNaturalEarth1().fitExtent([[10, 10], [MW - 10, MH - 10]], { type: 'FeatureCollection', features: all });
      path = d3.geoPath(proj);
      all.forEach(f => {
        const id = +f.id, p = svgEl('path', { d: path(f) }, 'rc');
        if (NAMES[id]) p.appendChild(Object.assign(svgEl('title'), { textContent: NAMES[id] }));
        mapG.appendChild(p);
        countries.push({ id, el: p, f });
      });
      regionsG = svgEl('g', {}, 'rr-g'); mapG.appendChild(regionsG);
      if (peruData) peruData.features.forEach(f => {
        const key = f.properties.n, p = svgEl('path', { d: path(f) }, 'rr');
        p.appendChild(Object.assign(svgEl('title'), { textContent: REGION_NAME[key] || key }));
        const [cx, cy] = path.centroid(f), t = svgEl('text', { x: cx, y: cy }, 'rl rl--region');
        t.textContent = (REGION_NAME[key] || key).toUpperCase();
        regionsG.appendChild(p);
        regions.push({ key, el: p, label: t, c: [cx, cy] });
      });
      arcsG = svgEl('g'); mapG.appendChild(arcsG);
      regions.forEach(r => mapG.appendChild(r.label));
      Object.keys(LABEL_AT).forEach(id => {
        const [x, y] = proj(LABEL_AT[id]), t = svgEl('text', { x, y }, 'rl');
        t.textContent = NAMES[id].toUpperCase();
        mapG.appendChild(t); labels[id] = t;
      });
      const [lx, ly] = proj([-77.04, -12.05]);
      homeRing = svgEl('circle', { cx: lx, cy: ly }, 'r-ring');
      homeDot = svgEl('circle', { cx: lx, cy: ly }, 'r-home');
      mapG.append(homeRing, homeDot);
      mapReady = true;
      showStage(mapStage, true);
    }
    function showStage(i, instant) {
      mapStage = i;
      reachTabs.forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
      reachNote.textContent = STAGES[i].note;
      if (!mapReady) return;
      const s = STAGES[i];
      // Encuadre de la región elegida
      let k = 1, tx = 0, ty = 0;
      if (s.focus) {
        const fc = { type: 'FeatureCollection', features: countries.filter(c => s.focus.includes(c.id)).map(c => c.f) };
        const [[x0, y0], [x1, y1]] = path.bounds(fc);
        const w = (x1 - x0) * s.pad, h = (y1 - y0) * s.pad;
        k = Math.min(MW / w, MH / h, 16);
        tx = MW / 2 - k * (x0 + x1) / 2; ty = MH / 2 - k * (y0 + y1) / 2;
      }
      if (instant) { mapG.style.transition = 'none'; requestAnimationFrame(() => { mapG.style.transition = ''; }); }
      mapG.style.transform = `translate(${tx}px, ${ty}px) scale(${k})`;
      // Países resaltados, uno tras otro
      let n = 0;
      countries.forEach(c => {
        const hi = s.hi.includes(c.id), strong = s.strong.includes(c.id), home = c.id === 604 && !s.regions;
        c.el.style.transitionDelay = (hi || strong) ? `${0.35 + 0.08 * n++}s` : '0s';
        c.el.classList.toggle('is-hi', hi && !strong);
        c.el.classList.toggle('is-strong', strong);
        c.el.classList.toggle('is-home', home);
      });
      const base = MW < 840 ? 17 : 12;
      Object.keys(labels).forEach(id => {
        const t = labels[id];
        t.classList.toggle('is-on', s.labels.includes(+id));
        t.classList.toggle('rl--strong', s.strong.includes(+id) || +id === 604);
        t.style.fontSize = `${base / k}px`; t.style.strokeWidth = `${3 / k}px`;
      });
      // Regiones del Perú: visibles al acercarse; las mineras se encienden y Lima es la base
      regionsG.classList.toggle('is-on', !!s.regions);
      let m = 0;
      regions.forEach(r => {
        const mine = MINING_PE.includes(r.key), home = r.key === 'LIMA' || r.key === 'CALLAO';
        r.el.style.transitionDelay = s.regions && mine ? `${0.5 + 0.06 * m++}s` : '0s';
        r.el.classList.toggle('is-hi', !!s.regions && mine);
        r.el.classList.toggle('is-home', home);
        r.label.classList.toggle('is-on', !!s.regions && (mine || r.key === 'LIMA'));
        r.label.classList.toggle('rl--strong', r.key === 'LIMA');
        r.label.style.fontSize = `${(base * 0.8) / k}px`; r.label.style.strokeWidth = `${3 / k}px`;
      });
      homeDot.setAttribute('r', 4.5 / k); homeRing.setAttribute('r', 4.5 / k);
      const targets = s.regions
        ? regions.filter(r => MINING_PE.includes(r.key)).map(r => r.c)
        : s.arcs.map(id => proj(LABEL_AT[id]));
      drawArcs(targets, k, s.regions ? 0.12 : 0.24);
    }
    // Unificación: líneas que salen de Lima y llegan a cada destino de la región elegida, con un pulso que viaja
    function drawArcs(targets, k, bend) {
      arcTimers.forEach(clearTimeout); arcTimers = [];
      arcsG.textContent = '';
      const [lx, ly] = proj([-77.04, -12.05]);
      targets.forEach(([x, y], n) => {
        const d = Math.hypot(x - lx, y - ly) || 1;
        let nx = -(y - ly) / d, ny = (x - lx) / d;
        if (ny > 0 || (Math.abs(ny) < 0.2 && nx > 0)) { nx = -nx; ny = -ny; }
        const cx = (lx + x) / 2 + nx * d * bend, cy = (ly + y) / 2 + ny * d * bend;
        const dAttr = `M${lx},${ly} Q${cx},${cy} ${x},${y}`, delay = 0.9 + n * 0.12;
        const arc = svgEl('path', { d: dAttr, pathLength: 1 }, 'r-arc');
        arc.style.strokeWidth = `${1.6 / k}px`; arc.style.animationDelay = `${delay}s`;
        const end = svgEl('circle', { cx: x, cy: y, r: 3 / k }, 'r-end');
        end.style.animationDelay = `${delay + 0.9}s`;
        const pulse = svgEl('circle', { r: 2.6 / k }, 'r-pulse');
        pulse.style.strokeWidth = `${1.2 / k}px`;
        const move = svgEl('animateMotion', { dur: '2.6s', repeatCount: 'indefinite', begin: 'indefinite', path: dAttr });
        pulse.appendChild(move);
        arcsG.append(arc, end, pulse);
        if (!reduce) arcTimers.push(setTimeout(() => { pulse.classList.add('is-on'); try { move.beginElement(); } catch (e) {} }, (delay + 1.1) * 1000));
      });
    }
    reachTabs.forEach((b, k) => b.addEventListener('click', () => showStage(k)));
    window.addEventListener('resize', () => { if (mapReady && mapDims()[0] !== MW) drawMap(); });
    const mapIO = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      mapIO.disconnect();
      buildMap().catch(() => { reachNote.textContent = 'Desde Lima, Perú, para operaciones de Latinoamérica y el mundo.'; mapSvg.style.display = 'none'; });
    }, { rootMargin: '300px' });
    mapIO.observe(mapSvg);

    // Video de AITI: con el código de YouTube en data-video, el póster lo reproduce al tocarlo
    const vidMain = document.getElementById('vid-main');
    if (vidMain && vidMain.dataset.video) {
      const poster = vidMain.querySelector('.vid-main__poster'), id = vidMain.dataset.video;
      document.getElementById('vid-soon').textContent = 'Ver video';
      poster.style.cursor = 'pointer';
      poster.addEventListener('click', () => {
        const f = document.createElement('iframe');
        f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
        f.title = 'Video de AITI'; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
        poster.hidden = true; vidMain.appendChild(f);
      });
    }
  })();
