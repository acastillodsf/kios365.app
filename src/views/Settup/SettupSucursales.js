import { CBreadcrumbRouter, CButton, CCol, CInput, CLabel, CPagination, CRow } from '@coreui/react';
import { Icon } from '@iconify/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import routes from 'src/routes';
import swal from "sweetalert";
import { ModalSucursalEdit } from './ModalSucursalEdit';

export const SettupSucursales = ({ ws }) => {
    const dispatch = useDispatch();
    const { show } = useSelector((state) => state.md.sucursal);

    const { sucursales } = useSelector((state) => state.ws.empresa);
    const [DataForm, setDataForm] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentEstado, setCurrentEstado] = useState('Todos')
    const [rowsPerPage, setRowsPerPage] = useState(10)



    useEffect(() => {
        setDataForm(sucursales)
    }, [sucursales])
    useEffect(() => {
        ws.send(JSON.stringify({ type: "SETTING" }));

    }, [show])


    const filter = (value, lsocio) => {
        return lsocio.filter((item) => {
            const startsWith =
                item.nombre.toLowerCase().startsWith(value.toLowerCase()) ||
                item.socio.toString().toLowerCase().startsWith(value.toLowerCase()) ||
                item.identidad.toLowerCase().startsWith(value.toLowerCase()) ||
                item.tipo.toLowerCase().startsWith(value.toLowerCase()) ||
                item.estado.toLowerCase().startsWith(value.toLowerCase()) ||
                item.perfil.toLowerCase().startsWith(value.toLowerCase());

            const includes =
                item.nombre.toLowerCase().includes(value.toLowerCase()) ||
                item.socio.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.identidad.toLowerCase().includes(value.toLowerCase()) ||
                item.tipo.toLowerCase().includes(value.toLowerCase()) ||
                item.estado.toLowerCase().includes(value.toLowerCase()) ||
                item.perfil.toLowerCase().includes(value.toLowerCase());

            if (startsWith) {
                return startsWith;
            } else if (!startsWith && includes) {
                return includes;
            } else return null;
        });
    };



    const dataToRender = (nav) => {
        let updatedData = [];
        let data = sucursales;

        if (currentEstado !== "Todos") {
            data = data.filter(r => currentEstado === r.estado);

        }
        const value = searchTerm;

        //Mi pripio Filtro de Busqueda.
        if (value.length) {
            updatedData = filter(value, data);
        }

        if (data === undefined) {
            return [];
        } else if (nav) {
            return value.length > 0 ? updatedData : data;
        } else if (value.length > 0) {
            return updatedData.slice(
                (currentPage - 1) * rowsPerPage,
                rowsPerPage * currentPage
            );
        } else if (data.length === 0 && updatedData.length === 0) {
            return [];
        } else {
            return data.slice(
                (currentPage - 1) * rowsPerPage,
                rowsPerPage * currentPage
            );
        }
    };

    const totalPages = Number(Math.ceil(dataToRender(true).length / rowsPerPage));


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
                        <h1> Datos de Sucursal </h1>
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
                        <table className="table table-hover table-outline mb-0 d-none d-sm-table" >
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        Sucursal
                                    </th>
                                    <th>Direccion</th>
                                    <th>Telefonos</th>
                                    <th>Departamentos</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataToRender().map((row) => {
                                    return (
                                        <tr  >

                                            <td  >
                                                <div>{row.nombre}</div>
                                            </td>

                                            <td>{row.direccion}</td>
                                            <td>{row.telefonos}</td>
                                            <td>{row.departamentos.length} </td>
                                            <td>
                                                <CButton
                                                    onClick={() => {
                                                        dispatch({
                                                            type: 'SUCURSAL_EDIT',
                                                            payload: row

                                                        })
                                                    }}
                                                >
                                                    <Icon icon="proicons:open" width={25} />
                                                </CButton>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <CPagination
                            align="end"
                            activePage={currentPage}
                            pages={totalPages}
                            onActivePageChange={setCurrentPage}
                            style={{ paddingTop: 15 }}
                        />
                    </CCol>
                </CRow>

            </CCol>
            <ModalSucursalEdit
                onSave={(sav) => {
                    ws.send(JSON.stringify({ type: "SETTING_SAVE_SUCURSAL", data: sav }));
                }}

            />
        </CRow>

    )
}


export default SettupSucursales;
