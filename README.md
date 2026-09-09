# Panel de Control de Proyectos (AI Dashboard)

Este repositorio sirve como la **fuente de la verdad** (Single Source of Truth) para el estado, desarrollo y estrategia comercial de todos los proyectos activos. Cualquier Inteligencia Artificial (Claude, Antigravity, ChatGPT, etc.) debe leer este documento para obtener el contexto actualizado antes de asistir en el desarrollo o marketing de los proyectos.

## Índice de Proyectos
1. [iNGIZER](#1-ingizer)
2. [PosBank](#2-posbank)
3. [igeogo](#3-igeogo)
4. [bizzopp](#4-bizzopp)
5. [cubecanvas](#5-cubecanvas)
6. [imjago](#6-imjago)

---

## 1. iNGIZER

### Estado General
El proyecto se encuentra en fase de *handoff* (transición). Recientemente se cerraron 8 tareas pendientes. La arquitectura principal es funcional, pero existen bloqueos activos que requieren intervención manual (pruebas de descarga de PDF y facturación de la API de IA). Faltan algunas decisiones para completar el flujo de diagnóstico.

### Desarrollo y Tecnología (DevOps / Tech)
* **Landing Page:** Netlify (`public/ingizer/`), dominio en Squarespace.
* **Frontend & Database:** Bubble (maneja Google OAuth, UI del chat, panel de control y base de datos).
* **Orquestación / Backend:** Make.com (Escenario: `Message_incoming`).
* **Motor de IA:** Anthropic Claude Sonnet 5 (vía Make AI Agents, usando `Ingizer Agent (copy_1784370957200)`).
* **Integraciones:** Calendly, Google Workspace.

### Módulos Completados
* Envío de datos de registro (sector, empleados, descripción) al prompt de la IA.
* Corrección de markdown roto en el chat UI.
* Verificación de negocio en Meta resuelta y método de pago añadido.
* Email de notificación a clientes creado.
* Años B1/B2 confirmados (2026/2027/2028).
* Orden cronológico de los badges del dashboard corregido.
* CTA de descarga de PDF desbloqueado y visible.
* Botón de WhatsApp reubicado y visible.

### Tareas en Progreso (Backlog actual)
* **Decisiones:** Elegir entre dos CTAs de WhatsApp en el popup del cliente (ícono pequeño vs. botón grande "Contact us").
* **Verificación/Ejecución:**
    * Verificar formato HTML del correo del cliente.
    * Probar en producción las Ramas A (startup) y C (crecimiento rápido) del cuestionario.
    * Crear enlace condicional hacia el producto "PosBank" dentro del diagnóstico.
    * Limpiar y eliminar 3 agentes huérfanos en Make.com (requiere confirmación del usuario).

### Bloqueos / Problemas actuales
* **Descarga de PDF:** El usuario de prueba subió un documento personal en vez del diagnóstico. Se debe reemplazar manualmente el archivo en el OS para confirmar la descarga.
* **Facturación API:** El saldo del Tier 1 de Anthropic expiró el 12 de agosto y está pendiente de recarga.

### Estrategia Comercial y Marketing
* **Público Objetivo (Target):** Pymes en Colombia.
* **Propuesta de Valor:** Asistente financiero automatizado con IA que provee un diagnóstico financiero inicial.
* **Objetivo Comercial:** Usar el diagnóstico automatizado como imán de leads para vender el servicio de **Dirección Financiera como Servicio (CFO-as-a-service)**.
* **Flujo del Usuario:** Landing page → Login (Bubble) → Chat con IA → Análisis financiero → Popup de diagnóstico de 5 pestañas → Agendar reunión en Calendly o descargar PDF.
* **Cross-selling:** Posicionar "PosBank" como una solución recomendada dentro del diagnóstico.

---

## 2. PosBank

### Estado General
La aplicación principal es altamente estable. El backend, aplicación móvil, landing page, motor de caja, inventario, POS y escaneo de facturas con IA están completamente desarrollados y sin problemas técnicos pendientes. La skill de Alexa está en Beta Testing. El principal reto es la integración con WhatsApp, bloqueada temporalmente por la verificación de Meta.

### Desarrollo y Tecnología (DevOps / Tech)
* **Backend:** Node.js / Express / TypeScript.
* **Base de Datos:** Supabase (PostgreSQL con RLS multi-tenant).
* **Frontend:** React 19 + Vite, PWA instalable.
* **Despliegue (Hosting):** Railway (Plan Hobby).
* **Integraciones/APIs:** API de Anthropic (escaneo de facturas), Meta Cloud API, Twilio, Alexa Skills Kit.

### Módulos Completados
* **Sistemas Core:** Backend, App, Landing page, Motor de caja, Inventario, POS y escaneo de facturas.
* **Alexa Skill:** Lista para Beta Test. Se resolvieron problemas de timeout paralelizando consultas, con 32/32 tests pasando exitosamente.
* **Backend WhatsApp:** Enrutamiento, servicios y parsers completamente construidos y desplegados.

### Tareas en Progreso (Backlog actual)
* **Verificación WhatsApp (Prioridad Alta):**
    * Corregir dirección en Meta Business Info para que coincida con el RUT ("Cra 80 Bis No. 7A - 15, Bogotá D.C., Colombia").
    * Reintentar verificación con RUT y el correo `admin@ingizer.com` (Plan B: crear WABA bajo el portafolio de Ingizer SAS).
* **Alexa (Prioridad Media):**
    * Probar el nombre de invocación ("pos bank") en un dispositivo Echo físico.
    * Invitar testers reales mediante la app móvil de Alexa.
* **Decisiones de Producto:** Definir si se construye facturación POS por voz (pausado por ahora).

### Bloqueos / Problemas actuales
* **Verificación Meta:** La integración de WhatsApp está bloqueada por una restricción activa (sospecha de automatización) y problemas de formato de dirección/teléfono en el RUT.

### Estrategia Comercial y Marketing
* **Público Objetivo (Target):** Pymes colombianas.
* **Propuesta de Valor:** "Radar de caja inteligente" que los dueños pueden consultar vía App, Alexa o WhatsApp para conocer su flujo de caja, cuentas por pagar, inventario y ventas diarias al instante.
* **Características Clave:** POS, Escaneo de facturas con IA y Panel centralizado de monitoreo.
* **Métricas (KPIs) de Costos:** Hosting muy económico (≈$2/mes en Railway) y escaneo con Anthropic a ≈$0.014 por lectura.

---

## 3. igeogo

### Estado General
Plataforma verificada en línea y sin errores funcionales en su core (landings, app, panel, bot, base de datos). El bot de WhatsApp ya funciona de punta a punta en el número real +57 300 2391085 (verificado 2026-09-09). El despliegue al público ahora está pausado solo por el mínimo de transacción de Wompi, que bloquea 3 de los 4 planes de precio.

### Desarrollo y Tecnología (DevOps / Tech)
* **Backend:** Node.js + Express (servido en Railway 24/7).
* **Base de Datos:** MongoDB Atlas + Mongoose (índices `2dsphere` para geocoding).
* **Frontend:** HTML/CSS/JS plano (sin framework), App PWA y Panel Admin.
* **Dominio / Hosting:** `igeogo.ingizer.com` (DNS en Squarespace) / Railway.
* **Integraciones:** Meta Cloud API (WhatsApp bot), Mapbox + Nominatim (geolocalización), Claude API (para redactar campañas), Wompi (pagos).

### Módulos Completados
* **Bot de WhatsApp:** Flujo completo (opt-in, categorías, ubicación, tarjetas de cupón, botón "INTERESADO").
* **App PWA:** Login por WhatsApp OTP, roles de usuario/comercio, mapa de ofertas, creación de campañas con IA y pagos.
* **Panel Admin:** Gestión de comercios, usuarios, cupones, campañas (despacho masivo probado end-to-end) y simulador de match.
* **Pagos & Seguridad:** Webhooks de Wompi validados por checksum, rotación de secretos completada.
* **SEO:** Sitemap, JSON-LD, imagen social (og.jpg).
* **Limpieza de datos de prueba (2026-09-07):** Se agregó el endpoint `DELETE /admin/campaigns/:id` (faltaba) y se eliminaron los 8 comercios de siembra y las 6 campañas demo. El panel queda en cero, listo para datos reales.
* **Número dedicado conseguido (2026-09-07):** Nueva línea +573002391085, nunca tuvo WhatsApp, lista para registrar en producción.
* **Causa raíz del bloqueo de Meta identificada (2026-09-07):** El bot vive bajo la cuenta de Meta Business **"1ngizer"**, que es una cuenta **separada** de "Ingizer SAS" (verificada desde el 19 ago). Verificar una no verifica la otra. Se envió la verificación de negocio de "1ngizer" con los mismos datos legales → **En revisión** (Meta estima ~2 días hábiles).
* **Verificación de negocio "1ngizer" APROBADA (confirmado 2026-09-08):** Meta reusó los datos ya verificados de "Ingizer SAS" — estado "Verified". El WABA de 1ngizer también ya tiene **método de pago agregado** (Mastercard, sin necesidad de acción adicional) y **Account status: Approved**.
* **Número de producción +57 300 2391085 registrado (2026-09-08):** Perfil de WhatsApp Business creado (nombre "igeogo", zona Bogotá, categoría "Professional Services"), verificado por SMS y registrado con PIN. Phone Number ID: `1456047177580855`. `WHATSAPP_PHONE_NUMBER_ID` actualizado en Railway y servicio redesplegado (Online). Ruta correcta: developers.facebook.com → app "igeogo" → Use cases → Connect on WhatsApp → Customize → Step 2 → Register your WhatsApp phone number (WhatsApp Manager directo tenía el botón "Add phone number" deshabilitado por la app estar en modo Development).
* **App de Meta "igeogo" publicada en Live (2026-09-09):** Primer intento de mensaje real al bot no llegó a Railway — se diagnosticó que faltaba activar "Subscribe webhooks" en el WABA (ya corregido) y que Meta bloquea todo el tráfico de producción mientras la app esté Unpublished. Se crearon y desplegaron páginas reales de privacidad y términos (`igeogo.ingizer.com/privacidad/` y `/terminos/`, mismo estilo de marca), se completó Privacy Policy/Terms/Data deletion/Category en la app de Meta, y se publicó la app.
* **Bot confirmado funcionando end-to-end en el número real (2026-09-09):** el usuario le escribió "Hola" al +57 300 2391085 y el bot respondió con el menú completo (Ubicación actual / Ubic. anterior / Mis intereses) y solicitó compartir ubicación correctamente. El camino a producción de WhatsApp queda completo.
* **Google Analytics 4 + analítica de campañas (2026-09-09):** se creó cuenta de GA ("ingizer" → propiedad "igeogo", Measurement ID `G-9Q6DNKDM7S`) y se agregó el tag a las 5 páginas de landing. En el panel, `Campaign.interestedCount` ahora registra cada respuesta "INTERESADO" (antes se perdía) y la tab Campañas muestra conversión por campaña + resumen agregado.
* **Google Business Profile ya verificado (confirmado 2026-09-09):** no hacía falta verificarlo — estaba "Verified" desde antes (105 vistas, "Looks good!"). Se actualizó el teléfono al número real del bot (300 2391085) y se conectó WhatsApp (`wa.me/573002391085`) como canal de chat primario, pendiente de revisión de Google (~10 min).

### Tareas en Progreso (Backlog actual)
* **Operativas:**
    * Cargar comercios y cupones reales (panel ya limpio, sin datos de prueba).
    * Confirmar estado de la plantilla "oferta_cercana" en WhatsApp Manager → Message Templates.
* **Decisiones Futuras:** Evaluar dominio propio (`igeogo.co`) y validar canjes con código único.

### Bloqueos / Problemas actuales
* **Soporte Wompi:** Restricción activa (límite mínimo de $150.000 COP por transacción) que bloquea los planes básicos. Sigue sin respuesta. Es el único bloqueo de negocio activo — Meta ya no bloquea.

### Estrategia Comercial y Marketing
* **Propuesta de Valor:** Plataforma de marketing de proximidad. Comercios crean campañas con descuentos y igeogo las entrega por WhatsApp a usuarios cercanos según intereses.
* **Privacidad:** El negocio sabe a cuántas personas llega, pero no quiénes son. El usuario solo comparte su ubicación de forma segura para hacer "match".

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

> **Nota para IAs:** Al finalizar una sesión de trabajo donde se logren avances significativos en código, arquitectura o decisiones de negocio, actualiza la sección correspondiente de este documento para mantener el contexto vivo.
