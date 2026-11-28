/* Aquí se construye la pagina del juego Memorama.

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Memorama.css.
*/
import '../styles/Memorama.css'
import { JuegoMemorama } from '../components/Juegos/Memorama/JuegoMemorama'

export default function Memorama({ palabras = [], cargando = false }) {
    return (
        <main>
            {cargando ? (
                <p role="status">Cargando vocabulario...</p>
            ) : (
                <JuegoMemorama palabras={palabras} />
            )}
        </main>
    )
}