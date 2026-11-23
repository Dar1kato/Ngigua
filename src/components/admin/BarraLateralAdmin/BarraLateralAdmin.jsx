import './BarraLateralAdmin.css'

export function BarraLateralAdmin({ secciones = [], activa, onSeleccionar, onSalir }) {
  return (
    <aside className="barra-lateral">
      <svg className="barra-lateral__avatar" viewBox="0 0 100 100" role="img" aria-label="Administrador">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="50" cy="38" r="12" fill="none" stroke="currentColor" strokeWidth="6" />
        <path
          d="M28 78 V68 a10 10 0 0 1 10-10 h24 a10 10 0 0 1 10 10 V78"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <nav className="barra-lateral__menu">
        {secciones.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`barra-lateral__boton ${activa === s.id ? 'barra-lateral__boton--activo' : ''}`}
            aria-current={activa === s.id ? 'page' : undefined}
            onClick={() => onSeleccionar(s.id)}
          >
            {s.nombre}
          </button>
        ))}
      </nav>

      <button type="button" className="barra-lateral__boton barra-lateral__salir" onClick={onSalir}>
        Cerrar sesión
      </button>
    </aside>
  )
}
