# Declaración de uso de IA

Registro de las tareas realizadas con ayuda de agentes de IA en este proyecto. Cada entrada indica qué prompt la originó y qué archivos se modificaron.

**Reglas:** las entradas se agregan al final y no se editan las anteriores. El campo "Revisión humana" lo actualiza una persona del equipo tras revisar los cambios.

**Formato de cada entrada:**

```markdown
## AAAA-MM-DD · Título corto de la tarea

- **Autor:** nombre de quien dio el prompt
- **Herramienta / modelo:** nombre del agente y modelo
- **Prompt:** "texto del prompt"
- **Cambios:**
  - `ruta/archivo`: qué se hizo
- **Revisión humana:** Pendiente
```

---

## Entradas


## 2026-11-15 · Fix bug TypeError en Tabla.jsx (slice de undefined)

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Antigravity / Claude Opus 4.6
- **Prompt:** "Ayudame a debugear el siguiente error: Uncaught TypeError: Cannot read properties of undefined (reading 'slice') at Tabla (Tabla.jsx:19:39). itemsFiltrados es un useMemo que llama a una funcion filtrarDatos() en logic/glosario.js. Esa funcion en glosario.js, escrita tal cual dentro del useMemo si funciona, pero al pasar la logica fuera de Tabla.jsx a su respectivo archivo de logica se rompe"
- **Cambios:**
  - `src/components/Glosario/Tabla.jsx`: Agregado `return` implícito en el `useMemo` que llama a `filtrarDatos`; corregido el `.map()` del render para iterar objetos en vez de destructurar como arreglo; eliminado import no usado de `useEffect`
- **Revisión humana:** Pendiente


## 2026-11-15 · Fix bug TypeError en Filtros.jsx (setBusqueda is not a function)

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Antigravity / Claude Opus 4.6
- **Prompt:** "Tengo el siguiente error en el componente de <Filtros />: Filtros.jsx:4 Uncaught TypeError: setBusqueda is not a function at onChange (Filtros.jsx:4:64)"
- **Cambios:**
  - `src/components/Glosario/Filtros.jsx`: Corregida la firma de la función para recibir props como objeto destructurado `{ busqueda, setBusqueda, categoria, setCategoria }` en vez de parámetros individuales
- **Revisión humana:** Pendiente


## 2026-11-15 · Fix bug en handleIngresarLetra (letras siempre marcadas como malas)

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Antigravity / Claude Opus 4.6
- **Prompt:** "donde se encuentra el bug en mi funcion handleIngresarLetra()? En este momento cualquier letra que añada al formulario de entrada de letras me marca como letra mala, a pesar de que si sea una letra valida"
- **Cambios:**
  - `src/components/Juegos/Ahorcado/JuegoAhorcado.jsx`: Corregido `onChange` para pasar `e.target.value` en vez del evento completo a `handleIngresarLetra`
  - `src/logic/ahorcado.js`: Corregido typo `lenght` → `length` en la guarda de longitud de `verificarLetra`
- **Revisión humana:** Pendiente


## 2026-11-15 · Input controlado para formulario de letras en Ahorcado

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Antigravity / Claude Opus 4.6
- **Prompt:** "pregunta, como puedo hacer que el formulario se limpie al ingresar cualquier letra? actualmente borrar la letra existente cuenta como un intento y añadir una letra adicional extiende el input, haciendolo incorrecto"
- **Cambios:**
  - `src/components/Juegos/Ahorcado/JuegoAhorcado.jsx`: Agregado estado `inputLetra` para hacer el input controlado; se limpia con `setInputLetra("")` después de procesar la letra; añadido `value={inputLetra}` y `maxLength={1}` al input
- **Revisión humana:** Pendiente


## 2026-11-15 · Diagnóstico de estado del botón de reset en Ahorcado

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Antigravity / Gemini 3.8 Flash
- **Prompt:** "Por que el boton de reseteo no se actualiza cuando se gana o pierde la partida?"
- **Cambios:**
  - Ninguno (consulta y diagnóstico: explicación de la condición booleana en el atributo `disabled` de `JuegoAhorcado.jsx` y correcciones en los valores de retorno de `checkDerrota` y `checkVictoria` en `ahorcado.js`)
- **Revisión humana:** Pendiente


## 2026-11-16 · Diagnóstico de TypeError en Abecedario.jsx (prop letrasUsadas undefined)

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Antigravity / Gemini 3.8 Flash
- **Prompt:** "ayudame a resolver este bug: Uncaught TypeError: Cannot read properties of undefined (reading 'includes') at Abecedario.jsx:12:34"
- **Cambios:**
  - Ninguno (consulta y diagnóstico: identificación de discrepancia en el nombre de la prop `letrasEncontradas` vs `letrasUsadas` entre `JuegoAhorcado.jsx` y `Abecedario.jsx`)
- **Revisión humana:** Pendiente

## 2026-11-16 · Corrección de traducciones con Firebase

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "Verifica por qué el componente del Traductor no esta realizando las traducciones. Hubo un merge considerable, revisa App.jsx y todo lo relacionado a Firebase para entender las modificaciones y ayudame a resolver el bug"
- **Cambios:**
  - `src/components/Traductor/index.js`: Reexporta el componente que recibe las palabras cargadas.
  - `src/components/Traductor/Traductor.jsx`: Restaura la traducción en ambos sentidos usando el vocabulario recibido.
  - `src/data/Firestore_data.js`: Normaliza los campos antiguos y canónicos de las palabras.
  - `src/pages/Traduccion.jsx`: Muestra los estados de carga y error del vocabulario.
  - `src/App.jsx`: Pasa los estados de carga y error a la página del Traductor.
  - `src/firebase.js`: Elimina la inicialización de Analytics no utilizada.
  - Validación: pendiente; no se ejecutaron lint ni build.
- **Revisión humana:** Pendiente

## 2026-11-16 · Corrección de tabla y filtro del glosario

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "hay un bug en Tabla, los datos no estan mostrandose correctamente. Al recargar la pagina la tabla esta vacia, solo al escribir una letra es cuando inicia la visualizacion de elementos. Ademas, el dropdown para filtrar por categorias dejo de funciona."
- **Cambios:**
  - `src/components/Glosario/Tabla.jsx`: Recalcula los resultados al cargar palabras y reinicia la paginación al cambiar filtros.
  - `src/logic/glosario.js`: Admite datos en arreglo u objeto, normaliza categoría y preserva IDs.
  - Validación: lint focalizado, build y pruebas manuales de lógica aprobados.
- **Revisión humana:** Pendiente
