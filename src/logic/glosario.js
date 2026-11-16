export function filtrarDatos(data, busqueda, categoria) {
    return Object.entries(data)
            .filter(([, item]) => {
                if (!item || !item.ngigua) return false;

                return (
                    item.ngigua.toString().toLowerCase().includes(busqueda.toLocaleLowerCase()) &&
                    (categoria === "" || item.categoria === categoria)
                );
            })
            .map(([id, item]) => ({ ...item, id }));
}


export function generarPaginas(postActual, tamañoTabla) {
    let paginas = [];                                  
    const post = Object.keys(postActual).length;

    for (let i = 1; i <= Math.ceil(post / tamañoTabla); i++) {
      paginas.push(i);
    }

    return paginas;
}