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
import { format } from 'date-fns';

const EstadoAh = ({ match }) => {
  const dispatch = useDispatch();
  const getEstadoAh = (querry) => dispatch(consultaSocioEstado(querry));
  const history = useHistory();

  const { cargadoEstado, cargandoEstado, consultaEstado } = useSelector(
    (state) => state.estadoCuenta
  );

  //Configuracion de Fecha por Default.
  const mfechaini = Moment(Date()).format("YYYY-MM-01");
  const mfechafin = Moment(Date()).format("YYYY-MM-DD");

  const [consultaActiva, setconsultaActiva] = useState({
    idcuenta: match.params.idCuenta,
    fechaini: mfechaini,
    fechafin: mfechafin,
  });
  const { fechaini, fechafin } = consultaActiva;

  useEffect(() => {
    console.log(consultaActiva);
    getEstadoAh(consultaActiva);
    //eslint-disable-next-line
  }, [fechaini, fechafin]);

  const handleChange = (e) => {
    setprimeraconsulta(false);
    setconsultaActiva({
      ...consultaActiva,
      [e.target.name]: e.target.value,
    });
  };

  //setprimeraconsulta(true)

  const { cuenta, producto, divisa, informacion, transacciones, tipocuenta } =
    consultaEstado;
  const {
    apertura,
    actividad,
    ult_deposito,
    ult_retiro,
    balance,
    balance_ayer,
    retenido,
    transito,
    embargo,
    disponible,
  } = informacion;

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
  const [primeraconsulta, setprimeraconsulta] = useState(true);

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
      {primeraconsulta && cargandoEstado ? (
        <Spinner className="mt-3" />
      ) : // eslint-disable-next-line no-mixed-operators
      (primeraconsulta && cargadoEstado) || !primeraconsulta ? (
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
                          <CInput value={cuenta} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Producto</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={producto} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Moneda</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={divisa} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Apertura</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={moment(apertura).format("Y-M-D")} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Actividad</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={moment(actividad).format("Y-M-D")} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Ult.Dep.</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            value={Fnumber(ult_deposito)}
                            className="textend"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Ult.Ret.</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            value={Fnumber(ult_retiro)}
                            className="textend"
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="5">
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Balance</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput
                            value={Fnumber(balance)}
                            className="textend"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Balance Ayer</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput
                            value={Fnumber(balance_ayer)}
                            className="textend"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Retencion</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput value={retenido} className="textend" />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Transito</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput value={transito} className="textend" />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">Embargado</CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput value={embargo} className="textend" />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="5">
                          <CLabel htmlFor="text-input">
                            {" "}
                            {tipocuenta === 2
                              ? "Capital Activo"
                              : "Disponibilidad"}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="7">
                          <CInput
                            value={Fnumber(disponible)}
                            className="textend"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="company">Desde :</CLabel>
                            <CInput
                              type="date"
                              placeholder="Apertura"
                              name="fechaini"
                              value={fechaini}
                              onChange={handleChange}
                            />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="company">Hasta:</CLabel>
                            <CInput
                              type="date"
                              placeholder="Actifvidad"
                              name="fechafin"
                              value={fechafin}
                              onChange={handleChange}
                            />
                          </CFormGroup>
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
                  {cargandoEstado ? (
                    <Spinner className="mt-3" />
                  ) : (
                    <CTabContent>
                      <CTabPane>
                        <CDataTable
                          items={transacciones}
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
                              _style: { width: "400px" },
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "referencia",
                              label: "Referencia",
                              sorter: false,
                              filter: false,
                            },

                            {
                              key: "deposito",
                              label: "Deposito",
                              sorter: false,
                              filter: false,
                            },
                            {
                              key: "retiro",
                              label: "Retiro",
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
                            balance: (item) => RFormat(item.balance),
                            retiro: (item) => RFormat(item.retiro),
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
                  )}
                </CTabs>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
        <CRow>
          <h1>No se pudo cargar consulta solicitada</h1>
        </CRow>
      )}
    </Fragment>
  );
};

export default EstadoAh;
