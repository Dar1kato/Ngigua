const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function agregarRutasImagenes() {
  const snapshot = await db.collection('palabras').get();
  const batch = db.batch();
  let contador = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    
    if (data.es) {
      // Convierte "Perro " a "perro.jpg"
      const nombreArchivo = data.es.toLowerCase().replace(/\s+/g, '_') + '.jpg';
      const rutaImagen = `/img/${nombreArchivo}`;
      
      // Actualiza el documento agregando el campo "imagen"
      batch.update(doc.ref, { imagen: rutaImagen });
      contador++;
    }
  });

  await batch.commit();
  console.log(`¡Éxito! Se agregaron las rutas de imagen a ${contador} palabras en Firestore.`);
}

agregarRutasImagenes().catch(console.error);