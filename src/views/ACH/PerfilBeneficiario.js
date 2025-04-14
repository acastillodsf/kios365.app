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
  CSelect,
} from "@coreui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { SelectBanco } from "../transferencias/SelectBanco";
import clienteAxios from "src/config/axios";
import swal from "sweetalert";

const defaultTypeCuenta = [
  {
    id: 1,
    description: "Cuenta de Ahorro",
  },
  {
    id: 2,
    description: "Cuenta Corriente",
  },
  {
    id: 3,
    description: "Prestamo",
  },
];

export const PerfilBeneficiario = ({ show, data, close }) => {
  const [perfil, setPerfil] = useState(data);
  const [typeCuenta, setTypeCuenta] = useState(defaultTypeCuenta);
  const [block, setBloack] = useState(false);
  const [valid, setValid] = useState(false);


  const {cuenta} = perfil; 

  const handleChange = (e) => {
      setPerfil({
        ...perfil,
        [e.target.name]: e.target.value,
      });
  };

 

  useEffect(() => {
    setPerfil(data);
  }, [show, data]);

  useEffect(() => {
    if(perfil.banco.id===0){
        clienteAxios
        .get(`/transferencias/beneficiario/validarCuenta`, {
          params: { cuenta: perfil.cuenta, producto: perfil.cuentatipo },
        })
        .then(({data}) => {
            console.log(data)
            setPerfil({
                ...perfil,
                nombre : data.nombres,
                documento : data.cedula,
                documentotipo : data.tipoidentidad
              });
            setValid(true)
        }).catch(()=>{
            setValid(false)
        })
    }
  }, [cuenta]);


  const salvar = () => {
    clienteAxios
        .post(`/transferencias/beneficiario/perfil`, perfil)
        .then(({data}) => {
            close(true)
         }).catch((e)=>{
            swal({
                title : "Datos de Benerificario",
                text : e.response.data,
                icon : 'warning',
                buttons : "Aceptar"
            })
         })
  };



  return (
    <CModal show={show}  onClose={() => close(false)} color="success" size="lg" closeOnBackdrop={false}
    centered>
      <CModalBody>
        <CRow>
          <CCol
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              icon="solar:user-id-bold"
              width={50}
              color="#65a30d"
              style={{ margin: 10 }}
            />
            <h2>Datos de Beneficiario</h2>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Banco</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <SelectBanco
                  name="banco"
                  value={perfil.banco}
                  onChange={handleChange}
                  onType={(e) => setTypeCuenta(e)}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Numero de Cuenta</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CSelect
                  custom
                  name="cuentatipo"
                  id="ccmonth"
                  value={perfil.cuentatipo}
                  onChange={handleChange}
                  disabled={block}
                >
                  <option key={0} value="">
                    [Seleccione ]
                  </option>
                  {typeCuenta.map((row, index) => {
                    return (
                      <option key={index} value={row.description}>
                        {row.description}
                      </option>
                    );
                  })}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CInput
                  name="cuenta"
                  value={perfil.cuenta}
                  disabled={block}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>

            {perfil.banco.id !== 0 && (
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="text-input">Identificacion</CLabel>
                </CCol>
                <CCol xs="12" md="4">
                  <CSelect
                    custom
                    name="documentotipo"
                    id="ccmonth"
                    value={perfil.documentotipo}
                    onChange={handleChange}
                    disabled={block}
                  >
                    <option key={0} value="">
                      [Seleccione ]
                    </option>
                    {[
                      { id: 1, description: "CEDULA" },
                      { id: 2, description: "PASAPORTE" },
                    ].map((row, index) => {
                      return (
                        <option key={index} value={row.description}>
                          {row.description}
                        </option>
                      );
                    })}
                  </CSelect>
                </CCol>
                <CCol md="4">
                  <CInput
                    name="documento"
                    value={perfil.documento}
                    disabled={block}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
            )}
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Nombre del Beneficiario</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  name="nombre"
                  disabled={perfil.banco.id === 0}
                  value={perfil.nombre}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="4">
                <CLabel htmlFor="text-input">Notificacion</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  name="notificacion"
                  value={perfil.notificacion}
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>

      <CModalFooter>
        <CButton color="success" onClick={salvar}>
          Salvar Cambios
        </CButton>{" "}
        <CButton color="secondary" onClick={() => close(false)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
