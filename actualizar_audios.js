import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');

const carpetaAudio = './public/audio';
const archivosReales = fs.readdirSync(carpetaAudio);
const mapaAudios = new Map();

for (const archivo of archivosReales) {
  const nombreSinExt = path.parse(archivo).name;
  mapaAudios.set(normalizar(nombreSinExt), archivo);
}

console.log(`1. Se detectaron ${mapaAudios.size} audios reales en ${carpetaAudio}.`);

const snapshot = await db.collection('palabras').get();
const batch = db.batch();
let enlazados = 0;
let sinAudio = 0;

snapshot.forEach((doc) => {
  const data = doc.data();
  if (data.es) {
    const clave = normalizar(data.es);
    const archivoEncontrado = mapaAudios.get(clave);

    if (archivoEncontrado) {
      batch.update(doc.ref, { audio: `/audio/${archivoEncontrado}` });
      enlazados++;
    } else {
      batch.update(doc.ref, { audio: '' });
      sinAudio++;
    }
  }
});

console.log(`2. Guardando cambios en Firestore...`);
await batch.commit();
console.log(`¡Éxito! ${enlazados} palabras enlazadas con audio y ${sinAudio} sin audio.`);