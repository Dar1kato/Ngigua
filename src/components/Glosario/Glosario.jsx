import { useState } from 'react';

export function Glosario({ palabras = [] }) {
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  const palabrasFiltradas = filtroActivo === 'Todos'
    ? palabras
    : palabras.filter((item) =>
        item.categoria?.toLowerCase().startsWith(filtroActivo.toLowerCase())
      );

  const reproducirAudio = (rutaAudio) => {
    if (!rutaAudio) return;
    const sonido = new Audio(rutaAudio);
    sonido.play().catch((err) => console.error('Error al reproducir audio:', err));
  };

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
        <button onClick={() => setFiltroActivo('adverbios')} style={{ fontWeight: filtroActivo === 'adverbios' ? 'bold' : 'normal' }}>
          Adverbios
        </button>
      </div>

      <p><em>Mostrando {palabrasFiltradas.length} resultados para "{filtroActivo}"</em></p>

      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Audio</th>
            <th>Ngigua</th>
            <th>Español</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {palabrasFiltradas.map((item, index) => (
            <tr key={item.docId || item.id || index}>
              <td>
                {item.imagen && (
                  <img
                    src={item.imagen}
                    alt={item.es}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                )}
              </td>
              <td>
                {item.audio && (
                  <button
                    onClick={() => reproducirAudio(item.audio)}
                    title={`Escuchar ${item.ng}`}
                    style={{ cursor: 'pointer', padding: '6px 10px', borderRadius: '6px' }}
                  >
                    🔊
                  </button>
                )}
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