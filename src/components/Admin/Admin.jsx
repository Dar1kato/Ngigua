import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cerrarSesion } from '../../logic/auth';
import {
  obtenerPalabras,
  agregarPalabra,
  editarPalabra,
  eliminarPalabra,
} from '../../logic/palabras';

const FORM_INICIAL = {
  ng: '',
  es: '',
  categoria: 'sustantivo',
  imagen: '',
  audio: '',
};

export function Admin() {
  const navigate = useNavigate();
  const [palabras, setPalabras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerPalabras()
      .then((datos) => {
        setPalabras(datos);
        setCargando(false);
      })
      .catch((err) => {
        setError('Error al cargar palabras: ' + err.message);
        setCargando(false);
      });
  }, []);

  const handleSalir = async () => {
    await cerrarSesion();
    navigate('/login');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setGuardando(true);

    try {
      if (editandoId) {
        const actualizada = await editarPalabra(editandoId, form);
        setPalabras((prev) =>
          prev.map((p) => (p.docId === editandoId ? actualizada : p))
        );
        setMensaje('Palabra actualizada correctamente.');
        setEditandoId(null);
      } else {
        const creada = await agregarPalabra(form);
        setPalabras((prev) => [creada, ...prev]);
        setMensaje('Palabra agregada correctamente.');
      }
      setForm(FORM_INICIAL);
    } catch (err) {
      setError('No se pudo guardar. Verifica tus permisos de admin.');
      console.error(err);
    } finally {
      setGuardando(false);
    }
  };

  const iniciarEdicion = (item) => {
    setEditandoId(item.docId);
    setForm({
      ng: item.ng || '',
      es: item.es || '',
      categoria: item.categoria || 'sustantivo',
      imagen: item.imagen || '',
      audio: item.audio || '',
    });
    setMensaje('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(FORM_INICIAL);
  };

  const handleEliminar = async (item) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar "${item.es}" (${item.ng})?`
    );
    if (!confirmar) return;

    setError('');
    setMensaje('');
    try {
      await eliminarPalabra(item.docId);
      setPalabras((prev) => prev.filter((p) => p.docId !== item.docId));
      if (editandoId === item.docId) cancelarEdicion();
      setMensaje('Palabra eliminada.');
    } catch (err) {
      setError('No se pudo eliminar la palabra.');
      console.error(err);
    }
  };

  const palabrasFiltradas = palabras.filter((item) => {
    const q = busqueda.toLowerCase();
    return (
      item.es?.toLowerCase().includes(q) ||
      item.ng?.toLowerCase().includes(q) ||
      item.categoria?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Panel de Administración ({palabras.length} palabras)</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/">
            <button type="button">Ver diccionario</button>
          </Link>
          <button type="button" onClick={handleSalir}>Cerrar sesión</button>
        </div>
      </div>

      {/* Formulario Agregar / Editar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          padding: '15px',
          border: '1px solid #444',
          borderRadius: '8px',
          marginBottom: '25px',
        }}
      >
        <input
          name="ng"
          placeholder="Ngigua (ej. nchia)"
          value={form.ng}
          onChange={handleChange}
          required
        />
        <input
          name="es"
          placeholder="Español (ej. casa)"
          value={form.es}
          onChange={handleChange}
          required
        />
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="sustantivo">Sustantivo</option>
          <option value="verbo">Verbo</option>
          <option value="adjetivo">Adjetivo</option>
          <option value="adverbios">Adverbios</option>
          <option value="pronombres">Pronombres</option>
          <option value="numeros">Números</option>
        </select>
        <input
          name="imagen"
          placeholder="Imagen (ej. /img/casa.png)"
          value={form.imagen}
          onChange={handleChange}
        />
        <input
          name="audio"
          placeholder="Audio (ej. /audio/casa.mp3)"
          value={form.audio}
          onChange={handleChange}
        />

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button type="submit" disabled={guardando}>
            {guardando ? 'Guardando...' : editandoId ? 'Guardar cambios' : 'Agregar'}
          </button>
          {editandoId && (
            <button type="button" onClick={cancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {mensaje && <p style={{ color: '#4caf50' }}>{mensaje}</p>}
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por español, ngigua o categoría..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '15px', boxSizing: 'border-box' }}
      />

      {/* Tabla de palabras */}
      {cargando ? (
        <p>Cargando palabras...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Ngigua</th>
              <th>Español</th>
              <th>Categoría</th>
              <th>Audio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {palabrasFiltradas.map((item) => (
              <tr key={item.docId} style={{ borderBottom: '1px solid #333' }}>
                <td>
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.es}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  )}
                </td>
                <td>{item.ng}</td>
                <td>{item.es}</td>
                <td>{item.categoria}</td>
                <td>{item.audio ? '🔊' : '—'}</td>
                <td style={{ display: 'flex', gap: '6px', padding: '6px 0' }}>
                  <button type="button" onClick={() => iniciarEdicion(item)}>
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEliminar(item)}
                    style={{ backgroundColor: '#8b2626', color: 'white' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}