/* Aquí se construye la pagina de Admin.

Los componentes que se ocupen para esta pagina deben crearse en /components/«NombreDelComponente»/NombreDelComponente.jsx.

El estilo de esta página se debe modificar en /styles/Admin.css.
*/
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../logic/auth'
import { agregarPalabra, editarPalabra, eliminarPalabra } from '../logic/palabras'
import BarraLateralAdmin from '../components/admin/BarraLateralAdmin'
import PanelDiccionario from '../components/admin/PanelDiccionario'
import PanelEstadisticas from '../components/admin/PanelEstadisticas'
import FormularioPalabra from '../components/admin/FormularioPalabra'
import '../styles/Admin.css'

// Para agregar otro botón a la barra lateral, agrega un objeto aquí
// y una línea más en el return.
const SECCIONES = [
  { id: 'diccionario', nombre: 'Diccionario' },
  { id: 'oral', nombre: 'Diccionario oral' },
  { id: 'estadisticas', nombre: 'Estadísticas (Consultas hechas)' },
]

const coincide = (texto, busqueda) =>
  (texto ?? '').toLowerCase().includes(busqueda.trim().toLowerCase())

// palabras y recargar vienen de App.jsx, así el glosario y el traductor
// se actualizan en cuanto el admin guarda un cambio.
export default function Admin({ palabras = [], recargar }) {
  const navigate = useNavigate()
  const [seccion, setSeccion] = useState('diccionario')
  const [filtro, setFiltro] = useState({ es: '', ng: '' })
  const [formulario, setFormulario] = useState(null) // null = cerrado | { palabra: null | objeto }
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  async function salir() {
    await cerrarSesion()
    navigate('/login')
  }

  const visibles = palabras.filter(
    (p) => coincide(p.es, filtro.es) && coincide(p.ng, filtro.ng)
  )

  function abrirFormulario(palabra = null) {
    setMensaje('')
    setError('')
    setFormulario({ palabra })
  }

  async function guardar(datos) {
    setError('')
    setGuardando(true)
    try {
      if (formulario.palabra) {
        await editarPalabra(formulario.palabra.docId, datos)
        setMensaje('Palabra actualizada.')
      } else {
        await agregarPalabra(datos)
        setMensaje('Palabra agregada.')
      }
      await recargar?.()
      setFormulario(null)
    } catch (err) {
      console.error(err)
      setError('No se pudo guardar. Verifica tus permisos de admin.')
    } finally {
      setGuardando(false)
    }
  }

  async function eliminar(palabra) {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar "${palabra.es}" (${palabra.ng})?`)
    if (!confirmar) return

    setMensaje('')
    setError('')
    try {
      await eliminarPalabra(palabra.docId)
      await recargar?.()
      setMensaje('Palabra eliminada.')
    } catch (err) {
      console.error(err)
      setError('No se pudo eliminar la palabra.')
    }
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
        {mensaje && <p role="status" className="admin__mensaje">{mensaje}</p>}
        {error && !formulario && <p role="alert" className="admin__error">{error}</p>}

        {seccion === 'diccionario' && (
          <PanelDiccionario
            palabras={visibles}
            onBuscar={setFiltro}
            onAgregar={() => abrirFormulario()}
            onModificar={(palabra) => abrirFormulario(palabra)}
            onEliminar={eliminar}
          />
        )}

        {seccion === 'oral' && (
          // TODO: sección completa pendiente (diccionario con audios)
          <p className="admin__pendiente">Diccionario oral: pendiente de construir.</p>
        )}

        {seccion === 'estadisticas' && <PanelEstadisticas totalPalabras={palabras.length} />}
      </section>

      {formulario && (
        <FormularioPalabra
          palabra={formulario.palabra}
          guardando={guardando}
          error={error}
          onGuardar={guardar}
          onCancelar={() => setFormulario(null)}
        />
      )}
    </main>
  )
}
