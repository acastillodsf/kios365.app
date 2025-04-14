import { CBadge, CBreadcrumbRouter, CButton, CCol, CInput, CPagination, CRow, CSelect } from '@coreui/react';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import routes from 'src/routes';


const getBadge = (status) => {
    switch (status) {
        case "Activo":
            return "success";
        case "Inactive":
            return "secondary";
        case "Bloqueado":
            return "warning";
        case "En Espera":
            return "danger";
        case "Retirado":
            return "danger";
        default:
            return "primary";
    }
};


export const KioscosList = () => {
    const ListEquipos = useSelector((state) => state.ws.kioscos);

    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentEstado, setCurrentEstado] = useState('Todos')
    const [rowsPerPage, setRowsPerPage] = useState(10)


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
        let data = ListEquipos.filter(r => ['kiosco', 'pantalla'].includes(r.Agente));

        if (currentEstado !== "Todos") {
            data = data.filter(r => currentEstado === r.Estado);

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
    }, [ListEquipos])

    return (
        <CRow
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CCol md={9}>
                <CRow>
                    <CCol
                        style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Icon
                            icon="material-symbols:user-attributes-rounded"
                            width={50}
                            color="#65a30d"
                            style={{ margin: 5, marginLeft: 0 }}
                        />
                        <h1> Listado de Dispositivos </h1>
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
                <CBreadcrumbRouter routes={routes} />
                {/* <hr data-v-550cf047="" class="border-separator is-full-wixdth" /> */}

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

                        <div
                            className="d-flex align-items-center mb-sm-0 mb-1 me-1"
                            style={{ marginLeft: 20 }}
                        >
                            <label style={{ marginRight: 10 }}>Estado </label>
                            <CSelect
                                aria-label="Large select example"
                                style={{
                                    width: "10rem",
                                    color: parseInt(currentEstado) === 1 ? "blue" : "red",
                                }}
                                name="estado"
                                value={currentEstado}
                                onChange={(e) => {
                                    setCurrentPage(1);
                                    setCurrentEstado(e.target.value);
                                }}
                            >
                                <option value="Todos"> Todos </option>
                                <option value="✅ Conectado"> ✅ Conectado </option>
                                <option value="❌ Desconectado"> ❌ Desconectado </option>
                            </CSelect>
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
                            <label htmlFor="rows-per-page">Ver </label>
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
                <CRow>
                    <CCol>
                        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center">
                                        Dispositivo
                                    </th>
                                    <th>Nombre</th>
                                    <th className="text-center">STU</th>
                                    <th>Sucursal</th>
                                    <th className="text-center">Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataToRender().map((row) => {
                                    return (
                                        <tr  >
                                            <td width="20">
                                                {row.Agente}
                                            </td>
                                            <td  >
                                                <div>{row.ClientID}</div>
                                            </td>
                                            <td className="text-left">
                                                <div>{row.sku}</div>
                                            </td>
                                            <td>{row.sucursal}</td>
                                            <td className="text-center">
                                                {row.Estado.replace('Conectado', '').replace('Desconectado', '')}
                                            </td>
                                            <td>
                                                <CButton


                                                >
                                                    <Icon icon="fa:edit" width={25} />
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


export default KioscosList;