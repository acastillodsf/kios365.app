// socket.js
import { coopSettings } from "src/config/coop.config";

export const createWebSocket = (agent, dispatch, croquets = '', AccessToken, setIsDisconnected, setSocketRef) => {
    let socket = null;

    const connectSocket = () => {
        if (socket) {
            socket.close();
        }

        console.log('Intentando conectar...');
        socket = new WebSocket(coopSettings.socket);

        socket.onopen = () => {
            console.log("Conectado al servidor WebSocket");
            socket.send(JSON.stringify({ type: "IDENTIFY", id: croquets, agent, AccessToken: AccessToken }));
            setIsDisconnected(false);
            setSocketRef(socket); // Actualiza la referencia del socket en el estado
        };

        socket.onmessage = (event) => {
            if (event.data) {
                const data = JSON.parse(event.data);

                console.log('Respuesta Reciida=>', data.type)
                if (data.type === "UPDATE") {
                    dispatch({
                        type: 'ws->update',
                        payload: data.data
                    });
                }
                if (data.type === "UPDATE_AGENTE") {
                    dispatch({
                        type: 'UPDATE_AGENTE',
                        payload: data.data
                    });
                } else {
                    console.log(data)
                    if (data.type) {
                        dispatch({ ...data });
                    }
                }
            }
        };

        socket.onclose = () => {
            console.log("Desconectado del servidor WebSocket");
            setIsDisconnected(true);
            attemptReconnect();
        };

        socket.onerror = (error) => {
            console.log("Error en la conexión WebSocket:", error);
            setIsDisconnected(true);
            attemptReconnect();
        };
    };

    const attemptReconnect = () => {
        setTimeout(() => {
            connectSocket();
        }, 5000); // Reintentar conexión después de 5 segundos
    };



    connectSocket();
    return socket
};
