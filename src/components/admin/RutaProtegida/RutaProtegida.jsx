import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { escucharAdmin } from '../../../logic/auth'

export function RutaProtegida({ children }) {
    const [admin, setAdmin] = useState(undefined) // undefined = verificando

    useEffect(() => escucharAdmin(setAdmin), [])

    if (admin === undefined) return <p>Verificando sesión...</p>

    if (!admin) return <Navigate to="/login" replace />
    
    return children
}