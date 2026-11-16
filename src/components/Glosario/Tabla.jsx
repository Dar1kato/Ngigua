import { useMemo, useState } from "react";
import { 
    filtrarDatos,
} from "../../logic/glosario";
import Filtros from "./Filtros";
import Paginacion from "./Paginacion";
import data from '../../data/data.json'

export function Tabla() {
    const [busqueda, setBusqueda] = useState("")
    const [categoria, setCategoria] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    const [tamañoTabla, setTamañoTabla] = useState(20)

    const itemsFiltrados = useMemo(
        () => filtrarDatos(data, busqueda, categoria),
        [busqueda, categoria]
    )

    const ultimoIndex = paginaActual * tamañoTabla;
    const primerIndex = ultimoIndex - tamañoTabla;
    const postActual = itemsFiltrados.slice(primerIndex, ultimoIndex);

    return (
        <section>
            <Filtros 
                busqueda={busqueda} 
                setBusqueda={setBusqueda} 
                categoria={categoria} 
                setCategoria={setCategoria} 
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
                            <td>{item.ngigua}</td>
                            <td>{item.español}</td>
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