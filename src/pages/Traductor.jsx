/* Aquí se construye la pagina del Traductor.

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Traductor.css.
*/
import '../styles/Traductor.css'
import Traduccion from '../components/Traductor'

export default function Traductor() {
    return (
        <main>
            <h1>Traductor</h1>
            <Traduccion />
        </main>
    )
}