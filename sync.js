require('dotenv').config();

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

// Los nombres de proyecto DEBEN coincidir exactamente con el título de la página en Notion.
const data = {
    "01. Ingizer": {
        "Avance": 99,
        "Bloqueos": "Ninguno",
        "Próxima Tarea": "Confirmar en Make.com que el correo de Gmail se envía sin warnings en el próximo diagnóstico completo, y decidir el destino real de los botones de planes pagos (hoy redirigen a login sin checkout)",
        "Prioridad": "Media",
        "Estado del proyecto": "En curso"
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

// Mapea cada campo de `data` al formato de propiedad que espera la API de Notion.
function buildUpdateProps(projectData, pageProperties) {
    const updateProps = {};

    if (projectData["Avance"] !== undefined && pageProperties["Avance"]) {
        updateProps["Avance"] = { number: projectData["Avance"] };
    }
    if (projectData["Bloqueos"] !== undefined && pageProperties["Bloqueos"]) {
        updateProps["Bloqueos"] = { rich_text: [{ text: { content: projectData["Bloqueos"] } }] };
    }
    if (projectData["Próxima Tarea"] !== undefined && pageProperties["Próxima Tarea"]) {
        updateProps["Próxima Tarea"] = { rich_text: [{ text: { content: projectData["Próxima Tarea"] } }] };
    }
    if (projectData["Prioridad"] !== undefined && pageProperties["Prioridad"]) {
        updateProps["Prioridad"] = { select: { name: projectData["Prioridad"] } };
    }
    if (projectData["Estado del proyecto"] !== undefined && pageProperties["Estado del proyecto"]) {
        updateProps["Estado del proyecto"] = { status: { name: projectData["Estado del proyecto"] } };
    }

    return updateProps;
}

async function syncDirectFetch() {
    console.log("Consultando BD de Notion para inyectar el estado de los proyectos...");
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
            const updateProps = buildUpdateProps(data[title], page.properties);

            if (Object.keys(updateProps).length > 0) {
                const updateRes = await fetch(`https://api.notion.com/v1/pages/${page.id}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify({ properties: updateProps })
                });

                if (!updateRes.ok) {
                    console.error(`Error actualizando ${title}:`, await updateRes.text());
                } else {
                    console.log(`✅ Actualizado: ${title} (campos: ${Object.keys(updateProps).join(", ")})`);
                }
            }
        }
    }
    console.log("¡Sincronización completada!");
}

syncDirectFetch();
