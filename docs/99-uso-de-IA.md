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
