export function Abecedario({ letrasUsadas }) {    
    const abecedario = [
      "a", "b", "c", "d", "e", "f", "g",
      "h", "i", "j", "k", "l", "m", "n",
      "ñ", "o", "p", "q", "r", "s", "t",
      "u", "v", "w", "x", "y", "z"
    ];
    
    return (
        <article>
            {abecedario.map((letra) => {
                if (letrasUsadas.includes(letra)) {
                    return <p key={letra}><s>{letra}</s></p>;
                } else {
                    return <p key={letra}>{letra}</p>;
                }
            })}
        </article>
    )
}