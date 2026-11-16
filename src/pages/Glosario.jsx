/* Aquí se construye la pagina del Glosario.

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Glosario.css.
*/
import '../styles/Glosario.css'
import { Tabla } from '../components/Glosario/Tabla'

export default function Glosario() {
    return (
        <main>
            <h1>Glosario</h1>
            <Tabla />
        </main>
    )
}