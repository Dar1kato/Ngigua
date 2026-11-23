import { useState } from 'react'
import './FormularioPalabra.css'

const VACIO = { ng: '', es: '', categoria: 'sustantivo', imagen: '', audio: '' }

const CATEGORIAS = [
  ['sustantivo', 'Sustantivo'],
  ['verbo', 'Verbo'],
  ['adjetivo', 'Adjetivo'],
  ['adverbios', 'Adverbios'],
  ['pronombres', 'Pronombres'],
  ['numeros', 'Números'],
]

// palabra = null  -> modo "Agregar"
// palabra = {...} -> modo "Modificar" (campos ya llenos)
export function FormularioPalabra({ palabra = null, guardando = false, error = '', onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(() =>
    palabra
      ? {
          ng: palabra.ng ?? '',
          es: palabra.es ?? '',
          categoria: palabra.categoria ?? 'sustantivo',
          imagen: palabra.imagen ?? '',
          audio: palabra.audio ?? '',
        }
      : VACIO
  )
  const [aviso, setAviso] = useState('')

  // Si la palabra trae una categoría que no está en la lista, se agrega para no perderla
  const categorias = CATEGORIAS.some(([valor]) => valor === datos.categoria)
    ? CATEGORIAS
    : [...CATEGORIAS, [datos.categoria, datos.categoria]]

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    if (!datos.ng.trim() || !datos.es.trim()) {
      setAviso('Ngigua y español son obligatorios.')
      return
    }
    setAviso('')
    onGuardar(datos)
  }

  return (
    <div
      className="formulario-palabra__fondo"
      onKeyDown={(e) => e.key === 'Escape' && onCancelar()}
    >
      <form
        className="formulario-palabra"
        onSubmit={enviar}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-formulario-palabra"
      >
        <h2 id="titulo-formulario-palabra">
          {palabra ? 'Modificar palabra' : 'Agregar palabra'}
        </h2>

        <label>
          Ngigua
          <input name="ng" value={datos.ng} onChange={cambiar} placeholder="ej. nchia" autoFocus />
        </label>
        <label>
          Español
          <input name="es" value={datos.es} onChange={cambiar} placeholder="ej. casa" />
        </label>
        <label>
          Categoría
          <select name="categoria" value={datos.categoria} onChange={cambiar}>
            {categorias.map(([valor, texto]) => (
              <option key={valor} value={valor}>{texto}</option>
            ))}
          </select>
        </label>
        <label>
          Imagen (opcional)
          <input name="imagen" value={datos.imagen} onChange={cambiar} placeholder="ej. /img/casa.png" />
        </label>
        <label>
          Audio (opcional)
          <input name="audio" value={datos.audio} onChange={cambiar} placeholder="ej. /audio/casa.mp3" />
        </label>

        {(aviso || error) && (
          <p role="alert" className="formulario-palabra__error">{aviso || error}</p>
        )}

        <div className="formulario-palabra__acciones">
          <button type="button" onClick={onCancelar}>Cancelar</button>
          <button type="submit" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}
