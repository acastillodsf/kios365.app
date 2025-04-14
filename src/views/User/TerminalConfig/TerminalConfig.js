import { CButton, CCol, CLabel, CModal, CModalBody, CRow, CSelect } from '@coreui/react'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const TerminalConfig = ({ ws }) => {
    const dispatch = useDispatch()
    const { show, sucursal, departamento, puesto, params } = useSelector((state) => state.ws.terminal);



    const [DataForm, setDataForm] = useState({
        sucursal: 0,
        departamento: '--Seleccione--',
        puesto: '--Seleccione--'
    })

    const handleChange = (e) => { setDataForm({ ...DataForm, [e.target.name]: e.target.value }) };


    useEffect(() => {
        if (show) {
            setDataForm({
                sucursal: sucursal,
                departamento: departamento,
                puesto: puesto
            })
        }
    }, [show])


    const ListPuesto = params.puesto ? params.puesto.filter((r) => r.departamento === DataForm.departamento) : []



    const update_terminal = (data) => {

        ws.send(JSON.stringify({ type: "TERMINAL_UPDATE", data }));

    };


    return (
        <>
            <CCol
                style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <CButton onClick={() => dispatch({ type: 'EDIT->TERMINAL' })} >
                    <Icon icon="fluent-emoji-high-contrast:department-store"
                        width={35}
                        color="#65a30d"
                        style={{ margin: 3, marginLeft: 0 }}
                    />
                </CButton>


                <CRow style={{ marginLeft: 25, marginRight: 25 }}>

                    <h3>{departamento}</h3>

                </CRow>
                <Icon icon="pepicons-pop:monitor"
                    width={35}
                    color="#65a30d"
                    style={{ margin: 3, marginLeft: 0 }}
                />
                <CRow style={{ marginLeft: 25, marginRight: 25 }}>

                    <h3> {puesto}</h3>

                </CRow>

            </CCol>

            <CModal show={show}
                color="success"
                closeOnBackdrop={false}
                centered
            >

                <CModalBody>
                    <CRow>
                        <CCol
                            style={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Icon icon="ep:position"
                                width={50}
                                color="#65a30d"
                                style={{ margin: 5, marginLeft: 0 }}
                            />
                            <h1> Asignacion de Puesto </h1>
                        </CCol>
                    </CRow>

                    <hr data-v-550cf047="" class="border-separator is-full-width" />
                    <CRow>
                        <CCol xs="6">
                            <CLabel htmlFor="company">Departamento</CLabel>
                            <CSelect
                                className="mb-3"
                                name="departamento"
                                aria-label="Large select example"
                                value={DataForm.departamento}
                                onChange={handleChange}

                            >
                                <option value="" key={0}>
                                    "--Seleccione--"
                                </option>
                                {params.departamento && params.departamento.map((row, index) => (
                                    <option value={row.departamento} key={index}>
                                        {" "}
                                        {row.departamento}{" "}
                                    </option>
                                ))}
                            </CSelect>
                        </CCol>
                        <CCol xs="6">
                            <CLabel htmlFor="company">Puesto</CLabel>
                            <CSelect
                                className="mb-3"
                                name="puesto"
                                aria-label="Large select example"
                                value={DataForm.puesto}
                                onChange={handleChange}

                            >
                                <option value="" key={0}>
                                    "--Seleccione--"
                                </option>
                                {ListPuesto.map((row, index) => (
                                    <option value={row.puesto} key={index}>
                                        {" "}
                                        {row.puesto}{" "}
                                    </option>
                                ))}
                            </CSelect>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol>
                            <CButton
                                color="primary"
                                disabled={DataForm.puesto === "" || DataForm.departamento === ""}
                                onClick={() => {
                                    update_terminal(DataForm)
                                }}
                                style={{ width: "33%", height: 45 }}
                            >
                                <Icon icon="fa-regular:save" width={25} />
                                Salvar
                            </CButton>
                        </CCol>
                    </CRow>

                </CModalBody>

            </CModal>
        </>
    )
}
