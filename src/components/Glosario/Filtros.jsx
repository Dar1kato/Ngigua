export default function Filtros({ busqueda, setBusqueda, categoria, setCategoria }) {
    return (
        <form>
            <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar" />
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value="">Todas</option>
                <option value="sustantivo">Sustantivo</option>
                <option value="verbo">Verbo</option>
                <option value="adjetivo">Adjetivo</option>
                <option value="pronombre">Pronombre</option>
            </select>
        </form>
    )
}