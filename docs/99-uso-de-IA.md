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


## 2026-11-16 · Corrección de tabla y filtro del glosario

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "hay un bug en Tabla, los datos no estan mostrandose correctamente. Al recargar la pagina la tabla esta vacia, solo al escribir una letra es cuando inicia la visualizacion de elementos. Ademas, el dropdown para filtrar por categorias dejo de funciona."
- **Cambios:**
  - `src/components/Glosario/Tabla.jsx`: Recalcula los resultados al cargar palabras y reinicia la paginación al cambiar filtros.
  - `src/logic/glosario.js`: Admite datos en arreglo u objeto, normaliza categoría y preserva IDs.
  - Validación: lint focalizado, build y pruebas manuales de lógica aprobados.
- **Revisión humana:** Pendiente

## 2026-11-17 · Corrección de paginación del glosario

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "El elemento de paginacion no esta funcionando correctamente"
- **Cambios:**
  - `src/components/Glosario/Tabla.jsx`: Pasa el total de resultados filtrados al paginador.
  - `src/components/Glosario/Paginacion.jsx`: Corrige navegación anterior/siguiente y botones de página.
  - `src/logic/glosario.js`: Calcula páginas a partir del total de elementos.
  - Validación: lint focalizado, build y pruebas de cálculo aprobados.
- **Revisión humana:** Pendiente

## 2026-11-18 · Corrección del giro de tarjetas del memorama

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "por que las tarjetas ocupan que les de dos click para que se volteen? Ayudame a resolver ese bug. A partir de ahora ya puedes modificar archivos, y ya debes ingresar tus logs de uso de ia"
- **Cambios:**
  - `src/components/Juegos/Memorama/JuegoMemorama.jsx`: Reinicia las cartas anteriores y voltea la seleccionada con el mismo clic.
  - `src/components/Juegos/Memorama/Tarjeta.jsx`: Elimina una importación de lógica que no se utilizaba.
  - Validación: build aprobado; ESLint focalizado reporta el setter `setBloqueo` sin uso, ya existente.
- **Revisión humana:** Pendiente

## 2026-11-18 · Implementación del chequeo de parejas

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "Ayudame a terminar la implementación del chequeo de parejas. Recuerda añadir tu entrada al log"
- **Cambios:**
  - `src/components/Juegos/Memorama/JuegoMemorama.jsx`: Compara la segunda carta, conserva parejas correctas y reinicia intentos fallidos.
  - `src/logic/memorama.js`: Marca ambas cartas de una pareja como volteadas y emparejadas.
  - Validación: build y ESLint del componente aprobados; ESLint de la lógica reporta la referencia preexistente a `items` en el valor predeterminado de `shuffle`.
- **Revisión humana:** Pendiente

## 2026-11-18 · Ocultamiento temporizado de parejas incorrectas

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "Ayudame a completar el useEffect, para que despues de 1 segundo de voltear la segunda carta, y si no son pareja, estas se vuelvan a ocultar"
- **Cambios:**
  - `src/components/Juegos/Memorama/JuegoMemorama.jsx`: Oculta los intentos fallidos un segundo después y bloquea clics durante la espera.
  - Validación: build y ESLint del componente aprobados.
- **Revisión humana:** Pendiente

## 2026-11-18 · Corrección de errores de CI en Ahorcado

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "Corrige los errores de ESLint/parse reportados por CI: reasignación de `victoria`/`derrota` en `JuegoAhorcado.jsx` e import inválido en `Ahorcado/index.js`. (resumen)"
- **Cambios:**
  - `src/components/Juegos/Ahorcado/JuegoAhorcado.jsx`: Elimina la reasignación de valores derivados; el reinicio vuelve a calcularlos desde el estado.
  - `src/components/Juegos/Ahorcado/index.js`: Reexporta `JuegoAhorcado` como predeterminado con sintaxis válida.
  - Validación: ESLint del repositorio y build aprobados.
- **Revisión humana:** Pendiente

## 2026-11-23 · Consolidación del panel de administración

- **Autor:** Daniel Peña
- **Herramienta / modelo:** Copilot SDK en VS Code / modelo no disponible
- **Prompt:** "Refactoriza `src/panel_admin`: consolida páginas y estilos en sus ubicaciones actuales, revisa imports y agrupa componentes admin en `src/components/admin`. (resumen)"
- **Cambios:**
  - `src/App.jsx`: Actualiza la importación de `RutaProtegida`.
  - `src/pages/Admin.jsx`: Usa los componentes agrupados bajo `components/admin`.
  - `src/pages/Login.jsx`: Usa el formulario de login desde `components/admin`.
  - `src/components/admin/BarraLateralAdmin/BarraLateralAdmin.css`: Reubica los estilos de la barra lateral.
  - `src/components/admin/BarraLateralAdmin/BarraLateralAdmin.jsx`: Reubica la barra lateral.
  - `src/components/admin/BarraLateralAdmin/index.js`: Conserva el punto de entrada de la barra lateral.
  - `src/components/admin/FormularioLogin/FormularioLogin.jsx`: Reubica el formulario y actualiza la importación de autenticación.
  - `src/components/admin/FormularioLogin/index.js`: Conserva el punto de entrada del formulario de login.
  - `src/components/admin/FormularioPalabra/FormularioPalabra.css`: Reubica los estilos del formulario de palabra.
  - `src/components/admin/FormularioPalabra/FormularioPalabra.jsx`: Reubica el formulario de palabra.
  - `src/components/admin/FormularioPalabra/index.js`: Conserva el punto de entrada del formulario de palabra.
  - `src/components/admin/PanelDiccionario/PanelDiccionario.css`: Reubica los estilos del panel de diccionario.
  - `src/components/admin/PanelDiccionario/PanelDiccionario.jsx`: Reubica el panel de diccionario.
  - `src/components/admin/PanelDiccionario/index.js`: Conserva el punto de entrada del panel de diccionario.
  - `src/components/admin/PanelEstadisticas/PanelEstadisticas.css`: Reubica los estilos del panel de estadísticas.
  - `src/components/admin/PanelEstadisticas/PanelEstadisticas.jsx`: Reubica el panel de estadísticas.
  - `src/components/admin/PanelEstadisticas/index.js`: Conserva el punto de entrada del panel de estadísticas.
  - `src/components/admin/RutaProtegida/RutaProtegida.jsx`: Reubica la protección de ruta y corrige la ruta de autenticación.
  - `src/components/admin/RutaProtegida/index.js`: Conserva el punto de entrada de la protección de ruta.
  - `src/components/admin/TablaPalabras/TablaPalabras.css`: Reubica los estilos de la tabla de palabras.
  - `src/components/admin/TablaPalabras/TablaPalabras.jsx`: Reubica la tabla de palabras.
  - `src/components/admin/TablaPalabras/index.js`: Conserva el punto de entrada de la tabla de palabras.
  - `src/components/admin/TarjetaEstadistica/TarjetaEstadistica.css`: Reubica los estilos de la tarjeta estadística.
  - `src/components/admin/TarjetaEstadistica/TarjetaEstadistica.jsx`: Reubica la tarjeta estadística.
  - `src/components/admin/TarjetaEstadistica/index.js`: Conserva el punto de entrada de la tarjeta estadística.
  - `src/panel_admin/`: Elimina copias antiguas; reutiliza la página y el estilo ya existentes en `src/pages` y `src/styles`.
  - Validación: build y ESLint aprobados; sin importaciones ni referencias restantes a `panel_admin`.
- **Revisión humana:** Pendiente
