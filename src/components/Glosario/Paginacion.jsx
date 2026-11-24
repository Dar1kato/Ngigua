import { 
    generarPaginas,
} from "../../logic/glosario";

export default function Paginacion({ paginaActual, setPaginaActual, tamañoTabla, totalElementos }) {
  const paginas = generarPaginas(totalElementos, tamañoTabla)
  const ultimaPagina = paginas.length

  return (
    <nav className="paginacion" aria-label="Paginación del glosario">
      <button
        type="button"
        disabled={paginaActual <= 1 || ultimaPagina === 0}
        onClick={() => setPaginaActual((pagina) => Math.max(1, pagina - 1))}
      >
        Anterior
      </button>
      {paginas.map((pagina) => (
        <button
          key={pagina}
          type="button"
          aria-current={pagina === paginaActual ? 'page' : undefined}
          onClick={() => setPaginaActual(pagina)}
        >
          {pagina}
        </button>
      ))}
      <button
        type="button"
        disabled={paginaActual >= ultimaPagina || ultimaPagina === 0}
        onClick={() => setPaginaActual((pagina) => Math.min(ultimaPagina, pagina + 1))}
      >
        Siguiente
      </button>
    </nav>
  )
}