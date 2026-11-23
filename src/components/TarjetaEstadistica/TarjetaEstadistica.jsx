import './TarjetaEstadistica.css'

export function TarjetaEstadistica({ etiqueta, valor }) {
  return (
    <article className="tarjeta-estadistica">
      <span className="tarjeta-estadistica__valor">{valor}</span>
      <span className="tarjeta-estadistica__etiqueta">{etiqueta}</span>
    </article>
  )
}
