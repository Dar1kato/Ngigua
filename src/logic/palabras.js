import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase'

// La lectura de palabras vive en data/Firestore_data.js (cargarElementos).
// Aquí solo están las operaciones del admin: agregar, editar y eliminar.

const NOMBRE_COLECCION = 'palabras'
const coleccionPalabras = collection(db, NOMBRE_COLECCION)

function limpiar(palabra) {
  return {
    ng: palabra.ng.trim(),
    es: palabra.es.trim(),
    categoria: palabra.categoria.trim().toLowerCase(),
    imagen: palabra.imagen.trim(),
    audio: palabra.audio.trim(),
  }
}

// cargarElementos() ordena por el campo "id": un documento sin ese campo
// no aparecería en el glosario ni en el traductor. Por eso toda palabra
// nueva recibe el siguiente id (mismo formato que los que ya existen).
async function siguienteId() {
  const snap = await getDocs(coleccionPalabras)
  const ids = snap.docs
    .map((d) => d.data().id)
    .filter((id) => id !== undefined && id !== null)

  const maximo = Math.max(0, ...ids.map(Number).filter(Number.isFinite))
  const siguiente = maximo + 1

  if (typeof ids[0] === 'number') return siguiente
  return String(siguiente).padStart(String(ids[0] ?? '0000').length, '0')
}

export async function agregarPalabra(palabra) {
  const nueva = { id: await siguienteId(), ...limpiar(palabra) }
  const docRef = await addDoc(coleccionPalabras, nueva)
  return { docId: docRef.id, ...nueva }
}

export async function editarPalabra(docId, palabra) {
  const actualizada = limpiar(palabra)
  await updateDoc(doc(db, NOMBRE_COLECCION, docId), actualizada)
  return { docId, ...actualizada }
}

export async function eliminarPalabra(docId) {
  await deleteDoc(doc(db, NOMBRE_COLECCION, docId))
}
