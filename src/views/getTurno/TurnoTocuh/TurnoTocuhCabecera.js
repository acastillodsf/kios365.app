import { CCol, CImg, CRow } from '@coreui/react'
import React from 'react'

export const TurnoTocuhCabecera = () => {
    return (
        <div>
            <CRow >
                <CCol style={{
                    paddingBottom: 50,
                    background: 'blue',
                    marginLeft: 20,

                    marginRight: 20,
                    borderWidth: 1
                }}>

                    <CImg src="https://cooppropes.com/wp-content/uploads/2023/08/Cooppropes-logo-white.png" />

                </CCol>
            </CRow>
        </div>
    )
}
