import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import clienteAxios from "src/config/axios";
 import { Downloading } from "src/reusable/Spinner";
import swal from "sweetalert";

export const ModalAddProveedor = ({ suplidor, name, onChange }) => {
  const [salvando,setSalvando] = useState(false)
  const [Data, setData] = useState({
    codigo : 0,
    rnc: "",
    nombre: "",
    direccion: "",
    telefonos: "",
    correo: "",
    contacto : ""
  });
  const handleChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  const salvarSuplidor = ()=>{
    setSalvando(true)
    clienteAxios.post(`/facturas/clientes/add`,Data).then(({data})=>{
      setSalvando(false)
      onChange({
        target: {
          name: name,
          value: data
        },
      });
    }).catch((e)=>{
      setSalvando(false)
      swal({
        title : "Proveedor",
        text : e.response.data,
        icon: 'info',
        
      })
    })
       
      
  }
  return (
    <CModal
      show={suplidor.label === "Agregar Nuevo Cliente"}
      color="success"
      closeOnBackdrop={false}
      centered
    >
      <CModalBody>
      {salvando && <Downloading text="Salvando" /> }
        <CRow style={{ marginBottom: 20 }}>
          <CCol
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              icon="material-symbols:user-attributes"
              width={50}
              color="#65a30d"
              style={{ margin: 10, marginLeft: 0 }}
            />
            <h2>Datos del Cliente</h2>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">RNC </CLabel>
              </CCol>
              <CCol xs="12" md="5">
                <CInput
                  id="rnc"
                  value={Data.rnc}
                  className="mb-3"
                  
                  onChange={handleChange}
                  name="rnc"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Nombre </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="nombre"
                  value={Data.nombre}
                  className="mb-3"
                  
                  onChange={handleChange}
                  name="nombre"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Direccion </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="direccion"
                  value={Data.direccion}
                  className="mb-3"
                  
                  onChange={handleChange}
                  name="direccion"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Telefonos </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="telefonos"
                  value={Data.telefonos}
                  className="mb-3"
                  
                  onChange={handleChange}
                  name="telefonos"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Correo </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="correo"
                  value={Data.correo}
                  className="mb-3"
                  
                  onChange={handleChange}
                  name="correo"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Contacto </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="contacto"
                  value={Data.contacto}
                  className="mb-3"
                  
                  onChange={handleChange}
                  name="contacto"
                />
              </CCol>
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>

      <CModalFooter>
        <CCol>
          <CButton color="success" onClick={salvarSuplidor} >Salvar</CButton>{" "}
        </CCol>
        <CCol style={{textAlign:'end'}} >
          <CButton
            onClick={() => {
              onChange({
                target: {
                  name: name,
                  value: { value: "0", label: "Seleccione" },
                },
              });
            }}
          >
            Cancelar
          </CButton>
        </CCol>
      </CModalFooter>
    </CModal>
  );
};
