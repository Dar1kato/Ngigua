import data from '../../data.json'

export function getTraduccion(palabra) {
    return data[palabra.toLowerCase()]?.traduccion ?? "Palabra no encontrada"
}

export function getSignificado(palabra) {
    return data[palabra.toLowerCase()]?.significado ?? "Palabra no econtrada"
}