import { useState } from 'react'
import data from '../../../data/data.json'
import { Tarjeta } from './Tarjeta'

export function JuegoMemorama() {
    return (
        <div>
            {Object.entries(data).map(([id, contenido]) => (
                <Tarjeta key={id} id={id} valor={contenido.traduccion} volteada={true} />
            ))}
        </div>
    )
}