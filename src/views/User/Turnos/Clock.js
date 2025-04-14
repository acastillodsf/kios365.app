import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { tiempoTranscurrido } from './Atendiendo';
import { CCol, CRow } from '@coreui/react';
import { Icon } from '@iconify/react';

export const Clock = () => {
    const { turnos, estado, estadistica, atendiendo } = useSelector((state) => state.ws.agente);


    const [tiempoAten, setTiempoAten] = useState('');

    useEffect(() => {
        setTiempoAten('')
        const intervalo = setInterval(() => {
            setTiempoAten(tiempoTranscurrido(atendiendo.fecha_hora_atendido));
        }, 1000);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalo);
    }, [atendiendo.fecha_hora_atendido]);

    if (!atendiendo.fecha_hora_atendido) {
        return <></>
    }
    const est = atendiendo.estado;

    return (
        <CCol  >
            <CRow>
                <CCol style={{
                    display: "flex",
                    justifyContent: "flex-end",  // Alinea el contenido a la derecha
                    alignItems: "center",
                    textAlign: 'right'
                }}>
                    <h1> {est === 'called' ? 'Tiempo en Espera' :
                        est === 'Attending' ? 'Tiempo con el Cliente' : ''
                    } </h1>
                </CCol>

            </CRow>
            <CRow>
                <CCol style={{
                    display: "flex",
                    justifyContent: "flex-end",  // Alinea el contenido a la derecha
                    alignItems: "center",
                    textAlign: 'right'
                }}>
                    <h1> {tiempoAten} </h1>
                    <Icon
                        icon="duo-icons:clock"
                        width={50}
                        color="#65a30d"
                        style={{ margin: 5, marginLeft: 0 }}
                    />
                </CCol>

            </CRow>


        </CCol>
    )
}
