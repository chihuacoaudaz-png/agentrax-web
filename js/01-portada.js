    /* ---------- Datos de ejemplo por industria ---------- */
    const INDUSTRIES = [
      { id: 'mineria', icon: 'i-mine', name: 'Minería', sub: 'Guardia, perforación y flota',
        areas: [
          ['Operación mina', 'Metros perforados, guardia noche', '1 240', 'm', 'ok', .78],
          ['Mantenimiento', 'Disponibilidad de flota', '87', '%', 'ok', .87],
          ['Logística', 'Despachos de combustible', '14/16', '', 'ok', .875],
          ['Seguridad', 'Reportes de incidente abiertos', '2', '', 'alert', .4],
          ['Personas', 'Tareos marcados', '312/318', '', 'ok', .98],
          ['Finanzas', 'Valorización del mes', '72', '%', 'ok', .72] ],
        coach: [
          ['05:40', 'La PER-47 lleva 1 h 20 min en stand-by sin código de demora. Ya avisé al supervisor de guardia.', 'alert'],
          ['06:15', 'Seguridad tiene 2 reportes abiertos del banco 3820. El de mayor riesgo vence hoy.', 'alert'],
          ['07:02', 'La flota cerró la guardia con 87 % de disponibilidad, 3 puntos sobre ayer.', 'ok'],
          ['07:30', 'Faltan 6 tareos por marcar. La valorización del mes no se cierra sin ellos.', 'ok'] ] },
      { id: 'ambiental', icon: 'i-env', name: 'Ambiental', sub: 'Monitoreo OEFA y efluentes',
        areas: [
          ['Monitoreo', 'Estaciones que reportaron hoy', '11/12', '', 'alert', .92],
          ['Efluentes', 'pH en el punto de descarga', '7,2', 'pH', 'ok', .6],
          ['Laboratorio', 'Muestras por analizar', '18', '', 'ok', .45],
          ['Permisos', 'Informes OEFA del trimestre', '3/4', '', 'ok', .75],
          ['Personas', 'Cuadrillas en campo', '5', '', 'ok', .83],
          ['Finanzas', 'Gasto del mes contra el plan', '64', '%', 'ok', .64] ],
        coach: [
          ['06:10', 'La estación E-07 no reporta desde las 02:00. Se programó una visita de campo.', 'alert'],
          ['08:20', 'El pH en la descarga se mantuvo en 7,2 durante toda la noche.', 'ok'],
          ['09:00', 'Falta un informe del trimestre para OEFA. Vence en 9 días.', 'ok'],
          ['10:45', 'Laboratorio recibió 18 muestras nuevas de la cuadrilla 3.', 'ok'] ] },
      { id: 'industrial', icon: 'i-plant', name: 'Industrial', sub: 'Plantas y manufactura',
        areas: [
          ['Producción', 'Unidades del turno', '4 860', 'u', 'ok', .81],
          ['Calidad', 'Lotes observados', '1', '', 'alert', .2],
          ['Mantenimiento', 'Paradas no programadas', '0', '', 'ok', .05],
          ['Almacén', 'Pedidos atendidos', '22/24', '', 'ok', .92],
          ['Personas', 'Asistencia del turno', '96', '%', 'ok', .96],
          ['Finanzas', 'Costo por unidad contra la meta', '98', '%', 'ok', .98] ],
        coach: [
          ['07:15', 'El lote 2291 quedó observado por calidad. Producción ya fue avisada.', 'alert'],
          ['08:40', 'Sin paradas no programadas en la línea 2 durante el turno.', 'ok'],
          ['10:05', 'Dos pedidos de almacén siguen pendientes desde ayer.', 'ok'],
          ['11:20', 'El costo por unidad del turno quedó dentro de la meta.', 'ok'] ] },
      { id: 'mecanica', icon: 'i-gear', name: 'Mecánica', sub: 'Mantenimiento y telemetría',
        areas: [
          ['Taller', 'Equipos en reparación', '4', '', 'ok', .33],
          ['Telemetría', 'Equipos reportando', '38/40', '', 'alert', .95],
          ['Repuestos', 'Repuestos críticos en stock', '92', '%', 'ok', .92],
          ['Órdenes de trabajo', 'Cerradas esta semana', '17/21', '', 'ok', .81],
          ['Personas', 'Técnicos en turno', '12', '', 'ok', .86],
          ['Finanzas', 'Gasto de mantenimiento del mes', '58', '%', 'ok', .58] ],
        coach: [
          ['05:55', 'El cargador CF-12 dejó de enviar telemetría a las 04:30. Revisar antes de salir a campo.', 'alert'],
          ['09:10', 'Quedan 4 órdenes de trabajo abiertas; 2 esperan repuestos.', 'ok'],
          ['10:30', 'El stock de filtros críticos baja de 10 unidades el jueves.', 'ok'],
          ['12:00', 'Taller liberó el volquete VQ-03 para la guardia de tarde.', 'ok'] ] },
      { id: 'civil', icon: 'i-civil', name: 'Civil', sub: 'Expedientes técnicos y avance',
        areas: [
          ['Avance de obra', 'Avance físico acumulado', '63', '%', 'ok', .63],
          ['Expedientes', 'Planos aprobados', '41/45', '', 'ok', .91],
          ['Logística', 'Concreto programado hoy', '120', 'm³', 'ok', .7],
          ['Seguridad', 'Charlas de 5 minutos hechas', '6/7', '', 'alert', .86],
          ['Valorizaciones', 'Valorización del mes', '48', '%', 'ok', .48],
          ['Personas', 'Personal en obra', '86', '', 'ok', .8] ],
        coach: [
          ['07:05', 'Falta registrar la charla de 5 minutos del frente 3.', 'alert'],
          ['11:30', 'El avance físico va 2 puntos detrás del cronograma en estructuras.', 'ok'],
          ['14:10', 'Cuatro planos siguen en revisión; el expediente se cierra el viernes.', 'ok'],
          ['16:00', 'Se confirmó el vaciado de 120 m³ para mañana a las 07:00.', 'ok'] ] },
      { id: 'mas', icon: 'i-more', name: 'Y más industrias', sub: 'Finanzas, logística y energía',
        areas: [
          ['Ventas', 'Pedidos del día', '132', '', 'ok', .66],
          ['Logística', 'Entregas a tiempo', '94', '%', 'ok', .94],
          ['Atención', 'Consultas respondidas', '58/60', '', 'ok', .97],
          ['Energía', 'Consumo contra el presupuesto', '103', '%', 'alert', 1],
          ['Personas', 'Asistencia del día', '97', '%', 'ok', .97],
          ['Finanzas', 'Cobranza del mes', '71', '%', 'ok', .71] ],
        coach: [
          ['08:00', 'El consumo de energía va 3 % sobre el presupuesto del mes.', 'alert'],
          ['09:30', 'Dos consultas de clientes esperan respuesta desde ayer.', 'ok'],
          ['12:15', 'Logística entregó a tiempo 94 de cada 100 pedidos esta semana.', 'ok'],
          ['15:40', 'La cobranza del mes avanza al 71 %; faltan 3 facturas grandes.', 'ok'] ] }
    ];

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tabsEl = document.getElementById('tabs');
    const grid = document.getElementById('grid');
    const tower = document.getElementById('tower');
    const feed = document.getElementById('feed');
    const svg = document.getElementById('pipes');
    const mimic = document.getElementById('mimic');
    const NS = 'http://www.w3.org/2000/svg';
    let current = INDUSTRIES[0];
    let coachTimer = null, coachIndex = 0, drawn = false;

    /* Pestañas */
    INDUSTRIES.forEach((ind, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.role = 'tab';
      b.id = 'tab-' + ind.id; b.setAttribute('aria-controls', 'mimic');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.tabIndex = i === 0 ? 0 : -1;
      b.innerHTML = `<svg aria-hidden="true"><use href="#${ind.icon}"/></svg><span><b>${ind.name}</b><small>${ind.sub}</small></span>`;
      b.addEventListener('click', () => select(ind.id, true));
      tabsEl.appendChild(b);
    });
    tabsEl.addEventListener('keydown', e => {
      const tabs = [...tabsEl.children];
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); tabs[n].focus(); select(INDUSTRIES[n].id, true); }
    });

    /* Áreas */
    const areaEls = [];
    for (let i = 0; i < 6; i++) {
      const a = document.createElement('div');
      a.className = 'area';
      a.innerHTML = `
        <div class="area__top"><span class="area__id">A-0${i + 1}</span><span class="area__name swap"></span><span class="state swap"></span></div>
        <div class="area__read swap"><span class="area__val"></span><span class="area__unit"></span></div>
        <div class="area__label swap"></div>
        <div class="gauge" aria-hidden="true"><i></i></div>`;
      grid.insertBefore(a, tower);
      areaEls.push(a);
    }

    function paintAreas(ind) {
      ind.areas.forEach((d, i) => {
        const a = areaEls[i];
        const [name, label, val, unit, state, pct] = d;
        a.dataset.state = state;
        a.querySelector('.area__name').textContent = name;
        a.querySelector('.area__val').textContent = val;
        a.querySelector('.area__unit').textContent = unit;
        a.querySelector('.area__label').textContent = label;
        a.querySelector('.state').className = 'state swap state--' + state;
        a.querySelector('.state').innerHTML = `<svg aria-hidden="true"><use href="#i-${state}"/></svg><span>${state === 'ok' ? 'En orden' : 'Atención'}</span>`;
        a.querySelector('.state').setAttribute('aria-label', state === 'ok' ? 'En orden' : 'Atención');
        a.querySelector('.gauge i').style.setProperty('--v', pct);
      });
    }

    /* Tuberías ortogonales de cada área a la torre */
    function route(a, t, box, narrow, gapX) {
      const r = el => { const b = el.getBoundingClientRect(); return { l: b.left - box.left, r: b.right - box.left, t: b.top - box.top, b: b.bottom - box.top, cx: (b.left + b.right) / 2 - box.left, cy: (b.top + b.bottom) / 2 - box.top }; };
      const A = r(a), T = r(t);
      if (narrow) {
        const leftCol = A.cx < gapX;
        const sx = leftCol ? A.r : A.l, sy = A.t + 22;
        return `M${sx} ${sy} H${gapX} V${T.b}`;
      }
      const left = A.r <= T.l;
      const sx = left ? A.r : A.l;
      const ex = left ? T.l : T.r;
      const ey = Math.min(Math.max(A.cy, T.t + 40), T.b - 40);
      const mx = (sx + ex) / 2;
      return `M${sx} ${A.cy} H${mx} V${ey} H${ex}`;
    }

    function drawPipes() {
      const box = mimic.getBoundingClientRect();
      const narrow = window.matchMedia('(max-width: 900px)').matches;
      let gapX = 0;
      if (narrow) {
        const L = areaEls[0].getBoundingClientRect(), R = areaEls[3].getBoundingClientRect();
        gapX = (L.right + R.left) / 2 - box.left;
      }
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.innerHTML = '';
      areaEls.forEach((a, i) => {
        const d = route(a, tower, box, narrow, gapX);
        const alert = a.dataset.state === 'alert';
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', d);
        p.setAttribute('class', alert ? 'p-alert' : 'p-base');
        p.id = 'pipe-' + i;
        svg.appendChild(p);
        const len = p.getTotalLength();
        p.style.setProperty('--len', len);
        p.style.setProperty('--d', (i * 90) + 'ms');
        if (!reduceMotion) {
          const c = document.createElementNS(NS, 'circle');
          c.setAttribute('r', 3.5);
          if (alert) c.setAttribute('class', 'c-alert');
          const m = document.createElementNS(NS, 'animateMotion');
          m.setAttribute('dur', (2.4 + (i % 3) * 0.5) + 's');
          m.setAttribute('repeatCount', 'indefinite');
          m.setAttribute('begin', (drawn ? 0 : 1.1 + i * 0.09) + 's');
          m.setAttribute('path', d);
          c.appendChild(m);
          svg.appendChild(c);
        }
      });
      if (!drawn) { svg.classList.add('is-drawing'); drawn = true; }
      else svg.classList.remove('is-drawing');
    }

    /* Coach digital */
    /* Tres casillas fijas: el aviso nuevo entra arriba y los demás bajan de casilla sin mover la página */
    let shown = [];
    const slots = [0, 1, 2].map(() => {
      const li = document.createElement('li');
      li.className = 'msg';
      li.innerHTML = '<time></time><span></span>';
      feed.appendChild(li);
      return li;
    });
    function renderCoach(animate) {
      slots.forEach((li, i) => {
        const m = shown[i];
        li.dataset.kind = m[2];
        li.querySelector('time').textContent = m[0];
        li.querySelector('span').textContent = m[1];
        li.classList.remove('msg--in');
      });
      if (animate) { void slots[0].offsetWidth; slots[0].classList.add('msg--in'); }
    }
    function pushMsg(m, animate) {
      shown = [m, ...shown.filter(x => x !== m)].slice(0, 3);
      renderCoach(animate);
    }
    function resetCoach(ind) {
      shown = ind.coach.slice(0, 3);
      renderCoach(false);
      coachIndex = 3;
    }
    function tickCoach() {
      if (paused || document.hidden || mimic.matches(':hover') || mimic.contains(document.activeElement)) return;
      const list = current.coach;
      pushMsg(list[coachIndex % list.length], true);
      coachIndex++;
    }

    function select(id, user) {
      const ind = INDUSTRIES.find(x => x.id === id);
      if (!ind) return;
      current = ind;
      [...tabsEl.children].forEach(b => {
        const on = b.id === 'tab-' + id;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      mimic.setAttribute('aria-labelledby', 'tab-' + id);
      if (user) { const u = new URL(location.href); u.searchParams.set('industria', id); history.replaceState(null, '', u); }
      if (!user) { paintAreas(ind); resetCoach(ind); return; }
      mimic.classList.add('is-swapping');
      setTimeout(() => {
        paintAreas(ind); resetCoach(ind); drawPipes();
        mimic.classList.remove('is-swapping');
      }, 180);
    }

    const fromUrl = new URLSearchParams(location.search).get('industria');
    select(INDUSTRIES.some(x => x.id === fromUrl) ? fromUrl : 'mineria', false);
    const startPipes = () => requestAnimationFrame(() => { drawPipes(); drawRoute(); sizeTopo(); requestAnimationFrame(loopTopo); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(startPipes); else startPipes();
    let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { drawPipes(); drawRoute(); sizeTopo(); }, 120); });
    let paused = reduceMotion;
    const pauseBtn = document.getElementById('pause');
    const setPaused = p => {
      paused = p;
      pauseBtn.setAttribute('aria-pressed', String(p));
      pauseBtn.textContent = p ? 'Reanudar animación' : 'Pausar animación';
      [svg, document.getElementById('route-pipes')].forEach(s => { if (s && s.pauseAnimations) p ? s.pauseAnimations() : s.unpauseAnimations(); });
    };
    setPaused(paused);
    pauseBtn.addEventListener('click', () => setPaused(!paused));
    coachTimer = setInterval(tickCoach, 4800);

    document.querySelectorAll('[data-industry]').forEach(a => a.addEventListener('click', () => select(a.dataset.industry, true)));

    /* Ruta de los datos en Arquitectura: fuentes → agentes → destinos */
    const routeEl = document.getElementById('route');
    const routeSvg = document.getElementById('route-pipes');
    function orth(a, b, box) {
      const A = a.getBoundingClientRect(), B = b.getBoundingClientRect();
      if (A.right <= B.left) {
        const sx = A.right - box.left, sy = (A.top + A.bottom) / 2 - box.top;
        const ex = B.left - box.left, ey = Math.min(Math.max(sy, B.top - box.top + 14), B.bottom - box.top - 14);
        const mx = (sx + ex) / 2;
        return `M${sx} ${sy} H${mx} V${ey} H${ex}`;
      }
      const sx = (A.left + A.right) / 2 - box.left, sy = A.bottom - box.top;
      const ex = (B.left + B.right) / 2 - box.left, ey = B.top - box.top;
      const my = (sy + ey) / 2;
      return `M${sx} ${sy} V${my} H${ex} V${ey}`;
    }
    function drawRoute() {
      const box = routeEl.getBoundingClientRect();
      const hub = routeEl.querySelector('[data-hub]');
      const narrow = window.matchMedia('(max-width: 900px)').matches;
      routeSvg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      routeSvg.innerHTML = '';
      const froms = [...routeEl.querySelectorAll('[data-from]')];
      const tos = [...routeEl.querySelectorAll('[data-to]')];
      const links = narrow
        ? [[froms[froms.length - 1], hub], [hub, tos[0]]]
        : [...froms.map(f => [f, hub]), ...tos.map(t => [hub, t])];
      links.forEach(([a, b], i) => {
        const d = orth(a, b, box);
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', d); p.setAttribute('class', 'p-base');
        routeSvg.appendChild(p);
        if (!reduceMotion) {
          const c = document.createElementNS(NS, 'circle');
          c.setAttribute('r', 3.5);
          const m = document.createElementNS(NS, 'animateMotion');
          m.setAttribute('dur', (2.2 + (i % 3) * 0.4) + 's');
          m.setAttribute('repeatCount', 'indefinite');
          m.setAttribute('path', d);
          c.appendChild(m); routeSvg.appendChild(c);
        }
      });
      if (paused && routeSvg.pauseAnimations) routeSvg.pauseAnimations();
    }

    /* "Ver más" del texto de inicio */
    const moreBtn = document.querySelector('.more-btn');
    const moreText = document.getElementById('more-text');
    moreBtn.addEventListener('click', () => {
      const open = moreText.hidden;
      moreText.hidden = !open;
      moreBtn.setAttribute('aria-expanded', String(open));
      moreBtn.textContent = open ? 'Ver menos' : 'Ver más';
      requestAnimationFrame(() => { sizeTopo(); drawPipes(); });
    });

    /* Curvas de nivel: el terreno se desplaza despacio detrás del titular */
    const topo = document.getElementById('topo');
    const topEl = document.querySelector('.top');
    const plantEl = document.querySelector('.plant');
    const ctx = topo.getContext('2d');
    let topoW = 0, topoH = 0, topoT = 0, lastFrame = 0;
    function sizeTopo() {
      const h = Math.max(240, plantEl.offsetTop + 120);
      topEl.style.setProperty('--topo-h', h + 'px');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      topoW = topo.clientWidth; topoH = h;
      topo.width = Math.round(topoW * dpr); topo.height = Math.round(topoH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintTopo();
    }
    function elev(x, y, t) {
      // Un cerro a la derecha, un tajo a la izquierda y ondulación suave
      const hx = 0.78 + 0.03 * Math.sin(t * 0.7), hy = 0.32 + 0.04 * Math.cos(t * 0.5);
      const px = 0.18 + 0.02 * Math.cos(t * 0.6), py = 0.85;
      const hill = 1.0 * Math.exp(-((x - hx) ** 2 / 0.06 + (y - hy) ** 2 / 0.12));
      const pit = -0.8 * Math.exp(-((x - px) ** 2 / 0.04 + (y - py) ** 2 / 0.08));
      const ripple = 0.12 * Math.sin(x * 7 + t) * Math.cos(y * 5 - t * 0.6);
      return hill + pit + ripple;
    }
    function paintTopo() {
      const cols = Math.ceil(topoW / 14), rows = Math.ceil(topoH / 14);
      const sx = topoW / cols, sy = topoH / rows;
      const g = [];
      for (let j = 0; j <= rows; j++) { g[j] = []; for (let i = 0; i <= cols; i++) g[j][i] = elev(i / cols, j / rows * (topoH / topoW) * 2.2, topoT); }
      ctx.clearRect(0, 0, topoW, topoH);
      const levels = 22, lo = -0.9, hi = 1.1;
      for (let k = 1; k < levels; k++) {
        const v = lo + (hi - lo) * k / levels;
        const index = k % 5 === 0;
        ctx.beginPath();
        ctx.lineWidth = index ? 1.25 : 0.75;
        ctx.strokeStyle = index ? 'rgba(11, 18, 32, 0.16)' : 'rgba(11, 18, 32, 0.09)';
        for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
          const a = g[j][i], b = g[j][i + 1], c = g[j + 1][i + 1], d = g[j + 1][i];
          const idx = (a > v) | ((b > v) << 1) | ((c > v) << 2) | ((d > v) << 3);
          if (idx === 0 || idx === 15) continue;
          const x = i * sx, y = j * sy;
          const pt = (p, q, x1, y1, x2, y2) => { const f = (v - p) / (q - p); return [x1 + (x2 - x1) * f, y1 + (y2 - y1) * f]; };
          const T = pt(a, b, x, y, x + sx, y), R = pt(b, c, x + sx, y, x + sx, y + sy);
          const B = pt(d, c, x, y + sy, x + sx, y + sy), L = pt(a, d, x, y, x, y + sy);
          const seg = { 1: [L, T], 2: [T, R], 3: [L, R], 4: [R, B], 5: [L, T, R, B], 6: [T, B], 7: [L, B], 8: [B, L], 9: [T, B], 10: [T, R, B, L], 11: [R, B], 12: [R, L], 13: [T, R], 14: [L, T] }[idx];
          for (let s = 0; s < seg.length; s += 2) { ctx.moveTo(seg[s][0], seg[s][1]); ctx.lineTo(seg[s + 1][0], seg[s + 1][1]); }
        }
        ctx.stroke();
      }
    }
    function loopTopo(now) {
      requestAnimationFrame(loopTopo);
      if (paused || document.hidden || now - lastFrame < 66) return;
      lastFrame = now; topoT += 0.012; paintTopo();
    }

    /* ---------- Apertura: al deslizar, cada área se conecta a la torre ---------- */
    // Coordenadas en unidades de la escena (0 a 1). [nombre, ícono, lectura, detalle, alerta, x, y]
    const MINES = {
      tajo: {
        hub: [0.62, 0.64],
        spots: [
          ['Geología', 'a-geologia', '0,62 % Cu', 'Ley media del banco en minado', false, 0.30, 0.47],
          ['Perforación y voladura', 'a-perforacion', '86', 'Taladros cargados en la malla 3820-12', false, 0.17, 0.29],
          ['Geotecnia', 'a-geotecnia', 'P-14', 'Prisma sobre el umbral de desplazamiento', false, 0.07, 0.62],
          ['Operaciones', 'a-operaciones', '18/20', 'Camiones en ruta', false, 0.46, 0.20],
          ['Planta', 'a-planta', '8 420 t', 'Tonelaje tratado hoy', false, 0.86, 0.12],
          ['Mantenimiento', 'a-mantenimiento', '87 %', 'Disponibilidad de flota', false, 0.56, 0.43],
          ['Almacén', 'a-almacen', '92 %', 'Repuestos críticos en stock', false, 0.76, 0.33],
          ['Ingeniería', 'a-ingenieria', '96 %', 'Cumplimiento del plan semanal', false, 0.86, 0.56],
          ['Proyectos', 'a-proyectos', '41 %', 'Avance de la relavera, fase 2', false, 0.95, 0.70],
          ['Recursos humanos', 'a-personas', '312/318', 'Tareos marcados', false, 0.85, 0.82]
        ]
      },
      sub: {
        hub: [0.40, 0.27],
        spots: [
          ['Operaciones', 'a-operaciones', '5/6', 'Scoops operando', false, 0.82, 0.88],
          ['Servicios mina', 'a-ingenieria', '3/3', 'Bombas operando en la estación', false, 0.52, 0.95],
          ['Mantenimiento', 'a-mantenimiento', '84 %', 'Disponibilidad de equipos', false, 0.28, 0.9],
          ['Logística', 'a-logistica', '92 %', 'Stock de repuestos críticos', false, 0.46, 0.12],
          ['Geomecánica', 'a-geotecnia', 'RMR 38', 'Labor 4105: revisar sostenimiento', false, 0.42, 0.5],
          ['Geología', 'a-geologia', '2,1 m', 'Potencia de veta en el tajeo 410', false, 0.66, 0.52],
          ['Seguridad', 'a-seguridad', '214', 'Personas en interior mina', false, 0.3, 0.36],
          ['Ventilación', 'a-ventilacion', '85 000 cfm', 'Caudal en la chimenea principal', false, 0.96, 0.1],
          ['Planta', 'a-planta', '1 850 t', 'Tonelaje tratado hoy', false, 0.8, 0.1],
          ['Recursos humanos', 'a-personas', '96 %', 'Asistencia de la guardia', false, 0.12, 0.08]
        ]
      }
    };
    const intro = document.getElementById('intro');
    const ic = document.getElementById('intro-canvas');
    const ictx = ic.getContext('2d');
    const hub = document.getElementById('intro-hub');
    const spotsEl = document.getElementById('intro-spots');
    const stepEl = document.getElementById('intro-step');
    const railFill = document.getElementById('rail-fill');
    const countEl = document.getElementById('intro-count');
    const bg = document.createElement('canvas');
    const bctx = bg.getContext('2d');
    let mineId = 'tajo', spotEls = [], routes = [], S3 = null;
    let IW = 0, IH = 0, box = { x0: 0, x1: 1, y0: 0, y1: 1 };
    let progress = reduceMotion ? 1 : 0, introVisible = true, introClock = 0, lastIntro = 0;
    // Avance automático: introT recorre 0 → AUTO_S segundos y el avance sale de una curva suave (progress = ease(introT / AUTO_S)).
    // Corre solo con la portada en pantalla, la pestaña visible y la escena lista (sceneReady); la barra lo controla
    const AUTO_S = 9;
    let introT = reduceMotion ? AUTO_S : 0, introHold = false, seeking = false, sceneReady = false;
    const STEPS = [
      '<b>01</b><span>Cada área trabaja por su lado</span>',
      '<b>02</b><span>Conectando cada área</span>',
      '<b>03</b><span>Una sola torre de control</span>'
    ];
    const SX = u => (box.x0 + u * (box.x1 - box.x0)) * IW;
    const SY = v => (box.y0 + v * (box.y1 - box.y0)) * IH;
    const BW = () => (box.x1 - box.x0) * IW;
    const BH = () => (box.y1 - box.y0) * IH;

    function buildSpots() {
      spotsEl.innerHTML = '';
      spotEls = MINES[mineId].spots.map(s => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'spot';
        if (s[4]) b.dataset.alert = '';
        b.setAttribute('aria-expanded', 'false');
        b.innerHTML = `<span class="spot__badge"><svg aria-hidden="true"><use href="#${s[1]}"/></svg></span><span class="spot__name">${s[0]}</span><span class="spot__card"><b>${s[2]}</b><span>${s[0]} · ${s[3]}</span></span>`;
        b.addEventListener('click', () => {
          const open = b.getAttribute('aria-expanded') !== 'true';
          spotEls.forEach(o => o.setAttribute('aria-expanded', 'false'));
          b.setAttribute('aria-expanded', String(open));
        });
        spotsEl.appendChild(b);
        return b;
      });
    }
    document.addEventListener('click', e => {
      if (!e.target.closest('.spot')) spotEls.forEach(o => o.setAttribute('aria-expanded', 'false'));
    });

    function introLayout() {
      const r = ic.parentElement.getBoundingClientRect();
      IW = r.width; IH = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const narrow = IW < 900;
      box = narrow ? { x0: 0.05, x1: 0.95, y0: 0.15, y1: 0.58 } : { x0: 0.31, x1: 0.975, y0: 0.13, y1: 0.95 };
      [ic, bg].forEach(c => { c.width = Math.round(IW * dpr); c.height = Math.round(IH * dpr); });
      ictx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mine = MINES[mineId];
      if (S3) {
        mine.spots.forEach((s, i) => spotEls[i].classList.toggle('spot--right', s[5] > 0.74));
        if (S3.mine !== mineId) { S3.mine = mineId; S3.build(mineId, built3D); } else S3.resize();
        introFrame();
        return;
      }
      const H = [SX(mine.hub[0]), SY(mine.hub[1])];
      hub.style.left = H[0] + 'px';
      hub.style.top = H[1] + 'px';
      mine.spots.forEach((s, i) => {
        const el = spotEls[i];
        el.style.left = SX(s[5]) + 'px';
        el.style.top = SY(s[6]) + 'px';
        el.classList.toggle('spot--right', s[5] > 0.74);
      });
      // Rutas: curvas suaves de cada área a la torre, muestreadas para revelarlas por tramos
      routes = mine.spots.map(s => {
        const P = [SX(s[5]), SY(s[6])];
        const c1 = [P[0] + (H[0] - P[0]) * 0.15, P[1] + (H[1] - P[1]) * 0.85];
        const c2 = [P[0] + (H[0] - P[0]) * 0.75, H[1]];
        const pts = [];
        for (let k = 0; k <= 48; k++) {
          const t = k / 48, u = 1 - t;
          pts.push([
            u * u * u * P[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * H[0],
            u * u * u * P[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * H[1]
          ]);
        }
        return pts;
      });
      bctx.clearRect(0, 0, IW, IH);
      (mineId === 'tajo' ? paintOpenPit : paintUnderground)();
      introFrame();
    }

    /* Trazos de plano */
    const LINE = 'rgba(56, 189, 248, 0.30)', FAINT = 'rgba(56, 189, 248, 0.12)', GREY = 'rgba(159, 176, 200, 0.28)';
    function poly(pts, close) {
      bctx.beginPath();
      pts.forEach((p, i) => (i ? bctx.lineTo(SX(p[0]), SY(p[1])) : bctx.moveTo(SX(p[0]), SY(p[1]))));
      if (close) bctx.closePath();
    }
    function building(u, v, w, h) {
      bctx.strokeStyle = GREY; bctx.lineWidth = 1.2;
      bctx.fillStyle = 'rgba(11, 23, 48, 0.9)';
      bctx.fillRect(SX(u), SY(v), w * BW(), h * BH());
      bctx.strokeRect(SX(u), SY(v), w * BW(), h * BH());
      bctx.beginPath();
      bctx.moveTo(SX(u), SY(v)); bctx.lineTo(SX(u + w), SY(v + h));
      bctx.stroke();
    }
    function road(points) {
      bctx.lineCap = 'round'; bctx.lineJoin = 'round';
      [[8, 'rgba(159, 176, 200, 0.30)'], [5, '#020812']].forEach(([w, c]) => {
        bctx.lineWidth = w; bctx.strokeStyle = c;
        bctx.beginPath();
        bctx.moveTo(SX(points[0][0]), SY(points[0][1]));
        for (let i = 1; i < points.length - 1; i += 2) bctx.quadraticCurveTo(SX(points[i][0]), SY(points[i][1]), SX(points[i + 1][0]), SY(points[i + 1][1]));
        bctx.stroke();
      });
    }
    function label(text, u, v) {
      if (IW < 900) return;
      bctx.font = '500 11px "JetBrains Mono", monospace';
      bctx.fillStyle = 'rgba(159, 176, 200, 0.55)';
      bctx.fillText(text, SX(u), SY(v));
    }

    function paintOpenPit() {
      const C = [0.30, 0.46], R = [0.27, 0.36];
      const ring = (s, n = 72) => {
        const pts = [];
        for (let k = 0; k < n; k++) {
          const a = (k / n) * Math.PI * 2;
          const w = 1 + 0.06 * Math.sin(3 * a + 1) + 0.04 * Math.sin(5 * a + 2);
          pts.push([C[0] + Math.cos(a) * R[0] * s * w, C[1] + Math.sin(a) * R[1] * s * w]);
        }
        return pts;
      };
      // Bancos del tajo: cresta y pie de cada banco, más oscuro hacia el fondo
      for (let k = 0; k < 9; k++) {
        const s = 1 - k * 0.1;
        poly(ring(s), true);
        bctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
        bctx.fill();
        bctx.strokeStyle = LINE; bctx.lineWidth = k === 0 ? 1.6 : 1.1;
        bctx.stroke();
        poly(ring(s - 0.035), true);
        bctx.strokeStyle = FAINT; bctx.lineWidth = 0.8;
        bctx.stroke();
      }
      // Rampa en espiral hacia el fondo
      bctx.setLineDash([6, 5]);
      bctx.strokeStyle = 'rgba(230, 236, 245, 0.45)'; bctx.lineWidth = 2;
      const ramp = [];
      for (let t = 0; t <= 1; t += 0.01) {
        const a = -0.5 + t * Math.PI * 2.3, s = 0.98 - t * 0.8;
        const w = 1 + 0.06 * Math.sin(3 * a + 1) + 0.04 * Math.sin(5 * a + 2);
        ramp.push([C[0] + Math.cos(a) * R[0] * s * w, C[1] + Math.sin(a) * R[1] * s * w]);
      }
      poly(ramp); bctx.stroke();
      bctx.setLineDash([]);
      // Cuerpo mineralizado en el fondo
      bctx.save();
      poly(ring(0.2), true); bctx.clip();
      bctx.strokeStyle = 'rgba(56, 189, 248, 0.35)'; bctx.lineWidth = 1;
      for (let x = -1; x < 1; x += 0.012) { bctx.beginPath(); bctx.moveTo(SX(C[0] + x), SY(0.2)); bctx.lineTo(SX(C[0] + x + 0.2), SY(0.75)); bctx.stroke(); }
      bctx.restore();
      // Vías de acarreo: al botadero, a la planta y a la garita
      road([[0.55, 0.33], [0.68, 0.22], [0.80, 0.21]]);
      road([[0.52, 0.62], [0.58, 0.80], [0.66, 0.86]]);
      road([[0.80, 0.21], [0.80, 0.50], [0.86, 0.66], [0.92, 0.84], [1.0, 0.95]]);
      // Botadero
      for (let k = 0; k < 4; k++) {
        const s = 1 - k * 0.22;
        bctx.beginPath();
        bctx.ellipse(SX(0.72), SY(0.88), 0.09 * s * BW(), 0.07 * s * BH(), -0.2, 0, Math.PI * 2);
        bctx.strokeStyle = GREY; bctx.lineWidth = 1; bctx.stroke();
      }
      label('BOTADERO', 0.67, 0.99);
      // Planta, espesadores y relavera
      building(0.80, 0.16, 0.07, 0.08);
      building(0.84, 0.25, 0.04, 0.05);
      [[0.94, 0.12], [0.94, 0.25]].forEach(([u, v]) => {
        bctx.beginPath(); bctx.arc(SX(u), SY(v), 0.024 * BW(), 0, Math.PI * 2);
        bctx.strokeStyle = LINE; bctx.lineWidth = 1.2; bctx.stroke();
        bctx.beginPath(); bctx.arc(SX(u), SY(v), 0.012 * BW(), 0, Math.PI * 2); bctx.stroke();
      });
      poly([[0.90, 0.36], [0.99, 0.35], [1.0, 0.48], [0.89, 0.47]], true);
      bctx.strokeStyle = GREY; bctx.stroke();
      poly([[0.915, 0.38], [0.98, 0.375], [0.985, 0.455], [0.905, 0.45]], true); bctx.stroke();
      label('RELAVERA', 0.905, 0.52);
      // Taller, almacén y campamento
      building(0.53, 0.47, 0.06, 0.05);
      building(0.72, 0.36, 0.06, 0.05);
      bctx.strokeStyle = 'rgba(159, 176, 200, 0.22)'; bctx.lineWidth = 1;
      for (let v = 0.60; v < 0.86; v += 0.05) for (let u = 0.82; u < 0.99; u += 0.035) {
        if ((Math.round(u * 100) + Math.round(v * 100)) % 7 === 0) continue;
        bctx.strokeRect(SX(u), SY(v), 0.024 * BW(), 0.032 * BH());
      }
      label('CAMPAMENTO Y OFICINAS', 0.80, 0.58);
      label('TAJO', 0.27, 0.06);
    }

    function paintUnderground() {
      // Terreno: superficie con cerro, roca debajo con estratos
      const uL = -box.x0 / (box.x1 - box.x0), uR = (1 - box.x0) / (box.x1 - box.x0);
      const surface = [[uL, 0.21], [0, 0.21], [0.07, 0.12], [0.17, 0.05], [0.28, 0.12], [0.40, 0.18], [uR, 0.18]];
      poly([...surface, [uR, 1.2], [uL, 1.2]], true);
      const fade = bctx.createLinearGradient(0, 0, SX(0.05), 0);
      fade.addColorStop(0, "rgba(11, 23, 48, 0)"); fade.addColorStop(1, "rgba(11, 23, 48, 0.75)");
      bctx.fillStyle = fade; bctx.fill();
      poly(surface); bctx.strokeStyle = 'rgba(230, 236, 245, 0.45)'; bctx.lineWidth = 1.6; bctx.stroke();
      bctx.strokeStyle = 'rgba(56, 189, 248, 0.07)'; bctx.lineWidth = 1;
      for (let v = 0.26; v < 1; v += 0.045) {
        bctx.beginPath();
        for (let u = 0; u <= uR + 0.001; u += 0.02) {
          const y = v + 0.012 * Math.sin(u * 9 + v * 20);
          u ? bctx.lineTo(SX(u), SY(y)) : bctx.moveTo(SX(u), SY(y));
        }
        bctx.stroke();
      }
      // Veta con tajeos
      const vein = [[0.66, 0.19], [0.715, 0.19], [0.86, 0.98], [0.80, 0.98]];
      bctx.save();
      poly(vein, true); bctx.fillStyle = 'rgba(56, 189, 248, 0.10)'; bctx.fill(); bctx.clip();
      bctx.strokeStyle = 'rgba(56, 189, 248, 0.30)'; bctx.lineWidth = 1;
      for (let v = 0.15; v < 1; v += 0.012) { bctx.beginPath(); bctx.moveTo(SX(0.6), SY(v)); bctx.lineTo(SX(0.9), SY(v + 0.06)); bctx.stroke(); }
      bctx.restore();
      poly(vein, true); bctx.strokeStyle = LINE; bctx.lineWidth = 1.2; bctx.stroke();
      label('VETA', 0.72, 0.17);
      // Niveles desde el pique hasta la veta
      const levels = [0.40, 0.58, 0.76, 0.92];
      levels.forEach((v, i) => {
        [-0.008, 0.008].forEach(d => { poly([[0.20, v + d], [0.84 + v * 0.06, v + d]]); bctx.strokeStyle = GREY; bctx.lineWidth = 1.1; bctx.stroke(); });
        label(`NV ${4300 - i * 100}`, 0.205, v - 0.022);
      });
      // Pique y castillo
      [-0.008, 0.008].forEach(d => { poly([[0.56 + d, 0.18], [0.56 + d, 0.95]]); bctx.strokeStyle = 'rgba(230, 236, 245, 0.40)'; bctx.lineWidth = 1.2; bctx.stroke(); });
      poly([[0.535, 0.18], [0.555, 0.06], [0.565, 0.06], [0.585, 0.18]]); bctx.stroke();
      poly([[0.545, 0.12], [0.575, 0.12]]); bctx.stroke();
      bctx.beginPath(); bctx.arc(SX(0.56), SY(0.055), 0.008 * BW(), 0, Math.PI * 2); bctx.stroke();
      label('PIQUE', 0.565, 0.985);
      // Rampa en zigzag desde la bocamina
      bctx.setLineDash([6, 5]);
      poly([[0.10, 0.155], [0.24, 0.26], [0.12, 0.33], [0.24, 0.40], [0.12, 0.49], [0.24, 0.58], [0.12, 0.67], [0.24, 0.76], [0.12, 0.84], [0.24, 0.92]]);
      bctx.strokeStyle = 'rgba(230, 236, 245, 0.40)'; bctx.lineWidth = 1.8; bctx.stroke();
      bctx.setLineDash([]);
      label('RAMPA', 0.05, 0.30);
      // Chimenea de ventilación con flujo hacia arriba
      [-0.006, 0.006].forEach(d => { poly([[0.955 + d, 0.18], [0.955 + d, 0.92]]); bctx.strokeStyle = GREY; bctx.lineWidth = 1.1; bctx.stroke(); });
      bctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      for (let v = 0.26; v < 0.9; v += 0.08) poly([[0.948, v + 0.015], [0.955, v], [0.962, v + 0.015]]), bctx.stroke();
      building(0.94, 0.12, 0.03, 0.06);
      // Planta y oficinas en superficie
      building(0.66, 0.11, 0.07, 0.07);
      building(0.78, 0.13, 0.05, 0.05);
      building(0.85, 0.135, 0.04, 0.045);
    }

    const clamp01 = v => Math.max(0, Math.min(1, v));
    function partial(pts, r) {
      const n = Math.max(1, Math.round(r * (pts.length - 1)));
      ictx.beginPath();
      ictx.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k <= n; k++) ictx.lineTo(pts[k][0], pts[k][1]);
      ictx.stroke();
    }
    function at(pts, t) {
      const f = t * (pts.length - 1), k = Math.floor(f), u = f - k;
      const a = pts[Math.min(k, pts.length - 1)], b = pts[Math.min(k + 1, pts.length - 1)];
      return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
    }

    function introFrame(now) {
      if (!IW) return;
      const spots = MINES[mineId].spots;
      const rs = spots.map((s, i) => clamp01((progress - 0.12 - i * 0.04) / 0.2));
      if (S3) {
        const on3 = rs.filter(r => r >= 1).length;
        S3.render(rs, on3 === spots.length, clamp01((progress - 0.05) / 0.85), introClock, now || performance.now());
        rs.forEach((r, i) => spotEls[i] && spotEls[i].classList.toggle('is-on', r >= 1));
        introStatus(on3, spots.length);
        return;
      }
      ictx.clearRect(0, 0, IW, IH);
      ictx.drawImage(bg, 0, 0, IW, IH);
      let on = 0;
      routes.forEach((pts, i) => {
        const r = rs[i];
        const alert = spots[i][4];
        const P = pts[0];
        if (r <= 0) {
          // Dato suelto: gira alrededor de su área sin llegar a ningún lado
          ictx.fillStyle = alert ? 'rgba(243, 179, 92, 0.85)' : 'rgba(159, 176, 200, 0.6)';
          for (let k = 0; k < 3; k++) {
            const a = introClock * (0.8 + k * 0.3) + i + k * 2.1, rad = 24 + k * 7;
            ictx.fillRect(P[0] + Math.cos(a) * rad - 1.5, P[1] + Math.sin(a) * rad - 1.5, 3, 3);
          }
        } else {
          ictx.strokeStyle = alert ? 'rgba(217, 119, 6, 0.9)' : 'rgba(0, 122, 255, 0.9)';
          ictx.lineWidth = 2;
          partial(pts, r);
        }
        const done = r >= 1;
        if (done) {
          on++;
          ictx.fillStyle = alert ? '#F3B35C' : '#38BDF8';
          for (let k = 0; k < 2; k++) {
            const q = at(pts, (introClock * 0.32 + i * 0.13 + k * 0.5) % 1);
            ictx.beginPath(); ictx.arc(q[0], q[1], 3, 0, Math.PI * 2); ictx.fill();
          }
        }
        if (spotEls[i]) spotEls[i].classList.toggle('is-on', done);
      });
      introStatus(on, spots.length);
    }
    // Solo se escribe lo que cambió: reescribir el mismo valor obliga al navegador a recalcular estilos y diseño
    const statusShown = [];
    function statusOnce(i, v, f) { if (statusShown[i] !== v) { statusShown[i] = v; f(v); } }
    function introStatus(on, total) {
      statusOnce(0, `${on} de ${total} áreas`, v => { countEl.textContent = v; });
      const lit = on === total;
      statusOnce(1, String(lit), v => { intro.dataset.lit = v; });
      statusOnce(2, String(progress > 0.05), v => { intro.dataset.done = v; });
      const stage = progress < 0.12 ? 0 : lit ? 2 : 1;
      statusOnce(3, String(stage), v => { stepEl.dataset.stage = v; });
      statusOnce(4, `scaleX(${Math.max(0.02, Math.min(1, progress / 0.95))})`, v => { railFill.style.transform = v; });
      statusOnce(5, String(Math.round(progress * 100)), v => { railTrack.setAttribute('aria-valuenow', v); });
      statusOnce(6, `${RAIL_NAMES[stage]} · ${on} de ${total} áreas`, v => { railTrack.setAttribute('aria-valuetext', v); });
      statusOnce(7, introT >= AUTO_S ? 'end' : introHold ? 'held' : 'play', v => {
        railPlay.dataset.state = v;
        railPlay.setAttribute('aria-label', v === 'end' ? 'Repetir la conexión' : v === 'held' ? 'Reanudar el avance' : 'Pausar el avance');
      });
    }

    // Curva suave (seno): arranca y termina despacio; su inversa permite saltar a un avance desde la barra
    function introProgress() { return 0.5 - 0.5 * Math.cos(Math.PI * introT / AUTO_S); }
    function seekTo(p) { introT = AUTO_S * Math.acos(1 - 2 * clamp01(p)) / Math.PI; forceFrame = true; }
    // Tope de 30 cuadros/s con la escena 3D en pantallas angostas (< 900 px) o si el equipo no sostiene 50 cuadros/s.
    // El cuadro saltado no mueve el reloj: el siguiente avanza todo el tiempo real, así el movimiento va a la misma velocidad.
    // En escritorio se mide el ritmo en tandas de 60 cuadros (sin contar construcciones ni la vuelta de una pestaña oculta);
    // dos tandas seguidas por debajo de 50 cuadros/s fijan el tope
    let capped = false, capN = 0, capSum = 0, capSlow = 0, capDue = 0, lastTick = 0, vsync = 1e9, drew = false, jsCost = 0;
    function introLoop(now) {
      requestAnimationFrame(introLoop);
      if (!introVisible || document.hidden) return;
      const moving = !paused && !reduceMotion;
      // Muestra de la resolución adaptativa, una por cuadro dibujado: lo que tardó su programa o, si el navegador
      // se atrasó en volver (la tarjeta gráfica no da abasto), ese atraso descontando un periodo de pantalla
      const tick = now - lastTick;
      lastTick = now;
      if (tick >= 4 && tick < vsync) vsync = tick;
      // Si la resolución cambió, este cuadro se dibuja sí o sí: el lienzo recién redimensionado queda en blanco
      let resized = false;
      if (drew) { drew = false; if (S3 && moving) resized = S3.adapt(tick > 0 && tick < 200 ? Math.max(jsCost, tick - vsync) : NaN); }
      const gap = now - lastIntro;
      if (S3 && moving && gap > 0) {
        const narrow = IW < 900;
        if (capped || narrow) {
          // Cada cuadro tiene su turno cada 1/30 s (con 4 ms de holgura por el vaivén del navegador)
          if (now < capDue - 4 && !resized) return;
          capDue = (now - capDue > 33.4 ? now : capDue) + 33.4;
        }
        if (!capped && !narrow) {
          if (gap >= 200 || S3.busy()) capN = capSum = 0;
          else if (++capN > 10) {
            capSum += gap;
            if (capN === 70) { capSlow = capSum / 60 > 20 ? capSlow + 1 : 0; capped = capSlow >= 2; capN = capSum = 0; }
          }
        }
      }
      // El avance automático usa el mismo tiempo real que introClock (tope de 50 ms: al volver de una pestaña oculta no salta)
      if (moving && sceneReady && !introHold && !seeking && introT < AUTO_S) {
        introT = Math.min(AUTO_S, introT + Math.min(0.05, (now - lastIntro) / 1000 || 0));
      }
      const p = introProgress();
      if (!moving && p === progress && !forceFrame) { lastIntro = now; return; }
      forceFrame = false;
      if (moving) introClock += Math.min(0.05, (now - lastIntro) / 1000 || 0);
      lastIntro = now;
      progress = p;
      if (!S3 || !moving) { introFrame(now); return; }
      const t0 = performance.now();
      introFrame(now);
      jsCost = performance.now() - t0;
      drew = true;
    }

    /* Tipo de mina */
    const mineTabs = [...document.querySelectorAll('.mine-type button')];
    function setMine(id) {
      if (id === mineId && spotEls.length) return;
      mineTabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.mine === id)));
      // Con la escena 3D, el desvanecido termina cuando la mina nueva está construida (built3D)
      // La animación vuelve a empezar sola desde el inicio con la mina nueva (con la escena 3D, cuando esté construida)
      sceneReady = !S3;
      const swap = () => {
        introT = reduceMotion ? AUTO_S : 0; introHold = false; forceFrame = true;
        mineId = id; buildSpots(); introLayout(); if (!S3) intro.classList.remove('is-swapping');
      };
      if (!spotEls.length || reduceMotion) { swap(); return; }
      intro.classList.add('is-swapping');
      setTimeout(swap, 200);
    }
    mineTabs.forEach(t => t.addEventListener('click', () => setMine(t.dataset.mine)));
    document.querySelector('.mine-type').addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const next = mineTabs.find(t => t.getAttribute('aria-selected') === 'false');
      next.focus(); setMine(next.dataset.mine);
    });

    /* Barra de etapas: tocar una etapa, arrastrar, teclado y pausa del avance */
    const RAIL_NAMES = ['Etapa 1 de 3: cada área trabaja por su lado', 'Etapa 2 de 3: conectando cada área', 'Etapa 3 de 3: una sola torre de control'];
    const RAIL_AT = [0, 0.12, 1];
    const railTrack = document.getElementById('rail-track');
    const railPlay = document.getElementById('rail-play');
    stepEl.querySelectorAll('[data-seek]').forEach(b => b.addEventListener('click', () => seekTo(RAIL_AT[+b.dataset.seek])));
    // El relleno llega al final con progress = 0,95: el dedo y el relleno van juntos
    function seekX(x) {
      const r = railTrack.getBoundingClientRect(), f = clamp01((x - r.left) / Math.max(1, r.width));
      seekTo(f > 0.98 ? 1 : f * 0.95);
    }
    railTrack.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      e.stopPropagation();   // no gira el mapa
      seeking = true; seekX(e.clientX);
      try { railTrack.setPointerCapture(e.pointerId); } catch (err) { /* evento sintético */ }
    });
    window.addEventListener('pointermove', e => { if (seeking) seekX(e.clientX); });
    const endSeek = () => { if (seeking) { seeking = false; forceFrame = true; } };
    window.addEventListener('pointerup', endSeek);
    window.addEventListener('pointercancel', endSeek);
    function togglePlay() {
      if (introT >= AUTO_S) { introT = 0; introHold = false; } else introHold = !introHold;
      forceFrame = true;
    }
    railPlay.addEventListener('click', togglePlay);
    if (reduceMotion) railPlay.hidden = true;
    railTrack.addEventListener('keydown', e => {
      const step = { ArrowRight: 0.05, ArrowUp: 0.05, ArrowLeft: -0.05, ArrowDown: -0.05, PageUp: 0.2, PageDown: -0.2 }[e.key];
      if (step) seekTo(progress + step);
      else if (e.key === 'Home') seekTo(0);
      else if (e.key === 'End') seekTo(1);
      else if ((e.key === ' ' || e.key === 'Enter') && !reduceMotion) togglePlay();
      else return;
      e.preventDefault();
    });

    new IntersectionObserver(es => { introVisible = es[0].isIntersecting; }).observe(intro);
    document.getElementById('intro-go').addEventListener('click', () => {
      // La portada mide una pantalla: el botón lleva a la sección siguiente
      intro.nextElementSibling.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    let introRz;
    window.addEventListener('resize', () => { clearTimeout(introRz); introRz = setTimeout(introLayout, 120); });
    /* ---------- Escena 3D: la mina en relieve y AgentraX como núcleo ---------- */
    function create3D(onInteract, onClock) {
      if (!window.THREE) return null;
      const T = window.THREE;
      let renderer;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); }
      catch (e) { return null; }
      if (!renderer.getContext()) return null;
      const stage = intro.querySelector('.intro__stage');
      renderer.domElement.className = 'intro__gl';
      renderer.domElement.setAttribute('aria-hidden', 'true');
      stage.insertBefore(renderer.domElement, ic.nextSibling);
      ic.style.display = 'none';
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const scene = new T.Scene();
      scene.fog = new T.Fog(0x020812, 320, 660);
      const camera = new T.PerspectiveCamera(34, 1, 1, 2000);
      const ambient = new T.AmbientLight(0x9fb0c8, 0.55);
      scene.add(ambient);
      const keyLight = new T.DirectionalLight(0xffffff, 0.9);
      keyLight.position.set(80, 140, 120);
      scene.add(keyLight);
      const BLUE = new T.Color(0x007aff), CYAN = new T.Color(0x38bdf8), GREY = new T.Color(0x5b6b85), AMBER = new T.Color(0xd97706);
      const UP = new T.Vector3(0, 1, 0);
      let W = 0, H = 0, world = null, nodes = [], core = null, terrainMats = [], cfg = null, movers = [], flashes = [];
      let nightLights = [], windows = [];
      const skyColor = new T.Color(0x020812);
      const camDir = new T.Vector3(), camRight = new T.Vector3();
      let waveStart = -1, litAmount = 0, wasLit = false, pointer = [0, 0], kick = 0;
      let userAz = 0, userEl = 0, drag = null;
      let shot = null;

      const terrainVS = 'varying vec3 vP; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }';
      const terrainFS = [
        'uniform float uLit; uniform float uWave; uniform float uLow; uniform float uDay; uniform vec4 uFade; varying vec3 vP;',
        'float iso(float v, float s){ float f = v / s; float d = abs(fract(f - 0.5) - 0.5) / fwidth(f); return 1.0 - min(d, 1.0); }',
        'void main(){',
        '  float far = smoothstep(130.0, 360.0, length(vP.xz));',
        '  float c = mix(iso(vP.y, 1.8), iso(vP.y, 7.5), far);',
        '  float ci = mix(iso(vP.y, 9.0), iso(vP.y, 30.0), far);',
        '  float g = max(iso(vP.x, 20.0), iso(vP.z, 20.0)) * (1.0 - smoothstep(110.0, 220.0, length(vP.xz)));',
        '  float r = length(vP.xz);',
        '  float fade = smoothstep(uFade.x, uFade.y, r) * (1.0 - smoothstep(uFade.z, uFade.w, r));',
        '  if (fade <= 0.001) discard;',
        '  float w = uWave > 0.0 ? exp(-pow((r - uWave) / 9.0, 2.0)) : 0.0;',
        '  float depth = clamp(-vP.y / uLow, 0.0, 1.0);',
        '  vec3 col = mix(vec3(0.22, 0.74, 0.97), vec3(0.10, 0.55, 1.0), uLit);',
        '  float a = (c * 0.40 + ci * 0.62 + g * 0.06) * (0.8 + 0.5 * uLit) * (1.0 - 0.62 * far) * (0.55 + 0.45 * uDay);',
        '  vec3 base = mix(vec3(0.02, 0.05, 0.11), vec3(0.01, 0.09, 0.22), depth);',
        '  base = mix(base, vec3(0.06, 0.14, 0.27), clamp(vP.y / 90.0, 0.0, 1.0) * 0.55);',
        '  base = mix(base, vec3(0.07, 0.14, 0.26), uDay * 0.75);',
        '  vec3 rgb = mix(base, col, clamp(a, 0.0, 1.0)) + w * vec3(0.15, 0.45, 1.0);',
        '  gl_FragColor = vec4(rgb, fade * clamp(0.7 + a + w, 0.0, 1.0));',
        '}'
      ].join('\n');

      /* Relieve */
      const PIT = { x: -62, z: -6, rx: 66, rz: 54 }, BENCHES = 10, BENCH_H = 3.6;
      const rampY = t => 0.6 * (1 - t) - BENCHES * BENCH_H * t;
      const pitWarp = (dx, dz) => 1 + 0.06 * Math.sin(3 * Math.atan2(dz, dx) + 1);
      // Plataformas: [x, z, radio, altura]. La de la chancadora está elevada para que el volquete descargue en la tolva
      const PADS = [[72, -60, 26, 1], [78, 26, 24, 1], [18, -6, 9, 1], [40, 18, 8, 1], [100, -12, 16, 1], [33, -30, 7, 1], [46, -46, 11, 1], [16, 10, 6, 1], [16, -30, 8, 7], [-73, -46, 9, -10.8]];
      // Cordillera: crestas y quebradas que crecen al alejarse de la mina, como el relieve andino
      function andes(x, z) {
        const r = Math.hypot(x - 10, z);
        const w = Math.min(1, Math.max(0, (r - 150) / 260));
        const s = w * w * (3 - 2 * w);
        if (s <= 0) return 0;
        let h = 0, amp = 1, f = 0.009;
        for (let i = 0; i < 4; i++) {
          const a = i * 1.7 + 0.4;
          const u = x * Math.cos(a) + z * Math.sin(a), v = -x * Math.sin(a) + z * Math.cos(a);
          h += amp * (1 - Math.abs(Math.sin(u * f + i * 2.3) * Math.cos(v * f * 0.8 + i * 1.1)));
          amp *= 0.5; f *= 2.1;
        }
        return s * (h * 44 - 12);
      }
      function hTajo(x, z) {
        let h = 3 * Math.sin(x * 0.035) * Math.cos(z * 0.045)
          + 18 * Math.exp(-((x - 70) ** 2 + (z + 95) ** 2) / 1600)
          + 12 * Math.exp(-((x + 100) ** 2 + (z - 70) ** 2) / 1400)
          + 22 * Math.exp(-((x + 150) ** 2 + (z + 120) ** 2) / 5000)
          + 16 * Math.exp(-((x - 190) ** 2 + (z - 10) ** 2) / 4000);
        h += andes(x, z);
        const dx = (x - PIT.x) / PIT.rx, dz = (z - PIT.z) / PIT.rz;
        const r = Math.sqrt(dx * dx + dz * dz) * pitWarp(dx, dz);
        if (r < 1.12) {
          const terr = -Math.ceil(Math.max(0, 1 - r) * BENCHES) * BENCH_H;
          const b = Math.min(1, (1.12 - r) / 0.12);
          h = h * (1 - b) + terr * b;
        }
        // Rampa de dos carriles tallada en el tajo, con pendiente pareja del borde al fondo
        const r0 = Math.sqrt(dx * dx + dz * dz), th = Math.atan2(dz, dx);
        for (let n = -1; n < 3; n++) {
          const t = (th + 2 * Math.PI * n + 0.5) / (2.3 * Math.PI);
          if (t < 0 || t > 1) continue;
          const d = Math.abs(r0 - (0.98 - 0.82 * t));
          if (d < 0.075) { const b = d < 0.048 ? 1 : (0.075 - d) / 0.027; h = h * (1 - b) + rampY(t) * b; }
        }
        h += Math.min(9, 15 * Math.exp(-((x - 44) ** 2 + (z - 57) ** 2) / 420));
        PADS.forEach(([px, pz, pr, ph]) => {
          const d = Math.hypot(x - px, z - pz);
          if (d < pr + 8) { const b = d < pr ? 1 : 1 - (d - pr) / 8; h = h * (1 - b) + ph * b; }
        });
        return h;
      }
      // Mina subterránea: valle con un cerro al oeste (rampa y campamento en la ladera) y la cordillera al fondo.
      // Plataformas: bocamina, taller, almacén, castillo, winche, planta, ventilador, campamento y polvorín
      const SUB_PADS = [[-50, -7, 8, 4], [-30, -6, 7, 3.5], [-8, -40, 8, 3], [12, -3, 11, 3], [38, -5, 7, 3], [72, -40, 20, 3], [114, -5, 9, 3], [-82, -46, 13, 17], [-40, -92, 6, 3]];
      function hSub(x, z) {
        let h = 3 + 1.4 * Math.sin(x * 0.045) * Math.cos(z * 0.05)
          + 32 * Math.exp(-((x + 108) ** 2) / 1300 - ((z + 30) ** 2) / 4200)
          + 14 * Math.exp(-((x - 40) ** 2 + (z + 110) ** 2) / 2600);
        h += andes(x, z);
        SUB_PADS.forEach(([px, pz, pr, ph]) => {
          const d = Math.hypot(x - px, z - pz);
          if (d < pr + 8) { const b = d < pr ? 1 : 1 - (d - pr) / 8; h = h * (1 - b) + ph * b; }
        });
        return h;
      }
      let groundFn = hTajo;

      // Terreno: malla cercana con detalle completo en la mina y menor hacia los bordes, más un anillo lejano liviano
      function* terrain(fn, w, d, cz, low, seg, fade, core) {
        const pos = [], idx = [];
        if (fade[0] > 0) {
          const half = cz < 0, r0 = fade[0] - 0.5, r1 = fade[3] + 2;
          const nT = half ? 160 : 240, nR = half ? 55 : 40;
          const th0 = half ? Math.PI : 0, th1 = Math.PI * 2, cols = half ? nT + 1 : nT;
          let v = 0;
          for (let j = 0; j <= nR; j++) {
            const r = r0 + (r1 - r0) * Math.pow(j / nR, 1.35);
            for (let i = 0; i < cols; i++) {
              const th = th0 + (th1 - th0) * i / nT;
              const x = Math.cos(th) * r, z = half && (i === 0 || i === nT) ? 0 : Math.sin(th) * r;
              pos.push(x, fn(x, z), z);
              if ((v++ & 4095) === 4095) yield;
            }
          }
          for (let j = 0; j < nR; j++) {
            for (let i = 0; i < nT; i++) {
              const i1 = half ? i + 1 : (i + 1) % nT;
              const a = j * cols + i, b = j * cols + i1, c = (j + 1) * cols + i, d0 = (j + 1) * cols + i1;
              idx.push(a, b, c, b, d0, c);
            }
          }
        } else {
          const rMax = fade[3] + 2, r2 = rMax * rMax;
          const xMin = Math.max(-w / 2, -rMax), xMax = Math.min(w / 2, rMax);
          const zMin = Math.max(cz - d / 2, -rMax), zMax = Math.min(cz + d / 2, rMax);
          const [fx0, fx1, fz0, fz1] = core || [xMin, xMax, zMin, zMax];
          const grow = (start, end, dir) => {
            const pts = [];
            let p = start, s = 1;
            while (dir > 0 ? p < end - 1e-6 : p > end + 1e-6) {
              s = Math.min(4, s * 1.12);
              p += dir * s;
              if (dir > 0 ? p >= end - s * 0.35 : p <= end + s * 0.35) p = end;
              pts.push(p);
            }
            return pts;
          };
          const axis = (a, b, f0, f1) => {
            const out = grow(f0, a, -1).reverse();
            for (let v = f0; v <= f1 + 1e-6; v++) out.push(v);
            return out.concat(grow(f1, b, 1));
          };
          const xs = axis(xMin, xMax, Math.max(xMin, fx0), Math.min(xMax, fx1));
          const zs = axis(zMin, zMax, Math.max(zMin, fz0), Math.min(zMax, fz1));
          yield;
          const nx = xs.length, nz = zs.length, map = new Int32Array(nx * nz).fill(-1);
          const vert = (i, j) => {
            const k = j * nx + i;
            if (map[k] >= 0) return map[k];
            const x = xs[i], z = zs[j], id = pos.length / 3;
            map[k] = id;
            pos.push(x, fn(x, z), z);
            return id;
          };
          for (let j = 0; j < nz - 1; j++) {
            const z0 = zs[j], z1 = zs[j + 1], qz = Math.max(z0, Math.min(0, z1));
            for (let i = 0; i < nx - 1; i++) {
              const x0 = xs[i], x1 = xs[i + 1], qx = Math.max(x0, Math.min(0, x1));
              if (qx * qx + qz * qz > r2) continue;
              const a = vert(i, j), b = vert(i + 1, j), c = vert(i, j + 1), d0 = vert(i + 1, j + 1);
              idx.push(a, c, b, b, c, d0);
            }
            if ((j & 15) === 15) yield;
          }
        }
        const g = new T.BufferGeometry();
        g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
        g.setIndex(idx);
        const mat = new T.ShaderMaterial({
          vertexShader: terrainVS, fragmentShader: terrainFS, transparent: true, side: T.DoubleSide,
          extensions: { derivatives: true },
          uniforms: { uLit: { value: 0 }, uWave: { value: -1 }, uLow: { value: low }, uDay: { value: 0 }, uFade: { value: new T.Vector4(fade[0], fade[1], fade[2], fade[3]) } }
        });
        terrainMats.push(mat);
        return new T.Mesh(g, mat);
      }

      const lineMat = (color, opacity) => new T.LineBasicMaterial({ color, transparent: true, opacity });
      function lineThrough(points, color, opacity, dashed) {
        const g = new T.BufferGeometry().setFromPoints(points);
        const m = dashed ? new T.LineDashedMaterial({ color, transparent: true, opacity, dashSize: 3, gapSize: 2.4 }) : lineMat(color, opacity);
        const l = new T.Line(g, m);
        if (dashed) l.computeLineDistances();
        world.add(l);
        return l;
      }
      function block(x, y, z, w, h, d, edge, fill) {
        const g = new T.BoxGeometry(w, h, d);
        const m = new T.Mesh(g, new T.MeshBasicMaterial({ color: fill || 0x0b1730, transparent: true, opacity: fill ? 0.18 : 0.9, depthWrite: !fill }));
        m.position.set(x, y + h / 2, z);
        const e = new T.LineSegments(new T.EdgesGeometry(g), lineMat(edge || 0x38bdf8, 0.65));
        e.position.copy(m.position);
        world.add(m, e);
        return m;
      }
      function disc(x, y, z, r) {
        const g = new T.CylinderGeometry(r, r, 2, 40, 1, true);
        const e = new T.LineSegments(new T.EdgesGeometry(g, 30), lineMat(0x38bdf8, 0.6));
        e.position.set(x, y + 1, z);
        world.add(e);
        const ring = new T.Mesh(new T.RingGeometry(r * 0.2, r * 0.28, 32), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5, side: T.DoubleSide }));
        ring.rotation.x = -Math.PI / 2; ring.position.set(x, y + 2.05, z);
        world.add(ring);
      }
      function tube(points, r, color, opacity) {
        const curve = new T.CatmullRomCurve3(points, false, 'catmullrom', 0);
        const m = new T.Mesh(new T.TubeGeometry(curve, Math.max(8, points.length * 6), r, 6, false), new T.MeshBasicMaterial({ color, transparent: true, opacity }));
        world.add(m);
        return m;
      }
      // Equipo en movimiento a lo largo de una ruta (camión, scoop, skip)
      /* Modelos de equipos y edificios: cuerpo sólido iluminado con aristas en cian */
      const solid = (color, opts) => new T.MeshStandardMaterial(Object.assign({ color, metalness: 0.35, roughness: 0.55 }, opts || {}));
      function part(grp, geo, mat, x, y, z, edge) {
        const m = new T.Mesh(geo, mat);
        m.position.set(x, y, z);
        grp.add(m);
        if (edge !== false) {
          const e = new T.LineSegments(new T.EdgesGeometry(geo, 25), lineMat(0x9fe2ff, edge || 0.55));
          m.add(e);
        }
        return m;
      }
      const BODY = () => solid(0xd8dee8), DARK = () => solid(0x1c2a44), TIRE = () => solid(0x0a0f1a, { roughness: 0.9, metalness: 0 });
      const ORE = () => solid(0x6b7b94, { roughness: 0.95, metalness: 0 });

      // Volquete minero: chasis, tolva perfilada con visera, cubierta superior con baranda,
      // cabina, parrilla, llantas delanteras simples y traseras dobles; la tolva se levanta al descargar
      function truckModel() {
        const g = new T.Group(), body = BODY(), dark = DARK(), tire = TIRE();
        part(g, new T.BoxGeometry(2.2, 0.55, 6.4), dark, 0, 1.25, 0);
        const bedShape = new T.Shape([new T.Vector2(0, 0), new T.Vector2(4.6, 0), new T.Vector2(5.3, 1.9), new T.Vector2(6.1, 2.1), new T.Vector2(6.1, 2.35), new T.Vector2(-0.3, 1.9)]);
        const bedGeo = new T.ExtrudeGeometry(bedShape, { depth: 3.1, bevelEnabled: false });
        bedGeo.rotateY(-Math.PI / 2); bedGeo.translate(1.55, 0, 0);
        const bed = new T.Group(); bed.position.set(0, 1.55, -3.1); g.add(bed);
        part(bed, bedGeo, body, 0, 0, 0, 0.6);
        const load = new T.Mesh(new T.ConeGeometry(1.45, 1.3, 7), ORE());
        load.scale.set(1, 1, 1.5); load.position.set(0, 2.25, 2.2); bed.add(load);
        part(g, new T.BoxGeometry(2.9, 0.18, 1.4), dark, 0, 2.55, 2.6, 0.5);
        part(g, new T.BoxGeometry(1.05, 1.15, 1.2), dark, -0.85, 3.2, 2.55, 0.6);
        part(g, new T.BoxGeometry(1.8, 1.1, 0.35), solid(0x0a0f1a), 0, 1.95, 3.25, 0.4);
        const rail = new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(1.45, 3.1, 3.25), new T.Vector3(1.45, 3.1, 1.95), new T.Vector3(-1.45, 3.1, 1.95)]), lineMat(0xe6ecf5, 0.8));
        g.add(rail);
        const ladder = new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(1.1, 0.4, 3.35), new T.Vector3(0.7, 2.55, 3.35)]), lineMat(0xe6ecf5, 0.8));
        g.add(ladder);
        [[1.3, 2.25, 1], [-1.3, 2.25, 1], [1.25, -1.9, 2], [-1.25, -1.9, 2]].forEach(([x, z, n]) => {
          for (let k = 0; k < n; k++) {
            const w = part(g, new T.CylinderGeometry(0.9, 0.9, 0.6, 16), tire, x + Math.sign(x) * k * 0.62, 0.9, z, 0.22);
            w.rotation.z = Math.PI / 2;
          }
        });
        g.scale.setScalar(0.42);
        g.userData = { bed, load };
        return g;
      }
      // Pala eléctrica de cables: orugas, casa con contrapeso, pórtico en A, pluma con polea,
      // brazo del cucharón que entra y sale, cables de izaje y cable de alimentación
      function shovelModel() {
        const g = new T.Group(), body = BODY(), dark = DARK();
        [-2.6, 2.6].forEach(x => {
          part(g, new T.BoxGeometry(2, 1.8, 9), dark, x, 0.9, 0);
        });
        const house = new T.Group(); house.position.y = 1.9; g.add(house);
        part(house, new T.BoxGeometry(6.4, 4.4, 8), body, 0, 2.4, -1.2);
        part(house, new T.BoxGeometry(6.6, 2.4, 2), dark, 0, 1.6, -5.6);
        part(house, new T.BoxGeometry(2, 2, 2), dark, -2.4, 5.4, 2.2);
        const apex = new T.Vector3(0, 13, -3.6);
        [[-2.6, 4.6, 1.8], [2.6, 4.6, 1.8], [-2.6, 4.6, -4.8], [2.6, 4.6, -4.8]].forEach(([x, y, z]) => {
          house.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(x, y, z), apex]), lineMat(0xe6ecf5, 0.9)));
        });
        const boomRoot = new T.Vector3(0, 3, 3), boomTip = new T.Vector3(0, 19, 16);
        const boomLen = boomRoot.distanceTo(boomTip);
        const boom = part(house, new T.BoxGeometry(1.1, 1.1, boomLen), body, 0, 0, 0, 0.6);
        boom.position.copy(boomRoot).lerp(boomTip, 0.5);
        boom.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), boomTip.clone().sub(boomRoot).normalize());
        const sheave = new T.Mesh(new T.TorusGeometry(1.4, 0.3, 8, 24), solid(0xe6ecf5, { metalness: 0.7, roughness: 0.3 }));
        sheave.position.copy(boomTip); sheave.rotation.y = Math.PI / 2; house.add(sheave);
        house.add(new T.Line(new T.BufferGeometry().setFromPoints([apex, boomTip]), lineMat(0xe6ecf5, 0.9)));
        // Brazo del cucharón (entra y sale) y cucharón colgado de los cables
        const crowd = new T.Group(); crowd.position.set(0, 9.5, 8.5); house.add(crowd);
        const handle = part(crowd, new T.BoxGeometry(0.8, 0.8, 11), dark, 0, 0, 3.5, 0.5);
        handle.rotation.x = 0.35;
        const dipper = new T.Group(); dipper.position.set(0, -2.2, 8.6); crowd.add(dipper);
        part(dipper, new T.BoxGeometry(3.4, 3.2, 2.8), body, 0, 0, 0, 0.7);
        for (let k = -1.2; k <= 1.21; k += 0.6) dipper.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(k, -1.6, 1.4), new T.Vector3(k, -2.3, 1.8)]), lineMat(0xe6ecf5, 0.9)));
        const cable = new T.Line(new T.BufferGeometry().setFromPoints([boomTip, new T.Vector3(0, 7.3, 17.1)]), lineMat(0xe6ecf5, 0.7));
        house.add(cable);
        g.userData = { house, crowd, dipper, cable, boomTip };
        return g;
      }
      // Perforadora rotativa: orugas, gatas de nivelación, sala de máquinas, cabina,
      // mástil reticulado con cabezal que baja y sube, barra de perforación y polvo en la boca
      function drillModel() {
        const g = new T.Group(), body = BODY(), dark = DARK();
        part(g, new T.BoxGeometry(1.2, 1.1, 6), dark, -1.5, 0.55, 0); part(g, new T.BoxGeometry(1.2, 1.1, 6), dark, 1.5, 0.55, 0);
        part(g, new T.BoxGeometry(4, 1, 7), body, 0, 1.6, 0);
        part(g, new T.BoxGeometry(3.4, 2.2, 3.4), body, 0, 3.2, -1.2);
        part(g, new T.BoxGeometry(1.6, 1.8, 1.6), dark, -1, 3, 2.4);
        [[-1.8, -3.2], [1.8, -3.2], [-1.8, 3.2], [1.8, 3.2]].forEach(([x, z]) => part(g, new T.BoxGeometry(0.5, 1.4, 0.5), dark, x, 0.7, z, 0.4));
        const mastH = 17, mx = 0.9, mz = 3.4;
        const lat = [];
        for (let y = 2.2; y < 2.2 + mastH; y += 1.5) {
          lat.push(new T.Vector3(mx - 0.5, y, mz - 0.5), new T.Vector3(mx + 0.5, y + 1.5, mz + 0.5));
          lat.push(new T.Vector3(mx + 0.5, y, mz - 0.5), new T.Vector3(mx - 0.5, y + 1.5, mz + 0.5));
        }
        [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(([dx, dz]) => lat.push(new T.Vector3(mx + dx, 2.2, mz + dz), new T.Vector3(mx + dx, 2.2 + mastH, mz + dz)));
        g.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(lat), lineMat(0xe6ecf5, 0.85)));
        const head = part(g, new T.BoxGeometry(1.4, 1.2, 1.4), solid(0x38bdf8, { emissive: 0x0144ad, emissiveIntensity: 0.4 }), mx, 14, mz, 0.6);
        const rodGeo = new T.BufferGeometry().setFromPoints([new T.Vector3(mx, 14, mz), new T.Vector3(mx, 0, mz)]);
        const rod = new T.Line(rodGeo, lineMat(0x9fe2ff, 0.9)); g.add(rod);
        const dust = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xb8c4d4, transparent: true, opacity: 0, depthWrite: false }));
        dust.position.set(mx, 0.8, mz); dust.scale.setScalar(5); g.add(dust);
        g.userData = { head, rod, dust, mx, mz };
        return g;
      }
      // Galpón con techo a dos aguas
      function shed(x, y, z, w, h, d, ry, color) {
        const s = new T.Shape([new T.Vector2(-w / 2, 0), new T.Vector2(w / 2, 0), new T.Vector2(w / 2, h), new T.Vector2(0, h + w * 0.28), new T.Vector2(-w / 2, h)]);
        const geo = new T.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
        geo.translate(0, 0, -d / 2);
        const g = new T.Group();
        part(g, geo, solid(color || 0x223558), 0, 0, 0, 0.6);
        g.position.set(x, y, z); g.rotation.y = ry || 0;
        world.add(g);
        return g;
      }
      // Edificio de oficinas con franjas de ventanas por piso
      function offices(x, y, z, w, d, floors, ry) {
        const g = new T.Group(), fh = 3;
        part(g, new T.BoxGeometry(w, floors * fh, d), solid(0x1c2a44), 0, floors * fh / 2, 0, 0.6);
        for (let f = 0; f < floors; f++) {
          const band = new T.Mesh(new T.BoxGeometry(w + 0.08, 0.9, d + 0.08), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 }));
          band.position.y = f * fh + 1.7; g.add(band); windows.push(band);
        }
        g.position.set(x, y, z); g.rotation.y = ry || 0;
        world.add(g);
        return g;
      }
      // Carretera de mina: calzada suavizada, bermas de seguridad a ambos lados y línea central discreta
      function roadPath(fn, pts) {
        let P = draped(fn, pts, 0.35, 200);
          for (let pass = 0; pass < 3; pass++) {
            P = P.map((p, k) => {
              if (k === 0 || k === P.length - 1) return p;
              const q = new T.Vector3((P[k - 1].x + p.x * 2 + P[k + 1].x) / 4, 0, (P[k - 1].z + p.z * 2 + P[k + 1].z) / 4);
              q.y = fn(q.x, q.z) + 0.35;
              return q;
            });
          }
        return P;
      }
      function roadway(fn, pts, width, dense, gaps) {
        const P = dense || roadPath(fn, pts);
        const rows = [[], [], [], [], [], []];
        P.forEach((p, k) => {
          const q = P[Math.min(P.length - 1, k + 1)], o = P[Math.max(0, k - 1)];
          const dir = new T.Vector3(q.x - o.x, 0, q.z - o.z).normalize();
          const side = new T.Vector3(-dir.z, 0, dir.x);
          const at = (off, lift) => {
            const v = p.clone().addScaledVector(side, off);
            v.y = Math.max(p.y, fn(v.x, v.z) + 0.35) + lift;
            return v;
          };
          const hw = width / 2;
          // En los empalmes la berma se abre para que las vías se unan sin cruzarse
          const open = (gaps || []).some(gp => Math.hypot(gp.x - p.x, gp.z - p.z) < width + 4);
          const bw = open ? 0 : 1, bh = open ? 0 : 1;
          rows[0].push(at(hw + 0.9 * bw, -0.15 * bh)); rows[1].push(at(hw + 0.45 * bw, 0.55 * bh)); rows[2].push(at(hw, 0));
          rows[3].push(at(-hw, 0)); rows[4].push(at(-hw - 0.45 * bw, 0.55 * bh)); rows[5].push(at(-hw - 0.9 * bw, -0.15 * bh));
        });
        const strip = (A, B, mat) => {
          const pos = [], idx = [];
          A.forEach((a, k) => {
            const b = B[k];
            pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
            if (k < A.length - 1) { const i = k * 2; idx.push(i, i + 1, i + 2, i + 1, i + 3, i + 2); }
          });
          const g = new T.BufferGeometry();
          g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
          g.computeVertexNormals();
          world.add(new T.Mesh(g, mat));
        };
        const surface = new T.MeshBasicMaterial({ color: 0x223250, side: T.DoubleSide });
        const berm = new T.MeshStandardMaterial({ color: 0x4a5b78, roughness: 0.9, metalness: 0, side: T.DoubleSide });
        strip(rows[2], rows[3], surface);
        strip(rows[0], rows[1], berm); strip(rows[1], rows[2], berm);
        strip(rows[3], rows[4], berm); strip(rows[4], rows[5], berm);
        lineThrough(rows[1], 0x9fb0c8, 0.35); lineThrough(rows[4], 0x9fb0c8, 0.35);
        lineThrough(P.map(p => p.clone().add(new T.Vector3(0, 0.06, 0))), 0xd8dee8, 0.28, true);
        return P;
      }
      // Faja transportadora sobre caballetes, con el mineral avanzando sobre la banda
      function conveyor(points, speed) {
        const pts = points.map(p => new T.Vector3(p[0], p[1], p[2]));
        const path = new T.CurvePath();
        for (let i = 0; i < pts.length - 1; i++) path.add(new T.LineCurve3(pts[i], pts[i + 1]));
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i], b = pts[i + 1], len = a.distanceTo(b);
          const belt = new T.Mesh(new T.BoxGeometry(1.8, 0.35, len), solid(0x2a3f66));
          belt.position.copy(a).lerp(b, 0.5); belt.lookAt(b);
          belt.add(new T.LineSegments(new T.EdgesGeometry(belt.geometry), lineMat(0x9fe2ff, 0.7)));
          world.add(belt);
          const hood = new T.Mesh(new T.BoxGeometry(2.2, 0.15, len), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 }));
          hood.position.copy(belt.position).add(new T.Vector3(0, 1.1, 0)); hood.quaternion.copy(belt.quaternion); world.add(hood);
          for (let s = 0; s <= len; s += 7) {
            const p = a.clone().lerp(b, s / len);
            const ground = groundFn(p.x, p.z);
            if (p.y - ground > 1) lineThrough([new T.Vector3(p.x - 0.8, ground, p.z), new T.Vector3(p.x, p.y - 0.2, p.z), new T.Vector3(p.x + 0.8, ground, p.z)], 0x9fb0c8, 0.6);
          }
        }
        const total = path.getLength();
        for (let k = 0; k < Math.round(total / 4); k++) {
          const lump = new T.Mesh(new T.DodecahedronGeometry(0.55), ORE());
          world.add(lump);
          movers.push({ grp: lump, curve: path, speed: speed / total * 60, offset: k / Math.round(total / 4), lift: 0.5, upright: true });
        }
        return path;
      }
      // Etiqueta discreta de instalación, dibujada como texto en el espacio
      function tag(text, x, y, z) {
        const c = document.createElement('canvas'), g = c.getContext('2d');
        g.font = '600 44px "Barlow Semi Condensed", sans-serif';
        c.width = Math.ceil(g.measureText(text).width) + 40; c.height = 64;
        g.font = '600 44px "Barlow Semi Condensed", sans-serif';
        g.fillStyle = 'rgba(2, 8, 18, 0.72)'; g.fillRect(0, 6, c.width, 52);
        g.fillStyle = '#9fb0c8'; g.fillText(text, 20, 47);
        const tx = new T.CanvasTexture(c);
        ownTex.push(tx);
        const s = new T.Sprite(new T.SpriteMaterial({ map: tx, transparent: true, depthWrite: false }));
        s.scale.set(c.width / 64 * 3, 3, 1);
        s.position.set(x, y, z);
        s.userData.tag = true; s.visible = false;
        world.add(s);
        return s;
      }

      function mover(curve, size, speed, offset, color, pingPong, model) {
        let grp = model, lift = 0.1;
        if (!grp) {
          const g = new T.BoxGeometry(size[0], size[1], size[2]);
          grp = new T.Group();
          grp.add(new T.Mesh(g, new T.MeshBasicMaterial({ color: 0x0b1730 })));
          grp.add(new T.LineSegments(new T.EdgesGeometry(g), lineMat(color || 0xe6ecf5, 0.95)));
          lift = size[1] / 2 + 0.3;
        }
        world.add(grp);
        movers.push({ grp, curve, speed, offset, pingPong, lift });
      }
      // Volquete en ciclo: carga en el frente, viaja cargado, descarga levantando la tolva y vuelve vacío
      // Volquete en ciclo: carga en el frente, viaja cargado por su carril, gira, retrocede y descarga,
      // y vuelve vacío por el carril contrario. Los faros se encienden de noche.
      function haulTruck(curve, offset, target) {
        const tr = truckModel();
        world.add(tr);
        [0.9, -0.9].forEach(x => {
          const lamp = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xfff1c9, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
          lamp.position.set(x, 2.1, 3.5); lamp.scale.setScalar(2.6);
          tr.add(lamp); nightLights.push({ m: lamp, max: 0.95 });
        });
        const fall = [0, 1, 2, 3].map(() => { const m = new T.Mesh(new T.DodecahedronGeometry(0.45), ORE()); m.visible = false; world.add(m); return m; });
        movers.push({ grp: tr, curve, speed: 1 / 95, offset, cycle: true, lift: 0.1, fall, target });
      }
      const onTerrain = (fn, pts, lift) => pts.map(([x, z]) => new T.Vector3(x, fn(x, z) + lift, z));
      const draped = (fn, pts, lift, n) => new T.CatmullRomCurve3(onTerrain(fn, pts, lift)).getPoints(n || 80).map(p => new T.Vector3(p.x, fn(p.x, p.z) + lift, p.z));
      // Luz de instalación que se enciende al anochecer
      function addLamp(p, size) {
        const lamp = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xffe3b0, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
        lamp.position.copy(p); lamp.scale.setScalar(size || 6);
        world.add(lamp); nightLights.push({ m: lamp, max: 0.8 });
      }
      // Torre de iluminación: mástil con reflectores que se encienden de noche
      // Mancha de luz cálida pegada al terreno, para los reflectores de noche
      const poolTex = (() => {
        const c = document.createElement("canvas"); c.width = c.height = 128;
        const g = c.getContext("2d"), rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
        rg.addColorStop(0, "rgba(255,226,170,0.9)"); rg.addColorStop(0.5, "rgba(255,200,130,0.35)"); rg.addColorStop(1, "rgba(255,190,120,0)");
        g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
        return new T.CanvasTexture(c);
      })();
      function lightPool(cx, cz, size) {
        const geo = new T.PlaneGeometry(size, size, 24, 24);
        geo.rotateX(-Math.PI / 2);
        const p = geo.attributes.position;
        for (let i = 0; i < p.count; i++) { const x = p.getX(i) + cx, z = p.getZ(i) + cz; p.setXYZ(i, x, groundFn(x, z) + 0.5, z); }
        const m = new T.Mesh(geo, new T.MeshBasicMaterial({ map: poolTex, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
        world.add(m); nightLights.push({ m, max: 0.75 });
      }
      // Torre de iluminación: mástil con reflectores apuntando al tajo; de noche se ve el cono de luz y el área iluminada
      function lightTower(p, aim) {
        const g = new T.Group(); g.position.copy(p);
        part(g, new T.BoxGeometry(2, 1, 3), DARK(), 0, 0.5, 0, 0.4);
        part(g, new T.CylinderGeometry(0.18, 0.25, 10, 6), BODY(), 0, 6, 0, false);
        part(g, new T.BoxGeometry(2.6, 0.9, 0.5), BODY(), 0, 11.2, 0, 0.5);
        const lamp = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xfff1c9, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
        lamp.position.y = 11.4; lamp.scale.setScalar(9); g.add(lamp);
        nightLights.push({ m: lamp, max: 0.85 });
        world.add(g);
        const lampAt = p.clone().add(new T.Vector3(0, 11.4, 0));
        const len = lampAt.distanceTo(aim);
        const cone = new T.Mesh(new T.ConeGeometry(len * 0.32, len, 24, 1, true), new T.MeshBasicMaterial({ color: 0xffe3b0, transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending }));
        cone.position.copy(lampAt).lerp(aim, 0.5);
        cone.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), lampAt.clone().sub(aim).normalize());
        world.add(cone); nightLights.push({ m: cone, max: 0.1 });
        lightPool(aim.x, aim.z, len * 0.9);
      }

      // Poste de alumbrado: mástil, brazo y luminaria; de noche enciende y alumbra el piso
      function lampPost(x, z) {
        const y = groundFn(x, z);
        const g = new T.Group(); g.position.set(x, y, z);
        const metal = solid(0xb8c4d4, { metalness: 0.6, roughness: 0.35 });
        part(g, new T.CylinderGeometry(0.12, 0.18, 7, 6), metal, 0, 3.5, 0, false);
        part(g, new T.BoxGeometry(1.6, 0.12, 0.12), metal, 0.7, 6.9, 0, false);
        part(g, new T.BoxGeometry(0.7, 0.22, 0.4), solid(0xe6ecf5), 1.4, 6.8, 0, false);
        world.add(g);
        const lamp = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xffe3b0, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
        lamp.position.set(x + 1.4, y + 6.6, z); lamp.scale.setScalar(4.5);
        world.add(lamp); nightLights.push({ m: lamp, max: 0.9 });
        lightPool(x + 1.4, z, 11);
      }

      /* Equipos de interior mina, a escala de una labor de 4,2 de alto */
      const MINE_Y = () => solid(0xe8a83a);
      const wheels = (g, zs, r, x) => zs.forEach(z => [-1, 1].forEach(s => {
        const w = part(g, new T.CylinderGeometry(r, r, 0.45, 14), TIRE(), s * x, r, z, 0.2);
        w.rotation.z = Math.PI / 2;
      }));
      // Scoop (cargador de bajo perfil): chasis articulado, cabina lateral con techo y cucharón que carga y vacía
      function scoopModel() {
        const g = new T.Group(), body = MINE_Y(), dark = DARK();
        part(g, new T.BoxGeometry(1.9, 1.1, 2.8), body, 0, 1.2, -1.4, 0.5);
        part(g, new T.BoxGeometry(1.6, 0.7, 2.2), dark, 0, 0.95, 1.1, 0.4);
        part(g, new T.BoxGeometry(0.7, 0.75, 1.1), dark, -0.62, 2.12, -0.1, 0.4);
        part(g, new T.BoxGeometry(0.95, 0.08, 1.3), body, -0.62, 2.55, -0.1, 0.4);
        wheels(g, [-1.6, 1.3], 0.58, 1.02);
        const bucket = new T.Group(); bucket.position.set(0, 0.85, 2.15); g.add(bucket);
        part(bucket, new T.BoxGeometry(2.1, 0.95, 1.2), body, 0, 0.1, 0.65, 0.6);
        const load = new T.Mesh(new T.ConeGeometry(0.85, 0.7, 7), ORE());
        load.scale.set(1.15, 1, 0.65); load.position.set(0, 0.85, 0.6); bucket.add(load);
        g.userData = { bucket, load };
        return g;
      }
      // Volquete de bajo perfil para la rampa: cabina baja adelante y tolva atrás
      function lowTruckModel() {
        const g = new T.Group(), body = MINE_Y(), dark = DARK();
        part(g, new T.BoxGeometry(1.8, 0.55, 6.6), dark, 0, 0.95, 0, 0.4);
        part(g, new T.BoxGeometry(1.8, 1.1, 1.8), body, 0, 1.6, 2.3, 0.5);
        part(g, new T.BoxGeometry(0.75, 0.75, 1.0), dark, -0.55, 2.5, 2.4, 0.4);
        part(g, new T.BoxGeometry(2.1, 1.3, 4.0), body, 0, 1.9, -1.2, 0.6);
        const load = new T.Mesh(new T.ConeGeometry(1.1, 0.8, 7), ORE());
        load.scale.set(0.95, 1, 1.75); load.position.set(0, 2.9, -1.2); g.add(load);
        wheels(g, [2.3, -0.9, -2.4], 0.62, 1.0);
        g.userData = { load };
        return g;
      }
      // Jumbo de perforación frontal: dos brazos con vigas de avance y barras que entran al frente
      function jumboModel() {
        const g = new T.Group(), body = MINE_Y(), dark = DARK();
        part(g, new T.BoxGeometry(1.8, 1.0, 4.6), body, 0, 1.05, -0.4, 0.5);
        part(g, new T.BoxGeometry(1.0, 0.9, 1.2), dark, 0.4, 2.0, -1.6, 0.4);
        part(g, new T.BoxGeometry(1.3, 0.08, 1.5), body, 0.4, 2.5, -1.6, 0.4);
        wheels(g, [1.3, -1.6], 0.55, 1.0);
        const feeds = [];
        [[-0.45, 1.9], [0.45, 2.9]].forEach(([x, y]) => {
          const boom = part(g, new T.BoxGeometry(0.26, 0.26, 2.6), dark, x, (1.6 + y) / 2, 2.6, 0.4);
          boom.rotation.x = -Math.atan2(y - 1.6, 2.6);
          const feed = new T.Group(); feed.position.set(x, y, 3.9); g.add(feed);
          part(feed, new T.BoxGeometry(0.2, 0.2, 3.2), body, 0, 0, 0, 0.4);
          feed.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(0, -0.12, -1.6), new T.Vector3(0, -0.12, 2.2)]), lineMat(0xe6ecf5, 0.9)));
          feeds.push(feed);
        });
        const dust = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xd8dee8, transparent: true, opacity: 0, depthWrite: false }));
        dust.position.set(0, 2.4, 6.4); dust.scale.setScalar(3); g.add(dust);
        g.userData = { feeds, dust };
        return g;
      }
      // Empernador: brazo levantado hacia el techo que coloca los pernos de sostenimiento
      function bolterModel() {
        const g = new T.Group(), body = MINE_Y(), dark = DARK();
        part(g, new T.BoxGeometry(1.8, 1.0, 4.4), body, 0, 1.05, -0.3, 0.5);
        part(g, new T.BoxGeometry(1.0, 0.9, 1.2), dark, -0.4, 2.0, -1.4, 0.4);
        wheels(g, [1.3, -1.5], 0.55, 1.0);
        const boom = new T.Group(); boom.position.set(0, 1.6, 1.6); boom.rotation.x = -0.25; g.add(boom);
        part(boom, new T.BoxGeometry(0.26, 0.26, 2.2), dark, 0, 0, 1.1, 0.4);
        part(boom, new T.BoxGeometry(0.2, 2.2, 0.2), body, 0, 0.9, 2.2, 0.4);
        g.userData = { boom };
        return g;
      }
      // Locomotora de troley para la línea cauville, con su pantógrafo al cable aéreo
      function locoModel() {
        const g = new T.Group(), dark = DARK();
        part(g, new T.BoxGeometry(1.3, 1.2, 2.6), MINE_Y(), 0, 0.95, 0, 0.5);
        part(g, new T.BoxGeometry(1.2, 0.7, 0.9), dark, 0, 1.9, -0.7, 0.4);
        g.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(0, 2.25, -0.7), new T.Vector3(0, 4.3, 0.2), new T.Vector3(0.25, 4.65, 0.2)]), lineMat(0xe6ecf5, 0.8)));
        wheels(g, [-0.8, 0.8], 0.3, 0.55);
        return g;
      }
      // Carro minero con su carga de mineral
      function carModel() {
        const g = new T.Group();
        part(g, new T.BoxGeometry(1.2, 0.95, 2.0), solid(0x8d9bb0, { metalness: 0.5, roughness: 0.5 }), 0, 0.85, 0, 0.5);
        const load = new T.Mesh(new T.ConeGeometry(0.6, 0.5, 6), ORE());
        load.scale.set(1, 1, 1.6); load.position.y = 1.5; g.add(load);
        wheels(g, [-0.6, 0.6], 0.28, 0.5);
        g.userData = { load };
        return g;
      }
      // Skip de izaje con su asa de enganche
      function skipModel() {
        const g = new T.Group();
        part(g, new T.BoxGeometry(1.9, 3.4, 1.9), BODY(), 0, 1.7, 0, 0.6);
        g.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(-0.95, 3.4, 0), new T.Vector3(0, 4.1, 0), new T.Vector3(0.95, 3.4, 0)]), lineMat(0xe6ecf5, 0.9)));
        return g;
      }

      function* buildTajo() {
        groundFn = hTajo;
        world.add(yield* terrain(hTajo, 380, 380, 0, BENCHES * BENCH_H, 1, [-1, 0, 172, 172.01], [-142, 34, -72, 60]));
        yield;
        world.add(yield* terrain(hTajo, 1100, 1100, 0, BENCHES * BENCH_H, 0.32, [171.99, 172, 420, 540]));
        const pitPoint = (a, rr) => {
          const x = PIT.x + Math.cos(a) * PIT.rx * rr, z = PIT.z + Math.sin(a) * PIT.rz * rr;
          return new T.Vector3(x, hTajo(x, z), z);
        };
        yield;
        // Crestas de bancos
        for (let k = 1; k <= BENCHES; k++) {
          const rr = 1 - (k - 0.5) / BENCHES, pts = [];
          for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.05) {
            const w = 1 + 0.06 * Math.sin(3 * a + 1);
            pts.push(new T.Vector3(PIT.x + Math.cos(a) * PIT.rx * rr / w, -(k - 1) * BENCH_H + 0.15, PIT.z + Math.sin(a) * PIT.rz * rr / w));
          }
          lineThrough(pts, 0x38bdf8, 0.5 - k * 0.03);
        }
        tag('TAJO', PIT.x, 8, PIT.z - PIT.rz - 4);

        yield;
        // Rampa de dos carriles: del borde del tajo al frente de minado
        const ramp = [];
        for (let t = 0; t <= 1.0001; t += 0.01) {
          const a = -0.5 + t * Math.PI * 2.3, s = 0.98 - 0.82 * t;
          const p = pitPoint(a, s); p.y = rampY(t) + 0.4; ramp.push(p);
        }
        const face = ramp[ramp.length - 1], rim = ramp[0];

        yield;
        // Frente de minado: pala eléctrica cargando, subestación y perforadoras en el banco
        const loadSpot = face.clone().add(new T.Vector3(3, 0, -2));
        const shovel = shovelModel();
        shovel.scale.setScalar(0.72);
        const toCenter = new T.Vector3(PIT.x - loadSpot.x, 0, PIT.z - loadSpot.z);
        if (toCenter.length() < 1) toCenter.set(-1, 0, 0);
        toCenter.normalize();
        shovel.position.copy(loadSpot).addScaledVector(toCenter, 12);
        shovel.position.y = face.y - 0.3;
        shovel.lookAt(loadSpot.x, shovel.position.y, loadSpot.z);
        world.add(shovel);
        movers.push({ grp: shovel.userData.house, spin: true, rig: shovel.userData });
        const subst = new T.Vector3(PIT.x - 14, -BENCHES * BENCH_H + 3.6, PIT.z - 12);
        block(subst.x, subst.y, subst.z, 3, 2.4, 2.4, 0xf3b35c);
        lineThrough([subst.clone().add(new T.Vector3(0, 0.4, 0)), shovel.position.clone().add(new T.Vector3(0, 0.4, 0))], 0xf3b35c, 0.8, true);
        tag('FRENTE DE CARGUÍO', face.x - 6, face.y + 16, face.z + 4);
        yield;
        // Plataforma de perforación propia en el lado norte del tajo, lejos de la rampa y los volquetes
        const DP = new T.Vector3(-73, -10.8, -46);
        lineThrough([[-8, -6], [8, -6], [8, 6], [-8, 6], [-8, -6]].map(([x, z]) => new T.Vector3(DP.x + x, DP.y + 0.3, DP.z + z)), 0x9fe2ff, 0.6, true);
        [[-4.5, 2.5], [0, -1.5], [4.5, 2]].forEach(([ox, oz], k) => {
          const p = new T.Vector3(DP.x + ox, DP.y, DP.z + oz);
          const d = drillModel();
          d.scale.setScalar(0.72);
          d.position.copy(p); d.rotation.y = 0.4 + k * 0.25;
          world.add(d);
          movers.push({ drill: d.userData, phase: k * 0.33 });
        });
        for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) {
          const p = new T.Vector3(DP.x - 7 + i * 1.9, DP.y, DP.z + 4 + j * 1.6);
          const dot = new T.Mesh(new T.CircleGeometry(0.45, 8), new T.MeshBasicMaterial({ color: 0x9fe2ff }));
          dot.rotation.x = -Math.PI / 2; dot.position.copy(p).add(new T.Vector3(0, 0.2, 0)); world.add(dot);
        }
        tag('PERFORACIÓN Y VOLADURA', DP.x, DP.y + 18, DP.z);

        yield;
        // Chancadora primaria: plataforma elevada de descarga, muro, tolva y edificio abajo
        const crEnd = new T.Vector3(14, 7.4, -30), hopperAt = new T.Vector3(21, 7, -30);
        const crusher = new T.Group();
        part(crusher, new T.BoxGeometry(9, 7, 9), solid(0x223558), 30, 4.5, -30, 0.6);
        const hopper = part(crusher, new T.CylinderGeometry(4.2, 1.6, 4, 4, 1, true), solid(0x41516e, { side: T.DoubleSide }), hopperAt.x + 1.5, 5.6, hopperAt.z, 0.8);
        hopper.rotation.y = Math.PI / 4;
        part(crusher, new T.BoxGeometry(1, 2, 10), solid(0x1c2a44), 19.2, 8, -30, 0.5);
        world.add(crusher);
        tag('CHANCADORA PRIMARIA', 28, 18, -30);

        yield;
        // Botadero de desmonte con descargas en la cresta
        tag('BOTADERO', 46, 16, 60);
        const dbEnd = new T.Vector3(34, 0, 48); dbEnd.y = hTajo(dbEnd.x, dbEnd.z);
        [[40, 52], [43, 49], [38, 56], [46, 54]].forEach(([x, z]) => {
          const pile = new T.Mesh(new T.ConeGeometry(1.6, 1.3, 7), ORE());
          pile.position.set(x, hTajo(x, z) + 0.6, z); world.add(pile);
        });

        yield;
        // Red vial: una sola vía principal sale del tajo hasta un empalme; desde ahí nacen los ramales.
        // Cada ramal empieza en un punto exacto de su vía madre, así ninguna carretera queda encima de otra.
        const near = (P, x, z) => P.reduce((b, p, i) => { const d = (p.x - x) ** 2 + (p.z - z) ** 2; return d < b.d ? { i, d } : b; }, { i: 0, d: Infinity }).i;
        const J0 = new T.Vector3(8, 0, -22); J0.y = hTajo(J0.x, J0.z) + 0.35;
        const mainOut = roadPath(hTajo, [[rim.x, rim.z], [2, -27], [J0.x, J0.z]]);
        const toCrusher = roadPath(hTajo, [[J0.x, J0.z], [11, -27], [crEnd.x, crEnd.z]]);
        const toDump = roadPath(hTajo, [[J0.x, J0.z], [5, -2], [13, 24], [26, 40], [dbEnd.x, dbEnd.z]]);
        const toPlant = roadPath(hTajo, [[J0.x, J0.z], [2, -42], [20, -58], [40, -67], [58, -70]]);
        const jB = toDump[near(toDump, 6, 4)], jC = toDump[near(toDump, 13, 24)];
        const toGate = roadPath(hTajo, [[jB.x, jB.z], [28, 5], [50, 0], [66, 10], [92, 44], [130, 92], [175, 140]]);
        const jD = toGate[near(toGate, 50, 0)], jE = toPlant[toPlant.length - 1];
        const plantLink = roadPath(hTajo, [[jE.x, jE.z], [62, -40], [56, -16], [jD.x, jD.z]]);
        const toMagazine = roadPath(hTajo, [[jC.x, jC.z], [-8, 74], [-60, 98], [-106, 100]]);
        const joints = [rim, J0, jB, jC, jD, jE];
        roadway(hTajo, null, 4.6, ramp, joints);
        roadway(hTajo, null, 4.6, mainOut, joints);
        roadway(hTajo, null, 4.6, toCrusher, joints);
        roadway(hTajo, null, 4.6, toDump, joints);
        roadway(hTajo, null, 3.4, toPlant, joints);
        roadway(hTajo, null, 3.4, toGate, joints);
        roadway(hTajo, null, 3, plantLink, joints);
        roadway(hTajo, null, 2.4, toMagazine, joints);
        yield;
        // Empalmes: una explanada limpia donde se unen las vías
        joints.forEach(j => {
          const geo = new T.CircleGeometry(j === J0 ? 6.5 : 4.8, 32);
          geo.rotateX(-Math.PI / 2);
          const p = geo.attributes.position;
          for (let i = 0; i < p.count; i++) { const x = p.getX(i) + j.x, z = p.getZ(i) + j.z; p.setXYZ(i, x, Math.max(j.y, hTajo(x, z) + 0.42), z); }
          world.add(new T.Mesh(geo, new T.MeshBasicMaterial({ color: 0x223250, side: T.DoubleSide })));
        });

        yield;
        // Ciclo de acarreo: rampa → vía principal → chancadora (mineral) o botadero (desmonte)
        const upRamp = ramp.slice().reverse();
        const route = tail => new T.CatmullRomCurve3([face.clone().add(new T.Vector3(3, 0, -2)), ...upRamp, ...mainOut.slice(1), ...tail.slice(1)], false, 'centripetal');
        const oreRoute = route(toCrusher), wasteRoute = route(toDump);
        [0, 0.4, 0.8].forEach(o => haulTruck(oreRoute, o, hopperAt));
        [0.2, 0.6].forEach(o => haulTruck(wasteRoute, o, new T.Vector3(40, dbEnd.y - 2, 54)));
        tag('GARITA', 132, 8, 96);
        yield;
        // Alumbrado: postes en planta, oficinas, campamento, chancadora, taller y a lo largo de la vía de acceso
        [[60, -76], [86, -76], [58, -52], [92, -50], [64, 6], [80, 6], [94, 14], [60, 24], [60, 44], [92, 44], [22, -40], [38, -22], [10, -14], [30, -2], [96, -26], [104, 2]].forEach(([x, z]) => lampPost(x, z));
        for (let k = 12; k < toGate.length - 40; k += 16) {
          const p = toGate[k], q = toGate[k + 1];
          const sx = -(q.z - p.z), sz = q.x - p.x, sl = Math.hypot(sx, sz) || 1;
          lampPost(p.x + sx / sl * 4.2, p.z + sz / sl * 4.2);
        }

        yield;
        // Pila de gruesos con faja apiladora (el mineral cae sobre la pila) y faja de alimentación a la planta
        const PILE = new T.Vector3(46, 0, -46);
        conveyor([[31, 4, -33], [PILE.x, 17, PILE.z], [PILE.x, 11.6, PILE.z]], 1);
        const pile = new T.Mesh(new T.ConeGeometry(9, 11, 32), ORE());
        pile.position.set(PILE.x, 6.5, PILE.z); world.add(pile);
        tag('PILA DE GRUESOS', PILE.x, 22, PILE.z);
        conveyor([[PILE.x + 4, 1.6, PILE.z - 4], [64, 9, -60]], 1);

        yield;
        // Concentradora: molino SAG, molinos de bolas, celdas de flotación, espesadores y relavera
        shed(72, 1, -64, 18, 10, 14, 0, 0x223558);
        tag('CONCENTRADORA', 74, 20, -66);
        const sag = part(world, new T.CylinderGeometry(4.2, 4.2, 6, 28), solid(0xd8dee8, { metalness: 0.6, roughness: 0.3 }), 86, 6, -58, 0.5);
        sag.rotation.z = Math.PI / 2;
        [-51, -45].forEach(z => { const b = part(world, new T.CylinderGeometry(2.6, 2.6, 8, 24), solid(0xd8dee8, { metalness: 0.6, roughness: 0.3 }), 86, 4, z, 0.5); b.rotation.z = Math.PI / 2; });
        for (let i = 0; i < 6; i++) part(world, new T.BoxGeometry(3, 3, 3), solid(0x2a3f66), 66 + i * 3.6, 2.5, -48, 0.5);
        tag('FLOTACIÓN', 75, 9, -44);
        disc(100, 1, -66, 6); disc(100, 1, -50, 6);
        lineThrough([new T.Vector3(100, 2, -44), new T.Vector3(100, 2.5, -27)], 0x9fe2ff, 0.7, true);
        part(world, new T.BoxGeometry(24, 2.5, 26), solid(0x1c2a44), 100, 1.75, -12, 0.5);
        const water = new T.Mesh(new T.PlaneGeometry(20, 22), new T.MeshBasicMaterial({ color: 0x007aff, transparent: true, opacity: 0.4 }));
        water.rotation.x = -Math.PI / 2; water.position.set(100, 3.1, -12); world.add(water);
        tag('RELAVERA', 100, 9, -12);

        yield;
        // Servicios: taller, grifo, almacén, polvorín, oficinas y campamento
        shed(20, 1, -8, 13, 6, 10, 0.2, 0x2a3f66);
        tag('TALLER DE MANTENIMIENTO', 20, 13, -8);
        const fuel = new T.Group(); fuel.position.set(18, 1, 12);
        part(fuel, new T.BoxGeometry(7, 0.4, 5), solid(0xd8dee8), 0, 4, 0, 0.6);
        [[-3, -2], [3, -2], [-3, 2], [3, 2]].forEach(([x, z]) => part(fuel, new T.CylinderGeometry(0.2, 0.2, 4, 6), DARK(), x, 2, z, false));
        part(fuel, new T.CylinderGeometry(1.2, 1.2, 4, 16), solid(0x2a3f66), 0, 1.2, -4.5, 0.5).rotation.z = Math.PI / 2;
        world.add(fuel);
        tag('GRIFO', 18, 10, 12);
        shed(40, 1, 18, 12, 5, 9, 0.1, 0x2a3f66);
        tag('ALMACÉN', 40, 12, 18);
        const pv = new T.Vector3(-112, 0, 102); pv.y = hTajo(pv.x, pv.z);
        shed(pv.x, pv.y, pv.z, 6, 3, 5, 0.4, 0x2a3f66);
        lineThrough([[-7, -7], [7, -7], [7, 7], [-7, 7], [-7, -7]].map(([x, z]) => new T.Vector3(pv.x + x, hTajo(pv.x + x, pv.z + z) + 1, pv.z + z)), 0xe6ecf5, 0.6, true);
        tag('POLVORÍN', pv.x, pv.y + 9, pv.z);
        offices(70, 1, 16, 8, 6, 4, 0); offices(84, 1, 18, 7, 7, 3, 0.2);
        tag('OFICINAS', 77, 17, 17);
        for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) shed(66 + i * 10, 1, 30 + j * 8, 7, 2.5, 4, 0, 0x223558);
        tag('CAMPAMENTO', 76, 9, 38);

        yield;
        // Geotecnia en una zona apartada: líneas de tensión, prismas y radares que vigilan el talud oeste
        for (let k = 0; k < 4; k++) {
          const pts = [];
          for (let a = 2.6 + k * 0.05; a < 3.5 + k * 0.03; a += 0.04) {
            const p = pitPoint(a, 1.06 + k * 0.025 + 0.012 * Math.sin(a * 37 + k));
            p.y += 0.3; pts.push(p);
          }
          lineThrough(pts, 0xff6a3d, 0.85);
        }
        for (let k = 0; k < 7; k++) {
          const p = pitPoint(2.75 + k * 0.1, 0.92 - (k % 3) * 0.12);
          const pr = new T.Mesh(new T.OctahedronGeometry(0.7), new T.MeshBasicMaterial({ color: 0xffffff }));
          pr.position.copy(p).add(new T.Vector3(0, 0.8, 0)); world.add(pr);
        }
        const wallTarget = pitPoint(3.05, 0.8);
        [[2.0, 1.4], [2.32, 1.42]].forEach(([a, rr]) => {
          const base = pitPoint(a, rr);
          const radar = new T.Group();
          radar.position.copy(base);
          part(radar, new T.BoxGeometry(2.6, 1.2, 4.2), BODY(), 0, 0.9, 0);
          part(radar, new T.CylinderGeometry(0.22, 0.22, 4, 8), DARK(), 0, 3.4, 0, 0.4);
          const head = new T.Group(); head.position.y = 5.6; radar.add(head);
          const dish = new T.Mesh(new T.SphereGeometry(1.9, 20, 10, 0, Math.PI * 2, 0, Math.PI / 3), new T.MeshStandardMaterial({ color: 0xe6ecf5, metalness: 0.6, roughness: 0.3, side: T.DoubleSide }));
          dish.rotation.x = Math.PI / 2; head.add(dish);
          const dist = base.distanceTo(wallTarget);
          const fan = new T.Mesh(new T.ConeGeometry(dist * 0.18, dist, 24, 1, true), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.07, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending }));
          fan.rotation.x = -Math.PI / 2; fan.position.z = dist / 2; head.add(fan);
          head.lookAt(wallTarget);
          world.add(radar);
          movers.push({ grp: head, sweep: true, base: head.rotation.y });
        });
        tag('RADAR DE TALUD', pitPoint(2.16, 1.6).x, 12, pitPoint(2.16, 1.6).z);

        yield;
        // Luces de las instalaciones para la guardia de noche
        [[30, 10, -30, 7], [21, 9, -30, 5], [46, 18, -46, 5], [72, 13, -64, 9], [86, 10, -58, 6], [20, 9, -8, 6], [18, 6, 12, 5], [40, 8, 18, 5], [76, 6, 34, 8], [72, 15, 16, 6], [100, 5, -12, 6], [subst.x, subst.y + 3, subst.z, 4]].forEach(([x, y, z, s]) => addLamp(new T.Vector3(x, y, z), s));
        yield;
        // Torres de iluminación del tajo
        lightTower(pitPoint(-2.2, 1.16), DP.clone());
        lightTower(pitPoint(0.9, 1.15), face.clone());
        lightTower(pitPoint(2.6, 1.15), pitPoint(2.9, 0.55));
        lightTower(pitPoint(-0.9, 1.15), pitPoint(-0.6, 0.6));

        yield;
        // Torre de operaciones: desde aquí se ve todo el tajo
        const towerAt = pitPoint(-2.65, 1.2);
        const tower = new T.Group(); tower.position.copy(towerAt); tower.scale.setScalar(0.6);
        part(tower, new T.CylinderGeometry(1.1, 2.2, 24, 12), solid(0xd8dee8, { metalness: 0.6, roughness: 0.3 }), 0, 12, 0, 0.4);
        part(tower, new T.CylinderGeometry(5.4, 3.8, 4, 24), new T.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, metalness: 0.2, roughness: 0.1 }), 0, 26, 0, 0.7);
        part(tower, new T.CylinderGeometry(6, 5.6, 0.7, 24), solid(0xd8dee8, { metalness: 0.6, roughness: 0.3 }), 0, 28.4, 0, 0.5);
        const band = new T.Mesh(new T.TorusGeometry(5.5, 0.18, 6, 48), new T.MeshBasicMaterial({ color: 0x38bdf8 }));
        band.rotation.x = Math.PI / 2; band.position.y = 24.2; tower.add(band);
        lineThrough([towerAt.clone().add(new T.Vector3(0, 17.3, 0)), towerAt.clone().add(new T.Vector3(0, 22, 0))], 0xe6ecf5, 0.9);
        addLamp(towerAt.clone().add(new T.Vector3(0, 16, 0)), 5);
        world.add(tower);

        return {
          at: (u, v) => { const x = (u - 0.5) * 200, z = (v - 0.5) * 150; return new T.Vector3(x, hTajo(x, z), z); },
          anchors: {
            'Operaciones': towerAt.clone().add(new T.Vector3(0, 19, 0)),
            'Planta': new T.Vector3(74, 13, -64),
            'Perforación y voladura': new T.Vector3(-73, 5, -46),
            'Geología': face.clone().add(new T.Vector3(0, 4, -4)),
            'Geotecnia': pitPoint(3.05, 1.12).add(new T.Vector3(0, 3, 0)),
            'Mantenimiento': new T.Vector3(20, 8, -8),
            'Almacén': new T.Vector3(40, 7, 18),
            'Recursos humanos': new T.Vector3(76, 4, 38),
            'Ingeniería': new T.Vector3(70, 13, 16),
            'Proyectos': new T.Vector3(100, 4, -55)
          },
          core: new T.Vector3(-14, 76, 2), target: new T.Vector3(-16, 12, 0), elev: [0.3, 0.62], az: [-0.6, -0.12], dist: 375
        };
      }

      function* buildSub() {
        groundFn = hSub;
        world.add(yield* terrain(hSub, 380, 190, -95, 40, 1, [-1, 0, 172, 172.01], [-106, 96, -98, 0]));
        yield;
        world.add(yield* terrain(hSub, 1100, 550, -275, 40, 0.32, [171.99, 172, 420, 540]));
        const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
        const cutFade = p => (1 - smooth(150, 420, Math.abs(p.x))) * smooth(-150, -102, p.y);
        yield;
        // Línea que se apaga hacia los bordes del corte (se suma a la luz, así no deja cortes bruscos)
        function glowLine(points, color, opacity) {
          const c = new T.Color(color), cols = [];
          points.forEach(p => { const f = cutFade(p); cols.push(c.r * f, c.g * f, c.b * f); });
          const g = new T.BufferGeometry().setFromPoints(points);
          g.setAttribute('color', new T.Float32BufferAttribute(cols, 3));
          const l = new T.Line(g, new T.LineBasicMaterial({ vertexColors: true, transparent: true, opacity, blending: T.AdditiveBlending, depthWrite: false }));
          world.add(l);
          return l;
        }

        yield;
        // Corte de la cordillera como un vidrio oscuro: deja ver las labores en 3D detrás
        const prof = [];
        for (let x = -540; x <= 540; x += 3) prof.push(new T.Vector2(x, hSub(x, 0)));
        const faceMat = new T.ShaderMaterial({
          vertexShader: terrainVS, transparent: true, side: T.DoubleSide, depthWrite: false,
          uniforms: { uLit: { value: 0 }, uWave: { value: -1 }, uDay: { value: 0 } },
          fragmentShader: [
            'uniform float uLit; uniform float uWave; uniform float uDay; varying vec3 vP;',
            'void main(){',
            '  float fx = 1.0 - smoothstep(150.0, 420.0, abs(vP.x));',
            '  float fy = smoothstep(-150.0, -102.0, vP.y);',
            '  float d = clamp(-vP.y / 100.0, 0.0, 1.0);',
            '  vec3 base = mix(vec3(0.05, 0.10, 0.19), vec3(0.012, 0.035, 0.08), d);',
            '  base = mix(base, vec3(0.08, 0.15, 0.27), uDay * 0.3 * (1.0 - d));',
            '  float w = uWave > 0.0 ? exp(-pow((abs(vP.x) - uWave) / 9.0, 2.0)) : 0.0;',
            '  float a = mix(0.42, 0.9, smoothstep(125.0, 175.0, abs(vP.x)));',
            '  gl_FragColor = vec4(base + w * vec3(0.12, 0.36, 0.85) + uLit * vec3(0.0, 0.015, 0.04), a * fx * fy);',
            '}'
          ].join('\n')
        });
        terrainMats.push(faceMat);
        world.add(new T.Mesh(new T.ShapeGeometry(new T.Shape([...prof, new T.Vector2(540, -150), new T.Vector2(-540, -150)])), faceMat));
        glowLine(prof.map(p => new T.Vector3(p.x, p.y, 0.2)), 0xe6ecf5, 0.8);
        for (let y = -16; y > -116; y -= 11) {
          const s = [];
          for (let x = -420; x <= 420; x += 6) s.push(new T.Vector3(x, y + 1.6 * Math.sin(x * 0.03 + y) + 0.8 * Math.sin(x * 0.11), 0.15));
          glowLine(s, 0x38bdf8, 0.09);
        }
        yield;
        // Contorno del bloque de roca: el corte tiene fondo
        const BZ = -70;
        {
          lineThrough([new T.Vector3(-125, -100, 0), new T.Vector3(-125, -100, BZ), new T.Vector3(125, -100, BZ), new T.Vector3(125, -100, 0)], 0x38bdf8, 0.22);
          [-125, 125].forEach(x => lineThrough([new T.Vector3(x, hSub(x, BZ), BZ), new T.Vector3(x, -100, BZ)], 0x38bdf8, 0.14));
        }

        yield;
        // Labores en 3D: túneles de sección en bóveda, con piso, hastiales y corona
        const DH = 5.4, DW = 4.6;
        const PROF = [[-0.5, 0], [0.5, 0], [0.5, 0.55]];
        for (let a = Math.PI / 6; a < Math.PI - 0.01; a += Math.PI / 6) PROF.push([0.5 * Math.cos(a), 0.55 + 0.45 * Math.sin(a)]);
        PROF.push([-0.5, 0.55], [-0.5, 0]);
        const tunnelMat = new T.MeshStandardMaterial({ color: 0x3d6db5, emissive: 0x0a2a5a, emissiveIntensity: 0.6, transparent: true, opacity: 0.3, side: T.DoubleSide, depthWrite: false, metalness: 0, roughness: 0.8 });
        const floorMat = new T.MeshBasicMaterial({ color: 0x1b3560, transparent: true, opacity: 0.85, side: T.DoubleSide, depthWrite: false });
        const caveLamp = p => {
          const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xffe3b0, transparent: true, opacity: 0.6, blending: T.AdditiveBlending, depthWrite: false }));
          s.position.copy(p); s.scale.setScalar(3.4); world.add(s);
        };
        function tunnel(ctrl, opts) {
          const o = opts || {}, w = o.w || DW, h = o.h || DH;
          const P = ctrl.length > 2 ? new T.CatmullRomCurve3(ctrl, false, 'centripetal').getPoints(o.n || Math.max(8, Math.round(ctrl.reduce((s, p, k) => k ? s + p.distanceTo(ctrl[k - 1]) : 0, 0) / 2))) : ctrl;
          const pos = [], idx = [], fl = [], L = [[], [], []], np = PROF.length;
          P.forEach((p, k) => {
            const q = P[Math.min(P.length - 1, k + 1)], r = P[Math.max(0, k - 1)];
            const side = new T.Vector3(q.x - r.x, 0, q.z - r.z);
            if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
            side.normalize().set(-side.z, 0, side.x);
            PROF.forEach(([sx, sy]) => pos.push(p.x + side.x * sx * w, p.y + sy * h, p.z + side.z * sx * w));
            fl.push(p.x + side.x * 0.5 * w, p.y + 0.05, p.z + side.z * 0.5 * w, p.x - side.x * 0.5 * w, p.y + 0.05, p.z - side.z * 0.5 * w);
            L[0].push(new T.Vector3(p.x + side.x * 0.5 * w, p.y, p.z + side.z * 0.5 * w));
            L[1].push(new T.Vector3(p.x - side.x * 0.5 * w, p.y, p.z - side.z * 0.5 * w));
            L[2].push(new T.Vector3(p.x, p.y + h, p.z));
            if (k < P.length - 1) for (let j = 0; j < np - 1; j++) { const a = k * np + j, b = a + np; idx.push(a, b, a + 1, b, b + 1, a + 1); }
          });
          const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
          world.add(new T.Mesh(g, tunnelMat));
          const fi = [];
          for (let k = 0; k < P.length - 1; k++) { const a = k * 2; fi.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
          const fg = new T.BufferGeometry(); fg.setAttribute('position', new T.Float32BufferAttribute(fl, 3)); fg.setIndex(fi);
          world.add(new T.Mesh(fg, floorMat));
          lineThrough(L[0], 0x9fb0c8, 0.7); lineThrough(L[1], 0x9fb0c8, 0.7); lineThrough(L[2], 0x38bdf8, 0.45);
          if (o.lamps !== false) L[2].forEach((p, k) => { if (k % 9 === 4) caveLamp(p.clone().add(new T.Vector3(0, -0.6, 0))); });
          return P;
        }
        yield;
        // Chimeneas, pique y echaderos: tubos verticales
        function raise(x, z, y0, y1, r, color) {
          const m = new T.Mesh(new T.CylinderGeometry(r, r, y1 - y0, 18, 1, true), new T.MeshStandardMaterial({ color: color || 0x3d6db5, emissive: 0x0a2a5a, emissiveIntensity: 0.6, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }));
          m.position.set(x, (y0 + y1) / 2, z); world.add(m);
          [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(a => lineThrough([new T.Vector3(x + Math.cos(a) * r, y0, z + Math.sin(a) * r), new T.Vector3(x + Math.cos(a) * r, y1, z + Math.sin(a) * r)], 0x9fb0c8, 0.35));
          return m;
        }
        const V = (x, y, z) => new T.Vector3(x, y, z);

        yield;
        // Rampa en espiral: baja girando y en cada vuelta sale a un nivel
        const RC = V(-80, 0, -34), RR = 13, ZM = -10;
        const rampCtrl = [V(-50, hSub(-50, -7), -8), V(-58, -2, -18), V(-67, -12, -34)];
        for (let th = -0.35; th >= -Math.PI * 8; th -= 0.35) rampCtrl.push(V(RC.x + RR * Math.cos(th), -12 + th / (Math.PI * 2) * 18, RC.z + RR * Math.sin(th)));
        tunnel(rampCtrl, { n: 420 });
        yield;
        // Niveles: acceso desde la rampa y galería principal hacia el este
        const LV = [[-30, 114], [-48, 92], [-66, 114], [-84, 110]];
        LV.forEach(([y, xe]) => tunnel([V(RC.x + RR, y, RC.z), V(-58, y, -22), V(-48, y, ZM + 0.5), V(-36, y, ZM), V(xe, y, ZM)]));

        yield;
        // Pique con estaciones en cada nivel, echadero y bolsillo de carga
        const XS = 10, ZA = -7, ZB = -4.6, zc = -5.8, hf = hSub(XS, zc);
        raise(XS, zc, -98, hf, 3.1);
        const sump = new T.Mesh(new T.CylinderGeometry(3, 3, 2, 18), new T.MeshBasicMaterial({ color: 0x1e6fd0, transparent: true, opacity: 0.5, depthWrite: false }));
        sump.position.set(XS, -97, zc); world.add(sump);
        raise(22, -14, -90, -48, 1, 0x5b6b85);
        tunnel([V(22, -91.5, -14), V(16, -91.5, -9), V(XS + 2.6, -91.5, zc)], { w: 3.4, h: 3.6, lamps: false });
        tunnel([V(64, -91.5, -13), V(40, -91.5, -14), V(22, -91.5, -14)], { w: 3.4, h: 3.6 });
        raise(64, -13, -90, -84, 1, 0x5b6b85);
        const hopper = new T.CurvePath();
        hopper.add(new T.LineCurve3(V(64, -84, -13), V(64, -90.6, -13)));
        hopper.add(new T.LineCurve3(V(64, -90.6, -13), V(22, -90.6, -14)));
        hopper.add(new T.LineCurve3(V(22, -90.6, -14), V(XS + 1, -90.6, zc)));
        const oreDown = new T.CurvePath();
        oreDown.add(new T.LineCurve3(V(22, -48, -14), V(22, -90.6, -14)));
        oreDown.add(new T.LineCurve3(V(22, -90.6, -14), V(XS + 1, -90.6, zc)));
        [[hopper, 9, 0.05], [oreDown, 7, 0.09]].forEach(([c, n, sp]) => {
          for (let k = 0; k < n; k++) { const lump = new T.Mesh(new T.DodecahedronGeometry(0.55), ORE()); world.add(lump); movers.push({ grp: lump, curve: c, speed: sp, offset: k / n, lift: 0.4, upright: true }); }
        });
        yield;
        // Chimenea de ventilación principal
        const XR = 112, ZR = -6, gF = hSub(XR, ZR);
        raise(XR, ZR, -84, gF, 1.8);

        yield;
        // Mineral: color cálido. Relleno: gris. Vacío explotado: oscuro con contorno
        const oreMat = () => new T.MeshStandardMaterial({ color: 0xe0a43a, emissive: 0x6b3d05, emissiveIntensity: 0.5, transparent: true, opacity: 0.32, depthWrite: false, side: T.DoubleSide, roughness: 0.7 });
        const fillMat = () => new T.MeshStandardMaterial({ color: 0x7d8aa0, transparent: true, opacity: 0.72, roughness: 0.95, metalness: 0, side: T.DoubleSide });
        const voidMat = () => new T.MeshBasicMaterial({ color: 0x02050c, transparent: true, opacity: 0.5, depthWrite: false, side: T.DoubleSide });
        yield;
        // Forma natural: ondulaciones suaves para que ningún cuerpo sea un bloque perfecto
        const wob = (x, y, z) => Math.sin(x * 0.21 + y * 0.13) * Math.cos(z * 0.17 - y * 0.09) + 0.5 * Math.sin(x * 0.47 - z * 0.31 + y * 0.23);
        const tagOn = (text, x, y, z) => { const t = tag(text, x, y, z); t.visible = true; t.scale.multiplyScalar(2); };
        const ring = (pts, color, op) => lineThrough(pts.concat([pts[0]]), color, op);

        yield;
        // 1) Veta irregular: corte y relleno ascendente (rebanadas que suben, rellenando la de abajo)
        const veinAt = y => 26 - 0.3 * y;
        const vc = (y, z) => veinAt(y) + 3 + 1.8 * wob(y * 0.6, 3, z * 0.6);
        const vt = (y, z) => 6 * (0.72 + 0.3 * (0.5 + 0.5 * Math.sin(y * 0.11 + z * 0.09)));
        const vNear = y => -14 - 2.5 * (1 + Math.sin(y * 0.09));
        const vFar = y => -60 + 6 * Math.sin(y * 0.05 + 0.7);
        function veinSlab(yA, yB, zF, zN, mat, edge, eo) {
          const NI = Math.max(2, Math.ceil((yB - yA) / 2.5)), NJ = 18, pos = [], idx = [];
          const P = (i, j, s) => {
            const y = yA + (yB - yA) * i / NI, a = Math.max(zF == null ? -1e9 : zF, vFar(y)), b = Math.min(zN == null ? 1e9 : zN, vNear(y));
            const z = a + (b - a) * j / NJ;
            return [vc(y, z) + s * vt(y, z) / 2, y, z];
          };
          const at = (b, i, j) => b + i * (NJ + 1) + j;
          const grid = s => { const b = pos.length / 3; for (let i = 0; i <= NI; i++) for (let j = 0; j <= NJ; j++) pos.push(...P(i, j, s)); for (let i = 0; i < NI; i++) for (let j = 0; j < NJ; j++) { const a = at(b, i, j); idx.push(a, a + NJ + 1, a + 1, a + 1, a + NJ + 1, a + NJ + 2); } return b; };
          const b0 = grid(-1), b1 = grid(1);
          const border = [];
          for (let j = 0; j <= NJ; j++) border.push([0, j]);
          for (let i = 1; i <= NI; i++) border.push([i, NJ]);
          for (let j = NJ - 1; j >= 0; j--) border.push([NI, j]);
          for (let i = NI - 1; i >= 0; i--) border.push([i, 0]);
          for (let k = 0; k < border.length - 1; k++) { const m = at(0, ...border[k]), n = at(0, ...border[k + 1]); idx.push(b0 + m, b1 + m, b0 + n, b0 + n, b1 + m, b1 + n); }
          const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
          world.add(new T.Mesh(g, mat));
          [b0, b1].forEach(b => lineThrough(border.map(([i, j]) => { const k = (at(b, i, j)) * 3; return new T.Vector3(pos[k], pos[k + 1], pos[k + 2]); }), edge, eo));
        }
        const S0 = -84, SH = 4.6, sTop = S0 + 4 * SH, sEnd = sTop + SH, zFace = -38;
        veinSlab(-108, S0, null, null, oreMat(), 0xf3b35c, 0.45);
        for (let k = 0; k < 4; k++) veinSlab(S0 + k * SH, S0 + (k + 1) * SH, null, null, fillMat(), 0xb8c4d4, 0.35);
        veinSlab(sTop, sEnd, null, zFace, oreMat(), 0xf3b35c, 0.6);
        veinSlab(sTop, sEnd, zFace, null, voidMat(), 0x9fe2ff, 0.8);
        veinSlab(sEnd, -12, null, null, oreMat(), 0xf3b35c, 0.45);
        tunnel([V(vc(-66, ZM) - 2, -66, ZM), V(vc(sTop, -17), sTop, vNear(sTop) - 1)], { lamps: false });
        yield;
        // Echadero dentro del relleno y scoop limpiando la rebanada
        const cfX = vc(sTop, -21);
        raise(cfX, -21, S0, sTop, 0.9, 0x5b6b85);
        const s3 = scoopModel(); world.add(s3);
        movers.push({ lhd: true, grp: s3, curve: new T.CatmullRomCurve3([-34, -30, -26, -24].map(z => V(vc(sTop, z), sTop, z)), false, 'centripetal'), period: 20, offset: 0.55 });
        tagOn('CORTE Y RELLENO', vc(-104, -30), -112, vNear(-104));

        yield;
        // 2) Cuerpo masivo irregular: tajeos por subniveles dentro de la envolvente de mineral
        const BC = V(85, -56, -38), BR = V(24, 21, 23);
        const bodyR = (x, y, z) => 1 + 0.12 * wob(x * 9, y * 9, z * 9);
        const bg = new T.SphereGeometry(1, 40, 26), bp = bg.attributes.position;
        for (let i = 0; i < bp.count; i++) { const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i), k = bodyR(x, y, z); bp.setXYZ(i, BC.x + x * BR.x * k, BC.y + y * BR.y * k, BC.z + z * BR.z * k); }
        bg.computeVertexNormals();
        world.add(new T.Mesh(bg, oreMat()));
        const bodyAt = (x, y, z) => { const k = bodyR(x, y, z); return V(BC.x + x * BR.x * k, BC.y + y * BR.y * k, BC.z + z * BR.z * k); };
        for (let t = -0.75; t <= 0.76; t += 0.25) { const pts = []; for (let a = 0; a < Math.PI * 2; a += 0.15) { const r = Math.sqrt(1 - t * t); pts.push(bodyAt(Math.cos(a) * r, t, Math.sin(a) * r)); } ring(pts, 0xf3b35c, 0.4); }
        for (let a = 0; a < Math.PI; a += Math.PI / 4) { const pts = []; for (let b = 0; b < Math.PI * 2; b += 0.15) pts.push(bodyAt(Math.cos(a) * Math.sin(b), Math.cos(b), Math.sin(a) * Math.sin(b))); ring(pts, 0xf3b35c, 0.25); }
        const BSZ = 9;
        let openBottom = BC.y;
        [-10, 0, 10].forEach((dx, i) => [-10, 0, 10].forEach((dz, j) => {
          const f = 1 - ((Math.abs(dx) + BSZ / 2) / BR.x) ** 2 - ((Math.abs(dz) + BSZ / 2) / BR.z) ** 2;
          if (f <= 0.05) return;
          const hy = BR.y * Math.sqrt(f) * 0.85, x = BC.x + dx, z = BC.z + dz, g = new T.BoxGeometry(BSZ, hy * 2, BSZ);
          const m = new T.Mesh(g, i === 1 && j === 1 ? voidMat() : (i + j) % 2 === 0 ? fillMat() : new T.MeshBasicMaterial({ visible: false }));
          m.position.set(x, BC.y, z); world.add(m);
          const e = new T.LineSegments(new T.EdgesGeometry(g), i === 1 && j === 1 ? lineMat(0x9fe2ff, 0.8) : (i + j) % 2 === 0 ? lineMat(0xb8c4d4, 0.4) : new T.LineDashedMaterial({ color: 0xf3b35c, transparent: true, opacity: 0.55, dashSize: 1.2, gapSize: 0.8 }));
          e.position.copy(m.position); world.add(e); if (e.material.isLineDashedMaterial) e.computeLineDistances();
          if (i === 1 && j === 1) openBottom = BC.y - hy;
        }));
        for (let k = 0; k < 24; k++) {
          const m = new T.Mesh(new T.DodecahedronGeometry(0.85 - (k % 4) * 0.12), ORE());
          m.position.set(BC.x + ((k * 3.7) % 8) - 4, openBottom + 0.6 + Math.floor(k / 9) * 1.0, BC.z + ((k * 5.3) % 8) - 4); m.rotation.set(k, k * 2, 0); world.add(m);
        }
        yield;
        // Subnivel de perforación con abanicos de taladros en el tajeo siguiente
        const SLY = -62;
        tunnel([V(85, SLY, ZM), V(85, SLY, -54)], { lamps: false });
        tunnel([V(78, -66, ZM), V(85, SLY, -16)], { lamps: false });
        const fans = [], fz = [-45, -48.5, -52];
        fz.forEach(z => {
          const o = V(85, SLY + 2.6, z);
          for (let k = 0; k <= 8; k++) { const a = Math.PI * (0.08 + 0.84 * k / 8); fans.push(o, V(85 + Math.cos(a) * 4.2, SLY + 2.6 + Math.sin(a) * 10, z)); }
          for (let k = 0; k <= 6; k++) { const a = -Math.PI * (0.15 + 0.7 * k / 6); fans.push(o, V(85 + Math.cos(a) * 4.2, SLY + 2.6 + Math.sin(a) * 7, z)); }
        });
        const fanL = new T.LineSegments(new T.BufferGeometry().setFromPoints(fans), new T.LineDashedMaterial({ color: 0xffd28a, transparent: true, opacity: 0.85, dashSize: 1, gapSize: 0.6 }));
        fanL.computeLineDistances(); world.add(fanL);
        const ld = bolterModel(); ld.position.set(85, SLY, -41); ld.rotation.y = Math.PI; world.add(ld);
        movers.push({ bolter: true, boom: ld.userData.boom });
        yield;
        // Nivel de extracción bajo los tajeos, con su embudo y scoop
        tunnel([V(85, -84, ZM), V(85, -84, -54)]);
        [-28, -38, -48].forEach(z => tunnel([V(78, -84, z), V(92, -84, z)], { lamps: false, n: 6 }));
        const bell = new T.Mesh(new T.CylinderGeometry(4.5, 1.6, openBottom - (-84 + DH), 4, 1, true), voidMat());
        bell.position.set(85, (openBottom + (-84 + DH)) / 2, -38); bell.rotation.y = Math.PI / 4; world.add(bell);
        const s1 = scoopModel(); world.add(s1);
        movers.push({ lhd: true, grp: s1, curve: new T.CatmullRomCurve3([V(85, -84, -34), V(85, -84, -17), V(81, -84, -11), V(67.5, -84, -10.5)], false, 'centripetal'), period: 24, offset: 0 });
        tagOn('TAJEOS POR SUBNIVELES', 88, -97, -16);

        yield;
        // 3) Manto irregular: cámaras y pilares (los pilares son mineral que sostiene el techo)
        const MY = -84, MH = DH, MC = V(-22, MY, -40);
        const outline = (cx, cz, rx, rz, amp, seed) => { const p = []; for (let a = 0; a < Math.PI * 2 - 0.01; a += Math.PI / 18) { const k = 1 + amp * Math.sin(a * 3 + seed) + amp * 0.6 * Math.cos(a * 5 + seed * 2); p.push(new T.Vector2(cx + Math.cos(a) * rx * k, -(cz + Math.sin(a) * rz * k))); } return p; };
        const lensO = outline(MC.x, MC.z, 27, 22, 0.1, 1), holeO = outline(-18, -36, 18, 15, 0.08, 4);
        const lens = new T.Shape(lensO); lens.holes.push(new T.Path(holeO));
        const lg = new T.ExtrudeGeometry(lens, { depth: MH, bevelEnabled: false }); lg.rotateX(-Math.PI / 2);
        const lm = new T.Mesh(lg, oreMat()); lm.position.y = MY; world.add(lm);
        lm.add(new T.LineSegments(new T.EdgesGeometry(lg, 20), lineMat(0xf3b35c, 0.45)));
        const hg = new T.ShapeGeometry(new T.Shape(holeO)); hg.rotateX(-Math.PI / 2);
        const hm = new T.Mesh(hg, new T.MeshBasicMaterial({ color: 0x1b3560, transparent: true, opacity: 0.75, side: T.DoubleSide, depthWrite: false })); hm.position.y = MY + 0.05; world.add(hm);
        ring(holeO.map(p => V(p.x, MY + MH, -p.y)), 0x38bdf8, 0.35);
        const PG = new T.BoxGeometry(4.4, MH, 4.4);
        [-32, -23, -14, -5].forEach(x => [-24, -33, -42, -51].forEach(z => {
          if (((x + 18) / 18) ** 2 + ((z + 36) / 15) ** 2 > 0.72) return;
          const m = new T.Mesh(PG, oreMat()); m.position.set(x, MY + MH / 2, z); world.add(m);
          m.add(new T.LineSegments(new T.EdgesGeometry(PG), lineMat(0xf3b35c, 0.6)));
        }));
        for (let x = -30; x <= -6; x += 12) caveLamp(V(x, MY + MH - 0.6, -37));
        tunnel([V(-9.5, MY, ZM), V(-9.5, MY, -21)], { lamps: false });
        const s2 = scoopModel(); world.add(s2);
        movers.push({ lhd: true, grp: s2, curve: new T.CatmullRomCurve3([V(-9.5, MY, -44), V(-9.5, MY, -20), V(-4, MY, -11), V(6, MY, -10.2), V(18.8, MY, -10.2)], false, 'centripetal'), period: 30, offset: 0.4 });
        const mj = jumboModel(); mj.position.set(-18.5, MY, -45); mj.rotation.y = Math.PI; world.add(mj);
        movers.push({ jumbo: true, feeds: mj.userData.feeds, dust: mj.userData.dust });
        tagOn('CÁMARAS Y PILARES', -22, MY + 11, -66);

        yield;
        // Mangas de ventilación: ventilador auxiliar en la galería y ducto colgado del techo hasta el frente ciego
        const mangaMat = solid(0xf2c14e, { metalness: 0, roughness: 0.7, emissive: 0x5a3c00, emissiveIntensity: 0.35 });
        function manga(pts) {
          const c = new T.CatmullRomCurve3(pts, false, 'centripetal');
          world.add(new T.Mesh(new T.TubeGeometry(c, Math.max(12, pts.length * 10), 0.42, 8, false), mangaMat));
          const f = part(world, new T.CylinderGeometry(0.75, 0.75, 1.8, 14), DARK(), 0, 0, 0, 0.5);
          f.position.copy(pts[0]); f.quaternion.setFromUnitVectors(UP, pts[1].clone().sub(pts[0]).normalize());
          for (let k = 0; k < 4; k++) {
            const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xfff1c9, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false }));
            s.scale.setScalar(1.1); world.add(s);
            movers.push({ grp: s, curve: c, speed: 0.12, offset: k / 4, lift: 0, upright: true });
          }
        }
        const crown = (x, y, z) => V(x, y + DH - 0.75, z);
        manga([crown(60, -48, ZM + 1.4), crown(75, -48, ZM + 1.4), crown(89, -48, ZM + 1.4)]);
        manga([crown(-2, MY, ZM + 1.2), crown(-8, MY, ZM + 1.2), crown(-11, MY, -18), crown(-17, MY, -30), crown(-18.5, MY, -38)]);
        manga([crown(vc(-66, ZM) - 6, -66, ZM + 1.3), crown(vc(-66, ZM) - 2, -66, ZM + 1.3), crown(vc(sTop, -17), sTop, -18), crown(vc(sTop, -26), sTop, -26), crown(vc(sTop, -32), sTop, -32)]);
        manga([crown(85, SLY, -16), crown(85, SLY, -30), crown(85, SLY, -38)]);

        yield;
        // Líneas cauville: locomotora con carros mineros entre la tolva del cuerpo masivo y el echadero
        const RLY = -48;
        const rails = [], sleepers = [];
        [-0.5, 0.5].forEach(dz => rails.push(V(18, RLY + 0.18, ZM + dz), V(80, RLY + 0.18, ZM + dz)));
        for (let x = 18; x <= 80; x += 1.3) sleepers.push(V(x, RLY + 0.08, ZM - 0.8), V(x, RLY + 0.08, ZM + 0.8));
        world.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(rails), lineMat(0xe6ecf5, 0.85)));
        world.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(sleepers), lineMat(0x9fb0c8, 0.4)));
        lineThrough([V(18, RLY + DH - 0.25, ZM - 0.9), V(80, RLY + DH - 0.25, ZM - 0.9)], 0xf3b35c, 0.6);
        raise(70, -13.5, RLY + DH, BC.y + 6, 0.9, 0x5b6b85);
        part(world, new T.BoxGeometry(1.8, 1.2, 1.6), DARK(), 70, RLY + DH - 0.9, -12, 0.5);
        const loco = locoModel(); world.add(loco);
        const cars = [0, 1, 2, 3].map(() => { const c = carModel(); world.add(c); return c; });
        movers.push({ train: true, loco, cars, xW: 25, xE: 62, y: RLY, z: ZM, period: 34 });

        yield;
        // Labores de servicio: taller de mantenimiento, bombeo, refugio y polvorín dentro mina
        tunnel([V(-44, -84, ZM), V(-44, -84, -1.5)], { w: 7, h: 6.4, n: 6 });
        const ws = scoopModel(); ws.position.set(-46, -84, -4.5); ws.userData.load.visible = false; world.add(ws);
        const wt = lowTruckModel(); wt.position.set(-41.6, -84, -5); wt.userData.load.visible = false; world.add(wt);
        caveLamp(V(-44, -84 + 5.6, -3)); caveLamp(V(-44, -84 + 5.6, -7));
        tunnel([V(3, -84, ZM), V(3, -84, -2)], { w: 5, h: 5, n: 5, lamps: false });
        const pumpM = solid(0x1e6fd0, { metalness: 0.5, roughness: 0.4 });
        [-0.9, 0.9].forEach(dx => part(world, new T.CylinderGeometry(0.6, 0.6, 1.8, 12), pumpM, 3 + dx, -84 + 0.9, -4, 0.4));
        lineThrough([V(3, -84 + 1.8, -4), V(3, -84 + 4.6, -6.5), V(XS - 2.4, -84 + 4.6, zc + 1.5), V(XS - 2.4, hf, zc + 1.5)], 0x5fb4ff, 0.75);
        tunnel([V(-42, -30, ZM), V(-42, -30, -21)], { w: 4.6, n: 5, lamps: false });
        part(world, new T.BoxGeometry(3.2, 2.6, 5), solid(0x2f9e6a, { metalness: 0.4, roughness: 0.5 }), -42, -30 + 1.3, -18, 0.6);
        const refugeL = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0x5fe39a, transparent: true, opacity: 0.85, blending: T.AdditiveBlending, depthWrite: false }));
        refugeL.position.set(-42, -30 + 3.4, -15.2); refugeL.scale.setScalar(2.4); world.add(refugeL);
        tunnel([V(-40, -48, ZM), V(-40, -48, -20), V(-33, -48, -26)], { w: 3.8, h: 4.4, lamps: false });
        part(world, new T.BoxGeometry(3.8, 4.2, 0.2), solid(0x8d9bb0), -40, -48 + 2.1, -14, 0.6);
        [[-35.5, -24.5], [-33.5, -26], [-35, -26.8]].forEach(([x, z]) => part(world, new T.BoxGeometry(1.1, 0.9, 1.1), solid(0xd97706), x, -48 + 0.45, z, 0.5));
        const magL = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xf3b35c, transparent: true, opacity: 0.8, blending: T.AdditiveBlending, depthWrite: false }));
        magL.position.set(-34, -48 + 3.6, -25); magL.scale.setScalar(2.4); world.add(magL);

        yield;
        // Desarrollo, sostenimiento y control geomecánico en las galerías
        const jb = jumboModel(); jb.position.set(92 - 6.4, -48, ZM); jb.rotation.y = Math.PI / 2; world.add(jb);
        movers.push({ jumbo: true, feeds: jb.userData.feeds, dust: jb.userData.dust });
        const bt = bolterModel(); bt.position.set(-20, -30, ZM); bt.rotation.y = -Math.PI / 2; world.add(bt);
        movers.push({ bolter: true, boom: bt.userData.boom });
        const bolts = [];
        for (let x = -36; x <= -24; x += 2) [-1.6, 0, 1.6].forEach(dz => bolts.push(V(x, -30 + DH * (dz ? 0.8 : 1), ZM + dz), V(x, -30 + DH * (dz ? 0.8 : 1) + 2, ZM + dz * 1.5)));
        world.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(bolts), lineMat(0xd8dee8, 0.6)));
        [-18, -14, -10].forEach((x, k) => {
          lineThrough([V(x, -48 + DH, ZM), V(x - 1 + k, -48 + DH + 7, ZM - 1)], 0x9fe2ff, 0.7, true);
          const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0x38bdf8, transparent: true, opacity: 0.9, blending: T.AdditiveBlending, depthWrite: false }));
          s.position.set(x, -48 + DH - 0.3, ZM); s.scale.setScalar(1.6); world.add(s);
        });
        part(world, new T.BoxGeometry(2.6, 1.8, 1.8), MINE_Y(), 106, -84 + 0.9, ZM, 0.5);
        [[94, -114, -20], [102, -118, -30], [108, -116, -12]].forEach(([x, y, z]) => lineThrough([V(106, -84, ZM), V(x, y, z)], 0x9fe2ff, 0.55, true));

        yield;
        // Acarreo con volquetes: cargan bajo la tolva del nivel -66, suben por la rampa, salen por la bocamina
        // y llevan el mineral por la vía hasta la cancha de la planta. La rampa es de un carril: los que bajan
        // vacíos esperan en las bahías para dejar pasar a los que suben cargados.
        raise(-30, -12.4, -66 + DH, -48, 0.9, 0x5b6b85);
        part(world, new T.BoxGeometry(2, 1.3, 1.4), DARK(), -30, -66 + DH - 1, -11.6, 0.5);
        const chuteDown = new T.LineCurve3(V(-30, -48, -12.4), V(-30, -66 + DH - 1.4, -12.4));
        for (let k = 0; k < 3; k++) { const lump = new T.Mesh(new T.DodecahedronGeometry(0.5), ORE()); world.add(lump); movers.push({ grp: lump, curve: chuteDown, speed: 0.35, offset: k / 3, lift: 0, upright: true }); }
        let kTop = rampCtrl.length - 1;
        while (kTop > 0 && rampCtrl[kTop].y < -66 + 0.01) kTop--;
        const under = new T.CatmullRomCurve3([V(-30, -66, ZM), V(-40, -66, ZM), V(-48, -66, -9.5), V(-58, -66, -22), V(RC.x + RR, -66, RC.z)].concat(rampCtrl.slice(0, kTop + 1).reverse()), false, 'centripetal').getPoints(700);
        const surf = roadPath(hSub, [[-50, -8], [-45, -5], [-42, -20], [-20, -22], [0, -18], [24, -16], [38, -16], [46, -23]]);
        const routePts = under.concat(surf.slice(1).map(p => p.clone().setY(p.y + 0.05)));
        const cum = [0];
        for (let k = 1; k < routePts.length; k++) cum.push(cum[k - 1] + routePts[k].distanceTo(routePts[k - 1]));
        let Lu = 0;
        for (let k = 1; k < under.length; k++) Lu += under[k].distanceTo(under[k - 1]);
        const route = { pts: routePts, cum, L: cum[cum.length - 1], Lu };
        const sampleRoute = (s, pos, dir) => {
          let lo = 0, hi = cum.length - 1;
          s = Math.min(route.L, Math.max(0, s));
          while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (cum[mid] <= s) lo = mid; else hi = mid; }
          const f = (s - cum[lo]) / Math.max(1e-6, cum[hi] - cum[lo]);
          pos.copy(routePts[lo]).lerp(routePts[hi], f);
          if (dir) dir.copy(routePts[hi]).sub(routePts[lo]).normalize();
        };
        route.sample = sampleRoute;
        yield;
        // Bahías de cruce a lo largo de la rampa, hacia el lado exterior de la espiral
        const bays = [], bp0 = new T.Vector3(), bd0 = new T.Vector3();
        for (let s = 70; s < Lu - 25; s += 52) bays.push(s);
        route.bays = bays;
        route.outward = (pos, dir, out) => {
          out.set(-dir.z, 0, dir.x).normalize();
          if (out.x * (pos.x - RC.x) + out.z * (pos.z - RC.z) < 0) out.negate();
          return out;
        };
        bays.forEach(s => {
          const a = new T.Vector3(), b = new T.Vector3(), o = new T.Vector3();
          sampleRoute(s - 8, a); sampleRoute(s + 8, b); sampleRoute(s, bp0, bd0); route.outward(bp0, bd0, o);
          tunnel([a, bp0.clone().addScaledVector(o, 3), b], { w: 4.6, n: 14, lamps: false });
          caveLamp(bp0.clone().addScaledVector(o, 3).add(V(0, DH - 0.6, 0)));
        });
        const trucks = [0, 1, 2].map(k => {
          const g = lowTruckModel(); world.add(g);
          return { grp: g, s: [0, Lu * 0.45, Lu + 60][k], dir: [-1, 1, -1][k], st: k === 0 ? 'load' : 'move', t: 2, off: 0 };
        });
        movers.push({ haul: true, trucks, route });

        yield;
        // Izaje: castillo reticulado, poleas, dos skips que se cruzan, cables al winche y tolva de mineral
        const HF = 27, RS = 1.7;
        const lat = [], hw = 3.2, tw = 1.9;
        const corner = (sx, sz, y) => { const w = hw + (tw - hw) * y / HF; return new T.Vector3(XS + RS / 2 + sx * w, hf + y, zc + sz * w); };
        const C4 = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
        C4.forEach(([sx, sz]) => lat.push(corner(sx, sz, 0), corner(sx, sz, HF)));
        for (let y = 0; y < HF - 0.1; y += 4.5) {
          C4.forEach(([sx, sz], i) => {
            const [nx, nz] = C4[(i + 1) % 4], y2 = Math.min(HF, y + 4.5);
            lat.push(corner(sx, sz, y2), corner(nx, nz, y2), corner(sx, sz, y), corner(nx, nz, y2), corner(nx, nz, y), corner(sx, sz, y2));
          });
        }
        [-1, 1].forEach(sz => lat.push(corner(1, sz, HF), new T.Vector3(XS + 17, hf, zc + sz * 3), corner(1, sz, HF * 0.55), new T.Vector3(XS + 17, hf, zc + sz * 3)));
        world.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(lat), lineMat(0xe6ecf5, 0.75)));
        part(world, new T.BoxGeometry(5, 0.4, 5), DARK(), XS + RS / 2, hf + HF, zc, 0.6);
        const steel = solid(0xe6ecf5, { metalness: 0.7, roughness: 0.3 });
        const yS = hf + HF + 1.9;
        [ZA, ZB].forEach(z => {
          const w = new T.Mesh(new T.TorusGeometry(RS, 0.2, 8, 28), steel); w.position.set(XS + RS, yS, z); world.add(w);
          const spokes = [];
          for (let a = 0; a < Math.PI; a += Math.PI / 3) spokes.push(new T.Vector3(XS + RS + Math.cos(a) * RS, yS + Math.sin(a) * RS, z), new T.Vector3(XS + RS - Math.cos(a) * RS, yS - Math.sin(a) * RS, z));
          world.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(spokes), lineMat(0xe6ecf5, 0.7)));
          lineThrough([new T.Vector3(XS + RS, yS + RS, z), new T.Vector3(XS + 24, hf + 4.6, -5 + (z - zc) * 0.4)], 0xe6ecf5, 0.6);
        });
        shed(XS + 28, hSub(XS + 28, -5), -5, 9, 6, 7, 0, 0x223558);
        addLamp(new T.Vector3(XS + 28, hSub(XS + 28, -5) + 8.5, -1.4), 4);
        const yTop = hf + 13, yBot = -92;
        const skips = [ZA, ZB].map(z => { const s = skipModel(); s.position.set(XS, yTop, z); world.add(s); return s; });
        const ropes = [ZA, ZB].map(z => lineThrough([new T.Vector3(XS, yS, z), new T.Vector3(XS, yTop + 4.1, z)], 0xe6ecf5, 0.8));
        const XB = XS + 7;
        part(world, new T.BoxGeometry(3.6, 3.6, 3.6), DARK(), XB, hf + 11, zc, 0.6);
        const binCone = part(world, new T.ConeGeometry(2.3, 2.2, 4), DARK(), XB, hf + 8.1, zc, 0.5);
        binCone.rotation.set(Math.PI, Math.PI / 4, 0);
        [[-1.6, -1.6], [1.6, -1.6], [1.6, 1.6], [-1.6, 1.6]].forEach(([dx, dz]) => lineThrough([new T.Vector3(XB + dx, hf, zc + dz), new T.Vector3(XB + dx, hf + 9.2, zc + dz)], 0x9fb0c8, 0.7));
        const chute = [new T.Vector3(XS + 1.2, yTop + 2.6, zc), new T.Vector3(XB - 0.5, hf + 12.6, zc)];
        lineThrough(chute, 0x9fb0c8, 0.6);
        const fall = [0, 1, 2].map(() => { const m = new T.Mesh(new T.DodecahedronGeometry(0.45), ORE()); m.visible = false; world.add(m); return m; });
        movers.push({ hoist: true, skips, ropes, yTop, yBot, chute, fall });
        addLamp(new T.Vector3(XS + RS, yS + RS + 0.6, zc), 3.4);

        yield;
        // Faja de la tolva a la cancha de mineral grueso y de allí al molino
        const SP = new T.Vector3(54, 0, -31); SP.y = hSub(SP.x, SP.z);
        conveyor([[XB, hf + 7.4, zc], [XB + 3, hf + 7.4, -12], [SP.x - 2, SP.y + 11, SP.z + 1]], 5);
        const pile = new T.Mesh(new T.ConeGeometry(7, 8, 18), ORE()); pile.position.set(SP.x, SP.y + 4, SP.z); world.add(pile);
        conveyor([[SP.x + 5, SP.y + 1.2, SP.z - 3], [64, hSub(64, -38) + 10, -38]], 5);

        yield;
        // Planta concentradora: molienda, flotación, espesadores y relave
        shed(70, hSub(70, -40), -40, 12, 9, 10, 0, 0x223558);
        shed(86, hSub(86, -44), -44, 10, 6, 9, 0);
        disc(64, hSub(64, -56), -56, 5); disc(80, hSub(80, -58), -58, 4);
        lineThrough(onTerrain(hSub, [[84, -62], [96, -84], [110, -110], [128, -140]], 0.6), 0x9fb0c8, 0.5, true);
        yield;
        // Ventilación principal: ventilador sobre la chimenea, girando y expulsando el aire viciado
        part(world, new T.BoxGeometry(4, 2.4, 4), DARK(), XR, gF + 1.2, ZR, 0.5);
        part(world, new T.CylinderGeometry(1.1, 1.1, 3, 12), DARK(), XR, gF + 3.6, ZR, 0.4);
        const housing = part(world, new T.CylinderGeometry(2.2, 2.2, 3, 24, 1, true), solid(0x2a3f66, { side: T.DoubleSide }), XR, gF + 6, ZR + 2, 0.5);
        housing.rotation.x = Math.PI / 2;
        const blades = new T.Group(); blades.position.set(XR, gF + 6, ZR + 3.2); world.add(blades);
        for (let k = 0; k < 6; k++) { const b = part(blades, new T.BoxGeometry(0.5, 1.9, 0.08), steel, 0, 0, 0, 0.4); b.position.set(Math.cos(k * Math.PI / 3) * 1.05, Math.sin(k * Math.PI / 3) * 1.05, 0); b.rotation.z = k * Math.PI / 3 - Math.PI / 2; }
        part(blades, new T.CylinderGeometry(0.45, 0.45, 0.4, 12), steel, 0, 0, 0, 0.4).rotation.x = Math.PI / 2;
        movers.push({ rot: 5, grp: blades });
        shed(XR + 9, gF, -6, 7, 4, 6, 0);
        const airPath = new T.CurvePath();
        airPath.add(new T.LineCurve3(new T.Vector3(XR, -82, ZR), new T.Vector3(XR, gF + 6, ZR)));
        airPath.add(new T.LineCurve3(new T.Vector3(XR, gF + 6, ZR), new T.Vector3(XR, gF + 6, ZR + 3.4)));
        airPath.add(new T.LineCurve3(new T.Vector3(XR, gF + 6, ZR + 3.4), new T.Vector3(XR, gF + 9, ZR + 16)));
        for (let k = 0; k < 12; k++) {
          const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0x9fe2ff, transparent: true, opacity: 0.6, blending: T.AdditiveBlending, depthWrite: false }));
          s.scale.setScalar(1.8); world.add(s);
          movers.push({ grp: s, curve: airPath, speed: 0.07, offset: k / 12, lift: 0, upright: true });
        }

        yield;
        // Bocamina: portal de concreto donde la rampa sale a superficie
        const gP = hSub(-50, -7);
        const ps = new T.Shape([new T.Vector2(-3.9, 0), new T.Vector2(3.9, 0), new T.Vector2(3.9, 7), new T.Vector2(-3.9, 7)]);
        const hole = new T.Path(); hole.moveTo(-2.5, 0); hole.lineTo(2.5, 0); hole.lineTo(2.5, 3.4); hole.absarc(0, 3.4, 2.5, 0, Math.PI, false); hole.lineTo(-2.5, 0);
        ps.holes.push(hole);
        const pg = new T.ExtrudeGeometry(ps, { depth: 1.6, bevelEnabled: false });
        const portal = part(world, pg, solid(0x8d9bb0, { roughness: 0.8, metalness: 0.1 }), -50, gP, -8, 0.6);
        portal.rotation.y = Math.atan2(8, 10) + Math.PI;
        addLamp(new T.Vector3(-49, gP + 7.6, -7), 4.5);

        yield;
        // Superficie: taller, almacén, oficinas y campamento en la ladera, unidos por vías
        shed(-30, hSub(-30, -6), -6, 12, 6, 9, 0);
        shed(-8, hSub(-8, -40), -40, 10, 5, 8, 0, 0x2a3f66);
        const gC = hSub(-82, -46);
        offices(-76, gC, -42, 8, 6, 3, 0.1);
        [[-90, -44], [-90, -52], [-80, -54]].forEach(([x, z]) => shed(x, gC, z, 8, 3, 4, 0, 0x2a3f66));
        const main = roadPath(hSub, [[-46, -4], [-42, -20], [-20, -22], [0, -18], [24, -16], [50, -14], [90, -14], [108, -14]]);
        const toWare = roadPath(hSub, [[-8, -20], [-8, -32]]);
        const toPlant = roadPath(hSub, [[70, -14], [70, -27]]);
        const toCamp = roadPath(hSub, [[-42, -20], [-56, -30], [-66, -38], [-72, -42]]);
        const joints = [new T.Vector3(-42, 0, -20), new T.Vector3(-8, 0, -20), new T.Vector3(70, 0, -14)];
        const toPile = roadPath(hSub, [[40, -15], [46, -23]]);
        joints.push(new T.Vector3(40, 0, -15));
        [main, toWare, toPlant, toCamp, toPile].forEach((p, k) => roadway(hSub, null, k ? 2.4 : 3, p, joints));
        [[-46, -14], [-24, -27], [4, -23], [30, -21], [56, -19], [84, -19], [62, -27], [90, -32], [-60, -28], [-72, -34], [-14, -33]].forEach(([x, z]) => lampPost(x, z));

        return {
          at: (u, v) => {
            const x = (u - 0.5) * 200;
            if (v <= 0.19) return new T.Vector3(x, hSub(x, -6), -6);
            return new T.Vector3(x, -(v - 0.18) / 0.8 * 95, 4);
          },
          anchors: {
            'Operaciones': new T.Vector3(85, -84 + 3.6, -24),
            'Servicios mina': new T.Vector3(3, -84 + 3.6, -3),
            'Mantenimiento': new T.Vector3(-44, -84 + 4.4, -3),
            'Logística': new T.Vector3(-8, hSub(-8, -40) + 7, -40),
            'Geomecánica': new T.Vector3(-14, -48 + DH, ZM),
            'Geología': new T.Vector3(vc(-36, vNear(-36)), -36, vNear(-36)),
            'Seguridad': new T.Vector3(-42, -30 + 3.4, -17),
            'Ventilación': new T.Vector3(XR, gF + 8.4, ZR + 2),
            'Planta': new T.Vector3(70, hSub(70, -40) + 12, -40),
            'Recursos humanos': new T.Vector3(-76, gC + 9, -42)
          },
          core: new T.Vector3(-26, 50, -10), target: new T.Vector3(-4, -40, -24), elev: [0.18, 0.36], az: [-0.5, -0.2], dist: 350
        };
      }

      const labelAt = new T.Vector3(), labelDrop = new T.Vector3(0, -15, 0);
      intro.classList.add('is-3d');

      // Reflejo metálico para el logo: cielo claro arriba, azul al centro, noche abajo
      const chromeEnv = (() => {
        const c = document.createElement("canvas"); c.width = 512; c.height = 256;
        const g = c.getContext("2d");
        const gr = g.createLinearGradient(0, 0, 0, 256);
        gr.addColorStop(0, "#ffffff"); gr.addColorStop(0.42, "#a9c2e0"); gr.addColorStop(0.52, "#1b4f9c"); gr.addColorStop(1, "#020812");
        g.fillStyle = gr; g.fillRect(0, 0, 512, 256);
        g.fillStyle = "rgba(255,255,255,0.95)"; g.fillRect(40, 50, 110, 26); g.fillRect(300, 70, 150, 18);
        g.fillStyle = "rgba(56,189,248,0.9)"; g.fillRect(180, 140, 160, 10);
        const tex = new T.CanvasTexture(c);
        tex.mapping = T.EquirectangularReflectionMapping;
        const pm = new T.PMREMGenerator(renderer);
        const env = pm.fromEquirectangular(tex).texture;
        pm.dispose(); tex.dispose();
        return env;
      })();

      // Cielo: sol, luna creciente y estrellas (fuera de la neblina para que se vean a lo lejos)
      const sunSprite = new T.Sprite(new T.SpriteMaterial({ map: (() => {
        const c = document.createElement("canvas"); c.width = c.height = 256;
        const g = c.getContext("2d"), rg = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        rg.addColorStop(0, "rgba(255,248,225,1)"); rg.addColorStop(0.18, "rgba(255,226,160,1)"); rg.addColorStop(0.3, "rgba(255,190,110,0.45)"); rg.addColorStop(1, "rgba(255,170,90,0)");
        g.fillStyle = rg; g.fillRect(0, 0, 256, 256);
        return new T.CanvasTexture(c);
      })(), transparent: true, depthWrite: false, depthTest: false, fog: false, blending: T.AdditiveBlending }));
      sunSprite.scale.setScalar(110); sunSprite.renderOrder = 10;
      const moon = new T.Sprite(new T.SpriteMaterial({ map: (() => {
        const c = document.createElement("canvas"); c.width = c.height = 256;
        const g = c.getContext("2d");
        const rg = g.createRadialGradient(128, 128, 30, 128, 128, 128);
        rg.addColorStop(0, "rgba(200,225,255,0.35)"); rg.addColorStop(1, "rgba(200,225,255,0)");
        g.fillStyle = rg; g.fillRect(0, 0, 256, 256);
        g.fillStyle = "#e8f0ff"; g.beginPath(); g.arc(128, 128, 44, 0, Math.PI * 2); g.fill();
        g.globalCompositeOperation = "destination-out"; g.beginPath(); g.arc(150, 116, 40, 0, Math.PI * 2); g.fill();
        return new T.CanvasTexture(c);
      })(), transparent: true, depthWrite: false, depthTest: false, fog: false }));
      moon.scale.setScalar(64); moon.renderOrder = 10;
      const starGeo = new T.BufferGeometry(), starPos = [];
      for (let k = 0; k < 500; k++) {
        const a = Math.random() * Math.PI * 2, el = 0.08 + Math.random() * 0.9;
        starPos.push(Math.cos(a) * Math.cos(el) * 900, Math.sin(el) * 900, Math.sin(a) * Math.cos(el) * 900);
      }
      starGeo.setAttribute("position", new T.Float32BufferAttribute(starPos, 3));
      const stars = new T.Points(starGeo, new T.PointsMaterial({ color: 0xdfeaff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false }));
      scene.add(stars);
      // Colores por hora: [hora, cielo alto, horizonte, luz del sol]
      const SKY = [
        [0, 0x020812, 0x07122a, 0x5d7fb8], [5, 0x030a18, 0x0e1c3c, 0x6b86c0], [6, 0x0c1a3c, 0x7a4a52, 0xffb27a],
        [7, 0x14305e, 0xb0745a, 0xffd2a6], [9, 0x18386a, 0x3f6a9e, 0xfff4e4], [12, 0x1b3f74, 0x4f7cb0, 0xffffff],
        [16, 0x1a3a6c, 0x4a72a6, 0xfff1dc], [18, 0x172c58, 0xb06a52, 0xffa874], [19, 0x0e1a3c, 0x5a3456, 0xd88a7a],
        [20.5, 0x050c20, 0x121c3c, 0x6d86bd], [24, 0x020812, 0x07122a, 0x5d7fb8]
      ];
      const skyTop = new T.Color(), tmpC = new T.Color();

      // Estrella de cuatro puntas del centro del emblema
      const starTex = (() => {
        const c = document.createElement("canvas"); c.width = c.height = 128;
        const g = c.getContext("2d");
        const rg = g.createRadialGradient(64, 64, 0, 64, 64, 22);
        rg.addColorStop(0, "rgba(255,255,255,1)"); rg.addColorStop(1, "rgba(120,200,255,0)");
        g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
        g.fillStyle = "rgba(220,240,255,0.95)";
        g.beginPath();
        g.moveTo(64, 2); g.quadraticCurveTo(68, 60, 126, 64); g.quadraticCurveTo(68, 68, 64, 126); g.quadraticCurveTo(60, 68, 2, 64); g.quadraticCurveTo(60, 60, 64, 2);
        g.fill();
        return new T.CanvasTexture(c);
      })();

      // Imagen de la torre de control para el círculo del núcleo
      const towerTex = (() => {
        const c = document.createElement("canvas"); c.width = c.height = 512;
        const g = c.getContext("2d");
        const bgG = g.createRadialGradient(256, 220, 20, 256, 256, 256);
        bgG.addColorStop(0, "#0b2a5b"); bgG.addColorStop(1, "#020812");
        g.fillStyle = bgG; g.fillRect(0, 0, 512, 512);
        g.strokeStyle = "rgba(56,189,248,0.12)"; g.lineWidth = 1;
        for (let x = 0; x < 512; x += 32) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); g.beginPath(); g.moveTo(0, x); g.lineTo(512, x); g.stroke(); }
        g.strokeStyle = "rgba(56,189,248,0.45)"; g.lineWidth = 3;
        [[60, 452], [100, 430], [140, 410]].forEach(([w, y]) => { g.beginPath(); g.ellipse(256, y + 20, 200 - w, 18, 0, Math.PI, 0); g.stroke(); });
        g.lineJoin = "round"; g.lineCap = "round";
        g.fillStyle = "#16294d"; g.strokeStyle = "#e6ecf5"; g.lineWidth = 9;
        g.beginPath(); g.moveTo(222, 420); g.lineTo(236, 250); g.lineTo(276, 250); g.lineTo(290, 420); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(176, 250); g.lineTo(336, 250); g.lineTo(352, 186); g.lineTo(160, 186); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = "#38bdf8";
        for (let k = 0; k < 5; k++) { g.beginPath(); const x0 = 178 + k * 32; g.moveTo(x0, 196); g.lineTo(x0 + 24, 196); g.lineTo(x0 + 22, 238); g.lineTo(x0 + 4, 238); g.closePath(); g.fill(); }
        g.fillStyle = "#16294d";
        g.beginPath(); g.moveTo(170, 186); g.lineTo(342, 186); g.lineTo(300, 160); g.lineTo(212, 160); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(256, 160); g.lineTo(256, 108); g.stroke();
        g.fillStyle = "#38bdf8"; g.beginPath(); g.arc(256, 102, 9, 0, Math.PI * 2); g.fill();
        g.strokeStyle = "#e6ecf5"; g.lineWidth = 7;
        g.beginPath(); g.moveTo(150, 420); g.lineTo(362, 420); g.stroke();
        g.strokeStyle = "rgba(230,236,245,0.5)"; g.lineWidth = 4;
        [[236, 300], [240, 350], [244, 395]].forEach(([x, y]) => { g.beginPath(); g.moveTo(x, y); g.lineTo(512 - x, y); g.stroke(); });
        return new T.CanvasTexture(c);
      })();

      // Halo suave del núcleo, dibujado una vez
      const glowTex = (() => {
        const c = document.createElement('canvas'); c.width = c.height = 128;
        const g = c.getContext('2d'), rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
        rg.addColorStop(0, 'rgba(56,189,248,0.9)'); rg.addColorStop(0.35, 'rgba(0,122,255,0.35)'); rg.addColorStop(1, 'rgba(0,122,255,0)');
        g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
        return new T.CanvasTexture(c);
      })();

      // Ruta del dato: sube en vertical desde el área y entra en línea recta al núcleo
      function dataPath(top, coreP) {
        const lane = coreP.y;
        const dir = new T.Vector3(coreP.x - top.x, 0, coreP.z - top.z);
        const dist = dir.length(); dir.normalize();
        const R = Math.min(7, dist / 3);
        const bend = new T.Vector3(top.x, lane, top.z);
        const a = bend.clone().add(new T.Vector3(0, -R, 0));
        const b = bend.clone().add(dir.clone().multiplyScalar(R));
        const end = coreP.clone().sub(dir.clone().multiplyScalar(8.5));
        const path = new T.CurvePath();
        path.add(new T.LineCurve3(top.clone(), a));
        path.add(new T.QuadraticBezierCurve3(a, bend, b));
        path.add(new T.LineCurve3(b, end));
        return path;
      }

      /* Construcción por partes: corre tras el primer pintado y cede el control al navegador entre partes.
         Mientras construye no se dibuja (el lienzo conserva su último cuadro); si llega otra mina, la construcción
         a medias se abandona y la nueva empieza liberando lo que alcanzó a armar */
      let job = 0, building = false, firstBuild = true, ownTex = [];
      const tick = (() => { const ch = new MessageChannel(), q = []; ch.port1.onmessage = () => q.shift()(); return f => { q.push(f); ch.port2.postMessage(0); }; })();
      function build(id, done) {
        const my = ++job, it = steps(id);
        building = true;
        const slice = () => {
          if (my !== job) return;
          const t0 = performance.now();
          let r;
          do r = it.next(); while (!r.done && performance.now() - t0 < 40);
          if (my !== job) return;
          if (!r.done) { tick(slice); return; }
          building = false;
          if (done) done();
        };
        // La primera vez se cede una vuelta más antes de empezar, para que el navegador pinte la página primero
        // (sin requestAnimationFrame ni setTimeout: un reloj detenido los congela y la escena no aparecería)
        if (firstBuild) { firstBuild = false; tick(() => tick(slice)); } else tick(slice);
      }
      function* steps(id) {
        if (world) { scene.remove(world); world.traverse(o => { if (o.geometry) o.geometry.dispose(); [].concat(o.material || []).forEach(m => m.dispose()); if (o.isInstancedMesh) o.dispose(); }); }
        // Texturas propias de cada mina (etiquetas y haz del disparo): se liberan con ella
        ownTex.forEach(t => t.dispose()); ownTex = [];
        world = new T.Group();
        scene.add(world);
        movers = []; flashes = []; terrainMats = []; nightLights = []; windows = [];
        cfg = yield* (id === 'tajo' ? buildTajo() : buildSub());
        waveStart = -1; wasLit = false; litAmount = 0;
        // Núcleo AgentraX: el emblema modelado en 3D (cinta de tres puntas, estrella al centro y esferas)
        core = new T.Group();
        core.position.copy(cfg.core);
        const halo = new T.Sprite(new T.SpriteMaterial({ map: glowTex, transparent: true, opacity: 0.25, blending: T.AdditiveBlending, depthWrite: false }));
        halo.scale.setScalar(30);
        const emblem = new T.Group();
        // Súper agente de IA: una esfera de red neuronal (neuronas, sinapsis e impulsos) con un núcleo de energía
        const R = 8, NN = 110, nodesPos = [];
        for (let k = 0; k < NN; k++) {
          const y = 1 - (k / (NN - 1)) * 2, rad = Math.sqrt(1 - y * y), th = k * 2.399963;
          const jitter = 0.86 + 0.14 * ((k * 7919) % 13) / 13;
          nodesPos.push(new T.Vector3(Math.cos(th) * rad * R * jitter, y * R * jitter, Math.sin(th) * rad * R * jitter));
        }
        const edges = [];
        nodesPos.forEach((p, i) => {
          nodesPos.map((q, j) => [j, p.distanceToSquared(q)]).filter(([j]) => j > i).sort((a, b) => a[1] - b[1]).slice(0, 3)
            .forEach(([j]) => edges.push([i, j]));
        });
        for (let k = 0; k < 18; k++) edges.push([(k * 37) % NN, (k * 53 + 11) % NN]);
        const net = new T.Group();
        const synGeo = new T.BufferGeometry().setFromPoints(edges.flatMap(([i, j]) => [nodesPos[i], nodesPos[j]]));
        const synMat = new T.LineBasicMaterial({ color: 0x5fc8ff, transparent: true, opacity: 0.3, blending: T.AdditiveBlending, depthWrite: false });
        net.add(new T.LineSegments(synGeo, synMat));
        const neuronMat = new T.PointsMaterial({ map: glowTex, color: 0xbfeaff, size: 2.4, transparent: true, opacity: 0.8, blending: T.AdditiveBlending, depthWrite: false });
        net.add(new T.Points(new T.BufferGeometry().setFromPoints(nodesPos), neuronMat));
        // Impulsos que viajan por las sinapsis
        const sparks = [];
        for (let k = 0; k < 28; k++) {
          const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xe6f6ff, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
          s.scale.setScalar(1.6); net.add(s);
          sparks.push({ s, e: edges[(k * 29) % edges.length], t: (k * 0.137) % 1, v: 0.6 + (k % 5) * 0.18 });
        }
        // Núcleo: corazón de energía y una estructura compleja que gira dentro
        const metal = new T.MeshStandardMaterial({ color: 0x9fe2ff, emissive: 0x2f8cff, emissiveIntensity: 0.6, metalness: 0.3, roughness: 0.2 });
        const heart = new T.Mesh(new T.SphereGeometry(1.7, 32, 32), metal);
        const shell = new T.Mesh(new T.TorusKnotGeometry(2.9, 0.16, 180, 8, 3, 5), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75, blending: T.AdditiveBlending, depthWrite: false }));
        const orbs = new T.Group();
        orbs.add(net);
        const star = new T.Sprite(new T.SpriteMaterial({ map: glowTex, transparent: true, blending: T.AdditiveBlending, depthWrite: false, opacity: 0.5 }));
        star.scale.setScalar(16);
        emblem.add(star, heart, shell, orbs);
        emblem.userData.engine = { heart, shell, net, synMat, neuronMat, sparks, nodesPos, grow: 0.7 };

        emblem.userData.base = 1;
        const light = new T.PointLight(0x2f8cff, 1.6, 90, 2);
        const beam = new T.Mesh(new T.CylinderGeometry(0.8, 2.6, cfg.core.y + 40, 16, 1, true), new T.MeshBasicMaterial({ color: 0x007aff, transparent: true, opacity: 0, blending: T.AdditiveBlending, side: T.DoubleSide, depthWrite: false }));
        beam.position.y = -(cfg.core.y + 40) / 2;
        core.add(halo, emblem, light, beam);
        core.userData = { halo, emblem, metal, star, orbs, light, beam };
        world.add(core);
        yield;
        // Descarga de energía: esfera de plasma con chispas en espiral y rayos eléctricos al súper agente
        const glowSprite = (color, size, opacity) => {
          const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color, transparent: true, opacity, blending: T.AdditiveBlending, depthWrite: false }));
          s.scale.setScalar(size); return s;
        };
        const bolt = new T.Group();
        const plasmaOuter = glowSprite(0x38bdf8, 16, 0.75), plasmaInner = glowSprite(0xffffff, 5, 1);
        bolt.add(plasmaOuter, plasmaInner);
        bolt.visible = false;
        world.add(bolt);
        const trail = [];
        for (let k = 0; k < 22; k++) { const s = glowSprite(k % 3 ? 0x7fd0ff : 0xe6f6ff, 2.2 - k * 0.06, 0); world.add(s); trail.push(s); }
        // Haz continuo: un cono de luz suave del súper agente a la esfera (núcleo brillante y halo amplio)
        const beamTex = (() => {
          const c = document.createElement("canvas"); c.width = 4; c.height = 128;
          const g = c.getContext("2d"), lg = g.createLinearGradient(0, 0, 0, 128);
          lg.addColorStop(0, "rgba(255,255,255,1)"); lg.addColorStop(0.7, "rgba(160,220,255,0.6)"); lg.addColorStop(1, "rgba(120,200,255,0.05)");
          g.fillStyle = lg; g.fillRect(0, 0, 4, 128);
          const tx = new T.CanvasTexture(c);
          ownTex.push(tx);
          return tx;
        })();
        const beamMat = (color, op) => new T.MeshBasicMaterial({ map: beamTex, color, transparent: true, opacity: op, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide });
        const ray = new T.Group();
        const rayCore = new T.Mesh(new T.CylinderGeometry(1.1, 0.25, 1, 20, 1, true), beamMat(0xe6f6ff, 0.9));
        const rayHalo = new T.Mesh(new T.CylinderGeometry(3.4, 0.9, 1, 24, 1, true), beamMat(0x38bdf8, 0.35));
        rayCore.position.y = rayHalo.position.y = 0.5;
        ray.add(rayCore, rayHalo); ray.visible = false; world.add(ray);
        const flow = [];
        for (let k = 0; k < 10; k++) { const s = glowSprite(0xbfeaff, 3, 0); world.add(s); flow.push(s); }
        const arcs = [];
        const blast = glowSprite(0x9fe2ff, 6, 0);
        world.add(blast);
        const impactAt = new T.Vector3(0, (id === 'tajo' ? hTajo(0, 0) : hSub(0, -6)) + 1, id === 'tajo' ? 0 : -6);
        shot = { bolt, plasmaOuter, plasmaInner, trail, arcs, ray, rayCore, rayHalo, flow, blast, impactAt, start: -1, hit: -1 };
        yield;
        // Balizas con antena y ruta al núcleo
        nodes = MINES[id].spots.map((s, i) => {
          const base = cfg.anchors && cfg.anchors[s[0]] ? cfg.anchors[s[0]].clone() : cfg.at(s[5], s[6]);
          const top = base.clone().add(new T.Vector3(0, 9, 0));
          const color = s[4] ? AMBER : BLUE;
          const stem = lineThrough([base, top], 0x5b6b85, 0.8);
          const pad = new T.Mesh(new T.RingGeometry(2.2, 2.8, 24), new T.MeshBasicMaterial({ color: 0x5b6b85, transparent: true, opacity: 0.8, side: T.DoubleSide }));
          pad.rotation.x = -Math.PI / 2; pad.position.copy(base).add(new T.Vector3(0, 0.3, 0)); world.add(pad);
          const gem = new T.Mesh(new T.OctahedronGeometry(1.9), new T.MeshBasicMaterial({ color: 0x5b6b85, transparent: true, opacity: 0.95 }));
          gem.position.copy(top);
          world.add(gem);
          const path = dataPath(top, cfg.core);
          const tg = new T.TubeGeometry(path, 90, 0.26, 6, false);
          const beamMesh = new T.Mesh(tg, new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, blending: T.AdditiveBlending, depthWrite: false }));
          beamMesh.visible = false;
          world.add(beamMesh);
          const packets = [0, 1, 2].map(() => {
            const m = new T.Mesh(new T.CylinderGeometry(0.42, 0.42, 3.4, 8), new T.MeshBasicMaterial({ color: 0xbfeaff, transparent: true, opacity: 0.75 }));
            m.visible = false; m.userData.last = 0; world.add(m); return m;
          });
          const orbit = [0, 1, 2].map(() => {
            const m = new T.Mesh(new T.SphereGeometry(0.7, 8, 8), new T.MeshBasicMaterial({ color: s[4] ? 0xf3b35c : 0x9fb0c8, transparent: true, opacity: 0.8 }));
            world.add(m); return m;
          });
          return { top, stem, pad, gem, path, beamMesh, packets, orbit, color, index: tg.index.count, phase: (i * 0.37) % 1, speed: 0.22 + (i % 4) * 0.03 };
        });
        yield* fuse(id);
        resize();
        yield;
        // Los programas de sombreado se preparan en una parte propia: el primer cuadro solo sube la geometría
        renderer.compile(scene, camera);
        yield;
      }

      /* Fusión: las piezas fijas con material equivalente se dibujan en una sola orden */
      // tint: sin color ni opacidad (van por vértice, paso 5)
      const matKey = (o, tint) => {
        const m = o.material;
        return [o.isMesh ? 'M' : 'L', m.type, tint ? '' : m.color && m.color.getHex(), tint ? '' : m.opacity, m.transparent, m.depthWrite, m.depthTest, m.side, m.blending,
          m.vertexColors, m.fog, m.metalness, m.roughness, m.emissive && m.emissive.getHex(), m.emissiveIntensity,
          m.dashSize, m.gapSize, m.scale, m.map && m.map.uuid, m.alphaTest, m.polygonOffset, m.wireframe, m.flatShading, o.renderOrder].join('|');
      };
      const needs = (o, m) => ['position'].concat(o.isMesh && !m.isMeshBasicMaterial ? ['normal'] : [], m.map ? ['uv'] : [], m.vertexColors ? ['color'] : [], m.isLineDashedMaterial ? ['lineDistance'] : []);
      // Une las piezas ya llevadas al marco del ancla: posición, normal (con su matriz normal), uv, color y distancia de línea
      function mergeGeo(list, c, tint) {
        const o0 = list[0].o, lines = !o0.isMesh, keys = needs(o0, o0.material), sz = {}, data = {}, idx = [];
        keys.forEach(k => { sz[k] = o0.geometry.attributes[k].itemSize; data[k] = []; });
        if (tint) data.color = [];
        const v = new T.Vector3(), nm = new T.Matrix3();
        let nv = 0;
        list.forEach(({ o, mx }) => {
          const g = o.geometry, A = g.attributes, n = A.position.count;
          nm.getNormalMatrix(mx);
          for (let i = 0; i < n; i++) {
            v.fromBufferAttribute(A.position, i).applyMatrix4(mx).sub(c);
            data.position.push(v.x, v.y, v.z);
            if (sz.normal) { v.fromBufferAttribute(A.normal, i).applyMatrix3(nm).normalize(); data.normal.push(v.x, v.y, v.z); }
            keys.slice(sz.normal ? 2 : 1).forEach(k => { for (let j = 0; j < sz[k]; j++) data[k].push(A[k].array[i * sz[k] + j]); });
            if (tint) data.color.push(o.material.color.r, o.material.color.g, o.material.color.b, o.material.opacity);
          }
          const I = g.index ? g.index.array : null, ni = I ? I.length : n, at = j => nv + (I ? I[j] : j);
          if (lines && !o.isLineSegments) for (let j = 0; j < ni - 1; j++) idx.push(at(j), at(j + 1));
          else if (!lines && mx.determinant() < 0) for (let j = 0; j < ni; j += 3) idx.push(at(j), at(j + 2), at(j + 1));
          else for (let j = 0; j < ni; j++) idx.push(at(j));
          nv += n;
        });
        const g = new T.BufferGeometry();
        keys.forEach(k => g.setAttribute(k, new T.Float32BufferAttribute(data[k], sz[k])));
        if (tint) g.setAttribute('color', new T.Float32BufferAttribute(data.color, 4));
        g.setIndex(idx);
        return g;
      }
      /* Paso 6: sprites fijos en una sola malla de carteles; el shader repite el de SpriteMaterial (r128) */
      const cardVS = ['attribute vec3 ctr; attribute vec2 scl; attribute vec4 rgba; uniform float rotation; varying vec2 vUv; varying vec4 vC;',
        '#include <common>', '#include <fog_pars_vertex>',
        'void main() {', '  vUv = uv; vC = rgba;', '  vec4 mvPosition = modelViewMatrix * vec4( ctr, 1.0 );',
        '  vec2 alignedPosition = position.xy * scl;', '  vec2 rotatedPosition;',
        '  rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;',
        '  rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;',
        '  mvPosition.xy += rotatedPosition;', '  gl_Position = projectionMatrix * mvPosition;', '#include <fog_vertex>', '}'].join('\n');
      const cardFS = ['uniform sampler2D map; varying vec2 vUv; varying vec4 vC;', '#include <common>', '#include <fog_pars_fragment>',
        'void main() {', '  vec4 diffuseColor = vC;', '  diffuseColor *= texture2D( map, vUv );',
        '  gl_FragColor = vec4( diffuseColor.rgb, diffuseColor.a );', '#include <fog_fragment>', '}'].join('\n');
      function cardMat(m) {
        const uniforms = T.UniformsUtils.merge([T.UniformsLib.fog, { rotation: { value: 0 } }]);
        uniforms.map = { value: m.map };
        return new T.ShaderMaterial({ uniforms, vertexShader: cardVS, fragmentShader: cardFS, fog: m.fog, transparent: m.transparent,
          blending: m.blending, depthWrite: m.depthWrite, depthTest: m.depthTest });
      }
      // Une los sprites fijos que cuelgan de world (lado del vidrio en sub); quedan ubicados en su centro
      function cards(id, live, skip, old) {
        const groups = new Map();
        world.children.slice().forEach(o => {
          const m = o.material;
          if (!o.isSprite || !o.visible || live.has(o) || skip.has(o) || o.children.length || !m.visible || !m.map || m.alphaMap
            || m.rotation !== 0 || !m.sizeAttenuation || o.center.x !== 0.5 || o.center.y !== 0.5) return;
          const side = id === 'sub' && o.position.z < 0 ? 'b' : 'f';
          const key = [side, m.map.uuid, m.transparent, m.blending, m.depthWrite, m.depthTest, m.fog, m.alphaTest, o.renderOrder].join('|');
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(o);
        });
        const Q = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]];
        groups.forEach(L => {
          if (L.length < 2) return;
          L.sort((p, q) => p.id - q.id);
          const c = new T.Vector3();
          L.forEach(o => c.add(o.position)); c.divideScalar(L.length);
          const pos = [], uv = [], ctr = [], scl = [], rgba = [], idx = [];
          L.forEach((o, k) => {
            const e = o.matrixWorld.elements, sx = Math.hypot(e[0], e[1], e[2]), sy = Math.hypot(e[4], e[5], e[6]), m = o.material;
            Q.forEach(([x, y]) => {
              pos.push(x, y, 0); uv.push(x + 0.5, y + 0.5); ctr.push(e[12] - c.x, e[13] - c.y, e[14] - c.z); scl.push(sx, sy);
              rgba.push(m.color.r, m.color.g, m.color.b, m.opacity);
            });
            idx.push(k * 4, k * 4 + 1, k * 4 + 2, k * 4, k * 4 + 2, k * 4 + 3);
            old.push(o.material); world.remove(o);
          });
          const g = new T.BufferGeometry();
          g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
          g.setAttribute('ctr', new T.Float32BufferAttribute(ctr, 3)); g.setAttribute('scl', new T.Float32BufferAttribute(scl, 2));
          g.setAttribute('rgba', new T.Float32BufferAttribute(rgba, 4)); g.setIndex(idx);
          const f = new T.Mesh(g, cardMat(L[0].material));
          f.position.copy(c); f.frustumCulled = false; f.renderOrder = L[0].renderOrder;
          world.add(f);
        });
      }
      /* Paso 7: balizas. Los stem se unen con color por vértice; pad, gem, paquetes y órbitas son instancias.
         Cada clase va en dos mallas, las piezas más lejanas y las más cercanas que el origen (donde están relieve,
         vidrio y túneles), ubicadas en el centro de sus piezas: así se ordenan igual que las piezas sueltas frente a ellos */
      let bk = null;
      function beacons(old) {
        const s0 = nodes[0].stem, geo = mergeGeo(nodes.map(n => ({ o: n.stem, mx: n.stem.matrixWorld.clone() })), new T.Vector3(), true);
        nodes.forEach(n => { old.push(n.stem.geometry, n.stem.material); if (n.stem !== s0) world.remove(n.stem); });
        s0.geometry = geo; s0.isLineSegments = true;
        s0.material = s0.material.clone(); s0.material.color.setRGB(1, 1, 1); s0.material.opacity = 1; s0.material.vertexColors = true;
        const pair = (list, tint) => {
          const o = list[0];
          list.forEach(x => { old.push(x.material); if (x.geometry !== o.geometry) old.push(x.geometry); world.remove(x); });
          return [0, 1].map(() => {
            const m = new T.InstancedMesh(o.geometry, o.material.clone(), list.length);
            if (tint) { m.material.color.setRGB(1, 1, 1); for (let j = 0; j < list.length; j++) m.setColorAt(j, GREY); }
            m.frustumCulled = false; world.add(m); return m;
          });
        };
        const item = (p, q, c) => ({ p: p ? p.clone() : new T.Vector3(), q: q ? q.clone() : new T.Quaternion(), s: new T.Vector3(1, 1, 1), c: c ? c.clone() : null, on: true, h: 0 });
        bk = { stem: s0,
          pad: pair(nodes.map(n => n.pad), true), gem: pair(nodes.map(n => n.gem), true),
          pk: pair([].concat(...nodes.map(n => n.packets))), orb: pair([].concat(...nodes.map(n => n.orbit)), true),
          pads: nodes.map(n => item(n.pad.position, n.pad.quaternion, GREY)), gems: nodes.map(() => item(null, null, GREY)),
          pks: [].concat(...nodes.map(n => n.packets.map(() => item()))), orbs: [].concat(...nodes.map(n => n.orbit.map(m => item(null, null, m.material.color)))) };
        nodes.forEach(n => { n.c = null; n.last = [0, 0, 0]; });
      }
      const bM = new T.Matrix4(), bE = new T.Euler(), bD = new T.Vector3(), bC = [new T.Vector3(), new T.Vector3()];
      // Reparte las piezas encendidas entre la malla lejana y la cercana
      function lay(P, items) {
        const n = [0, 0], d0 = -camera.position.dot(bD);
        bC[0].set(0, 0, 0); bC[1].set(0, 0, 0);
        items.forEach(it => { if (!it.on) return; it.h = tmpV.copy(it.p).sub(camera.position).dot(bD) > d0 ? 0 : 1; bC[it.h].add(it.p); n[it.h]++; });
        P.forEach((m, h) => { m.count = 0; m.visible = n[h] > 0; if (n[h]) m.position.copy(bC[h]).divideScalar(n[h]); });
        items.forEach(it => {
          if (!it.on) return;
          const m = P[it.h], j = m.count++;
          m.setMatrixAt(j, bM.compose(tmpV.copy(it.p).sub(m.position), it.q, it.s));
          if (m.instanceColor) m.setColorAt(j, it.c);
        });
        P.forEach(m => { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; });
      }
      /* Paso 9: piezas opacas iguales (equipos, mineral en movimiento) como instancias. La pieza original sigue en la
         escena como guía: se mueve igual que antes, pero en otra capa, así que no se dibuja */
      let herds = [];
      function herd(skip) {
        herds = [];
        const G = new Map(), same = (a, b) => !a === !b && (!a || (a.array.length === b.array.length && a.array.every((x, i) => x === b.array[i])));
        world.traverse(o => {
          const m = o.material, g = o.geometry;
          if (!o.isMesh || o.isInstancedMesh || Array.isArray(m) || m.transparent || m.isShaderMaterial || !m.visible || g.drawRange.count !== Infinity || g.groups.length) return;
          for (let p = o; p !== world; p = p.parent) if (skip.has(p)) return;
          const k = [matKey(o), Object.keys(g.attributes).join(), g.attributes.position.count, g.index ? g.index.count : 0].join('|');
          if (!G.has(k)) G.set(k, []);
          const L = G.get(k), h = L.find(h => ['position', 'normal', 'uv'].every(a => same(g.attributes[a], h[0].geometry.attributes[a])) && same(g.index, h[0].geometry.index));
          if (h) h.push(o); else L.push([o]);
        });
        G.forEach(L => L.forEach(list => {
          if (list.length < 2) return;
          const m = new T.InstancedMesh(list[0].geometry, list[0].material, list.length);
          m.frustumCulled = false; world.add(m);
          list.forEach(o => o.layers.set(1));
          herds.push({ m, list });
        }));
      }
      function sync() {
        herds.forEach(({ m, list }) => {
          let j = 0;
          list.forEach(o => {
            for (let p = o; p !== world; p = p.parent) if (!p.visible) return;
            o.updateWorldMatrix(true, false);
            m.setMatrixAt(j++, o.matrixWorld);
          });
          m.count = j; m.visible = j > 0; m.instanceMatrix.needsUpdate = true;
        });
      }
      /* Paso 8: sprites aditivos con vida propia (núcleo, disparo, brillos que viajan por mangas y aire) en carteles. El sprite sigue en la escena como guía, en otra capa;
         en cada cuadro se copian su posición, escala, color y opacidad. Dos mallas, lo más lejano y lo más cercano que el origen */
      let flock = [];
      function flocks(air) {
        flock = [];
        const G = new Map();
        air.forEach(r => r.traverse(o => {
          const m = o.material;
          if (!o.isSprite || m.blending !== T.AdditiveBlending || !m.map || m.alphaMap || m.rotation !== 0 || !m.sizeAttenuation || o.center.x !== 0.5 || o.center.y !== 0.5) return;
          const key = [m.map.uuid, m.transparent, m.depthWrite, m.depthTest, m.fog, m.alphaTest, o.renderOrder].join('|');
          if (!G.has(key)) G.set(key, []);
          G.get(key).push(o);
        }));
        G.forEach(L => {
          if (L.length < 2) return;
          L.sort((p, q) => p.id - q.id);
          const n = L.length, idx = [], uv = [];
          for (let k = 0; k < n; k++) { idx.push(k * 4, k * 4 + 1, k * 4 + 2, k * 4, k * 4 + 2, k * 4 + 3); uv.push(0, 0, 1, 0, 1, 1, 0, 1); }
          const P = [0, 1].map(() => {
            const g = new T.BufferGeometry(), at = (k, a, s) => g.setAttribute(k, new T.Float32BufferAttribute(a || new Float32Array(n * 4 * s), s).setUsage(T.DynamicDrawUsage));
            g.setAttribute('position', new T.Float32BufferAttribute([].concat(...L.map(() => [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0])), 3));
            g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
            at('ctr', null, 3); at('scl', null, 2); at('rgba', null, 4); g.setIndex(idx);
            const m = new T.Mesh(g, cardMat(L[0].material));
            m.frustumCulled = false; m.renderOrder = L[0].renderOrder; world.add(m);
            return m;
          });
          L.forEach(o => o.layers.set(1));
          flock.push({ L, P });
        });
      }
      const fP = new T.Vector3();
      function flight() {
        const d0 = -camera.position.dot(bD);
        flock.forEach(({ L, P }) => {
          const n = [0, 0];
          bC[0].set(0, 0, 0); bC[1].set(0, 0, 0);
          L.forEach(o => {
            o.userData.h = -1;
            if (!o.material.visible) return;
            for (let p = o; p !== world; p = p.parent) if (!p.visible) return;
            o.updateWorldMatrix(true, false);
            fP.setFromMatrixPosition(o.matrixWorld);
            const h = o.userData.h = tmpV.copy(fP).sub(camera.position).dot(bD) > d0 ? 0 : 1;
            bC[h].add(fP); n[h]++;
          });
          P.forEach((m, h) => { m.visible = n[h] > 0; if (n[h]) m.position.copy(bC[h]).divideScalar(n[h]); m.geometry.setDrawRange(0, n[h] * 6); m.userData.j = 0; });
          L.forEach(o => {
            const h = o.userData.h;
            if (h < 0) return;
            const m = P[h], A = m.geometry.attributes, j = m.userData.j++, e = o.matrixWorld.elements, c = o.material.color, op = o.material.opacity;
            const sx = Math.hypot(e[0], e[1], e[2]), sy = Math.hypot(e[4], e[5], e[6]);
            for (let v = j * 4; v < j * 4 + 4; v++) {
              A.ctr.setXYZ(v, e[12] - m.position.x, e[13] - m.position.y, e[14] - m.position.z);
              A.scl.setXY(v, sx, sy); A.rgba.setXYZW(v, c.r, c.g, c.b, op);
            }
          });
          P.forEach(m => { const A = m.geometry.attributes; A.ctr.needsUpdate = A.scl.needsUpdate = A.rgba.needsUpdate = true; });
        });
      }
      const TINT = new Set(['MeshBasicMaterial', 'MeshStandardMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial', 'LineBasicMaterial', 'LineDashedMaterial']);
      // Las transparentes ubicadas en world no: al unirlas cambia su centro y su orden frente al relieve al girar.
      // Dentro de un equipo sí: sus piezas están a pocos metros unas de otras
      const TSIDE = ['', 'o'];
      function* fuse(id) {
        world.updateMatrixWorld(true);
        const live = new Set(), skip = new Set(), uni = new Map();
        const add = (S, l) => l.forEach(o => { if (o) S.add(o); });
        // Lo que se mueve o cambia después de build es ancla: sus partes fijas se unen en su propio marco
        movers.forEach(m => {
          add(live, [m.grp, m.loco, m.boom, m.dust].concat(m.feeds || [], m.skips || [], m.ropes || [], m.fall || [], m.cars || [], (m.trucks || []).map(t => t.grp)));
          if (m.rig) add(live, [m.rig.crowd, m.rig.dipper, m.rig.cable]);
          if (m.drill) add(live, [m.drill.head, m.drill.rod, m.drill.dust]);
        });
        world.traverse(o => add(live, [o.userData.bed, o.userData.load, o.userData.bucket]));
        // Núcleo, disparo y balizas quedan como están
        add(skip, [core, shot.bolt, shot.ray, shot.blast].concat(shot.trail, shot.flow));
        nodes.forEach(n => add(skip, [n.stem, n.pad, n.gem, n.beamMesh].concat(n.packets, n.orbit)));
        // Grupos con un solo valor por cuadro (charcos y conos de luz, ventanas): comparten material
        nightLights.forEach(l => { if (l.m.isMesh) uni.set(l.m, 'n' + l.max); else skip.add(l.m); });
        windows.forEach(c => uni.set(c, 'w'));
        yield;
        const groups = new Map(), piece = new Set();
        world.traverse(o => {
          if (!(o.isMesh || o.isLine) || !o.visible || skip.has(o) || (live.has(o) && !uni.has(o))) return;
          const m = o.material, g = o.geometry;
          if (Array.isArray(m) || !m.visible || m.isShaderMaterial || g.drawRange.count !== Infinity) return;
          if (needs(o, m).some(k => !g.attributes[k])) return;
          let a = o.parent;
          while (a !== world && a.visible && !skip.has(a) && !live.has(a)) a = a.parent;
          if (!a.visible || skip.has(a)) return;
          const mx = o.matrix.clone();
          for (let p = o.parent; p !== a; p = p.parent) mx.premultiply(p.matrix);
          const at = new T.Vector3().setFromMatrixPosition(mx);
          // Transparentes: no mezclar piezas en el origen con piezas ubicadas; en sub, separar por lado del vidrio
          const side = !m.transparent ? '' : at.lengthSq() < 1e-8 ? 'o' : id === 'sub' && a === world && at.z < 0 ? 'b' : 'f';
          // Paso 5: piezas que solo difieren en color u opacidad van juntas, con color RGBA por vértice
          const tint = !uni.has(o) && !m.vertexColors && TINT.has(m.type) && (TSIDE.includes(side) || a !== world);
          const pre = a.id + '|' + (uni.get(o) || '') + '|' + side + '|', key = pre + matKey(o);
          if (!groups.has(key)) groups.set(key, { a, side, tk: tint ? pre + matKey(o, true) : null, list: [] });
          groups.get(key).list.push({ o, mx, at });
          piece.add(o);
        });
        groups.forEach(G => { G.list.sort((p, q) => p.o.id - q.o.id); G.id = G.list[0].o.id; });
        // Las transparentes en el origen se ordenan por id: solo se unen grupos seguidos en ese orden,
        // sin otra pieza transparente del mismo origen entre ellos
        const wp = o => new T.Vector3().setFromMatrixPosition(o.matrixWorld).toArray().map(x => x.toFixed(4)).join();
        const seq = new Map();
        groups.forEach(G => { if (G.side !== 'o') return; const k = wp(G.a); if (!seq.has(k)) seq.set(k, []); seq.get(k).push(G); });
        world.traverse(o => {
          if (!(o.isMesh || o.isLine || o.isSprite || o.isPoints) || piece.has(o) || ![].concat(o.material).some(m => m.transparent)) return;
          const k = wp(o); if (seq.has(k)) seq.get(k).push({ id: o.id, tk: null });
        });
        const runs = new Map();
        seq.forEach(L => {
          L.sort((p, q) => p.id - q.id);
          let run = null;
          L.forEach(G => {
            if (!G.list) { run = null; return; }
            if (!G.tk || !run || run.tk !== G.tk) { run = { tk: G.tk, gs: [] }; runs.set(G, run); }
            run.gs.push(G);
          });
        });
        // El resto (opacas y ubicadas) se une por clave sin color ni opacidad
        const by = new Map();
        groups.forEach(G => {
          if (G.side === 'o') { const r = runs.get(G); if (r) by.set(G, r.gs); return; }
          if (!G.tk) { by.set(G, [G]); return; }
          if (!by.has(G.tk)) by.set(G.tk, []);
          by.get(G.tk).push(G);
        });
        const merged = [];
        by.forEach(gs => {
          const list = [].concat(...gs.map(G => G.list)).sort((p, q) => p.o.id - q.o.id);
          if (list.length < 2) { piece.delete(list[0].o); return; }
          merged.push({ a: gs[0].a, side: gs[0].side, list });
        });
        // Hijos que no se unen pasan, sin moverse, al ancestro que queda
        merged.forEach(G => G.list.forEach(({ o }) => o.children.slice().forEach(ch => {
          if (piece.has(ch)) return;
          let p = o.parent;
          while (piece.has(p)) p = p.parent;
          p.attach(ch);
        })));
        const old = [], kept = new Set();
        yield;
        for (const G of merged) {
          // El objeto fusionado es la primera pieza (conserva su orden de creación), ubicada en el centro de las piezas
          const c = new T.Vector3();
          if (G.side !== 'o') { G.list.forEach(p => c.add(p.at)); c.divideScalar(G.list.length); }
          const f = G.list[0].o, m0 = f.material;
          const tint = G.list.some(({ o }) => !o.material.color.equals(m0.color) || o.material.opacity !== m0.opacity);
          const geo = mergeGeo(G.list, c, tint);
          G.list.forEach(({ o }) => { old.push(o.geometry, o.material); o.parent.remove(o); });
          f.geometry = geo;
          if (tint) { f.material = m0.clone(); f.material.color.setRGB(1, 1, 1); f.material.opacity = 1; f.material.vertexColors = true; }
          if (!f.isMesh) f.isLineSegments = true; // la tira se dibuja como segmentos
          f.position.copy(c); f.rotation.set(0, 0, 0); f.scale.set(1, 1, 1);
          G.a.add(f);
          kept.add(f);
          yield;
        }
        cards(id, live, skip, old);
        beacons(old);
        yield;
        herd(skip);
        flocks(new Set([core, shot.bolt, shot.blast].concat(shot.trail, shot.flow, movers.filter(m => m.grp && m.grp.isSprite).map(m => m.grp))));
        // Grupos que quedaron vacíos
        const prune = o => {
          o.children.slice().forEach(prune);
          if (o !== world && o.type === 'Group' && !o.children.length && !live.has(o) && !skip.has(o)) o.parent.remove(o);
        };
        prune(world);
        nightLights = nightLights.filter(l => !piece.has(l.m) || kept.has(l.m));
        windows = windows.filter(c => !piece.has(c) || kept.has(c));
        // Liberar lo que ya nadie usa (los materiales compartidos que siguen en uso se quedan)
        const used = new Set();
        world.traverse(o => { if (o.geometry) used.add(o.geometry); [].concat(o.material || []).forEach(m => used.add(m)); });
        new Set(old).forEach(x => { if (!used.has(x)) x.dispose(); });
      }

      /* Resolución adaptativa: si el promedio de 30 cuadros dibujados pasa de 28 ms, la resolución interna baja
         en pasos de 0,25 hasta 1,0, nunca por encima del tope de siempre. Tras cada cambio se descarta una tanda (el
         cambio cuesta); solo vuelve a subir tras 8 tandas seguidas bajo 18 ms, y un nivel del que tuvo que bajar después
         de subir queda vetado: así no parpadea. No actúa con reducir movimiento ni con el reloj fijo (no recibe muestras) */
      const DPR_MAX = Math.min(window.devicePixelRatio || 1, 1.5), dprVeto = new Set(), dprUp = new Set();
      let dpr = DPR_MAX, adN = 0, adSum = 0, adSkip = 0, adFast = 0;
      function adapt(ms) {
        if (building || !(ms >= 0)) { adN = adSum = 0; return false; }
        if (adSkip > 0) { adSkip--; return false; }
        adSum += ms;
        if (++adN < 30) return false;
        const avg = adSum / adN;
        adN = adSum = 0;
        let next = dpr;
        if (avg > 28 && dpr > 1) { next = Math.max(1, dpr - 0.25); if (dprUp.has(dpr)) dprVeto.add(dpr); adFast = 0; }
        else if (avg < 18 && dpr < DPR_MAX) {
          const up = Math.min(DPR_MAX, dpr + 0.25);
          if (++adFast >= 8 && !dprVeto.has(up)) { next = up; dprUp.add(up); adFast = 0; }
        } else adFast = 0;
        if (next === dpr) return false;
        dpr = next; adSkip = 30;
        renderer.setPixelRatio(dpr);
        return true;
      }
      function resize() {
        const r = stage.getBoundingClientRect();
        W = r.width; H = r.height;
        const coreScale = W < 600 ? 1.25 : W < 900 ? 1.15 : 1;
        if (core) core.scale.setScalar(coreScale);
        labelDrop.y = -15 * coreScale;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        if (W < 900) camera.setViewOffset(W, H, 0, H * 0.17, W, H);
        else camera.setViewOffset(W, H, -W * 0.15, 0, W, H);
        camera.updateProjectionMatrix();
      }

      const v3 = new T.Vector3(), tan = new T.Vector3();
      const tmpV = new T.Vector3();
      const tmpV2 = new T.Vector3(), tmpV3 = new T.Vector3(), tmpV4 = new T.Vector3();
      const tmpV5 = new T.Vector3();
      function place(el, p) {
        v3.copy(p).project(camera);
        let x = (v3.x + 1) / 2 * W;
        if (W < 600 && el !== hub) x = Math.min(Math.max(x, 20), W - 20);
        // Solo se escribe lo que cambió (la cámara queda quieta largos ratos)
        const c = el._at || (el._at = ['', '', null]), l = x + 'px', t = (1 - v3.y) / 2 * H + 'px', vis = v3.z > 1 ? 'hidden' : '';
        if (c[0] !== l) el.style.left = c[0] = l;
        if (c[1] !== t) el.style.top = c[1] = t;
        if (c[2] !== vis) el.style.visibility = c[2] = vis;
      }
      function flash() {
        kick = 1;
      }

      let lastNow = 0;
      function render(rs, lit, prog, clock, now) {
        if (!cfg || building) return;
        const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0;
        lastNow = now;
        // Cámara: de baja y lejana a alta y cercana mientras todo se conecta
        const e = Math.min(1.25, Math.max(0.06, cfg.elev[0] + (cfg.elev[1] - cfg.elev[0]) * prog + pointer[1] * 0.04 + userEl));
        const a = cfg.az[0] + (cfg.az[1] - cfg.az[0]) * prog + 0.09 * Math.sin(clock * 0.12) + pointer[0] * 0.08 + userAz;
        const dist = cfg.dist * (W < 600 ? 2.0 : W < 900 ? 1.5 : 1) * (1.08 - 0.16 * prog);
        scene.fog.near = dist * 0.85;
        scene.fog.far = dist * 1.9;
        camera.position.set(
          cfg.target.x + dist * Math.cos(e) * Math.sin(a),
          cfg.target.y + dist * Math.sin(e),
          cfg.target.z + dist * Math.cos(e) * Math.cos(a)
        );
        camera.lookAt(cfg.target);

        // Equipos en operación
        movers.forEach(m => {
          if (m.spin) {
            // La pala gira entre el frente y el volquete; el brazo entra y sale y el cable lo sigue
            m.grp.rotation.y = 0.7 * Math.sin(clock * 0.45);
            if (m.rig) {
              m.rig.crowd.rotation.x = 0.14 * Math.sin(clock * 1.1);
              m.rig.dipper.getWorldPosition(tmpV); m.rig.house.worldToLocal(tmpV);
              const pa = m.rig.cable.geometry.attributes.position;
              pa.setXYZ(1, tmpV.x, tmpV.y + 1.6, tmpV.z); pa.needsUpdate = true;
            }
            return;
          }
          if (m.drill) {
            // El cabezal baja perforando despacio y sube rápido; hay polvo mientras perfora
            const d = m.drill, ph = (clock * 0.12 + m.phase) % 1;
            const y = ph < 0.75 ? 14 - ph / 0.75 * 11 : 3 + (ph - 0.75) / 0.25 * 11;
            d.head.position.y = y;
            const pa = d.rod.geometry.attributes.position; pa.setY(0, y); pa.needsUpdate = true;
            d.dust.material.opacity = ph < 0.75 && y < 9 ? 0.3 + 0.15 * Math.sin(clock * 9) : 0;
            d.dust.visible = d.dust.material.opacity > 0;
            d.dust.scale.setScalar(4 + 1.5 * Math.sin(clock * 3 + m.phase * 9));
            return;
          }
          if (m.sweep) { m.grp.rotation.y = m.base + 0.22 * Math.sin(clock * 0.8); return; }
          if (m.hoist) {
            // Izaje: un skip sube cargado mientras el otro baja; el que llega arriba vacía el mineral a la tolva
            const ph = (clock / 26) % 1, ease = k => k * k * (3 - 2 * k);
            const s = ph < 0.12 ? 0 : ph < 0.5 ? ease((ph - 0.12) / 0.38) : ph < 0.62 ? 1 : 1 - ease((ph - 0.62) / 0.38);
            [s, 1 - s].forEach((k, i) => {
              const y = m.yBot + (m.yTop - m.yBot) * k;
              m.skips[i].position.y = y;
              const pa = m.ropes[i].geometry.attributes.position; pa.setY(1, y + 4.1); pa.needsUpdate = true;
            });
            const dumping = ph < 0.12 || (ph >= 0.5 && ph < 0.62);
            m.fall.forEach((f, k) => {
              f.visible = dumping;
              if (dumping) f.position.copy(m.chute[0]).lerp(m.chute[1], (clock * 1.4 + k / m.fall.length) % 1);
            });
            return;
          }
          if (m.lhd) {
            // Scoop: carga en el punto de extracción, gira, lleva el mineral al echadero, lo vacía y vuelve
            const ph = (clock / m.period + m.offset) % 1, ease = k => k * k * (3 - 2 * k);
            let u = 0, rot = 0, tip = -0.25, loaded = true;
            if (ph < 0.12) { const d = ph / 0.12; tip = 0.35 * Math.sin(d * Math.PI) - 0.25 * d; loaded = d > 0.5; }
            else if (ph < 0.18) rot = (ph - 0.12) / 0.06;
            else if (ph < 0.5) { u = ease((ph - 0.18) / 0.32); rot = 1; }
            else if (ph < 0.6) { const d = (ph - 0.5) / 0.1; u = 1; rot = 1; tip = 0.9 * Math.sin(d * Math.PI); loaded = d < 0.45; }
            else if (ph < 0.66) { u = 1; rot = 1 - (ph - 0.6) / 0.06; loaded = false; }
            else { u = 1 - ease((ph - 0.66) / 0.34); loaded = false; }
            m.curve.getPointAt(u, m.grp.position); m.grp.position.y += 0.05;
            m.curve.getTangentAt(Math.min(0.995, Math.max(0.005, u)), tan);
            m.grp.rotation.set(0, Math.atan2(tan.x, tan.z) + (1 - rot) * Math.PI, 0);
            m.grp.userData.bucket.rotation.x = tip;
            m.grp.userData.load.visible = loaded;
            return;
          }
          if (m.jumbo) {
            m.feeds.forEach((f, k) => { f.position.z = 3.9 + 0.55 * (0.5 + 0.5 * Math.sin(clock * 0.9 + k * 2.2)); });
            m.dust.material.opacity = 0.25 + 0.15 * Math.sin(clock * 7);
            return;
          }
          if (m.train) {
            // Tren cauville: carga bajo la tolva, viaja al echadero, descarga carro por carro y regresa vacío
            const ph = (clock / m.period) % 1, ease = k => k * k * (3 - 2 * k), n = m.cars.length;
            let x = m.xE, full = n;
            if (ph < 0.14) full = Math.floor(ph / 0.14 * (n + 1));
            else if (ph < 0.5) x = m.xE + (m.xW - m.xE) * ease((ph - 0.14) / 0.36);
            else if (ph < 0.64) { x = m.xW; full = n - Math.floor((ph - 0.5) / 0.14 * (n + 1)); }
            else { x = m.xW + (m.xE - m.xW) * ease((ph - 0.64) / 0.36); full = 0; }
            m.loco.position.set(x, m.y, m.z); m.loco.rotation.y = -Math.PI / 2;
            m.cars.forEach((c, k) => {
              c.position.set(x + 2.5 + k * 2.3, m.y, m.z); c.rotation.y = Math.PI / 2;
              c.userData.load.visible = ph < 0.14 ? k < full : ph < 0.5 ? true : ph < 0.64 ? k >= n - full : false;
            });
            return;
          }
          if (m.haul) {
            // Volquetes: el cargado sube con prioridad; el vacío solo entra a un tramo de un carril si no se cruzará
            // con nadie y, si no, espera en la bahía; en superficie la vía es de dos carriles
            const R = m.route, V0 = 7, GAP = 11, safe = [0].concat(R.bays, [R.Lu]);
            const below = b => { let nb = 0; safe.forEach(x => { if (x < b - 0.01 && x > nb) nb = x; }); return nb; };
            const canGo = (tr, b) => {
              const nb = below(b), seg = b - nb;
              return !m.trucks.some(o => o !== tr && (
                (o.dir > 0 && o.st === 'move' && o.s > nb - seg - 8 && o.s < b + 4) ||
                (o.st === 'load' && nb === 0) ||
                (o.dir < 0 && o.s >= nb - 1 && o.s < b - 0.01)));
            };
            m.trucks.forEach(tr => {
              if (tr.st === 'load' || tr.st === 'dump') {
                tr.t -= dt;
                if (tr.t <= 0) { tr.dir = tr.s <= 0.01 ? 1 : -1; tr.st = 'move'; }
              } else if (tr.st === 'wait') {
                if (canGo(tr, tr.s)) tr.st = 'move';
              } else {
                const blocked = m.trucks.some(o => o !== tr && o.dir === tr.dir && (o.s - tr.s) * tr.dir > 0 && Math.abs(o.s - tr.s) < GAP);
                if (!blocked) {
                  let s2 = tr.s + V0 * dt * tr.dir;
                  if (tr.dir < 0) {
                    const b = safe.filter(x => x > 0 && x <= tr.s && x > s2).sort((p, q) => q - p)[0];
                    if (b !== undefined && !canGo(tr, b)) { s2 = b; tr.st = 'wait'; }
                  }
                  tr.s = s2;
                  if (tr.s >= R.L) { tr.s = R.L; tr.st = 'dump'; tr.t = 5; }
                  if (tr.s <= 0) { tr.s = 0; tr.st = 'load'; tr.t = 6; }
                }
              }
              const g = tr.grp;
              R.sample(tr.s, g.position, tan);
              const surface = tr.s > R.Lu;
              const target = surface ? (tr.dir > 0 ? 1.2 : -1.2) : tr.st === 'wait' ? 3 : 0;
              tr.off += (target - tr.off) * Math.min(1, dt * 2.5);
              if (surface) tmpV2.set(-tan.z, 0, tan.x).normalize();
              else R.outward(g.position, tan, tmpV2);
              g.position.addScaledVector(tmpV2, tr.off);
              const face = tmpV.copy(tan).multiplyScalar(tr.dir);
              g.lookAt(tmpV3.copy(g.position).add(face));
              g.userData.load.visible = tr.st === 'load' ? tr.t < 3 : tr.st === 'dump' ? tr.t > 2.5 : tr.dir > 0;
            });
            return;
          }
          if (m.bolter) { m.boom.rotation.x = -0.25 + 0.08 * Math.sin(clock * 0.8); return; }
          if (m.rot) { m.grp.rotation.z = clock * m.rot; return; }
          if (m.ride) {
            // Volquete de bajo perfil: sube cargado por la rampa hasta la bocamina y baja vacío
            const ph = (clock / m.period + m.offset) % 1, ease = k => k * k * (3 - 2 * k);
            let t, up = true;
            if (ph < 0.1) t = 1; else if (ph < 0.5) t = 1 - ease((ph - 0.1) / 0.4); else if (ph < 0.58) t = 0; else { t = ease((ph - 0.58) / 0.42); up = false; }
            m.curve.getPointAt(t, m.grp.position); m.grp.position.y += 0.05;
            m.curve.getTangentAt(Math.min(0.995, Math.max(0.005, t)), tan);
            if (up) tan.negate();
            m.grp.lookAt(tmpV.copy(m.grp.position).add(tan));
            m.grp.userData.load.visible = ph > 0.05 && ph < 0.54;
            return;
          }
          if (m.cycle) {
            // Carga en el frente → viaje cargado por su carril → giro y retroceso → descarga → regreso vacío por el otro carril
            const ph = (clock * m.speed + m.offset) % 1;
            let t, turn = 0, dump = 0, loaded = true, back = false;
            if (ph < 0.1) { t = 0; loaded = ph > 0.05; }
            else if (ph < 0.47) t = (ph - 0.1) / 0.37;
            else if (ph < 0.6) {
              t = 1;
              const d = (ph - 0.47) / 0.13;
              turn = Math.min(1, d / 0.35);
              dump = d > 0.35 ? Math.sin((d - 0.35) / 0.65 * Math.PI) : 0;
              loaded = d < 0.6;
            } else { t = 1 - (ph - 0.6) / 0.4; back = true; loaded = false; }
            const tc = Math.min(0.995, Math.max(0.005, t));
            m.curve.getTangentAt(tc, tan);
            const heading = Math.atan2(tan.x, tan.z);
            const going = !back && ph >= 0.1 && ph < 0.47;
            const lane = ph < 0.1 || (ph >= 0.47 && ph < 0.6) ? 0 : going ? 1.05 : -1.05;
            m.grp.position.copy(m.curve.getPointAt(t));
            m.grp.position.x += tan.z * lane;
            m.grp.position.z -= tan.x * lane;
            m.grp.position.y += m.lift;
            m.grp.rotation.y = heading + (back ? Math.PI : turn * Math.PI);
            m.grp.userData.bed.rotation.x = -0.9 * dump;
            m.grp.userData.load.visible = loaded;
            // Mineral cayendo desde la tolva mientras descarga
            if (dump > 0.15 && m.target) {
              m.grp.updateMatrixWorld();
              const lip = m.grp.localToWorld(tmpV.set(0, 2.4, -4.2));
              m.fall.forEach((f, k) => {
                const s = (clock * 2.2 + k / m.fall.length) % 1;
                f.visible = true;
                f.position.set(lip.x + (m.target.x - lip.x) * s, lip.y + (m.target.y - lip.y) * s * s, lip.z + (m.target.z - lip.z) * s);
              });
            } else m.fall.forEach(f => { f.visible = false; });
            return;
          }
          let t = (clock * m.speed + m.offset) % 1;
          if (m.pingPong) t = t < 0.5 ? t * 2 : 2 - t * 2;
          m.grp.position.copy(m.curve.getPointAt(t));
          m.grp.position.y += m.lift;
          if (!m.upright) {
            m.curve.getTangentAt(Math.min(0.999, Math.max(0.001, t)), tan);
            m.grp.rotation.y = Math.atan2(tan.x, tan.z);
          }
        });

        // Datos: suben por la antena y entran al núcleo; cada llegada lo hace pulsar
        nodes.forEach((n, i) => {
          const r = rs[i], done = r >= 1;
          n.beamMesh.visible = r > 0;
          n.beamMesh.geometry.setDrawRange(0, Math.floor(n.index * r / 6) * 6);
          const c = r > 0 ? n.color : GREY;
          if (n.c !== c) {
            n.c = c; bk.pads[i].c.copy(c); bk.gems[i].c.copy(c);
            const a = bk.stem.geometry.attributes.color;
            a.setXYZ(i * 2, c.r, c.g, c.b); a.setXYZ(i * 2 + 1, c.r, c.g, c.b); a.needsUpdate = true;
          }
          const g = bk.gems[i];
          g.p.copy(n.top); g.q.setFromEuler(bE.set(0, clock * 1.4 + i, 0)); g.s.setScalar(done ? 1.25 + 0.15 * Math.sin(clock * 4 + i) : 1);
          for (let k = 0; k < 3; k++) {
            const m = bk.pks[i * 3 + k];
            m.on = done;
            if (!done) continue;
            const t = (clock * n.speed + n.phase + k / 3) % 1;
            if (t < n.last[k]) flash();
            n.last[k] = t;
            m.p.copy(n.path.getPointAt(t));
            n.path.getTangentAt(t, tan);
            m.q.setFromUnitVectors(UP, tan.normalize());
          }
          for (let k = 0; k < 3; k++) {
            const m = bk.orbs[i * 3 + k], ang = clock * (1.1 + k * 0.4) + n.phase * 6 + k * 2.1, rad = 4 + k * 2.2;
            m.on = r <= 0;
            m.p.set(n.top.x + Math.cos(ang) * rad, n.top.y - 3 + Math.sin(ang * 1.3) * 1.5, n.top.z + Math.sin(ang) * rad);
          }
        });
        bD.copy(cfg.target).sub(camera.position).normalize();
        lay(bk.pad, bk.pads); lay(bk.gem, bk.gems); lay(bk.pk, bk.pks); lay(bk.orb, bk.orbs);

        litAmount += ((lit ? 1 : 0) - litAmount) * 0.06;
        if (lit && !wasLit) waveStart = now;
        wasLit = lit;
        kick = Math.max(0, kick - dt * 3);
        const u = core.userData;
        // El emblema gira despacio para mostrar su volumen; cada dato que llega lo enciende un instante
        u.emblem.rotation.y = 0;
        u.emblem.rotation.x = 0;
        u.emblem.rotation.z = 0;

        u.metal.emissiveIntensity = 0.08 + litAmount * 0.22 + kick * 0.35;
        u.star.material.opacity = 0.2 + litAmount * 0.2 + kick * 0.15;
        u.star.scale.setScalar(14 + litAmount * 6 + kick * 5);
        // Súper agente: crece y se vuelve más denso y brillante a medida que recibe más áreas;
        // cada dato que llega dispara una descarga por la red neuronal
        const eng = u.emblem.userData.engine;
        const fed = rs.length ? rs.filter(r => r >= 1).length / rs.length : 0;
        eng.grow += ((0.7 + 0.45 * fed) - eng.grow) * 0.05;
        u.emblem.scale.setScalar(u.emblem.userData.base * eng.grow * (1 + kick * 0.07));
        eng.net.rotation.y = clock * (0.18 + 0.25 * fed);
        eng.net.rotation.x = 0.25 * Math.sin(clock * 0.3);
        eng.shell.rotation.x = clock * 0.7; eng.shell.rotation.y = clock * 1.1;
        eng.heart.scale.setScalar(1 + 0.15 * Math.sin(clock * 4) + kick * 0.4 + fed * 0.25);
        eng.synMat.opacity = 0.14 + 0.24 * fed + kick * 0.22;
        eng.neuronMat.opacity = 0.4 + 0.35 * fed + kick * 0.12;
        eng.neuronMat.size = 1.7 + fed * 0.7 + kick * 0.5;
        const live = 4 + Math.round(fed * (eng.sparks.length - 4));
        eng.sparks.forEach((sp, k) => {
          sp.s.visible = k < live;
          if (!sp.s.visible) return;
          sp.t += dt * sp.v * (1 + kick);
          if (sp.t >= 1) { sp.t = 0; sp.e = sp.e[1] !== undefined ? [sp.e[1], (sp.e[1] * 17 + k * 7) % eng.nodesPos.length] : sp.e; }
          const a0 = eng.nodesPos[sp.e[0]], a1 = eng.nodesPos[sp.e[1]];
          sp.s.position.copy(a0).lerp(a1, sp.t);
        });
        u.light.intensity = 0.8 + litAmount * 1.6 + kick * 1.2;
        u.halo.material.opacity = 0.12 + litAmount * 0.25 + kick * 0.15;
        u.halo.scale.setScalar(26 + litAmount * 10 + kick * 4);
        // Al conectar todo, el súper agente descarga energía hacia el centro de la mina; al tocar el suelo nace la onda
        if (shot) {
          if (waveStart >= 0 && shot.start < 0) shot.start = now;
          if (!lit) { shot.start = -1; shot.hit = -1; }
          const FLY = 900;
          const ft = shot.start < 0 ? -1 : (now - shot.start) / FLY;
          const flying = ft >= 0 && ft < 1;
          const from = core.position, to = shot.impactAt;
          const ease = k => Math.max(0, Math.min(1, k * k * (3 - 2 * k)));
          const along = (k, out) => out.copy(from).lerp(to, ease(k));
          const axis = tan.copy(to).sub(from).normalize();
          const side = tmpV2.set(-axis.z, 0, axis.x).normalize(), up2 = tmpV3.crossVectors(axis, side).normalize();
          shot.bolt.visible = flying;
          if (flying) {
            along(ft, shot.bolt.position);
            const pulse = 1 + 0.25 * Math.sin(now * 0.04);
            shot.plasmaOuter.scale.setScalar(16 * pulse);
            shot.plasmaInner.scale.setScalar(5 * (2 - pulse));
          }
          // Chispas que giran en espiral alrededor de la trayectoria y se apagan detrás de la esfera
          shot.trail.forEach((s, k) => {
            const tk = ft - k * 0.022;
            const on = flying && tk > 0;
            s.material.opacity = on ? 0.85 * (1 - k / shot.trail.length) : 0;
            s.visible = on;
            if (!on) return;
            along(tk, s.position);
            const ang = now * 0.018 + k * 0.9, rad = 1.2 + k * 0.12;
            s.position.addScaledVector(side, Math.cos(ang) * rad).addScaledVector(up2, Math.sin(ang) * rad);
          });
          // Haz continuo del súper agente a la esfera; tras el impacto se desvanece en un instante
          const after = shot.hit < 0 ? 0 : (now - shot.hit) / 450;
          const rayOn = flying || (shot.hit >= 0 && after < 1);
          shot.ray.visible = rayOn;
          if (rayOn) {
            const head = flying ? along(ft, tmpV4) : tmpV4.copy(to);
            const len = from.distanceTo(head);
            shot.ray.position.copy(from);
            shot.ray.quaternion.setFromUnitVectors(UP, tmpV5.copy(head).sub(from).normalize());
            shot.ray.scale.set(1, Math.max(0.01, len), 1);
            const fade = flying ? 1 : 1 - after;
            const shimmer = 0.85 + 0.15 * Math.sin(now * 0.03);
            shot.rayCore.material.opacity = 0.9 * fade * shimmer;
            shot.rayHalo.material.opacity = 0.35 * fade;
            shot.flow.forEach((s, k) => {
              const f = (now * 0.0022 + k / shot.flow.length) % 1;
              s.position.copy(from).lerp(head, f);
              s.material.opacity = 0.8 * fade * Math.sin(f * Math.PI);
              s.visible = s.material.opacity > 0;
            });
          } else shot.flow.forEach(s => { s.material.opacity = 0; s.visible = false; });
          if (ft >= 1 && shot.hit < 0) { shot.hit = now; kick = 1; }
          const bt = shot.hit < 0 ? 1 : (now - shot.hit) / 900;
          shot.blast.position.copy(to);
          shot.blast.scale.setScalar(6 + bt * 60);
          shot.blast.material.opacity = bt < 1 ? 0.9 * (1 - bt) : 0;
          shot.blast.visible = bt < 1;
        }
        u.beam.material.opacity = 0;
        u.beam.visible = false;

        // Operación 24/7: el reloj de mina avanza (4 segundos = 1 hora) y la luz pasa de día a noche
        const hours = (6.5 + clock * 0.25) % 24;
        const sun = Math.sin((hours - 6) / 24 * Math.PI * 2);
        const day = Math.min(1, Math.max(0, (sun + 0.15) / 0.5));
        ambient.intensity = 0.28 + 0.5 * day;
        keyLight.intensity = 0.2 + 0.9 * day;
        keyLight.position.set(Math.cos((hours - 6) / 24 * Math.PI * 2) * 200, 40 + Math.max(0, sun) * 160, 80);
        // Lo que tiene opacidad 0 no se dibuja (no escribe profundidad: misma imagen)
        nightLights.forEach(l => { l.m.material.opacity = (1 - day) * l.max; l.m.visible = day < 1; });
        windows.forEach(c => { c.material.opacity = 0.35 + (1 - day) * 0.55; });
        // Luz natural: el horizonte y la luz sobre la mina cambian con la hora (amanecer, día, atardecer, noche)
        const k = SKY.findIndex((s, i) => i < SKY.length - 1 && hours >= s[0] && hours < SKY[i + 1][0]);
        const a0 = SKY[k], a1 = SKY[k + 1], f = (hours - a0[0]) / (a1[0] - a0[0]);
        skyTop.setHex(a0[1]).lerp(tmpC.setHex(a1[1]), f);
        skyColor.setHex(a0[2]).lerp(tmpC.setHex(a1[2]), f);
        keyLight.color.setHex(a0[3]).lerp(tmpC.setHex(a1[3]), f);
        scene.fog.color.copy(skyColor).lerp(skyTop, 0.35);
        stars.position.copy(camera.position);
        stars.material.opacity = (1 - day) * 0.7;
        stars.visible = day < 1;
        if (onClock) onClock(hours, day, skyColor, skyTop);

        const waveR = !shot || shot.hit < 0 ? -1 : (now - shot.hit) / 1000 * 110;
        terrainMats.forEach(mt => {
          mt.uniforms.uLit.value = litAmount;
          mt.uniforms.uWave.value = waveR > 280 ? -1 : waveR;
          mt.uniforms.uDay.value = day;
        });

        sync(); flight();
        renderer.render(scene, camera);
        nodes.forEach((n, i) => place(spotEls[i], n.top));
        place(hub, labelAt.copy(core.position).add(labelDrop));
      }

      stage.addEventListener('pointermove', ev => {
        const r = stage.getBoundingClientRect();
        pointer = [(ev.clientX - r.left) / r.width - 0.5, (ev.clientY - r.top) / r.height - 0.5];
        if (drag && ev.pointerType === "mouse" && !(ev.buttons & 1)) { drag = null; stage.classList.remove("is-dragging"); }
        if (drag) {
          userAz -= (ev.clientX - drag[0]) * 0.006;
          if (ev.pointerType !== "touch") userEl += (ev.clientY - drag[1]) * 0.004;
          userEl = Math.min(0.7, Math.max(-0.25, userEl));
          drag = [ev.clientX, ev.clientY];
          onInteract();
        }
      });
      // Girar el mapa: arrastrar con el mouse o el dedo
      stage.addEventListener("pointerdown", ev => {
        if (ev.target.closest("button, a, .spot")) return;
        drag = [ev.clientX, ev.clientY];
        stage.classList.add("is-dragging");
      });
      const endDrag = () => { drag = null; stage.classList.remove("is-dragging"); };
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
      return { build, resize, render, adapt, busy: () => building };
    }

    let forceFrame = false;
    const clockEl = document.getElementById("intro-clock");
    let lastMinute = -1, lastSky = '';
    const clockHand = document.getElementById("clock-hand"), clockTime = document.getElementById("clock-time"), clockShift = document.getElementById("clock-shift");
    S3 = create3D(() => { forceFrame = true; }, (h, day, sky, top) => {
      // El degradado del cielo solo se reescribe si cambió: cada escritura repinta todo el fondo de la portada
      const skyBg = `linear-gradient(to bottom, #${top.getHexString()} 0%, #${sky.getHexString()} 42%, #020812 100%)`;
      if (skyBg !== lastSky) intro.style.backgroundImage = lastSky = skyBg;
      clockHand.setAttribute("transform", `rotate(${(h / 24) * 360} 32 32)`);
      const minute = Math.floor(h * 60);
      if (minute === lastMinute) return;
      lastMinute = minute;
      const hh = String(Math.floor(h)).padStart(2, "0"), mm = String(minute % 60).padStart(2, "0");
      const dayShift = h >= 7 && h < 19;
      clockTime.textContent = `${hh}:${mm}`;
      clockShift.textContent = dayShift ? "Guardia día" : "Guardia noche";
      clockEl.classList.toggle("is-night", !dayShift);
    });
    // La escena se construye por partes tras el primer pintado: hasta entonces se ve el fondo, y aparece con el desvanecido de siempre
    function built3D() { sceneReady = true; introFrame(); intro.classList.remove('is-swapping'); hub.style.opacity = ''; }
    sceneReady = !S3;   // sin WebGL el avance arranca de inmediato
    if (S3) { intro.classList.add('is-swapping'); hub.style.opacity = '0'; }
    buildSpots();
    introLayout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(introLayout);
    requestAnimationFrame(introLoop);

    /* Reloj de la barra (hora de Lima) */
    const clock = document.getElementById('clock');
    const fmt = new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Lima' });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 15000);

    /* Menú en pantallas angostas */
    const menuBtn = document.querySelector('.bar__menu');
    const drop = document.getElementById('drop');
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') !== 'true';
      menuBtn.setAttribute('aria-expanded', String(open));
      drop.dataset.open = String(open);
    });
    drop.addEventListener('click', e => { if (e.target.closest('a')) { menuBtn.setAttribute('aria-expanded', 'false'); drop.dataset.open = 'false'; } });

    /* Modales legales */
    document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.open).showModal()));
    document.querySelectorAll('dialog').forEach(d => {
      d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
    });

    /* Formulario: prepara el correo hacia comercial@agentraxperu.com */
    document.getElementById('contact-form').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const name = document.getElementById('name').value;
      const company = document.getElementById('company').value;
      const email = document.getElementById('email').value;
      const industry = document.getElementById('industry').value;
      const message = document.getElementById('message').value;

      const subject = encodeURIComponent(`[CONSULTA B2B AGENTRAX] ${company} - ${name}`);
      const body = encodeURIComponent(
        `Estimado Equipo de AGENTRAX S.A.C.,\n\n` +
        `Remito solicitud de demostración y evaluación de factibilidad técnica:\n` +
        `• Nombre y Cargo: ${name}\n` +
        `• Empresa: ${company}\n` +
        `• Correo Corporativo: ${email}\n` +
        `• Sector Industrial: ${industry}\n\n` +
        `Requerimiento:\n${message}\n\n` +
        `Atentamente,\n${name}`
      );
      document.getElementById('form-feedback').hidden = false;
      setTimeout(() => {
        window.location.href = `mailto:comercial@agentraxperu.com?subject=${subject}&body=${body}`;
      }, 600);
    });
