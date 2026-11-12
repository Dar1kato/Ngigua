import { useState } from 'react'
import data from '../../../data/data.json'
import { Tarjeta } from './Tarjeta'

export function Memorama({ palabras = [] }) {
    function handleClick() {

    }

  return (
    <div>
      {palabras.slice(0, 12).map((item) => (
        <Tarjeta
          key={item.docId || item.id}
          id={item.id}
          valor={item.ng}
          volteada={true}
        />
      ))}
    </div>
  )
}