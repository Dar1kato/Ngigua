import { useState } from 'react'
import { iniciarSesionAdmin } from '../../logic/auth'

export function FormularioLogin({ onExito }) {
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function manejarEnvio(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await iniciarSesionAdmin(correo, contraseña)
      onExito()
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="login-form" onSubmit={manejarEnvio}>
      <label>
        Correo
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          autoComplete="username"
          required
        />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p role="alert" className="login-error">{error}</p>}
      <button type="submit" disabled={enviando}>
        {enviando ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
