import { CBreadcrumbRouter, CButton, CCol, CInput, CLabel, CRow } from '@coreui/react';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import routes from 'src/routes';
import swal from "sweetalert";

export const SettupEmpresa = ({ ws }) => {
    const empresa = useSelector((state) => state.ws.empresa);
    const [DataForm, setDataForm] = useState({})

    useEffect(() => {
        setDataForm(empresa)
    }, [empresa])
    useEffect(() => {
        ws.send(JSON.stringify({ type: "SETTING" }));

    }, [])


    const SalvarSolicitud = () => {

    }
    const CancelarSolicitud = () => {

    }
    return (
        <CRow
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CCol md={11}>
                <CRow>
                    <CCol
                        style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Icon icon="ion:ticket"
                            width={50}
                            color="#65a30d"
                            style={{ margin: 5, marginLeft: 0 }}
                        />
                        <h1> Datos de Empresa </h1>
                    </CCol>
                    <CCol style={{ textAlign: "end" }}>
                        <CButton
                            type="submit"
                            color="primary"
                            onClick={() => {
                                SalvarSolicitud()
                            }}
                            style={{ width: "33%", height: 45 }}
                        >
                            <Icon icon="fa-regular:save" width={25} />
                            Salvar
                        </CButton>{" "}
                        <CButton
                            style={{ width: "33%", height: 45 }}
                            color="secondary"
                            onClick={() => {
                                swal({
                                    title: "Cancelar Solicitud Actual",
                                    text: `Estas seguro de que Cancelar Solicitud Actual? `,
                                    icon: "warning",
                                    buttons: ["No", "Si"],
                                }).then((respuesta) => {
                                    CancelarSolicitud();
                                });
                            }}
                        >
                            <Icon icon="game-icons:cancel" width={25} />
                            Cancelar
                        </CButton>
                    </CCol>

                </CRow>

                <CBreadcrumbRouter routes={routes} />
                <CRow>
                    <CCol>
                        <CRow>
                            <CCol xs="3">
                                <CLabel htmlFor="company">RNC </CLabel>
                                <CInput
                                    id="turno"
                                    value={DataForm.rnc}
                                    className="mb-3"
                                />
                            </CCol>
                            <CCol xs="7">
                                <CLabel htmlFor="company">Nombre </CLabel>
                                <CInput
                                    id="tramite"
                                    value={DataForm.nombre}
                                    className="mb-3"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="10">
                                <CLabel htmlFor="company">Lema </CLabel>
                                <CInput
                                    id="tramite"
                                    value={DataForm.descripcion}
                                    className="mb-3"
                                />
                            </CCol>
                        </CRow>
                        <CRow>

                            <CCol xs="5">
                                <CLabel htmlFor="company">Telefono </CLabel>
                                <CInput
                                    id="tramite"
                                    value={DataForm.telefono}
                                    className="mb-3"
                                />
                            </CCol>
                            <CCol xs="5">
                                <CLabel htmlFor="company">Correo </CLabel>
                                <CInput
                                    id="tramite"
                                    value={DataForm.correo}
                                    className="mb-3"
                                />
                            </CCol>
                        </CRow>
                        <CRow>

                            <CCol xs="10">
                                <CLabel htmlFor="company">Direccion </CLabel>
                                <CInput
                                    id="tramite"
                                    value={DataForm.direccion}
                                    className="mb-3"
                                />
                            </CCol>
                        </CRow>


                    </CCol>
                    <CCol md="3"  >
                        <>Logo Aqui</>
                    </CCol>

                </CRow>

            </CCol>
        </CRow>

    )
}


export default SettupEmpresa;
