import React, { useEffect, useState, Fragment } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
  CInput,
  CImg,
  CCardTitle,
  CBadge,
} from "@coreui/react";

import Spinner, { DisabledAutorization } from "src/reusable/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getconsultaProducto } from "../../actions/sociosEstadoCuentaAction";

import swal from "sweetalert";
import Primerdeposito from "./Primerdeposito";
import { ListaCertificados, ListaCuenta, ListaPrestamos } from "./ListaCuenta";
import { InviteGana } from "./inviteGana";
import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";

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

const ProductoCard = ({ data }) => {
  return (
    <CRow>
      <CCol
        md="0"
        style={{
          width: 60,
          height: 60,
          margin: "0px 15px",
          textAlign: "center",
        }}
      >
        <CImg src={data.imagen} style={{ height: 59 }} />
      </CCol>
      <CCol
        style={{
          paddingBottom: 20,
          marginLeft: 10,
          alignItems: "center",
          textAlign: "start",
        }}
      >
        <div> {data.nombre} </div>

        <div className="small text-muted">{data.descripcion}</div>
        <div className="small text-muted">Precio: {data.precio}</div>
      </CCol>
    </CRow>
  );
};

const Dashboard = ({ match }) => {
  const history = useHistory();
  const [cargando, setCargando] = useState(true);
  const [Data, setData] = useState({});

   

  //Fin de Impresion

  return (
    <Fragment>

 
    </Fragment>
  );
};

export default Dashboard;
