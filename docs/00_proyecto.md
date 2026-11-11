# Ficha de proyecto: Plataforma de aprendizaje para la lengua ngigua

**Equipo:** Daniel, Emanuel, Javier y Omar

---

## 1. Tema y título tentativo

- **Tema:** uso de la tecnología para el aprendizaje de la lengua ngigua.
- **Título tentativo:** Plataforma de aprendizaje para la lengua ngigua.

## 2. Problema y usuario

**Problema:** El ngigua se encuentra en un proceso de revitalización. Por eso es importante buscar nuevas formas de apoyar su aprendizaje, consulta y uso, especialmente entre las nuevas generaciones.

**Usuario real que lo va a probar:** Por confirmar. Propuesta: jóvenes de la comunidad, hablantes o descendientes, que quieren aprender o consultar palabras en ngigua desde el celular o la computadora.

## 3. Roles y flujo de la demo (3 minutos)

| Rol | Flujo |
|---|---|
| Usuario | Traductor → Juegos → Diccionario |
| Admin | Login → Pantalla de datos → Estadísticas |

**Guion sugerido:** El usuario ocupa unos 2 minutos (traductor, memorama y diccionario) y el admin 1 minuto (login, alta de una palabra y estadísticas).

## 4. Regla base que hace cumplir

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

**Regla:** Cada registro tiene un `id` único y los campos `es`, `ng` y `categoria` obligatorios. Por definir si `img` y `audio` son obligatorios u opcionales.

## 5. Historias que sí o sí van

### Usuario

- Como usuario quiero escribir una palabra en español y ver su traducción en ngigua (y al revés), para consultarla rápido.
- Como usuario quiero jugar un memorama con palabras, para practicar de forma sencilla.
- Como usuario quiero ver el diccionario en fichas, para repasar el vocabulario.
- Como usuario quiero ver la imagen y escuchar el audio de una palabra, para aprender su significado y pronunciación.

### Admin

- Como admin quiero iniciar sesión, para acceder a las funciones de administración.
- Como admin quiero ver, agregar, editar y eliminar palabras en la pantalla de datos, para mantener el vocabulario actualizado.
- Como admin quiero ver estadísticas (palabras por categoría, partidas jugadas, palabras más buscadas), para saber cómo se usa la plataforma.

## 6. Fuera del alcance

- Traducción de frases completas.
- Interfaz de juegos llamativa.

## 7. Datos y de quién es cada uno

*Propuesta de responsables según los roles del equipo.*

| Dato | Quién lo reúne | Quién lo guarda (BD) | Quién lo usa (lógica) |
|---|---|---|---|
| id | Emanuel | Javier, Omar | Daniel, Javier |
| es (español) | Emanuel | Javier, Omar | Daniel, Javier |
| ng (ngigua) | Emanuel | Javier, Omar | Daniel, Javier |
| categoria | Emanuel | Javier, Omar | Daniel, Javier |
| img | Emanuel | Omar | Daniel |
| audio | Emanuel | Omar | Daniel |

## 8. Arquitectura de las pantallas

```text
Usuario                          Admin
Inicio                           Login
├─ Traductor                     ├─ Pantalla de datos
├─ Juegos (Memorama)             └─ Estadísticas
└─ Diccionario (Fichas)
```

| Pantalla | Rol | Qué muestra | Componente |
|---|---|---|---|
| Traductor | Usuario | Campo de texto, botón para cambiar dirección y resultado | Traductor |
| Juegos | Usuario | Memorama con tarjetas que se voltean | Memorama, Tarjeta |
| Diccionario | Usuario | Cuadrícula de fichas con ngigua, español, imagen y audio | Glosario, Ficha |
| Login | Admin | Formulario de acceso | Por crear |
| Pantalla de datos | Admin | Tabla con alta, edición y baja de palabras | Por crear |
| Estadísticas | Admin | Conteos y gráficas de uso | Por crear |
| Base de datos | Admin | Diccionario de palabras | Creada |

## 9. Integrantes y quién hace qué

| Integrante | Responsabilidad |
|---|---|
| Daniel | Lógica y encargado de git |
| Emanuel | Diseño y recolección de datos |
| Javier | Lógica y base de datos |
| Omar | Base de datos |

## 10. Pendientes por definir

- **Nombres definitivos de campos:** la ficha ya usa `ngigua` y `español`, pero la regla base propone `ng` y `es`. Hay que unificar para no romper los componentes.
- Si es que fuera posible una mejora con red neuronal.