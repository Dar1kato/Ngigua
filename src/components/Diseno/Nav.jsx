import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/Nav.css'

const RUTAS = {
  inicio: '/',
  traduccion: '/traduccion',
  vocabulario: '/glosario',
  juegos: '/juegos',
  memorama: '/juegos/memorama',
  ahorcado: '/juegos/ahorcado',
  admin: '/admin',
}

function claseEnlace({ isActive }) {
  return `ng-nav-enlace${isActive ? ' ng-nav-activo' : ''}`
}

export default function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [juegosAbierto, setJuegosAbierto] = useState(false)
  const navRef = useRef(null)
  const juegosRef = useRef(null)
  const botonMenuRef = useRef(null)
  const botonJuegosRef = useRef(null)

  function cerrarMenus() {
    setMenuAbierto(false)
    setJuegosAbierto(false)
  }

  useEffect(() => {
    if (!menuAbierto && !juegosAbierto) return undefined

    function cerrarFuera(event) {
      if (!navRef.current?.contains(event.target)) {
        setMenuAbierto(false)
        setJuegosAbierto(false)
      } else if (!juegosRef.current?.contains(event.target)) {
        setJuegosAbierto(false)
      }
    }

    function cerrarEscape(event) {
      if (event.key !== 'Escape') return
      if (juegosAbierto) {
        setJuegosAbierto(false)
        botonJuegosRef.current?.focus()
      } else if (menuAbierto) {
        setMenuAbierto(false)
        botonMenuRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', cerrarFuera)
    document.addEventListener('keydown', cerrarEscape)
    return () => {
      document.removeEventListener('pointerdown', cerrarFuera)
      document.removeEventListener('keydown', cerrarEscape)
    }
  }, [menuAbierto, juegosAbierto])

  return (
    <header className="ng-nav-global" ref={navRef}>
      <nav className="ng-nav-contenedor" aria-label="Navegación principal">
        <NavLink to={RUTAS.inicio} className="ng-nav-marca" onClick={cerrarMenus}>
          
          <span>Plataforma de aprendizaje para la lengua ngigua</span>
        </NavLink>

        <button ref={botonMenuRef} className="ng-nav-toggle" type="button"
          aria-label={menuAbierto ? 'Cerrar navegación' : 'Abrir navegación'}
          aria-expanded={menuAbierto} aria-controls="ng-nav-lista"
          onClick={() => { setMenuAbierto(actual => !actual); setJuegosAbierto(false) }}>
          <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            {menuAbierto ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        <ul id="ng-nav-lista" className={`ng-nav-lista${menuAbierto ? ' ng-nav-abierto' : ''}`}>
          <li><NavLink end to={RUTAS.inicio} className={claseEnlace} onClick={cerrarMenus}>Inicio</NavLink></li>
          <li><NavLink to={RUTAS.traduccion} className={claseEnlace} onClick={cerrarMenus}>Traducción</NavLink></li>
          <li><NavLink to={RUTAS.vocabulario} className={claseEnlace} onClick={cerrarMenus}>Vocabulario</NavLink></li>
          <li className="ng-nav-juegos" ref={juegosRef}>
            <div className="ng-nav-grupo">
              <NavLink to={RUTAS.juegos} className={claseEnlace} onClick={cerrarMenus}>Juegos</NavLink>
              <button ref={botonJuegosRef} type="button" className="ng-nav-desplegar"
                aria-label="Opciones de juegos" aria-expanded={juegosAbierto} aria-controls="ng-nav-submenu"
                onClick={() => setJuegosAbierto(actual => !actual)}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
              </button>
            </div>
            <ul id="ng-nav-submenu" className="ng-nav-submenu" hidden={!juegosAbierto}>
              <li><NavLink end to={RUTAS.memorama} className={claseEnlace} onClick={cerrarMenus}><span className="ng-nav-rombo" aria-hidden="true"></span> Memorama</NavLink></li>
              <li><NavLink end to={RUTAS.ahorcado} className={claseEnlace} onClick={cerrarMenus}><span className="ng-nav-rombo" aria-hidden="true"></span> Ahorcado</NavLink></li>
            </ul>
          </li>
          <li className="ng-nav-admin"><NavLink to={RUTAS.admin} className={claseEnlace} onClick={cerrarMenus}>Admin <span aria-hidden="true"></span></NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
