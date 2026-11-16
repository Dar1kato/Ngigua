import { generarPaginas } from "../../logic/glosario";

export default function Paginacion({ paginaActual, setPaginaActual, tamañoTabla, ultimoIndex, postActual }) {
  let paginas = generarPaginas(postActual, tamañoTabla);

  return (
    <div className="paginacion">
      <button onClick={() => setPaginaActual(tamañoTabla === ultimoIndex ? paginaActual : paginaActual - 1)}>Anterior</button>
      {paginas.map((pagina, index) => (
        <button key={index} onClick={() => setPaginaActual(pagina)}>{pagina}</button>
      ))}
      <button onClick={() => setPaginaActual(paginaActual === paginas[paginas.length - 1] ? paginaActual : paginaActual + 1)}>Siguiente</button>
    </div>
  );
}