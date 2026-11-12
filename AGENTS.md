# AGENTS.md

Instrucciones para cualquier agente de IA que trabaje en este repositorio.

## Contexto del proyecto

Plataforma web de aprendizaje para la lengua ngigua, desarrollada en equipo (Daniel, Emanuel, Javier y Omar) para la materia de diseño de software. Permite a los usuarios traducir palabras (español ↔ ngigua), consultar un glosario y practicar con juegos, y a un administrador gestionar el vocabulario.

Stack: React + Vite (JavaScript, JSX), ESLint.

## Regla 1: leer `/docs` antes de cualquier modificación

**Antes de modificar cualquier archivo del proyecto** (código, datos, configuración o documentación), lee los archivos dentro de la carpeta `docs/` para entender el contexto, los requerimientos y el modelo de datos.

- Léelos todos, no solo los que parezcan relevantes: hoy incluyen `01-requirements.md` (historias de usuario y backlog MoSCoW) y `02-modelo-datos.md` (estructura de los datos), y pueden agregarse más.
- Excepción: `docs/ai-usage-log.md` es solo de escritura (ver Regla 3). No necesitas leerlo completo.
- Si lo que te piden contradice los documentos, o si los documentos no definen algo necesario (por ejemplo, nombres de campos o si `img` y `audio` son obligatorios), **avisa y pregunta** en lugar de asumir.
- Respeta la prioridad MoSCoW de `01-requirements.md`: no implementes funcionalidades marcadas como *Won't Have* ni priorices *Could Have* sobre pendientes *Must Have* sin que se te pida.

## Regla 2: leer el README de la carpeta antes de tocar `components/`, `data/` o `logic/`

Además de la Regla 1, **antes de crear, editar o eliminar cualquier archivo** dentro de estas rutas:

- `src/components/`
- `src/data/`
- `src/logic/`

lee primero los `README.md` que apliquen a ese archivo:

- El `README.md` de la carpeta raíz de la ruta (por ejemplo, `src/components/README.md`).
- El `README.md` de cada subcarpeta intermedia hasta llegar a la carpeta del archivo (por ejemplo, para `src/components/Juegos/Memorama/Memorama.jsx`: el de `src/components/`, el de `Juegos/` y el de `Memorama/`, si existen).

Si una carpeta no tiene `README.md`, continúa con la tarea y menciónalo en tu respuesta. No inventes su contenido.

Si el README contradice a `docs/` o a lo que te piden, avisa y pregunta antes de modificar.

## Regla 3: registrar cada tarea en el log de uso de IA

**Al finalizar cualquier tarea que modifique el proyecto**, agrega una entrada al final de `docs/99-uso-de-IA.md`. Este archivo funciona como la "declaración sobre uso de IA" del proyecto.

Formato de la entrada (breve, sin relleno):

```markdown
## AAAA-MM-DD · Título corto de la tarea

- **Autor:** nombre de quien dio el prompt (obtenlo con `git config user.name`)
- **Herramienta / modelo:** nombre del agente y modelo, si lo conoces
- **Prompt:** "texto del prompt que dio origen a la tarea"
- **Cambios:**
  - `ruta/archivo.jsx`: qué se hizo
  - `ruta/otro.js`: qué se hizo
- **Revisión humana:** Pendiente
```

Reglas del log:

- Agrega la entrada **al final** del archivo, dejando una línea en blanco antes del título. Nunca edites, reordenes ni borres entradas anteriores.
- Una entrada por tarea. Si la tarea quedó incompleta o falló, regístrala igual indicando el estado.
- **Prompt:** cítalo textualmente. Si es muy largo (más de unas 3 líneas), resúmelo fielmente y añade "(resumen)" al final.
- **Cambios:** una línea por archivo, describiendo qué cambió y no cómo.
- **Revisión humana:** déjalo siempre como `Pendiente`. Lo actualiza una persona del equipo cuando revise los cambios.
- Usa la fecha actual en formato `AAAA-MM-DD`.
- No incluyas contraseñas, tokens ni datos sensibles en el log.
- Si la tarea fue solo una consulta y no modificaste ningún archivo, no se registra nada.
- Escribe la entrada antes de dar la tarea por terminada.

## Estructura del proyecto

```text
docs/                 Documentación (requerimientos, modelo de datos, log de IA)
src/
├── components/       Componentes reutilizables (Glosario, Juegos/Memorama, Traductor)
├── data/             Datos del vocabulario (data.json)
├── logic/            Lógica separada de la interfaz (memorama.js, traductor.js)
├── pages/            Páginas del proyecto
├── App.jsx           Componente raíz y rutas
└── main.jsx          Punto de entrada
```

## Convenciones

- Sigue los nombres de campos definidos en `docs/02-modelo-datos.md`. No introduzcas variantes (`ngigua`/`español` frente a `ng`/`es`) sin que se decida explícitamente.
- Mantén la lógica en `src/logic/` y la interfaz en `src/components/`.
- Haz cambios mínimos y enfocados en la tarea. No refactorices código no relacionado.
- No agregues dependencias nuevas sin mencionarlo claramente en tu respuesta y en el log.
- Responde en español, salvo que se te pida otro idioma.