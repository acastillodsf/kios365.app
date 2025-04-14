import { CLabel } from '@coreui/react'
import React from 'react'

export const RegistrosToolsAdeudado = ({label,value}) => {
  return (
    <div
                    style={{
                      textAlign: "end",
                    }}
                  >
                    <CLabel htmlFor="company" style={{
                        color: "#6b6c72", 
                        fontSize: "15px",
                        fontWeight: 600,
                      }}>{label}</CLabel>
                    <p
                      style={{
                        color: "black",
                        // background: "white",
                        border: "none",
                        textAlign: "end",
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                    >
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(value)
                        .replace("$", "RD$ ")}
                    </p>
                  </div>
  )
}
