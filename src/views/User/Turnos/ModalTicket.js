import { CButton, CCol, CInput, CModal, CModalBody, CPagination, CRow, CSelect } from '@coreui/react'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatTurno } from 'src/views/getTurno/Tiket';

export const ModalTicket = ({ ws }) => {
    const dispatch = useDispatch();
    const { turnos, estadistica, estado } = useSelector((state) => state.ws.agente);
    const { show, estado: estadosearch } = useSelector((state) => state.ws.ticketModal);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentEstado, setCurrentEstado] = useState('Todos')
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [turno, setTurno] = useState({ alfa: '', secuencia: 0 })
    const [llamando, setLlamando] = useState(false)

    const GenerarLlamadoTiket = (data) => {
        return new Promise((resolve, reject) => {
            console.log('Data a Enviar =>', { type: "AGENTE_CALL_TICKET", data })
            // Enviar los datos al servidor a través del WebSocket
            ws.send(JSON.stringify({ type: "AGENTE_CALL_TICKET", data }));

            resolve();
        });
    };


    const llamarTiket = async (turno_id, sucursal, alfa, secuencia) => {
        setLlamando(true)
        setTurno({ turno_id, sucursal, alfa, secuencia })
        await GenerarLlamadoTiket({
            turno_id, sucursal, alfa, secuencia

        })



        setLlamando(false)

    }

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
        let data = turnos;

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

    useEffect(() => {
        if (currentPage === 0 && totalPages > 0) {
            setCurrentPage(1)
        }
    }, [turnos])

    return (
        <CModal show={show} size='xl'>
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
                                <Icon icon="ion:ticket"
                                    width={50}
                                    color="#65a30d"
                                    style={{ margin: 5, marginLeft: 0 }}
                                />
                                <h1> Cola de tiket </h1>
                            </CCol>
                            <CCol style={{ textAlign: "end" }}>
                                <CButton
                                    color="primary"
                                    style={{}}

                                >
                                    <Icon icon="mdi:plus" width={25} />
                                    Adicionar Nuevo
                                </CButton>
                            </CCol>
                        </CRow>
                        <hr data-v-550cf047="" class="border-separator is-full-wixdth" />

                        <div className="row my-2 mx-0">
                            <CCol xl="10" className="d-flex align-items-center p-0">
                                <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                                    <label className="mb-0" style={{ marginRight: 10 }}>
                                        Buscar:
                                    </label>
                                    <CInput
                                        id="search-invoice"
                                        className="ms-50 w-100"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setCurrentPage(1);
                                            setSearchTerm(e.target.value);
                                        }}
                                    />
                                </div>


                            </CCol>
                            <CCol
                                xl="2"
                                className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
                            >
                                <div
                                    className="form-inline justify-content-sm-end c-datatable-items-per-page "
                                    style={{ paddingRight: 20 }}
                                >
                                    <label htmlFor="rows-per-page">Turno </label>
                                    <CSelect
                                        className="mx-50"
                                        type="select"
                                        id="rows-per-page"
                                        // value={rowsPerPage}
                                        onChange={(e) => setRowsPerPage(e.target.value)}
                                        style={{ width: "5rem" }}
                                    >
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                    </CSelect>
                                    <label htmlFor="rows-per-page"> Item</label>
                                </div>
                            </CCol>
                        </div>
                        <hr data-v-550cf047="" class="border-separator is-full-width" />
                        <CRow style={{ minHeight: 500 }}>
                            <CCol>
                                <table className="table table-hover table-outline mb-0 d-none d-sm-table" >
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-center">
                                                Tiket
                                            </th>
                                            <th>Servicio</th>
                                            <th className="text-center">Fecha y Hora</th>
                                            <th>Tipo de Documento</th>
                                            <th>Documento</th>
                                            <th>nombre</th>
                                            <th className="text-center">Estado</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dataToRender().map((row) => {
                                            return (
                                                <tr  >
                                                    <td width="20">
                                                        {formatTurno(row.alfa, row.secuencia)}
                                                    </td>
                                                    <td  >
                                                        <div>{row.servicio}</div>
                                                    </td>
                                                    <td className="text-left">
                                                        <div>{row.fecha_hora}</div>
                                                    </td>
                                                    <td>{row.tipodocumento}</td>
                                                    <td>{row.documento}</td>
                                                    <td>{row.nombre}</td>
                                                    <td className="text-center">
                                                        {row.estado}
                                                    </td>
                                                    <td>


                                                        <CButton
                                                            // color="primary"
                                                            style={{
                                                                width: '100%',
                                                                // height: 80,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: 10, // Espacio entre el icono y el texto
                                                                // color : 'white',
                                                                background: '#d6d8db'
                                                            }}
                                                            onClick={() => {
                                                                llamarTiket(row.turno_id, row.sucursal, row.alfa, row.secuencia)
                                                                dispatch({
                                                                    type: 'ModalTicket',
                                                                    payload: {
                                                                        show: false,
                                                                        estado: 'Paused'
                                                                    }
                                                                })
                                                            }
                                                            }

                                                        >
                                                            <Icon icon="material-symbols:call-log-outline" width={25} />
                                                            <span style={{ flex: 1, textAlign: 'center', fontSize: 14 }}>Llamar</span>
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
                        <CRow>
                            <CCol style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <CButton
                                    // color="primary"
                                    style={{
                                        width: '20%',
                                        height: 80,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 10, // Espacio entre el icono y el texto
                                        // color : 'white',
                                        background: '#d6d8db'
                                    }}
                                    onClick={() => dispatch({
                                        type: 'ModalTicket',
                                        payload: {
                                            show: false,
                                            estado: 'Paused'
                                        }
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
    )
}
