import { CBadge, CBreadcrumbRouter, CButton, CCard, CCardBody, CCardFooter, CCol, CInput, CLabel, CModal, CModalBody, CPagination, CRow, CSelect } from '@coreui/react';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import routes from 'src/routes';
import { formatTurno } from 'src/views/getTurno/Tiket';
import AvisoLlamando from './AvisoLlamando';
import { Atendiendo } from './Atendiendo';
import moment from 'moment';
import CIcon from '@coreui/icons-react';
import { Clock } from './Clock';


const CardStyle = {
    body: {
        height: 130,
    },
};

const Indicador = ({ name, value, icon }) => {
    return (
        <CCard>
            <CCardBody style={CardStyle.body}>
                <CRow>
                    <CCol style={{ alignItems: 'center' }}>
                        {" "}
                        <h1>{value || 0}</h1>
                    </CCol>
                    <CCol xl="6">
                        {" "}
                        <Icon icon={icon} width={50} />
                    </CCol>
                </CRow>
                <CRow style={{ paddingTop: 10 }}>
                    <CCol>
                        <small className="text-muted text-uppercase font-weight-bold">
                            {name}
                        </small>
                    </CCol>
                </CRow>
            </CCardBody>

        </CCard>
    )
}

export const ListadoTurnos = ({ ws }) => {
    const { turnos, estado, estadistica, atendiendo } = useSelector((state) => state.ws.agente);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentEstado, setCurrentEstado] = useState('Todos')
    const [rowsPerPage, setRowsPerPage] = useState(10)

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
        setTurno({ turno_id, alfa, secuencia })
        await GenerarLlamadoTiket({
            turno_id, alfa, secuencia

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

    const AutoLlamar = () => {

    }



    const Opciones = [
        {
            label: 'Siguiente',
            icon: "material-symbols:next-plan-outline",
            disabled: estado !== 'Available',
            background: '#28a745',
            onClick: () => ws.send(JSON.stringify({ type: "AGENTE_AUTOCALL" }))
        },
        {
            label: 'Atender',
            icon: "bxs:select-multiple",
            disabled: estado !== 'On hold',
            background: '#007bff',
            onClick: () => ws.send(JSON.stringify({ type: "AGENTE_ATENDER" }))
        },
        {
            label: 'Finalizar',
            icon: "material-symbols-light:done-all-rounded",
            disabled: estado !== 'Attending',
            background: '#dc3545',
            onClick: () => ws.send(JSON.stringify({ type: "AGENTE_FINALIZAR" }))
        },
        {
            label: 'Volver a Llamar',
            icon: "material-symbols:call-log-outline",
            disabled: estado !== 'On hold' && estado !== 'Attending',
            background: '#fd7e14',
            onClick: () => ws.send(JSON.stringify({ type: "AGENTE_RECALL" }))
        },
        {
            label: 'Transferir',
            icon: "bx:transfer",
            disabled: estado !== 'Attending',
            background: '#ffc107'
        },
        {
            label: 'Pausar',
            icon: "material-symbols:pause",
            disabled: estado !== 'Attending',
            background: '#17a2b8',
            onClick: () => ws.send(JSON.stringify({ type: "AGENTE_PAUSED" }))
        },
        {
            label: 'Anular',
            icon: "pajamas:cancel",
            disabled: estado !== 'On hold',
            background: '#c82333',
            onClick: () => ws.send(JSON.stringify({ type: "AGENTE_ANULAR" }))
        },

    ]

    return (
        <CRow
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <AvisoLlamando active={llamando} turno={turno} />
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
                        <h1> Gestion de Turno </h1>
                    </CCol>
                    <Clock />

                </CRow>
                <CBreadcrumbRouter routes={routes} />

                <CRow style={{ marginBottom: 30 }}>
                    {
                        Opciones.map((r, index) => {
                            return <CCol md={index > 2 ? 3 : 4} style={{ margin: 0, padding: 5 }}>
                                <CButton
                                    // color="primary"
                                    disabled={r.disabled}
                                    style={{
                                        width: '100%',
                                        height: 80,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 10, // Espacio entre el icono y el texto
                                        // color : 'white',
                                        background: r.disabled ? '#d6d8db' : (r.background ? r.background : '#484848')
                                    }}
                                    onClick={r.onClick}
                                >
                                    <Icon icon={r.icon} width={50} />
                                    <span style={{ flex: 1, textAlign: 'center', fontSize: 20 }}>{r.label}</span>
                                </CButton>
                            </CCol>
                        })
                    }


                </CRow>


                <CRow>
                    <Atendiendo />
                </CRow>

                {/* <hr data-v-550cf047="" class="border-separator is-full-width" /> */}


                <CRow style={{ marginTop: 30 }}>
                    <CCol
                        md="3"
                        style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Icon icon="ion:ticket"
                            width={25}
                            color="#65a30d"
                            style={{ margin: 5, marginLeft: 0 }}
                        />
                        <h4> Turno en espera</h4>
                    </CCol>
                    <CCol>
                        <CRow>
                            <CCol>
                                <Indicador name="Turno en Cola" value={estadistica.cola} icon="carbon:tsq" />
                            </CCol>
                            <CCol>
                                <Indicador name="Turno en Espera" value={estadistica.pausado} icon="material-symbols:pause" />
                            </CCol>
                            <CCol>
                                <Indicador name="Turno Anulado" value={estadistica.anulado} icon="pajamas:cancel" />
                            </CCol>
                            <CCol>
                                <Indicador name="Turno Atendido" value={estadistica.atendido} icon="bxs:select-multiple" />
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>

                <hr data-v-550cf047="" class="border-separator is-full-width" />
                <CRow>
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
                                                <div>{moment(row.fecha_hora).format('YYYY-MM-DD H:mm:ss')}</div>
                                            </td>
                                            <td>{row.tipodocumento}</td>
                                            <td>{row.documento}</td>
                                            <td>{row.nombre}</td>
                                            <td className="text-center">
                                                {row.estado}
                                            </td>
                                            <td>{row.tiempo}</td>
                                            <td>{row.atencion}</td>
                                            <td>
                                                <CButton
                                                    onClick={() => llamarTiket(row.turno_id, row.sucursal, row.alfa, row.secuencia)}
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

        </CRow>
    )
}


export default ListadoTurnos;