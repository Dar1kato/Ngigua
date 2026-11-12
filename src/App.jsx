import { useState, useEffect } from 'react'
import Traductor from './components/Traductor'
import './App.css'
import Glosario from './components/Glosario'
import Memorama from './components/Juegos/Memorama'
import { cargarElementos } from './data/Firesotre_data'

function App() {
  const [palabras, setPalabras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Se ejecuta automáticamente al abrir el programa en cualquier laptop
  useEffect(() => {
    cargarElementos()
      .then((datos) => {
        setPalabras(datos)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p>Cargando base de datos Ngigua...</p>
  if (error) return <p>Error al cargar la base de datos: {error}</p>

  return (
    <>
      <h1>Notebook</h1>
      <p>Palabras cargadas: {palabras.length}</p>
      <br />
      <h2>Traductor</h2>
      <Traductor palabras={palabras} />
      <br />
      <h2>Glosario</h2>
      <Glosario palabras={palabras} />
      <br />
      <h2>Memorama</h2>
      <Memorama palabras={palabras} />
    </>
  )
}

export default App