


const TurnosTable = ({ turnos, llamado }) => {

    console.log(llamado)
    return (
        <div className="turnos-container">
            <table className="turnos-table">
                <thead>
                    <tr>
                        <th>TICKET</th>
                        <th>PUESTO</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.slice().reverse().slice(0, 5).map((turno, index) => (
                        <tr key={index} className={llamado && turno.horafecha === llamado.horafecha ? "opaco cargando" : ""} >
                            <td>{turno.ticket}</td>
                            <td>{turno.puesto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TurnosTable;