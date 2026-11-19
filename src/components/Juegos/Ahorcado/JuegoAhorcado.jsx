import { useState } from "react"
import { 
    verificarLetra,
    checkVictoria,
    checkDerrota,
    generarPalabra
} from "../../../logic/ahorcado"
import { Abecedario } from "./Abecedario"

export function JuegoAhorcado() {
    const [palabra, setPalabra] = useState(generarPalabra())
    const [letrasEncontradas, setletrasEncontradas] = useState([])
    const [letrasUsadas, setLetrasUsadas] = useState([])
    const [inputLetra, setInputLetra] = useState("")
    const [intentos, setIntentos] = useState(7)


    let victoria = checkVictoria(letrasEncontradas, palabra)
    let derrota = checkDerrota(intentos)


    function handleIngresarLetra(input) {
        setInputLetra("")

        if (verificarLetra(input, letrasEncontradas, palabra)) {
            setletrasEncontradas([...letrasEncontradas, input]);
            setLetrasUsadas([...letrasUsadas, input])
            
        } else {
            const intentosRestantes = (intentos - 1) < 0 ? 0 : intentos - 1
            setLetrasUsadas([...letrasUsadas, input])
            setIntentos(intentosRestantes)
        }
    }


    function handleReset() {
        setletrasEncontradas([])
        setInputLetra("")
        setIntentos(7)
        setPalabra(generarPalabra())
        setLetrasUsadas([])

        victoria, derrota = false, false
    }


    return (
        <section>
            <p>{intentos}</p>
            <p>{palabra.length - letrasEncontradas.length} letras restantes</p>
            <form>
                <input type="text" value={inputLetra} onChange={e => handleIngresarLetra(e.target.value)} maxLength={1} placeholder="Ingresa tu letra"></input>
                <button type="button" disabled={!victoria&&!derrota} onClick={handleReset}>Resetear</button>
            </form>
            {victoria&&<p>Victoria!</p>}
            {derrota&&<p>Derrota... La palabra era {palabra}</p>}
            <Abecedario letrasUsadas={letrasUsadas}/>
        </section>
    )
}