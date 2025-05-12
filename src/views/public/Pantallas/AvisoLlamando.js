import { CCol, CModal, CModalBody, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import Barcode from 'react-barcode';
import TurnosTable from "./Turnos";
import { useEffect } from "react";
const formatTurno = (letra, numero) => {
    return `${letra}${String(numero).padStart(2, "0")}`;
};


const AvisoLlamando = ({ llamado }) => {




    return (
        <CModal show={llamado.show}
            closeOnBackdrop={false}
            className="modal-custom-right"
            centered
            size="lg"
        >
            <CModalBody>
                <CModalBody style={{ textAlign: "center", fontSize: "24px", fontFamily: 'sans-serif' }}>
                    <TurnosTable turnos={[{
                        ...llamado
                    }]} />
                </CModalBody>
            </CModalBody>
        </CModal>
    )
}

export default AvisoLlamando;