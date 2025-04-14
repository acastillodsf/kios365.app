import { CCol, CModal, CModalBody, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import Barcode from 'react-barcode';
const formatTurno = (letra, numero) => {
    return `${letra}${String(numero).padStart(2, "0")}`;
};


const AvisoNoRegistrado = ({ active, stuck }) => {
    return (
        <CModal show={active}
            closeOnBackdrop={false}
            centered
            size="full"
        >
            <CModalBody>
                <CModalBody style={{ textAlign: "center", fontSize: "24px", height: 300, alignContent: 'center', fontFamily: 'sans-serif' }}>
                    <CRow>
                        <CCol>
                            <Icon icon="icon-park-outline:phone-booth" width={100} color="blue" />
                            <div>
                                <span style={{ color: "blue", fontWeight: "bold", margin: 20 }}>Dispositivo no Registrado</span>
                                <br />
                                {/* <span style={{ color: "blue", fontWeight: "bold", margin: 20 }}>{stuck}</span> */}
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <Barcode
                                        value={stuck}
                                        format="CODE128"
                                        width={2}
                                        height={100}
                                        displayValue={true}
                                        background="#ffffff"
                                        lineColor="#000000"
                                    />
                                </div>
                            </div>


                        </CCol>
                    </CRow>
                </CModalBody>
            </CModalBody>
        </CModal>
    )
}

export default AvisoNoRegistrado;