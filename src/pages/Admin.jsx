/* Aquí se construye la pagina de Admin.

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Admin.css.
*/
import { useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../logic/auth'
import '../styles/Admin.css'

export default function Admin() {
    const navigate = useNavigate()

    async function salir() {
        await cerrarSesion()
        navigate('/login')
    }

    return (
        <main>
            <h1>Admin</h1>
            <button onClick={salir}>Cerrar sesión</button>
        </main>
    )
}