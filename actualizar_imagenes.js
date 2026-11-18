import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

console.log("1. Conectando a la base de datos...");
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

console.log("2. Descargando palabras...");
const snapshot = await db.collection('palabras').get();
const batch = db.batch();
let contador = 0;

snapshot.forEach((doc) => {
  const data = doc.data();

  if (data.es) {
    // Convierte "Perro de agua" a "perro_de_agua.jpg"
    const nombreArchivo = data.es.toLowerCase().trim().replace(/\s+/g, '_') + '.jpg';
    
    // Esta es la ruta exacta que leerá tu componente Glosario.jsx
    const rutaImagen = `/img/${nombreArchivo}`;

    batch.update(doc.ref, { imagen: rutaImagen });
    contador++;
  }
});

console.log(`3. Enlazando las imágenes de public/img a ${contador} palabras...`);
await batch.commit();
console.log(`¡Éxito! Tu base de datos ya sabe en qué carpeta buscar las fotos.`);