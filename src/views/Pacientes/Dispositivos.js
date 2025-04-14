import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from "@coreui/react";
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import clienteAxios from "src/config/axios";
import EquipoCard from "./Equipo";
import { coopSettings } from "src/config/coop.config";
import { useSelector } from "react-redux";

const RFormat = (value) => {
  return (
    <td className="py-12 textend">
      {Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      })
        .format(value)
        .replace("$", "")}
    </td>
  );
};

export const TransaccionHistorico = ({ ws }) => {

  //finSoket

  const { kioscos, pantallas } = useSelector((state) => state.ws);

  const [searchTermino, setSearchTermino] = useState("")
  const [view, setView] = useState({ show: false, documento: "" });





  return (
    <>
      <CRow>
        <CCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Icon icon="icon-park-outline:phone-booth"
            width={50}
            color="#65a30d"
            style={{ margin: 10, marginLeft: 0 }}
          />
          <h2>Kioscos y Dispositivos ( Monitor de Estado )</h2>
        </CCol>
      </CRow>

      <CRow>
        <CCol md="6">
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="company">Busqueda :</CLabel>
                <CInput
                  placeholder="Termino de Busqueda"
                  name="fechad"
                  value={searchTermino}
                  onChange={e => setSearchTermino(e.target.value)}
                />
              </CFormGroup>
            </CCol>

            <CCol>
              <CFormGroup>
                <CButton color="primary" style={{ marginTop: 25 }}   >
                  <Icon icon="material-symbols:search" width={30} /> Consultar
                </CButton>
              </CFormGroup>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>


      <CRow>
        {
          kioscos
            .map((r, index) => { return <EquipoCard nombre={r.ClientID} posicion={r.confname} sku={r.sku} estatus={r.Estado} key={index} icon="icon-park-outline:phone-booth" /> })}

      </CRow>
      <CRow>

        {
          pantallas
            .map((r, index) => { return <EquipoCard nombre={r.ClientID} posicion={r.confname} sku={r.sku} estatus={r.Estado} key={index} icon="pepicons-pop:monitor" /> })}
      </CRow>


      <CModal show={view.show} size="lg">
        <CModalBody>
          <CRow>
            <CCol>

            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setView({ show: false, documento: "" })}
          >
            <Icon
              icon="pajamas:canceled-circle"
              width={25}
              color="#65a30d"
              style={{ margin: 5 }}
            />{" "}
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default TransaccionHistorico;


