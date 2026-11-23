import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { verificarEsAdmin } from '../../logic/auth';

export function RutaProtegida({ children }) {
  const [estado, setEstado] = useState('cargando'); // 'cargando' | 'autorizado' | 'denegado'

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setEstado('denegado');
        return;
      }

      try {
        const esAdmin = await verificarEsAdmin(user.uid);
        setEstado(esAdmin ? 'autorizado' : 'denegado');
      } catch {
        setEstado('denegado');
      }
    });

    return () => cancelar();
  }, []);

  if (estado === 'cargando') return <p>Verificando permisos...</p>;
  if (estado === 'denegado') return <Navigate to="/login" replace />;

  return children;
}