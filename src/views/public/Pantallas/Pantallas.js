import React, { useEffect, useState } from "react";


import "../../../assets/css/custom.css";
import "./pantallas.css";

import { coopSettings } from "src/config/coop.config";
import AvisoNoRegistrado from "src/views/getTurno/AvisoNoRegistrado";
import AvisoConexion from "src/views/getTurno/AvisoConexion";
import { CCol, CImg, CRow } from "@coreui/react";
import PublicidadSlider from "./PublicidadSlider";
import TurnosTable from "./Turnos";
import AvisoLlamando from "./AvisoLlamando";
import { formatTurno } from "src/views/getTurno/Tiket";


// const turnos = [
//     { ticket: "A001", puesto: "1" },
//     { ticket: "A002", puesto: "2" },
//     { ticket: "A003", puesto: "3" },
//     { ticket: "A004", puesto: "4" }
// ];



const PantallasView = ({ match }) => {
    const [isDisconnected, setIsDisconnected] = useState(false);  // Estado para manejar la desconexión
    const [isNotRegistered, setIsNotRegistered] = useState(false);  // Estado para manejar el Registro
    const [aviso, setAviso] = useState({ active: false });
    const [publicidad, setPublicidad] = useState([]);
    const [ws, setWs] = useState(null);
    const [socket, setSocket] = useState(null);  // Estado para almacenar la conexión WebSocket
    const [reconnectAttempts, setReconnectAttempts] = useState(0);  // Contador para intentos de reconexión
    const [DataForm, setDataForm] = useState({
        step: 0,
        tipodocumento: 'CEDULA',
        documento: ''
    });
    const [turnos, setturnos] = useState([])
    const [llamado, setLlamado] = useState({
        show: false,
        ticket: "",
        puesto: ''
    })


    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES'; // Configura el idioma a español
            utterance.rate = 1; // Velocidad de la voz (1 es normal)
            utterance.pitch = 1; // Tono de la voz más agudo para simular voz femenina
            utterance.volume = 1; // Volumen (0 a 1)

            // Función para cargar las voces y seleccionar la de Google
            const loadVoices = () => {
                const voices = window.speechSynthesis.getVoices();
                const googleVoice = voices.find(voice => voice.name.includes('Google') && voice.lang.startsWith('es'));
                if (googleVoice) {
                    utterance.voice = googleVoice;
                } else {
                    console.log('No se encontró una voz de Google, usando la predeterminada.');
                }
                window.speechSynthesis.speak(utterance);
            };

            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            } else {
                loadVoices();
            }
        } else {
            console.error('La síntesis de voz no es compatible con este navegador');
        }
    };

    const connectSocket = () => {
        if (socket) {
            socket.close();
        }

        console.log('Intentando conectar')
        const newSocket = new WebSocket(coopSettings.socket);

        newSocket.onopen = () => {
            console.log("Conectado al servidor WebSocket");
            newSocket.send(JSON.stringify({ type: "IDENTIFY", id: match.params.id, agent: 'Pantalla' }));
            setIsDisconnected(false);  // Resetear el estado de desconexión
            setReconnectAttempts(0);  // Resetear el contador de reconexión
        };

        newSocket.onmessage = (event) => {
            if (event.data) {
                const data = JSON.parse(event.data);


                if (data.type === "SETTING") {
                    console.log('SETTING', data)
                    console.log(data)
                    setPublicidad(data.publicidad);
                }

                if (data.type === "CALL_TICKET") {
                    const llamado = data.data;
                    speakText(`${llamado.alfa},${llamado.secuencia}, en la Posicion ${llamado.puesto.replace(' ', ',')}`)
                    const seleccion = turnos;
                    seleccion.push(
                        {
                            ticket: `${llamado.alfa}${llamado.secuencia}`
                            , puesto: `${llamado.puesto}`
                        }
                    );
                    setturnos(seleccion)

                    setLlamado({
                        show: true,
                        ticket: formatTurno(llamado.alfa, llamado.secuencia),
                        puesto: llamado.puesto
                    });
                }

                if (data.type === "CALLEND_TICKET") {
                    setLlamado({
                        show: false,
                        ticket: '',
                        puesto: ''
                    });
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




    return <div className="pantalla">
        <AvisoNoRegistrado active={isNotRegistered} stuck={match.params.id} />
        <AvisoConexion active={isDisconnected} />
        <AvisoLlamando llamado={llamado} />
        <section className="main-kiosco01" id="logins">

            <CRow className="container-turnos">
                <CCol style={{
                    // width: '100%',
                    // backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'center',
                }}>
                    <CImg src="/images/cooppropes.png" width="90%" />
                </CCol>
                <CCol style={{
                    // width: '100%',
                    height: '30vh',
                    // backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'top',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'center',
                    background: '#2ea7a8',
                }}>
                    <TurnosTable turnos={turnos} />
                </CCol>
            </CRow>

            <CRow style={{
                // width: '100%',
                // backgroundColor: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                textAlign: 'center',
                height: '70%'
            }}>
                <CCol>
                    <PublicidadSlider items={publicidad} />

                </CCol>

            </CRow>

            {/* <CRow>
                <CCol>
                    <div class="turnos">
                        
                    </div>
                </CCol>
            </CRow> */}
        </section>



    </div>


};

export default PantallasView;
