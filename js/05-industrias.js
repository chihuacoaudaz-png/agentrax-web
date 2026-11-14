  /* Industrias en 3D: la torre de control (súper agente) al centro y una maqueta por industria a su alrededor.
     Al elegir una industria la maqueta gira para traerla al frente; si nadie elige, recorre sola. */
  (() => {
    const box = document.getElementById('indc'), canvas = document.getElementById('ind-canvas'), labelsEl = document.getElementById('ind-labels');
    if (!box || !canvas || !window.THREE) return;
    const T = window.THREE, still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const IND = [
      { k: 'mineria', name: 'Minería', main: true, line: 'Nuestro origen: operación, planta, mantenimiento y seguridad en una sola torre de control.', chips: ['Operación', 'Planta', 'Mantenimiento', 'Seguridad', 'Geotecnia'] },
      { k: 'civil', name: 'Ingeniería civil', line: 'Obras, avance, costos y cuadrillas conectados en una sola vista.', chips: ['Obras', 'Avance', 'Costos', 'Cuadrillas'] },
      { k: 'electrica', name: 'Energía eléctrica', line: 'Redes, mantenimiento y equipos de campo, siempre a la vista.', chips: ['Redes', 'Mantenimiento', 'Equipos de campo'] },
      { k: 'publicidad', name: 'Publicidad y marketing', line: 'Campañas, clientes y producción, medidos en un solo lugar.', chips: ['Campañas', 'Clientes', 'Producción'] },
      { k: 'comercio', name: 'Comercio', line: 'Ventas, inventario y logística conectados para decidir a tiempo.', chips: ['Ventas', 'Inventario', 'Logística'] },
      { k: 'salud', name: 'Salud', line: 'Atención, citas e insumos coordinados entre áreas.', chips: ['Atención', 'Citas', 'Insumos'] },
      { k: 'muni', name: 'Municipalidades', line: 'Trámites, obras y servicios al vecino en una sola torre de control.', chips: ['Trámites', 'Obras', 'Servicios'] },
      { k: 'estado', name: 'Sector público', line: 'Procesos, indicadores y seguimiento de gestión en un solo tablero.', chips: ['Procesos', 'Indicadores', 'Seguimiento'] }
    ];

    // Etiquetas, lista y ficha: se crean al cargar (no dependen de la escena y así el diseño no salta)
    const labels = IND.map((d, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'indc__lbl' + (d.main ? ' is-main' : '');
      b.innerHTML = (d.main ? '<small>Nuestra especialidad</small>' : '') + d.name;
      b.style.visibility = 'hidden';
      b.addEventListener('click', () => { stop(); show(i); });
      labelsEl.appendChild(b); return b;
    });

    // Nombre del producto sobre la torre
    const coreLbl = document.createElement('div'); coreLbl.className = 'indc__core-lbl'; coreLbl.innerHTML = 'AITI<small>Agente IA</small>'; labelsEl.appendChild(coreLbl);

    // Selección
    const nameEl = document.getElementById('ind-name'), lineEl = document.getElementById('ind-line'), chipsEl = document.getElementById('ind-chips'), badge = document.getElementById('ind-badge'), info = box.querySelector('.indc__info');
    const list = document.createElement('div'); list.className = 'indc__list';
    IND.forEach((d, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = d.name; b.addEventListener('click', () => { stop(); show(i); }); list.appendChild(b); d.btn = b; });
    info.before(list);
    let cur = 0, targetRot = 0, rot = 0, auto = !still, timer = 0, visible = false, raf = 0, last = 0, time = 0, dirty = false;
    let frame = null, paint = null;   // existen cuando la escena ya se creó
    function show(i) {
      cur = i;
      targetRot = -(i / IND.length * Math.PI * 2);
      let diff = targetRot - rot; diff = Math.atan2(Math.sin(diff), Math.cos(diff)); targetRot = rot + diff;
      labels.forEach((b, k) => b.classList.toggle('is-on', k === i));
      IND.forEach((d, k) => d.btn.classList.toggle('is-on', k === i));
      const d = IND[i];
      nameEl.textContent = d.name; lineEl.textContent = d.line; badge.hidden = !d.main;
      chipsEl.innerHTML = d.chips.map(c => `<li>${c}</li>`).join('');
      info.classList.remove('is-swap'); void info.offsetWidth; info.classList.add('is-swap');
      if (still) rot = targetRot;
      if (paint) paint();
      kick();
    }
    const stop = () => { auto = false; clearInterval(timer); timer = 0; };
    function kick() {
      if (!frame || raf) return;
      if (document.hidden) { dirty = true; return; }
      dirty = false; last = 0; raf = requestAnimationFrame(frame);
    }
    function sync() {
      clearInterval(timer); timer = 0;
      if (visible && auto && !document.hidden) timer = setInterval(() => show((cur + 1) % IND.length), 4200);
      if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; dirty = true; } }
      else if (visible || dirty) kick();
    }

    // La escena (y su contexto WebGL) se crea solo cuando la sección está a una pantalla o menos
    function init() {
      // Escena
      let renderer;
      try {
        renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch (e) {
        labels.forEach(b => { b.style.visibility = ''; });
        return;
      }
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(32, 16 / 9, 0.1, 200);
      scene.add(new T.AmbientLight(0x9fb0c8, 0.65));
      const key = new T.DirectionalLight(0xffffff, 0.85); key.position.set(8, 16, 10); scene.add(key);
      const coreLight = new T.PointLight(0x38bdf8, 1.6, 26, 2); coreLight.position.set(0, 3.2, 0); scene.add(coreLight);
      const world = new T.Group(); scene.add(world);

      const mat = (color, o) => new T.MeshStandardMaterial(Object.assign({ color, metalness: 0.35, roughness: 0.5 }, o || {}));
      const BODY = mat(0xd8dee8), DARK = mat(0x1c2a44), MID = mat(0x3a5683), GLASS = mat(0x38bdf8, { emissive: 0x0b5aa8, emissiveIntensity: 0.6, metalness: 0.2, roughness: 0.2 });
      const AMBER = mat(0xf3b35c, { emissive: 0x6b3d05, emissiveIntensity: 0.4 }), ORE = mat(0x6b7b94, { roughness: 0.95, metalness: 0 });
      const edgeMat = new T.LineBasicMaterial({ color: 0x9fe2ff, transparent: true, opacity: 0.45 });
      function part(grp, geo, m, x, y, z, edges) {
        const mesh = new T.Mesh(geo, m); mesh.position.set(x, y, z); grp.add(mesh);
        if (edges !== false) mesh.add(new T.LineSegments(new T.EdgesGeometry(geo, 25), edgeMat));
        return mesh;
      }
      const lines = (grp, pts, color, op) => { const g = new T.BufferGeometry().setFromPoints(pts.map(p => new T.Vector3(p[0], p[1], p[2]))); const l = new T.LineSegments(g, new T.LineBasicMaterial({ color: color || 0xe6ecf5, transparent: true, opacity: op || 0.85 })); grp.add(l); return l; };

      // Maquetas de cada industria (sobre su plataforma, unidades ~ 2 de radio)
      const MODELS = {
        mineria(g) {
          const levels = 4;
          for (let k = 0; k < levels; k++) {
            const rO = 1.9 - k * 0.42, rI = rO - 0.28, y = 0.62 - k * 0.15;
            const ring = new T.Mesh(new T.RingGeometry(rI, rO, 40), mat(k % 2 ? 0x5b7fb0 : 0x6f8fc0, { side: T.DoubleSide, roughness: 0.9, metalness: 0 })); ring.rotation.x = -Math.PI / 2; ring.position.y = y; g.add(ring);
            const wall = new T.Mesh(new T.CylinderGeometry(rI, rI, 0.15, 40, 1, true), mat(0x1d3e78, { side: T.BackSide, roughness: 0.9 })); wall.position.y = y - 0.075; g.add(wall);
            const crest = new T.LineLoop(new T.BufferGeometry().setFromPoints(Array.from({ length: 41 }, (_, i) => new T.Vector3(Math.cos(i / 40 * Math.PI * 2) * rO, y + 0.01, Math.sin(i / 40 * Math.PI * 2) * rO))), new T.LineBasicMaterial({ color: 0xbfeaff, transparent: true, opacity: 0.5 })); g.add(crest);
          }
          const water = new T.Mesh(new T.CircleGeometry(0.38, 28), mat(0x38bdf8, { emissive: 0x0b5aa8, emissiveIntensity: 0.7 })); water.rotation.x = -Math.PI / 2; water.position.y = 0.03; g.add(water);
          const rim = new T.Mesh(new T.RingGeometry(1.9, 2.25, 40), mat(0x2c548f, { side: T.DoubleSide, roughness: 0.9, metalness: 0 })); rim.rotation.x = -Math.PI / 2; rim.position.y = 0.62; g.add(rim);
          const bank = new T.Mesh(new T.CylinderGeometry(2.25, 2.3, 0.62, 40, 1, true), mat(0x173468, { roughness: 0.9 })); bank.position.y = 0.31; g.add(bank);
          const dump = new T.Mesh(new T.ConeGeometry(0.5, 0.45, 5), mat(0x4a76b8, { roughness: 0.9, metalness: 0 })); dump.position.set(-1.6, 0.85, -1.2); g.add(dump);
          const truck = new T.Group(); truck.position.set(1.95, 0.62, 0.5); truck.rotation.y = 0.4; g.add(truck);
          part(truck, new T.BoxGeometry(0.5, 0.12, 0.26), DARK, 0, 0.1, 0);
          part(truck, new T.BoxGeometry(0.34, 0.16, 0.28), AMBER, -0.06, 0.24, 0);
          part(truck, new T.BoxGeometry(0.12, 0.14, 0.2), BODY, 0.2, 0.23, 0);
          g.userData.spin = truck;
        },
        civil(g) {
          const frame = new T.Group(); g.add(frame);
          for (let f = 0; f < 4; f++) part(frame, new T.BoxGeometry(1.4, 0.06, 1.1), f === 3 ? MID : BODY, -0.3, 0.35 + f * 0.42, 0);
          [[-0.95, -0.5], [0.35, -0.5], [-0.95, 0.5], [0.35, 0.5]].forEach(([x, z]) => part(frame, new T.BoxGeometry(0.07, 1.7, 0.07), DARK, x, 1.0, z, false));
          part(frame, new T.BoxGeometry(1.36, 0.36, 1.06), GLASS, -0.3, 0.56, 0, false).material = mat(0x38bdf8, { transparent: true, opacity: 0.35, emissive: 0x0b5aa8, emissiveIntensity: 0.6 });
          const mast = []; for (let y = 0.3; y < 2.7; y += 0.2) mast.push([1.05, y, -0.08], [1.25, y + 0.2, 0.08], [1.25, y, -0.08], [1.05, y + 0.2, 0.08]);
          mast.push([1.05, 0.3, -0.08], [1.05, 2.7, -0.08], [1.25, 0.3, 0.08], [1.25, 2.7, 0.08]);
          lines(g, mast, 0xf3b35c, 0.95);
          part(g, new T.BoxGeometry(2.4, 0.08, 0.1), AMBER, 0.55, 2.72, 0);
          part(g, new T.BoxGeometry(0.28, 0.22, 0.24), DARK, 1.6, 2.6, 0);
          lines(g, [[-0.4, 2.7, 0], [-0.4, 2.0, 0]], 0xe6ecf5, 0.8);
          const hook = part(g, new T.BoxGeometry(0.16, 0.12, 0.16), AMBER, -0.4, 1.95, 0); g.userData.bob = hook;
        },
        electrica(g) {
          const tower = (x, z, h) => {
            const w = 0.42, top = 0.08, segs = [];
            const c = y => w + (top - w) * y / h;
            [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => segs.push([x + sx * w, 0.2, z + sz * w], [x + sx * top, 0.2 + h, z + sz * top]));
            for (let y = 0; y < h - 0.01; y += h / 6) {
              const a = c(y), b = c(y + h / 6);
              segs.push([x - a, 0.2 + y, z - a], [x + b, 0.2 + y + h / 6, z - b], [x + a, 0.2 + y, z - a], [x - b, 0.2 + y + h / 6, z - b]);
              segs.push([x - a, 0.2 + y, z + a], [x + b, 0.2 + y + h / 6, z + b], [x + a, 0.2 + y, z + a], [x - b, 0.2 + y + h / 6, z + b]);
            }
            [0.72, 0.88].forEach(f => segs.push([x - 0.6, 0.2 + h * f, z], [x + 0.6, 0.2 + h * f, z]));
            lines(g, segs, 0xe6ecf5, 0.9);
            return [[x - 0.6, 0.2 + h * 0.72, z], [x + 0.6, 0.2 + h * 0.72, z], [x - 0.6, 0.2 + h * 0.88, z], [x + 0.6, 0.2 + h * 0.88, z]];
          };
          const a = tower(-0.7, 0.2, 2.6), b = tower(1.0, -0.6, 1.9);
          const wire = (p, q) => { const pts = []; for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push(new T.Vector3(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t - Math.sin(Math.PI * t) * 0.18, p[2] + (q[2] - p[2]) * t)); } g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 }))); };
          a.forEach((p, i) => wire(p, b[i]));
          const spark = new T.Mesh(new T.SphereGeometry(0.08, 12, 12), new T.MeshBasicMaterial({ color: 0xe6f6ff })); g.add(spark);
          g.userData.wire = { spark, p: a[2], q: b[2] };
        },
        publicidad(g) {
          [[-0.6], [0.6]].forEach(([x]) => part(g, new T.BoxGeometry(0.1, 1.4, 0.1), DARK, x, 0.85, 0, false));
          part(g, new T.BoxGeometry(2.2, 1.2, 0.14), DARK, 0, 1.95, 0);
          const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
          const grd = x.createLinearGradient(0, 0, 256, 128); grd.addColorStop(0, '#0058C4'); grd.addColorStop(1, '#38bdf8'); x.fillStyle = grd; x.fillRect(0, 0, 256, 128);
          x.fillStyle = 'rgba(255,255,255,.9)'; x.fillRect(20, 26, 120, 14); x.fillRect(20, 52, 86, 10); x.fillStyle = '#f3b35c'; x.fillRect(20, 84, 56, 22);
          x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 5; x.beginPath(); x.moveTo(160, 100); x.lineTo(185, 70); x.lineTo(205, 82); x.lineTo(236, 36); x.stroke();
          const tex = new T.CanvasTexture(c);
          const screen = new T.Mesh(new T.PlaneGeometry(2.04, 1.04), new T.MeshBasicMaterial({ map: tex })); screen.position.set(0, 1.95, 0.075); g.add(screen);
          const back = screen.clone(); back.rotation.y = Math.PI; back.position.z = -0.075; g.add(back);
          g.userData.glow = screen;
        },
        comercio(g) {
          part(g, new T.BoxGeometry(2.0, 1.0, 1.3), BODY, 0, 0.7, -0.1);
          part(g, new T.BoxGeometry(2.1, 0.12, 1.4), DARK, 0, 1.26, -0.1);
          for (let i = 0; i < 6; i++) { const s = part(g, new T.BoxGeometry(0.34, 0.06, 0.5), i % 2 ? BODY : mat(0x0058C4), -0.85 + i * 0.34, 1.05, 0.72, false); s.rotation.x = 0.45; }
          part(g, new T.BoxGeometry(1.5, 0.5, 0.04), GLASS, 0, 0.62, 0.56, false);
          [[1.25, 0.4], [1.25, 0.1], [1.45, 0.25]].forEach(([x, z], i) => part(g, new T.BoxGeometry(0.28, 0.28, 0.28), AMBER, x, 0.34 + (i === 2 ? 0.28 : 0), z));
        },
        salud(g) {
          part(g, new T.BoxGeometry(1.1, 2.0, 1.0), BODY, -0.2, 1.2, 0);
          part(g, new T.BoxGeometry(1.0, 1.0, 1.0), BODY, 0.85, 0.7, 0.1);
          for (let f = 0; f < 4; f++) part(g, new T.BoxGeometry(1.12, 0.12, 1.02), GLASS, -0.2, 0.55 + f * 0.42, 0, false);
          const cross = new T.Group(); cross.position.set(-0.2, 1.75, 0.52); g.add(cross);
          const cm = mat(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 1 });
          part(cross, new T.BoxGeometry(0.46, 0.14, 0.04), cm, 0, 0, 0, false); part(cross, new T.BoxGeometry(0.14, 0.46, 0.04), cm, 0, 0, 0, false);
          g.userData.pulse = cm;
          part(g, new T.CylinderGeometry(0.45, 0.45, 0.04, 24), mat(0xf3b35c), -0.2, 2.24, 0, false);
        },
        muni(g) {
          part(g, new T.BoxGeometry(2.2, 0.16, 1.3), MID, 0, 0.28, 0);
          part(g, new T.BoxGeometry(2.0, 0.9, 1.0), BODY, 0, 0.8, -0.1);
          for (let i = 0; i < 6; i++) part(g, new T.CylinderGeometry(0.06, 0.06, 0.8, 10), BODY, -0.8 + i * 0.32, 0.76, 0.48, false);
          const ped = new T.Mesh(new T.CylinderGeometry(0.01, 1.1, 0.36, 3, 1), BODY); ped.rotation.y = Math.PI / 6; ped.scale.set(1, 1, 0.5); ped.position.set(0, 1.42, 0.25); g.add(ped);
          part(g, new T.BoxGeometry(0.44, 1.0, 0.44), BODY, 0, 1.75, -0.2);
          const clock = new T.Mesh(new T.CircleGeometry(0.15, 24), mat(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.8 })); clock.position.set(0, 1.95, 0.025); g.add(clock);
          const hand = part(g, new T.BoxGeometry(0.02, 0.12, 0.01), DARK, 0, 1.95, 0.04, false); hand.geometry.translate(0, 0.05, 0); g.userData.hand = hand;
          part(g, new T.ConeGeometry(0.34, 0.4, 4), DARK, 0, 2.45, -0.2).rotation.y = Math.PI / 4;
        },
        estado(g) {
          part(g, new T.BoxGeometry(2.3, 0.16, 1.4), MID, 0, 0.28, 0);
          part(g, new T.BoxGeometry(2.1, 0.8, 1.0), BODY, 0, 0.76, -0.1);
          for (let i = 0; i < 7; i++) part(g, new T.CylinderGeometry(0.05, 0.05, 0.7, 10), BODY, -0.9 + i * 0.3, 0.71, 0.46, false);
          part(g, new T.CylinderGeometry(0.42, 0.46, 0.3, 24), BODY, 0, 1.31, -0.1);
          part(g, new T.SphereGeometry(0.42, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat(0x38bdf8, { emissive: 0x0b5aa8, emissiveIntensity: 0.6, metalness: 0.6, roughness: 0.25 }), 0, 1.46, -0.1);
          part(g, new T.CylinderGeometry(0.02, 0.02, 0.8, 6), DARK, 0, 2.2, -0.1, false);
          const flag = new T.Mesh(new T.PlaneGeometry(0.42, 0.26, 6, 1), new T.MeshBasicMaterial({ color: 0xe11d48, side: T.DoubleSide }));
          flag.geometry.translate(0.21, 0, 0); flag.position.set(0.02, 2.46, -0.1); g.add(flag);
          const stripe = new T.Mesh(new T.PlaneGeometry(0.14, 0.26), new T.MeshBasicMaterial({ color: 0xffffff, side: T.DoubleSide })); stripe.position.set(0.21, 0, 0.002); flag.add(stripe);
          g.userData.flag = flag;
        }
      };

      // Plataformas en círculo
      const R = 11.2, tiles = [];
      IND.forEach((d, i) => {
        const a = i / IND.length * Math.PI * 2;
        const g = new T.Group(); g.position.set(Math.sin(a) * R, 0, Math.cos(a) * R); g.rotation.y = a; world.add(g);
        const base = new T.Mesh(new T.CylinderGeometry(2.45, 2.6, 0.32, 6), mat(0x0d2550, { metalness: 0.5, roughness: 0.4 }));
        base.position.y = 0.04; g.add(base);
        const rimMat = new T.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 });
        base.add(new T.LineSegments(new T.EdgesGeometry(base.geometry), rimMat));
        const glow = new T.Mesh(new T.RingGeometry(2.55, 2.95, 6), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
        glow.rotation.x = -Math.PI / 2; glow.rotation.z = Math.PI / 6; glow.position.y = 0.22; g.add(glow);
        const model = new T.Group(); model.position.y = 0.2; model.rotation.y = -0.35; g.add(model);
        MODELS[d.k](model);
        if (d.main) g.scale.setScalar(1.15);
        tiles.push({ g, base, rimMat, glow, model, a, d });
      });

      // Torre de control al centro: podio tecnológico de tres niveles y esfera neuronal
      const podium = new T.Group(); world.add(podium);
      const tierMat = mat(0x0d2550, { metalness: 0.6, roughness: 0.35 }), tierEdge = new T.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
      [[3.1, 3.4, 0.4, 0.2, 6], [2.3, 2.6, 0.5, 0.65, 6], [1.3, 1.5, 1.1, 1.45, 24]].forEach(([rt, rb, h, y, s]) => {
        const m = new T.Mesh(new T.CylinderGeometry(rt, rb, h, s), tierMat); m.position.y = y; podium.add(m);
        m.add(new T.LineSegments(new T.EdgesGeometry(m.geometry, 20), tierEdge));
      });
      // Bandas de energía alrededor del núcleo
      const bands = [1.15, 1.45, 1.75].map(y => { const b = new T.Mesh(new T.TorusGeometry(1.42, 0.035, 8, 48), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85, blending: T.AdditiveBlending })); b.rotation.x = Math.PI / 2; b.position.y = y; podium.add(b); return b; });
      // Columnas de luz en las esquinas del primer nivel
      const pillars = [];
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * Math.PI * 2 + Math.PI / 6, x = Math.sin(a) * 2.85, z = Math.cos(a) * 2.85;
        const p = new T.Mesh(new T.BoxGeometry(0.14, 1.2, 0.14), mat(0x1c2a44)); p.position.set(x, 1.0, z); podium.add(p);
        const tip = new T.Mesh(new T.BoxGeometry(0.16, 0.22, 0.16), new T.MeshBasicMaterial({ color: 0x7fd3ff })); tip.position.set(x, 1.7, z); podium.add(tip);
        pillars.push(tip);
      }
      // Anillo de datos en el piso, girando
      const ringPts = []; for (let i = 0; i <= 96; i++) { const a = i / 96 * Math.PI * 2; ringPts.push(new T.Vector3(Math.cos(a) * 3.9, 0.06, Math.sin(a) * 3.9)); }
      const dataRing = new T.Line(new T.BufferGeometry().setFromPoints(ringPts), new T.LineDashedMaterial({ color: 0x38bdf8, dashSize: 0.35, gapSize: 0.25, transparent: true, opacity: 0.9 }));
      dataRing.computeLineDistances(); podium.add(dataRing);
      const floorGlow = new T.Mesh(new T.RingGeometry(3.4, 4.6, 64), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.18, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
      floorGlow.rotation.x = -Math.PI / 2; floorGlow.position.y = 0.03; podium.add(floorGlow);
      // Haz de energía del podio a la esfera
      const beamUp = new T.Mesh(new T.CylinderGeometry(0.22, 0.6, 2.2, 24, 1, true), new T.MeshBasicMaterial({ color: 0x7fd3ff, transparent: true, opacity: 0.35, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
      beamUp.position.y = 3.1; podium.add(beamUp);
      const orb = new T.Group(); orb.position.y = 4.6; scene.add(orb);
      // Paneles holográficos con datos que orbitan alrededor del súper agente
      const holoTex = (kind) => {
        const c = document.createElement('canvas'); c.width = 128; c.height = 80; const x = c.getContext('2d');
        x.fillStyle = 'rgba(10,40,90,0.65)'; x.fillRect(0, 0, 128, 80); x.strokeStyle = 'rgba(127,211,255,0.9)'; x.lineWidth = 2; x.strokeRect(1, 1, 126, 78);
        x.fillStyle = 'rgba(191,234,255,0.9)'; x.fillRect(10, 10, 50, 6);
        if (kind === 0) { x.beginPath(); x.moveTo(10, 64); [[30, 48], [50, 54], [72, 34], [94, 40], [118, 22]].forEach(([a, b]) => x.lineTo(a, b)); x.stroke(); }
        if (kind === 1) { [20, 34, 26, 44, 38].forEach((h, i) => { x.fillStyle = i === 2 ? '#f3b35c' : '#38bdf8'; x.fillRect(12 + i * 22, 70 - h, 14, h); }); }
        if (kind === 2) { x.lineWidth = 7; x.strokeStyle = '#1c2b4a'; x.beginPath(); x.arc(64, 46, 20, 0, Math.PI * 2); x.stroke(); x.strokeStyle = '#38bdf8'; x.beginPath(); x.arc(64, 46, 20, -Math.PI / 2, Math.PI * 1.1); x.stroke(); }
        return new T.CanvasTexture(c);
      };
      const holos = [0, 1, 2].map(k => { const p = new T.Mesh(new T.PlaneGeometry(1.5, 0.94), new T.MeshBasicMaterial({ map: holoTex(k), transparent: true, opacity: 0.9, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending })); scene.add(p); return p; });
      const NN = 90, npts = [];
      for (let k = 0; k < NN; k++) { const y = 1 - k / (NN - 1) * 2, r = Math.sqrt(1 - y * y), th = k * 2.399963; npts.push(new T.Vector3(Math.cos(th) * r * 1.6, y * 1.6, Math.sin(th) * r * 1.6)); }
      const seg = [];
      npts.forEach((p, i) => npts.map((q, j) => [j, p.distanceToSquared(q)]).filter(([j]) => j > i).sort((x, y) => x[1] - y[1]).slice(0, 3).forEach(([j]) => seg.push(p, npts[j])));
      orb.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(seg), new T.LineBasicMaterial({ color: 0x5fc8ff, transparent: true, opacity: 0.45, blending: T.AdditiveBlending, depthWrite: false })));
      orb.add(new T.Points(new T.BufferGeometry().setFromPoints(npts), new T.PointsMaterial({ color: 0xbfeaff, size: 0.12, transparent: true, opacity: 0.95 })));
      const heart = new T.Mesh(new T.SphereGeometry(0.42, 24, 24), new T.MeshStandardMaterial({ color: 0x9fe2ff, emissive: 0x2f8cff, emissiveIntensity: 1.2 })); orb.add(heart);
      const knot = new T.Mesh(new T.TorusKnotGeometry(0.75, 0.04, 120, 6, 3, 5), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7, blending: T.AdditiveBlending })); orb.add(knot);
      const haloC = document.createElement('canvas'); haloC.width = haloC.height = 64; const hx = haloC.getContext('2d'), hg = hx.createRadialGradient(32, 32, 0, 32, 32, 32);
      hg.addColorStop(0, 'rgba(120,200,255,0.9)'); hg.addColorStop(1, 'rgba(56,189,248,0)'); hx.fillStyle = hg; hx.fillRect(0, 0, 64, 64);
      const haloTex = new T.CanvasTexture(haloC);
      const halo = new T.Sprite(new T.SpriteMaterial({ map: haloTex, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false })); halo.scale.setScalar(6.5); orb.add(halo);

      // Haces de datos: de cada plataforma a la torre, con pulsos que viajan
      const beams = tiles.map(t => {
        const from = new T.Vector3(t.g.position.x * 0.74, 0.5, t.g.position.z * 0.74), to = new T.Vector3(0, 4.0, 0);
        const mid = from.clone().lerp(to, 0.5); mid.y += 1.4;
        const curve = new T.QuadraticBezierCurve3(from, mid, to);
        const tube = new T.Mesh(new T.TubeGeometry(curve, 40, t.d.main ? 0.06 : 0.035, 6, false), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35, blending: T.AdditiveBlending, depthWrite: false }));
        world.add(tube);
        const n = t.d.main ? 3 : 2, pulses = Array.from({ length: n }, (_, k) => ({ o: k / n }));
        return { curve, tube, pulses };
      });
      // Pulsos: un solo grupo de puntos con el tamaño exacto que tenían los sprites (0.5 de lado)
      let np = 0; beams.forEach(b => b.pulses.forEach(p => { p.i = np++; }));
      const pulseGeo = new T.BufferGeometry();
      pulseGeo.setAttribute('position', new T.BufferAttribute(new Float32Array(np * 3), 3));
      pulseGeo.setAttribute('color', new T.BufferAttribute(new Float32Array(np * 4).fill(1), 4));
      const pulsePts = new T.Points(pulseGeo, new T.PointsMaterial({ map: haloTex, color: 0xe6f6ff, size: 0.5 / Math.tan(T.MathUtils.degToRad(camera.fov / 2)), vertexColors: true, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
      pulsePts.frustumCulled = false; world.add(pulsePts);
      const pulsePos = pulseGeo.attributes.position, pulseCol = pulseGeo.attributes.color;

      /* Fusión de piezas por material (versión corta de fuse/mergeGeo de la portada).
         Las piezas fijas de las 8 plataformas van juntas: cada vértice sabe de qué plataforma es (aTile) y el
         sombreador le aplica el cambio de su plataforma (escala y altura de la elegida) respecto del momento de la fusión.
         Color y opacidad de cada pieza pasan a color RGBA por vértice. */
      const sig = (o, m) => [o.isMesh ? 'M' : 'L', m.type, m.side, m.transparent, m.blending, m.depthWrite, m.depthTest, m.metalness, m.roughness,
        m.emissive ? m.emissive.getHex() : '', m.emissiveIntensity, m.map ? m.map.uuid : ''].join('|');
      const rel = (o, a) => new T.Matrix4().copy(a.matrixWorld).invert().multiply(o.matrixWorld);
      function merge(list, tile) {
        const o0 = list[0].o, mesh = !!o0.isMesh, nrm = mesh && !o0.material.isMeshBasicMaterial, uv = !!o0.material.map;
        const P = [], N = [], U = [], C = [], K = [], I = [], ranges = [], v = new T.Vector3(), nm = new T.Matrix3();
        let nv = 0;
        list.forEach(({ o, mx, k }) => {
          const g = o.geometry, A = g.attributes, n = A.position.count, c = o.material.color, al = o.material.opacity;
          nm.getNormalMatrix(mx);
          for (let i = 0; i < n; i++) {
            v.fromBufferAttribute(A.position, i).applyMatrix4(mx); P.push(v.x, v.y, v.z);
            if (nrm) { v.fromBufferAttribute(A.normal, i).applyMatrix3(nm).normalize(); N.push(v.x, v.y, v.z); }
            if (uv) U.push(A.uv.getX(i), A.uv.getY(i));
            C.push(c.r, c.g, c.b, al);
            if (tile) K.push(k);
          }
          const ix = g.index ? g.index.array : null, ni = ix ? ix.length : n, at = j => nv + (ix ? ix[j] : j);
          if (!mesh && !o.isLineSegments) { for (let j = 0; j < ni - 1; j++) I.push(at(j), at(j + 1)); if (o.isLineLoop) I.push(at(ni - 1), at(0)); }
          else if (mesh && mx.determinant() < 0) for (let j = 0; j < ni; j += 3) I.push(at(j), at(j + 2), at(j + 1));
          else for (let j = 0; j < ni; j++) I.push(at(j));
          ranges.push(nv); nv += n;
        });
        ranges.push(nv);
        const geo = new T.BufferGeometry();
        geo.setAttribute('position', new T.Float32BufferAttribute(P, 3));
        if (nrm) geo.setAttribute('normal', new T.Float32BufferAttribute(N, 3));
        if (uv) geo.setAttribute('uv', new T.Float32BufferAttribute(U, 2));
        geo.setAttribute('color', new T.Float32BufferAttribute(C, 4));
        if (tile) geo.setAttribute('aTile', new T.Float32BufferAttribute(K, 1));
        geo.setIndex(I);
        return { geo, ranges };
      }
      const tileU = { value: tiles.map(() => new T.Matrix4()) };
      const tileHook = sh => {
        sh.uniforms.tileM = tileU;
        sh.vertexShader = 'attribute float aTile;\nuniform mat4 tileM[' + tileU.value.length + '];\n' + sh.vertexShader.replace('#include <begin_vertex>',
          '#include <begin_vertex>\n\ttransformed = ( tileM[ int( aTile + 0.5 ) ] * vec4( transformed, 1.0 ) ).xyz;');
      };
      // keep: conserva el material original (otro código lo anima); si no, una copia con color por vértice
      function build(list, parent, tile, keep) {
        const { geo, ranges } = merge(list, tile), m0 = list[0].o.material;
        const m = keep ? m0 : m0.clone();
        if (!keep) { m.color.setRGB(1, 1, 1); m.opacity = 1; m.vertexColors = true; }
        if (tile) m.onBeforeCompile = tileHook;
        const f = list[0].o.isMesh ? new T.Mesh(geo, m) : new T.LineSegments(geo, m);
        if (tile) f.frustumCulled = false;
        parent.add(f);
        return { f, ranges, col: geo.attributes.color };
      }
      // Libera geometrías y materiales retirados que no sigan en uso en la escena
      function disposeUnused(objs) {
        const used = new Set();
        scene.traverse(x => {
          if (x.geometry) used.add(x.geometry);
          if (x.material) used.add(x.material);
        });
        objs.forEach(o => {
          if (o.geometry && !used.has(o.geometry)) { used.add(o.geometry); o.geometry.dispose(); }
          if (o.material && !used.has(o.material)) { used.add(o.material); o.material.dispose(); }
        });
      }
      // Piezas fijas dentro de un ancla: se unen en su marco y salen de la escena (sus hijos sueltos pasan al ancla)
      function fuseLocal(a, objs) {
        a.updateMatrixWorld(true);
        const gs = new Map(), gone = new Set();
        objs.forEach(o => { const key = sig(o, o.material); if (!gs.has(key)) gs.set(key, []); gs.get(key).push({ o, mx: rel(o, a) }); });
        gs.forEach(list => { if (list.length > 1) { build(list, a, false, false); list.forEach(({ o }) => gone.add(o)); } });
        gone.forEach(o => { o.children.slice().forEach(ch => { if (!gone.has(ch)) a.attach(ch); }); o.parent.remove(o); });
        disposeUnused(gone);
      }
      world.updateMatrixWorld(true);
      // Plataformas: lo fijo de las 8 en un objeto por material. Los originales pasan a la capa 1: no se dibujan,
      // pero siguen ahí para que tocar una maqueta la seleccione igual que antes
      const tileGroups = new Map(), keepMats = new Set();
      tiles.forEach((t, k) => {
        const u = t.model.userData, skip = new Set([t.glow, t.base.children[0], u.spin, u.bob, u.hand, u.flag, u.wire && u.wire.spark]);
        if (u.pulse) keepMats.add(u.pulse);
        if (u.glow) keepMats.add(u.glow.material);
        const walk = o => {
          if (skip.has(o)) return;
          if (o.isMesh || o.isLine) {
            const key = keepMats.has(o.material) ? o.material.uuid : sig(o, o.material);
            if (!tileGroups.has(key)) tileGroups.set(key, []);
            tileGroups.get(key).push({ o, mx: rel(o, world), k });
          }
          o.children.forEach(walk);
        };
        walk(t.g);
      });
      tileGroups.forEach(list => {
        if (list.length < 2) return;
        build(list, world, true, keepMats.has(list[0].o.material));
        list.forEach(({ o }) => o.layers.set(1));
      });
      const tileList = pick => tiles.map((t, k) => { const o = pick(t); o.layers.set(1); return { o, mx: rel(o, world), k }; });
      const glowF = build(tileList(t => t.glow), world, true, false), glowA = tiles.map(() => 0);
      const rimF = build(tileList(t => t.base.children[0]), world, true, false);
      const bakeInv = tiles.map(t => t.g.matrix.clone().invert());
      // Camión de la mina (gira solo): sus piezas se unen dentro de él
      tiles.forEach(t => { const s = t.model.userData.spin; if (s) { const o = []; s.traverse(x => { if (x.isMesh || x.isLine) o.push(x); }); fuseLocal(s, o); } });
      // Podio: niveles, sus bordes y columnas son fijos
      const fixed = []; podium.children.forEach(m => { if (m.material === tierMat || (m.isMesh && pillars.indexOf(m) < 0 && bands.indexOf(m) < 0 && m.geometry.type === 'BoxGeometry')) { fixed.push(m); m.children.forEach(e => fixed.push(e)); } });
      fuseLocal(podium, fixed);
      // Piezas con un valor propio por cuadro o por selección: juntas, con su color RGBA por vértice
      const fuseOut = (objs, a) => { a.updateMatrixWorld(true); const F = build(objs.map(o => ({ o, mx: rel(o, a) })), a, false, false); objs.forEach(o => o.parent.remove(o)); disposeUnused(objs); return F; };
      const tubeF = fuseOut(beams.map(b => b.tube), world);
      const bandF = fuseOut(bands, podium);
      const tipF = fuseOut(pillars, podium);
      const setA = (F, k, a) => { const A = F.col.array; for (let i = F.ranges[k] * 4 + 3, e = F.ranges[k + 1] * 4; i < e; i += 4) A[i] = a; F.col.needsUpdate = true; };
      const setRGBA = (F, k, c, a) => { const A = F.col.array; for (let i = F.ranges[k] * 4, e = F.ranges[k + 1] * 4; i < e; i += 4) { A[i] = c.r; A[i + 1] = c.g; A[i + 2] = c.b; A[i + 3] = a; } F.col.needsUpdate = true; };
      const RIM_ON = new T.Color(0xbfeaff), RIM_OFF = new T.Color(0x38bdf8), tipC = new T.Color();

      paint = () => tiles.forEach((t, k) => { const on = k === cur; setRGBA(rimF, k, on ? RIM_ON : RIM_OFF, on ? 1 : 0.5); setA(tubeF, k, on ? 0.9 : 0.28); });

      // Arrastrar para girar la maqueta
      let drag = null;
      canvas.addEventListener('pointerdown', e => { drag = e.clientX; canvas.setPointerCapture(e.pointerId); stop(); });
      canvas.addEventListener('pointermove', e => { if (drag === null) return; targetRot += (e.clientX - drag) * 0.008; drag = e.clientX; kick(); });
      ['pointerup', 'pointercancel'].forEach(t => canvas.addEventListener(t, () => { drag = null; }));
      // Tocar una maqueta la selecciona (también las piezas originales de la capa 1)
      const ray = new T.Raycaster(), ptr = new T.Vector2();
      ray.layers.enableAll();
      canvas.addEventListener('click', e => {
        const r = canvas.getBoundingClientRect(); ptr.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ptr, camera);
        const hit = ray.intersectObjects(tiles.map(t => t.g), true)[0];
        if (!hit) return;
        const i = tiles.findIndex(t => { let o = hit.object; while (o) { if (o === t.g) return true; o = o.parent; } return false; });
        if (i >= 0) { stop(); show(i); }
      });

      let W = 0, H = 0;
      function size() {
        const r = canvas.parentElement.getBoundingClientRect(); W = r.width; H = r.height;
        renderer.setSize(W, H, false); camera.aspect = W / H;
        const far = W < 600 ? 38 : 34;
        camera.position.set(0, far * 0.5, far); camera.lookAt(0, -0.8, 0);
        camera.updateProjectionMatrix();
      }
      const v = new T.Vector3();
      frame = function frame(now) {
        if (document.hidden) { raf = 0; dirty = true; return; }
        const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now; time += dt;
        rot += (targetRot - rot) * (still ? 1 : 0.06);
        world.rotation.y = rot;
        orb.rotation.y += dt * 0.35; knot.rotation.x += dt * 0.6; knot.rotation.z += dt * 0.4;
        orb.position.y = 4.6 + 0.12 * Math.sin(time * 1.4);
        dataRing.rotation.y -= dt * 0.25; for (let k = 0; k < bands.length; k++) setA(bandF, k, 0.45 + 0.4 * Math.sin(time * 3 - k * 0.8));
        for (let k = 0; k < pillars.length; k++) setRGBA(tipF, k, tipC.setHSL(0.55, 0.9, 0.55 + 0.25 * Math.sin(time * 2 + k)), 1);
        beamUp.material.opacity = 0.25 + 0.12 * Math.sin(time * 4);
        holos.forEach((h, k) => { const a = time * 0.4 + k * Math.PI * 2 / 3; h.position.set(Math.sin(a) * 2.9, 4.6 + 0.3 * Math.sin(time + k), Math.cos(a) * 2.9); h.lookAt(camera.position.x, h.position.y, camera.position.z); });
        heart.scale.setScalar(1 + 0.12 * Math.sin(time * 4));
        tiles.forEach((t, k) => {
          const on = k === cur;
          glowA[k] += ((on ? 0.6 + 0.25 * Math.sin(time * 4) : 0) - glowA[k]) * 0.15; setA(glowF, k, glowA[k]);
          const s = (t.d.main ? 1.15 : 1) * (on ? 1.08 : 1); t.g.scale.x += (s - t.g.scale.x) * 0.1; t.g.scale.y = t.g.scale.z = t.g.scale.x;
          t.g.position.y = on ? 0.15 + 0.05 * Math.sin(time * 2) : 0;
          const u = t.model.userData;
          if (u.bob) u.bob.position.y = 1.85 + 0.25 * Math.sin(time * 1.5);
          if (u.glow) u.glow.material.color.setScalar(0.85 + 0.15 * Math.sin(time * 3));
          if (u.pulse) u.pulse.emissiveIntensity = 0.6 + 0.5 * Math.sin(time * 3);
          if (u.hand) u.hand.rotation.z = -time;
          if (u.flag) { const p = u.flag.geometry.attributes.position; for (let j = 0; j < p.count; j++) p.setZ(j, Math.sin(p.getX(j) * 12 + time * 5) * 0.03 * p.getX(j) * 4); p.needsUpdate = true; }
          if (u.wire) { const f = (time * 0.5) % 1, w = u.wire; w.spark.position.set(w.p[0] + (w.q[0] - w.p[0]) * f, w.p[1] + (w.q[1] - w.p[1]) * f - Math.sin(Math.PI * f) * 0.18, w.p[2] + (w.q[2] - w.p[2]) * f); }
          if (u.spin) u.spin.rotation.y = 0.4 + 0.3 * Math.sin(time * 0.8);
          beams[k].pulses.forEach(p => { const f = (time * (on ? 0.55 : 0.32) + p.o) % 1; beams[k].curve.getPointAt(f, v); pulsePos.setXYZ(p.i, v.x, v.y, v.z); pulseCol.setW(p.i, on ? 1 : 0.6); });
          // Etiqueta sobre la maqueta
          t.g.updateMatrixWorld(); tileU.value[k].multiplyMatrices(t.g.matrix, bakeInv[k]);
          v.set(0, 0, 0); t.g.localToWorld(v); const behind = v.z < -R * 0.75; v.y = -0.4; v.x *= 1.16; v.z *= 1.16; v.project(camera);
          const lb = labels[k]; lb.style.left = `${(v.x + 1) / 2 * W}px`; lb.style.top = `${(1 - v.y) / 2 * H}px`;
          lb.style.opacity = behind || v.z >= 1 ? 0 : '';
          if (lb.style.visibility) lb.style.visibility = '';
        });
        pulsePos.needsUpdate = true; pulseCol.needsUpdate = true;
        v.set(0, orb.position.y + 2.5, 0); v.project(camera); coreLbl.style.left = `${(v.x + 1) / 2 * W}px`; coreLbl.style.top = `${(1 - v.y) / 2 * H}px`;
        renderer.render(scene, camera);
        raf = visible && !still && !document.hidden ? requestAnimationFrame(frame) : 0;
      };
      size();
      window.addEventListener('resize', () => { size(); kick(); });
      paint();
      kick();
    }

    const near = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { near.disconnect(); init(); } }, { rootMargin: '100% 0px' });
    near.observe(box);
    new IntersectionObserver(es => {
      visible = es.some(e => e.isIntersecting);
      sync();
    }, { threshold: 0.2 }).observe(box);
    document.addEventListener('visibilitychange', sync);
    show(0);
  })();
