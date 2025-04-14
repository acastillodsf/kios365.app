import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import clienteAxios from "src/config/axios";
import Spinner from "src/reusable/Spinner";
import { CustomSelectAccount } from "../Facturas/CustomSelectAccount";
import { RegistrosToolsAdeudado } from "../Facturas/RegistrosTools";

export const CuentaPorPagar = () => {
  const history = useHistory();
  const [consultando, setConsultando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [Suplidores, setSuplidores] = useState([]);

  const [transacciones, setTransacciones] = useState([]);
  const [componentes, setComponentes] = useState([]);
  const today = moment().format("YYYY-MM-DD");
  const [consulta, setConsulta] = useState({
    fechaini: "0001-01-01",
    fechafin: today,
    cliente : {
        value : 0,
        label : "-Seleccione-"
    }
  });

  const { fechaini, fechafin } = consulta;
  const handleChange = (e) => {
    setConsulta({
      ...consulta,
      [e.target.name]: e.target.value,
    });
  };
  const consultaSuplidores = async () => {
    clienteAxios.get("/facturas/choferes/list")
      .then(({ data }) => {
        setSuplidores(data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  const handleEnviar = async () => {
    setConsultando(true);
    try {
      const peticion = await clienteAxios.get(
        "/facturas/report/cuentaporPagar",
        {
          params: {
            ...consulta,
            empleado: consulta.empleado.value,
          },
        }
      );
      console.log(peticion.data);
      setTransacciones(peticion.data);
      setConsultando(false);
    } catch (error) {
      setConsultando(false);
    }
  };

  useEffect(()=>consultaSuplidores(),[])


  const calsaldo = transacciones.map((i) => {
    return parseFloat(i.saldo);
  });
  const caltotal = transacciones.map((i) => {
    return parseFloat(i.disponible);
  });
  const calfacturing = transacciones.map((i) => {
    return parseFloat(i.facturing);
  });
  const saldo = calsaldo.reduce((prev, next) => prev + next, 0);
  const disponible = caltotal.reduce((prev, next) => prev + next, 0);
  const facturing = calfacturing.reduce((prev, next) => prev + next, 0);

  return (
    <>
      <CRow>
        <CCol lg={10}>
          <h3> Cuenta por Pagar </h3>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="8">
          <CCard>
            <CCardHeader>Consulta</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol lg={12}>
                <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Chofer : </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <CustomSelectAccount
                      data={Suplidores}
                      value={consulta.empleado}
                      //   onchange={(e) => console.log(e)}
                      name="empleado"
                      onChange={handleChange}
                    />
                    </CCol>
                  </CFormGroup>
                   
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Desde </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="fechaini"
                        className="form-control"
                        type="date"
                        value={fechaini}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Hasta </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="fechafin"
                        className="form-control"
                        type="date"
                        value={fechafin}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              {consultando ? (
                <Spinner />
              ) : (
                <>
                  <CButton onClick={handleEnviar} size="sm" color="success">
                    <CIcon name="cil-scrubber" /> Consultar
                  </CButton>{" "}
                  {/* <CButton
                    onClick={() => {
                      ExportCSV(transacciones, "Balance General Socios");
                    }}
                    size="sm"
                    color="success"
                  >
                    <CIcon name="cil-scrubber" /> Export CSV
                  </CButton>{" "} */}
                  <CButton
                    onClick={() => history.push("/")}
                    size="sm"
                    color="danger"
                  >
                    <CIcon name="cil-ban" /> Salir
                  </CButton>
                </>
              )}
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      <CCard>
        <CCardHeader>Consulta</CCardHeader>
        <CCardBody style={{ fontSize: 10 }}>
          <CDataTable
            items={transacciones}
            fields={[
              {
                key: "documento",
                label: "documento",
                sorter: false,
                filter: true,
              },
              {
                key: "fecha",
                label: "Fecha",
                sorter: false,
                filter: false,
              },
              {
                key: "factura",
                label: "Factura",
                _style: { width: "200px" },
                sorter: false,
                filter: false,
              },
              {
                key: "nombre",
                label: "Nombre",
                sorter: false,
                filter: false,
              },
              {
                key: "estado",
                label: "Estado",
                sorter: false,
                filter: false,
              },

              {
                key: "saldofac",
                label: "Saldo Factura",
                sorter: false,
                filter: false,
              },
              {
                key: "saldo",
                label: "Saldo",
                sorter: false,
                filter: false,
              },
              {
                key: "disponible",
                label: "Disponible",
                sorter: false,
                filter: false,
              },
            ]}
            striped
            itemsPerPage={10}
            pagination
          />
          <CRow>
          <CCol md={4}></CCol>
          <CCol>
            <RegistrosToolsAdeudado
                    label="Saldo Pendiente"
                    value={saldo}
                  />
            </CCol>
            <CCol>
            <RegistrosToolsAdeudado
                    label="Transito"
                    value={facturing}
                  />
            </CCol>
            
            <CCol>
            <RegistrosToolsAdeudado
                    label="Disponible"
                    value={disponible}
                  />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CuentaPorPagar;
