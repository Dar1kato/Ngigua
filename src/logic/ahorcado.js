const palabras = ["amor", "calor", "perro", "directo"]

export function generarPalabra() {
    const palabra = palabras[Math.floor(Math.random() * palabras.length)]
    return [...palabra]
}

export function verificarLetra(letra, letrasUsadas, palabra) {
    if (letra.length > 1) return false

    if (letrasUsadas.includes(letra)) return false

    if (palabra.includes(letra)) return true

    return false
}

export function checkVictoria(letrasUsadas, palabra) {
    return palabra.every(letra => letrasUsadas.includes(letra))
}


export function checkDerrota(intentos) {
    return intentos === 0
}


export function resetearAbecedario() {

}