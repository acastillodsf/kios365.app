import { CButton, CCard, CCardBody, CCol, CImg, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";


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

const Seleccione_TipoDocumento = ({ opciones = [], onCancell, onSelect, children }) => {

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

    useEffect(() => {
        if (opciones.length !== 0) {
            setCedula(opciones[0].nombre)

        }
    }, [])

    return (
        // <div
        //   className="c-app c-default-layout flex-row align-items-center login-bg"
        //   style={{
        //     backgroundImage: settingApp.backgroundImage,
        //   }}
        // >
        <section className="main-kiosco02" id="logins img">
            <div className="turno-beinvenida-section">
                <CCol style={{ color: '#FFFFFF', }}>
                    <CRow>


                        <CCol md="12">
                            <CRow>
                                {
                                    opciones.map(r => {
                                        return <CCol >
                                            <CButton style={{
                                                background: '#f5f5f5',
                                                width: '100%',
                                                margin: 0,
                                                height: 75
                                            }}
                                                onClick={() => onSelect(r.nombre)}>
                                                {r.nombre}</CButton>
                                        </CCol>
                                    })
                                }

                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol style={{ display: 'flex', alignContent: 'center', paddingTop: 100 }}>
                            {children}
                        </CCol>

                    </CRow>
                </CCol>

            </div>
        </section>
        // </div>
    );
}

export default Seleccione_TipoDocumento;
