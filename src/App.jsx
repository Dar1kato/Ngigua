import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Traductor } from './components/Traductor/Traductor'
import { Glosario } from './components/Glosario/Glosario'
import { Memorama } from './components/Juegos/Memorama/Memorama'
import { Login } from './components/Login'
import { Admin } from './components/Admin'
import { RutaProtegida } from './components/RutaProtegida'
import { cargarElementos } from './data/Firestore_data'
import './App.css'

function App() {
  const [palabras, setPalabras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

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

  const vistaPrincipal = cargando ? (
    <p>Cargando base de datos Ngigua...</p>
  ) : error ? (
    <p>Error al cargar la base de datos: {error}</p>
  ) : (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Link to="/login">
          <button>Admin</button>
        </Link>
      </div>

      <h1>Notebook</h1>
      <p>Palabras cargadas desde Firestore: {palabras.length}</p>
      <br />
      <Traductor palabras={palabras} />
      <br />
      <h2>Glosario</h2>
      <Glosario palabras={palabras} />
      <br />
      <h2>Memorama</h2>
      <Memorama palabras={palabras} />
    </>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={vistaPrincipal} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App