import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Normaliza texto: minúsculas, sin acentos y espacios por guiones bajos
const normalizar = (texto) =>
  texto
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');

// Lee los archivos reales que existen en public/img
const carpetaImg = './public/img';
const archivosReales = fs.readdirSync(carpetaImg);
const mapaImagenes = new Map();

for (const archivo of archivosReales) {
  const nombreSinExt = path.parse(archivo).name;
  mapaImagenes.set(normalizar(nombreSinExt), archivo);
}

console.log(`1. Se detectaron ${mapaImagenes.size} imágenes reales en ${carpetaImg}.`);

const snapshot = await db.collection('palabras').get();
const batch = db.batch();
let enlazadas = 0;
let sinImagen = 0;

snapshot.forEach((doc) => {
  const data = doc.data();
  if (data.es) {
    const clave = normalizar(data.es);
    const archivoEncontrado = mapaImagenes.get(clave);

    if (archivoEncontrado) {
      batch.update(doc.ref, { imagen: `/img/${archivoEncontrado}` });
      enlazadas++;
    } else {
      batch.update(doc.ref, { imagen: '' });
      sinImagen++;
    }
  }
});

console.log(`2. Guardando cambios en Firestore...`);
await batch.commit();
console.log(`¡Éxito! ${enlazadas} palabras enlazadas con su extensión real y ${sinImagen} marcadas sin imagen.`);