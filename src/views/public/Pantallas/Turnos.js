const TurnosTable = ({ turnos }) => {
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
                    {turnos.map((turno, index) => (
                        <tr key={index}>
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