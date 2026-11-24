import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage, getDownloadURL } from 'firebase-admin/storage';
import fs from 'fs';
import path from 'path';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
const STORAGE_BUCKET = 'diccionario-ngigua.firebasestorage.app';

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: STORAGE_BUCKET,
});

const db = getFirestore();
const bucket = getStorage().bucket();

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');

async function subirCarpeta(carpetaLocal, carpetaStorage) {
  const mapaUrls = new Map();

  if (!fs.existsSync(carpetaLocal)) {
    console.log(`No existe la carpeta ${carpetaLocal}, se omite.`);
    return mapaUrls;
  }

  const archivos = fs.readdirSync(carpetaLocal);
  console.log(`Subiendo ${archivos.length} archivos desde ${carpetaLocal}...`);

  for (const archivo of archivos) {
    const rutaLocal = path.join(carpetaLocal, archivo);
    if (!fs.statSync(rutaLocal).isFile()) continue;

    const destino = `${carpetaStorage}/${archivo.toLowerCase()}`;
    const [file] = await bucket.upload(rutaLocal, { destination: destino });
    const url = await getDownloadURL(file);

    const nombreSinExt = path.parse(archivo).name;
    mapaUrls.set(normalizar(nombreSinExt), url);
    console.log(`  OK ${destino}`);
  }

  return mapaUrls;
}

const mapaImagenes = await subirCarpeta('./public/img', 'img');
const mapaAudios = await subirCarpeta('./public/audio', 'audio');

console.log('\nActualizando URLs en Firestore...');
const snapshot = await db.collection('palabras').get();

let batch = db.batch();
let opsEnBatch = 0;
let imgsEnlazadas = 0;
let audiosEnlazados = 0;

for (const doc of snapshot.docs) {
  const data = doc.data();
  if (!data.es) continue;

  const clave = normalizar(data.es);
  const cambios = {};

  if (mapaImagenes.has(clave)) {
    cambios.imagen = mapaImagenes.get(clave);
    imgsEnlazadas++;
  }
  if (mapaAudios.has(clave)) {
    cambios.audio = mapaAudios.get(clave);
    audiosEnlazados++;
  }

  if (Object.keys(cambios).length > 0) {
    batch.update(doc.ref, cambios);
    opsEnBatch++;

    if (opsEnBatch === 400) {
      await batch.commit();
      batch = db.batch();
      opsEnBatch = 0;
    }
  }
}

if (opsEnBatch > 0) {
  await batch.commit();
}

console.log(`\nListo: ${imgsEnlazadas} imagenes y ${audiosEnlazados} audios enlazados desde Firebase Storage.`);
