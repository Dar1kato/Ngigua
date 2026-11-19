import '../../public/img/Abrazar.jpg'

// Fisher-Yates
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function girarTarjeta(tarjeta) {
  if (tarjeta.emparejada) return tarjeta
  
  return {...tarjeta, volteada: tarjeta.volteada ? false : true}
 
}

export function emparejarTarjetas(tarjetas, tarjeta1, tarjeta2) {
  return tarjetas.map((tarjeta) => {
    return tarjeta.id === tarjeta1.id || tarjeta.id === tarjeta2.id
      ? {...tarjeta, emparejada: true, volteada: true}
      : tarjeta
  })
}

export function resetTarjetas(tarjetas) {
  return tarjetas.map((tarjeta) => {
    if (tarjeta.emparejada) return tarjeta

    return {...tarjeta, volteada: false}
  })
}

export function updateTarjetas(tarjetas, nuevaTarjeta) {
  return tarjetas.map((tarjeta) => {
    return tarjeta.id === nuevaTarjeta.id ? nuevaTarjeta : tarjeta
  })
}

export function isPreja(tarjeta1, tarjeta2) {
  return tarjeta1.id !== tarjeta2.id && tarjeta1.palabra === tarjeta2.palabra
}

export function checkVictoria() {

}