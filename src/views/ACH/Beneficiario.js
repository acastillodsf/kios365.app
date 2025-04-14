import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CInput,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";
import { PerfilBeneficiario } from "./PerfilBeneficiario";
import swal from "sweetalert";

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

const DefaultPerfil = {
  beneficiario: 0,
  banco: {
    id: 0,
    nombre: "Cooperativa",
  },
  cuenta: "",
  cuentatipo: "Cuenta de Ahorro",
  moneda: "DOP",
  documento: "",
  documentotipo: "",
  nombre: "",
  notificacion: "acastillo@dasoft.com.do",
};

export const Beneficiario = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [consulta, setConsulta] = useState([]);
  const [cargando, setCargando] = useState();
  const [perfil, setPerfil] = useState({ show: false, data: DefaultPerfil });

  const consultar = () => {
    setCargando(true);
    clienteAxios
      .get("/transferencias/beneficiario/consulta")
      .then(({ data }) => {
        setConsulta(data);
        setCargando(false);
      })
      .catch(() => {
        setCargando(false);
      });
  };
  useEffect(() => {
    consultar();
  }, []);

  console.log(consulta);
  return (
    <CRow>
      <CCol md="12" xl="11">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                <div class="text-md-left mt-0">
                  <h3 class="text-primary">Beneficiario </h3>
                </div>
              </CCol>
            </CRow>
            <div className="row my-2 mx-0">
              <CCol xl="7" className="d-flex align-items-center p-0">
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
                      setSearchTerm(e.target.value);
                    }}
                  />
                </div>
              </CCol>
              <CCol
                xl="5"
                className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
              >
                <div className="card-header-actions">
                  <form id="form_1">
                    <input name="PWToken" type="hidden" id="PWToken" />
                    <CButton
                      color="primary"
                      variant="outline"
                      size="xl"
                      active
                      value="Checkout"
                      id="btnCheckout"
                      block
                      aria-pressed="true"
                      onClick={() =>
                        setPerfil({ show: true, data: DefaultPerfil })
                      }
                    >
                      Adicionar Beneficiario
                    </CButton>
                  </form>
                </div>
              </CCol>
            </div>
            <table className="table table-hover table-outline mb-0  d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th>Banco</th>
                  <th>Beneficiario</th>
                  <th>Tipo</th>
                  <th>Producto</th>
                  <th>Estado</th>
                  <th>Opciones</th>
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
                  consulta.map((row) => {
                    return (
                      <tr>
                        <td>{row.banco.nombre}</td>
                        <td>{row.nombre}</td>
                        <td>{row.cuentatipo}</td>
                        <td>{row.cuenta}</td>
                        <td className="text-left">
                          <CBadge color={getBadge(row.activo)}>
                            {row.activo === 1 ? "Activo" : "Eliminado"}
                          </CBadge>
                        </td>
                        <td>
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              setPerfil({ show: true, data: row });
                            }}
                          >
                            Editar
                          </CButton>
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              Swal.fire({
                                title: "Beneficiario",
                                text: "Estas Seguro que deseas Eliminar Beneficiario ?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Si, Estoy Seguro!",
                                cancelButtonText: "Cancelar",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  clienteAxios
                                    .delete(
                                      `/transferencias/beneficiario/perfil`,
                                      {
                                        params: {
                                          cuenta: row.cuenta,
                                          cuentatipo: row.cuentatipo,
                                          documento: row.documento,
                                          beneficiario: row.beneficiario,
                                        },
                                      }
                                    )
                                    .then(() => {
                                      consultar();
                                    })
                                    .catch((e) => {
                                      swal({
                                        title: "Datos de Benerificario",
                                        text: e.response.data,
                                        icon: "warning",
                                        buttons: "Aceptar",
                                      });
                                    });
                                }
                              });
                            }}
                          >
                            Eliminar
                          </CButton>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <PerfilBeneficiario
        data={perfil.data}
        show={perfil.show}
        close={(e) => {
          if (e) {
            consultar();
          }

          setPerfil({ show: false, data: DefaultPerfil });
        }}
      />
    </CRow>
  );
};

export default Beneficiario;
