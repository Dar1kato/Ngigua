import { useState } from 'react'
import { 
    getTraduccion,
    getSignificado,
} 
from '../../logic/traductor'

export function Traductor() {
    const [palabra, setPalabra] = useState('')
    const [traduccion, setTraduccion] = useState('')
    const [significado, setSignificado] = useState('')

    function handleTraducir(e) {
        const palabra = e.target.value
        setPalabra(palabra)
        setTraduccion(getTraduccion(palabra))
        setSignificado(getSignificado(palabra))
    }

    return (
        <div>
            <form>
                <label>Palabra: <input type="text" value={palabra} onChange={handleTraducir}/>
                </label>
            </form>
            <br></br>
            <p>
                Traducción: {traduccion}<br />
                significado: {significado}
            </p>
        </div>
    )
}

