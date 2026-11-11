import { useState } from 'react'
import { 
    getTraduccionNgigua,
    getTraduccionEspañol
} 
from '../../logic/traductor'

export function Traductor() {
    const [palabra, setPalabra] = useState('')
    const [traduccion, setTraduccion] = useState('')
    const [isEspañol, setIsEspañol] = useState(true)

    function handleTraducir(e) {
        const palabra = e.target.value
        setPalabra(palabra)
        
        if (isEspañol) {
            setTraduccion(getTraduccionNgigua(palabra))
            return
        }

        if (!isEspañol) {
            setTraduccion(getTraduccionEspañol(palabra))
            return
        }
    }

    function handleCambiarDireccion() {
        setIsEspañol(!isEspañol)

        if (!palabra) {
            setTraduccion('')
            return
        }

        setTraduccion(
            !isEspañol
                ? getTraduccionNgigua(palabra)
                : getTraduccionEspañol(palabra)
        )
    }

    return (
        <div>
            <form>
                <label>{isEspañol ? 'Español' : 'Ngigua'}: <input type="text" value={palabra} onChange={handleTraducir}/>
                </label>
            </form>
            <button type="button" onClick={handleCambiarDireccion}>
                Cambiar a {isEspañol ? 'Ngigua → Español' : 'Español → Ngigua'}
            </button>
            <br></br>
            <p>
                {isEspañol ? 'Ngigua' : 'Español'}: {traduccion}<br />
            </p>
        </div>
    )
}

