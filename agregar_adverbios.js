import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const adverbiosSnap = await db.collection('adverbio').get();
const palabrasSnap = await db.collection('palabras').get();

const existentes = new Set(
  palabrasSnap.docs.map((d) => d.data().es?.toLowerCase().trim())
);

const batch = db.batch();
let agregados = 0;

adverbiosSnap.forEach((doc) => {
  const data = doc.data();
  const clave = data.es?.toLowerCase().trim();
  if (clave && !existentes.has(clave)) {
    const nuevoDoc = db.collection('palabras').doc();
    batch.set(nuevoDoc, data);
    existentes.add(clave);
    agregados++;
  }
});

await batch.commit();
console.log(`Se agregaron ${agregados} adverbios nuevos a la colección palabras.`);