import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  // CBadge,
  CDataTable,
  //Table
  CNav,
  CNavItem,
  CNavLink,
  CTabs,
  CTabContent,
  CTabPane,
  CCollapse,
} from "@coreui/react";
import Moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { consultaSocioEstado } from "../../actions/sociosEstadoCuentaAction";
import Spinner from "src/reusable/Spinner";
import moment from "moment";
import { ImprimirDocumento } from "src/actions/uepapayAction";
import clienteAxios from "src/config/axios";

const EstadoPR = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [consultando,setConsultando] = useState(true)
  const [error,setError] =  useState(false)
  const [estado,setconsultaEstado] = useState()
  
 

  const getEstadoAh = (cuenta) => {
    setConsultando(true)
    console.log("Consultando Cuenta ",{params:{cuenta}})
    clienteAxios.get(`/Consulta/Credito`,{params:{cuenta}})
    .then(({data})=>{
      console.log(data)
      setconsultaEstado(data);
      setConsultando(false)
    }).catch(()=>{setError(true)})
  };


  useEffect(() => {
    console.log("cargando")
    getEstadoAh(match.params.idCuenta);
    //eslint-disable-next-line
  }, []);

   
 

  //toggleDetails
  const [details, setDetails] = useState([]);
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  //Controles de Agrupadores
  const [active, setActive] = useState(0);
 
  const Fnumber = (e) => {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(e)
      .replace("$", "");
  };

  const RFormat = (value) => {
    return (
      <td className="py-12 textend">
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        })
          .format(value)
          .replace("$", "")}
      </td>
    );
  };

  return (
    <Fragment>
      {/* {update && history.push(`/clientes/`)} */}
      {consultando ? (
        <Spinner className="mt-3" />
      ) : // eslint-disable-next-line no-mixed-operators
      error ? (
        <CRow>
          <h1>No se pudo cargar consulta solicitada</h1>
        </CRow>
      ) : (
        <CRow>
          <CCol xs="12" sm="12" md="12">
            <CCard borderColor="success">
              <CCardHeader>Informacion de Cuenta</CCardHeader>
              <CCardBody>
                <CCol xs="12" md="12">
                  <CFormGroup row className="my-0">
                    <CCol xs="4">
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Cuenta</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={estado.cuenta} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Producto</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={estado.producto} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Moneda</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={estado.divisa} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Apertura</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={moment(estado.fecha).format("Y-M-D")} />
                        </CCol>
                      </CFormGroup>
 
                    </CCol>

                    <CCol xs="5">
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Fecha de Inicio</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                        <CInput value={moment(estado.fechaini).format("Y-M-D")} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Fecha Vencimiento</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                        <CInput value={moment(estado.fechafina).format("Y-M-D")} />

                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Tasa Intres</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput value={`${(estado.tasa/12).toFixed(2)}% Mensual`} className="textend" />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Cuota</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput value={Fnumber(estado.cuota)} className="textend" />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Estado</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput value={estado.estado} className="textend" />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Balance </CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput value={Fnumber(estado.saldo)} className="textend" />
                        </CCol>
                      </CFormGroup>
                        
                    </CCol>
                    <CCol xs="3">
                      <CFormGroup row>
                        <CButton
                          size="sm"
                          color="success"
                          onClick={() => history.push(`/dashboard`)}
                        >
                          Regresar
                        </CButton>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                </CCol>

                <CTabs
                  activeTab={active}
                  onActiveTabChange={(idx) => setActive(idx)}
                >
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>
                        <CIcon name="cil-dollar" />
                        Transacciones en Cuentas
                      </CNavLink>
                    </CNavItem>
                  </CNav>

                    <CTabContent>
                      <CTabPane>
                        <CDataTable
                          items={estado.transacciones}
                          fields={[
                            {
                              key: "fecha",
                              label: "Fecha",
                              sorter: false,
                              filter: true,
                            },
                            {
                              key: "hora",
                              label: "Hora",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "documento",
                              label: "Documento",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "movimiento",
                              label: "Descripcion",
                              _style: { width: "300px" },
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "debito",
                              label: "Debito/Desem.",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "credito",
                              label: "Credito/Pagos",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "capital",
                              label: "Capital",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "interes",
                              label: "Interes",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "mora",
                              label: "Mora",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "balance",
                              label: "Balance",
                              sorter: false,
                              filter: false,
                            },
                          ]}
                          striped
                          itemsPerPage={10}
                          pagination
                          onRowClick={(item, index) => toggleDetails(index)}
                          scopedSlots={{
                            fecha: (item) => {
                              return (
                              <td className="py-12">
                                    {item.fecha}
                              </td>
                              )
                            },
                            hora: (item) => {
                              return (
                              <td className="py-12">
                              
                                    {moment(`2023-05-01T${item.hora}`).format("hh:mm A")}
                              </td>
                              )
                            },
                            balance: (item) => RFormat(parseFloat(item.balance)),
                            debito: (item) => RFormat(parseFloat(item.debito)),
                            capital: (item) => RFormat(parseFloat(item.capital)),
                            credito: (item) => RFormat(parseFloat(item.credito)),
                            interes: (item) => RFormat(parseFloat(item.interes)+parseFloat(item.seguro)),
                            mora: (item) => RFormat(parseFloat(item.mora)),
                            deposito: (item) => RFormat(item.deposito),
                            Opciones: (item) => {
                              return (
                                <td className="py-12">
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {}}
                                  >
                                    <CIcon name="cil-task" />
                                    Detalle
                                  </CButton>
                                </td>
                              );
                            },

                            details: (item, index) => {
                              return (
                                <CCollapse show={details.includes(index)}>
                                  <CCardBody>
                                    <h4>Comentario : {item.concepto}</h4>
                                  </CCardBody>
                                </CCollapse>
                              );
                            },
                          }}
                        />
                      </CTabPane>
                    </CTabContent>

                </CTabs>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </Fragment>
  );
};

export default EstadoPR;
