import { CButton, CCard, CCardBody, CCol, CImg, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import clienteAxios from "src/config/axios";


function ObtenerServios() {
    return new Promise((resolve, reject) => {
        clienteAxios
            .get('/api/turnotouch/servicios')
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });
}

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







const Seleccione_Servicios = ({ servicios, onCancell, onSelect }) => {

    const [cedula, setCedula] = useState("");
    const [consultando, setConsultando] = useState(false)


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

    if (consultando) {
        return <></>
    }

    return (
        // <div
        //   className="c-app c-default-layout flex-row align-items-center login-bg"
        //   style={{
        //     backgroundImage: settingApp.backgroundImage,
        //   }}
        // >
        <section className="main-kiosco02" id="logins img">

            <div className="turno-beinvenida-section">
                <CCol >

                    <CRow>
                        <CCol style={{ color: '#FFFFFF', }}>
                            <CRow>

                                <CCol md="6" style={{ alignContent: 'center' }}>


                                    <CRow >

                                        <h2 class="elementor-button-text" style={{
                                            display: 'inline-block',
                                            color: '#FFFFFF',
                                            fontSize: '3.157rem',
                                            fontFamily: 'Manrope',
                                            fontWeight: 700,
                                            letterSpacing: -0.8,
                                            fontFamily: 'Poppins, sans-serif',
                                            // fontSize: 26,
                                            fontWeight: 'bold'
                                        }}>
                                            Donde se dirige ?
                                        </h2>

                                    </CRow>

                                </CCol>



                            </CRow>

                            <CRow id="main-servicios">
                                {
                                    servicios.map((c, indexC) => (
                                        <CCol key={indexC} md={12 / servicios.length}>

                                            {c.servicios.map((s, indexS) => (
                                                <CRow key={indexS} style={{ margin: 5 }}>
                                                    <CButton
                                                        style={{
                                                            background: "#f5f5f5",
                                                            width: "100%",
                                                            borderRadius: 40,
                                                            margin: 0,
                                                            height: 75,
                                                            fontFamily: 'Poppins, sans-serif',
                                                            fontSize: 18,
                                                            fontWeight: 'bold',
                                                            color: '#2ba9b0',
                                                        }}
                                                        onClick={() => onSelect(s.departamento, s.servicio)}
                                                    >
                                                        {s.servicio}
                                                    </CButton>
                                                </CRow>
                                            ))}
                                        </CCol>
                                    ))
                                }


                                <CCol md="12">
                                    <CRow style={{ margin: 5 }}>
                                        <CButton style={{
                                            background: '#f10205',
                                            width: '100%',
                                            margin: 0,
                                            height: 75
                                        }}
                                            onClick={onCancell}>
                                            Atras</CButton>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCol>



            </div>
        </section>
        // </div>
    );
}

export default Seleccione_Servicios;
