

// Traduce de Español (item.es) -> Ngigua (item.ng)
export function getTraduccionNgigua(palabra, palabras = []) {
  const busqueda = palabra.trim().toLowerCase();
  if (!busqueda) return "";

  const encontrado = palabras.find(
    (item) => item.es?.toLowerCase() === busqueda
  );

  return encontrado ? encontrado.ng : "No encontrado";
}

// Traduce de Ngigua (item.ng) -> Español (item.es)
export function getTraduccionEspañol(palabra, palabras = []) {
  const busqueda = palabra.trim().toLowerCase();
  if (!busqueda) return "";

  const encontrado = palabras.find(
    (item) => item.ng?.toLowerCase() === busqueda
  );

  return encontrado ? encontrado.es : "No encontrado";
}