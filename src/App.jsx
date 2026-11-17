import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { 
  cargarElementos 
} from './data/Firestore_data'
import Traduccion from './pages/Traduccion'
import Glosario from './pages/Glosario'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Juegos from './pages/Juegos'
import Memorama from './pages/Memorama'
import Admin from './pages/Admin'
import Ahorcado from './pages/Ahorcado'

export default function App() {
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

  return (
    <Routes>
      <Route path="/" element={<Inicio />}/>
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
      <Route path="/glosario" element={<Glosario palabras={palabras}/>}/>
      <Route path="/juegos" element={<Juegos />}/>
      <Route path="/juegos/memorama" element={<Memorama />}/>
      <Route path="/juegos/ahorcado" element={<Ahorcado />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/admin" element={<Admin />}/>
    </Routes>
  )
}
