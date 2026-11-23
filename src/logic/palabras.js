import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';

const coleccionPalabras = collection(db, 'palabras');

export async function obtenerPalabras() {
  const snapshot = await getDocs(coleccionPalabras);
  return snapshot.docs.map((d) => ({
    docId: d.id,
    ...d.data(),
  }));
}

export async function agregarPalabra(palabra) {
  const nueva = {
    ng: palabra.ng.trim(),
    es: palabra.es.trim(),
    categoria: palabra.categoria.trim().toLowerCase(),
    imagen: palabra.imagen.trim(),
    audio: palabra.audio.trim(),
  };
  const docRef = await addDoc(coleccionPalabras, nueva);
  return { docId: docRef.id, ...nueva };
}

export async function editarPalabra(docId, palabra) {
  const actualizada = {
    ng: palabra.ng.trim(),
    es: palabra.es.trim(),
    categoria: palabra.categoria.trim().toLowerCase(),
    imagen: palabra.imagen.trim(),
    audio: palabra.audio.trim(),
  };
  await updateDoc(doc(db, 'palabras', docId), actualizada);
  return { docId, ...actualizada };
}

export async function eliminarPalabra(docId) {
  await deleteDoc(doc(db, 'palabras', docId));
}