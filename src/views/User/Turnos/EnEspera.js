import { CButton, CCol, CRow } from '@coreui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


export const EnEspera = ({ ws }) => {

    const { estadistica } = useSelector((state) => state.ws.agente);
    const dispatch = useDispatch();
    const location = useLocation();


    if (parseInt(estadistica.pausado) === 0) {
        return <></>
    }
    if (location.pathname.split("/")[1] !== "agente" && location.pathname.split("/")[2] !== 'ticket') {
        return <></>
    }
    return (
        <>
            <CButton
                // color="primary"
                // disabled={true}
                onClick={() => dispatch({
                    type: 'ModalTicket',
                    payload: {
                        show: true,
                        estado: 'Paused'
                    }
                })}
                style={{
                    width: 250,
                    marginLeft: 10,
                    padding: 0,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10, // Espacio entre el icono y el texto
                    // color : 'white',
                    background: '#17a2b8'
                }}
            >
                <CRow>
                    <CCol style={{ alignItems: 'center' }}>
                        <Icon icon="material-symbols:pause" width={50} />
                    </CCol>
                    <CCol xl="7">
                        <CRow>
                            <h2>
                                {estadistica.pausado}
                            </h2>
                        </CRow>
                        <CRow>
                            <small className="text-muted text-uppercase font-weight-bold">
                                Turno en Espera
                            </small>
                        </CRow>
                    </CCol>
                </CRow>
            </CButton>




        </>
    )
}
