import { CButton, CCol, CModal, CModalBody, CModalFooter, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import { coopSettings } from "src/config/coop.config";

const formatTurno = (letra, numero) => {
    return `${letra}${String(numero).padStart(2, "0")}`;
};

const AvisoConexion = ({ active }) => {

    return (
        <CModal show={active}
            closeOnBackdrop={false}
            centered
        // size="xl"
        >
            <CModalBody>
                <CModalBody style={{ textAlign: "center", fontSize: "24px", fontFamily: 'sans-serif' }}>
                    <CRow>
                        <CCol>
                            <Icon icon="nrk:offline" width={80} color="blue" />
                            <span style={{ color: "blue", fontWeight: "bold", margin: 20 }}>Conexion perdida.</span>
                        </CCol>


                    </CRow>
                    <CRow>
                        <CCol>
                            <span style={{ color: "blue", fontWeight: "bold", margin: 10, fontSize: 12 }}>Espere un momento mientras se establece la conexion. </span>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <span style={{ color: "blue", fontWeight: "bold", margin: 10, fontSize: 12 }}>--- O ---</span>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CButton onClick={() => window.location.reload()}>
                                🔄 Re-Intentar
                            </CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    {coopSettings.baseURL}
                </CModalFooter>
            </CModalBody>
        </CModal >
    )
}

export default AvisoConexion;