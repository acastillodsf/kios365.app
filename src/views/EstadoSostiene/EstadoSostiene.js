import { CBadge, CButton, CCol, CImg, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import clienteAxios from "src/config/axios";
import Spinner from "src/reusable/Spinner";
import { SostienePay } from "./SostienePay";

const getBadge = (status) => {
  switch (status) {
    case true:
      return "success";
    case false:
      return "secondary";
    case "Pending":
      return "warning";
    case "En Espera":
      return "danger";
    default:
      return "primary";
  }
};

export const EstadoSostiene = ({ match }) => {
  const [Data, setData] = useState({});
  const [cargando, setCargando] = useState(true);
  const history = useHistory();
  const [activePay, setActivePay] = useState(false);
  useEffect(() => {
    setCargando(true);
    clienteAxios
      .get(`profiles/suscripciones/estado`, { params: { id: match.params.id } })
      .then(({ data }) => {
        setData(data);
        setCargando(false);
      });
  }, [match]);

  if (cargando) {
    return <Spinner />;
  }

  return (
    <div>
      <CRow>
        <CCol
          md="0"
          style={{
            width: 60,
            height: 60,
            margin: "0px 15px",
            textAlign: "center",
          }}
        >
          <CImg src={Data.imagen} style={{ height: 59 }} />
        </CCol>
        <CCol
          style={{
            paddingBottom: 20,
            marginLeft: 10,
            alignItems: "center",
            textAlign: "start",
          }}
        >
          <div> {Data.nombre} </div>

          <div className="small text-muted">{Data.descripcion}</div>
          <div className="small text-muted">Precio: {Data.precio}</div>
        </CCol>
        <CCol>
          <CRow>
            <CButton
              size="sm"
              color="danger"
              onClick={() => setActivePay(true)}
              style={{ textAlign: "end", marginTop: 20, marginLeft: 10 }}
              disabled={Data.saldo === 0}
            >
              <Icon icon="ri:money-dollar-circle-fill" width={25} />
              Saldo Pendiente :{" "}
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              })
                .format(Data.saldo)
                .replace("$", "RD$ ")}
            </CButton>
          </CRow>
        </CCol>
      </CRow>
      <CRow>
        <CCol
          md="6"
          style={{
            paddingTop: 20,
            marginLeft: 10,
          }}
        >
          <h3 className="text-primary">Historico de Pagos</h3>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <table className="table table-hover table-outline mb-0  d-sm-table">
            <thead className="thead-light">
              <tr>
                <th>Recibo</th>
                <th>Metodo de Pago</th>
                <th>Pagado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colspan="8" className="text-center">
                    <div
                      className="d-flex justify-content-center"
                      style={{ color: "blue" }}
                    >
                      <div className="spinner-border" role="status"></div>
                      <strong className="ml-1">Cargando....</strong>
                    </div>
                  </td>
                </tr>
              ) : (
                Data.pagos.map((row) => {
                  return (
                    <tr>
                      <td>{row.orden}</td>
                      <td>{row.metodo}</td>
                      <td> {row.abono} </td>
                      <td className="text-left">
                        <CBadge color={getBadge(row.estado)}>
                          {row.estado}
                        </CBadge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton
            size="sm"
            color="success"
            onClick={() => history.push(`/dashboard/`)}
            style={{ textAlign: "end", marginTop: 20 }}
          >
            <Icon icon="material-symbols:exit-to-app-rounded" width={25} />
            Regresar
          </CButton>
          <CButton
            size="sm"
            color="primary"
            onClick={() => setActivePay(true)}
            style={{ textAlign: "end", marginTop: 20, marginLeft: 10 }}
            disabled={Data.saldo === 0}
          >
            <Icon icon="ri:money-dollar-circle-fill" width={25} />
            Realizar Pago
          </CButton>
        </CCol>
      </CRow>
      <SostienePay
        close={() => setActivePay(false)}
        show={activePay}
        suscripcion={Data}
      />
    </div>
  );
};

export default EstadoSostiene;
