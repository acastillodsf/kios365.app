import {
  CBadge,
  CButton,
  CCol,
  CDataTable,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import clienteAxios from "src/config/axios";
 import { Spinnerblue } from "src/reusable/Spinner";

const getBadge = (status) => {
  switch (status) {
    case 1:
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case 0:
      return "danger";
    default:
      return "primary";
  }
};

export const RegistroSearch = ({ tipomovi, title, active, setActive }) => {
  const [consultando, setConsultando] = useState([]);
  const [Consulta, setConsulta] = useState([]);
  const history = useHistory();
  const [search, setSeach] = useState({
    fechaini: moment().format("YYYY-MM-DD"),
    fechafin: moment().format("YYYY-MM-DD"),
  });
  const handleChangeConsulta = (e) => {
    setSeach({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const consulta = () => {
    setConsultando(true);
    clienteAxios.get(`/facturas/facturing/search`,{
        params : search
    })
      .then(({ data }) => {
        setConsultando(false);
        setConsulta(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => active && consulta(), [search, active]);
  return (
    <CModal
      show={active}
      onClose={() => setActive(!active)}
      color="success"
      size="xl"
      closeOnBackdrop={false}
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow style={{marginBottom:20}} >
          <CCol xs="3">
            <CLabel htmlFor="company">Desde : </CLabel>
            <CInput
              value={search.fechaini}
              type="date"
              name="fechaini"
              onChange={handleChangeConsulta}
            />
          </CCol>
          <CCol xs="3">
            <CLabel htmlFor="company">Hasta :</CLabel>
            <CInput
              value={search.fechafin}
              type="date"
              name="fechafin"
              onChange={handleChangeConsulta}
            />
          </CCol>
        </CRow>
        {consultando ? (
          <Spinnerblue  />
        ) : (
          <CDataTable
            items={Consulta}
            fields={[
              { key: "documento", label: "Documento" },
              { key: "fecha", label: "fecha" },
              { key: "recibo", label: "Referencia" },
              { key: "nombre", label: "Beneficiario" },
              { key: "estado", label: "Estado" },
              { key: "abono", label: "Monto Pagado" },
              {
                key: "Opciones",
                label: "Opciones",
                // _style: { width: "250px" },
                sorter: false,
                filter: false,
              },
            ]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              abono: (item) => (
                <td>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                    .format(item.abono)
                    .replace("$", "")}
                </td>
              ),
              montocomision: (item) => (
                <td>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                    .format(item.montocomision)
                    .replace("$", "")}
                </td>
              ),
              isr: (item) => (
                <td>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                    .format(item.isr)
                    .replace("$", "")}
                </td>
              ),
              estado: (item) => (
                <td> 
                  <CBadge color={getBadge(item.estado)}>{item.estado===1 ? "Activo" : "Anulado"}</CBadge>
                </td>
              ),

              Opciones: (item) => {
                return (
                  <td className="py-2">
                    {/* <CButton
                      color="danger"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        swal({
                          title: `Anular Documento ${item.documento}`,
                          text: `Estas seguro de que deseas Anular? `,
                          icon: "warning",
                          buttons: ["No", "Si"],
                        }).then((respuesta) => {
                          if (respuesta) {
                            onCancell({
                              documento:item.documento
                            })
                          }
                        });
                      }}
                    >
                      Cancelar
                    </CButton>
                      {" "}
 
                  {" "} */}
                    <CButton
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      disabled
                      onClick={() => {
                        setActive(false);
                        // history.push(`/recibo/${item.documento}`);
                      }}
                    >
                      Visualizar
                    </CButton>
                  </td>
                );
              },
            }}
          />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setActive(!active)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
