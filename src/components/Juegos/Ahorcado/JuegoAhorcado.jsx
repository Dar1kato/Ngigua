import { useEffect, useState } from "react"
import { 
    verificarLetra,
    checkVictoria,
    checkDerrota,
    generarPalabra
} from "../../../logic/ahorcado"

export function JuegoAhorcado() {
    const [palabra, setPalabra] = useState(generarPalabra())
    const [letrasUsadas, setLetrasUsadas] = useState([])
    const [inputLetra, setInputLetra] = useState("")
    const [intentos, setIntentos] = useState(7)

    let victoria = checkVictoria(letrasUsadas, palabra)
    let derrota = checkDerrota(intentos)

    function handleIngresarLetra(input) {
        setInputLetra("")

        if (verificarLetra(input, letrasUsadas, palabra)) {
            setLetrasUsadas([...letrasUsadas, input]);
        } else {
            const intentosRestantes = (intentos - 1) < 0 ? 0 : intentos - 1
            setIntentos(intentosRestantes)
        }
    }

    function handleReset() {
        setLetrasUsadas([])
        setInputLetra("")
        setIntentos(7)
        setPalabra(generarPalabra())

        victoria, derrota = false, false
    }

    return (
        <section>
            <p>{intentos}</p>
            <p>{palabra}</p>
            <form>
                <input type="text" value={inputLetra} onChange={e => handleIngresarLetra(e.target.value)} maxLength={1} placeholder="Ingresa tu letra"></input>
                <button type="button" disabled={!victoria&&!derrota} onClick={handleReset}>Resetear</button>
            </form>
            {victoria&&<p>Victoria!</p>}
            {derrota&&<p>Derrota...</p>}
        </section>
    )
}