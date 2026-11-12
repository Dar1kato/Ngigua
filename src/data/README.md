# Carpeta Data

En esta carpeta se crean módulos reutilizables para obtener y guardar datos mediante la API o la futura base de datos. Los componentes los importan para mantener separado el acceso a datos de la interfaz.

## Archivos de acceso a datos

Aquí van funciones que consultan, crean, actualizan o eliminan datos en una fuente externa, por ejemplo:

- obtener la lista de palabras;
- buscar una palabra por su identificador;
- guardar una palabra nueva;
- actualizar o eliminar un registro.

Estas funciones se encargan de comunicarse con la API o el cliente de base de datos y devolver los datos al componente. Como esas operaciones pueden tardar o fallar, normalmente son asíncronas y deben manejar errores. No deberían renderizar JSX ni decidir cómo se presentan los datos. Los cálculos y reglas de la aplicación que operan sobre los datos recibidos pertenecen a `src/logic/`.

## Crear un archivo

1. Crea el archivo dentro de `src/data/` y usa un nombre descriptivo en minúsculas, relacionado con el recurso, por ejemplo `palabras.js`.
2. Agrupa en ese archivo las operaciones de acceso a datos del recurso correspondiente.
3. Escribe funciones con argumentos y valores de retorno claros. Para operaciones asíncronas, usa `async` y devuelve el resultado:

```js
export async function obtenerPalabras() {
	const respuesta = await fetch('/api/palabras')

	if (!respuesta.ok) {
		throw new Error('No se pudieron obtener las palabras')
	}

	return respuesta.json()
}
```

El ejemplo usa una ruta de API ilustrativa; cuando se conecte la base de datos, la implementación debe usar el cliente o servicio que el proyecto adopte. Mantén los detalles de esa conexión dentro de `src/data/`, para que los componentes no dependan directamente del proveedor.

## Usar una función en un componente

Importa la función con una ruta relativa desde el componente. Por ejemplo, desde `src/components/Glosario/Glosario.jsx`:

```jsx
import { obtenerPalabras } from '../../data/palabras'
```

Como la operación es asíncrona, el componente debe esperar el resultado y manejar posibles errores. Por ejemplo, puede llamarla dentro de un efecto y guardar el resultado en estado:

```jsx
useEffect(() => {
	async function cargarPalabras() {
		try {
			const palabras = await obtenerPalabras()
			setPalabras(palabras)
		} catch (error) {
			setError(error.message)
		}
	}

	cargarPalabras()
}, [])
```

El componente mantiene el estado de carga y presenta los datos o errores; el módulo de `data/` realiza la comunicación con la fuente de datos.
