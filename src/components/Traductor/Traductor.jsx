import { useState } from 'react'
import {
  getTraduccionEspañol,
  getTraduccionNgigua,
} from '../../logic/traductor'

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
    <section style={{ textAlign: 'center', margin: '20px 0' }}>
      <form onSubmit={buscarTraduccion}>
        <label>
          {isEspañol ? 'Español' : 'Ngigua'}:{' '}
          <input
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Escribe una palabra..."
          />
        </label>
        <button type="submit">Buscar</button>
      </form>

      <button type="button" onClick={cambiarDireccion}>
        Cambiar a {isEspañol ? 'Ngigua → Español' : 'Español → Ngigua'}
      </button>

      <p>
        {isEspañol ? 'Ngigua' : 'Español'}:{' '}
        <strong>{resultado ?? '---'}</strong>
      </p>
    </section>
  )
}
