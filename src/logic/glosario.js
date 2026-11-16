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