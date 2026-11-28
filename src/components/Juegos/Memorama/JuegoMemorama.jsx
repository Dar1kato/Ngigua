
import { useEffect, useState } from 'react'
import {
    crearTarjetasMemorama,
    girarTarjeta,
    isPreja,
    updateTarjetas,
    resetTarjetas,
    emparejarTarjetas
} from '../../../logic/memorama'

import { Tarjeta } from './Tarjeta'
import '../../../styles/Memorama.css'

const PALABRAS_POR_PARTIDA = 5

export function JuegoMemorama({ palabras = [] }) {

    const [tarjetas, setTarjetas] = useState(() =>
        crearTarjetasMemorama(palabras, PALABRAS_POR_PARTIDA)
    )
    const [primerTarjeta, setPrimeraTarjeta] = useState(null)
    const [volteadas, setvolteadas] = useState(0)
    const [bloqueo, setBloqueo] = useState(false)

    useEffect(() => {
        if (volteadas !== 2) return

        const timer = setTimeout(() => {
            setTarjetas((tarjetasActuales) =>
                resetTarjetas(tarjetasActuales)
            )
            setPrimeraTarjeta(null)
            setvolteadas(0)
            setBloqueo(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [volteadas])

    function handleClickCartas(item) {

        if (bloqueo) return

        const tarjetasActualizadas =
            volteadas === 2 ? resetTarjetas(tarjetas) : tarjetas

        const tarjetaSeleccionada = tarjetasActualizadas.find(
            (tarjeta) => tarjeta.id === item.id
        )

        const primeraSeleccionada =
            volteadas === 2 ? null : primerTarjeta

        if (
            !tarjetaSeleccionada ||
            tarjetaSeleccionada.emparejada ||
            tarjetaSeleccionada.volteada
        ) return

        const nuevaTarjeta = girarTarjeta(tarjetaSeleccionada)

        let tarjetasSiguientes = updateTarjetas(
            tarjetasActualizadas,
            nuevaTarjeta
        )

        if (primeraSeleccionada) {

            const encontrada = isPreja(
                primeraSeleccionada,
                nuevaTarjeta
            )

            if (encontrada) {

                tarjetasSiguientes = emparejarTarjetas(
                    tarjetasSiguientes,
                    primeraSeleccionada,
                    nuevaTarjeta
                )

                setvolteadas(0)

            } else {

                setBloqueo(true)
                setvolteadas(2)

            }

            setPrimeraTarjeta(null)

        } else {

            setPrimeraTarjeta(nuevaTarjeta)
            setvolteadas(1)

        }

        setTarjetas(tarjetasSiguientes)
    }

    return (
        <section className="memorama">

            <div className="memorama-encabezado">

                <span className="memorama-etiqueta">
                    Aprende jugando
                </span>

                <h2>Memorama Ngigua</h2>

                <p>
                    Encuentra las parejas y fortalece tu vocabulario.
                </p>

                <div className="memorama-contador">
                    Parejas encontradas:

                    <strong>
                        {tarjetas.filter(t => t.emparejada).length / 2}
                        {' / '}
                        {tarjetas.length / 2}
                    </strong>
                </div>

            </div>

            <div className="memorama-tablero">

                {tarjetas.length === 0 ? (
                    <p role="status">No hay palabras con imagen disponibles para jugar.</p>
                ) : (
                    tarjetas.map((item) => (
                        <Tarjeta
                            key={item.id}
                            id={item.id}
                            item={item}
                            handleClick={handleClickCartas}
                        />
                    ))
                )}

            </div>

        </section>
    )
}
