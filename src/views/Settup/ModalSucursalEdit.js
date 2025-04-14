import { CButton, CCol, CInput, CLabel, CModal, CModalBody, CRow } from '@coreui/react'
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const ModalSucursalEdit = ({ onSave }) => {
    const dispatch = useDispatch()
    const { show, data } = useSelector((state) => state.md.sucursal);

    const [DataEdit, setDataEdit] = useState({})

    useEffect(() => {
        setDataEdit(data)
    }, [data])

    const onChange = (e) => {
        console.log(e.target)
        setDataEdit({
            ...DataEdit,
            [e.target.name]: e.target.value
        })


    }
    return (
        <div>

            <CModal show={show} size='lg' closeOnBackdrop={false} centered>
                <CModalBody>
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
                                    <Icon icon="whh:branch"
                                        width={50}
                                        color="#65a30d"
                                        style={{ margin: 5, marginLeft: 0 }}
                                    />
                                    <h1> Datos de Sucursal </h1>
                                </CCol>

                            </CRow>
                            <hr data-v-550cf047="" class="border-separator is-full-wixdth" />

                            <CRow >

                                <CCol md={12}>
                                    <CRow>
                                        <CCol md="12">
                                            <CLabel htmlFor="company">Nombre de Sucursal </CLabel>
                                            <CInput
                                                onChange={onChange}
                                                id="nombre"
                                                name='nombre'
                                                value={DataEdit.nombre}
                                                className="mb-3"
                                            />
                                        </CCol>

                                    </CRow>
                                    <CRow>
                                        <CCol xs="12">
                                            <CLabel htmlFor="company">Direccion </CLabel>
                                            <CInput
                                                onChange={onChange}
                                                id="descripcion"
                                                name='descripcion'
                                                value={DataEdit.descripcion}
                                                className="mb-3"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>

                                        <CCol xs="6">
                                            <CLabel htmlFor="company">Telefono </CLabel>
                                            <CInput
                                                onChange={onChange}
                                                id="telefono"
                                                name='telefono'
                                                value={DataEdit.telefono}
                                                className="mb-3"
                                            />
                                        </CCol>
                                        <CCol xs="6">
                                            <CLabel htmlFor="company">Correo </CLabel>
                                            <CInput
                                                onChange={onChange}
                                                id="tramite"
                                                value={DataEdit.correo}
                                                className="mb-3"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12">
                                            <CLabel htmlFor="company">Direccion </CLabel>
                                            <CInput
                                                onChange={onChange}
                                                id="tramite"
                                                name='direccion'
                                                value={DataEdit.direccion}
                                                className="mb-3"
                                            />
                                        </CCol>
                                    </CRow>


                                </CCol>

                            </CRow>
                            <CRow>
                                <CCol
                                    style={{
                                        display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon icon="whh:branch"
                                        width={30}
                                        color="#65a30d"
                                        style={{ margin: 5, marginLeft: 0 }}
                                    />
                                    <h2> Departamentos </h2>
                                </CCol>
                                <CCol style={{ textAlign: "end" }}>
                                    <CButton
                                        type="submit"
                                        color="primary"
                                        onClick={() => {
                                            const seleccion = data.departamentos;

                                            seleccion.push({
                                                departamento: 'Nuevo Departamento ',
                                                departamentoedit: ''

                                            })

                                            onChange({

                                                target: {
                                                    name: 'departamentos',
                                                    value: seleccion
                                                }


                                            })
                                        }}
                                        style={{ width: 300, height: 45, margin: 3 }}
                                    >
                                        <Icon icon="tdesign:add" width={25} />
                                        Adicional Nuevo Departamento
                                    </CButton>

                                </CCol>

                            </CRow>

                            <CRow style={{ minHeight: 300 }}>
                                <CCol>
                                    <table className="table table-hover table-outline mb-0 d-none d-sm-table" >
                                        <thead className="thead-light">
                                            <tr>
                                                <th>
                                                    ID
                                                </th>
                                                <th>Nombre del Departamento</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {DataEdit.departamentos && DataEdit.departamentos.map((row, insrow) => {
                                                return (
                                                    <tr  >
                                                        <td>{insrow}</td>
                                                        <td  >
                                                            <div>
                                                                <CInput
                                                                    value={row.departamento}
                                                                    name='departamento'
                                                                    onChange={(e) => {
                                                                        const seleccion = [];

                                                                        data.departamentos.map((d, indedit) => {
                                                                            if (indedit === insrow) {
                                                                                seleccion.push({
                                                                                    ...row,
                                                                                    departamento: e.target.value
                                                                                })
                                                                            } else {
                                                                                seleccion.push(d)
                                                                            }
                                                                        })
                                                                        console.log(seleccion)
                                                                        onChange({

                                                                            target: {
                                                                                name: 'departamentos',
                                                                                value: seleccion
                                                                            }


                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>


                                                        <td>{row.departamentoedit}</td>

                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <CButton
                                        // color=""
                                        style={{
                                            width: 200,
                                            height: 80,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 10, // Espacio entre el icono y el texto
                                            // color : 'white',
                                            background: '#d6d8db'
                                        }}
                                        onClick={() => onSave(DataEdit)}
                                    >
                                        <Icon icon="bi:save" width={50} />
                                        <span style={{ flex: 1, textAlign: 'center', fontSize: 20 }}>Salvar</span>
                                    </CButton>
                                </CCol>
                                <CCol style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <CButton
                                        // color="primary"
                                        style={{
                                            width: 200,
                                            height: 80,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 10, // Espacio entre el icono y el texto
                                            // color : 'white',
                                            background: '#d6d8db'
                                        }}
                                        onClick={() => dispatch({
                                            type: 'SUCURSAL_CLOSED'
                                        })}
                                    >
                                        <Icon icon="garden:exit-stroke-16" width={50} />
                                        <span style={{ flex: 1, textAlign: 'center', fontSize: 20 }}>Salir</span>
                                    </CButton>
                                </CCol>


                            </CRow>
                        </CCol>
                    </CRow>
                </CModalBody >
            </CModal >
        </div>
    )
}
