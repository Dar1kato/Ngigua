import { useEffect, useRef, useState } from 'react'
import {
    verificarLetra,
    checkVictoria,
    checkDerrota,
    generarPalabra
} from '../../../logic/ahorcado'
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

export function JuegoAhorcado({ palabras = []}) {
    const [palabra, setPalabra] = useState(generarPalabra(palabras))
    const [letrasEncontradas, setletrasEncontradas] = useState([])
    const [letrasUsadas, setLetrasUsadas] = useState([])
    const [inputLetra, setInputLetra] = useState('')
    const [intentos, setIntentos] = useState(MAX_INTENTOS)
    const entradaRef = useRef(null)
    const componiendo = useRef(false)

    const victoria = palabra.length > 0 && checkVictoria(letrasEncontradas, palabra)
    const derrota = checkDerrota(intentos)
    const terminado = victoria || derrota
    const caracteres = Array.from(palabra)
    const letrasRestantes = caracteres.filter(
        letra => !letrasEncontradas.includes(letra)
    ).length

    // En computadora, permite comenzar a escribir sin buscar el campo.
    // En teléfono, el usuario toca el campo para abrir su teclado.
    useEffect(() => {
        if (!terminado && window.matchMedia('(pointer: fine)').matches) {
            entradaRef.current?.focus({ preventScroll: true })
        }
    }, [terminado])

    function handleIngresarLetra(valor) {
        setInputLetra('')
        const normalizada = valor.normalize('NFC').toLowerCase()
        if (Array.from(normalizada).length !== 1 || terminado) return

        // Conserva el carácter exacto de la palabra (incluidas las mayúsculas).
        const coincidencia = caracteres.find(
            letra => letra.normalize('NFC').toLowerCase() === normalizada
        )
        // No penaliza números, espacios o signos ajenos a la palabra.
        if (!coincidencia && !/^[\p{L}\p{M}]$/u.test(normalizada)) return
        const input = coincidencia ?? normalizada

        // No se descuentan intentos por letras repetidas.
        if (letrasUsadas.includes(input)) return

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
        setPalabra(generarPalabra(palabras))
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
                    {caracteres.length === 0 ? (
                        <p role="status">No hay palabras disponibles para jugar.</p>
                    ) : (
                        <>
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
                        </>
                    )}

                    <form className="ahorcado-formulario" onSubmit={e => e.preventDefault()}>
                        <label htmlFor="ahorcado-entrada">Introduce una letra</label>
                        <input
                            ref={entradaRef}
                            id="ahorcado-entrada"
                            type="text"
                            inputMode="text"
                            value={inputLetra}
                            onChange={e => {
                                if (componiendo.current || e.nativeEvent.isComposing) {
                                    setInputLetra(e.target.value)
                                } else {
                                    handleIngresarLetra(e.target.value)
                                }
                            }}
                            onCompositionStart={() => { componiendo.current = true }}
                            onCompositionEnd={e => {
                                componiendo.current = false
                                handleIngresarLetra(e.currentTarget.value)
                            }}
                            placeholder="a"
                            autoComplete="off"
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck={false}
                            aria-describedby="ahorcado-ayuda-teclado"
                            disabled={terminado || caracteres.length === 0}
                        />
                        <p id="ahorcado-ayuda-teclado" className="ahorcado-ayuda-teclado">
                            Usa tu teclado. Cada letra se comprueba automáticamente.
                        </p>
                    </form>

                    <div className="ahorcado-historial" aria-live="polite">
                        <span className="ahorcado-panel-etiqueta">Letras utilizadas</span>
                        {letrasUsadas.length === 0 ? (
                            <p className="ahorcado-historial-vacio">Aún no has utilizado letras.</p>
                        ) : (
                            <ul className="ahorcado-letras-usadas">
                                {letrasUsadas.map(letra => {
                                    const correcta = letrasEncontradas.includes(letra)
                                    return (
                                        <li key={letra} className={`ahorcado-letra-usada ${correcta ? 'correcta' : 'incorrecta'}`}>
                                            {letra}<span className="ahorcado-marca-letra" aria-hidden="true">{correcta ? '✓' : '×'}</span>
                                            <span className="ahorcado-solo-lector">{correcta ? ' correcta' : ' incorrecta'}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>

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
