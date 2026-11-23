import { useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../../logic/auth';

export function Admin() {
  const navigate = useNavigate();

  const handleSalir = async () => {
    await cerrarSesion();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Panel de Administración</h2>
        <button onClick={handleSalir}>Cerrar sesión</button>
      </div>
      <p>Sesión iniciada como administrador.</p>
    </div>
  );
}