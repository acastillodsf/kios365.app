import { CCard, CCardBody, CCol, CInput, CLabel, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { formatTurno } from 'src/views/getTurno/Tiket'

export function tiempoTranscurrido(fechaISO) {
    const fechaInicial = new Date(fechaISO);
    const fechaActual = new Date();
    const diferenciaMs = fechaActual - fechaInicial;

    const segundosTotales = Math.floor(diferenciaMs / 1000);
    const dias = Math.floor(segundosTotales / (3600 * 24));
    const horas = Math.floor((segundosTotales % (3600 * 24)) / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    const formatoTiempo = `${dias} Dias   ${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    return formatoTiempo;
}

export const Atendiendo = () => {
    const { atendiendo } = useSelector((state) => state.ws.agente);
    const [tiempo, setTiempo] = useState('');
    const [tiempoAten, setTiempoAten] = useState('');
    useEffect(() => {
        const intervalo = setInterval(() => {
            setTiempo(tiempoTranscurrido(atendiendo.fecha_hora));
            setTiempoAten(tiempoTranscurrido(atendiendo.fecha_hora_atendido));
        }, 1000);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalo);
    }, [atendiendo]);

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol xs="2">
                        <CLabel htmlFor="company">Turno #{atendiendo.turno_id} </CLabel>
                        <CInput
                            id="turno"
                            value={formatTurno(atendiendo.alfa, atendiendo.secuencia)}
                            className="mb-3"
                            disabled
                        />
                    </CCol>
                    <CCol xs="4">
                        <CLabel htmlFor="company">Tramite </CLabel>
                        <CInput
                            id="tramite"
                            value={atendiendo.servicio}
                            className="mb-3"
                            disabled
                        />
                    </CCol>
                    <CCol xs="2">
                        <CLabel htmlFor="company">Estado </CLabel>
                        <CInput
                            id="estado"
                            value={atendiendo.estado}
                            className="mb-3"
                            disabled
                        />
                    </CCol>
                    <CCol xs="2">
                        <CLabel htmlFor="company">Tiempo en proceso </CLabel>
                        <CInput
                            id="atendidos"
                            value={tiempo}
                            className="mb-3"
                            disabled
                        />
                    </CCol>
                    <CCol xs="2">
                        <CLabel htmlFor="company">Tiempo de Atencion </CLabel>
                        <CInput
                            id="atendidos"
                            value={atendiendo.estado === 'Attending' ? tiempoAten : ""}
                            className="mb-3"
                            disabled
                        />
                    </CCol>

                </CRow>
                <CRow>
                    <CCol xs="2">
                        <CLabel htmlFor="company">Tipo de Documento </CLabel>
                        <CInput
                            id="tipodocumento"
                            value={atendiendo.tipodocumento}
                            className="mb-3"
                            disabled
                        />
                    </CCol>
                    <CCol xs="2">
                        <CLabel htmlFor="company">Documento </CLabel>
                        <CInput
                            id="documento"
                            value={atendiendo.documento}
                            className="mb-3"
                            disabled
                        />
                    </CCol>
                    <CCol xs="8">
                        <CLabel htmlFor="company">Nombre </CLabel>
                        <CInput
                            id="nombre"
                            value={atendiendo.nombre}
                            className="mb-3"
                            disabled
                        />
                    </CCol>


                </CRow>

            </CCardBody>
        </CCard>
    )
}
