# CLAUDE.md — Guía del repositorio `agentrax-web` (agentraxperu.com)

Sitio estático en HTML + CSS + JavaScript, **sin framework ni paso de compilación**, con `three.js` r128 en local. Prioridad: conservar intacto el diseño visual, mantener la fluidez en celular y respetar la estructura del repositorio.

---

## 1. Estructura de archivos

- `index.html` — Página principal (HTML + CSS en `<style>`). Sin `<script>` ejecutables incrustados (solo el JSON-LD de `schema.org` en `<head>`). Carga con `defer`, en este orden:
  1. `js/vendor/three.min.js` (three.js r128)
  2. `js/01-portada.js` — Tablero por industria, tuberías SVG y escena 3D de la portada (`create3D`, bucle `introLoop`).
  3. `js/02-mapa.js` — Mapa SVG de alcance (`#reach-map`, carga local diferida de `d3`/`topojson`/JSONs) y reproductor YouTube de AITI (`#vid-main`).
  4. `js/03-capacidades.js` — Acordeón de capacidades y orbes SVG `.coach-orb`.
  5. `js/04-novedades.js` — Arreglo `NEWS` y filtros de Novedades.
  6. `js/05-industrias.js` — Maqueta 3D de industrias en `three.js` (`#ind-canvas`, bucle `frame`).
  7. `js/06-aiti.js` — Orbe 2D de AITI (`#ait-orb`, bucle `draw`), cables SVG y pestañas de funciones.
  8. `js/07-video.js` — Video animado de 42 s en canvas 2D (`#avf-cv`, bucle `frame`).
- `js/vendor/` — Librerías locales (cero CDNs): `three.min.js` (r128), `d3-array.min.js` (3.2.4), `d3-geo.min.js` (3.1.1) y `topojson-client.min.js` (3.1.0). No existe `BufferGeometryUtils.js`; la fusión 3D es propia.
- `css/legal.css` — Hoja compartida por `privacy.html`, `terms.html` y `404.html` (sin Tailwind por CDN; **no modificar los textos legales**).
- `datos/` — `datos/countries-110m.json`. En la raíz vive `peru-regiones.json` (ambos consumidos por `js/02-mapa.js`).
- `equipo/` — Fotos WebP de 1254×1254 (`renato.webp`, `cesar.webp`, `erick.webp`) y sus versiones para celular (`*-660.webp`) vía `srcset` y `sizes`. Si reemplazas una foto, regenera también su `-660.webp`.
- Favicons (raíz): `favicon.ico` (16/32/48), `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` (180, fondo sólido) e `icon-512.png` (también `logo` del JSON-LD). Se generan desde `brand-app-icon.png` con `python tools/favicons.py --hoja <png>` (recorta el cuadro oscuro sin el marco gris; a 16–32 px, recorte más cerrado del emblema). Caché de 1 día en `vercel.json`.
- Raíz pública adicional: `brand-app-icon.png`, `brand-emblem-dark.png`, `brand-logo-dark.png`, `og-agentrax.jpg`, `robots.txt`, `sitemap.xml`, `CNAME`, `vercel.json`.
- `.vercelignore`, `docs/`, `tools/` — `.vercelignore` excluye `tools/`, `docs/`, `*.md` y `*.py` del despliegue en Vercel.

### Qué NO volver a meter
- No reintroducir CDNs de scripts (`cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, `cdn.tailwindcss.com`).
- No recrear ni referenciar archivos retirados (`contexto.md`, `audit_gate4.py`, `render_preview.py`, `globals.css`, `logo.jpg`, `brand-emblem-hi.png`, `brand-emblem.png`, `brand-industries.png`, `brand-pillars.png`).

---

## 2. Optimizaciones implementadas y qué NO romper

1. **Creación perezosa (1 solo contexto WebGL al abrir)**
   - `js/02-mapa.js`: carga `d3-array`, `d3-geo`, `topojson-client`, `datos/countries-110m.json` y `peru-regiones.json` al acercarse `#reach-map` (`IntersectionObserver`, `rootMargin: '300px'`).
   - `js/05-industrias.js` y `js/06-aiti.js`: crean su escena/renderer (`WebGLRenderer` de industrias y orbe 2D de AITI) dentro de `init()` cuando su sección entra en `IntersectionObserver` con `rootMargin: '100% 0px'`. Al abrir `index.html` solo existe el contexto WebGL de la portada. No agregues canvas 3D/2D pesados que arranquen al cargar.

2. **Pausa fuera de pantalla, pestaña oculta y `prefers-reduced-motion`**
   - Se pausan fuera de pantalla (`IntersectionObserver`) **y** con la pestaña oculta (`document.hidden` / `visibilitychange`), respetando `prefers-reduced-motion`: `introLoop` (`01-portada.js`), `frame` (`05-industrias.js`) y `draw` + paso de pestañas (`06-aiti.js`).
   - `loopTopo` (`01-portada.js`) se pausa con `paused` y `document.hidden`; `coach-orb` (`03-capacidades.js`) con `IntersectionObserver`, panel cerrado (`.is-on`) y `prefers-reduced-motion`; el video de `07-video.js` arranca quieto (`t = 6.2`) y se pausa al salir de pantalla; `02-mapa.js` usa SVG/CSS (`<animateMotion>`) sin bucle `rAF` continuo y respeta `prefers-reduced-motion`.

3. **Portada 3D: arranque, ritmo, resolución y fusión (`js/01-portada.js`)**
   - **Arranque y memoria:** `steps(id)` construye por partes cediendo vía `MessageChannel`, compila shaders con `renderer.compile`, abandona builds a medias (`job`) si alternas rápido de mina y libera `world` y `ownTex` al cambiar entre `tajo` y `sub`.
   - **Tope de 30 cuadros/s (`introLoop`):** activo en pantallas `< 900 px` o en escritorio tras dos tandas seguidas de 60 cuadros con promedio `> 20 ms` (`< 50` cuadros/s). Salta turnos cada `33,4 ms` sin avanzar `introClock` ni tocar el DOM.
   - **Resolución adaptativa (`adapt`):** inicia en `min(devicePixelRatio || 1, 1.5)`. Si 30 cuadros dibujados promedian `> 28 ms`, baja `0,25` (hasta `1,0`); sube tras 8 tandas seguidas `< 18 ms` y veta niveles desde los que volvió a bajar (`dprVeto`).
   - **DOM mínimo:** `statusOnce` y `place()` (`el._at`) solo escriben en el DOM si el valor cambió.
   - **Fusión y reducciones de draw calls (≤ 120):** `mergeGeo()` y `fuse(id)` unen geometrías estáticas por material equivalente (`matKey`) o con color RGBA por vértice; `cards()` agrupa sprites fijos (`ShaderMaterial`); `beacons()` fusiona `stem` e instancia `pad`/`gem`/`packets`/`orbit`; `herd()` instancia equipos/mineral opacos y `flocks()` agrupa sprites aditivos dinámicos (dejando originales en `layers.set(1)`).
   - **Portada de 1 pantalla con avance automático:** arranca sola al tener la escena lista y recorre las etapas en `AUTO_S = 24` s con curva pareja (`ease`, más lenta al medio, donde se conectan las 10 áreas); con «reducir movimiento» queda en el final. La barra `.intro__rail` es el control: `#rail-track` (slider con arrastre, toque y teclado) y `#rail-play` (pausa / reanudar / repetir, `data-state` = `play` · `held` · `end`).
   - **Terreno con detalle no uniforme:** `terrain(fn, w, d, cz, low, seg, fade, core)` densifica solo el rectángulo `core` (donde se mira) y aligera el resto.
   - **Qué NO romper:** crea piezas estáticas dentro de `world` antes de `fuse(id)`; registra en `live` o `skip` toda pieza que cambie luego de `build()`; no mezcles transparentes en el origen con ubicadas ni cruces lados del vidrio en `sub`.

4. **Industrias 3D (`js/05-industrias.js`) y Orbe AITI (`js/06-aiti.js`)**
   - `05-industrias.js` fusiona piezas fijas de las 8 plataformas por material (`merge`, `build`, `fuseLocal`, `fuseOut`, `disposeUnused`) con atributo `aTile`, color RGBA por vértice y pulsos en `THREE.Points` (≤ 60 órdenes), manteniendo originales en `layers.set(1)` para selección con `Raycaster`.
   - `06-aiti.js` precalcula `Path2D`, degradados y tabla de 65 puntos para cables al redimensionar, y dibuja puntos/trazos en 16 tonos por profundidad.

5. **Reglas de caché (`vercel.json`)**
   - `/js/vendor/(.*)` y `/datos/(.*)` → **`public, max-age=31536000, immutable` (1 año)**. Si actualizas una librería o archivo de datos, **cambia el nombre del archivo y su referencia**.
   - `/equipo/(.*)` y `/(brand-.*\.png|favicon.*|apple-touch-icon\.png|icon-512\.png)` → **`public, max-age=86400` (1 día)** (nombres fijos).
   - `/js/((?!vendor/).*)` → **`public, max-age=0, must-revalidate`** (siempre se revalida: un cambio de JS llega de inmediato). Conserva `(?!vendor/)` para no pisar la regla de 1 año.

---

## 3. Accesibilidad y diseño

- **Contrastes (≥ 4,5 : 1 en texto normal; ≥ 3 : 1 en texto grande):** mantén `#0070EA` en `.mine-type button[aria-selected="true"]`, `rgba(5, 11, 24, 0.62)` en `.cap .cap__num` en celular y `margin-top: 52px` en `.ait__stage` (`@media (max-width: 900px)`) para que el orbe no invada el texto.
- **Zonas táctiles (≥ 24 × 24 px):** mantén `'Proyectos': new T.Vector3(100, 4, -55)` en `js/01-portada.js` (separado de «Ingeniería») y `.avf__track` de `24px` de alto.
- **Semántica y ARIA:** conserva `<a class="skip">` al inicio de `<body>`, `<aside class="strip" aria-label="Contacto">`, `<h1 id="intro-title">` como único `<h1>`, `role="presentation"` en cada `<li>` de `ul.ait__fns`, y `role="tablist"` / `role="tab"` / `aria-selected` / `aria-controls`.
- **Nota sobre «Solicitar Demo B2B» en celular:** en `@media (max-width: 1080px)`, `.bar .btn { display: none; }` (`index.html` y `css/legal.css`) oculta también el botón «Solicitar Demo B2B» dentro de `#drop`. Hacerlo visible se propuso y **NO se aprobó**. No cambiarlo sin visto bueno de César.

---

## 4. Verificación y Git antes de subir

Ejecutar desde la raíz del repo con un solo Chrome a la vez:

```bash
python tools/comparar.py
python tools/presupuesto.py
```

- `python tools/comparar.py`: compara capturas de escritorio (1440×900) y celular (390×844) en `index.html`, `privacy.html`, `terms.html`, `404.html` y mina `sub` contra `tools/linea_base/capturas/` (máx. 0,5 % de diferencia; oculta `#ait-orb` en modo estricto). Usa `--libre` para revisar movimiento en `tools/salida/hoja_libre_*.jpg`. **Usa `--crear-base` solo tras aprobar un cambio visual.**
- `python tools/presupuesto.py` (o `--tarea N`): valida 0 errores de consola, 0 `<script>` incrustados en `index.html`, 0 CDNs, órdenes de dibujo y tiempos dentro de meta, 1 contexto WebGL al abrir, 3 fotos `-660.webp` en celular, ausencia de archivos retirados y textos legales intactos.
- **Git:** trabaja siempre en ramas aparte y **no hagas `push` a `main` sin visto bueno de César**.
