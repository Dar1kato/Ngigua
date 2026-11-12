# Carpeta Logic

En esta carpeta se crean funciones reutilizables que resuelven reglas y transformaciones de datos de la aplicación. Un componente puede importarlas para mantener separada la lógica de la interfaz.

## Definición de Lógica

Cuenta como lógica el código que calcula o decide algo a partir de datos, por ejemplo:

- buscar una palabra en los datos y obtener su traducción;
- validar o normalizar un valor;
- calcular el resultado de una ronda o preparar las cartas de un juego;
- transformar una lista antes de mostrarla.

En general, una función de lógica recibe valores como argumentos y devuelve un resultado. No debería renderizar JSX, manejar eventos del navegador, ni modificar directamente el estado de React. La captura de eventos, `useState` y la presentación permanecen en el componente; este llama a la función cuando necesita el cálculo.

## Crear un archivo

1. Crea el archivo dentro de `src/logic/` y usa un nombre descriptivo en minúsculas, relacionado con la función o el área, por ejemplo `traductor.js` o `memorama.js`.
2. Escribe funciones pequeñas con argumentos y valores de retorno claros.
3. Exporta cada función que necesite usar un componente. Para varias funciones relacionadas, usa exports nombrados:

```js
export function normalizarPalabra(palabra) {
	return palabra.trim().toLowerCase()
}
```

Si una función necesita datos JSON u otro módulo, impórtalo desde la ruta relativa al archivo dentro de `src/logic/`. Por ejemplo, desde `src/logic/traductor.js`, `src/data/data.json` se importa como `../data/data.json`.

## Usar una función en un componente

Importa la función con una ruta relativa desde el componente. Por ejemplo, desde `src/components/Traductor/Traductor.jsx`:

```jsx
import { getTraduccionNgigua } from '../../logic/traductor'
```

Después, llámala desde el manejador o el lugar donde corresponda y usa el resultado. Por ejemplo:

```jsx
function handleTraducir(evento) {
	const palabra = evento.target.value
	setPalabra(palabra)
	setTraduccion(getTraduccionNgigua(palabra))
}
```

Pasa la referencia del manejador al evento (`onChange={handleTraducir}`); no lo ejecutes durante el render con `onChange={handleTraducir(...)}`. El componente se encarga del estado y la interfaz; la función importada se encarga del cálculo.
