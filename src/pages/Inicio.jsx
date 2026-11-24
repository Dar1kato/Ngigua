import Tarjeta from "../components/Diseno/Tarjetas";
import '../styles/styles.css'
export default function MenuAprendizaje() {
  return (
    <div>
      <h2>Plataforma de aprendizaje para la lengua ngigua</h2>

      <div className="contenedor-tarjetas">
        <Tarjeta
          nombre="Traductor"
          imagen="/img/traductor.webp"
          detalle="Traductor bidireccional entre el ngigua y el español."
          ruta="/traduccion"
        />

        <Tarjeta
          nombre="Vocabulario"
          imagen="/img/vocabulario.webp"
          detalle="Palabras en ngigua."
          ruta="/traduccion"
         
        />

        <Tarjeta
          nombre="Juegos"
          imagen="/img/juegos.webp"
          detalle="Aprender ngigua y divertirse."
          ruta="/traduccion"
          
        />
      </div>
    </div>
  )
}
