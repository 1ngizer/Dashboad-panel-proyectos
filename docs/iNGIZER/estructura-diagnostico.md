# Estructura del Diagnóstico IA (iNGIZER)

**Descripción:** Flujo lógico de las preguntas que realiza el agente de Anthropic al usuario para generar el análisis financiero.

## Resumen del Árbol de Decisión
El asistente perfila al usuario con un Módulo General (Módulo 1). Dependiendo de la respuesta a la Pregunta 1, el asistente se bifurca en 3 ramas especializadas. Cada rama emite un diagnóstico y semáforos distintos.

## Gráfico Lógico (Mermaid)
```mermaid
graph TD
    Start([Usuario inicia sesión]) --> M1[Módulo 1: Generales<br>11 preguntas básicas]
    M1 --> Q1{Pregunta 1:<br>¿En qué etapa estás?}
    
    Q1 -->|Estoy Arrancando| RA[Rama A: Emprendimiento<br>21 preguntas totales]
    Q1 -->|Negocio Andando| RB[Rama B: Negocio Tradicional<br>22 preguntas totales]
    Q1 -->|Creciendo Rápido| RC[Rama C: Startup<br>20 preguntas totales]
    
    RA --> AnA[Radares:<br>Sostenibilidad, Precio, Orden]
    RB --> AnB[Radares:<br>Liquidez, Ciclo de Caja, Deuda]
    RC --> AnC[Radares:<br>Burn rate, Inversión, Control]
    
    AnA --> Fin([Genera Canvas y Propuesta Comercial])
    AnB --> Fin
    AnC --> Fin
```

## Datos adicionales del Prompt
* **Datos previos:** Sector, número de empleados y descripción de la empresa ya se capturan en el registro y se inyectan silenciosamente al prompt.
* **Reducción de fatiga:** El cuestionario original tenía 30 preguntas fijas. Ahora cada usuario responde un máximo de 20 a 22 preguntas según su rama.
