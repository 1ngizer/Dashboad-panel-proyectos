require('dotenv').config();

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

const data = {
    "01. Ingizer": {
        "Avance": 99,
        "Bloqueos": "Usuario de prueba subió PDF erróneo. Saldo Anthropic expirado.",
        "Próxima Tarea": "Recargar saldo de API de IA y reemplazar el archivo PDF.",
        "Estado del proyecto": "En curso",
        "Prioridad": "Alta",
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
            "Probar en producción las Ramas A y C del cuestionario.",
            "Crear enlace condicional hacia el producto PosBank.",
            "Limpiar y eliminar 3 agentes huérfanos en Make.com."
        ]
    },
    "03. PosBank": {
        "Avance": 95,
        "Bloqueos": "Restricción de Meta (sospecha automatización) y problemas de formato en el RUT.",
        "Próxima Tarea": "Corregir dirección en Meta Business Info (Cra 80 Bis No. 7A - 15).",
        "Estado del proyecto": "En curso",
        "Prioridad": "Media",
        "Mermaid": "graph TD\n  A[App PWA] --> API[posbank-api - Railway]\n  B[Alexa Voz] --> API\n  C[WhatsApp Chat] --> API\n  Cam[Cámara Facturas] --> API\n  API <--> DB[(Supabase PostgreSQL)]\n  API --> Claude[Claude API OCR]",
        "TechStack": [
            "Frontend (App): React + Vite (PWA)",
            "Backend (API): Node.js / Express en Railway",
            "Base de Datos: Supabase (PostgreSQL) con RLS y Auth"
        ],
        "Backlog": [
            "Corregir dirección en Meta Business Info para coincidir con RUT.",
            "Reintentar verificación con RUT y admin@ingizer.com.",
            "Probar el nombre de invocación ('pos bank') en Echo físico.",
            "Definir si se construye facturación POS por voz."
        ]
    },
    "02. igeogo": {
        "Avance": 90,
        "Bloqueos": "Soporte Wompi (límite $150k) sin responder. Esperando número telefónico.",
        "Próxima Tarea": "Conseguir SIM nueva dedicada para WhatsApp Manager.",
        "Estado del proyecto": "Bloqueado",
        "Prioridad": "Baja",
        "Mermaid": "graph TD\n  U[Usuario - App/WhatsApp] --> API[Express Backend - Railway]\n  N[Negocio - Crea Promociones] --> API\n  API <--> DB[(MongoDB)]\n  API --> Mapas[Mapbox / Nominatim]\n  API --> IA[Claude IA]\n  API --> Pagos[Wompi]\n  API --> WP[WhatsApp API]",
        "TechStack": [
            "Backend 24/7: Node.js / Express en Railway",
            "Base de Datos: MongoDB",
            "Integraciones: Mapbox, Nominatim, Claude IA, Wompi, Meta API"
        ],
        "Backlog": [
            "Conseguir SIM/número dedicado para el bot de WhatsApp.",
            "Limpiar 8 comercios de prueba y 6 campañas demo del panel.",
            "Conectar el número real en WhatsApp Manager.",
            "Agregar método de pago en WhatsApp y publicar app en Live."
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
            const children = [
                {
                    object: "block",
                    type: "heading_2",
                    heading_2: { rich_text: [{ text: { content: "🏗️ Arquitectura y Tech Stack" } }] }
                }
            ];

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
