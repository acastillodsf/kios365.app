import CIcon from "@coreui/icons-react";
import { CButton, CRow } from "@coreui/react";
import { setTimeout } from "core-js";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSettingTranscard } from "src/actions/TransCardAction";
import clienteAxios from "src/config/axios";
import { coopSettings } from "src/config/coop.config";
import Spinner, {
  DisabledAutorization,
  Downloading,
} from "src/reusable/Spinner";
import swal from "sweetalert";

export const ButtonCardNet = ({ cuenta, comentario, Amount }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeDigital, setactivate] = useState(false);

  var md5 = require("md5");
  const { TransCard, TransCardConfig, TransCardUserData } = useSelector(
    (state) => state.TransCard
  );

  const [TransactionId, setTransactionId] = useState("");
  const [OrdenID, setOrdenID] = useState("");
  const [process, setProcess] = useState("");
  const [post, setPost] = useState(false);
  const [spin, setSpin] = useState(false);
  useEffect(() => dispatch(getSettingTranscard()), []);

  if (!TransCard) {
    return <Spinner />;
  }

  const PaymentCode = {
    "00": "Aprobada",
    "01": "Llamar al Banco",
    "02": "Llamar al Banco",
    "03": "Comercio Invalido",
    "04": "Rechazada",
    "05": "Rechazada",
    "06": "Error en Mensaje",
    "07": "Tarjeta Rechazada",
    "08": "Llamar al Banco",
    "09": "Request in progress",
    10: "Aprobación Parcial",
    11: "Approved VIP",
    12: "Transaccion Invalida",
    13: "Monto Invalido",
    14: "Cuenta Invalida",
    15: "No such issuer",
    16: "Approved update track 3",
    17: "Customer cancellation",
    18: "Customer dispute",
    19: "Reintentar Transaccion",
    20: "No tomo accion",
    21: "No tomo acción",
    22: "Transaccion No Aprobada",
    23: "Transaccion No Aceptada",
    24: "File update not supported",
    25: "Unable to locate record",
    26: "Duplicate record",
    27: "File update edit error",
    28: "File update file locked",
    30: "File update failed",
    31: "Bin no soportado",
    32: "Tx. Completada Parcialmente",
    33: "Tarjeta Expirada",
    34: "Transacción No Aprobada",
    35: "Transaccion No Aprobada",
    36: "Transaccion No Aprobada",
    37: "Transaccion No Aprobada",
    38: "Transaccion No Aprobada",
    39: "Tarjeta Invalida",
    40: "Función no Soportada",
    41: "Transacción No Aprobada",
    42: "Cuenta Invalida",
    43: "Transacción No Aprobada",
    44: "No investment account",
    51: "Fondos insuficientes",
    52: "Cuenta Invalidad",
    53: "Cuenta Invalidad",
    54: "Tarjeta vencida",
    56: "Cuenta Invalidad",
    57: "Transaccion no permitida",
    58: "Transaccion no permitida en terminal",
    60: "Contactar Adquirente",
    61: "Excedió Limte de Retiro",
    62: "Tarjeta Restringida",
    65: "Excedió Cantidad de Intento",
    66: "Contactar Adquirente",
    67: "Hard capture",
    68: "Response received too late",
    75: "Pin excedio Limte de Intentos",
    77: "Captura de Lote Invalida",
    78: "Intervencion del Banco Requerida",
    79: "Rechazada",
    81: "Pin invalido",
    82: "PIN Required",
    85: "Llaves no disponibles",
    89: "Terminal Invalida",
    90: "Cierre en proceso",
    91: "Host No Disponible",
    92: "Error de Ruteo",
    94: "Duplicate Transaction",
    95: "Error de Reconciliación",
    96: "Error de Sistema",
    97: "Emisor no Disponible",
    98: "Excede Limete de Efectivo",
    99: "CVV or CVC Error response",
    TF: "Solicitud de autenticación rechazada o no completada.",
  };

  const md5Get = () => {
    // console.log(`${TransCardConfig.MerchantType}${TransCardConfig.MerchantNumber}`+
    // `${TransCardConfig.MerchantTerminal}${TransactionId}`+
    // `${CompleteCero(Amount.total.toFixed(2).replace('.',''),12)}`+
    // `${CompleteCero(Amount.total.toFixed(2).replace('.',''),12)}`)
    return md5(
      `${TransCardConfig.MerchantType}${TransCardConfig.MerchantNumber}` +
        `${TransCardConfig.MerchantTerminal}${CompleteCero(TransactionId, 6)}` +
        `${CompleteCero(Amount.total.toFixed(2).replace(".", ""), 12)}` +
        `${CompleteCero((0).toFixed(2).replace(".", ""), 12)}`
    );
  };

  const hangleSubmit = async () => {
    const Data = {
      monto: Amount.monto,
      fee: Amount.fee,
      total: Amount.total,
      comentario,
      cuentas: [
        {
          cuenta,
          monto: Amount.monto,
        },
      ],
    };

    await clienteAxios
      .post("/carnet/process", Data)
      .then((response) => {
        setTransactionId(response.data.peticion);
        setOrdenID(response.data.peticion);
        setProcess(response.data.process);
        setPost(true);
      })
      .catch((response) => {
        setSpin(false);
      });
  };

  if (post) {
    setTimeout(() => PostSend(), 1000);
    setPost(false);
  }

  const PostSend = () => {
    setSpin(false);
    // const formulario = document.getElementById("form");
    // formulario.submit();

    var win = window.open(
      ``,
      "_blank",
      "titlebar=Hola,toolbar=0,location=0,menubar=0,width=450,height=900"
    );
    const docu = `<body onLoad='javascript:document.getElementById("form").submit()'> ${
      document.getElementById("divform").innerHTML
    } </body>`;
    //document.getElementById("divform").innerHTML
    win.document.write(docu);
    win.document.getElementById("form").submit();
    setactivate(true);

    var pollTimer = window.setInterval(function () {
      if (win.closed !== false) {
        // !== is required for compatibility with Opera
        window.clearInterval(pollTimer);
        setactivate(false);
        someFunctionToCallWhenPopUpCloses(OrdenID);
      }
    }, 200);
  };

  const someFunctionToCallWhenPopUpCloses = async (SeccionID) => {
    await clienteAxios
      .get("/carnet/check", {
        params: {
          OrdenID: SeccionID,
        },
      })
      .then((response) => {
        console.log(response)
        const {data} = response;
        if (data.responsecode === "00") {
          history.push(`/Transaccion/TransCard/Orden/${data.peticion}`);
        } else {
          swal({
            title: `Transaccion ${PaymentCode[data.responsecode]} (${data.responsecode})`,
            text: `Transaccion con su tarjeta No.: ${data.creditcardnumber} ha sido ${PaymentCode[data.responsecode]} favor intente mas tarde`,
            icon: "warning",
            button: "Aceptar",
          });
        }
      })
      .catch((response) => {
        setSpin(false);
      });
  };

  const CompleteEspacio = (value, width) => {
    var length = value.toString().length;
    var Space = " ";
    if (width <= length) {
      return value.toString();
    } else {
      return value.toString() + Space.repeat(width - length);
    }
  };
  const CompleteCero = (value, width) => {
    var numberOutput = Math.abs(value); /* Valor absoluto del número */
    var length = value.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (width <= length) {
      if (value < 0) {
        return "-" + numberOutput.toString();
      } else {
        return numberOutput.toString();
      }
    } else {
      if (value < 0) {
        return "-" + zero.repeat(width - length) + numberOutput.toString();
      } else {
        return zero.repeat(width - length) + numberOutput.toString();
      }
    }
  };

  return (
    <Fragment>
      <CRow id="divform">
        <form id="form" action={TransCardConfig.action} method="post">
          <input name="TransactionType" value="0200" type="hidden"></input>
          <input name="CurrencyCode" value="214" type="hidden"></input>
          <input
            name="AcquiringInstitutionCode"
            value={TransCardConfig.AcquiringInstitutionCode}
            type="hidden"
          ></input>
          <input
            name="MerchantType"
            value={TransCardConfig.MerchantType}
            type="hidden"
          ></input>
          <input
            name="MerchantNumber"
            value={TransCardConfig.MerchantNumber}
            type="hidden"
          ></input>
          <input
            name="MerchantTerminal"
            value={TransCardConfig.MerchantTerminal}
            type="hidden"
          ></input>
          <input
            name="ReturnUrl"
            value={`${coopSettings.baseURL}/carnet/success/${process}/`}
            type="hidden"
          ></input>
          <input
            name="CancelUrl"
            value={TransCardConfig.urlCancell}
            type="hidden"
          ></input>
          <input name="PageLanguaje" value="ESP" type="hidden"></input>
          <input name="OrdenId" value={OrdenID} type="hidden"></input>
          <input
            name="TransactionId"
            value={CompleteCero(TransactionId, 6)}
            type="hidden"
          ></input>

          <input
            name="Amount"
            value={CompleteCero(Amount.total.toFixed(2).replace(".", ""), 12)}
            type="hidden"
          ></input>
          <input name="Tax" value={CompleteCero(0, 12)} type="hidden"></input>
          <input
            name="MerchantName"
            value={TransCardConfig.MerchantName}
            type="hidden"
          ></input>
          <input name="KeyEncriptionKey" value={md5Get()} type="hidden"></input>
          <input
            name="Ipclient"
            value={TransCardUserData.ClientIp}
            type="hidden"
          ></input>
          <input name="loteid" Value="001" type="hidden"></input>
          <input name="seqid" Value="002" type="hidden"></input>
          <input
            name="3DS_email"
            Value={TransCardUserData.email}
            type="hidden"
          ></input>
          <input
            name="3DS_mobilePhone"
            Value={TransCardUserData.Phonemobile}
            type="hidden"
          ></input>
          <input
            name="3DS_workPhone"
            Value={TransCardUserData.PhoneWork}
            type="hidden"
          ></input>
          <input
            name="3DS_homePhone"
            Value={TransCardUserData.PhoneHome}
            type="hidden"
          ></input>
          <input
            name="3DS_billAddr_line1"
            Value={TransCardUserData.direccion}
            type="hidden"
          ></input>
          <input
            name="3DS_billAddr_line2"
            Value="Santo Domingo"
            type="hidden"
          ></input>
          <input
            name="3DS_billAddr_line3"
            Value="Republica Dominicana"
            type="hidden"
          ></input>
          <input
            name="3DS_billAddr_city"
            Value="SantoDomingo"
            type="hidden"
          ></input>
          <input
            name="3DS_billAddr_state"
            Value={TransCardUserData.estado}
            type="hidden"
          ></input>
          <input
            name="3DS_billAddr_country"
            Value={TransCardUserData.ciudad}
            type="hidden"
          ></input>
          <input
            name="3DS_billAddr_postCode"
            Value={TransCardUserData.codigopostal}
            type="hidden"
          ></input>
          <input
            name="3DS_shipAddr_line1"
            Value={TransCardUserData.direccion}
            type="hidden"
          ></input>
          <input
            name="3DS_shipAddr_line2"
            Value="Santo Domingo"
            type="hidden"
          ></input>
          <input
            name="3DS_shipAddr_line3"
            Value="Republica Dominicana"
            type="hidden"
          ></input>
          <input
            name="3DS_shipAddr_city"
            Value="SantoDomingo"
            type="hidden"
          ></input>
          <input name="3DS_shipAddr_state" Value="DN" type="hidden"></input>
          <input name="3DS_shipAddr_country" Value="DOP" type="hidden"></input>
          <input
            name="3DS_shipAddr_postCode"
            Value="10111"
            type="hidden"
          ></input>
        </form>
      </CRow>

      <CButton
        onClick={hangleSubmit}
        size="sm"
        color="success"
        disabled={Amount.total === 0 || cuenta === ""}
      >
        <CIcon name="cil-scrubber" /> Realizar Transaccion TransCard
      </CButton>
      {activeDigital && (
        <DisabledAutorization
          text="¿No ve el navegador seguro de CardNet ? 
          Abriremos la ventana nuevamente para que pueda completar el proceso de vinculacion
          "
        />
      )}
      {spin && <Downloading value="Procesando" />}
    </Fragment>
  );
};
