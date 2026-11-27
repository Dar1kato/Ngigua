export default function Filtros({ busqueda, setBusqueda, categoria, setCategoria }) {
    return (
        <form className="ng-glosario-filtros" onSubmit={e => e.preventDefault()} role="search" aria-label="Filtros del vocabulario">
            <div className="ng-glosario-campo">
                <label htmlFor="ng-glosario-buscar">Buscar palabra</label>
                <div className="ng-glosario-busqueda">
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        
                    </svg>
                    <input
                        id="ng-glosario-buscar"
                        className="ng-glosario-entrada"
                        type="text"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        placeholder="Escribe en ngigua o español…"
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="ng-glosario-campo">
                <label htmlFor="ng-glosario-categoria">Categoría</label>
                <select id="ng-glosario-categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="">Todas las categorías</option>
                    <option value="sustantivo">Sustantivo</option>
                    <option value="verbo">Verbo</option>
                    <option value="adjetivo">Adjetivo</option>
                    <option value="pronombre">Pronombre</option>
                </select>
            </div>
        </form>
    )
}
