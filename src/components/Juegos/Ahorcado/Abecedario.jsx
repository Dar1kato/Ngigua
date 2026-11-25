export function Abecedario({ letrasUsadas, letrasEncontradas, onLetra, terminado }) {
    const abecedario = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'ñ', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
    ]

    return (
        <article className="ahorcado-abecedario" aria-label="Abecedario">
            {abecedario.map((letra) => {
                const usada = letrasUsadas.includes(letra)
                const correcta = letrasEncontradas.includes(letra)

                return (
                    <button
                        key={letra}
                        type="button"
                        className={`ahorcado-tecla ${usada ? (correcta ? 'correcta' : 'incorrecta') : ''}`}
                        disabled={usada || terminado}
                        onClick={() => onLetra(letra)}
                        aria-label={`${letra}${usada ? (correcta ? ', correcta' : ', incorrecta') : ''}`}
                    >
                        {letra}
                    </button>
                )
            })}
        </article>
    )
}
