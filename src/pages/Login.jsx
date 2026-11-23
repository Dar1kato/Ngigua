/* 
Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Login.css.
*/
import { Link, useNavigate } from 'react-router-dom'
import FormularioLogin from '../components/FormularioLogin'
import '../styles/Login.css'

export default function Login() {
  const navigate = useNavigate()

  return (
    <main className="login">
      <section className="login__tarjeta">
        <h1>Acceso de administrador</h1>
        <p className="login__subtitulo">
          Inicia sesión para gestionar el vocabulario.
        </p>
        <FormularioLogin onExito={() => navigate('/admin')} />
      </section>
      <Link to="/" className="login__volver">← Volver al inicio</Link>
    </main>
  )
}