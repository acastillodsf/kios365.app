import { CButton, CCard, CCardBody, CCol, CInput, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

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

const TurnoTouchPasaporte = ({ onCancell, onSuccess }) => {

    const [cedula, setCedula] = useState("");
    const [showKeyboard, setShowKeyboard] = useState(false);

    const handleClick = (value) => {
        if (value === "DEL") {
            setCedula(cedula.slice(0, -1));
            return;
        }
        if (value === "enter") {
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

    const onChange = (input) => {
        console.log("Input changed", input);
        setCedula(input);
    }

    const onKeyPress = (button) => {
        console.log("Button pressed", button);
        if (button === "{enter}") {
            // alert(`Cédula ingresada: ${cedula}`);
            onSuccess(cedula)
            return;
        }
        if (button === "{cancel}") {
            // alert(`Cédula ingresada: ${cedula}`);
            onCancell()
            return;
        }
    }

    return (
        // <div
        //   className="c-app c-default-layout flex-row align-items-center login-bg"
        //   style={{
        //     backgroundImage: settingApp.backgroundImage,
        //   }}
        // >
        <div className="keyboard-section"  >
            <CCol md="12">
                <CCard className="w-80 p-4 mx-auto text-center">
                    <CCardBody>
                        <CRow>

                            <CInput
                                className="form-control rounded p-2 mb-4"
                                value={cedula}
                                format="###-#######-#"
                                mask="_"
                                readOnly
                                style={{ height: 80, fontSize: 40 }}


                            />
                        </CRow>

                        <CRow style={{ color: "black" }}>
                            <Keyboard
                                layout={{
                                    default: [
                                        "1 2 3 4 5 6 7 8 9 0 {bksp}",
                                        "Q W E R T Y U I O P",
                                        "A S D F G H J K L Ñ",
                                        "Z X C V B N M",
                                        "{cancel} {enter}"
                                    ]
                                }}
                                display={{
                                    "{bksp}": "⌫",
                                    "{enter}": "✔",
                                    "{cancel}": "✖"
                                }}
                                buttonTheme={[
                                    { class: "green-button", buttons: "{enter}" },
                                    { class: "red-button", buttons: "{cancel}" },
                                    { class: "large-button", buttons: "{enter} {cancel}" },
                                    { class: "number-button", buttons: "0 1 2 3 4 5 6 7 8 9" }
                                ]}
                                onChange={onChange}
                                onKeyPress={onKeyPress}
                            />
                        </CRow>

                    </CCardBody>
                </CCard>
            </CCol>

        </div>
        // </div>
    );
}

export default TurnoTouchPasaporte;
