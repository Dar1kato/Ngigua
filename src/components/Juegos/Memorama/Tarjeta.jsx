export function Tarjeta({ item, handleClick }) {
    return (
        <article>
            <button type="button" onClick={() => handleClick(item)}>
                {item.volteada && item.tipo === "texto" && <p>{item.palabra}</p>}
                {item.volteada && item.tipo === "img" && <img src={item.img} />}
                {!item.volteada && <p>ngigua</p>}
            </button>
        </article>
    )
}   