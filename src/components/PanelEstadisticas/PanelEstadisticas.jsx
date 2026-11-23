import TarjetaEstadistica from '../TarjetaEstadistica'
import './PanelEstadisticas.css'

// "Palabras registradas" ya es real. Las otras tres siguen en "—"
// porque todavía no existe el registro de consultas ni de partidas.
export function PanelEstadisticas({ totalPalabras = '—' }) {
  return (
    <section className="panel-estadisticas">
      <TarjetaEstadistica etiqueta="Consultas hechas" valor="—" />
      <TarjetaEstadistica etiqueta="Palabras registradas" valor={totalPalabras} />
      <TarjetaEstadistica etiqueta="Palabras más buscadas" valor="—" />
      <TarjetaEstadistica etiqueta="Partidas jugadas" valor="—" />
    </section>
  )
}
