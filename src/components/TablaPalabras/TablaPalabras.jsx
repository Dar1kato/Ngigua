import './TablaPalabras.css'

const clave = (p) => p.docId ?? p.id

export function TablaPalabras({ palabras = [], seleccionada = null, onSeleccionar }) {
  return (
    <div className="tabla-palabras">
      <table>
        <thead>
          <tr>
            <th>Ngigua</th>
            <th>Español</th>
          </tr>
        </thead>
        <tbody>
          {palabras.length === 0 ? (
            <tr>
              <td colSpan="2" className="tabla-palabras__vacio">
                Aún no hay palabras cargadas.
              </td>
            </tr>
          ) : (
            palabras.map((p) => {
              const activa = seleccionada !== null && clave(seleccionada) === clave(p)
              return (
                <tr
                  key={clave(p)}
                  className={activa ? 'tabla-palabras__fila--activa' : ''}
                  tabIndex={0}
                  onClick={() => onSeleccionar?.(activa ? null : p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSeleccionar?.(activa ? null : p)
                    }
                  }}
                >
                  <td>{p.ng}</td>
                  <td>{p.es}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
