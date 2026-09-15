# Panel de Control de Proyectos (AI Dashboard)

Este repositorio sirve como la **fuente de la verdad** (Single Source of Truth) para el estado, desarrollo y estrategia comercial de todos los proyectos activos. Cualquier Inteligencia Artificial (Claude, Antigravity, ChatGPT, etc.) debe leer este documento para obtener el contexto actualizado antes de asistir en el desarrollo o marketing de los proyectos.

## Ãndice de Proyectos
1. [iNGIZER](#1-ingizer)
2. [PosBank](#2-posbank)
3. [igeogo](#3-igeogo)
4. [bizzopp](#4-bizzopp)
5. [cubecanvas](#5-cubecanvas)
6. [imjago](#6-imjago)

---

## 1. iNGIZER

### Estado General
Sin bloqueos activos en el motor de diagnÃ³stico. SesiÃ³n del 2026-09-09 muy productiva: se resolviÃ³ un bug crÃ­tico que tenÃ­a caÃ­do el motor de diagnÃ³stico completo desde el 16 de agosto, se corrieron por primera vez de punta a punta las Ramas A y C, se mitigaron 2 bugs de experiencia de usuario, y se construyÃ³ y validÃ³ de punta a punta el primer cross-sell automÃ¡tico hacia PosBank dentro del diagnÃ³stico. AuditorÃ­a del 2026-09-10 encontrÃ³ una brecha importante entre lo que promete el landing comercial y lo que existe realmente construido (ver Hallazgos de AuditorÃ­a).

### Desarrollo y TecnologÃ­a (DevOps / Tech)
* **Landing Page:** Netlify (`public/ingizer/`), dominio en Squarespace.
* **Frontend & Database:** Bubble (maneja Google OAuth, UI del chat, panel de control y base de datos).
* **OrquestaciÃ³n / Backend:** Make.com (Escenario: `Message_incoming`).
* **Motor de IA:** Anthropic Claude Sonnet 5 (vÃ­a Make AI Agents, usando `Ingizer Agent (copy_1784370957200)`).
* **Integraciones:** Calendly, Google Workspace.
* **DocumentaciÃ³n de arquitectura:** `docs/iNGIZER/` (diagramas Mermaid del flujo Make/Bubble/Claude y del Ã¡rbol de preguntas del diagnÃ³stico).

### MÃ³dulos Completados
* EnvÃ­o de datos de registro (sector, empleados, descripciÃ³n) al prompt de la IA.
* CorrecciÃ³n de markdown roto en el chat UI.
* VerificaciÃ³n de negocio en Meta resuelta y mÃ©todo de pago aÃ±adido.
* Email de notificaciÃ³n a clientes creado.
* AÃ±os B1/B2 confirmados (2026/2027/2028).
* Orden cronolÃ³gico de los badges del dashboard corregido.
* CTA de descarga de PDF desbloqueado y visible (verificado end-to-end).
* Duplicidad del CTA de WhatsApp resuelta: eliminado el botÃ³n grande "Ponte en contacto con nosotros"; queda el Ã­cono chico como Ãºnico CTA. Desplegado el 2026-09-08.
* Recarga de USD 40 en Anthropic (Tier 2) â€” saldo restablecido.
* **Bug crÃ­tico resuelto: conexiÃ³n de Gmail expirada en Make.com** (`Message_incoming`), que dejaba todo el chat sin responder desde el 16 de agosto. Reautorizada con los scopes correctos el 2026-09-09.
* **Ramas A (Emprendimiento) y C (Startup) corridas de punta a punta en producciÃ³n por primera vez** â€” ambas generan diagnÃ³stico completo (5 pestaÃ±as) coherente, con semÃ¡foros financieros variados.
* **Bug de notificaciÃ³n faltante y de refresco del chat, mitigados y confirmados en producciÃ³n:** workflow recurrente (`Do every 15 seconds`) en `ai_chat` que (a) muestra automÃ¡ticamente el popup de diagnÃ³stico listo sin recarga manual, y (b) recarga la pÃ¡gina como red de seguridad cuando el chat queda colgado. Verificado funcionando en vivo el 2026-09-09.
* **Link condicional a PosBank construido, desplegado y validado end-to-end:** en la pestaÃ±a "4. SituaciÃ³n Financiera" del popup de diagnÃ³stico, aparece un CTA discreto ("ðŸ’¡ Recomendado para ti: conoce PosBank, tu radar de flujo de caja â†’") cuando el anÃ¡lisis contiene seÃ±ales ðŸ”´ o ðŸŸ¡. Al hacer clic abre `https://posbank.ingizer.com/` en pestaÃ±a nueva â€” confirmado con captura real que carga la landing correcta de PosBank.

### ðŸ” Hallazgos de AuditorÃ­a (2026-09-10)
RevisiÃ³n completa del alcance real vs. lo que promete el landing (`ingizer.com`). Hallazgos que no deben perderse:
* **Los 3 CTAs de conversiÃ³n del landing terminan en el login genÃ©rico, sin producto real detrÃ¡s:** "Elegir plan" (planes $99/$199 USD/mes) y "Explorar" (18 Power Apps + IA) redirigen a `/login` sin ningÃºn checkout de pago ni herramienta conectada. El modelo de datos de Bubble (7 tipos: `Analisis financiero`, `Answer_Form`, `Chats`, `Device`, `Logs`, `Messages`, `User`) no tiene `Subscription`/`Payment`/`Plan`. **DecisiÃ³n pendiente del usuario:** conectar un checkout real o cambiar el copy del landing para no prometer algo que no existe.
* **PÃ¡gina `index` huÃ©rfana en Bubble:** existe una versiÃ³n vieja y distinta del landing dentro del editor de Bubble (mezcla inglÃ©s/espaÃ±ol, imÃ¡genes rotas) que no es la que ven los visitantes reales (el landing vive en Netlify). Confunde a quien edite la app pensando que es la pÃ¡gina real.
* **Leads reales estancados sin seguimiento automÃ¡tico**, visibles en `/dashboard`: "Rafel" (`rafaforero717@gmail.com`) atascado en "Pendiente de AnÃ¡lisis" desde el 05/08/2026 â€” muy probablemente perdido por el bug de Gmail ya resuelto, vale la pena contactarlo manualmente. Otros leads (Lavern, bypassing, Anibal, Fresh, Alfreda) llevan semanas en "Pendiente de Formulario" sin ningÃºn recordatorio automÃ¡tico.
* **Panel admin muy limitado:** solo lista usuarios (nombre/empresa/email/fecha/estado); el Ã­cono "ver detalle" no abre un detalle real (redirige a login); no hay mÃ©tricas de conversiÃ³n, ingresos ni notas de seguimiento comercial.

### Tareas en Progreso (Backlog actual)
* Verificar formato HTML del correo del cliente en una bandeja real.
* Limpiar y eliminar 3 agentes huÃ©rfanos en Make.com (requiere confirmaciÃ³n del usuario).
* **[Seguimiento]** Confirmar en Make â†’ History que el prÃ³ximo diagnÃ³stico completo dispare el correo de Gmail sin warnings.
* **[Mejora]** PÃ¡gina `/register` sin marca de ingizer â€” plantilla genÃ©rica de Bubble en inglÃ©s, con campo de foto de perfil roto.
* **[Mejora futura]** Extender el link condicional a PosBank a otras pestaÃ±as del diagnÃ³stico si se valida que genera conversiones.
* **[Media prioridad]** Contactar manualmente a leads reales estancados (Rafel y otros) â€” ver Hallazgos de AuditorÃ­a.

### Bloqueos / Problemas actuales
Ninguno en el motor de diagnÃ³stico. Ver Hallazgos de AuditorÃ­a para brechas de producto/negocio.

### Estrategia Comercial y Marketing
* **PÃºblico Objetivo (Target):** Pymes en Colombia.
* **Propuesta de Valor:** Asistente financiero automatizado con IA que provee un diagnÃ³stico financiero inicial.
* **Objetivo Comercial:** Usar el diagnÃ³stico automatizado como imÃ¡n de leads para vender el servicio de **DirecciÃ³n Financiera como Servicio (CFO-as-a-service)**.
* **Flujo del Usuario:** Landing page â†’ Login (Bubble) â†’ Chat con IA â†’ AnÃ¡lisis financiero â†’ Popup de diagnÃ³stico de 5 pestaÃ±as â†’ Agendar reuniÃ³n en Calendly o descargar PDF.
* **Cross-selling:** Link condicional a PosBank ya activo en la pestaÃ±a de SituaciÃ³n Financiera del diagnÃ³stico (ver MÃ³dulos Completados).
* **Planes publicados (sin checkout aÃºn):** Free $0, Consultor de crecimiento +AI $99 USD/mes, Director financiero Â· CFO+AI $199 USD/mes.

---

## 2. PosBank

### Estado General
La aplicaciÃ³n principal es altamente estable. El backend, aplicaciÃ³n mÃ³vil, landing page, motor de caja, inventario, POS y escaneo de facturas con IA estÃ¡n completamente desarrollados y sin problemas tÃ©cnicos pendientes. La skill de Alexa estÃ¡ en Beta Testing. El principal reto es la integraciÃ³n con WhatsApp, bloqueada temporalmente por la verificaciÃ³n de Meta.

### Desarrollo y TecnologÃ­a (DevOps / Tech)
* **Backend:** Node.js / Express / TypeScript.
* **Base de Datos:** Supabase (PostgreSQL con RLS multi-tenant).
* **Frontend:** React 19 + Vite, PWA instalable.
* **Despliegue (Hosting):** Railway (Plan Hobby).
* **Integraciones/APIs:** API de Anthropic (escaneo de facturas), Meta Cloud API, Twilio, Alexa Skills Kit.

### MÃ³dulos Completados
* **Sistemas Core:** Backend, App, Landing page, Motor de caja, Inventario, POS y escaneo de facturas.
* **Alexa Skill:** Lista para Beta Test. Se resolvieron problemas de timeout paralelizando consultas, con 32/32 tests pasando exitosamente.
* **Backend WhatsApp:** Enrutamiento, servicios y parsers completamente construidos y desplegados.

### Tareas en Progreso (Backlog actual)
* **VerificaciÃ³n WhatsApp (Prioridad Alta):**
    * Corregir direcciÃ³n en Meta Business Info para que coincida con el RUT ("Cra 80 Bis No. 7A - 15, BogotÃ¡ D.C., Colombia").
    * Reintentar verificaciÃ³n con RUT y el correo `admin@ingizer.com` (Plan B: crear WABA bajo el portafolio de Ingizer SAS).
* **Alexa (Prioridad Media):**
    * Probar el nombre de invocaciÃ³n ("pos bank") en un dispositivo Echo fÃ­sico.
    * Invitar testers reales mediante la app mÃ³vil de Alexa.
* **Decisiones de Producto:** Definir si se construye facturaciÃ³n POS por voz (pausado por ahora).

### Bloqueos / Problemas actuales
* **VerificaciÃ³n Meta:** La integraciÃ³n de WhatsApp estÃ¡ bloqueada por una restricciÃ³n activa (sospecha de automatizaciÃ³n) y problemas de formato de direcciÃ³n/telÃ©fono en el RUT.

### Estrategia Comercial y Marketing
* **PÃºblico Objetivo (Target):** Pymes colombianas.
* **Propuesta de Valor:** "Radar de caja inteligente" que los dueÃ±os pueden consultar vÃ­a App, Alexa o WhatsApp para conocer su flujo de caja, cuentas por pagar, inventario y ventas diarias al instante.
* **CaracterÃ­sticas Clave:** POS, Escaneo de facturas con IA y Panel centralizado de monitoreo.
* **MÃ©tricas (KPIs) de Costos:** Hosting muy econÃ³mico (â‰ˆ$2/mes en Railway) y escaneo con Anthropic a â‰ˆ$0.014 por lectura.

---

## 3. igeogo

### Estado General
Plataforma verificada en lÃ­nea y sin errores funcionales en su core (landings, app, panel, bot, base de datos). El bot de WhatsApp ya funciona de punta a punta en el nÃºmero real +57 300 2391085 (verificado 2026-09-09). El despliegue al pÃºblico ahora estÃ¡ pausado solo por el mÃ­nimo de transacciÃ³n de Wompi, que bloquea 3 de los 4 planes de precio.

### Desarrollo y TecnologÃ­a (DevOps / Tech)
* **Backend:** Node.js + Express (servido en Railway 24/7).
* **Base de Datos:** MongoDB Atlas + Mongoose (Ã­ndices `2dsphere` para geocoding).
* **Frontend:** HTML/CSS/JS plano (sin framework), App PWA y Panel Admin.
* **Dominio / Hosting:** `igeogo.ingizer.com` (DNS en Squarespace) / Railway.
* **Integraciones:** Meta Cloud API (WhatsApp bot), Mapbox + Nominatim (geolocalizaciÃ³n), Claude API (para redactar campaÃ±as), Wompi (pagos).

### MÃ³dulos Completados
* **Bot de WhatsApp:** Flujo completo (opt-in, categorÃ­as, ubicaciÃ³n, tarjetas de cupÃ³n, botÃ³n "INTERESADO").
* **App PWA:** Login por WhatsApp OTP, roles de usuario/comercio, mapa de ofertas, creaciÃ³n de campaÃ±as con IA y pagos.
* **Panel Admin:** GestiÃ³n de comercios, usuarios, cupones, campaÃ±as (despacho masivo probado end-to-end) y simulador de match.
* **Pagos & Seguridad:** Webhooks de Wompi validados por checksum, rotaciÃ³n de secretos completada.
* **SEO:** Sitemap, JSON-LD, imagen social (og.jpg).
* **Limpieza de datos de prueba (2026-09-07):** Se agregÃ³ el endpoint `DELETE /admin/campaigns/:id` (faltaba) y se eliminaron los 8 comercios de siembra y las 6 campaÃ±as demo. El panel queda en cero, listo para datos reales.
* **NÃºmero dedicado conseguido (2026-09-07):** Nueva lÃ­nea +573002391085, nunca tuvo WhatsApp, lista para registrar en producciÃ³n.
* **Causa raÃ­z del bloqueo de Meta identificada (2026-09-07):** El bot vive bajo la cuenta de Meta Business **"1ngizer"**, que es una cuenta **separada** de "Ingizer SAS" (verificada desde el 19 ago). Verificar una no verifica la otra. Se enviÃ³ la verificaciÃ³n de negocio de "1ngizer" con los mismos datos legales â†’ **En revisiÃ³n** (Meta estima ~2 dÃ­as hÃ¡biles).
* **VerificaciÃ³n de negocio "1ngizer" APROBADA (confirmado 2026-09-08):** Meta reusÃ³ los datos ya verificados de "Ingizer SAS" â€” estado "Verified". El WABA de 1ngizer tambiÃ©n ya tiene **mÃ©todo de pago agregado** (Mastercard, sin necesidad de acciÃ³n adicional) y **Account status: Approved**.
* **NÃºmero de producciÃ³n +57 300 2391085 registrado (2026-09-08):** Perfil de WhatsApp Business creado (nombre "igeogo", zona BogotÃ¡, categorÃ­a "Professional Services"), verificado por SMS y registrado con PIN. Phone Number ID: `1456047177580855`. `WHATSAPP_PHONE_NUMBER_ID` actualizado en Railway y servicio redesplegado (Online).
* **App de Meta "igeogo" publicada en Live (2026-09-09):** Se diagnosticÃ³ y corrigiÃ³ falta de "Subscribe webhooks" en el WABA, se crearon y desplegaron pÃ¡ginas reales de privacidad y tÃ©rminos (`igeogo.ingizer.com/privacidad/` y `/terminos/`), se completÃ³ Privacy Policy/Terms/Data deletion/Category en la app de Meta, y se publicÃ³ la app.
* **Bot confirmado funcionando end-to-end en el nÃºmero real (2026-09-09):** el usuario le escribiÃ³ "Hola" al +57 300 2391085 y el bot respondiÃ³ con el menÃº completo y solicitÃ³ compartir ubicaciÃ³n correctamente. El camino a producciÃ³n de WhatsApp queda completo.
* **Google Analytics 4 + analÃ­tica de campaÃ±as (2026-09-09):** cuenta de GA ("ingizer" â†’ propiedad "igeogo", Measurement ID `G-9Q6DNKDM7S`) agregada a las 5 pÃ¡ginas de landing. `Campaign.interestedCount` ahora registra cada respuesta "INTERESADO" y la tab CampaÃ±as muestra conversiÃ³n por campaÃ±a + resumen agregado.
* **Google Business Profile ya verificado (confirmado 2026-09-09):** estaba "Verified" desde antes. Se actualizÃ³ el telÃ©fono al nÃºmero real del bot y se conectÃ³ WhatsApp como canal de chat primario.
* **ValidaciÃ³n de canjes con cÃ³digo Ãºnico (2026-09-09):** el cÃ³digo de la tarjeta de WhatsApp ahora se persiste (modelo `Redemption`). Los comercios validan el cÃ³digo en `igeogo.ingizer.com/canjear/` â€” un cÃ³digo solo se puede usar una vez. Panel admin: nueva pestaÃ±a "Canjes" con historial.
* **AuditorÃ­a tÃ©cnica completa (2026-09-10):** revisiÃ³n de salud y cÃ³digo real â€” sin errores en logs, todos los endpoints responden. Se confirmaron 2 hallazgos crÃ­ticos con lectura directa del cÃ³digo: webhook de Meta sin validar firma, y `discountPercent` roto en cupones de comercio.
* **Asistente de IA ampliado (2026-09-11):** antes solo redactaba texto de campaÃ±as. Se agregÃ³ moderaciÃ³n de contenido (bloquea campaÃ±as con contenido engaÃ±oso/ilegal antes de crearlas) y recomendaciones automÃ¡ticas sobre resultados reales de campaÃ±a. La app del comercio ahora muestra sus resultados reales (enviados/interesados/% conversiÃ³n) â€” antes solo existÃ­an en el panel admin.
* **Hardening de seguridad desplegado (2026-09-11):** helmet + CORS explÃ­cito + rate limiting global en `/app/api` y `/admin`, validaciÃ³n timing-safe de la firma del webhook de Meta, comparaciÃ³n timing-safe de tokens de sesiÃ³n. Verificado en producciÃ³n (headers presentes, logs limpios). Pendiente un paso manual del usuario: configurar `WHATSAPP_APP_SECRET` en Railway para activar la validaciÃ³n de firma (hoy es fail-open).
* **3 hallazgos mÃ¡s de la auditorÃ­a cerrados (2026-09-11):** `discountPercent` agregado a `Coupon` (bug silencioso corregido, con UI en el panel), `redemptionLimit` ahora se respeta en el matching (cupones agotados ya no se entregan), rate limiting especÃ­fico en `/canjear/validar` (30/15min) y `/payments/wompi` (100/15min).
* **ProtecciÃ³n contra fuerza bruta en OTP, sanitizaciÃ³n y SEO estructurado (2026-09-12):** Conteo de intentos fallidos en OTP (bloqueo al 5.Â° intento en `User` y `app.controller`), comparaciÃ³n timing-safe (`crypto.timingSafeEqual`), sanitizaciÃ³n de cÃ³digos OTP en logs de producciÃ³n, rate limiting en registro de comercios (`leadLimiter` 10/15min en `/app/api/lead`), validaciÃ³n de expiraciÃ³n en canjes (`redemption.controller`) y datos estructurados JSON-LD Schema.org agregados a `/usuarios/` y `/negocios/` para validaciÃ³n en Google Rich Results y Facebook Debugger.

### Tareas en Progreso (Backlog actual)
* **Manual del usuario:** configurar `WHATSAPP_APP_SECRET` en Railway (Meta for Developers â†’ app "igeogo" â†’ Settings â†’ Basic â†’ App secret) para activar la validaciÃ³n de firma del webhook.
* **Operativas:**
    * Cargar comercios y cupones reales (panel ya limpio, sin datos de prueba).
    * Confirmar estado de la plantilla "oferta_cercana" en WhatsApp Manager â†’ Message Templates.
* **Decisiones Futuras:** Evaluar dominio propio (`igeogo.co`).

### Bloqueos / Problemas actuales
* **Soporte Wompi:** RestricciÃ³n activa (lÃ­mite mÃ­nimo de $150.000 COP por transacciÃ³n) que bloquea los planes bÃ¡sicos. Sigue sin respuesta. Es el Ãºnico bloqueo de negocio activo â€” Meta ya no bloquea.

### Estrategia Comercial y Marketing
* **Propuesta de Valor:** Plataforma de marketing de proximidad. Comercios crean campaÃ±as con descuentos y igeogo las entrega por WhatsApp a usuarios cercanos segÃºn intereses.
* **Privacidad:** El negocio sabe a cuÃ¡ntas personas llega, pero no quiÃ©nes son. El usuario solo comparte su ubicaciÃ³n de forma segura para hacer "match".

---

## 4. bizzopp
*(Pendiente de actualizar)*

---

## 5. cubecanvas (Cube Canvas / BCC)

### Estado General
Aplicación frontend 100% operativa y compilable en producción (`npm run build` verificado). Se recuperaron y sincronizaron los 13 módulos clave del repositorio de GitHub (`1ngizer/cube-canvas`), cubriendo el lienzo interactivo Business Cube Commands (BCC), motor financiero en tiempo real, modales de simulación de estrés, cascada de caja, pitch one-pager y Copilot IA multi-proveedor. Branding corporativo e imagotipo SVG isométrico 3D implementados.

### Desarrollo y Tecnología (DevOps / Tech)
* **Frontend:** React 19 + Vite (SPA interactiva).
* **Motor Financiero:** `src/utils/finance.js` (cálculo en memoria de flujo de caja, EBITDA, runway, punto de equilibrio, cobertura de deuda y capital stack).
* **Copilot IA:** `src/utils/aiService.js` (integración con Gemini API, OpenAI API y motor heurístico offline).
* **Estilos:** CSS Vanilla estructurado con variables y tokens de diseño (`src/index.css`, BCC Dark Theme corporativo).
* **Exportaciones:** Motor XLSX (`xlsx`) para libros con fórmulas y exportación PDF/impresión optimizada.
* **Hosting / Despliegue:** Configuraciones listas para Vercel (`vercel.json`) y Netlify (`netlify.toml`).
* **Repositorio GitHub:** `https://github.com/1ngizer/cube-canvas`.

### Módulos Completados
* **Scaffolding y Build:** Vite + React 19, dependencias instaladas y build limpio (`dist/`).
* **Lienzo Principal BCC (`BccCanvas.jsx`):** Vista de pantalla única (100vh) que visualiza las 4 áreas clave (Estrategia, Caja, Costos, Capital Stack).
* **Drawer / Modal de Módulos (`ModuleModal.jsx`):** Formulario para los módulos 1A a 4C (NSM, caja, productos P1..P9, requerimientos W/A/SS, bootstrapping y blitzscaling).
* **Motor Financiero (`finance.js`):** Funciones de métricas BCC, KPIs de efectivo libre, servicio de deuda, apalancamiento y semáforos de liquidez.
* **Simulaciones y Modales de Análisis:**
  - `StressTestModal.jsx`: Sensibilidad ante caídas de ventas e incremento de costos.
  - `WaterfallModal.jsx`: Desglose paso a paso del flujo de caja (Ventas → Costos → Deuda → Caja libre).
  - `InvestorPitchModal.jsx`: Ficha ejecutiva One-Pager descargable/imprimible.
  - `AiSettingsModal.jsx`: Configuración de proveedores y claves de API de IA.
* **Exportación a Excel (`excelExport.js`):** Descarga de libro de trabajo `.xlsx` con hojas de métricas y supuestos.
* **Gestor de Escenarios:** Presets Caso Pizzería (horno $150M), Caso Defensivo, plantillas en blanco, y persistencia local (`localStorage` y exportar/importar JSON).
* **Branding e Imagotipo Oficial:** Favicon SVG 3D isométrico con paleta iNGIZER (`#00b050`, `#0070c0`), imagotipo en la barra de navegación superior y meta tags para SEO y PWA.

### Tareas en Progreso (Backlog actual)
* Configurar despliegue continuo en Vercel o Netlify bajo subdominio oficial (ej. `cubecanvas.ingizer.com`).
* Obtener y calibrar fórmulas definitivas del modelo Excel del cliente (amortizaciones bancarias precisas e impuestos corporativos).
* [Backlog futuro] Autenticación multi-usuario y persistencia en base de datos en la nube (Supabase/PostgreSQL) para guardar canvases entre dispositivos.

### Bloqueos / Problemas actuales
* Ninguno en el código. Pendiente calibración fina con modelo Excel del cliente.

### Estrategia Comercial y Marketing
* **Propuesta de Valor:** "Radar de Crecimiento y Estructura de Capital": permite a emprendedores, directores financieros y consultores modelar el impacto de expansión (compras de maquinaria, contratación, créditos) en el efectivo disponible antes de ejecutar.
* **Sinergia con iNGIZER:** Herramienta complementaria para la oferta de CFO-as-a-service y diagnóstico avanzado para clientes que requieren levantar capital o financiar activos fijos.

---

## 6. imjago
*(Pendiente de actualizar)*

---

> **Nota para IAs:** Al finalizar una sesiÃ³n de trabajo donde se logren avances significativos en cÃ³digo, arquitectura o decisiones de negocio, actualiza la secciÃ³n correspondiente de este documento para mantener el contexto vivo. **Antes de guardar, verifica que el archivo mantenga codificaciÃ³n UTF-8 correcta** (tildes, eÃ±es y emojis deben verse bien, no como `ÃƒÂ³` o `Ã¢â‚¬â€`) y que el backlog que edites sea el del proyecto correcto â€” no copies el backlog de un proyecto a otro.

