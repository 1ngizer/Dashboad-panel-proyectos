require('dotenv').config();

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

const data = {
    "01. Ingizer": {
        "Links": [
            { label: "Landing Page", url: "https://ingizer.com" },
            { label: "Panel de Control (Dashboard App)", url: "https://app.ingizer.com" }
        ],
        "Avance": 99,
        "Bloqueos": "Ninguno en el motor de diagnóstico. Brecha de producto: los planes pagos y las 18 Power Apps del landing no tienen checkout ni herramientas conectadas (ver README).",
        "Próxima Tarea": "Definir destino real de 'Elegir plan' y 'Explorar' en el landing; confirmar en Make que Gmail no de warnings; contactar manualmente al lead 'Rafel' estancado desde el 05/08.",
        "Estado del proyecto": "En curso",
        "Prioridad": "Media",
        "Mermaid": "graph LR\n  Cliente([Cliente]) --> Landing[ingizer.com]\n  Landing --> App[app.ingizer.com - Bubble DB]\n  App -->|Datos de usuario| Make[Make.com]\n  Make <-->|Preguntas y Diagnóstico| Claude[Claude Sonnet 5]\n  Make --> Equipo[Gmail equipo]\n  Make --> Correo[Correo al cliente]\n  App --> Calendly[Agendar sesión Calendly]",
        "MermaidPreguntas": "graph TD\n  Start([Inicio en Chat]) --> M1[Módulo 1: Generales - 11 preguntas]\n  M1 --> Q1{Pregunta 1: Etapa}\n  Q1 -->|Arrancando| RA[Rama A: Emprendimiento]\n  Q1 -->|Andando| RB[Rama B: Negocio Tradicional]\n  Q1 -->|Creciendo| RC[Rama C: Startup / Rápido]\n  RA --> A[Análisis: Sostenibilidad, Precio, Orden]\n  RB --> B[Análisis: Liquidez, Ciclo Caja, Deuda]\n  RC --> C[Análisis: Burn rate, Inversión, Control]\n  A --> Fin([Generar Diagnóstico y Canvas])\n  B --> Fin\n  C --> Fin",
        "TechStack": [
            "Landing Page: Netlify (ingizer.com)",
            "Frontend & DB: Bubble (app.ingizer.com)",
            "Orquestación: Make.com",
            "IA & Razonamiento: Anthropic (Claude Sonnet 5)",
            "Documentación completa de Preguntas en GitHub: docs/iNGIZER/estructura-diagnostico.md"
        ],
        "Backlog": [
            "Verificar formato HTML del correo del cliente.",
            "Limpiar y eliminar 3 agentes huérfanos en Make.com.",
            "[Mejora] Evaluar Bubble Privacy Rules y Rate Limiting.",
            "[Mejora] Rediseñar página /register con marca de ingizer.",
            "[Alta] Definir destino real de 'Elegir plan' (checkout) y 'Explorar' (Power Apps).",
            "[Media] Contactar leads reales estancados (Rafel y otros)."
        ]
    },
    "03. PosBank": {
        "Links": [
            { label: "Landing Page Comercial", url: "https://posbank.ingizer.com" }
        ],
        "Avance": 95,
        "Bloqueos": "Verificación Meta: la integración de WhatsApp está bloqueada por una restricción activa (sospecha de automatización) y problemas de formato de dirección/teléfono en el RUT.",
        "Próxima Tarea": "Corregir dirección en Meta Business Info (Cra 80 Bis No. 7A - 15) y reintentar la verificación.",
        "Estado del proyecto": "En curso",
        "Prioridad": "Alta",
        "Mermaid": "graph TD\n  A[App PWA] --> API[posbank-api - Railway]\n  B[Alexa Voz] --> API\n  C[WhatsApp Chat] --> API\n  Cam[Cámara Facturas] --> API\n  API <--> DB[(Supabase PostgreSQL)]\n  API --> Claude[Claude API OCR]",
        "TechStack": [
            "Frontend (App): React + Vite (PWA)",
            "Backend (API): Node.js / Express en Railway",
            "Base de Datos: Supabase (PostgreSQL) con RLS y Auth"
        ],
        "Backlog": [
            "Corregir dirección en Meta Business Info para coincidir con RUT.",
            "Reintentar verificación con RUT y admin@ingizer.com (Plan B: WABA bajo Ingizer SAS).",
            "Probar el nombre de invocación ('pos bank') en Echo físico.",
            "Invitar testers reales mediante la app móvil de Alexa.",
            "Definir si se construye facturación POS por voz."
        ]
    },
    "02. igeogo": {
        "Links": [
            { label: "Landing Page Comercial", url: "https://igeogo.ingizer.com" }
        ],
        "Avance": 95,
        "Bloqueos": "Soporte Wompi: restricción activa (límite mínimo de $150.000 COP por transacción) que bloquea 3 de los 4 planes de precio. Sigue sin respuesta. Es el único bloqueo de negocio activo — Meta ya no bloquea.",
        "Próxima Tarea": "Confirmar el estado de la plantilla 'oferta_cercana' en WhatsApp Manager y dar seguimiento a soporte de Wompi.",
        "Estado del proyecto": "En curso",
        "Prioridad": "Alta",
        "Mermaid": "graph TD\n  U[Usuario - App/WhatsApp] --> API[Express Backend - Railway]\n  N[Negocio - Crea Promociones] --> API\n  API <--> DB[(MongoDB)]\n  API --> Mapas[Mapbox / Nominatim]\n  API --> IA[Claude IA]\n  API --> Pagos[Wompi]\n  API --> WP[WhatsApp API]",
        "TechStack": [
            "Backend 24/7: Node.js / Express en Railway",
            "Base de Datos: MongoDB",
            "Integraciones: Mapbox, Nominatim, Claude IA, Wompi, Meta API"
        ],
        "Backlog": [
            "[Manual usuario] Configurar WHATSAPP_APP_SECRET en Railway para activar la validacion de firma del webhook (ya desplegada, hoy fail-open).",
            "Cargar comercios y cupones reales (panel ya limpio, sin datos de prueba).",
            "Confirmar estado de la plantilla 'oferta_cercana' en WhatsApp Manager.",
            "Evaluar dominio propio (igeogo.co)."
        ]
    }
};

const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
};

async function syncDirectFetch() {
    console.log("Consultando BD de Notion...");
    const queryRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers
    });
    
    if (!queryRes.ok) return console.error("Error querying db:", await queryRes.text());
    
    const dbData = await queryRes.json();
    
    for (const page of dbData.results) {
        let title = "";
        for (const [key, prop] of Object.entries(page.properties)) {
            if (prop.type === "title" && prop.title && prop.title.length > 0) {
                title = prop.title[0].plain_text;
            }
        }
        
        if (data[title]) {
            console.log(`Procesando actualizaciones para: ${title}...`);
            
            // 1. Actualizar Propiedades (Columnas)
            const updateProps = {};
            if (page.properties["Avance"]) updateProps["Avance"] = { number: data[title]["Avance"] };
            if (page.properties["Bloqueos"]) updateProps["Bloqueos"] = { rich_text: [{ text: { content: data[title]["Bloqueos"] } }] };
            if (page.properties["Próxima Tarea"]) updateProps["Próxima Tarea"] = { rich_text: [{ text: { content: data[title]["Próxima Tarea"] } }] };
            
            // Notion requiere que las opciones de "Select" coincidan exactamente con lo que tienes configurado
            try {
                if (page.properties["Estado del proyecto"]) updateProps["Estado del proyecto"] = { status: { name: data[title]["Estado del proyecto"] } };
                if (page.properties["Prioridad"]) updateProps["Prioridad"] = { select: { name: data[title]["Prioridad"] } };
            } catch(e) {}

            if (Object.keys(updateProps).length > 0) {
                await fetch(`https://api.notion.com/v1/pages/${page.id}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify({ properties: updateProps })
                });
            }

            // 2. Limpiar contenido viejo de la página
            const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children`, { headers });
            const blocksData = await blocksRes.json();
            for (const block of blocksData.results) {
                await fetch(`https://api.notion.com/v1/blocks/${block.id}`, { method: 'DELETE', headers });
            }

            // 3. Insertar Arquitectura y Backlog
                        // 3. Insertar Enlaces Rápidos
            const children = [];
            if (data[title].Links && data[title].Links.length > 0) {
                children.push({
                    object: "block",
                    type: "heading_2",
                    heading_2: { rich_text: [{ text: { content: "🔗 Enlaces Rápidos" } }] }
                });
                data[title].Links.forEach(link => {
                    children.push({
                        object: "block",
                        type: "bulleted_list_item",
                        bulleted_list_item: { 
                            rich_text: [
                                { text: { content: link.label + ": " } },
                                { text: { content: link.url }, href: link.url }
                            ] 
                        }
                    });
                });
            }

            children.push({
                object: "block",
                type: "heading_2",
                heading_2: { rich_text: [{ text: { content: "🏗️ Arquitectura y Tech Stack" } }] }
            });

            if (data[title].Mermaid) {
                children.push({
                    object: "block",
                    type: "code",
                    code: {
                        rich_text: [{ text: { content: data[title].Mermaid } }],
                        language: "mermaid"
                    }
                });
            }

            if (data[title].MermaidPreguntas) {
                children.push({
                    object: "block",
                    type: "heading_2",
                    heading_2: { rich_text: [{ text: { content: "🧠 Flujo del Diagnóstico IA" } }] }
                });
                children.push({
                    object: "block",
                    type: "code",
                    code: {
                        rich_text: [{ text: { content: data[title].MermaidPreguntas } }],
                        language: "mermaid"
                    }
                });
            }

            data[title].TechStack.forEach(item => {
                children.push({
                    object: "block",
                    type: "bulleted_list_item",
                    bulleted_list_item: { rich_text: [{ text: { content: item } }] }
                });
            });

            children.push({
                object: "block",
                type: "heading_2",
                heading_2: { rich_text: [{ text: { content: "📋 Backlog de Tareas" } }] }
            });

            data[title].Backlog.forEach(task => {
                children.push({
                    object: "block",
                    type: "to_do",
                    to_do: { rich_text: [{ text: { content: task } }], checked: false }
                });
            });

            await fetch(`https://api.notion.com/v1/blocks/${page.id}/children`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ children })
            });

            console.log(`✅ ${title} completamente sincronizado (Propiedades + Arquitectura + Backlog)`);
        }
    }
    console.log("¡Todo listo!");
}

syncDirectFetch();
