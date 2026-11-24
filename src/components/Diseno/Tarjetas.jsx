import { useNavigate } from 'react-router-dom';
import '../../styles/Tarjetas.css'
function Tarjeta({ nombre, detalle, imagen,ruta }) {
  const navigate=useNavigate()
  return (
    <div className="tarjeta">
      <img src={imagen} alt={nombre || "Imagen de tarjeta"} />

      <div className="tarjeta-contenido">
        <h2>{nombre}</h2>
        <p>{detalle}</p>
        <button onClick={()=> navigate(ruta)}>Ver más</button>
        
      </div>
    </div>
  )
}

export default Tarjeta