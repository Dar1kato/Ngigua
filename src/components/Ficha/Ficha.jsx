import { useState } from 'react'
import './Ficha.css'

export function Ficha({ ngigua, español, significado }) {
    const [volteada, setVolteada] = useState(false)

    return (
        <button
            type="button"
            className={`ficha ${volteada ? 'ficha--volteada' : ''}`}
            onClick={() => setVolteada(!volteada)}
            aria-label={`Ficha de ${ngigua}, clic para voltear`}
        >
            <span className="ficha__inner">
                <span className="ficha__cara ficha__frente">
                    <strong>{ngigua}</strong>
                </span>
                <span className="ficha__cara ficha__reverso">
                    <strong>{español}</strong>
                    {significado && <small>{significado}</small>}
                </span>
            </span>
        </button>
    )
}