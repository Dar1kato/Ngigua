export function generarPalabra(palabras = []) {
    const candidatas = palabras
        .map(item => typeof item === 'string' ? item : item?.ng)
        .filter(palabra => typeof palabra === 'string' && palabra.length > 0)

    if (candidatas.length === 0) return []

    const palabra = candidatas[Math.floor(Math.random() * candidatas.length)]

    return [...palabra]
}

export function obtenerPista(palabras = [], palabra = '') {
    const palabraElegida = Array.isArray(palabra) ? palabra.join('') : palabra
    return palabras.find(item => item.ng === palabraElegida)?.es ?? ''
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