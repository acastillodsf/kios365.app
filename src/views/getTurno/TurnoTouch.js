import React, { useEffect, useState } from "react";


import "../../assets/css/custom.css";
import "./TurnoTouch.css";

import TurnoTouchCedula from "./TurnoTouchCedula";
import TurnoTouchBienvenida from "./Seleccione_Bienvenido";
import Seleccione_TipoDocumento from "./Seleccione_TipoDocumento";
import { handlePrint } from "./Tiket";
import TurnoTouchPasaporte from "./TurnoTouchPasaporte";
import Seleccione_Servicios from "./Seleccione_Servicios";
import AvisoImpresion from "./AvisoImpresion";
import clienteAxios from "src/config/axios";
import { coopSettings } from "src/config/coop.config";
import AvisoConexion from "./AvisoConexion";
import { Icon } from "@iconify/react";
import AvisoNoRegistrado from "./AvisoNoRegistrado";
import { TurnoTouchDocumento } from "./TurnoTocuh/TurnoTouchDocumento";
import { useDispatch } from "react-redux";
import { createWebSocket } from "src/ws/WebSocketServices";






const TurnoTouch = ({ match }) => {
  const dispatch = useDispatch();
  const [isDisconnected, setIsDisconnected] = useState(false);  // Estado para manejar la desconexión
  const [isNotRegistered, setIsNotRegistered] = useState(false);  // Estado para manejar el Registro
  const [aviso, setAviso] = useState({ active: false });
  const [services, setServices] = useState([]);
  const [Opciones, setOpciones] = useState([]);
  const [ws, setWs] = useState(null);

  const [socket, setSocket] = useState(null);  // Estado para almacenar la conexión WebSocket
  const [reconnectAttempts, setReconnectAttempts] = useState(0);  // Contador para intentos de reconexión
  const [DataForm, setDataForm] = useState({
    step: 0,
    tipo: '',
    tipodocumento: 'CEDULA',
    documento: ''
  });



  useEffect(() => {
    createWebSocket('kiosco', dispatch, match.params.id, '', setIsDisconnected, setSocket);

    return () => {
      if (socket) socket.close();
    };
  }, [dispatch, match]);



  const connectSocket = () => {
    if (socket) {
      socket.close();
    }

    console.log('Intentando conectar')
    const newSocket = new WebSocket(coopSettings.socket);

    newSocket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
      newSocket.send(JSON.stringify({ type: "IDENTIFY", id: match.params.id, agent: 'kiosco' }));
      setIsDisconnected(false);  // Resetear el estado de desconexión
      setReconnectAttempts(0);  // Resetear el contador de reconexión
    };

    newSocket.onmessage = (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);

        console.log(data.type)
        if (data.type === "KIOSCO_SETTING") {
          console.log('KIOSCO_SETTING', data)
          setServices(data.services);
          setOpciones(data.emptype)

        }

        if (data.type === "UNREGISTERED-DEVICE") {
          setIsNotRegistered(true);
        }
      }


    };

    newSocket.onclose = () => {
      console.log("Desconectado del servidor WebSocket");
      setIsDisconnected(true);  // Cambiar el estado cuando se desconecta
      attemptReconnect();  // Intentar reconectar
    };

    newSocket.onerror = (error) => {
      console.log("Error en la conexión WebSocket:", error);
      setIsDisconnected(true);  // Cambiar el estado de desconexión
      attemptReconnect();  // Intentar reconectar
    };

    setSocket(newSocket);  // Guardar la referencia al WebSocket
  };

  const attemptReconnect = () => {
    console.log("Intentando reconectar...");
    setTimeout(() => {
      connectSocket();  // Reintentar la conexión después de 3 segundos
    }, 5000);  // Espera de 3 segundos antes de reconectar
  };

  useEffect(() => {
    connectSocket();  // Inicializa la conexión al cargar el componente

    return () => {
      if (socket) {
        socket.close();  // Cerrar la conexión al desmontar el componente
      }
    };
  }, []);  // Solo se ejecuta al montar el componente



  const GenerarTiket = (data) => {
    return new Promise((resolve, reject) => {
      console.log('Data a Enviar =>', { type: "GENERATE_TICKET", data })
      // Enviar los datos al servidor a través del WebSocket
      socket.send(JSON.stringify({ type: "GENERATE_TICKET", data }));

      // Esperar la respuesta del servidor
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);

        console.log('response=>', response)
        if (response.type === "TICKET_RESPONSE") {
          // Si recibimos la respuesta con éxito, resolvemos la promesa
          resolve(response);
        } else {
          // Si ocurre algún error, rechazamos la promesa
          reject(new Error("Error en la respuesta del servidor"));
        }
      };

      socket.onerror = (error) => {
        reject('Ha ocurrido un error ', error); // Si ocurre un error de WebSocket
      };
    });
  };


  // function GenerarTiket(data) {
  //   console.log(data)
  //   return new Promise((resolve, reject) => {
  //     clienteAxios
  //       .post('/api/turnotouch/turno', data)
  //       .then((response) => resolve(response.data))
  //       .catch((error) => reject(error));
  //   });
  // }

  useEffect(() => {
    if (aviso.active) {
      const timer = setTimeout(() => {
        setAviso({ ...aviso, active: false });
      }, 3000); // Se cierra en 3 segundos

      return () => clearTimeout(timer);
    }
  }, [aviso]);


  console.log('Impresiones')
  console.log('services', services)

  //Bienvenida.
  if (DataForm.step === 0) {
    return <>
      <AvisoNoRegistrado active={isNotRegistered} stuck={match.params.id} />
      <AvisoConexion active={isDisconnected} />
      <AvisoImpresion data={aviso} />
      <TurnoTouchBienvenida
        // onSelect={() => {
        //   handlePrint(
        //     {
        //       alfa: 'D',
        //       secuencia: 5,
        //       cedula: 40220280354,
        //       servicio: 'Retiro de Cuenta',
        //       departamento: 'Centro de Caja',
        //       fecha: '2025-01-02'
        //     }
        //   )
        // }}
        onSelect={() => {

          if (Opciones.length !== 0) {
            console.log('Opciones',)
          }
          setDataForm({
            ...DataForm,
            step: 1,
            tipo: Opciones.length !== 0 ? Opciones[0].nombre : ''
          })
        }} />
    </>
  }

  if (DataForm.step === 1) {
    const seleccion = Opciones.filter(r => r.nombre === DataForm.tipo)

    return <Seleccione_TipoDocumento
      opciones={Opciones}


      onCancell={() =>
        setDataForm({
          ...DataForm,
          step: 0
        })
      }
      onSelect={(e) => {
        setDataForm({
          ...DataForm,
          step: 1,
          tipo: e
        })
      }} >

      {seleccion.length === 1 && seleccion[0].entrada === "Numeric" && <TurnoTouchCedula
        formato={seleccion[0].formato}
        onSuccess={(e) => {
          setDataForm({
            ...DataForm,
            step: 3,
            documento: e
          })

        }}
        onCancell={() => {
          setDataForm({
            ...DataForm,
            step: 0
          })
        }} />
      }
      {seleccion.length === 1 && seleccion[0].entrada === "Keyboard" && <TurnoTouchPasaporte
        formato={seleccion[0].formato}
        onSuccess={(e) => {
          setDataForm({
            ...DataForm,
            step: 3,
            documento: e
          })

        }}
        onCancell={() => {
          setDataForm({
            ...DataForm,
            step: 0
          })
        }} />
      }

    </Seleccione_TipoDocumento>
  }


  if (DataForm.step === 3) {
    return <Seleccione_Servicios
      servicios={services}
      onSelect={(d, s) => {
        setDataForm({
          ...DataForm,
          step: 0,
          servicio: s,
          departamento: d
        })

        GenerarTiket({
          sku: match.params.id,
          departamento: d,
          servicio: s,
          tipodocumento: DataForm.tipodocumento,
          documento: DataForm.documento
        }).then((data) => {
          console.log(data)
          handlePrint(
            {
              alfa: data.alfa,
              secuencia: data.secuencia,
              cedula: DataForm.documento,
              servicio: s,
              departamento: d,
              fecha: data.fecha
            }
          )
          setAviso({ active: true, alfa: data.alfa, secuencia: data.secuencia, cedula: DataForm.documento, servicio: s, departamento: d })
        }).catch((e) => {
          console.log(e)
        })

      }}
      onCancell={() => {
        setDataForm({
          ...DataForm,
          step: 0
        })
      }} />
  }



  return (

    <TurnoTouchBienvenida onSelect={() => {
      setDataForm({
        ...DataForm,
        step: 1
      })
    }} />

  );
};

export default TurnoTouch;
