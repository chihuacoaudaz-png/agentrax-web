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

    // Escena
    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
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
      const pulses = Array.from({ length: t.d.main ? 3 : 2 }, (_, k) => { const s = new T.Sprite(new T.SpriteMaterial({ map: haloTex, color: 0xe6f6ff, transparent: true, blending: T.AdditiveBlending, depthWrite: false })); s.scale.setScalar(0.5); world.add(s); return { s, o: k / (t.d.main ? 3 : 2) }; });
      return { curve, tube, pulses };
    });

    // Etiquetas HTML sobre cada maqueta
    const labels = tiles.map((t, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'indc__lbl' + (t.d.main ? ' is-main' : '');
      b.innerHTML = (t.d.main ? '<small>Nuestra especialidad</small>' : '') + t.d.name;
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
    let cur = 0, targetRot = 0, rot = 0, auto = !still, timer = 0, visible = false, raf = 0, last = 0, time = 0;
    function show(i) {
      cur = i;
      targetRot = -tiles[i].a;
      let diff = targetRot - rot; diff = Math.atan2(Math.sin(diff), Math.cos(diff)); targetRot = rot + diff;
      tiles.forEach((t, k) => { const on = k === i; t.rimMat.opacity = on ? 1 : 0.5; t.rimMat.color.setHex(on ? 0xbfeaff : 0x38bdf8); beams[k].tube.material.opacity = on ? 0.9 : 0.28; });
      labels.forEach((b, k) => b.classList.toggle('is-on', k === i));
      IND.forEach((d, k) => d.btn.classList.toggle('is-on', k === i));
      const d = IND[i];
      nameEl.textContent = d.name; lineEl.textContent = d.line; badge.hidden = !d.main;
      chipsEl.innerHTML = d.chips.map(c => `<li>${c}</li>`).join('');
      info.classList.remove('is-swap'); void info.offsetWidth; info.classList.add('is-swap');
      if (still) rot = targetRot;
      kick();
    }
    const stop = () => { auto = false; clearInterval(timer); };

    // Arrastrar para girar la maqueta
    let drag = null;
    canvas.addEventListener('pointerdown', e => { drag = e.clientX; canvas.setPointerCapture(e.pointerId); stop(); });
    canvas.addEventListener('pointermove', e => { if (drag === null) return; targetRot += (e.clientX - drag) * 0.008; drag = e.clientX; kick(); });
    ['pointerup', 'pointercancel'].forEach(t => canvas.addEventListener(t, () => { drag = null; }));
    // Tocar una maqueta la selecciona
    const ray = new T.Raycaster(), ptr = new T.Vector2();
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
    function frame(now) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now; time += dt;
      rot += (targetRot - rot) * (still ? 1 : 0.06);
      world.rotation.y = rot;
      orb.rotation.y += dt * 0.35; knot.rotation.x += dt * 0.6; knot.rotation.z += dt * 0.4;
      orb.position.y = 4.6 + 0.12 * Math.sin(time * 1.4);
      dataRing.rotation.y -= dt * 0.25; bands.forEach((b, k) => { b.material.opacity = 0.45 + 0.4 * Math.sin(time * 3 - k * 0.8); });
      pillars.forEach((p, k) => { p.material.color.setHSL(0.55, 0.9, 0.55 + 0.25 * Math.sin(time * 2 + k)); });
      beamUp.material.opacity = 0.25 + 0.12 * Math.sin(time * 4);
      holos.forEach((h, k) => { const a = time * 0.4 + k * Math.PI * 2 / 3; h.position.set(Math.sin(a) * 2.9, 4.6 + 0.3 * Math.sin(time + k), Math.cos(a) * 2.9); h.lookAt(camera.position.x, h.position.y, camera.position.z); });
      heart.scale.setScalar(1 + 0.12 * Math.sin(time * 4));
      tiles.forEach((t, k) => {
        const on = k === cur;
        t.glow.material.opacity += ((on ? 0.6 + 0.25 * Math.sin(time * 4) : 0) - t.glow.material.opacity) * 0.15;
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
        beams[k].pulses.forEach(p => { const f = (time * (on ? 0.55 : 0.32) + p.o) % 1; p.s.position.copy(beams[k].curve.getPointAt(f)); p.s.material.opacity = on ? 1 : 0.6; });
        // Etiqueta sobre la maqueta
        t.g.updateMatrixWorld(); v.set(0, 0, 0); t.g.localToWorld(v); const behind = v.z < -R * 0.75; v.y = -0.4; v.x *= 1.16; v.z *= 1.16; v.project(camera);
        const lb = labels[k]; lb.style.left = `${(v.x + 1) / 2 * W}px`; lb.style.top = `${(1 - v.y) / 2 * H}px`;
        lb.style.opacity = behind || v.z >= 1 ? 0 : '';
      });
      v.set(0, orb.position.y + 2.5, 0); v.project(camera); coreLbl.style.left = `${(v.x + 1) / 2 * W}px`; coreLbl.style.top = `${(1 - v.y) / 2 * H}px`;
      renderer.render(scene, camera);
      raf = visible && !still ? requestAnimationFrame(frame) : 0;
    }
    function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
    size();
    window.addEventListener('resize', () => { size(); kick(); });
    new IntersectionObserver(es => {
      visible = es.some(e => e.isIntersecting);
      clearInterval(timer);
      if (visible && auto) timer = setInterval(() => show((cur + 1) % IND.length), 4200);
      kick();
    }, { threshold: 0.2 }).observe(box);
    show(0);
  })();
