# BRIEF DE CONTEXTO ESTRATÉGICO Y CRITERIOS DE DISEÑO PARA STITCH

> **Destinatario:** Stitch (AI UI/UX Designer & Frontend Architect)  
> **Propósito:** Brindar el contexto integral, la tesis de negocio, las intenciones de usuario y la filosofía de diseño para concebir la interfaz web corporativa de **Agentrax**, sin prescribir layouts ni sesgar la creatividad arquitectónica del diseñador.

---

## 1. Declaración de Libertad Creativa (Cero Sesgos de Maquetación)

Este documento **no impone** una disposición fija de cajas, grillas de columnas predeterminadas ni esquemas rígidos. 
Tu rol como Stitch es analizar el problema de fondo, la propuesta de valor y las necesidades de los usuarios para decidir con total autonomía:
- La distribución visual y el ordenamiento jerárquico de las secciones.
- El sistema de diseño: paleta cromática, tokens de elevación, espaciado, contrastes y materialidad.
- El lenguaje de interacción y las metáforas visuales más idóneas para representar la precisión de los sistemas.
- El balance óptimo entre impacto comercial, credibilidad técnica y experiencia de lectura.

---

## 2. Identidad y Contexto Real del Negocio

### ¿Qué es Agentrax?
**Agentrax Perú** es una compañía tecnológica constituida formalmente en Lima, Perú, enfocada en la intersección de **Inteligencia Artificial de grado corporativo, compilación documental determinista y automatización operativa de flujos críticos**.

### Pilares Tecnológicos Reales de la Empresa:
A diferencia de proyectos basados en simples wrappers de APIs públicas, el ecosistema de Agentrax integra capacidades probadas en ingeniería y operaciones:

1. **Agentes Cognitivos Autónomos & Orquestación:**
   - Sistemas multi-agente supervisados (*Human-in-the-Loop*) diseñados para resolver flujos complejos de back-office, logística y reconciliación de datos.
   - Políticas estrictas de *Zero-Data Retention*: garantía de que la información transaccional confidencial nunca se utiliza para reentrenar modelos fundacionales públicos.

2. **Compiladores Editoriales Deterministas (Ecosistema Doc-formatter):**
   - Motores de arquitectura `engine-vs-profile` que compilan entradas estructuradas (DocSource / Markdown + YAML) en documentos OpenXML (Word) y PDF de precisión tipográfica científica.
   - Calidad editorial basada en estándares rigurosos (Hermann Zapf, LaTeX booktabs, micro-tipografía armónica, validación determinista con cero páginas huérfanas y 100% reproducibilidad bit a bit).

3. **Consultoría y Transformación en Industrias de Alta Exigencia:**
   - Aplicación de analítica predictiva, modelos de aprendizaje automático y optimización en sectores críticos: minería (estabilidad, perforación, voladura, gestión de flotas dispatch), energía, logística y banca corporativa.
   - Metodologías rigurosas de investigación y soporte para proyectos de alto rigor técnico.

---

## 3. Audiencia Objetivo (Personas)

1. **Directores de Operaciones (COO) y Tecnología (CTO / CIO):**  
   Buscan automatizar procesos costosos y repetitivos sin comprometer la seguridad de su infraestructura ni arriesgarse a alucinaciones de modelos de lenguaje genéricos.
2. **Gerentes de Consultoría e Ingeniería:**  
   Requieren generación de informes técnicos, expedientes y propuestas corporativas con una presentación editorial impecable, determinista y auditable.
3. **Comités de Evaluación de Ecosistemas de Startups (Google Cloud for Startups & Anthropic):**  
   Evalúan solvencia técnica, legitimidad comercial, compliance regulatorio (Ley de Protección de Datos Personales N° 29733, GDPR) y una propuesta de valor basada en tecnología propietaria escalable.

---

## 4. Botones, Puntos de Contacto y Acciones Requeridas (CTAs)

Stitch debe decidir la ubicación, jerarquía, tamaño y estilo de estos elementos, pero la interfaz debe resolver las siguientes intenciones de acción del usuario:

* **Acción de Contacto Principal (Primary CTA):**  
  *Intención:* Iniciar una consulta técnica, solicitar una demostración o evaluar factibilidad de implementación.  
  *Destino funcional:* Formulario de contacto / Canal directo hacia `comercial@agentraxperu.com`.

* **Acción de Exploración Técnica / Capacidades (Secondary CTA):**  
  *Intención:* Permitir a los perfiles técnicos o directivos profundizar en las soluciones (Agentes de IA, Automatización RPA, Compilador Determinista, Consultoría MLOps).

* **Acciones de Transparencia y Formalidad Legal:**  
  *Intención:* Permitir la revisión de Términos de Servicio y Política de Privacidad y Tratamiento de Datos (cumplimiento Ley N° 29733 de Perú y directivas de privacidad de IA).

* **Canal Directo Visible:**  
  *Intención:* Disponibilidad inmediata del correo corporativo visible `comercial@agentraxperu.com` para correspondencia formal y alianzas.

---

## 5. Filosofía de Diseño Requerida: Emil Kowalski & Principios Impeccable

El diseño resultante debe alejarse radicalmente de plantillas genéricas ("AI startup slop") y fundamentarse en dos pilares de ingeniería de diseño:

### A. Escuela Emil Kowalski (Design Engineering & Invisible Details)
* **Los detalles invisibles se acumulan:** Un buen producto se siente bien de forma natural; no abruma al usuario con efectos artificiales.
* **Propósito en el movimiento:** Ninguna animación debe existir solo por "verse bonita".
  * Las interacciones frecuentes deben responder de inmediato (duraciones entre 150ms y 200ms con curvas `ease-out`).
  * Retroalimentación táctil en botones y tarjetas con estados `:active` reactivos (`transform: scale(0.98)`).
* **Consistencia espacial:** Entradas y salidas coherentes que respeten el origen físico de los disparadores visuales.

### B. Estándares Impeccable (Anti-Slop & Craft Floor)
* **Modo Persuade con rigor de ingeniería:** La estética debe comunicar sobriedad corporativa, rigor matemático y confianza empresarial, no juguetes experimentales.
* **Tipografía con carácter y legibilidad:** Empleo armónico de jerarquía tipográfica, interletrado calibrado, ritmo vertical estricto y contraste accesible (mínimo WCAG AA).
* **Materialidad sutil:** Fondos oscuros profundos o esquemas de contraste balanceados, micro-bordes refinados (1px con opacidades sutiles), sombras calibradas sin manchas difusas exageradas.
* **Densidad de información balanceada:** Cada párrafo debe tener peso y significado real; evitar textos genéricos de relleno.

---

## 6. Instrucción Abierta para Stitch

> **Stitch:** Con este contexto sobre la naturaleza técnica de Agentrax, sus usuarios clave, los llamados a la acción necesarios y los estándares de ingeniería de diseño, diseña la propuesta web completa que mejor posicione a la empresa como un referente de IA corporativa y rigor de ingeniería en Latinoamérica. Define la composición, los módulos, el ritmo visual y el código con total libertad creativa.
