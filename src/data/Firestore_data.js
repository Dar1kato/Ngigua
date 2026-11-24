import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const NOMBRE_COLECCION = "palabras";

export async function cargarElementos() {
  const snap = await getDocs(
    query(
      collection(db, NOMBRE_COLECCION),
      orderBy("id", "asc")
    )
  );

  return snap.docs.map((d) => {
    const palabra = d.data()

    return {
      ...palabra,
      docId: d.id,
      es: palabra.es ?? palabra.español,
      ng: palabra.ng ?? palabra.ngigua,
    }
  })
}