import {
  CButton,
  CCard,
  CCol,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
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
  empleado: { value: "0", label: "Seleccione" },
  fecha: moment().format("YYYY-MM-DD"),
  vencimiento: moment().format("YYYY-MM-DD"),
  recepcion: moment().format("YYYY-MM-DD"),
  recibo: "",
  condicion: 0,
  orden: "",
  isr: 0,
  ncf: "",
  direccion: "",
  nota: "",
  files: [],
  detalle: [],
};

export const ReciboPago = ({ match }) => {
  const [Consultando, setConsultando] = useState(false);
  const [DataForm, setDataForm] = useState(DefaultForm);
  const [Choferes, setChoferes] = useState([]);
  const [searchActive, setsearchActive] = useState(false);

  const consultaSuplidores = async () => {
    clienteAxios
      .get("/facturas/choferes/list")
      .then(({ data }) => {
        setChoferes(data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  useEffect(() => {
    console.log(match.params.id);
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
      case "isr":
        const detalle = [];
        DataForm.detalle.map((row) => {
          const montocomision =
            parseFloat(row.comision) === 0
              ? 0
              : (row.saldo * (row.comision / 100)).toFixed(2);
          const isr =
            parseFloat(e.target.value) === 0
              ? 0
              : (row.saldo * (parseFloat(e.target.value) / 100)).toFixed(2);

 
          const porPagar = row.saldo - montocomision - isr;

          detalle.push({
            ...row,
            montocomision,
            isr,
            porPagar,
            abono : row.checked ? porPagar : 0 
          });
        });
        setDataForm({
          ...DataForm,
          [e.target.name]: e.target.value,
          detalle: detalle,
        });
        break;
      case "condicion":
        setDataForm({
          ...DataForm,
          [e.target.name]: e.target.value,
          vencimiento: moment(DataForm.fecha)
            .add("d", parseInt(e.target.value))
            .format("YYYY-MM-DD"),
        });
        break;
      case "empleado":
        clienteAxios
          .get(`/facturas/egresos/xpagar`, {
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
        clienteAxios
          .post("/facturas/pagos/saving", DataForm)
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
    return parseFloat(i.importe);
  });

  const abono = calabono.reduce((prev, next) => prev + next, 0);
  const saldo = calsaldo.reduce((prev, next) => prev + next, 0);

  const ComponetValorFac = (campo, item, id) => {
    const valor = item[campo];
    return (
      <td>
        <NumberFormat
          className="form-control text-right"
          value={item[campo]}
          name={campo}
          style={{ borderColor: isNaN(valor) ? "red" : "" }}
          thousandSeparator={true}
          //   prefix={`${divisa}$ `}
          onValueChange={(values) => {
            const { value } = values;

            const seleccion = [];

            // eslint-disable-next-line array-callback-return
            DataForm.detalle.map((row, index) => {
              if (id === index) {
                switch (campo) {
                  case "comision":
                    const montocomision = (row.saldo * (value / 100)).toFixed(
                      2
                    );
                    const isr =
                      parseFloat(DataForm.isr) === 0
                        ? 0
                        : (row.saldo * (DataForm.isr / 100)).toFixed(2);
                        const porPagar = row.saldo - montocomision - isr;
                    seleccion.push({
                      ...row,
                      [campo]: value,
                      montocomision: montocomision,
                      isr: isr,
                      porPagar : porPagar,
                      abono : row.checked ? porPagar : 0
                    });
                    break;

                  default:
                    seleccion.push({
                      ...row,
                      [campo]: parseFloat(value),
                    });
                    break;
                }
              } else {
                seleccion.push({
                  ...row,
                });
              }
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
          <h2>Recibo de Pago a Choferes</h2>
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
                    <CLabel htmlFor="company">Chofer</CLabel>
                    <CustomSelectAccount
                      data={Choferes}
                      value={DataForm.empleado}
                      //   onchange={(e) => console.log(e)}
                      name="empleado"
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
                  <RegistrosToolsAdeudado label="MONTO A PAGAR" value={abono} />
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
                    <CCol xs="2">
                      <CLabel htmlFor="company">Impuesto ISR</CLabel>
                      <CSelect
                        className="mb-3"
                        aria-label="Large select example"
                        value={DataForm.isr}
                        name="isr"
                        onChange={handleChange}
                      >
                        <option value="0">No</option>
                        <option value="2">2%</option>
                      </CSelect>
                    </CCol>

                    <CCol xs="4">
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

      <CRow style={{ marginTop: 15, fontSize: 10 }}>
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
                <th>Estado</th>
                <th>Balance Ant.</th>
                <th>Comision %</th>
                <th>Monto Comision</th>
                <th>Impuesto ISR</th>
                <th>Por Pagar</th>
                <th>Pagar?</th>
                <th style={{ width: "10rem" }}>Abono</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {DataForm.detalle.map((row, index) => {
                let balance =
                  row.saldo - row.abono - row.montocomision - row.isr;
                balance = isNaN(balance) ? 0 : balance;
                const porPagar = row.saldo - row.montocomision - row.isr;
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
                        .format(row.importe)
                        .replace("$", "")}{" "}
                    </td>
                    <td> {row.estado} </td>
                    <td>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(row.saldo)
                        .replace("$", "")}{" "}
                    </td>
                    {row.estado === "Disponible" ? (
                      <td></td>
                    ) : (
                      ComponetValorFac("comision", row, index)
                    )}
                    <td>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(row.montocomision)
                        .replace("$", "")}{" "}
                    </td>
                    <td>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(row.isr)
                        .replace("$", "")}{" "}
                    </td>
                    <td>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(porPagar)
                        .replace("$", "")}{" "}
                    </td>
                    <td>
                      <CFormGroup
                        variant="checkbox"
                        className="checkbox text-center"
                      >
                        <CInputCheckbox
                          id="checkbox1"
                          name="terminos"
                          checked={row.checked ? true : false}
                          onChange={(e) => {
                            const id = index ; 
                            const seleccion = [];

                            // eslint-disable-next-line array-callback-return
                            DataForm.detalle.map((row, index) => {
                              if (id === index) {
                                  const checked = row.checked===true ? false : true

                                    seleccion.push({
                                      ...row,
                                      
                                      checked ,
                                      abono : checked ? porPagar : 0
                                       
                                    });
 
                             
                              } else {
                                seleccion.push({
                                  ...row,
                                });
                              }
                            });

                            setDataForm({
                              ...DataForm,
                              detalle: seleccion,
                            });
                          }}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="checkbox1"
                        ></CLabel>
                      </CFormGroup>
                    </td>
                     <td style={{ color: abono < 0 ? "red" : "" }}>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(row.abono)
                        .replace("$", "")}{" "}
                    </td>
                    <td style={{ color: balance < 0 ? "red" : "" }}>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(balance)
                        .replace("$", "")}{" "}
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
        title="Recibos de Pagos a Choferes"
        active={searchActive}
        setActive={setsearchActive}
      />
    </div>
  );
};

export default ReciboPago;
