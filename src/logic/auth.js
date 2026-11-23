import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export async function verificarEsAdmin(uid) {
  const adminSnap = await getDoc(doc(db, 'admins', uid))
  return adminSnap.exists()
}

export async function iniciarSesionAdmin(email, password) {
  let credencial

  try {
    credencial = await signInWithEmailAndPassword(auth, email.trim(), password)
  } catch (err) {
    if (
      err.code === 'auth/invalid-credential' ||
      err.code === 'auth/user-not-found' ||
      err.code === 'auth/wrong-password' ||
      err.code === 'auth/invalid-email'
    ) {
      throw new Error('Correo o contraseña incorrectos', { cause: err })
    }
    throw new Error('No se pudo iniciar sesión', { cause: err })
  }

  try {
    const esAdmin = await verificarEsAdmin(credencial.user.uid)
    if (!esAdmin) {
      await signOut(auth)
      throw new Error('Esta cuenta no tiene permisos de administrador')
    }
    return credencial.user
  } catch (err) {
    if (err.message === 'Esta cuenta no tiene permisos de administrador') {
      throw err
    }
    await signOut(auth)
    throw new Error('No se pudo iniciar sesión', { cause: err })
  }
}

export async function cerrarSesion() {
  await signOut(auth)
}

// Avisa cuando cambia la sesión (usuario admin o null); la usa RutaProtegida.
// Devuelve la función para dejar de escuchar.
export function escucharAdmin(callback) {
  return onAuthStateChanged(auth, async (user) => {
    try {
      callback(user && (await verificarEsAdmin(user.uid)) ? user : null)
    } catch {
      callback(null)
    }
  })
}
