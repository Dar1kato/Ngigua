import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { cargarElementos } from './data/Firestore_data'

import Traduccion from './pages/Traduccion'
import Glosario from './pages/Glosario'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Juegos from './pages/Juegos'
import Memorama from './pages/Memorama'
import Admin from './pages/Admin'
import Ahorcado from './pages/Ahorcado'

import RutaProtegida from './components/admin/RutaProtegida'
import Nav from './components/Diseno/Nav.jsx'
import './styles/Global.css'

export default function App() {
  const [palabras, setPalabras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Refrescar las palabras después de guardar o eliminar
  function recargar() {
    return cargarElementos().then(setPalabras)
  }

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

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/traduccion"
          element={
            <Traduccion
              palabras={palabras}
              cargando={cargando}
              error={error}
            />
          }
        />

        <Route
          path="/glosario"
          element={<Glosario palabras={palabras} />}
        />

        <Route path="/juegos" element={<Juegos />} />

        <Route path="/juegos/memorama" element={<Memorama palabras={palabras}/>} />

        <Route path="/juegos/ahorcado" element={<Ahorcado palabras={palabras} cargando={cargando}/>} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin palabras={palabras} recargar={recargar} />
            </RutaProtegida>
          }
        />
      </Routes>
    </>
  )
}