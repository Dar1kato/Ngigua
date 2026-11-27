/* Página de selección individual de juegos. */
import Tarjeta from '../components/Diseno/Tarjetas'
import '../styles/styles.css'
import '../styles/Tarjetas.css'
import '../styles/Juegos.css'

export default function Juegos() {
  return (
    <main className="ng-juegos" aria-labelledby="ng-juegos-titulo">
      <header className="ng-juegos-encabezado">
        <span className="ng-juegos-etiqueta">Aprende jugando · Ngigua</span>
        <h1 id="ng-juegos-titulo">Juegos</h1>
        <p>Explora la lengua ngigua y fortalece tu vocabulario mientras juegas.</p>
      </header>

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
