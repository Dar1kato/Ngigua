import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export async function verificarEsAdmin(uid) {
  const adminRef = doc(db, 'admins', uid);
  const adminSnap = await getDoc(adminRef);
  return adminSnap.exists();
}

export async function iniciarSesionAdmin(email, password) {
  let credencial;

  try {
    credencial = await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (err) {
    if (
      err.code === 'auth/invalid-credential' ||
      err.code === 'auth/user-not-found' ||
      err.code === 'auth/wrong-password' ||
      err.code === 'auth/invalid-email'
    ) {
      throw new Error('Correo o contraseña incorrectos');
    }
    throw new Error('No se pudo iniciar sesión');
  }

  try {
    const esAdmin = await verificarEsAdmin(credencial.user.uid);
    if (!esAdmin) {
      await signOut(auth);
      throw new Error('Esta cuenta no tiene permisos de administrador');
    }
    return credencial.user;
  } catch (err) {
    if (err.message === 'Esta cuenta no tiene permisos de administrador') {
      throw err;
    }
    await signOut(auth);
    throw new Error('No se pudo iniciar sesión');
  }
}

export async function cerrarSesion() {
  await signOut(auth);
}