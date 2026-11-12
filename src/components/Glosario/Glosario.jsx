

export function Glosario({palabras = []}) {

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
               {palabras.map((item) => (
          <tr key={item.docId || item.id}>
            <td>{item.id}</td>
            <td>{item.ng}</td>
            <td>{item.es}</td>
            <td>{item.categoria}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}