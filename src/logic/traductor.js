import data from '../data/data.json'

export function traducir(idioma, español) {

}

export function getTraduccionNgigua(palabra) {
    const entrada = Object.values(data).find(
        ({ español }) => español.toLowerCase() === palabra.toLowerCase()
    )

    return entrada?.ngigua ?? "Palabra no encontrada"
}

export function getTraduccionEspañol(palabra) {
    const termino = palabra.toLowerCase()
    const entrada = Object.values(data).find(
        ({ ngigua }) => ngigua.toLowerCase() === palabra.toLowerCase()
    )

    return entrada?.español ?? "Palabra no encontrada"
}   