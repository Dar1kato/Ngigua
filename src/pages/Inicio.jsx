/* Aquí se construye la pagina de Inicio (ruta "/").

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Inicio.css.
*/
import { useNavigate } from 'react-router-dom'
import '../styles/Inicio.css'

export default function Inicio() {
    const navigate = useNavigate()

    return (
        <main>
            <h1>Inicio</h1>
            
            <button onClick={() => navigate("/traduccion")}>Ir a traducción</button>
        </main>
    )
}

