export function filtrarDatos(data = [], busqueda = "", categoria = "") {
    const normalizar = (valor) => String(valor ?? "").trim().toLocaleLowerCase()

    const entradas = Array.isArray(data)
        ? data.map((item, index) => [item?.id ?? item?.docId ?? index, item])
        : Object.entries(data ?? {})

    return entradas
        .filter(([, item]) => {
            if (!item?.ng) return false

            return (
                normalizar(item.ng).includes(normalizar(busqueda)) &&
                (!categoria || normalizar(item.categoria) === normalizar(categoria))
            )
        })
        .map(([id, item]) => ({ ...item, id: item.id ?? id }))
}


export function generarPaginas(totalElementos, tamañoTabla) {
    const totalPaginas = Math.ceil(totalElementos / tamañoTabla)
    return Array.from({ length: totalPaginas }, (_, indice) => indice + 1)
}