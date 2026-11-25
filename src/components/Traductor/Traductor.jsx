import { useState } from 'react'
import {
  getTraduccionEspañol,
  getTraduccionNgigua,
} from '../../logic/traductor'
import '../../styles/Traductor.css'

export function Traductor({ palabras = [] }) {
  const [busqueda, setBusqueda] = useState('')
  const [resultado, setResultado] = useState(null)
  const [isEspañol, setIsEspañol] = useState(true)

  const traducir = (palabra, desdeEspañol) => (
    desdeEspañol
      ? getTraduccionNgigua(palabra, palabras)
      : getTraduccionEspañol(palabra, palabras)
  )

  const buscarTraduccion = (event) => {
    event.preventDefault()
    setResultado(busqueda.trim() ? traducir(busqueda, isEspañol) : null)
  }

  const cambiarDireccion = () => {
    const nuevaDireccion = !isEspañol
    setIsEspañol(nuevaDireccion)
    setResultado(busqueda.trim() ? traducir(busqueda, nuevaDireccion) : null)
  }

  return (
    <section className="traductor">
      <p className="traductor-subtitulo">
        Explora las palabras de la lengua ngigua.
      </p>

      <div className="traductor-idiomas">
        <div className="traductor-idioma traductor-origen">
          <span>Idioma de origen</span>
          <strong>{isEspañol ? 'Español' : 'Ngigua'}</strong>
        </div>

        <button
          className="traductor-cambiar"
          type="button"
          onClick={cambiarDireccion}
          aria-label={`Cambiar a ${isEspañol ? 'Ngigua a Español' : 'Español a Ngigua'}`}
          title="Intercambiar idiomas"
        >
          <span aria-hidden="true">⇄</span>
        </button>

        <div className="traductor-idioma traductor-destino">
          <span>Idioma de destino</span>
          <strong>{isEspañol ? 'Ngigua' : 'Español'}</strong>
        </div>
      </div>

      <form className="traductor-formulario" onSubmit={buscarTraduccion}>
        <label className="traductor-etiqueta" htmlFor="traductor-palabra">
          Palabra en {isEspañol ? 'español' : 'ngigua'}
        </label>
        <div className="traductor-busqueda">
          <input
            id="traductor-palabra"
            className="traductor-entrada"
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Escribe una palabra..."
          />
          <button className="traductor-buscar" type="submit">Buscar</button>
        </div>
      </form>

      <div className="traductor-resultado" aria-live="polite" aria-atomic="true">
        <span className="traductor-resultado-etiqueta">
          Traducción en {isEspañol ? 'ngigua' : 'español'}
        </span>
        <strong className="traductor-resultado-palabra">{resultado ?? '---'}</strong>
        {resultado == null && (
          <p className="traductor-ayuda">La traducción aparecerá aquí.</p>
        )}
      </div>
    </section>
  )
}
