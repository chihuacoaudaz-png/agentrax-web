# Accesibilidad de la portada: cambios propuestos (T7, fase 1)

Fecha: 12-11-2026. Rama `t7`. En esta fase **no se cambió ningún archivo del sitio**: esta lista es la propuesta para que César la apruebe (cada cambio que se ve en pantalla necesita su visto bueno, porque el diseño es de Renato).

## Resumen

- **Nota de accesibilidad hoy (Google Lighthouse): 83 de 100** en celular y en escritorio.
- **Con los cambios de esta lista: 100 de 100** en celular y en escritorio. Se comprobó aplicándolos en una copia aparte del sitio (no en el repositorio) y volviendo a medir con Lighthouse y con axe-core.
- **4 cambios que se ven** (sección A). De esos, 3 son ajustes de color o de espacio casi imperceptibles y 1 mueve un punto del mapa 3D.
- **1 cambio que no se ve y que sí cuenta para la nota**, más 4 mejoras opcionales que no se ven y no cambian la nota (sección B).

Cómo se midió: el sitio se sirvió en local y se auditó con Lighthouse 13.6 (solo la categoría de accesibilidad; celular de 412 px y escritorio) y con axe-core 4.14 dentro de Chrome, en celular de 390 × 844 y escritorio de 1440 × 900. Las razones de contraste se calcularon con la fórmula de la norma WCAG 2.2. Mínimos que pide la norma: **4,5 : 1** para texto normal, **3 : 1** para texto grande y zonas táctiles de **24 × 24 px**.

Las capturas de antes y después están fuera del repositorio, en `C:\Agentrax\.agx\trabajo\web_agentrax\specs\t7\cap\`.

---

## A) Cambios que se ven

| # | Dónde está | Antes → después | Contraste o medida | Por qué |
|---|---|---|---|---|
| A1 | Portada, arriba a la derecha: el botón **«Tajo abierto»** (el azul del selector «Tajo abierto / Subterránea») | Fondo azul `#007AFF` → `#0070EA` (un azul apenas más oscuro, del mismo tono) | Texto blanco: 4,02 : 1 → **4,66 : 1** | Las letras blancas sobre ese azul tan claro no llegan al mínimo de 4,5 y cuesta leerlas en exteriores o con poco brillo. Solo cambia este botón: el azul de marca del resto de la página no se toca. |
| A2 | Sección **«Capacidades»**, solo en celular: la cajita gris con el número (**02, 03, 04, 05**) a la izquierda de cada opción cerrada | Fondo de la cajita: gris `#70747D` → `#5F646D` (el mismo gris, un poco más oscuro). En el código: transparencia del fondo 55 % → 62 % | Número blanco azulado `#E6F6FF`: 4,24 : 1 → **5,38 : 1** | El número de 12 px no llega a 4,5. Con este ajuste la cajita se ve casi igual y el número se lee bien. |
| A3 | Sección **AITI** (el orbe azul), solo en celular y tableta: el espacio entre el texto «…funciona en cualquier empresa.» y el orbe | Separación 20 px → **52 px** (+32 px) | El arco que gira ya no pasa por encima del texto (hoy lo tapa 22 px) | Hoy el arco animado del orbe cruza la última línea del texto y la hace difícil de leer (ver la sección C). |
| A4 | Portada, mapa 3D de «Tajo abierto»: el punto **«Proyectos»** (ícono de documento) | Se mueve en el modelo 3D hacia el fondo, cerca de la planta (en el código: posición `(100, 4, -12)` → `(100, 4, -55)`). En pantalla queda unos 30 a 60 px más arriba y a la izquierda. | Distancia mínima al punto «Ingeniería» mientras se recorre la portada: celular 10 px → **31 px**; escritorio 9 px → **62 px** | Hoy «Proyectos» queda casi encima de «Ingeniería» y con el dedo es fácil tocar el que no es. Cada punto necesita al menos 24 px libres; los círculos miden 28 px en celular y 34 px en escritorio. |

Detalle de cada cambio:

**A1. Botón «Tajo abierto».** Selector `.mine-type button[aria-selected="true"]` (línea 146 de `index.html`). Se cambia `background: var(--flow)` por `background: #0070EA`. Se eligió `#0070EA` y no el mínimo exacto (`#0072EF`, 4,51 : 1) para tener un pequeño margen. El otro botón («Subterránea», gris `#9FB0C8` sobre `#0B1730`) ya cumple con 8,07 : 1.
Capturas: `cap\mina_boton_m_antes.png` y `cap\mina_boton_m_despues.png` (también `_d_` para escritorio).

**A2. Números de «Capacidades».** Selector `.cap .cap__num` (línea 1456). Se cambia `background: rgba(5, 11, 24, 0.55)` por `rgba(5, 11, 24, 0.62)`. La cajita del número de la opción abierta (azul) no cambia; ya cumple. Aun si el fondo de detrás fuera blanco puro, el número queda en 5,06 : 1.
Capturas: `cap\cap_num_m_antes.png` y `cap\cap_num_m_despues.png`.

**A3. Orbe AITI.** Se añade una regla solo para pantallas de hasta 900 px: `@media (max-width: 900px) { .ait__stage { margin-top: 52px; } }`. Se probó en celulares de 360, 390 y 430 px: con 52 px el anillo exterior queda entre 7 y 12 px por debajo del texto, y el arco que gira, entre 15 y 20 px. En escritorio no cambia nada.
Capturas: `cap\orbe_m_antes.png` y `cap\orbe_m_despues.png`.

**A4. Punto «Proyectos».** Archivo `js/01-portada.js`, línea 1597: `'Proyectos': new T.Vector3(100, 4, -12)` → `new T.Vector3(100, 4, -55)`. Con él se mueve también su baliza en el modelo 3D. Se probaron 8 posiciones alternativas (moviendo «Proyectos», «Ingeniería» o ambos) en cinco momentos del recorrido de la portada; esta es la mejor y la única que deja más de 28 px libres en celular durante todo el recorrido sin acercar «Proyectos» a otro punto. «Subterránea» no tiene este problema.
Capturas: `cap\portada_m_antes.png` y `cap\portada_m_despues.png` (también `_d_`).

---

## B) Cambios que no se ven

**Cuenta para la nota (resuelve 3 de las 5 fallas de Lighthouse):**

| # | Elemento | Cambio exacto |
|---|---|---|
| B1 | Las seis tarjetas que rodean el orbe AITI (`ul.ait__fns`, líneas 2129 a 2134) | Añadir `role="presentation"` a cada `<li>` (6 en total). Hoy la lista está marcada como «grupo de pestañas», pero entre el grupo y cada pestaña hay un elemento de lista que confunde a los lectores de pantalla. Resuelve «aria-required-children», «aria-required-parent» y «listitem». |

**Opcionales (no cambian la nota, mejoran el uso con teclado y con lector de pantalla):**

| # | Elemento | Cambio exacto |
|---|---|---|
| B2 | Enlace «Saltar al contenido» (`a.skip`, línea 1619) y franja del correo (`div.strip`, línea 1611) | Poner el enlace «Saltar al contenido» como primer elemento dentro de `<body>`, y cambiar `<div class="strip" role="presentation">` por `<aside class="strip" aria-label="Contacto">`. Así ningún contenido queda fuera de una zona con nombre (aviso «region» de axe). |
| B3 | Barra de avance del video (`.avf__track`, línea 1524) | Altura de la zona táctil 22 px → 24 px y la línea dibujada `top: 9px` → `top: 10px`, para que la línea visible quede en el mismo sitio. |
| B4 | Pestañas sin enlace a su panel: «Tajo abierto / Subterránea» (`.mine-type`), «Perú / Latinoamérica / Mundo» (`.reach__tabs`) y las seis de AITI (`.ait__fns`) | Añadir a cada pestaña `aria-controls="<id del panel que cambia>"`. Las pestañas de «Industrias» (`.tabs`) ya lo tienen. |
| B5 | Orden de títulos | El título principal de la portada («Toda la mina conectada.») es un `h2`, y el único `h1` («Inteligencia Artificial de Múltiples Agentes…») está más abajo. Conviene que el título de la portada sea el `h1`. Antes de aplicarlo hay que revisar los estilos para que el tamaño no cambie. |

---

## C) El arco del orbe AITI tapa el texto en celular

**Qué pasa.** En celular (390 px), el texto bajo el título AITI termina en «…funciona en cualquier empresa.». El orbe empieza 20 px más abajo, pero su anillo exterior y el arco azul que gira suben más que eso: el anillo invade **22 px** del texto y el arco **15 px**. Mientras el arco gira, cruza la palabra «cualquier».

- Captura del problema: `C:\Agentrax\.agx\trabajo\web_agentrax\specs\t7\orbe_m_antes.png` (también `cap\orbe_m_antes.png`).
- Captura con el arreglo: `cap\orbe_m_despues.png`.

**Arreglo mínimo propuesto.** Es el cambio A3: bajar el orbe 32 px solo en celular y tableta (separación de 20 px a 52 px). No cambia el tamaño del orbe, del texto ni nada del escritorio. Medido en tres anchos de celular:

| Ancho | Hoy: el anillo invade el texto | Con 52 px: espacio libre |
|---|---|---|
| 360 px | 20 px | 12 px |
| 390 px | 22 px | 10 px (17 px hasta el arco) |
| 430 px | 25 px | 7 px |

Otra opción que se probó y se descarta: poner el texto por encima del orbe con una sombra oscura (captura `orbe_m_B_texto_encima.png`). Se sigue viendo el arco detrás de las letras.

Nota para escritorio: el anillo exterior, que es muy tenue, también roza 10 px la última línea, pero el arco no la cruza (captura `orbe_d_antes.png`). Lighthouse no lo marca. Si César quiere, se corrige igual subiendo la separación de escritorio de 40 px a 56 px.

---

## D) Nota actual y auditorías que fallan

**Lighthouse, accesibilidad: 83 / 100 en celular y 83 / 100 en escritorio** (medido dos veces sobre la versión actual de la rama, con el mismo resultado).

| Auditoría que falla | Peso | Qué significa | Arreglo |
|---|---|---|---|
| aria-required-children | 10 | El grupo de pestañas de AITI tiene hijos que no son pestañas | B1 |
| aria-required-parent | 10 | Las 6 pestañas de AITI no cuelgan directamente de su grupo | B1 |
| color-contrast | 7 | Botón «Tajo abierto» (4,02 : 1) y números de «Capacidades» en celular (4,24 : 1) | A1 y A2 |
| listitem | 7 | Elementos de lista dentro de algo que no es una lista | B1 |
| target-size | 7 | Puntos «Ingeniería» y «Proyectos» de la portada encimados | A4 |

**Con todos los cambios A1 a A4 y B1 aplicados en una copia: 100 / 100 en celular y en escritorio.** axe-core ya no marca ninguna falla grave; solo queda el aviso menor «region», que no entra en la nota (lo resuelve el opcional B2).

Fuera de la nota: axe deja 96 casos de contraste en celular y 145 en escritorio como «no se pudo decidir», porque el texto está sobre imágenes, degradados o animaciones. Se revisaron uno por uno midiendo los píxeles de una captura. Los que salen por debajo del mínimo son rótulos muy pequeños dentro de las ilustraciones animadas (por ejemplo, «AGENTE IA» o «Costo por área» en los dibujos de Capacidades, o los nombres de región en el mapa) y el título gigante «AITI», que es decorativo. Lighthouse no los cuenta y tocarlos cambiaría las ilustraciones de Renato, así que no se proponen.

Archivos de la medición (fuera del repositorio, en `C:\Agentrax\.agx\trabajo\web_agentrax\specs\t7\`): `lh_actual_movil.json`, `lh_actual_escritorio.json`, `lh_propuesta_movil.json`, `lh_propuesta_escritorio.json`, `axe_m.json`, `axe_d.json`, `axe_propuesta_m.json`, `axe_propuesta_d.json`, `sonda.json`, `spots_prueba.json`, `spots_prueba2.json`, `inspeccion.json`, más los scripts que los generan.
