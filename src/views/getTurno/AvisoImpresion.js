import { CModal, CModalBody } from "@coreui/react";

const formatTurno = (letra, numero) => {
    return `${letra}${String(numero).padStart(2, "0")}`;
};

const AvisoImpresion = ({ data }) => {
    console.log(data)
    return (
        <CModal show={data.active}
            closeOnBackdrop={false}
            centered
        // size="xl"
        >
            <CModalBody>
                <CModalBody style={{ textAlign: "center", fontSize: "24px", fontFamily: 'sans-serif' }}>
                    <strong>🖨 Imprimiendo su turno</strong>
                    <br />
                    <span style={{ fontSize: "54px", color: "blue", fontWeight: "bold" }}>{formatTurno(data.alfa, data.secuencia)}</span>
                    <br />
                    <span>{data.departamento}</span>
                    <br />
                    <span>{data.servicio}</span>
                </CModalBody>
            </CModalBody>
        </CModal>
    )
}

export default AvisoImpresion;