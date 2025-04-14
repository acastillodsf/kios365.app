import { CCol, CModal, CModalBody, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import Barcode from 'react-barcode';
const formatTurno = (letra, numero) => {
    return `${letra}${String(numero).padStart(2, "0")}`;
};


const AvisoLlamando = ({ active, turno }) => {
    return (
        <CModal show={active}
            closeOnBackdrop={false}
            centered
        // size="xl"
        >
            <CModalBody>
                <CModalBody style={{ textAlign: "center", fontSize: "24px", fontFamily: 'sans-serif' }}>
                    <strong><Icon icon="famicons:ticket" /> Llamando a {turno.puesto}</strong>
                    <br />
                    <span style={{ fontSize: "54px", color: "blue", fontWeight: "bold" }}>{formatTurno(turno.alfa, turno.secuencia)}</span>
                    <br />
                    <br />
                    <span>{turno.servicio}</span>
                </CModalBody>
            </CModalBody>
        </CModal>
    )
}

export default AvisoLlamando;