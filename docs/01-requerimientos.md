# 01 - Requerimientos y backlog: Plataforma de aprendizaje para la lengua ngigua

**Equipo:** Daniel, Emanuel, Javier y Omar

## 1. Contexto

Plataforma web para consultar y practicar vocabulario en ngigua, pensada para apoyar su revitalización entre las nuevas generaciones. Tiene dos roles:

- **Usuario:** landing, traductor, glosario y juegos.
- **Admin:** login, panel de administración y (opcionalmente) métricas.

**Demo objetivo:** 3 minutos (aprox. 2 min usuario, 1 min admin).

**Usuario real que lo va a probar:** por confirmar. Propuesta: jóvenes de la comunidad, hablantes o descendientes, que quieren aprender o consultar palabras desde el celular o la computadora.

## 2. Leyenda MoSCoW

| Prioridad | Significado |
|---|---|
| **Must Have** | Indispensable. Sin esto la demo no funciona. |
| **Should Have** | Importante. Se hace si el tiempo lo permite, después de los Must. |
| **Could Have** | Deseable. Solo si sobra tiempo. |
| **Won't Have** | Fuera de alcance en esta entrega. |

## 3. Regla base de datos

Toda palabra se guarda con esta estructura:

```json
{
  "id": "0001",
  "es": "casa",
  "ng": "nchia",
  "categoria": "sustantivo",
  "img": "url",
  "audio": "url"
}
```

Cada registro tiene un `id` único y los campos `es`, `ng` y `categoria` son obligatorios. Por definir si `img` y `audio` son obligatorios u opcionales.

## 4. Historias de usuario

| ID | Rol | Historia | Prioridad |
|---|---|---|---|
| HU-01 | Usuario | Como usuario quiero una landing page, para facilitar la navegación por la página sin perderme. | Must |
| HU-02 | Usuario | Como usuario quiero una página de traducción, para traducir mis palabras de español a ngigua. | Must |
| HU-03 | Usuario | Como usuario quiero traducir de ngigua a español y viceversa, para consultar palabras en ambos sentidos. | Should |
| HU-04 | Usuario | Como usuario quiero un glosario de ngigua, para aprender sobre la lengua. | Must |
| HU-05 | Usuario | Como usuario quiero opciones de navegación en el glosario (búsqueda, paginación, filtros), para facilitar mi aprendizaje. | Must / Should / Could |
| HU-06 | Usuario | Como usuario quiero juegos interactivos, para aprender sobre la lengua de manera divertida. | Must (memorama) / Could (ahorcado) |
| HU-07 | Admin | Como admin quiero iniciar sesión, para acceder a las funciones de administración. | Must |
| HU-08 | Admin | Como admin quiero que solo yo tenga acceso al panel de administración, para prevenir accesos no autorizados. | Must |
| HU-09 | Admin | Como admin quiero acceso a la base de datos desde la plataforma, para añadir nuevas palabras al vocabulario. | Should |
| HU-10 | Admin | Como admin quiero ver métricas de uso (palabras por categoría, partidas jugadas, palabras más buscadas), para saber cómo se usa la plataforma. | Could |

## 5. Backlog por módulo

### 5.1 Página principal (HU-01)

**Must Have**

| ID | Requisito |
|---|---|
| PP-01 | Rutas a las distintas secciones. |
| PP-02 | About Page. |
| PP-03 | Botón de login para admin. |

### 5.2 Traductor (HU-02, HU-03)

**Must Have**

| ID | Requisito |
|---|---|
| TR-01 | Traducción español a ngigua. |

**Should Have**

| ID | Requisito |
|---|---|
| TR-02 | Traducción ngigua a español. |
| TR-03 | Información sobre la palabra. |

**Could Have**

| ID | Requisito |
|---|---|
| TR-04 | Cambio de idioma automático (tipo Translate). |

**Won't Have**

| ID | Requisito |
|---|---|
| TR-05 | Idiomas adicionales al español/ngigua. |
| TR-06 | Traducción de frases completas. |

### 5.3 Glosario (HU-04, HU-05)

**Must Have**

| ID | Requisito |
|---|---|
| GL-01 | Tabla con palabras. |
| GL-02 | Buscador de palabras. |

**Should Have**

| ID | Requisito |
|---|---|
| GL-03 | Paginación en la tabla. |

**Could Have**

| ID | Requisito |
|---|---|
| GL-04 | Filtros. |

**Won't Have**

| ID | Requisito |
|---|---|
| GL-05 | Imágenes. |
| GL-06 | Pop-ups de información. |

### 5.4 Juegos (HU-06)

#### Memorama

**Must Have**

| ID | Requisito |
|---|---|
| ME-01 | Juego funcional. |
| ME-02 | Botón de reinicio. |
| ME-03 | Tarjetas interactivas (abiertas/cerradas). |

**Should Have**

| ID | Requisito |
|---|---|
| ME-04 | Puntaje. |

**Could Have**

| ID | Requisito |
|---|---|
| ME-05 | Palabras aleatorias de entre todas en la DB. |
| ME-06 | Cronómetro. |

**Won't Have**

| ID | Requisito |
|---|---|
| ME-07 | Selección de tamaño de partida (cantidad de tarjetas en juego). |
| ME-08 | Condición de derrota. |
| ME-09 | Multijugador. |

#### Ahorcado (el juego completo es Could Have)

> Los niveles de abajo aplican **dentro** del ahorcado. Si se implementa, esto es lo que debe incluir; si no hay tiempo, el juego completo se omite.

**Must Have**

| ID | Requisito |
|---|---|
| AH-01 | Input para letras. |
| AH-02 | Condiciones de victoria/derrota. |

**Should Have**

| ID | Requisito |
|---|---|
| AH-03 | Indicaciones visuales para letras correctas/incorrectas. |
| AH-04 | Selección de palabras predeterminadas. |

**Could Have**

| ID | Requisito |
|---|---|
| AH-05 | Selección de palabras aleatoria desde la DB. |
| AH-06 | Botón de reset. |

**Won't Have**

| ID | Requisito |
|---|---|
| AH-07 | Teclado integrado (un botón por letra). |
| AH-08 | Puntaje. |
| AH-09 | Multijugador. |

### 5.5 Panel Admin (HU-07, HU-08, HU-09, HU-10)

**Must Have**

| ID | Requisito |
|---|---|
| AD-01 | Login para el administrador. |
| AD-02 | Panel de administración (acceso restringido solo al admin). |

**Should Have**

| ID | Requisito |
|---|---|
| AD-03 | Formulario para añadir palabras a la DB. |

**Could Have**

| ID | Requisito |
|---|---|
| AD-04 | Métricas de uso reales. |

**Won't Have**

| ID | Requisito |
|---|---|
| AD-05 | Métricas de usuarios en vivo. |

## 6. Resumen de alcance

| Módulo | Must | Should | Could | Won't |
|---|---|---|---|---|
| Página principal | 3 | 0 | 0 | 0 |
| Traductor | 1 | 2 | 1 | 2 |
| Glosario | 2 | 1 | 1 | 2 |
| Memorama | 3 | 1 | 2 | 3 |
| Ahorcado (Could Have global) | 2 | 2 | 2 | 3 |
| Panel Admin | 2 | 1 | 1 | 1 |

## 7. Fuera del alcance (global)

- Traducción de frases completas.
- Interfaz de juegos llamativa.
- Idiomas adicionales al español/ngigua.
- Multijugador en cualquier juego.
- Mejora con red neuronal (solo se retomaría si sobrara tiempo y fuera viable).

## 8. Pendientes por definir

- [ ] **Nombres definitivos de campos:** la ficha usa `ngigua` y `español`, pero la regla base propone `ng` y `es`. Unificar para no romper los componentes.
- [ ] **`img` y `audio`:** definir si son obligatorios u opcionales. Hoy las imágenes están en Won't Have del glosario y el audio no aparece en el backlog.
- [ ] **Alcance del panel admin para la demo:** la ficha plantea ver, agregar, editar y eliminar palabras y ver estadísticas, pero el backlog actual solo cubre agregar (Should) y métricas (Could).
- [ ] **Usuario real que probará la demo:** confirmar.
- [ ] **Historia incompleta:** la historia "Como usuario quiero un glosario, con..." quedó sin terminar en las notas del equipo y no se incluyó.