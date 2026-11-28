# Modelo de datos en Firestore

## Colección `palabras`

Cada documento de la colección `palabras` representa una entrada del vocabulario. La aplicación usa los campos siguientes:

| Campo | Tipo | Requisito | Descripción |
|---|---|---|---|
| `id` | Cadena | Obligatorio | Identificador secuencial usado para ordenar las palabras; por ejemplo, `"0322"`. |
| `ng` | Cadena | Obligatorio | Palabra o expresión en ngigua. |
| `es` | Cadena | Obligatorio | Traducción al español. |
| `categoria` | Cadena | Obligatorio | Categoría en minúsculas, por ejemplo `"sustantivo"` o `"verbo"`. |
| `imagen` | Cadena | Opcional | URL de descarga de la imagen almacenada en Firebase Storage. Si se deja vacía en el formulario, se guarda como `""`. |
| `audio` | Cadena | Opcional | URL de descarga del audio almacenado en Firebase Storage. Si se deja vacío en el formulario, se guarda como `""`. |

Ejemplo de documento:

```json
{
  "audio": "URL de descarga de Firebase Storage",
  "categoria": "verbo",
  "es": "Asustar",
  "id": "0322",
  "imagen": "URL de descarga de Firebase Storage",
  "ng": "nchexraon"
}
```

Firestore también asigna a cada documento un identificador propio. La aplicación lo expone como `docId` al leer los datos y lo usa para editar o eliminar el documento; `docId` no forma parte del contenido guardado del ejemplo.

Para el memorama, cada documento con `ng`, `es` e `imagen` no vacíos puede generar una pareja de tarjetas: una tarjeta de palabra y otra que muestra la imagen de Firebase Storage. Por eso, cinco palabras con imagen producen diez tarjetas.

## Compatibilidad con datos anteriores

Al leer la colección, la aplicación normaliza los nombres antiguos `ngigua` y `español` a `ng` y `es`, respectivamente. Para las nuevas entradas se deben usar los nombres canónicos `ng` y `es`. `img` no se normaliza: el nombre de campo usado actualmente para la imagen es `imagen`.

La aplicación obtiene las palabras de la colección ordenadas por `id`. Por eso, los documentos deben incluir ese campo para aparecer en las consultas de la plataforma.