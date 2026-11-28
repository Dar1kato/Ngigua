# Modelo de datos en Firestore

## Colección `palabras`

Cada documento de la colección `palabras` representa una entrada del vocabulario. La aplicación usa los campos siguientes:

| Campo | Tipo | Requisito | Descripción |
|---|---|---|---|
| `id` | Cadena o número | Obligatorio | Identificador secuencial usado para ordenar las palabras. Las nuevas entradas siguen el formato de los identificadores existentes; por ejemplo, `"0001"`. |
| `ng` | Cadena | Obligatorio | Palabra o expresión en ngigua. |
| `es` | Cadena | Obligatorio | Traducción al español. |
| `categoria` | Cadena | Obligatorio | Categoría en minúsculas, por ejemplo `"sustantivo"` o `"verbo"`. |
| `imagen` | Cadena | Opcional | URL o ruta de la imagen. Si se deja vacía en el formulario, se guarda como `""`. |
| `audio` | Cadena | Opcional | URL o ruta del audio. Si se deja vacío en el formulario, se guarda como `""`. |

Ejemplo de documento:

```json
{
  "id": "0001",
  "ng": "nchia",
  "es": "casa",
  "categoria": "sustantivo",
  "imagen": "/img/casa.png",
  "audio": "/audio/casa.mp3"
}
```

Firestore también asigna a cada documento un identificador propio. La aplicación lo expone como `docId` al leer los datos y lo usa para editar o eliminar el documento; `docId` no forma parte del contenido guardado del ejemplo.

## Compatibilidad con datos anteriores

Al leer la colección, la aplicación normaliza los nombres antiguos `ngigua` y `español` a `ng` y `es`, respectivamente. Para las nuevas entradas se deben usar los nombres canónicos `ng` y `es`. `img` no se normaliza: el nombre de campo usado actualmente para la imagen es `imagen`.

La aplicación obtiene las palabras de la colección ordenadas por `id`. Por eso, los documentos deben incluir ese campo para aparecer en las consultas de la plataforma.