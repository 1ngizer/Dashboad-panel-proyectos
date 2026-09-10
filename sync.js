require('dotenv').config();

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

const data = {
    "01. Ingizer": {
        "Avance": 85,
        "Bloqueos": "Ninguno",
        "Próxima Tarea": "Implementar Bubble RLS y Rate Limiting",
        "Estado": "En Progreso",
        "Prioridad": "Alta",
        "Backlog": [
            "Implementar Bubble RLS (Row Level Security)",
            "Configurar Rate Limiting",
            "Ajustes UI/UX: Página de registro genérica",
            "Ajustes UI/UX: Indicador de progreso"
        ]
    },
    "03. PosBank": {
        "Avance": 95
    },
    "02. igeogo": {
        "Avance": 90
    }
};

const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
};

async function syncDirectFetch() {
    console.log("Consultando BD de Notion para inyectar barras de avance...");
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
            const updateProps = {};
            
            // Si la columna "Avance" existe, le enviamos el nÃºmero
            if (page.properties["Avance"]) {
                updateProps["Avance"] = { number: data[title]["Avance"] };
            }

            // Solo actualizar si hay algo que enviar
            if (Object.keys(updateProps).length > 0) {
                const updateRes = await fetch(`https://api.notion.com/v1/pages/${page.id}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify({ properties: updateProps })
                });

                if (!updateRes.ok) {
                    console.error(`Error inyectando avance en ${title}:`, await updateRes.text());
                } else {
                    console.log(`âœ… Barra de progreso actualizada para: ${title} (${data[title]["Avance"]}%)`);
                }
            }
        }
    }
    console.log("Â¡Barras de avance inyectadas exitosamente!");
}

syncDirectFetch();

