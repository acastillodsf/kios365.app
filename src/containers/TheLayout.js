import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { coopSettings } from "src/config/coop.config";
import { createWebSocket } from "src/ws/WebSocketServices";
import { ModalTicket } from "src/views/User/Turnos/ModalTicket";
import AvisoConexion from "src/views/getTurno/AvisoConexion";


const TheLayout = () => {
  const dispatch = useDispatch();
  // const { settingApp, statusCode } = useSelector((state) => state.appSetting);

  // if(parseInt(statusCode)!==200){return <></>}

  const [socket, setSocket] = useState(null);  // Estado para almacenar la conexión WebSocket
  const [isDisconnected, setIsDisconnected] = useState(false);  // Estado para manejar la desconexión
  const [reconnectAttempts, setReconnectAttempts] = useState(0);  // Contador para intentos de reconexión

  const { AccessToken, croquets } = useSelector((state) => state.usuario);


  useEffect(() => {
    createWebSocket('user', dispatch, croquets, AccessToken, setIsDisconnected, setSocket);

    return () => {
      if (socket) socket.close();
    };
  }, [dispatch, croquets, AccessToken]);




  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <ModalTicket ws={socket} />
      <div className="c-wrapper">
        <TheHeader disconect={isDisconnected} ws={socket} />
        <div className="c-body ">
          <CContainer className="c-body">
            <TheContent ws={socket} />
          </CContainer>
        </div>
        <TheFooter />
      </div>
      <AvisoConexion active={isDisconnected} />
    </div>
  );
};

export default TheLayout;
