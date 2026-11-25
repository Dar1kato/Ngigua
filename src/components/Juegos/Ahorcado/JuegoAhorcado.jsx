import { useState } from 'react'
import {
    verificarLetra,
    checkVictoria,
    checkDerrota,
    generarPalabra
} from '../../../logic/ahorcado'
import { Abecedario } from './Abecedario'
import '../../../styles/Ahorcado.css'

const MAX_INTENTOS = 7

function DibujoAhorcado({ intentos }) {
    const errores = MAX_INTENTOS - intentos

    return (
        <svg className="ahorcado-dibujo" viewBox="0 0 240 230" role="img"
            aria-label={`${errores} de ${MAX_INTENTOS} intentos perdidos`}>
            <g className="ahorcado-soporte" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 211 H155 M48 211 V19 H163 M48 57 L86 19" />
                {errores >= 1 && <path d="M163 19 V47" />}
            </g>
            <g className="ahorcado-figura" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {errores >= 2 && <circle cx="163" cy="66" r="19" />}
                {errores >= 3 && <path d="M163 85 V145" />}
                {errores >= 4 && <path d="M163 103 L134 127" />}
                {errores >= 5 && <path d="M163 103 L192 127" />}
                {errores >= 6 && <path d="M163 145 L139 184" />}
                {errores >= 7 && <path d="M163 145 L187 184" />}
            </g>
        </svg>
    )
}

export function JuegoAhorcado() {
    const [palabra, setPalabra] = useState(generarPalabra)
    const [letrasEncontradas, setletrasEncontradas] = useState([])
    const [letrasUsadas, setLetrasUsadas] = useState([])
    const [inputLetra, setInputLetra] = useState('')
    const [intentos, setIntentos] = useState(MAX_INTENTOS)

    const victoria = checkVictoria(letrasEncontradas, palabra)
    const derrota = checkDerrota(intentos)
    const terminado = victoria || derrota
    const caracteres = Array.from(palabra)
    const letrasRestantes = caracteres.filter(
        letra => !letrasEncontradas.includes(letra)
    ).length

    function handleIngresarLetra(input) {
        setInputLetra('')

        // Evita gastar intentos con letras repetidas o después de terminar.
        if (!input || terminado || letrasUsadas.includes(input)) return

        if (verificarLetra(input, letrasEncontradas, palabra)) {
            setletrasEncontradas([...letrasEncontradas, input])
            setLetrasUsadas([...letrasUsadas, input])
        } else {
            const intentosRestantes = Math.max(0, intentos - 1)
            setLetrasUsadas([...letrasUsadas, input])
            setIntentos(intentosRestantes)
        }
    }

    function handleReset() {
        setletrasEncontradas([])
        setInputLetra('')
        setIntentos(MAX_INTENTOS)
        setPalabra(generarPalabra())
        setLetrasUsadas([])
    }

    return (
        <section className="ahorcado">
            <header className="ahorcado-encabezado">
                <span className="ahorcado-etiqueta">Aprende jugando</span>
                <h2>Ahorcado Ngigua</h2>
                <p>Descubre la palabra oculta antes de quedarte sin intentos.</p>
            </header>

            <div className="ahorcado-tablero">
                <aside className="ahorcado-panel-dibujo">
                    <span className="ahorcado-panel-etiqueta">Tu progreso</span>
                    <DibujoAhorcado intentos={intentos} />
                    <div className="ahorcado-intentos" aria-live="polite">
                        <strong>{intentos} / {MAX_INTENTOS}</strong>
                        <span>Intentos restantes</span>
                    </div>
                    <div className="ahorcado-vidas" aria-hidden="true">
                        {Array.from({ length: MAX_INTENTOS }, (_, i) => (
                            <span key={i} className={i < intentos ? 'activa' : ''} />
                        ))}
                    </div>
                </aside>

                <div className="ahorcado-panel-juego">
                    <span className="ahorcado-panel-etiqueta">Palabra secreta</span>
                    <div className="ahorcado-palabra" aria-label="Letras de la palabra">
                        {caracteres.map((letra, i) => {
                            const encontrada = letrasEncontradas.includes(letra)
                            return (
                                <span key={i} className={`ahorcado-letra ${encontrada ? 'encontrada' : ''} ${derrota && !encontrada ? 'revelada' : ''}`}>
                                    {encontrada || derrota ? letra : '•'}
                                </span>
                            )
                        })}
                    </div>
                    <p className="ahorcado-restantes">{letrasRestantes} letras restantes</p>

                    <form className="ahorcado-formulario" onSubmit={e => e.preventDefault()}>
                        <label htmlFor="ahorcado-entrada">Escribe o selecciona una letra</label>
                        <input
                            id="ahorcado-entrada"
                            type="text"
                            value={inputLetra}
                            onChange={e => handleIngresarLetra(e.target.value)}
                            maxLength={1}
                            placeholder="Ej. a"
                            autoComplete="off"
                            disabled={terminado}
                        />
                    </form>

                    <Abecedario
                        letrasUsadas={letrasUsadas}
                        letrasEncontradas={letrasEncontradas}
                        onLetra={handleIngresarLetra}
                        terminado={terminado}
                    />

                    <div className="ahorcado-leyenda">
                        <span><i className="correcta" /> Correcta</span>
                        <span><i className="incorrecta" /> Incorrecta</span>
                    </div>

                    <div aria-live="polite">
                        {victoria && <p className="ahorcado-resultado victoria">¡Felicidades! Descubriste la palabra.</p>}
                        {derrota && <p className="ahorcado-resultado derrota">La palabra era <strong>{palabra}</strong>. ¡Inténtalo de nuevo!</p>}
                    </div>

                    <button className="ahorcado-reiniciar" type="button"
                        disabled={!terminado} onClick={handleReset}>
                        Jugar de nuevo
                    </button>
                </div>
            </div>
        </section>
    )
}
