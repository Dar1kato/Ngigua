export default function Filtros({ busqueda, setBusqueda, categoria, setCategoria }) {
    return (
        <form>
            <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar" />
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value="">Todas</option>
                <option value="Sustantivo">Sustantivo</option>
                <option value="Verbo">Verbo</option>
                <option value="Adjetivo">Adjetivo</option>
            </select>
        </form>
    )
}