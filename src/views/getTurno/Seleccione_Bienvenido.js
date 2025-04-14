import { CButton, CCard, CCardBody, CCol, CImg, CModal, CModalBody, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { TurnoTocuhCabecera } from "./TurnoTocuh/TurnoTocuhCabecera";


const Boton = ({ value, handleClick, ...res }) => {

    return (<CCol style={{
        padding: 2
    }} {...res}><CButton
        onClick={() => handleClick(value)}
        className="text-xl p-4"
        style={{
            background: value === "ENTER" ? '#63b100' : '#f5f5f5',
            width: '100%',
            margin: 0,
            height: 75
        }}
    > {
                value === "DEL" ? <Icon icon="mynaui:delete" width={25} /> : value
            }


        </CButton>
    </CCol>)
}

const TurnoTouchBienvenida = ({ onCancell, onSelect }) => {

    const [cedula, setCedula] = useState("");

    const handleClick = (value) => {
        if (value === "DEL") {
            setCedula(cedula.slice(0, -1));
            return;
        }
        if (value === "ENTER") {
            alert(`Cédula ingresada: ${cedula}`);
            return;
        }

        if (value === "CANCELAR") {
            onCancell();
            return;
        }
        if (cedula.length < 13) {
            let newCedula = cedula.replace(/-/g, "") + value;
            if (newCedula.length > 11) return;
            if (newCedula.length === 3 || newCedula.length === 10) {
                newCedula += "-";
            }
            setCedula(newCedula);
        }
    };

    return (
        // <div
        //   className="c-app c-default-layout flex-row align-items-center login-bg"
        //   style={{
        //     backgroundImage: settingApp.backgroundImage,
        //   }}
        // >
        <>
            <section className="main-kiosco01" id="logins">
                <CRow style={{
                    position: 'absolute',
                    bottom: 130,  // Se mantiene a 30px desde la parte inferior
                    left: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40%',
                    fontFamily: 'Poppins, sans-serif',
                    background: 'red'
                }}>
                    <CButton style={{
                        background: 'white',
                        fontWeight: 'bold',
                        color: '#2ba9b0',
                        width: '100%',
                        fontSize: 26,
                        margin: 0,
                        height: 75
                    }}
                        onClick={onSelect}>
                        Tomar Turno</CButton>
                </CRow>

            </section>

        </>
    );
}

export default TurnoTouchBienvenida;
