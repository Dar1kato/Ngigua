import { useMemo, useState } from "react";
import { 
    filtrarDatos,
} from "../../logic/glosario";
import Filtros from "./Filtros";
import Paginacion from "./Paginacion";


export function Tabla({ palabras = [] }) {
    const [busqueda, setBusqueda] = useState("")
    const [categoria, setCategoria] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)

    const itemsFiltrados = useMemo(
        () => filtrarDatos(palabras, busqueda, categoria),
        [palabras, busqueda, categoria]
    )

    const tamañoTabla = 20;

    const ultimoIndex = paginaActual * tamañoTabla;
    const primerIndex = ultimoIndex - tamañoTabla;
    const postActual = itemsFiltrados.slice(primerIndex, ultimoIndex);

    return (
        <section>
            <Filtros 
                busqueda={busqueda} 
                setBusqueda={(valor) => {
                    setBusqueda(valor)
                    setPaginaActual(1)
                }}
                categoria={categoria} 
                setCategoria={(valor) => {
                    setCategoria(valor)
                    setPaginaActual(1)
                }}
            />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ngigua</th>
                        <th>Español</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {postActual.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.ng}</td>
                            <td>{item.es}</td>
                            <td>{item.categoria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Paginacion 
                paginaActual={paginaActual} 
                setPaginaActual={setPaginaActual} 
                tamañoTabla={tamañoTabla} 
                ultimoIndex={ultimoIndex} 
                postActual={postActual} 
            />
        </section>
    )
}