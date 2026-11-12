import { useState } from 'react'
import { 
    getTraduccionNgigua,
    getTraduccionEspañol
} 
from '../../logic/traductor'

export default function Traductor({ palabras = [] }) {
  const [palabra, setPalabra] = useState('')
  const [traduccion, setTraduccion] = useState('')
  const [isEspañol, setIsEspañol] = useState(true)

    function handleTraducir(e) {
        const texto = e.target.value
        setPalabra(texto)
        
        if (isEspañol) {
            setTraduccion(getTraduccionNgigua(palabras))
            return
        }

        if (!isEspañol) {
            setTraduccion(getTraduccionEspañol(palabras))
            return
        }
    }

 function handleCambiarDireccion() {
    const nuevoEstado = !isEspañol
    setIsEspañol(nuevoEstado)

    if (!palabra) {
      setTraduccion('')
      return
    }

    setTraduccion(
      nuevoEstado
        ? getTraduccionNgigua(palabra, palabras)
        : getTraduccionEspañol(palabra, palabras)
    )
  }
  
    return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          {isEspañol ? 'Español' : 'Ngigua'}:{' '}
          <input type="text" value={palabra} onChange={handleTraducir} />
        </label>
      </form>
      <button type="button" onClick={handleCambiarDireccion}>
        Cambiar a {isEspañol ? 'Ngigua → Español' : 'Español → Ngigua'}
      </button>
      <br />
      <p>
        {isEspañol ? 'Ngigua' : 'Español'}: {traduccion}
        <br />
      </p>
    </div>
  )
}

