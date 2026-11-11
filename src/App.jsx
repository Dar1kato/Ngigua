import { useState, useEffect } from 'react'
import Traductor from './components/Traductor'
import './App.css'
import Glosario from './components/Glosario'
import Memorama from './components/Juegos/Memorama'


function App() {
  return (
    <>
      <h1>Notebook</h1>
      <br />
      <h2>Traductor</h2>
      <Traductor />
      <br />
      <h2>Glosario</h2>
      <Glosario />
      <br />
      <h2>Memorama</h2>
      <Memorama />
    </>
  )
}

export default App
