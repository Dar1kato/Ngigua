import { useState } from 'react';

export function Traductor({ palabras = [] }) {
  // Estado para lo que el usuario escribe en la caja de texto
  const [busqueda, setBusqueda] = useState('');
  // Estado para guardar el resultado de la traducción al presionar el botón
  const [resultado, setResultado] = useState(null);

  // Función que se ejecuta al darle clic a "Buscar"
  const buscarTraduccion = () => {
    if (!busqueda.trim()) {
      setResultado(null);
      return;
    }

    // Busca la palabra exacta en el arreglo ignorando mayúsculas y espacios extra
    const palabraEncontrada = palabras.find(
      (item) => item.es?.toLowerCase().trim() === busqueda.toLowerCase().trim()
    );

    if (palabraEncontrada) {
      setResultado(palabraEncontrada.ng);
    } else {
      setResultado('Palabra no encontrada');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h2>Traductor</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <label>Español:</label>
        <input 
          type="text" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && buscarTraduccion()} // También busca al dar Enter
          placeholder="Escribe para traducir..."
          style={{ padding: '5px' }}
        />
        <button onClick={buscarTraduccion} style={{ padding: '5px 15px', cursor: 'pointer' }}>
          Buscar
        </button>
      </div>

      <div style={{ fontSize: '1.2rem' }}>
        <p>
          Ngigua: <strong>{resultado !== null ? resultado : '---'}</strong>
        </p>
      </div>
    </div>
  );
}
