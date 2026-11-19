import { useState } from 'react'
import { 
    shuffle,
    girarTarjeta,
    isPreja,
    updateTarjetas,
    resetTarjetas,
    emparejarTarjetas
} from '../../../logic/memorama'
import { Tarjeta } from './Tarjeta'

const items = [
    {
        "id": "01",
        "tipo": "texto",
        "palabra": "Abrazar",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "02",
        "tipo": "img",
        "palabra": "Abrazar",
        "img": "../../public/img/Abrazar.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "03",
        "tipo": "texto",
        "palabra": "Abrir",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "04",
        "tipo": "img",
        "palabra": "Abrir",
        "img": "../../public/img/Abrir.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "05",
        "tipo": "texto",
        "palabra": "Acariciar",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "06",
        "tipo": "img",
        "palabra": "Acariciar",
        "img": "../../public/img/Acariciar.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "07",
        "tipo": "texto",
        "palabra": "Adornar",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "08",
        "tipo": "img",
        "palabra": "Adornar",
        "img": "../../public/img/Adornar.jpg",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "09",
        "tipo": "texto",
        "palabra": "Agradecer",
        "emparejada": false,
        "volteada": false
    },
    {
        "id": "10",
        "tipo": "img",
        "palabra": "Agradecer",
        "img": "../../public/img/Agradecer.jpg",
        "emparejada": false,
        "volteada": false
    }
]


export function JuegoMemorama() {
    const [tarjetas, setTarjetas] = useState(shuffle(items))
    const [primerTarjeta, setPrimeraTarjeta] = useState(null)
    const [volteadas, setvolteadas] = useState(0)

    function handleClickCartas(item) {
        const tarjetasActualizadas = volteadas === 2 ? resetTarjetas(tarjetas) : tarjetas
        const primeraSeleccionada = volteadas === 2 ? null : primerTarjeta
        const tarjetaSeleccionada = tarjetasActualizadas.find((tarjeta) => tarjeta.id === item.id)

        if (!tarjetaSeleccionada || tarjetaSeleccionada.emparejada || tarjetaSeleccionada.volteada) return

        const nuevaTarjeta = girarTarjeta(tarjetaSeleccionada)
        let tarjetasSiguientes = updateTarjetas(tarjetasActualizadas, nuevaTarjeta)

        if (primeraSeleccionada) {
            const encontrada = isPreja(primeraSeleccionada, nuevaTarjeta)

            if (encontrada) {
                tarjetasSiguientes = emparejarTarjetas(tarjetasSiguientes, primeraSeleccionada, nuevaTarjeta
                )
            }

            setPrimeraTarjeta(null)
            setvolteadas(encontrada ? 0 : 2)
        } else {
            setPrimeraTarjeta(nuevaTarjeta)
            setvolteadas(1)
        }

        setTarjetas(tarjetasSiguientes)
    }

    return (    
        <div>
            {tarjetas.map((item) => (
                <Tarjeta key={item.id} id={item.id} item={item} handleClick={handleClickCartas}/>
            ))}
        </div>
    )
}