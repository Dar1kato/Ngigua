import { useState } from "react";
import data from '../../data/data.json'

export function Glosario() {

    return (
        <table>
            <thead>
                <tr>
                    <th>Ngigua</th>
                    <th>Español</th>
                    <th>Significado</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([id, contenido]) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{contenido.traduccion}</td>
                    <td>{contenido.significado}</td>
                  </tr>
                ))}
            </tbody>
        </table>
    )
}