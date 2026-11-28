
import { useEffect, useState } from 'react'
import {
    shuffle,
    girarTarjeta,
    isPreja,
    updateTarjetas,
    resetTarjetas,
    emparejarTarjetas
} from '../../../logic/memorama'

import { Tarjeta } from './Tarjeta'
import '../../../styles/Memorama.css'

const items = [
    {
        "id": "01",
        "tipo": "texto",
        "palabra": "Abrazar",
        "ng": "tjuua",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "02",
        "tipo": "img",
        "palabra": "Abrazar",
        "ng": "tjuua",
        "img": "/img/Abrazar.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "03",
        "tipo": "texto",
        "palabra": "Abrir",
        "ng": "danthjee",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "04",
        "tipo": "img",
        "palabra": "Abrir",
        "ng": "danthjee",
        "img": "/img/Abrir.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "05",
        "tipo": "texto",
        "palabra": "Acariciar",
        "ng": null,
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "06",
        "tipo": "img",
        "palabra": "Acariciar",
        "ng": null,
        "img": "/img/Acariciar.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "07",
        "tipo": "texto",
        "palabra": "Adornar",
        "ng": "nchetsujin",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "08",
        "tipo": "img",
        "palabra": "Adornar",
        "ng": "nchetsujin",
        "img": "/img/Adornar.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "09",
        "tipo": "texto",
        "palabra": "Agradecer",
        "ng": "thexruxi'in",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "10",
        "tipo": "img",
        "palabra": "Agradecer",
        "ng": "thexruxi'in",
        "img": "/img/Agradecer.jpg",
        "emparejada": false,
        "volteada": false
    }
]

export function JuegoMemorama({ palabras = palabras }) {

    const [tarjetas, setTarjetas] = useState(() => shuffle([...items]))
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

                {tarjetas.map((item) => (
                    <Tarjeta
                        key={item.id}
                        id={item.id}
                        item={item}
                        handleClick={handleClickCartas}
                    />
                ))}

            </div>

        </section>
    )
}
