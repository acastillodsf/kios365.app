import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CFooter,
  CProgress,
  CRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import React, { Fragment, useEffect, useState } from "react";
import clienteAxios from "src/config/axios";
import Spinner, { SpinnerText } from "src/reusable/Spinner";
// import swal from "sweetalert";
import Swal from "sweetalert2";
import { getStyle, hexToRgba } from "@coreui/utils";

import DigiGrapicPlatinum from "./DigiGrapicPlatinum";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DigiPlatinum = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [DigiAccount, setDigiAccount] = useState([]);
  const [DigiAccountGrapic, setDigiAccountGrapic] = useState({});
  const [consultando, setConsultando] = useState(true);

  const Consulta = async () => {
    try {
      const peticion = await clienteAxios.get("/dk_consulta");
      dispatch({type: 'data',payload : peticion.data})
      setDigiAccount(peticion.data);
      setConsultando(false);
      setDigiAccountGrapic(peticion.data[0]);
    } catch (error) {
      Swal.fire({
        title: "DigiPlatinum",
        text: error.response.data,
        icon: "error",
        button: "Aceptar",
      });
    }
  };
  useEffect(() => {
    Consulta();
  }, []);
  const createDigiPlatinum = () => {
    Swal.fire({
      title: "DigiPlatinum",
      text: "Estas de Acuerdo con los terminos ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Estoy de Acuerdo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        createDigiPlatinumSave();
      }
    });
  };
  const createDigiPlatinumSave = async () => {
    try {
      await clienteAxios.get("/dk_register");
      Swal.fire(
        "DigiPlatinum",
        "Su producto se ha creado exitosamente !",
        "success"
      );
      history.push('/')
    } catch (error) {
      Swal.fire({
        title: "DigiPlatinum",
        text: error.response.data,
        icon: "error",
        button: "Aceptar",
      });
    }
  };
  return (
    <Fragment>
      {consultando && (
        <CCard borderColor="success">
          <CCardBody>
            <SpinnerText text="Consultando..." />
          </CCardBody>{" "}
        </CCard>
      )}
      {!consultando && DigiAccount.length == 0 && (
        <CCard borderColor="success">
          <CCardBody>
            <iframe
              style={{
                width: "100%",
                height: 500,
                border: 0,
              }}
              src="https://docs.google.com/document/d/e/2PACX-1vRwoTV3nWawzcCJ6Z_fsXBiWW3C1uYTxzSBalsEPDqrxSQ1kCmVb9p65Iw1cbeOcbNQPX54uhsNzab9/pub"
            />
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md="6" className="d-flex justify-content-start">
                <CButton
                  onClick={() => {
                    // setTransData(InitialStateTransData);
                  }}
                  size="sm"
                  color="warning"
                >
                  <CIcon name="cil-ban" /> Cancelar{" "}
                </CButton>
              </CCol>
              <CCol md="6" className="d-flex justify-content-end">
                <CButton
                  onClick={() => createDigiPlatinum()}
                  size="sm"
                  color="success"
                >
                  <CIcon name="cil-scrubber" /> Acepto los Terminos
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      )}

      {!consultando && DigiAccount.length > 0 && (
        <CRow>
          <CCol xs="12" sm="12" md="12">
            <CCard>
              <CCardHeader>DigiPlatinum - Inversion</CCardHeader>

              <CCardBody>
                <CRow>
                  <CCol sm="5">
                    <h4 id="traffic" className="card-title mb-0">
                      Actividades Recientes
                    </h4>
                    <div className="small text-muted">Ultimos 6 meses.</div>
                  </CCol>
                </CRow>
                <DigiGrapicPlatinum
                  DigiAccountGrapic={DigiAccountGrapic}
                  style={{ height: "300px", marginTop: "40px" }}
                />

                <table
                  className="table table-hover table-outline mb-0 d-none d-sm-table"
                  style={{ marginTop: 30 }}
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                        <CIcon name="cil-people" />
                      </th>
                      <th>Producto</th>
                      <th>Inversion</th>
                      <th>Disponible</th>
                      <th>Rentabilidad</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {DigiAccount.map((row) => {
                      return (
                        <tr>
                          <td className="text-center">
                            <div className="c-avatar">
                              <img
                                src={"avatars/1.jpg"}
                                className="c-avatar-img"
                                alt="admin@bootstrapmaster.com"
                              />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>DigiPlatinum</div>
                            <div className="small text-muted">
                              Registrado : {row.create}
                            </div>
                          </td>
                          <td>
                            <div className="small text-muted">Capital</div>
                            <strong>RD$ {row.inversion}</strong>
                          </td>
                          <td>
                            <div className="small text-muted">Disponibilidad</div>
                            <strong>RD$ {row.balance}</strong>
                          </td>
                          <td style={{ width: "30%" }}>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>
                                  { row.mouth_profit.length>0 ?
                                  parseFloat(
                                    row.mouth_profit[
                                      row.mouth_profit.length - 1
                                    ].porcet_mouth
                                  ).toFixed(2) : 0.00}
                                  %
                                </strong>
                              </div>
                              <div className="float-right">
                                <small className="text-muted">
                                  {/* {row.grafic.text} */}
                                </small>
                              </div>
                            </div>
                            <CProgress
                              className="progress-xs"
                              color="success"
                              value={ row.mouth_profit.length>0 ? parseFloat(
                                row.mouth_profit[row.mouth_profit.length - 1]
                                  .porcet_mouth 
                              ) : 0}
                            />
                          </td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs="12" sm="12" md="12">
            <CCard borderColor="primary">
              <CCardHeader>Historico</CCardHeader>
              <CCardBody>
              <table
                  className="table table-hover table-outline mb-0 d-none d-sm-table"
                  style={{ marginTop: 30 }}
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                       </th>
                      <th>Periodo</th>
                      <th>Ganancia</th>
                      <th>Rentabilidad</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {DigiAccountGrapic.length !==0 &&
                    DigiAccountGrapic.mouth_profit !==undefined 
                    && DigiAccountGrapic.mouth_profit.map((row) => {
                      const dollar = parseFloat(DigiAccount[0].coste_dolar);
                      return (
                        <tr>
                          <td className="text-center">
                            <div className="c-avatar">
                              <img
                                src={"avatars/1.jpg"}
                                className="c-avatar-img"
                                alt="admin@bootstrapmaster.com"
                              />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{row.mouth}</div>
 
                          </td>
                          <td>
                            <strong>RD$ { Intl.NumberFormat('es-MX').format(parseFloat(row.profit_mouth*dollar).toFixed(2))}</strong>
                          </td>
                          <td style={{ width: "30%" }}>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>
                                  {parseFloat(
                                    row.porcet_mouth
                                  ).toFixed(2)}
                                  %
                                </strong>
                              </div>
                              <div className="float-right">
                                <small className="text-muted">
                                  {row.mouth}
                                </small>
                              </div>
                            </div>
                            <CProgress
                              className="progress-xs"
                              color="success"
                              value={parseFloat(
                                row.porcet_mouth
                              )}
                            />
                          </td>
                           
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </Fragment>
  );
};

export default DigiPlatinum;
