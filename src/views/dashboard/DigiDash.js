import React, { useEffect, useState, Fragment } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
  CProgress,
  CCardFooter,
} from "@coreui/react";

import Spinner, { DisabledAutorization } from "src/reusable/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getconsultaProducto } from "../../actions/sociosEstadoCuentaAction";

import swal from "sweetalert";
import Primerdeposito from "./Primerdeposito";
import { DkAuth } from "../dk/dkAuth";
import { DigiPlaninum } from "./DigiPlaninum";
import MainChartExample from "../charts/MainChartExample";
import DigiGrapic from "./DigiGrapic";
import CIcon from "@coreui/icons-react";
import clienteAxios from "src/config/axios";

const DigiDash = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { consulta, cargando, cargado } = useSelector(
    (state) => state.estadoCuenta
  );
  const { datos, cuentas, certificados, prestamos } = consulta;
  const { socio, nombres } = datos;


  const [selectSocio, setselectSocio] = useState({
    esocio: 0,
    enombre: "",
    sucursal: "120",
    ecuentas: [],
    ecertificado: [],
    eprestamos: [],
  });

  const [groupCuenta, setgroupCuenta] = useState(false);
  const [groupCertificado, setgroupCertificado] = useState(false);
  const [groupprestamos, setgroupprestamos] = useState(false);
  const [grabal, setGrabal] = useState({
    ahorro: 0,
    aportaciones: 0,
    certificado: 0,
  });

  useEffect(() => {
    if (cargado) {
      setgroupCuenta(false);
      setgroupCertificado(false);
      setgroupprestamos(false);

      console.log(consulta);

      cuentas.map(() => setgroupCuenta(true));
      certificados.map(() => setgroupCertificado(true));
      prestamos.map(() => setgroupprestamos(true));

      setselectSocio({
        esocio: socio,
        enombre: nombres,
        ecuentas: cuentas,
        ecertificado: certificados,
        eprestamos: prestamos,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargando]);

  useEffect(() => {
    setselectSocio({
      esocio: "",
      enombre: "",
      ecuentas: [],
      ecertificado: [],
      eprestamos: [],
    });
    setgroupCuenta(false);
    setgroupCertificado(false);
    setgroupprestamos(false);
    dispatch(getconsultaProducto());
    //eslint-disable-next-line
  }, []);

  const { ecuentas, ecertificado, eprestamos } = selectSocio;
  //Fin de Impresion

  return (
    <Fragment>
      {/* <DkAuth /> */}

      {cargando ? (
        <Spinner className="mt-3" />
      ) : (
        <CRow>
          <CCol lg={10}>
            <h3> Bienvenido, {nombres} </h3>
          </CCol>
          {/* {match.params.filtro === undefined && (
            <CCol xs="12" sm="12" md="12">
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol sm="5">
                      <h4 id="traffic" className="card-title mb-0">
                        Actividades Recientes
                      </h4>
                      <div className="small text-muted">Ultimos 6 meses.</div>
                    </CCol>
                  </CRow>
                  <DigiGrapic
                    setData={(e) => setGrabal({ ...global, ...e })}
                    style={{ height: "300px", marginTop: "40px" }}
                  />
                </CCardBody>
                <CCardFooter>
                  <CRow className="text-center">
                    <CCol md sm="12" className="mb-sm-2 mb-0">
                      <div className="text-muted">Ahorros</div>
                      <strong>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "DOP",
                        }).format(grabal.ahorro)}
                      </strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="success"
                        value={(grabal.ahorro * 100) / grabal.total}
                      />
                    </CCol>
                    <CCol md sm="12" className="mb-sm-2 mb-0">
                      <div className="text-muted">Aportaciones</div>
                      <strong>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "DOP",
                        }).format(grabal.aportaciones)}
                      </strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="info"
                        value={(grabal.aportaciones * 100) / grabal.total}
                      />
                    </CCol>
                    {grabal.certificado>0 && (<CCol md sm="12" className="mb-sm-2 mb-0">
                      <div className="text-muted">Certificados</div>
                      <strong>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "DOP",
                        }).format(grabal.certificado)}
                      </strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="warning"
                        value={(grabal.certificado * 100) / grabal.total}
                      />
                    </CCol>
                    )}
                    {grabal.digiplatinum>0 && (<CCol md sm="12" className="mb-sm-2 mb-0">
                      <div className="text-muted">Digiplatinum</div>
                      <strong>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "DOP",
                        }).format(grabal.digiplatinum)}
                      </strong>

                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="danger"
                        value={(grabal.digiplatinum * 100) / grabal.total}
                      />
                    </CCol>
                    )}
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          )} */}
          {/* <DigiPlaninum /> */}

          {groupCuenta &&
            (match.params.filtro === "cuentas" ||
              match.params.filtro === "" ||
              match.params.filtro === undefined) && (
              <CCol xs="12" sm="12" md="12">
                <CCard borderColor="success">
                  <CCardHeader>Mis Ahorros</CCardHeader>
                  <CCardBody>
                    <table className="table table-hover table-outline mb-0  d-sm-table">
                      <thead className="thead-light">
                        <tr>
                          <th>Producto</th>
                          <th> </th>
                          <th>Divisa</th>
                          <th>Balance</th>
                          <th>Disponible</th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ecuentas.map((row) => {
                          if (
                            row.tipocuenta===1 && (match.params.filtro === "" ||
                            (match.params.filtro === "cuentas" &&
                              row.tipocuenta === 1) ||
                            match.params.filtro === undefined
                          )) {
                            return (
                              <tr>
                                <td>
                                  <div>{row.cuenta }</div>
                                </td>
                                <td>
                                  <div>{row.producto}</div>
                                </td>
                                <td>
                                  <div>{row.divisa}</div>
                                </td>
                                <td>
                                  <div>{row.fbalance}</div>
                                </td>
                                <td>
                                  <div>{row.fbalance}</div>
                                </td>

                                <td>
                                  <CButton
                                    color="primary"
                                    onClick={() =>
                                      history.push(`/account/AH/${row.id}`)
                                    }
                                  >
                                    Consulta
                                  </CButton>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                    </table>
                    {/* <CDataTable
                    items={ecuentas}
                    fields={[
                      { key: "cuenta", label: "Cuenta" },
                      { key: "producto", label: "Producto" },
                      { key: "divisa", label: "Divisa" },
                      { key: "balance", label: "Balance" },
                      { key: "disponible", label: "Disponible" },
                      { key: "Opciones", label: "Opcion" },
                    ]}
                    hover
                    sorter
                    scopedSlots={{
                      Opciones: (item) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() =>
                                history.push(`/account/AH/${item.id}`)
                              }
                            >
                              Seleccionar
                            </CButton>
                          </td>
                        );
                      },
                    }}
                  /> */}
                  </CCardBody>
                </CCard>
              </CCol>
            )}
            {groupCuenta &&
            ( match.params.filtro === "aportaciones" ||
              match.params.filtro === "" ||
              match.params.filtro === undefined) && (
              <CCol xs="12" sm="12" md="12">
                <CCard borderColor="success">
                  <CCardHeader>Mis Aportes</CCardHeader>
                  <CCardBody>
                    <table className="table table-hover table-outline mb-0  d-sm-table">
                      <thead className="thead-light">
                        <tr>
                          <th>Producto</th>
                          <th> </th>
                          <th>Divisa</th>
                          <th>Balance</th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ecuentas.map((row) => {
                          if (
                            row.tipocuenta === 2 && (match.params.filtro === "" ||
                            (match.params.filtro === "aportaciones" &&
                              row.tipocuenta === 2) ||
                            match.params.filtro === undefined
                          ) ){
                            return (
                              <tr>
                                <td>
                                  <div>{row.cuenta}</div>
                                </td>
                                <td>
                                  <div>{row.producto}</div>
                                </td>
                                <td>
                                  <div>{row.divisa}</div>
                                </td>
                                <td>
                                  <div>{row.fbalance}</div>
                                </td>
                              

                                <td>
                                  <CButton
                                    color="primary"
                                    onClick={() =>
                                      history.push(`/account/AH/${row.id}`)
                                    }
                                  >
                                    Consulta
                                  </CButton>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                    </table>
                    {/* <CDataTable
                    items={ecuentas}
                    fields={[
                      { key: "cuenta", label: "Cuenta" },
                      { key: "producto", label: "Producto" },
                      { key: "divisa", label: "Divisa" },
                      { key: "balance", label: "Balance" },
                      { key: "disponible", label: "Disponible" },
                      { key: "Opciones", label: "Opcion" },
                    ]}
                    hover
                    sorter
                    scopedSlots={{
                      Opciones: (item) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() =>
                                history.push(`/account/AH/${item.id}`)
                              }
                            >
                              Seleccionar
                            </CButton>
                          </td>
                        );
                      },
                    }}
                  /> */}
                  </CCardBody>
                </CCard>
              </CCol>
            )}

          {/* Certificados */}
          {groupCertificado &&
            (match.params.filtro === "certificados" ||
              match.params.filtro === "" ||
              match.params.filtro === undefined) && (
              <CCol xs="12" sm="12" md="12">
                <CCard borderColor="primary">
                  <CCardHeader>Mis Certificado Financiero</CCardHeader>
                  <CCardBody>
                    <table className="table table-hover table-outline mb-0 d-sm-table">
                      <thead className="thead-light">
                        <tr>
                          <th>Producto</th>
                          <th> </th>
                          <th>Divisa</th>
                          <th>Balance</th>
                          <th>Monto</th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ecertificado.map((row) => {
                          return (
                            <tr>
                              <td>
                                <div>{row.cuenta}</div>
                              </td>
                              <td>
                                <div>{row.producto}</div>
                              </td>
                              <td>
                                <div>{row.divisa}</div>
                              </td>
                              <td>
                                <div>Activo</div>
                              </td>
                              <td>
                                <div>{row.fdisponible}</div>
                              </td>

                              <td>
                                <CButton
                                  color="primary"
                                  onClick={() =>
                                    history.push(`/account/CR/${row.id}`)
                                  }
                                >
                                  Consulta
                                </CButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* <CDataTable
                    items={ecertificado}
                    fields={[
                      { key: "cuenta", label: "Cuenta" },
                      { key: "producto", label: "Producto" },
                      { key: "divisa", label: "Divisa" },
                      { key: "Estado", label: "Estado" },
                      { key: "balance", label: "Monto" },
                      { key: "Opciones", label: "Opcion" },
                    ]}
                    hover
                    scopedSlots={{
                      Estado: (item)=>{
                        return <td className="py-2">Activo</td>
                      },
                      Opciones: (item) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={(listsocios) =>
                                //seleccionSocio(item.socio, item.nombre)
                                swal(item.cuenta)
                              }
                            >
                              Seleccionar
                            </CButton>
                          </td>
                        );
                      },
                    }}
                  /> */}
                  </CCardBody>
                </CCard>
              </CCol>
            )}
          {/* Prestamos  */}
          {groupprestamos ? (
            <CCol xs="12" sm="12" md="12">
              <CCard borderColor="danger">
                <CCardHeader>Prestamos</CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={eprestamos}
                    fields={[
                      { key: "cuenta", label: "Cuenta" },
                      { key: "producto", label: "Producto" },
                      { key: "divisa", label: "Divisa" },
                      { key: "estado", label: "Estado" },
                      { key: "monto", label: "Monto" },
                      { key: "balancecap", label: "Balance Cap." },
                      { key: "capvencido", label: "Cap.Venc." },
                      { key: "interes", label: "Interes" },
                      { key: "mora", label: "Mora" },
                      { key: "pagarhoy", label: "Pagar Hoy" },
                      { key: "balance", label: "Balance" },
                      { key: "Opciones", label: "Opcion" },
                    ]}
                    hover
                    scopedSlots={{
                      Opciones: (item) => {
                        return (
                          <td className="py-2">
                            {/* <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={(listsocios) =>
                                //seleccionSocio(item.socio, item.nombre)
                                swal(item.cuenta)
                              }
                            >
                              Seleccionar
                            </CButton> */}
                          </td>
                        );
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          ) : null}
        </CRow>
      )}
    </Fragment>
  );
};

export default DigiDash;
