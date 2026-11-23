/* Aquí se construye la pagina de Admin.

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Admin.css.
*/
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../logic/auth'
import BarraLateralAdmin from '../components/BarraLateralAdmin'
import PanelDiccionario from '../components/PanelDiccionario'
import PanelEstadisticas from '../components/PanelEstadisticas'
import '../styles/Admin.css'

// Para agregar otro botón a la barra lateral, agrega un objeto aquí
// y una línea más en el return.
const SECCIONES = [
  { id: 'diccionario', nombre: 'Diccionario' },
  { id: 'oral', nombre: 'Diccionario oral' },
  { id: 'estadisticas', nombre: 'Estadísticas (Consultas hechas)' },
]

// TODO: datos de ejemplo para ver el diseño. Reemplazar por las palabras
// reales de Firestore (pasarlas desde App.jsx, como hace Glosario).
const palabrasEjemplo = [
  { docId: '1', id: '0001', ng: 'nchia', es: 'casa' },
  { docId: '2', id: '0002', ng: 'ndu', es: 'perro' },
]

export default function Admin() {
  const navigate = useNavigate()
  const [seccion, setSeccion] = useState('diccionario')

  async function salir() {
    await cerrarSesion()
    navigate('/login')
  }

  return (
    <main className="admin">
      <BarraLateralAdmin
        secciones={SECCIONES}
        activa={seccion}
        onSeleccionar={setSeccion}
        onSalir={salir}
      />

      <section className="admin__contenido">
        {seccion === 'diccionario' && (
          <PanelDiccionario
            palabras={palabrasEjemplo}
            onBuscar={() => {}}     // TODO: filtrar por español / ngigua
            onAgregar={() => {}}    // TODO: agregar palabra
            onModificar={() => {}}  // TODO: modificar la palabra seleccionada
            onEliminar={() => {}}   // TODO: eliminar la palabra seleccionada
          />
        )}

        {seccion === 'oral' && (
          // TODO: sección completa pendiente (diccionario con audios)
          <p className="admin__pendiente">Diccionario oral: pendiente de construir.</p>
        )}

        {seccion === 'estadisticas' && <PanelEstadisticas />}
      </section>
    </main>
  )
}
