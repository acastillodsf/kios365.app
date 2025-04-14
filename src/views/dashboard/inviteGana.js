import {
  CAlert,
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";
import { useSelector } from "react-redux";
import clienteAxios from "src/config/axios";
import Spinner from "src/reusable/Spinner";

export const InviteGana = () => {
  const [linkreferidor, setLinkReferidor] = useState("");
  const [consultando, setconsultando] = useState(true);
  const { settingApp } = useSelector((state) => state.appSetting);
  const [contacto, setcontacto] = useState("");
  const [notificacion, setNotificacion] = useState("");
  const [visible, setVisible] = React.useState(0);

  const consultaReferidor = async () => {
    setconsultando(true);
    try {
      const peticion = await clienteAxios.get(`/referidor`);

      setLinkReferidor(
        `${settingApp.urlApp}#/register/${peticion.data.referidor}`
      );
      setconsultando(false);
    } catch (error) {
      setconsultando(false);
    }
  };

  useEffect(() => {
    consultaReferidor();
  }, []);

  const invitar = () => {
    clienteAxios
      .post("/invite", {
        contacto: contacto,
        token: linkreferidor,
      })
      .then(() => {
        setNotificacion(`Invitacion Enviada con Exito a ${contacto}`);
        setcontacto("")
        setVisible(10);
      })
      .catch(() => {
        setNotificacion("Problema al Enviar invitacion.");
        setcontacto("")
        setVisible(10);
      });
  };
  return (
    <div className="MuiBox-root css-0">
      <span className="MuiBox-root css-1w7i6xy">
        <span
          className="wrapper lazy-load-image-background  lazy-load-image-loaded"
          style={{ color: "transparent", display: "inline-block" }}
        >
          <img
            className="MuiBox-root css-6jrdpz"
            alt="illustration-invite"
            src="https://minimals.cc/assets/illustrations/characters/character_11.png"
          />
        </span>
      </span>
      <div className="MuiBox-root css-ifj919">
        <div className="css-1ialerq">
          <h4 className="MuiTypography-root MuiTypography-h4 css-14x5ta5" style={{margin:0}} >
            Invita a tus Familiares, amigos
          </h4>
          <h4 className="MuiTypography-root MuiTypography-h4 css-14x5ta5">
            y recibes
          </h4>
          <h2 className="MuiTypography-root MuiTypography-h2 css-1kxrdv2">
            {" "}
            RD$250.00{" "}
          </h2>
        </div>
        {consultando ? (
          <Spinner />
        ) : (
          <>
            <p className="MuiTypography-root MuiTypography-body2 css-dz4abb">
              Por cada socio que inscribas, optienes un bono directo a tu cuenta
              de fereridos.
            </p>

            <CAlert
              color="warning"
              show={visible}
              closeButton
              onShowChange={setVisible}
            >
              {notificacion}
            </CAlert>

            <CRow className="css-1yjo05o">
              <CCol md="12">
                <CLabel htmlFor="text-input">
                  Comparte este link y Gana por su referimiento !
                </CLabel>
              </CCol>
              <CCol xs="12" md="10" style={{ padding: "0px 7px 0px 16px" }}>
                <CInput
                  name="linkreferidor"
                  value={linkreferidor}
                  disabled
                  style={{ fontSize: 11, color: "blue" }}
                />
              </CCol>
              <CCol xs="12" md="1" style={{ padding: 0 }}>
                <CopyToClipboard text={linkreferidor}>
                  <CButton
                    color="secondary"
                    variant="outline"
                    style={{ marginTop: 0 }}
                  >
                    Copy
                  </CButton>
                </CopyToClipboard>
              </CCol>
            </CRow>
            <div className="css-1yjo05o">
              <div className="MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth css-1cr0z0g">
                <CInput
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setcontacto(e.target.value)}
                  value={contacto}
                />
              </div>
              <CButton
                color="primary"
                variant="outline"
                style={{ marginTop: 10 }}
                onClick={invitar}
              >
                Invitar<span className="MuiTouchRipple-root css-w0pj6f"></span>
              </CButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
