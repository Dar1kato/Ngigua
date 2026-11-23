import { useState } from 'react'
import TablaPalabras from '../TablaPalabras'
import './PanelDiccionario.css'

export function PanelDiccionario({ palabras = [], onBuscar, onAgregar, onModificar, onEliminar }) {
  const [buscarEs, setBuscarEs] = useState('')
  const [buscarNg, setBuscarNg] = useState('')
  const [seleccionadaId, setSeleccionadaId] = useState(null)

  // La palabra seleccionada se busca en la lista actual: si se elimina
  // o se filtra, la selección desaparece sola.
  const seleccionada = palabras.find((p) => p.docId === seleccionadaId) ?? null

  function manejarBusqueda(e) {
    e.preventDefault()
    onBuscar?.({ es: buscarEs, ng: buscarNg })
  }

  return (
    <section className="panel-diccionario">
      <div className="panel-diccionario__caja">
        <form className="panel-diccionario__busqueda" onSubmit={manejarBusqueda}>
          <input
            type="search"
            placeholder="Buscar en español"
            aria-label="Buscar en español"
            value={buscarEs}
            onChange={(e) => setBuscarEs(e.target.value)}
          />
          <input
            type="search"
            placeholder="Buscar en ngigua"
            aria-label="Buscar en ngigua"
            value={buscarNg}
            onChange={(e) => setBuscarNg(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        <TablaPalabras
          palabras={palabras}
          seleccionada={seleccionada}
          onSeleccionar={(p) => setSeleccionadaId(p ? p.docId : null)}
        />
      </div>

      <div className="panel-diccionario__acciones">
        <button type="button" onClick={() => onAgregar?.()}>Agregar</button>
        <button type="button" disabled={!seleccionada} onClick={() => onModificar?.(seleccionada)}>
          Modificar
        </button>
        <button type="button" disabled={!seleccionada} onClick={() => onEliminar?.(seleccionada)}>
          Eliminar
        </button>
      </div>
    </section>
  )
}
