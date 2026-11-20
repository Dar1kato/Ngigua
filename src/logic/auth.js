import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

async function esAdmin(uid) {
  const snap = await getDoc(doc(db, 'admins', uid))
  return snap.exists()
}

export async function iniciarSesion(correo, contraseña) {
  const { user } = await signInWithEmailAndPassword(auth, correo, contraseña)
  if (!(await esAdmin(user.uid))) {
    await signOut(auth)
    throw new Error('sin-permisos')
  }
  return user
}

export function cerrarSesion() {
  return signOut(auth)
}

// Avisa cuando cambia la sesión; devuelve la función para dejar de escuchar
export function escucharAdmin(callback) {
  return onAuthStateChanged(auth, async (user) => {
    callback(user && (await esAdmin(user.uid)) ? user : null)
  })
}