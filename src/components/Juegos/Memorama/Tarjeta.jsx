
export function Tarjeta({ item, handleClick }) {

    const visible = item.volteada || item.emparejada

    return (
        <article className="memorama-tarjeta">

            <button
                type="button"
                className={`memorama-carta
                    ${visible ? 'volteada' : ''}
                    ${item.emparejada ? 'emparejada' : ''}`}
                onClick={() => handleClick(item)}
                disabled={item.emparejada}
            >

                {visible && item.tipo === "texto" && (
                    <div className="memorama-palabras">
                        <p className="memorama-palabra">
                            {item.ng || 'Traducción pendiente'}
                        </p>
                        <span className="memorama-traduccion" lang="es">
                            {item.palabra}
                        </span>
                    </div>
                )}

                {visible && item.tipo === "img" && (
                    <img
                        src={item.img}
                        alt={item.palabra}
                        className="memorama-imagen"
                    />
                )}

                {!visible && (
                    <div className="memorama-reverso">

                        <span className="memorama-rombo">
                            ❖
                        </span>

                        <p>ngigua</p>

                        <span className="memorama-subtexto">
                            Descubre la pareja
                        </span>

                    </div>
                )}

                {item.emparejada && (
                    <span className="memorama-acierto">
                        ✓
                    </span>
                )}

            </button>

        </article>
    )
}
