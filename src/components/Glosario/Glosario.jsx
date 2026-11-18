import { useState } from 'react';

export function Glosario({ palabras = [] }) {
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  const palabrasFiltradas = filtroActivo === 'Todos'
    ? palabras
    : palabras.filter((item) => item.categoria?.toLowerCase() === filtroActivo.toLowerCase());

  return (
    <div>
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

      <p><em>Mostrando {palabrasFiltradas.length} resultados para "{filtroActivo}"</em></p>

      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Ngigua</th>
            <th>Español</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {palabrasFiltradas.map((item, index) => (
            <tr key={item.docId || item.id || index}>
              <td>
                <img 
                  src={item.imagen} 
                  alt={item.imagen || "Sin ruta"} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                />
              </td>
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