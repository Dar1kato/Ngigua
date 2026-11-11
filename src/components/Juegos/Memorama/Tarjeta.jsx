

export function Tarjeta({id, valor, volteada}) {
    return (
        <article>
            {volteada && <p>{valor}</p>}
        </article>
    )
}