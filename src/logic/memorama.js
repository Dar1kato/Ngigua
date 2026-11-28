// Fisher-Yates
export function shuffle(array, n = array.length) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  const cantidad = Math.max(0, Math.min(Math.floor(n), array.length));
  return array.slice(0, cantidad);
}

export function crearTarjetasMemorama(palabras = [], cantidad = 5) {
  const disponibles = palabras.filter(
    (palabra) =>
      typeof palabra?.es === 'string' &&
      palabra.es.trim() &&
      typeof palabra.ng === 'string' &&
      palabra.ng.trim() &&
      typeof palabra.imagen === 'string' &&
      palabra.imagen.trim()
  )
  const seleccionadas = shuffle([...disponibles], cantidad)
  const tarjetas = seleccionadas.flatMap((palabra, index) => {
    const parejaId = String(palabra.docId ?? palabra.id ?? index)
    const datosComunes = {
      parejaId,
      palabra: palabra.es,
      ng: palabra.ng,
      emparejada: false,
      volteada: false,
    }

    return [
      { ...datosComunes, id: `${index}-texto`, tipo: 'texto' },
      {
        ...datosComunes,
        id: `${index}-imagen`,
        tipo: 'img',
        imagen: palabra.imagen,
      },
    ]
  })

  return shuffle(tarjetas)
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
  return (
    tarjeta1.id !== tarjeta2.id &&
    tarjeta1.parejaId !== undefined &&
    tarjeta1.parejaId === tarjeta2.parejaId
  )
}

export function checkVictoria() {

}