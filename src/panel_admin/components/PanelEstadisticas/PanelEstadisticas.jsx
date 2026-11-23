import TarjetaEstadistica from '../TarjetaEstadistica'
import './PanelEstadisticas.css'

// TODO: reemplazar los "—" por los valores reales cuando existan los datos.
export function PanelEstadisticas() {
  return (
    <section className="panel-estadisticas">
      <TarjetaEstadistica etiqueta="Consultas hechas" valor="—" />
      <TarjetaEstadistica etiqueta="Palabras registradas" valor="—" />
      <TarjetaEstadistica etiqueta="Palabras más buscadas" valor="—" />
      <TarjetaEstadistica etiqueta="Partidas jugadas" valor="—" />
    </section>
  )
}
