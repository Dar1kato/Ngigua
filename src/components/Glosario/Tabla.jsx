import { useEffect, useMemo, useState, useRef } from 'react'
import { filtrarDatos } from '../../logic/glosario'
import Filtros from './Filtros'
import Paginacion from './Paginacion'
import '../../styles/Glosario.css'

// Hasta 20 palabras; en pantallas bajas se muestran menos por página.
function calcularTamañoTabla() {
    if (typeof window === 'undefined') return 8
    const espacio = window.innerHeight - (window.innerWidth <= 620 ? 390 : 345)
    return Math.max(4, Math.min(20, Math.floor(espacio / 44)))
}

export function Tabla({ palabras = [] }) {
    const [busqueda, setBusqueda] = useState('')
    const [categoria, setCategoria] = useState('')
    const [paginaActual, setPaginaActual] = useState(1)
    const [tamañoTabla, setTamañoTabla] = useState(calcularTamañoTabla)

    useEffect(() => {
        function ajustarTabla() { setTamañoTabla(calcularTamañoTabla()) }
        window.addEventListener('resize', ajustarTabla)
        return () => window.removeEventListener('resize', ajustarTabla)
    }, [])

    const itemsFiltrados = useMemo(
        () => filtrarDatos(palabras, busqueda, categoria),
        [palabras, busqueda, categoria]
    )

    const ultimaPagina = Math.max(1, Math.ceil(itemsFiltrados.length / tamañoTabla))
    const paginaVisible = Math.min(paginaActual, ultimaPagina)
    const ultimoIndex = paginaVisible * tamañoTabla
    const primerIndex = ultimoIndex - tamañoTabla
    const postActual = itemsFiltrados.slice(primerIndex, ultimoIndex)

    const audioRefs = useRef(new Map())
    const [errorAudioId, setErrorAudioId] = useState(null)

    async function reproducirAudio(item) {
        const audio = audioRefs.current.get(item.id)
        if (!audio) {
            setErrorAudioId(item.id)
            return
        }

        audioRefs.current.forEach((reproductor, id) => {
            if (id !== item.id) reproductor.pause()
        })
        setErrorAudioId(null)

        try {
            audio.currentTime = 0
            await audio.play()
        } catch (error) {
            console.error(`No se pudo reproducir el audio de "${item.ng}".`, error)
            setErrorAudioId(item.id)
        }
    }

    return (
        <section className="ng-glosario" aria-label="Vocabulario ngigua">
            <header className="ng-glosario-encabezado">
                <div>
                    <span className="ng-glosario-etiqueta">◆ EXPLORA LA LENGUA · NGIGUA</span>
                    <h2>Vocabulario ngigua</h2>
                    <p>Descubre palabras y sus significados en español.</p>
                </div>
                <div className="ng-glosario-total" aria-live="polite">
                    <strong>{itemsFiltrados.length}</strong>
                    <span>Palabras encontradas</span>
                </div>
            </header>

            <Filtros
                busqueda={busqueda}
                setBusqueda={valor => { setBusqueda(valor); setPaginaActual(1) }}
                categoria={categoria}
                setCategoria={valor => { setCategoria(valor); setPaginaActual(1) }}
            />

            <div className="ng-glosario-tabla">
                <table aria-label="Palabras en ngigua y español">
                    <thead>
                        <tr><th scope="col">ID</th>
                        <th scope="col">Ngigua</th>
                        <th scope="col">Español</th>
                        <th scope="col">Audio</th>
                        <th scope="col">Categoría</th></tr>
                    </thead>
                    <tbody>
                        {postActual.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td className="ng-glosario-palabra">{item.ng}</td>
                                <td>{item.es}</td>
                                <td className="ng-glosario-audio">
                                    <audio
                                        ref={audio => {
                                            if (audio) audioRefs.current.set(item.id, audio)
                                            else audioRefs.current.delete(item.id)
                                        }}
                                        src={item.audio || undefined}
                                        preload="none"
                                        onError={event => {
                                            console.error(
                                                `No se pudo cargar el audio de "${item.ng}".`,
                                                event.currentTarget.error
                                            )
                                            setErrorAudioId(item.id)
                                        }}
                                    />
                                    <button
                                        className="ng-glosario-audio-boton"
                                        type="button"
                                        disabled={!item.audio}
                                        aria-label={`Reproducir audio de ${item.ng}`}
                                        onClick={() => reproducirAudio(item)}
                                    >
                                        <span aria-hidden="true">▶</span>
                                    </button>
                                    {errorAudioId === item.id && (
                                        <span className="ng-glosario-audio-error" role="alert">
                                            No se pudo reproducir el audio.
                                        </span>
                                    )}
                                </td>
                                <td><span className="ng-glosario-categoria">{item.categoria}</span></td>
                            </tr>
                        ))}
                        {!postActual.length && <tr><td colSpan={5} className="ng-glosario-vacio">{busqueda || categoria ? 'No se encontraron palabras con estos filtros.' : 'No hay palabras para mostrar.'}</td></tr>}
                    </tbody>
                </table>
            </div>

            <Paginacion paginaActual={paginaVisible} setPaginaActual={setPaginaActual} tamañoTabla={tamañoTabla} totalElementos={itemsFiltrados.length} />
        </section>
    )
}
