# Carpeta Components

En esta carpeta se crean los componentes reutilizables de la interfaz. Cada componente debe tener su propia carpeta para mantener juntos su implementación, estilos y componentes auxiliares.

## Estructura de un componente

Usa el nombre del componente como nombre de carpeta y del archivo principal:

```text
components/
	NombreComponente/
		index.js
		NombreComponente.jsx
		NombreComponente.css   (si necesita estilos propios)
		Subcomponente.jsx      (si solo se usa aquí)
```

Por ejemplo, `Memorama` está agrupado bajo `Juegos/` porque pertenece a esa sección:

```text
components/
	Juegos/
		Memorama/
			index.js
			Memorama.jsx
			Tarjeta.jsx
```

Si un subcomponente solo se usa dentro de su componente principal, puede quedarse en la misma carpeta. Si se comparte entre varias áreas, considera moverlo a una carpeta común de componentes.

## El archivo `index.js`

El archivo `index.js` es el punto de entrada público de la carpeta. Reexporta el componente principal como exportación por defecto para poder importarlo usando solo la ruta de la carpeta.

En `NombreComponente.jsx`, exporta el componente con nombre:

```jsx
export function NombreComponente() {
	return <section>Contenido</section>
}
```

En `index.js`, reexpórtalo como default:

```js
export { NombreComponente as default } from './NombreComponente.jsx'
```

Así se mantiene un único punto de entrada y no es necesario que quien lo importe conozca el nombre del archivo de implementación.

## Importar y renderizar un componente

Importa el componente desde su carpeta y luego úsalo como una etiqueta JSX. Desde `src/App.jsx`:

```jsx
import Traductor from './components/Traductor'

export default function App() {
	return <Traductor />
}
```

Desde una página ubicada en `src/pages/`, la ruta relativa al mismo componente sería:

```jsx
import Traductor from '../components/Traductor'
```

Para un componente en una carpeta anidada, incluye las carpetas intermedias; por ejemplo, desde `src/App.jsx`:

```jsx
import Memorama from './components/Juegos/Memorama'
```

La importación resuelve el `index.js` de esa carpeta. En una aplicación con rutas, normalmente `App.jsx` importa las páginas y cada página importa los componentes que necesita; los componentes no necesitan registrarse globalmente.
