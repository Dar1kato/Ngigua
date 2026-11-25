/* Aquí se construye la pagina de Juegos (Selección individual de juegos).

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Juegos.css.
*/
import Tarjeta from "../components/Diseno/Tarjetas";
import '../styles/styles.css'
import '../styles/Juegos.css'

export default function Juegos() {
    return (
        <main>
            <h1>Juegos</h1>
            <div className="contenedor-tarjetas">
        <Tarjeta
          nombre="Juego memorama"
          imagen="/img/memorama.webp"
          detalle="Juega y aprende palabras"
          ruta="/juegos/memorama"
        />

        <Tarjeta
          nombre="Ahorcado"
          imagen="/img/ahorcado.webp"
          detalle="Aprende letra por letra."
          ruta="/juegos/ahorcado"
         
        />

      </div>
        </main>
    )
}