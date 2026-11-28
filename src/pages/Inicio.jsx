import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import '../styles/Tarjetas.css'

const DURACION = 12000
const INTRO = 1000
const ESCENAS = [
  {
    imagen: '/img/imagen1.png',
    herramienta: {
      nombre: 'Traductor',
      descripcion: 'Consulta el significado de las palabras en ngigua y español.',
      accion: 'Traducir',
      ruta: '/traduccion',
      icono: 'traductor',
    },
    alt: 'Una persona lee un libro entre cactus y vegetación.',
    titulo: ['Una lengua', 'que también', 'se escribe.'],
    texto: 'Leer y escribir en ngigua permite compartir conocimientos y acercar a nuevas generaciones a la lengua.',
    dato: 'Lengua escrita',
    detalle: 'Aprendizaje entre generaciones',
    tema: 'Lengua y aprendizaje',
    credito: 'Fotografía: UNTI México',
    posicion: '44% 38%',
    movil: '44% 40%',
    acento: '#ddc08b',
  },
  {
    imagen: '/img/imagen2.png',
    herramienta: {
      nombre: 'Vocabulario',
      descripcion: 'Descubre nuevas palabras y amplía tu conocimiento de la lengua.',
      accion: 'Explorar',
      ruta: '/glosario',
      icono: 'vocabulario',
    },
    alt: 'Dos mujeres con prendas bordadas y un rebozo frente a un arcoíris y montañas.',
    titulo: ['Saberes', 'que nos', 'identifican.'],
    texto: 'La lengua, los tejidos y los bordados forman parte de la vida cultural de la comunidad y de los saberes que se comparten.',
    dato: 'Cultura ngigua',
    detalle: 'Identidad y memoria comunitaria',
    tema: 'Cultura e identidad',
    credito: 'Fotografía: UNTI México',
    posicion: '50% 73%',
    movil: '50% 68%',
    acento: '#e6b6a0',
  },
  {
    imagen: '/img/imagen3.png',
    herramienta: {
      nombre: 'Juegos',
      descripcion: 'Pon a prueba tus conocimientos y aprende de manera interactiva.',
      accion: 'Jugar',
      ruta: '/juegos',
      icono: 'juegos',
    },
    alt: 'Una persona de pie entre cactus y montañas.',
    titulo: ['Ngigua.', 'Una lengua', 'viva.'],
    texto: 'Se habla en San Marcos Tlacoyalco y otras comunidades de Puebla. Es una lengua tonal: el tono puede cambiar el significado de las palabras.',
    dato: 'Otomangue',
    detalle: 'Familia lingüística',
    tema: 'Territorio y lengua',
    credito: '',
    posicion: '24% 23%',
    movil: '24% 25%',
    acento: '#d7c78f',
  },
]

function IlustracionHerramienta({ tipo }) {
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" focusable="false">
      {tipo === 'traductor' && (
        <g>
          <rect x="65" y="27" width="105" height="85" rx="12" className="ng-ilustra-base" />
          <rect x="150" y="43" width="105" height="85" rx="12" className="ng-ilustra-acento" />
          <text x="116" y="78" textAnchor="middle" fontSize="34" className="ng-ilustra-claro">Aa</text>
          <text x="203" y="81" textAnchor="middle" fontSize="17" fontWeight="600" className="ng-ilustra-oscuro">Ngigua</text>
          <path d="M187 97 H219 M187 104 H210" className="ng-ilustra-linea-oscura" />
          <path d="M98 91 H129 M98 97 H120" className="ng-ilustra-linea" />
        </g>
      )}
      {tipo === 'vocabulario' && (
        <g>
          <path d="M160 40 Q110 17 57 40 V115 Q110 92 160 118 Q210 92 263 115 V40 Q210 17 160 40Z" className="ng-ilustra-base" />
          <path d="M160 40 V118 M78 54 Q110 45 141 58 M78 68 Q110 59 141 72 M78 82 Q110 73 141 86 M179 58 Q210 45 242 54 M179 72 Q210 59 242 68 M179 86 Q210 73 242 82" className="ng-ilustra-linea" />
        </g>
      )}
      {tipo === 'juegos' && Array.from({ length: 6 }, (_, i) => {
        const x = 86 + (i % 3) * 52
        const y = 17 + Math.floor(i / 3) * 62
        const activa = i === 1 || i === 4
        return (
          <g key={i}>
            <rect x={x} y={y} width="44" height="55" rx="6" className={activa ? 'ng-ilustra-acento' : 'ng-ilustra-base'} />
            <text x={x + 22} y={y + 34} textAnchor="middle" fontSize="22" className={activa ? 'ng-ilustra-oscuro' : 'ng-ilustra-dorado'}>{activa ? '✓' : '❖'}</text>
          </g>
        )
      })}
    </svg>
  )
}

function movimientoReducido() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function MenuAprendizaje() {
  const [indice, setIndice] = useState(0)
  const [transcurrido, setTranscurrido] = useState(0)
  const [pausado, setPausado] = useState(movimientoReducido)
  const [ciclo, setCiclo] = useState(0)
  const [sobreCarrusel, setSobreCarrusel] = useState(false)
  const [focoCarrusel, setFocoCarrusel] = useState(false)
  const reloj = useRef(0)
  const escena = ESCENAS[indice]
  const herramienta = escena.herramienta
 
  const detenido = pausado || sobreCarrusel || focoCarrusel
  const porcentaje = Math.min(100, Math.floor(transcurrido / INTRO * 100))

  useEffect(() => {
    if (detenido) return undefined
    let anterior = performance.now()
    const timer = window.setInterval(() => {
      const ahora = performance.now()
      reloj.current += ahora - anterior
      anterior = ahora
      if (reloj.current >= DURACION) {
        reloj.current = 0
        setIndice(actual => (actual + 1) % ESCENAS.length)
        setCiclo(actual => actual + 1)
      }
      setTranscurrido(reloj.current)
    }, 50)
    return () => window.clearInterval(timer)
  }, [detenido, ciclo])

  function elegir(i) {
    reloj.current = 0
    setTranscurrido(0)
    setIndice(i)
    setCiclo(actual => actual + 1)
  }

  return (
    <main className={`ng-inicio${detenido ? ' ng-pausado' : ''}`} style={{ '--ng-acento': escena.acento }}>
      <div className="ng-paisajes">
        {ESCENAS.map((foto, i) => (
          <div key={foto.imagen} className={`ng-paisaje${i === indice ? ' ng-activo' : ''}`} aria-hidden={i !== indice}
            style={{ '--ng-foto': `url("${foto.imagen}")`, '--ng-pos': foto.posicion, '--ng-movil': foto.movil }}>
            <div className="ng-ambiente" aria-hidden="true" />
            <img src={foto.imagen} alt={foto.alt} loading="eager" decoding="async" />
          </div>
        ))}
      </div>
      <div className="ng-velo" aria-hidden="true" />

      <div className="ng-interior">
        <svg key={`marco-${ciclo}`} className="ng-marco" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect x=".4" y=".4" width="99.2" height="99.2" rx="3.5" ry="4.5" pathLength="100" />
        </svg>
        <header className="ng-barra">
          
         
        </header>

        <div className="ng-hero" key={`hero-${ciclo}`}>
          
          <h1 id="ng-titulo">{escena.titulo.map((linea, i) => <span key={linea} className={i === 1 ? 'ng-suave' : ''}>{linea}</span>)}</h1>
          <p> </p>
        </div>

        <div className="ng-inferior">
          <div className="ng-contexto" key={`contexto-${ciclo}`}>
            <div className="ng-texto">
              <p className="ng-ubicacion">San Marcos Tlacoyalco · Puebla</p>
              <p>{escena.texto}</p>
              {escena.credito && <small>{escena.credito}</small>}
            </div>
            <div className="ng-dato">
              <span className="ng-estrella" aria-hidden="true"></span>
              <div><strong>{escena.dato}</strong><small>{escena.detalle}</small></div>
            </div>
          </div>
          <section
            className="ng-panel ng-carrusel"
            aria-label="Herramientas de aprendizaje"
            aria-roledescription="carrusel"
            onPointerEnter={event => {
              if (event.pointerType === 'mouse') setSobreCarrusel(true)
            }}
            onPointerLeave={() => setSobreCarrusel(false)}
            onPointerCancel={() => setSobreCarrusel(false)}
            onFocus={event => setFocoCarrusel(event.target.matches(':focus-visible'))}
            onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setFocoCarrusel(false)
            }}
          >
            <div className="ng-carrusel-encabezado">
              <div>
                <small>EXPLORA LA LENGUA</small>
                <h2>Aprende ngigua</h2>
              </div>
              <span className="ng-carrusel-numero">0{indice + 1} / 0{ESCENAS.length}</span>
            </div>

            {/* El contenido cambia con la misma escena, sin otro temporizador. */}
            <div className="ng-carrusel-ficha" key={`herramienta-${ciclo}`}
              aria-roledescription="diapositiva" role="group"
              aria-label={`${indice + 1} de ${ESCENAS.length}: ${herramienta.nombre}`}>
              <div className="ng-carrusel-ilustracion">
                <IlustracionHerramienta tipo={herramienta.icono} />
              </div>
              <div className="ng-carrusel-contenido">
                <h3>{herramienta.nombre}</h3>
                <p>{herramienta.descripcion}</p>
                <Link className="ng-carrusel-enlace" to={herramienta.ruta}>
                  {herramienta.accion}<span aria-hidden="true"></span>
                </Link>
              </div>
            </div>

            <div className="ng-carrusel-pie">
              <div className="ng-carrusel-indicadores" aria-label="Seleccionar herramienta y escena">
                {ESCENAS.map((foto, i) => (
                  <button key={foto.imagen} type="button" onClick={() => elegir(i)}
                    className={indice === i ? 'ng-carrusel-seleccionado' : ''}
                    aria-label={`Mostrar ${foto.herramienta.nombre} y su escena`} aria-pressed={indice === i} />
                ))}
              </div>
             
            </div>
          </section>
        </div>
        <div className="ng-controles">
          <div className="ng-puntos" aria-label="Seleccionar escena">
            {ESCENAS.map((foto, i) => <button key={foto.imagen} type="button" onClick={() => elegir(i)} aria-label={`Escena ${i + 1}: ${foto.tema}`} aria-pressed={indice === i} className={indice === i ? 'ng-seleccionado' : ''} />)}
          </div>
          <div className="ng-progreso" aria-hidden="true"><span style={{ transform: `scaleX(${transcurrido / DURACION})` }} /></div>
          <span className="ng-numero">0{indice + 1} / 0{ESCENAS.length}</span>
          <button type="button" className="ng-pausa" onClick={() => setPausado(actual => !actual)} aria-label={pausado ? 'Reanudar animación' : 'Pausar animación'}>{pausado ? '▶' : 'Ⅱ'}</button>
        </div>
        <div key={`contador-${ciclo}`} className={`ng-contador${transcurrido >= INTRO + 250 || detenido ? ' ng-contador-oculto' : ''}`} aria-hidden="true">{porcentaje}%</div>
      </div>
    </main>
  )
}
