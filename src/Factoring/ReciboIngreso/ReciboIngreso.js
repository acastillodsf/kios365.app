import { CButton, CCard, CCol, CInput, CLabel, CRow } from "@coreui/react";
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import clienteAxios from "src/config/axios";
import { Downloading } from "src/reusable/Spinner";
import { RegistrosToolsAdeudado } from "../Facturas/RegistrosTools";
import { CustomSelectAccount } from "../Facturas/CustomSelectAccount";
import NumberFormat from "react-number-format";
import swal from "sweetalert";
import { RegistroSearch } from "./RegistroSearch";

const DefaultForm = {
  secuencia: 0,
  documento: "",
  cliente: { value: "0", label: "Seleccione" },
  fecha: moment().format("YYYY-MM-DD"),
  vencimiento: moment().format("YYYY-MM-DD"),
  recepcion: moment().format("YYYY-MM-DD"),
  recibo: "",
  condicion: 0,
  orden: "",
  rnc: "",
  ncf: "",
  direccion: "",
  nota: "",
  files: [],
  detalle: [],
};

export const ReciboIngreso = ({ match }) => {
  const [Consultando, setConsultando] = useState(false);
  const [DataForm, setDataForm] = useState(DefaultForm);
  const [Suplidores, setSuplidores] = useState([]);
  const [searchActive, setsearchActive] = useState(false);

  const consultaSuplidores = async () => {
    clienteAxios
      .get("/facturas/clientes/list")
      .then(({ data }) => {
        setSuplidores(data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  useEffect(() => {
    console.log(match.params.id)
    if (match.params.id !== undefined) {
      setConsultando(true);
      clienteAxios
        .get(`/facturas/recibo/saving`, {
          params: {
            documento: match.params.id,
          },
        })
        .then(({ data }) => {
          setConsultando(false);
          setDataForm(data);
        });
    }
  }, [match]);

  useEffect(() => {
    consultaSuplidores();
  }, []);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "condicion":
        setDataForm({
          ...DataForm,
          [e.target.name]: e.target.value,
          vencimiento: moment(DataForm.fecha)
            .add("d", parseInt(e.target.value))
            .format("YYYY-MM-DD"),
        });
        break;
      case "cliente":
        clienteAxios
          .get(`/facturas/ingreso/xpagar`, {
            params: {
              cliente: e.target.value.value,
            },
          })
          .then(({ data }) => {
            setDataForm({
              ...DataForm,
              [e.target.name]: e.target.value,
              direccion: e.target.value.direccion,
              rnc: e.target.value.rnc,
              detalle: data,
            });
          })
          .catch(() => {
            setDataForm({
              ...DataForm,
              [e.target.name]: e.target.value,
              direccion: e.target.value.direccion,
              rnc: e.target.value.rnc,
              detalle: [],
            });
          });

        break;
      default:
        setDataForm({
          ...DataForm,
          [e.target.name]: e.target.value,
        });
        break;
    }
  };

  const SalvarFactura = async () => {
    swal({
      title: "Deseas Salvar los Cambios",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        clienteAxios.post("/facturas/recibo/saving", DataForm)
          .then(({ data }) => {
            setDataForm(DefaultForm);
             swal({
              title: `Registro ${data} salvado Exitosamente`,
              icon: "info",
            });
          })
          .catch((e) => {
            console.log(DataForm);
            console.warn(e.response.data);
          });
      }
    });
  };

  const calabono = DataForm.detalle.map((i) => {
    return parseFloat(i.abono);
  });
  const calsaldo = DataForm.detalle.map((i) => {
    return parseFloat(i.saldo);
  });

  const abono = calabono.reduce((prev, next) => prev + next, 0);
  const saldo = calsaldo.reduce((prev, next) => prev + next, 0);

  const ComponetValorFac = (campo, item, id) => {
    const valor = campo === "abono" ? item.abono : item.retencion;
    return (
      <td>
        <NumberFormat
          className="form-control text-right"
          value={campo === "abono" ? item.abono : item.retencion}
          name={campo}
          style={{ borderColor: isNaN(valor) ? "red" : "" }}
          thousandSeparator={true}
          //   prefix={`${divisa}$ `}
          onValueChange={(values) => {
            const { value } = values;

            const seleccion = [];

            // eslint-disable-next-line array-callback-return
            DataForm.detalle.map((row, index) => {
              id === index
                ? seleccion.push({
                    ...row,
                    [campo]: parseFloat(value),
                  })
                : seleccion.push({
                    ...row,
                  });
            });

            setDataForm({
              ...DataForm,
              detalle: seleccion,
            });
          }}
        />
      </td>
    );
  };

  return (
    <div>
      {Consultando && <Downloading value={"Cargando Transaccion."} />}
      <CRow>
        <CCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            icon="icon-park-outline:history-query"
            width={50}
            color="#65a30d"
            style={{ margin: 10, marginLeft: 0 }}
          />
          <h2>Recibo de Ingreso Clientes</h2>
        </CCol>
        <CCol style={{ textAlign: "end" }}>
          {DataForm.documento && (
            <p style={{ color: "red" }}>
              Editando Documento {DataForm.documento}
            </p>
          )}
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={12}>
          <CCard
            style={{
              background: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          >
            <CCol>
              <CRow>
                <CCol lg={6}>
                  <div>
                    <CLabel htmlFor="company">Cliente</CLabel>
                    <CustomSelectAccount
                      data={[
                        ...Suplidores,
                      ]}
                      value={DataForm.cliente}
                      //   onchange={(e) => console.log(e)}
                      name="cliente"
                      onChange={handleChange}
                    />
                  </div>
                </CCol>
                <CCol xs="3">
                  <RegistrosToolsAdeudado
                    label="SALDO PENDIENTE"
                    value={saldo}
                  />
                </CCol>
                <CCol xs="3">
                  <RegistrosToolsAdeudado label="MONTO INGRESO" value={abono} />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CRow>
                    <CCol xs="3">
                      <CLabel htmlFor="company">Fecha de Ingreso</CLabel>
                      <CInput
                        id="fecha"
                        value={DataForm.fecha}
                        onChange={handleChange}
                        name="fecha"
                        type="date"
                      />
                    </CCol>

                    <CCol xs="3">
                      <CLabel htmlFor="company">No. de Recibo</CLabel>
                      <CInput
                        id="recibo"
                        value={DataForm.recibo}
                        onChange={handleChange}
                        name="recibo"
                      />
                    </CCol>

                    <CCol xs="6">
                      <RegistrosToolsAdeudado
                        label="BALANCE"
                        value={saldo - abono}
                      />
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CCard>
        </CCol>
      </CRow>

      <CRow style={{ marginTop: 15 }}>
        <CCol>
          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                {/* style={{ width: "30rem" }}> */}
                <th>#</th>
                <th>Registro</th>
                <th>Fecha</th>
                <th>Factura</th>
                <th>Importe</th>
                <th>Balance Ant.</th>
                <th style={{ width: "10rem" }}>Abono</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {DataForm.detalle.map((row, index) => {
                let balance = row.saldo - row.abono;
                balance = isNaN(balance) ? 0 : balance;
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td> {row.documento} </td>
                    <td> {moment(row.fecha).format("YYYY-MM-DD")} </td>
                    <td> {row.factura} </td>
                    <td>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(row.total)
                        .replace("$", "RD$ ")}{" "}
                    </td>
                    <td>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(row.saldo)
                        .replace("$", "RD$ ")}{" "}
                    </td>
                    {ComponetValorFac("abono", row, index)}
                    <td style={{ color: balance < 0 ? "red" : "" }}>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(balance)
                        .replace("$", "RD$ ")}{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CCol>
      </CRow>
      <CRow style={{ marginTop: 20, marginBottom: 30 }}>
        <CCol>
          <CButton
            color="success"
            onClick={SalvarFactura}
            style={{ width: 200 }}
          >
            <Icon
              icon="material-symbols:save-as-outline"
              width={25}
              // color="#65a30d"
              style={{ margin: 10, marginLeft: 0 }}
            />
            Salvar
          </CButton>
        </CCol>
        <CCol style={{ textAlign: "end" }}>
          <CButton
            color="success"
            onClick={() => setsearchActive(true)}
            style={{ width: 200, marginRight: 10 }}
          >
            <Icon
              icon="et:search"
              width={25}
              // color="#65a30d"
              style={{ margin: 10, marginLeft: 0 }}
            />
            Buscar
          </CButton>
          <CButton
            color="warning"
            onClick={() => {
              swal({
                title: "Deseas Cancelar Cambios",
                icon: "warning",
                buttons: ["No", "Si"],
              }).then((respuesta) => {
                if (respuesta) {
                  setDataForm(DefaultForm);
                }
              });
            }}
            style={{ width: 200 }}
          >
            <Icon
              icon="material-symbols:save-as-outline"
              width={25}
              // color="#65a30d"
              style={{ margin: 10, marginLeft: 0 }}
            />
            Cancelar
          </CButton>
        </CCol>
      </CRow>
      <RegistroSearch
        tipomovi={2001}
        title="Recibos de Cliente"
        active={searchActive}
        setActive={setsearchActive}
      />
    </div>
  );
};

export default ReciboIngreso;
