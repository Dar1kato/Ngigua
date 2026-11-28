import { JuegoAhorcado } from "../components/Juegos/Ahorcado/JuegoAhorcado";

export default function Ahorcado({ palabras = [], cargando = false }) {
    return (
        <main>
            {cargando ? (
                <p role="status">Cargando vocabulario...</p>
            ) : (
                <JuegoAhorcado palabras={palabras}/>
            )}
        </main>
    )
}