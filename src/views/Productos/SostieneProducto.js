import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CImg,
  CLabel,
  CModal,
  CModalBody,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import clienteAxios from "src/config/axios";
import { SelectCustom } from "./SelectCustom";
import { SostieneShop } from "./SostieneShop";

export const SostieneProducto = () => {
  const [Productos, setProductos] = useState([]);
  const [Shop, SetShop] = useState({
    show: false,
    producto: {},
  });
  const ConsultaProducto = () => {
    clienteAxios.get("/productos").then(({ data }) => setProductos(data));
  };

  const Seleccionar = (e) => {
    SetShop({
      show: true,
      producto: e,
    });
  };

  useEffect(() => ConsultaProducto(), []);
  console.log(Shop);
  return (
    <div>
      <h1>Productos disponibles.</h1>
      <CRow>
        {Productos.map((r) => {
          return (
            <CCol md="12">
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol md="3">
                      <CImg src={r.imagen} style={{ width: "100%" }} />
                    </CCol>
                    <CCol>
                      <CRow>
                        <h4>{r.nombre}</h4>
                      </CRow>
                      <CRow>
                        <p>{r.descripcion}</p>
                      </CRow>
                    </CCol>
                  </CRow>
                  <CRow style={{ displey: "flex", justifyContent: "flex-end" }}>
                    <CButton color="primary" onClick={() => Seleccionar(r)}>
                      Obtener
                    </CButton>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          );
        })}
      </CRow>
      <SostieneShop
        show={Shop.show}
        producto={Shop.producto}
        close={() => {
          SetShop({
            show: false,
            producto: {},
          });
        }}
      />
    </div>
  );
};

export default SostieneProducto;
