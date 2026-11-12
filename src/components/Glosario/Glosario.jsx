import { useState } from 'react';

export function Glosario({ palabras = [] }) {
  // Estado para saber qué filtro está activo. Inicia mostrando "Todos"
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  // arreglo de palabras en tiempo real dependiendo del botón seleccionado
  const palabrasFiltradas = filtroActivo === 'Todos'
    ? palabras
    : palabras.filter((item) => item.categoria?.toLowerCase() === filtroActivo.toLowerCase());

  return (
    <div>
      {/*  botones de filtrado */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button onClick={() => setFiltroActivo('Todos')} style={{ fontWeight: filtroActivo === 'Todos' ? 'bold' : 'normal' }}>
          Todos
        </button>
        <button onClick={() => setFiltroActivo('sustantivo')} style={{ fontWeight: filtroActivo === 'sustantivo' ? 'bold' : 'normal' }}>
          Sustantivos
        </button>
        <button onClick={() => setFiltroActivo('verbo')} style={{ fontWeight: filtroActivo === 'verbo' ? 'bold' : 'normal' }}>
          Verbos
        </button>
        <button onClick={() => setFiltroActivo('adjetivo')} style={{ fontWeight: filtroActivo === 'adjetivo' ? 'bold' : 'normal' }}>
          Adjetivos
        </button>
        <button onClick={() => setFiltroActivo('adverbio')} style={{ fontWeight: filtroActivo === 'adverbio' ? 'bold' : 'normal' }}>
          Adverbios
        </button>
      </div>

      {/* Contador para saber cuántas palabras hay en la categoría seleccionada */}
      <p><em>Mostrando {palabrasFiltradas.length} resultados para "{filtroActivo}"</em></p>

      {/* Tabla de palabras */}
      <table>
        <thead>
          <tr>
            <th>Ngigua</th>
            <th>Español</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {palabrasFiltradas.map((item) => (
            <tr key={item.docId || item.id}>
              <td>{item.ng}</td>
              <td>{item.es}</td>
              <td>{item.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
