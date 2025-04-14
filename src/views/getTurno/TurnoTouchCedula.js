import { CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import NumberFormat from "react-number-format";

function validarCedula(cedula) {
    if (!/^\d{11}$/.test(cedula)) {
        return false;
    }

    let c = cedula.split('').map(Number);
    let v = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    let result = 0;

    for (let i = 0; i < 10; i++) {
        let producto = c[i] * v[i];
        let sumaDigitos = producto >= 10
            ? producto.toString().split('').reduce((sum, num) => sum + parseInt(num), 0)
            : producto;
        result += sumaDigitos;
    }

    let proximoMultiplo = Math.ceil(result / 10) * 10;
    let digitoVerificador = proximoMultiplo - result;

    return c[10] === digitoVerificador ? true : false;
}


const Boton = ({ value, handleClick, disabled = false, ...res }) => {

    return (<CCol style={{
        padding: 2
    }} {...res}><CButton
        onClick={() => handleClick(value)}
        className="text-xl p-4"
        // disabled={disabled === undefined || true}
        disabled={disabled}
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

const TurnoTouchCedula = ({ onCancell, onSuccess }) => {

    const [cedula, setCedula] = useState("");

    const handleClick = (value) => {
        if (value === "DEL") {
            setCedula(cedula.slice(0, -1));
            return;
        }
        if (value === "ENTER") {
            // alert(`Cédula ingresada: ${cedula}`);
            onSuccess(cedula)
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

        <div
            className="turno-section"
        >
            <CCol md="8">
                <CCard className="w-80 p-4 mx-auto text-center">
                    <CCardBody>
                        <CRow>

                            <NumberFormat
                                className="form-control rounded p-2 mb-4"
                                value={cedula}
                                format="###-#######-#"
                                mask="_"
                                readOnly
                                style={{ height: 80, fontSize: 40 }}


                            />
                        </CRow>

                        <CRow>
                            <Boton value={1} handleClick={handleClick} />
                            <Boton value={2} handleClick={handleClick} />
                            <Boton value={3} handleClick={handleClick} />
                        </CRow>
                        <CRow>
                            <Boton value={4} handleClick={handleClick} />
                            <Boton value={5} handleClick={handleClick} />
                            <Boton value={6} handleClick={handleClick} />
                        </CRow>
                        <CRow>
                            <Boton value={7} handleClick={handleClick} />
                            <Boton value={8} handleClick={handleClick} />
                            <Boton value={9} handleClick={handleClick} />
                        </CRow>
                        <CRow>
                            <Boton md="8" value={0} handleClick={handleClick} />
                            <Boton md="4" value={"DEL"} handleClick={handleClick} />
                        </CRow>

                        <CRow>
                            <Boton md="12" value={"ENTER"} handleClick={handleClick} disabled={!validarCedula(cedula)} />

                        </CRow>

                        <CRow style={{ paddingTop: 30 }}>
                            <Boton md="12" value={"CANCELAR"} handleClick={handleClick} />

                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

        </div>
        // </div>
    );
}

export default TurnoTouchCedula;
