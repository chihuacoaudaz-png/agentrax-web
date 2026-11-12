# Inventario de la portada 3D (T2, Fase A)

Base: commit `0dc8326`, rama `optimizacion-2026-11`, archivo `js/01-portada.js`, función `create3D` (líneas 789–2740). three.js r128.
Fecha de medición: 2026-11-12. Este documento no cambia el comportamiento; solo inventaría.

**Cómo se midió.** Chrome real sin ventana con Playwright (los mismos `CHROME_ARGS` y `servir()` de `tools/_comun.py`), un solo navegador a la vez, en escritorio 1440×900 y en celular 390×844. Se puso una línea temporal `window.__P` en `create3D` para leer `world`, `movers`, `nightLights`, `windows`, `terrainMats`, `nodes`, `core`, `shot` y `cfg`; al terminar se dejó el archivo idéntico al commit. Los scripts están fuera del repositorio, en `specs/t2a/` (`inventario.js`, `escenarios.js`, `transparencias.js` y sus lanzadores `.py`).

Para separar lo fijo de lo que tiene vida propia no se confió solo en leer el código. Se llamó a `render` 80 veces con reloj, avance, `rs` y `lit` variados: amanecer, día, atardecer y noche, del inicio (`rs = 0`) al encendido con disparo y onda. Después de cada cuadro se comparó, objeto por objeto, la matriz local, la visibilidad, el material (opacidad, color, tamaño, emisión, uniforms) y la geometría (versión del atributo de posición y `drawRange`). Resultado del cruce con las listas del código: **ninguna pieza cambia sin estar referenciada**, y solo una pieza referenciada no cambió nunca: el haz `core.userData.beam`, con opacidad fija 0 en la línea 2683.

## 1. Conteos por mina

Objetos dibujables dentro de `world`. Fuera de `world` solo están las estrellas (`Points`, línea 2136, en `scene`). El sol y la luna (líneas 2111–2129) se crean pero nunca se agregan a la escena.

| Tipo | Tajo: total | Tajo: visibles | Sub: total | Sub: visibles |
|---|---|---|---|---|
| Mesh | 494 | 440 | 523 | 475 |
| LineSegments | 145 | 145 | 212 | 212 |
| Line | 84 | 84 | 201 | 201 |
| Sprite | 138 | 119 | 219 | 217 |
| Points | 1 | 1 | 1 | 1 |
| **Total en `world`** | **862** | **789** | **1156** | **1106** |
| + estrellas en `scene` | 1 | 1 | 1 | 1 |
| Materiales distintos | 751 | | 1039 | |
| Geometrías distintas | 726 | | 931 | |

"Visibles" corresponde al estado encendido, al final de la secuencia. La cantidad oculta cambia con el estado: órbitas y paquetes de las balizas se alternan, el disparo, las cargas y las piedras que caen aparecen y desaparecen. En tajo hay además 17 etiquetas `tag()` que nunca se muestran (línea 1180). En sub hay 4 cajas con material invisible (línea 1798).

**Órdenes de dibujo por cuadro (medidas).** En r128 cada objeto visible dentro del encuadre cuesta una orden: no hay multimaterial, y las piezas transparentes de doble cara no se dibujan en dos pasadas.

| Medición | Tajo | Sub |
|---|---|---|
| `renderer.info.render.calls`, 80 cuadros variados, escritorio | 731–788 | 1054–1097 |
| Contador WebGL en el recorrido real (intro@0 / 0,35 / 0,7 / 0,98), escritorio | 753 / 751 / 785 / 786 | 1072 / 1073 / 1093 / 1082 |
| `renderer.info`, celular 390×844 | 703–748 | 1015–1077 |
| Contador WebGL en el recorrido real, celular | 748 / 732 / 734 / 732 | 1071 / 1039 / 1070 / 1068 |
| `introLoop` en escritorio sin freno (referencia) | 13,9–15,4 ms | 18,6–20,2 ms |

El encuadre recorta poco: los objetos visibles y las órdenes medidas difieren en menos de 60. Ojo: `tools/presupuesto.py` mide solo la mina que se abre por defecto (tajo, en celular). Subterránea no entra en esa meta, pero es la mina más cargada.

**Órdenes que no pintan nada.** Hoy se dibujan objetos con opacidad 0 y sin `depthWrite`: las luces nocturnas de día (87 en tajo y 25 en sub, línea 2692), la estela, el flujo y el estallido del disparo cuando no hay disparo (22 + 10 + 1, líneas 2651, 2674 y 2681) y el haz del núcleo (1, línea 2683). Ocultarlos cuando su opacidad es 0 da exactamente la misma imagen.

## 2. Piezas con vida propia

Se tomó `render` entero (2364–2715) y todo lo que guarda referencias. Los conteos son medidos: tajo tiene **465** piezas dinámicas (464 en `world` más las estrellas) y sub **488** (487 + estrellas). "Un valor por cuadro" quiere decir que todo el grupo recibe el mismo valor en ese cuadro, de modo que puede compartir material.

### 2.1 Equipos (`movers`, bucle de las líneas 2382–2562)

| Grupo | Mina | Cuántos (piezas) | Se crea / se registra | Línea donde cambia | Qué cambia | ¿Un valor por cuadro? |
|---|---|---|---|---|---|---|
| Pala (`spin`) | tajo | 1 pala (24 piezas en la casa y el brazo; orugas fijas) | `shovelModel` 1008–1040; `movers.push` 1402 | 2385 casa `rotation.y`; 2387 brazo `crowd.rotation.x`; 2389–2390 vértice 1 del cable (`geometry`) | giro de la casa, brazo que entra y sale, cable reescrito | una sola pala |
| Perforadoras (`drill`) | tajo | 3 (12 piezas: cabezal, aristas, barra, polvo; el resto de la máquina es fijo) | `drillModel` 1043–1065; 1416 | 2398 `head.position.y`; 2399 barra (`geometry` setY); 2400 polvo `opacity`; 2401 polvo `scale` | cabezal sube y baja, barra reescrita, polvo | **distinto por pieza** (`phase = k*0,33`) |
| Radares de talud (`sweep`) | tajo | 2 (4 piezas: plato y abanico; base fija) | 1547–1562 | 2404 `head.rotation.y` | barrido | distinto por pieza (`base` propia; mismo seno) |
| Volquetes del tajo (`cycle`) | tajo | 5 (145 piezas + 10 faros) | `truckModel` 979–1005; `haulTruck` 1200–1210; 1478–1479 | 2535–2539 posición y rumbo del grupo; 2540 tolva `bed.rotation.x`; 2541 carga `visible`; 2543–2551 4 piedras por volquete `visible` y posición | viaje, giro, tolva que se levanta, carga, mineral que cae | distinto por pieza (`offset`) |
| Faros de volquete | tajo | 10 sprites (hijos del volquete) | 1203–1207 | 2692 `opacity`, más el movimiento heredado | se encienden de noche | opacidad igual para los 10 (`max 0,95`) |
| Mineral sobre faja o ducto (genérico) | tajo 12 / sub 33 | dodecaedros `ORE()` | fajas 1162–1166; tolva y echadero 1726–1728; chute 1930 | 2554–2561 posición (todos son `upright`, no giran) | avance por la curva | distinto por pieza (`offset`) |
| Brillos de manga y aire | sub | 28 sprites (16 de mangas, 12 de aire viciado) | 1863–1867, 2036–2040 | 2556–2557 posición | avance por la curva | distinto por pieza |
| Scoops (`lhd`) | sub | 3 (57 piezas) | `scoopModel` 1277–1290; 1779, 1828, 1851 | 2431–2433 posición y rumbo; 2434 cucharón `rotation.x`; 2435 carga `visible` | ciclo de carga | distinto por pieza (`period`, `offset`) |
| Jumbos (`jumbo`) | sub | 2 (14 piezas: 4 vigas de avance con su barra y 2 polvos; el cuerpo es fijo) | `jumboModel` 1305–1324; 1853, 1910 | 2439 `feed.position.z`; 2440 polvo `opacity` | vigas que avanzan, polvo | polvo: **igual** en los dos; vigas: distintas por brazo e iguales entre jumbos |
| Empernadores (`bolter`) | sub | 2 (8 piezas del brazo; cuerpo fijo) | `bolterModel` 1326–1336; 1821, 1912 | 2503 `boom.rotation.x` | brazo | **igual** en los dos |
| Tren cauville (`train`) | sub | 1 locomotora + 4 carros (57 piezas) | 1885–1887 | 2451 locomotora; 2453 carros; 2454 carga `visible` | viaje y descarga carro por carro | locomotora y carros se mueven igual (mismo `x` desplazado); la carga cambia por carro |
| Volquetes de rampa (`haul`) | sub | 3 (63 piezas) | `lowTruckModel` 1292–1302; 1965–1969 | 2490–2498 posición y `lookAt`; 2499 carga `visible` | tráfico con bahías (estado propio con `dt`) | distinto por pieza |
| Izaje (`hoist`) | sub | 2 skips, 2 cables, 3 piedras (11 piezas) | 1997–2008 | 2411 skip `position.y`; 2412 cable (`geometry` setY); 2416–2417 piedras `visible` y posición | skips que se cruzan, cables reescritos, descarga | skips distintos (`s` y `1 - s`) |
| Ventilador (`rot`) | sub | 1 (14 piezas: 6 aspas y cubo con aristas) | 2027–2030 | 2504 `blades.rotation.z` | giro | una sola pieza rígida |

Otros datos que conviene tener presentes:

- El scoop y el volquete del taller (1891–1892) ocultan su carga una sola vez en `build`; después son fijos y ya están contados con las estáticas.
- `mover()` (1185), la rama `m.ride` (2505–2516) y `pingPong` son código que nunca se ejecuta.
- `flashes` nunca se llena.

### 2.2 Luces, ventanas, terreno y cielo

| Grupo | Mina: piezas | Se crea | Línea donde cambia | Qué cambia | ¿Un valor por cuadro? |
|---|---|---|---|---|---|
| `nightLights` sprites de poste (`max 0,9`) | tajo 26 / sub 11 | `lampPost` 1256–1268 | 2692 | `opacity = (1 - day) · max` | **igual** dentro de cada `max` |
| `nightLights` sprites de instalación (`max 0,8`) | tajo 13 / sub 3 | `addLamp` 1214–1218 | 2692 | ídem | igual |
| `nightLights` reflector de torre (`max 0,85`) | tajo 4 | `lightTower` 1242–1244 | 2692 | ídem | igual |
| `nightLights` conos de luz (`max 0,1`, Mesh) | tajo 4 | 1248–1251 | 2692 | ídem | igual (fusionables: una malla) |
| `nightLights` charcos de luz en el suelo (`max 0,75`, Mesh) | tajo 30 / sub 11 | `lightPool` 1228–1235 | 2692 | ídem | igual (fusionables: una malla) |
| `nightLights` faros de volquete (`max 0,95`) | tajo 10 | 1203–1207 | 2692 | ídem, y se mueven con el volquete | igual |
| `windows`, franjas de ventanas | tajo 7 / sub 3 | `offices` 1078–1088; 1527, 2056 | 2693 | `opacity = 0,35 + (1 - day) · 0,55` | **igual** (fusionables: una malla) |
| `terrainMats`, relieve | tajo 2 / sub 2 | `terrain` 913–926 | 2706–2710 | uniforms `uLit`, `uWave`, `uDay` | igual, pero cada malla tiene su `uLow` y `uFade`: materiales distintos, no se fusionan |
| `terrainMats`, corte de vidrio | sub 1 | `faceMat` 1623–1641 | 2706–2710 | uniforms | otro shader; queda sola |
| Estrellas | 1 (en `scene`) | 2130–2137 | 2701–2702 | posición (sigue a la cámara) y opacidad | una sola pieza |

### 2.3 Balizas (`nodes`, 10 por mina, líneas 2306–2330; cambian en 2565–2588)

| Pieza | Cuántas | Línea donde cambia | Qué cambia | ¿Un valor por cuadro? |
|---|---|---|---|---|
| `stem` (Line) | 10 | 2570 | color (GREY → BLUE o AMBER según `rs[i]`) | **distinto por baliza** |
| `pad` (anillo) | 10 | 2570 | color | distinto por baliza |
| `gem` (octaedro) | 10 | 2570 color; 2571 `rotation.y`; 2572 escala | color, giro y pulso | distinto (`+ i`) |
| `beamMesh` (tubo de datos) | 10 | 2567 `visible`; 2568 `setDrawRange` | se dibuja de a poco | distinto; `drawRange` propio, se queda como está |
| `packets` | 30 | 2574–2581 | `visible`, posición, giro | distinto |
| `orbit` | 30 | 2584–2586 | `visible`, posición | distinto |

En pantalla nunca están las 60 a la vez: los paquetes se ven cuando `r >= 1` y las órbitas cuando `r <= 0`. Las etiquetas HTML (`spotEls`, `hub`) se colocan con `n.top` y `core.position` en las líneas 2713–2714. No dependen de ningún objeto que se vaya a fusionar.

### 2.4 Núcleo (`core`, 2223–2271) y disparo (`shot`, 2273–2304)

| Pieza | Cuántas | Línea donde cambia | Qué cambia |
|---|---|---|---|
| `core` (grupo) | 1 | 2338 (`resize`) | escala según el ancho |
| `heart` (esfera, material `metal`) | 1 | 2600 `emissiveIntensity`; 2612 escala | brillo y pulso |
| `shell` (nudo) | 1 | 2611 | giro |
| `net`: sinapsis (LineSegments) y neuronas (Points) | 2 | 2609–2610 giro del grupo; 2613 `synMat.opacity`; 2614–2615 `neuronMat` opacidad y tamaño | giro y brillo |
| `sparks` (impulsos) | 28 sprites | 2617–2624 | `visible` y posición, distinto por pieza |
| `star`, `halo` | 2 sprites | 2601–2602, 2626–2627 | opacidad y escala |
| `emblem` (grupo) | 1 | 2596–2598 rotación (siempre 0); 2608 escala | escala |
| `beam` | 1 | 2683 | opacidad fija en 0: se dibuja sin pintar nada |
| `light` (PointLight) | — | 2625 | intensidad; no es una orden de dibujo, pero ilumina las piezas `MeshStandardMaterial` cercanas |
| `shot.bolt` (2 sprites) | 2 | 2640–2646 | `visible`, posición, escala |
| `shot.trail` | 22 sprites | 2648–2656 | opacidad y posición, distinto por pieza |
| `shot.ray` (2 conos) | 2 | 2660–2670 | `visible`, posición, giro, escala, opacidad |
| `shot.flow` | 10 sprites | 2671–2676 | posición y opacidad |
| `shot.blast` | 1 sprite | 2679–2681 | posición, escala y opacidad |

Las luces de escena (`ambient` y `keyLight`, líneas 2689–2691 y 2699) y la niebla (2372–2373 y 2700) cambian en cada cuadro pero no son piezas. Afectan por igual a todas las piezas, fusionadas o no.

## 3. Piezas estáticas agrupadas por material equivalente

Dos piezas tienen material equivalente si coinciden en todo esto:

- tipo de objeto (Mesh, Líneas, Sprite o Points; `Line` y `LineSegments` van juntas porque cada tira se convierte en segmentos);
- clase de material;
- color y opacidad;
- `transparent`, `depthWrite`, `depthTest`, `side` y `blending`;
- `vertexColors`, `fog` y `visible`;
- metalness, roughness y emissive;
- guiones (`dashSize` y `gapSize`);
- textura y `renderOrder`.

"Tras fusionar" cuenta una orden por grupo, salvo los sprites: `Sprite` no se puede fusionar en geometría sin escribir un shader propio (ver el paso 6 de la sección 4), así que se cuentan uno por uno.

**Resumen.**

- **Tajo:** 381 estáticas visibles en 48 materiales equivalentes. Fusionadas pasan a 48 órdenes; ahorro de 333.
- **Sub:** 663 estáticas visibles en 72 materiales equivalentes, 110 de ellas sprites. Fusionadas pasan a 175 órdenes si los sprites quedan sueltos (ahorro de 488) o a 72 si los sprites se fusionan (ahorro de 591). Las 102 lámparas de labor (`caveLamp`, línea 1662) forman el grupo más grande de toda la escena.
- Si además el color y la opacidad pasan a un atributo por vértice, los grupos se reducen a 13 en tajo y a 25 (más 4 de sprites) en sub.

Las claves de abajo usan la notación del script de medición: `op` es la opacidad, `dw` o `noDW` dice si escribe profundidad, `met`/`rou`/`em` son metalness, roughness y emissive, y `guion` es el patrón de guiones.

#### Tajo: 398 piezas estáticas (381 visibles) en 65 materiales equivalentes (48 con piezas visibles)

| # | Material equivalente (tipo, clase, color, opacidad, transparente, depthWrite, cara, mezcla, extras) | Piezas visibles | Geometrías | Órdenes hoy | Tras fusionar | Ahorro |
|---|---|---|---|---|---|---|
| 1 | Mesh MeshStandardMaterial #b8c4d4 op1 opaco dw Front Normal met0.6 rou0.35 em#000000*1 | 52 | Cylinder 26, Box 26 | 52 | 1 | 51 |
| 2 | Mesh MeshStandardMaterial #1c2a44 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 37 | Box 31, Cylinder 6 | 37 | 1 | 36 |
| 3 | Mesh MeshStandardMaterial #4a5b78 op1 opaco dw Double Normal met0 rou0.9 em#000000*1 | 32 | Buffer 32 | 32 | 1 | 31 |
| 4 | Mesh MeshStandardMaterial #e6ecf5 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 26 | Box 26 | 26 | 1 | 25 |
| 5 | Mesh MeshBasicMaterial #9fe2ff op1 opaco dw Front Normal | 24 | Circle 24 | 24 | 1 | 23 |
| 6 | Lineas LineBasicMaterial #9fe2ff op0.55 transp dw Front Normal | 19 | Edges 19 | 19 | 1 | 18 |
| 7 | Lineas LineBasicMaterial #9fe2ff op0.4 transp dw Front Normal | 19 | Edges 19 | 19 | 1 | 18 |
| 8 | Mesh MeshStandardMaterial #d8dee8 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 17 | Box 13, Cylinder 4 | 17 | 1 | 16 |
| 9 | Lineas LineBasicMaterial #9fe2ff op0.5 transp dw Front Normal | 17 | Edges 17 | 17 | 1 | 16 |
| 10 | Lineas LineBasicMaterial #9fb0c8 op0.35 transp dw Front Normal | 16 | Buffer 16 | 16 | 1 | 15 |
| 11 | Lineas LineBasicMaterial #9fe2ff op0.6 transp dw Front Normal | 14 | Edges 14 | 14 | 1 | 13 |
| 12 | Mesh MeshBasicMaterial #223250 op1 opaco dw Double Normal | 14 | Buffer 8, Circle 6 | 14 | 1 | 13 |
| 13 | Mesh MeshStandardMaterial #2a3f66 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 13 | Box 9, Extrude 3, Cylinder 1 | 13 | 1 | 12 |
| 14 | Mesh MeshStandardMaterial #223558 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 8 | Box 1, Extrude 7 | 8 | 1 | 7 |
| 15 | Lineas LineDashedMaterial #d8dee8 op0.28 transp dw Front Normal guion3/2.4 | 8 | Buffer 8 | 8 | 1 | 7 |
| 16 | Lineas LineBasicMaterial #9fb0c8 op0.6 transp dw Front Normal | 7 | Buffer 7 | 7 | 1 | 6 |
| 17 | Mesh MeshBasicMaterial #ffffff op1 opaco dw Front Normal | 7 | Octahedron 7 | 7 | 1 | 6 |
| 18 | Mesh MeshStandardMaterial #6b7b94 op1 opaco dw Front Normal met0 rou0.95 em#000000*1 | 5 | Cone 5 | 5 | 1 | 4 |
| 19 | Mesh MeshStandardMaterial #d8dee8 op1 opaco dw Front Normal met0.6 rou0.3 em#000000*1 | 5 | Cylinder 5 | 5 | 1 | 4 |
| 20 | Lineas LineBasicMaterial #9fe2ff op0.7 transp dw Front Normal | 4 | Edges 4 | 4 | 1 | 3 |
| 21 | Lineas LineBasicMaterial #ff6a3d op0.85 transp dw Front Normal | 4 | Buffer 4 | 4 | 1 | 3 |
| 22 | Lineas LineBasicMaterial #e6ecf5 op0.85 transp dw Front Normal | 3 | Buffer 3 | 3 | 1 | 2 |
| 23 | Mesh MeshBasicMaterial #38bdf8 op0.25 transp dw Front Normal | 3 | Box 3 | 3 | 1 | 2 |
| 24 | Lineas LineBasicMaterial #38bdf8 op0.6 transp dw Front Normal | 2 | Edges 2 | 2 | 1 | 1 |
| 25 | Mesh MeshBasicMaterial #38bdf8 op0.5 transp dw Double Normal | 2 | Ring 2 | 2 | 1 | 1 |
| 26 | Lineas LineBasicMaterial #38bdf8 op0.47 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 27 | Lineas LineBasicMaterial #38bdf8 op0.44 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 28 | Lineas LineBasicMaterial #38bdf8 op0.41 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 29 | Lineas LineBasicMaterial #38bdf8 op0.38 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 30 | Lineas LineBasicMaterial #38bdf8 op0.35 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 31 | Lineas LineBasicMaterial #38bdf8 op0.32 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 32 | Lineas LineBasicMaterial #38bdf8 op0.29 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 33 | Lineas LineBasicMaterial #38bdf8 op0.26 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 34 | Lineas LineBasicMaterial #38bdf8 op0.23 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 35 | Lineas LineBasicMaterial #38bdf8 op0.2 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 36 | Mesh MeshBasicMaterial #0b1730 op0.9 transp dw Front Normal | 1 | Box 1 | 1 | 1 | 0 |
| 37 | Lineas LineBasicMaterial #f3b35c op0.65 transp dw Front Normal | 1 | Edges 1 | 1 | 1 | 0 |
| 38 | Lineas LineDashedMaterial #f3b35c op0.8 transp dw Front Normal guion3/2.4 | 1 | Buffer 1 | 1 | 1 | 0 |
| 39 | Lineas LineDashedMaterial #9fe2ff op0.6 transp dw Front Normal guion3/2.4 | 1 | Buffer 1 | 1 | 1 | 0 |
| 40 | Mesh MeshStandardMaterial #41516e op1 opaco dw Double Normal met0.35 rou0.55 em#000000*1 | 1 | Cylinder 1 | 1 | 1 | 0 |
| 41 | Lineas LineBasicMaterial #9fe2ff op0.8 transp dw Front Normal | 1 | Edges 1 | 1 | 1 | 0 |
| 42 | Lineas LineDashedMaterial #9fe2ff op0.7 transp dw Front Normal guion3/2.4 | 1 | Buffer 1 | 1 | 1 | 0 |
| 43 | Mesh MeshBasicMaterial #007aff op0.4 transp dw Front Normal | 1 | Plane 1 | 1 | 1 | 0 |
| 44 | Lineas LineDashedMaterial #e6ecf5 op0.6 transp dw Front Normal guion3/2.4 | 1 | Buffer 1 | 1 | 1 | 0 |
| 45 | Lineas LineBasicMaterial #e6ecf5 op0.9 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 46 | Mesh MeshStandardMaterial #38bdf8 op0.45 transp dw Front Normal met0.2 rou0.1 em#000000*1 | 1 | Cylinder 1 | 1 | 1 | 0 |
| 47 | Mesh MeshBasicMaterial #38bdf8 op1 opaco dw Front Normal | 1 | Torus 1 | 1 | 1 | 0 |
| 48 | Mesh MeshBasicMaterial #007aff op0 transp noDW Double Aditivo | 1 | Cylinder 1 | 1 | 1 | 0 |
| | **Total** | **381** | | **381** | **48** | **333** |

Ocultas (no generan orden de dibujo): 17 sprites de etiqueta `tag()` (línea 1180, `visible = false`; en tajo nunca se muestran).

#### Sub: 669 piezas estáticas (663 visibles) en 73 materiales equivalentes (72 con piezas visibles)

| # | Material equivalente (tipo, clase, color, opacidad, transparente, depthWrite, cara, mezcla, extras) | Piezas visibles | Geometrías | Órdenes hoy | Tras fusionar | Ahorro |
|---|---|---|---|---|---|---|
| 1 | Sprite SpriteMaterial #ffe3b0 op0.6 transp noDW Front Aditivo map 128x128:29A5 | 102 | Buffer 102 | 102 | 102 (sprite) | 0 |
| 2 | Lineas LineBasicMaterial #9fb0c8 op0.7 transp dw Front Normal | 52 | Buffer 52 | 52 | 1 | 51 |
| 3 | Lineas LineBasicMaterial #9fb0c8 op0.35 transp dw Front Normal | 38 | Buffer 38 | 38 | 1 | 37 |
| 4 | Mesh MeshStandardMaterial #6b7b94 op1 opaco dw Front Normal met0 rou0.95 em#000000*1 | 25 | Dodecahedron 24, Cone 3 | 25 | 1 | 24 |
| 5 | Mesh MeshStandardMaterial #0a0f1a op1 opaco dw Front Normal met0 rou0.9 em#000000*1 | 26 | Cylinder 26 | 26 | 1 | 25 |
| 6 | Lineas LineBasicMaterial #9fe2ff op0.2 transp dw Front Normal | 26 | Edges 26 | 26 | 1 | 25 |
| 7 | Mesh MeshStandardMaterial #3d6db5 op0.3 transp noDW Double Normal met0 rou0.8 em#0a2a5a*0.6 | 24 | Buffer 24 | 24 | 1 | 23 |
| 8 | Mesh MeshBasicMaterial #1b3560 op0.85 transp noDW Double Normal | 24 | Buffer 24 | 24 | 1 | 23 |
| 9 | Lineas LineBasicMaterial #38bdf8 op0.45 transp dw Front Normal | 24 | Buffer 24 | 24 | 1 | 23 |
| 10 | Mesh MeshStandardMaterial #1c2a44 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 24 | Box 18, Cylinder 5, Cone 1 | 24 | 1 | 23 |
| 11 | Mesh MeshStandardMaterial #b8c4d4 op1 opaco dw Front Normal met0.6 rou0.35 em#000000*1 | 22 | Cylinder 11, Box 11 | 22 | 1 | 21 |
| 12 | Mesh MeshStandardMaterial #4a5b78 op1 opaco dw Double Normal met0 rou0.9 em#000000*1 | 20 | Buffer 20 | 20 | 1 | 19 |
| 13 | Lineas LineBasicMaterial #9fe2ff op0.5 transp dw Front Normal | 19 | Edges 19 | 19 | 1 | 18 |
| 14 | Lineas LineBasicMaterial #9fe2ff op0.4 transp dw Front Normal | 18 | Edges 18 | 18 | 1 | 17 |
| 15 | Lineas LineBasicMaterial #9fe2ff op0.6 transp dw Front Normal | 17 | Edges 17 | 17 | 1 | 16 |
| 16 | Mesh MeshStandardMaterial #e0a43a op0.32 transp noDW Double Normal met0 rou0.7 em#6b3d05*0.5 | 14 | Buffer 3, Sphere 1, Extrude 1, Box 9 | 14 | 1 | 13 |
| 17 | Lineas LineBasicMaterial #f3b35c op0.6 transp dw Front Normal | 12 | Buffer 3, Edges 9 | 12 | 1 | 11 |
| 18 | Mesh MeshStandardMaterial #e8a83a op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 12 | Box 12 | 12 | 1 | 11 |
| 19 | Mesh MeshStandardMaterial #e6ecf5 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 11 | Box 11 | 11 | 1 | 10 |
| 20 | Lineas LineBasicMaterial #ffffff op0.09 transp noDW Front Aditivo vcol | 10 | Buffer 10 | 10 | 1 | 9 |
| 21 | Lineas LineBasicMaterial #9fb0c8 op0.6 transp dw Front Normal | 10 | Buffer 10 | 10 | 1 | 9 |
| 22 | Mesh MeshStandardMaterial #7d8aa0 op0.72 transp dw Double Normal met0 rou0.95 em#000000*1 | 8 | Buffer 4, Box 4 | 8 | 1 | 7 |
| 23 | Lineas LineBasicMaterial #b8c4d4 op0.35 transp dw Front Normal | 8 | Buffer 8 | 8 | 1 | 7 |
| 24 | Lineas LineBasicMaterial #f3b35c op0.4 transp dw Front Normal | 7 | Buffer 7 | 7 | 1 | 6 |
| 25 | Mesh MeshStandardMaterial #2a3f66 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 7 | Box 3, Extrude 4 | 7 | 1 | 6 |
| 26 | Mesh MeshStandardMaterial #5b6b85 op0.32 transp noDW Double Normal met0 rou1 em#0a2a5a*0.6 | 5 | Cylinder 5 | 5 | 1 | 4 |
| 27 | Lineas LineBasicMaterial #f3b35c op0.45 transp dw Front Normal | 5 | Buffer 4, Edges 1 | 5 | 1 | 4 |
| 28 | Mesh MeshStandardMaterial #223558 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 5 | Extrude 5 | 5 | 1 | 4 |
| 29 | Mesh MeshBasicMaterial #223250 op1 opaco dw Double Normal | 5 | Buffer 5 | 5 | 1 | 4 |
| 30 | Lineas LineDashedMaterial #d8dee8 op0.28 transp dw Front Normal guion3/2.4 | 5 | Buffer 5 | 5 | 1 | 4 |
| 31 | Lineas LineBasicMaterial #f3b35c op0.25 transp dw Front Normal | 4 | Buffer 4 | 4 | 1 | 3 |
| 32 | Lineas LineBasicMaterial #b8c4d4 op0.4 transp dw Front Normal | 4 | Edges 4 | 4 | 1 | 3 |
| 33 | Lineas LineDashedMaterial #f3b35c op0.55 transp dw Front Normal guion1.2/0.8 | 4 | Edges 4 | 4 | 1 | 3 |
| 34 | Mesh MeshStandardMaterial #f2c14e op1 opaco dw Front Normal met0 rou0.7 em#5a3c00*0.35 | 4 | Tube 4 | 4 | 1 | 3 |
| 35 | Mesh MeshBasicMaterial #02050c op0.5 transp noDW Double Normal | 3 | Buffer 1, Box 1, Cylinder 1 | 3 | 1 | 2 |
| 36 | Lineas LineBasicMaterial #9fe2ff op0.8 transp dw Front Normal | 3 | Buffer 2, Edges 1 | 3 | 1 | 2 |
| 37 | Mesh MeshStandardMaterial #d97706 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 3 | Box 3 | 3 | 1 | 2 |
| 38 | Lineas LineDashedMaterial #9fe2ff op0.7 transp dw Front Normal guion3/2.4 | 3 | Buffer 3 | 3 | 1 | 2 |
| 39 | Sprite SpriteMaterial #38bdf8 op0.9 transp noDW Front Aditivo map 128x128:29A5 | 3 | Buffer 3 | 3 | 3 (sprite) | 0 |
| 40 | Lineas LineDashedMaterial #9fe2ff op0.55 transp dw Front Normal guion3/2.4 | 3 | Buffer 3 | 3 | 1 | 2 |
| 41 | Lineas LineBasicMaterial #9fe2ff op0.7 transp dw Front Normal | 3 | Edges 3 | 3 | 1 | 2 |
| 42 | Mesh MeshBasicMaterial #38bdf8 op0.25 transp dw Front Normal | 3 | Box 3 | 3 | 1 | 2 |
| 43 | Lineas LineBasicMaterial #38bdf8 op0.14 transp dw Front Normal | 2 | Buffer 2 | 2 | 1 | 1 |
| 44 | Mesh MeshStandardMaterial #3d6db5 op0.32 transp noDW Double Normal met0 rou1 em#0a2a5a*0.6 | 2 | Cylinder 2 | 2 | 1 | 1 |
| 45 | Mesh MeshStandardMaterial #1e6fd0 op1 opaco dw Front Normal met0.5 rou0.4 em#000000*1 | 2 | Cylinder 2 | 2 | 1 | 1 |
| 46 | Mesh MeshStandardMaterial #e6ecf5 op1 opaco dw Front Normal met0.7 rou0.3 em#000000*1 | 2 | Torus 2 | 2 | 1 | 1 |
| 47 | Lineas LineBasicMaterial #e6ecf5 op0.7 transp dw Front Normal | 2 | Buffer 2 | 2 | 1 | 1 |
| 48 | Lineas LineBasicMaterial #e6ecf5 op0.6 transp dw Front Normal | 2 | Buffer 2 | 2 | 1 | 1 |
| 49 | Lineas LineBasicMaterial #38bdf8 op0.6 transp dw Front Normal | 2 | Edges 2 | 2 | 1 | 1 |
| 50 | Mesh MeshBasicMaterial #38bdf8 op0.5 transp dw Double Normal | 2 | Ring 2 | 2 | 1 | 1 |
| 51 | Lineas LineBasicMaterial #ffffff op0.8 transp noDW Front Aditivo vcol | 1 | Buffer 1 | 1 | 1 | 0 |
| 52 | Lineas LineBasicMaterial #38bdf8 op0.22 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 53 | Mesh MeshBasicMaterial #1e6fd0 op0.5 transp noDW Front Normal | 1 | Cylinder 1 | 1 | 1 | 0 |
| 54 | Sprite SpriteMaterial #ffffff op1 transp noDW Front Normal map 360x64:95C7 | 1 | Buffer 1 | 1 | 1 (sprite) | 0 |
| 55 | Lineas LineDashedMaterial #ffd28a op0.85 transp dw Front Normal guion1/0.6 | 1 | Buffer 1 | 1 | 1 | 0 |
| 56 | Sprite SpriteMaterial #ffffff op1 transp noDW Front Normal map 485x64:070A | 1 | Buffer 1 | 1 | 1 (sprite) | 0 |
| 57 | Mesh MeshBasicMaterial #1b3560 op0.75 transp noDW Double Normal | 1 | Shape 1 | 1 | 1 | 0 |
| 58 | Lineas LineBasicMaterial #38bdf8 op0.35 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 59 | Sprite SpriteMaterial #ffffff op1 transp noDW Front Normal map 400x64:353B | 1 | Buffer 1 | 1 | 1 (sprite) | 0 |
| 60 | Lineas LineBasicMaterial #e6ecf5 op0.85 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 61 | Lineas LineBasicMaterial #9fb0c8 op0.4 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 62 | Lineas LineBasicMaterial #5fb4ff op0.75 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 63 | Mesh MeshStandardMaterial #2f9e6a op1 opaco dw Front Normal met0.4 rou0.5 em#000000*1 | 1 | Box 1 | 1 | 1 | 0 |
| 64 | Sprite SpriteMaterial #5fe39a op0.85 transp noDW Front Aditivo map 128x128:29A5 | 1 | Buffer 1 | 1 | 1 (sprite) | 0 |
| 65 | Mesh MeshStandardMaterial #8d9bb0 op1 opaco dw Front Normal met0.35 rou0.55 em#000000*1 | 1 | Box 1 | 1 | 1 | 0 |
| 66 | Sprite SpriteMaterial #f3b35c op0.8 transp noDW Front Aditivo map 128x128:29A5 | 1 | Buffer 1 | 1 | 1 (sprite) | 0 |
| 67 | Lineas LineBasicMaterial #d8dee8 op0.6 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 68 | Lineas LineBasicMaterial #e6ecf5 op0.75 transp dw Front Normal | 1 | Buffer 1 | 1 | 1 | 0 |
| 69 | Lineas LineDashedMaterial #9fb0c8 op0.5 transp dw Front Normal guion3/2.4 | 1 | Buffer 1 | 1 | 1 | 0 |
| 70 | Mesh MeshStandardMaterial #2a3f66 op1 opaco dw Double Normal met0.35 rou0.55 em#000000*1 | 1 | Cylinder 1 | 1 | 1 | 0 |
| 71 | Mesh MeshStandardMaterial #8d9bb0 op1 opaco dw Front Normal met0.1 rou0.8 em#000000*1 | 1 | Extrude 1 | 1 | 1 | 0 |
| 72 | Mesh MeshBasicMaterial #007aff op0 transp noDW Double Aditivo | 1 | Cylinder 1 | 1 | 1 | 0 |
| | **Total** | **663** | | **663** | **175** | **488** |

Ocultas (no generan orden de dibujo): 4 cajas de tajeo con `MeshBasicMaterial({ visible: false })` (línea 1798); sus aristas con guiones sí se dibujan y están en la tabla.

## 4. Propuesta de fusión, cuenta esperada y riesgos

### 4.1 Cuenta esperada por pasos (medida sobre la escena real)

Para cada paso se agruparon en la página los objetos visibles según lo que quedaría fusionado y se contaron los grupos resultantes, en cuatro estados: inicio de día, inicio de noche, encendido de día y encendido de noche. La tabla da el mínimo y el máximo de esos cuatro estados. No descuenta el recorte por encuadre, que hoy quita menos de 60 órdenes, así que las cifras son cotas superiores. En celular la cuenta es la misma. Cada paso se suma a los anteriores.

| Paso | Qué se hace | Tajo | Sub | Riesgo para la imagen |
|---|---|---|---|---|
| 0 | Hoy (objetos visibles) | 755–790 | 1075–1111 | — |
| 1 | Estáticas por material equivalente exacto (sección 3; sprites sueltos) | 422–457 | 587–623 | opacas: ninguno; transparentes: orden (4.3) |
| 2 | Piezas rígidas de cada equipo en una geometría por material, conservando aparte lo que se mueve dentro (tolva, cucharón, brazo, vigas, carga) | 345–380 | 474–510 | bajo |
| 3 | Grupos con un solo valor por cuadro: ventanas (1 malla), charcos de luz (1), conos de luz (1) | 307–342 | 462–498 | bajo |
| 4 | No dibujar lo que tiene opacidad 0 y no escribe profundidad (`visible = opacity > 0` en 2651, 2674, 2681, 2683 y 2692) | 250–305 | 428–461 | ninguno: mismos píxeles |
| 5 | Color y opacidad por vértice (atributo `color` RGBA; r128 activa `USE_COLOR_ALPHA` cuando `vertexColors` está encendido y el atributo tiene 4 componentes). Material blanco, que multiplica por 1. Así se unen grupos que solo difieren en color u opacidad | 180–235 | 352–385 | orden de transparencias, mayor que en el paso 1 |
| 6 | Sprites estáticos en una sola malla de "carteles" (quads que miran a la cámara) con un shader propio que copia el de `SpriteMaterial`: centro, escala, textura, niebla y mezcla | 180–235 | 246–279 | píxeles casi iguales; hay que comparar |
| 7 | Balizas: `stem` y `pad` fusionados con color por vértice actualizado en cada cuadro (10 balizas); `gem`, `packets` y `orbit` como `InstancedMesh` con `instanceColor`; `beamMesh` queda suelto (10) | 124–179 | 190–223 | medio: orden entre transparentes |
| 8 | Sprites dinámicos (chispas, estela y flujo del disparo, brillos de manga y aire, luces nocturnas, polvo) en carteles instanciados por textura y mezcla | 87–97 | 142–152 | medio (como el paso 6, más el movimiento) |
| 9 | `InstancedMesh` para equipos iguales (5 volquetes del tajo, 3 scoops, 4 carros, 3 volquetes de rampa) y para el mineral en movimiento | **54–64** | **75–85** | bajo en piezas opacas |

**Conclusión.** La Fase B tal como está escrita en la spec (fusionar estáticas, equipos y grupos uniformes, más la opacidad 0 que no cambia nada) llega a **250–305 órdenes en tajo y 428–461 en sub**, lejos de la meta de 120.

- **Tajo:** llega a la meta con los pasos 1 a 8 (87–97). Con el paso 9 baja a 54–64.
- **Sub:** necesita los 9 pasos (75–85). Con 8 pasos se queda en 142–152.

Los pasos 5 a 9 no figuran en la Fase B de la spec: cambian el método (shader propio para carteles, color por vértice, instancias), aunque no cambian la imagen ni añaden dependencias. **Hay que decidir si se aprueban.** Sin ellos, la meta de 120 no se alcanza.

**Desglose de las 64 órdenes que quedan en tajo encendido de noche (paso 9):**

| Qué queda | Órdenes |
|---|---|
| Grupos estáticos | 13 |
| Piezas sueltas: 10 tubos de baliza, relieve (2), estrellas, corazón, nudo, sinapsis y neuronas | 17 |
| Volquetes: 5 materiales instanciados, faros y 2 piezas propias | 8 |
| Perforadoras: cabezal, barra y polvo, distintos por fase | 8 |
| Pala | 6 |
| Radares: 2 piezas cada uno, porque sus abanicos tienen geometrías distintas | 4 |
| Balizas: `stem`, `pad`, `gem` y paquetes u órbitas | 4 |
| Luces nocturnas: charcos y conos (2) y sprites de luz en un cartel (1) | 3 |
| Ventanas | 1 |
| Mineral en las fajas | 1 |
| Carteles del núcleo y del disparo | 1 |
| **Total** | **64** |

En sub (85 órdenes) quedan 25 grupos estáticos y 4 de sprites, el corte de vidrio, los cables del izaje (su geometría se reescribe en cada cuadro), los equipos instanciados por material (unas 25 órdenes) y las balizas.

### 4.2 Lo que se queda como está (no se fusiona)

- **Relieve** (`terrain`): 2 mallas por mina, cada una con su `uLow` y `uFade`. **Corte de vidrio** de sub: shader propio.
- **Estrellas** (`Points` en `scene`).
- **Núcleo**: `heart`, `shell`, sinapsis, neuronas, `halo`, `star`. Son piezas únicas con valores propios por cuadro. Las 28 chispas pasan a carteles en el paso 8.
- **Disparo**: `bolt` y `ray`, piezas únicas que se ven solo durante el disparo.
- **`beamMesh` de las balizas** (10): cada uno tiene su propio `setDrawRange`.
- **Geometrías reescritas en cada cuadro**: cable de la pala (2389), barras de perforación (2399), cables del izaje (2412). Pueden quedar sueltas o fusionarse escribiendo los vértices en el búfer común; lo más simple es dejarlas.
- **Etiquetas `tag()`**: cada una tiene su propia textura de lienzo. En sub se ven 3; en tajo están ocultas y no cuestan órdenes.

### 4.3 Riesgos concretos

1. **Orden de las transparencias (el riesgo principal).** r128 ordena las piezas transparentes por `renderOrder`, después por la profundidad del **origen del objeto** (posición de `matrixWorld`, no el centro de la geometría) y después por `id`; es la función `ts` de `three.min.js`. Al fusionar, el grupo entero pasa a ordenarse con un único origen y se pierde el orden entre las piezas. Piezas visibles en el estado encendido, por clase:
   - **Transparentes normales que escriben profundidad:** tajo 295 (228 líneas), sub 469 (401 líneas). El orden decide con qué color se mezclan y qué tapan.
   - **Transparentes normales sin profundidad:** tajo 3, sub 80 (túneles, pisos, cuerpos de mineral, vacíos). El orden importa donde se superponen.
   - **Aditivas sin profundidad:** tajo 132, sub 214. Entre ellas el orden da igual, **pero no respecto al relieve ni al vidrio**, que se mezclan de forma normal.
   - **Opacas:** tajo 324, sub 313. Sin riesgo.
2. **El relieve y el vidrio son transparentes y se ordenan en el origen.** Una línea dibujada antes del relieve se mezcla con el fondo; dibujada después, se mezcla con el relieve. Una pieza sin profundidad que queda detrás del vidrio de sub sale oscurecida solo si se dibuja antes que él.
   - Hoy, las piezas que ya están en el origen (vías, túneles, líneas por puntos) empatan con el relieve y el vidrio y se ordenan por `id`, es decir, por orden de creación. Si un grupo fusionado conserva ese orden de creación, el resultado es el mismo.
   - Las piezas con posición propia sí cambian de lado. Por ejemplo, las 102 lámparas de labor y los pilares de sub, que están detrás del vidrio (z < 0, con la cámara del lado z > 0), se dibujarían **después** del vidrio si el grupo fusionado quedara en el origen, y dejarían de verse atenuadas.
   - **Mitigación:** ubicar cada objeto fusionado en el centro de sus piezas (geometría desplazada en sentido contrario), separar los grupos por lado del vidrio en sub (z < 0 / z ≥ 0), y no mezclar en un grupo piezas que están en el origen con piezas posicionadas. Si `tools/comparar.py` marca diferencias, ese grupo se separa o se queda sin fusionar.
3. **El giro con el mouse o el dedo cambia la profundidad relativa.** Una cámara fija puede pasar la comparación y otra vista girada mostrar diferencias leves en piezas transparentes cercanas al relieve. Hay que mirar a ojo dos o tres vistas giradas además de las 43 capturas.
4. **Normales.** Varias piezas tienen escala no uniforme o están dentro de grupos escalados: cargas con `scale(1, 1, 1.5)`, volquete ×0,42, pala ×0,72, torre ×0,6. Las normales de las piezas `MeshStandardMaterial` deben transformarse con la matriz normal (inversa traspuesta), no con la matriz de mundo; si no, cambia la iluminación.
5. **Líneas con guiones.** La distancia de línea se calcula por cada línea original (`computeLineDistances`) y se copia al búfer fusionado. Las tiras (`Line`) pasan a pares de segmentos, conservando la distancia acumulada de cada tira. El patrón (3/2,4; 1,2/0,8; 1/0,6) separa los grupos.
6. **Carteles (pasos 6 y 8).** El shader propio debe repetir el cálculo de `SpriteMaterial`: posición del centro en la vista, escala desde `matrixWorld`, `sizeAttenuation`, textura `glowTex`, niebla y mezcla aditiva. Cualquier diferencia se nota en las 102 lámparas de sub. Los faros de los volquetes deben recalcular su posición en cada cuadro.
7. **Instancias (pasos 7 y 9).** Las instancias transparentes (`gem` con opacidad 0,95 que escribe profundidad, paquetes con 0,75, órbitas con 0,8) no se ordenan entre sí. Las opacas (cuerpos de equipos, mineral) no tienen ese riesgo. Ocultar una instancia exige escala 0 o reordenar `count`.
8. **Recorte por encuadre.** Un objeto fusionado tiene una caja enorme y siempre se dibuja. No cambia la imagen, y hoy el encuadre ya recorta muy poco.
9. **Memoria al alternar minas.** `build` libera geometrías y materiales recorriendo `world` (línea 2216). Al fusionar hay que liberar en el momento las geometrías y materiales originales, que dejan de estar en `world`. Ojo con los materiales compartidos (`tunnelMat`, `floorMat`, `mangaMat`, `steel`, `pumpM`): no se pueden liberar mientras otra pieza aún los use.
10. **Luz puntual del núcleo.** El `PointLight` (alcance 90) ilumina las piezas `MeshStandardMaterial` cercanas. Fusionar no lo cambia, siempre que las normales sean correctas (riesgo 4).
11. **Tiempo de CPU.** `introLoop` incluye el cálculo de los equipos: curvas, `getPointAt`, la lógica de bahías. Menos objetos bajan el costo del recorrido de la escena y de la lista de dibujo; las instancias añaden subidas de matrices por cuadro, que son baratas. La meta de 12 ms se verifica en la Fase B.

### 4.4 Orden recomendado para la Fase B

1. Paso 4: opacidad 0. No cambia ningún píxel y es inmediato.
2. Pasos 1, 2 y 3 solo con las piezas **opacas** y los grupos aditivos.
3. Comparar.
4. Sumar las transparentes, con el objeto fusionado en el centro de sus piezas y separadas por lado del vidrio.
5. Comparar.
6. Pasos 5 a 9 solo si se aprueban, uno por uno, comparando capturas después de cada paso.
