/* Aquí se construye la pagina del Traductor.

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Traductor.css.
*/

import '../styles/Traductor.css'
import Traductor from '../components/Traductor'

export default function Traduccion({
    palabras = [],
    cargando = false,
    error = null,
}) {
    return (
        <main>
            {error ? (
                <p role="alert">No se pudo cargar el vocabulario: {error}</p>
            ) : cargando ? (
                <p role="status">Cargando vocabulario...</p>
            ) : (
                <Traductor palabras={palabras}/>
            )}
        </main>
    )
}