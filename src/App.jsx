import { Routes, Route } from 'react-router-dom'
import Traductor from './pages/Traductor'
import Glosario from './pages/Glosario'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Juegos from './pages/Juegos'
import Memorama from './pages/Memorama'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />}/>
      <Route path="/traductor" element={<Traductor />}/>
      <Route path="/glosario" element={<Glosario />}/>
      <Route path="/juegos" element={<Juegos />}/>
      <Route path="/juegos/memorama" element={<Memorama />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/admin" element={<Admin />}/>
    </Routes>
  )
}

