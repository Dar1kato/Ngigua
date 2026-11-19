export function Tarjeta({ item, handleClick }) {
    return (
        <article>
            <button type="button" onClick={() => handleClick(item)}>
                {item.volteada && item.tipo === "texto" && <p>{item.palabra}</p>}
                {item.volteada && item.tipo === "img" && <img src={item.img} style={{width: 400, height: 400}}/>}
                {!item.volteada && <p>ngigua</p>}
            </button>
        </article>
    )
}   