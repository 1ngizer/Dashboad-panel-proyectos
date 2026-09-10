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
Sin bloqueos activos. SesiÃ³n del 2026-09-09 muy productiva: se resolviÃ³ un bug crÃ­tico que tenÃ­a caÃ­do el motor de diagnÃ³stico completo desde el 16 de agosto, se corrieron por primera vez de punta a punta las Ramas A y C, se mitigaron 2 bugs de experiencia de usuario, y se construyÃ³ y validÃ³ de punta a punta el primer cross-sell automÃ¡tico hacia PosBank dentro del diagnÃ³stico.

### Desarrollo y TecnologÃ­a (DevOps / Tech)
* **Landing Page:** Netlify (`public/ingizer/`), dominio en Squarespace.
* **Frontend & Database:** Bubble (maneja Google OAuth, UI del chat, panel de control y base de datos).
* **OrquestaciÃ³n / Backend:** Make.com (Escenario: `Message_incoming`).
* **Motor de IA:** Anthropic Claude Sonnet 5 (vÃ­a Make AI Agents, usando `Ingizer Agent (copy_1784370957200)`).
* **Integraciones:** Calendly, Google Workspace.

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

### Tareas en Progreso (Backlog actual)
* Verificar formato HTML del correo del cliente en una bandeja real.
* Limpiar y eliminar 3 agentes huérfanos en Make.com.
* **[Seguimiento]** Confirmar en Make -> History que el próximo diagnóstico completo dispare el correo de Gmail sin warnings.
* **[Mejora]** Implementar Bubble RLS (Row Level Security) y Rate Limiting.
* **[Mejora]** Página /register sin marca de ingizer — plantilla genérica de Bubble en inglés.
* **[Mejora futura]** Extender el link condicional a PosBank a otras pestañas del diagnóstico.

### Bloqueos / Problemas actuales
Ninguno.

### Estrategia Comercial y Marketing
* **PÃºblico Objetivo (Target):** Pymes en Colombia.
* **Propuesta de Valor:** Asistente financiero automatizado con IA que provee un diagnÃ³stico financiero inicial.
* **Objetivo Comercial:** Usar el diagnÃ³stico automatizado como imÃ¡n de leads para vender el servicio de **DirecciÃ³n Financiera como Servicio (CFO-as-a-service)**.
* **Flujo del Usuario:** Landing page â†’ Login (Bubble) â†’ Chat con IA â†’ AnÃ¡lisis financiero â†’ Popup de diagnÃ³stico de 5 pestaÃ±as â†’ Agendar reuniÃ³n en Calendly o descargar PDF.
* **Cross-selling:** Link condicional a PosBank ya activo en la pestaÃ±a de SituaciÃ³n Financiera del diagnÃ³stico (ver MÃ³dulos Completados).

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
* Verificar formato HTML del correo del cliente en una bandeja real.
* Limpiar y eliminar 3 agentes huérfanos en Make.com.
* **[Seguimiento]** Confirmar en Make -> History que el próximo diagnóstico completo dispare el correo de Gmail sin warnings.
* **[Mejora]** Implementar Bubble RLS (Row Level Security) y Rate Limiting.
* **[Mejora]** Página /register sin marca de ingizer — plantilla genérica de Bubble en inglés.
* **[Mejora futura]** Extender el link condicional a PosBank a otras pestañas del diagnóstico.

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
* **NÃºmero de producciÃ³n +57 300 2391085 registrado (2026-09-08):** Perfil de WhatsApp Business creado (nombre "igeogo", zona BogotÃ¡, categorÃ­a "Professional Services"), verificado por SMS y registrado con PIN. Phone Number ID: `1456047177580855`. `WHATSAPP_PHONE_NUMBER_ID` actualizado en Railway y servicio redesplegado (Online). Ruta correcta: developers.facebook.com â†’ app "igeogo" â†’ Use cases â†’ Connect on WhatsApp â†’ Customize â†’ Step 2 â†’ Register your WhatsApp phone number (WhatsApp Manager directo tenÃ­a el botÃ³n "Add phone number" deshabilitado por la app estar en modo Development).
* **App de Meta "igeogo" publicada en Live (2026-09-09):** Primer intento de mensaje real al bot no llegÃ³ a Railway â€” se diagnosticÃ³ que faltaba activar "Subscribe webhooks" en el WABA (ya corregido) y que Meta bloquea todo el trÃ¡fico de producciÃ³n mientras la app estÃ© Unpublished. Se crearon y desplegaron pÃ¡ginas reales de privacidad y tÃ©rminos (`igeogo.ingizer.com/privacidad/` y `/terminos/`, mismo estilo de marca), se completÃ³ Privacy Policy/Terms/Data deletion/Category en la app de Meta, y se publicÃ³ la app.
* **Bot confirmado funcionando end-to-end en el nÃºmero real (2026-09-09):** el usuario le escribiÃ³ "Hola" al +57 300 2391085 y el bot respondiÃ³ con el menÃº completo (UbicaciÃ³n actual / Ubic. anterior / Mis intereses) y solicitÃ³ compartir ubicaciÃ³n correctamente. El camino a producciÃ³n de WhatsApp queda completo.
* **Google Analytics 4 + analÃ­tica de campaÃ±as (2026-09-09):** se creÃ³ cuenta de GA ("ingizer" â†’ propiedad "igeogo", Measurement ID `G-9Q6DNKDM7S`) y se agregÃ³ el tag a las 5 pÃ¡ginas de landing. En el panel, `Campaign.interestedCount` ahora registra cada respuesta "INTERESADO" (antes se perdÃ­a) y la tab CampaÃ±as muestra conversiÃ³n por campaÃ±a + resumen agregado.
* **Google Business Profile ya verificado (confirmado 2026-09-09):** no hacÃ­a falta verificarlo â€” estaba "Verified" desde antes (105 vistas, "Looks good!"). Se actualizÃ³ el telÃ©fono al nÃºmero real del bot (300 2391085) y se conectÃ³ WhatsApp (`wa.me/573002391085`) como canal de chat primario, pendiente de revisiÃ³n de Google (~10 min).
* **ValidaciÃ³n de canjes con cÃ³digo Ãºnico (2026-09-09):** el cÃ³digo que se muestra en la tarjeta de WhatsApp ahora se persiste (modelo `Redemption` nuevo, antes se generaba y se descartaba). Los comercios validan el cÃ³digo en `igeogo.ingizer.com/canjear/` (pÃ¡gina pÃºblica sin login, ya que `Merchant` no tiene autenticaciÃ³n propia) â€” un cÃ³digo solo se puede usar una vez. Panel admin: nueva pestaÃ±a "Canjes" con historial. De paso se corrigiÃ³ un bug preexistente que impedÃ­a ver la pestaÃ±a "Leads".

### Tareas en Progreso (Backlog actual)
* Verificar formato HTML del correo del cliente en una bandeja real.
* Limpiar y eliminar 3 agentes huérfanos en Make.com.
* **[Seguimiento]** Confirmar en Make -> History que el próximo diagnóstico completo dispare el correo de Gmail sin warnings.
* **[Mejora]** Implementar Bubble RLS (Row Level Security) y Rate Limiting.
* **[Mejora]** Página /register sin marca de ingizer — plantilla genérica de Bubble en inglés.
* **[Mejora futura]** Extender el link condicional a PosBank a otras pestañas del diagnóstico.

### Bloqueos / Problemas actuales
* **Soporte Wompi:** RestricciÃ³n activa (lÃ­mite mÃ­nimo de $150.000 COP por transacciÃ³n) que bloquea los planes bÃ¡sicos. Sigue sin respuesta. Es el Ãºnico bloqueo de negocio activo â€” Meta ya no bloquea.

### Estrategia Comercial y Marketing
* **Propuesta de Valor:** Plataforma de marketing de proximidad. Comercios crean campaÃ±as con descuentos y igeogo las entrega por WhatsApp a usuarios cercanos segÃºn intereses.
* **Privacidad:** El negocio sabe a cuÃ¡ntas personas llega, pero no quiÃ©nes son. El usuario solo comparte su ubicaciÃ³n de forma segura para hacer "match".

---

## 4. bizzopp
*(Pendiente de actualizar)*

---

## 5. cubecanvas
*(Pendiente de actualizar)*

---

## 6. imjago
*(Pendiente de actualizar)*

---

> **Nota para IAs:** Al finalizar una sesiÃ³n de trabajo donde se logren avances significativos en cÃ³digo, arquitectura o decisiones de negocio, actualiza la secciÃ³n correspondiente de este documento para mantener el contexto vivo.

