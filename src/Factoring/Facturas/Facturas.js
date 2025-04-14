import React, { useEffect, useState } from "react";
import { CustomSelectAccount } from "./CustomSelectAccount";
import { RegistroDetalles } from "./RegistroDetalles";
 import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CInput,
  CInputGroup,
  CLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { Icon } from "@iconify/react";
import { RegistrosToolsAdeudado } from "./RegistrosTools";
import moment from "moment";
import { ModalAddProveedor } from "./ModalAddProveedor";
import { ButtonAceptar } from "src/Componentes/Button/CustomerButton";
import swal from "sweetalert";
import { RegistroSearch } from "./RegistroSearch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Downloading } from "src/reusable/Spinner";
import clienteAxios from "src/config/axios";

const DefaultForm = {
  secuencia: 0,
  documento: "",
  cliente: { value: "0", label: "Seleccione" },
  fecha: moment().format("YYYY-MM-DD"),
  vencimiento: moment().format("YYYY-MM-DD"),
  recepcion: moment().format("YYYY-MM-DD"),
  factura: "",
  condicion: 0,
  orden: "",
  rnc: "",
  ncf: "",
  direccion: "",
  nota: "",
  files: [],
  detalle: [
    {
      id: 1,
      empleado: { value: "", label: "" },
      descripcion: "",
      monto: 0,
      comision : 0,
      montocomision : 0,
      importe : 0
    },
  ],
};

export const RegistrosFacturaSuplidor = ({ match }) => {
  const [Account, setAccount] = useState([]);
  const [Suplidores, setSuplidores] = useState([]);
  const [DataForm, setDataForm] = useState(DefaultForm);
  const [searchActive, setsearchActive] = useState(false);
  const [Consultando, setConsultando] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (match.params.id !== undefined) {
      setConsultando(true);
      clienteAxios.get(`/facturas/saving`, {
        params: {
          documento: match.params.id,
        },
      }).then(({ data }) => {
        setConsultando(false);
        setDataForm(data);
      });
    }
  }, [match]);
  const consultaAccount = async () => {
    clienteAxios.get("/facturas/choferes/list")
      .then(({ data }) => {
        setAccount(data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  const consultaSuplidores = async () => {
    clienteAxios.get("/facturas/clientes/list")
      .then(({ data }) => {
        setSuplidores(data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  const SalvarFactura = async () => {
    swal({
      title: "Deseas Salvar los Cambios",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        clienteAxios.post("/facturas/saving", DataForm)
          .then(({ data }) => {
            setDataForm(DefaultForm);
            history.push(`/proveedores/factura`);
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

  useEffect(() => {
    consultaAccount();
    consultaSuplidores();
  }, []);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "condicion":
        setDataForm({
          ...DataForm,
          [e.target.name]: e.target.value,
          vencimiento: moment(DataForm.fecha).add("d",parseInt(e.target.value)).format("YYYY-MM-DD"),
        });
        break;
      case "cliente":
        setDataForm({
          ...DataForm,
          [e.target.name]: e.target.value,
          direccion: e.target.value.direccion,
          rnc: e.target.value.rnc,
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
  const calsaldo = DataForm.detalle.map((i) => {
    return parseFloat(i.monto);
  });
  const calcomision = DataForm.detalle.map((i) => {
    return parseFloat(i.montocomision);
  });

  const saldo = calsaldo.reduce((prev, next) => prev + next, 0);
  const saldocomision = calcomision.reduce((prev, next) => prev + next, 0);

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
          <h2>Registro de Nomina Cliente</h2>
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
                <CCol lg={5}>
                  <div>
                    <CLabel htmlFor="company">Cliente</CLabel>
                    <CustomSelectAccount
                      data={[
                        { value: "-1", label: "Agregar Nuevo Cliente" },
                        ...Suplidores,
                      ]}
                      value={DataForm.cliente}
                      //   onchange={(e) => console.log(e)}
                      name="cliente"
                      onChange={handleChange}
                    />
                    <ModalAddProveedor
                      suplidor={DataForm.cliente}
                      name="cliente"
                      onChange={(e) => {
                        consultaSuplidores();
                        handleChange(e);
                      }}
                    />
                  </div>
                </CCol>
                <CCol xs="2"></CCol>
                <CCol xs="5">
                  <RegistrosToolsAdeudado
                    label="SALDO PENDIENTE"
                    value={saldo}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="3">
                  <CLabel htmlFor="company">Direccion</CLabel>
                  <CTextarea
                    id="direccion"
                    value={DataForm.direccion}
                    onChange={handleChange}
                    name="direccion"
                    type="date"
                    rows={5}
                  />
                </CCol>
                <CCol>
                  <CRow>
                    <CCol md="3">
                      <CLabel htmlFor="company">Condicion</CLabel>

                      <CSelect
                        className="mb-3"
                        aria-label="Large select example"
                        value={DataForm.condicion}
                        name="condicion"
                        onChange={handleChange}
                      >
                        <option value="0">
                          Pago a la recepción del servicio
                        </option>
                        <option value="15">Pago en 15 días</option>
                        <option value="30">Pago en 30 días</option>
                        <option value="60">Pago en 60 días</option>
                      </CSelect>
                    </CCol>
                    <CCol xs="3">
                      <CLabel htmlFor="company">Fecha de la Factura</CLabel>
                      <CInput
                        id="fecha"
                        value={DataForm.fecha}
                        onChange={handleChange}
                        name="fecha"
                        type="date"
                      />
                    </CCol>
                    <CCol xs="3">
                      <CLabel htmlFor="company">Fecha de la vencimiento</CLabel>
                      <CInput
                        id="vencimiento"
                        value={DataForm.vencimiento}
                        onChange={handleChange}
                        name="vencimiento"
                        type="date"
                      />
                    </CCol>
                    <CCol xs="3">
                      <CLabel htmlFor="company">No. de Factura</CLabel>
                      <CInput
                        id="factura"
                        value={DataForm.factura}
                        onChange={handleChange}
                        name="factura"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="3">
                      <CLabel htmlFor="company">RNC</CLabel>
                      <CInput
                        id="rnc"
                        value={DataForm.rnc}
                        onChange={handleChange}
                        name="rnc"
                      />
                    </CCol>
                    <CCol xs="3">
                      <CLabel htmlFor="company">Comprobante Fiscal</CLabel>
                      <CInput
                        id="ncf"
                        value={DataForm.ncf}
                        onChange={handleChange}
                        name="ncf"
                      />
                    </CCol>
                    <CCol xs="3">
                      <CLabel htmlFor="company">Fecha de Recepcion</CLabel>
                      <CInput
                        id="recepcion"
                        value={DataForm.recepcion}
                        onChange={handleChange}
                        name="recepcion"
                        type="date"
                      />
                    </CCol>
                    <CCol xs="3">
                      <CLabel htmlFor="company">No. de Orden/Pedido</CLabel>
                      <CInput
                        id="orden"
                        value={DataForm.orden}
                        onChange={handleChange}
                        name="orden"
                      />
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CCard>
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
            <CCardBody>
              <RegistroDetalles
                data={Account}
                detalle={DataForm.detalle}
                saldo={saldo}
                saldocomision = {saldocomision}
                onchange={(e) => {
                  setDataForm({
                    ...DataForm,
                    detalle: e,
                  });
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="4">
          <CLabel
            htmlFor="company"
            style={{
              color: "#6b6c72",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Notas
          </CLabel>
          <CTextarea
            name="nota"
            onChange={handleChange}
            value={DataForm.nota}
          />
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
        title="Registro de Factura de Proveedores"
        active={searchActive}
        setActive={setsearchActive}
      />
    </div>
  );
};

export default RegistrosFacturaSuplidor;
