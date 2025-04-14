import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable } from '@coreui/react'
import React from 'react'
import swal from 'sweetalert'

const fmato = ({divisa,monto})=>{
    Intl.NumberFormat("en-US", {
        style: "currency",
        currency: divisa,
      }).format(monto)
}
export const ListaPrestamos = ({data}) => {
  return (
    <CCol xs="12" sm="6" md="12">
              <CCard borderColor="danger">
                <CCardHeader>Prestamos</CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={data}
                    fields={[
                      { key: "cuenta", label: "Cuenta" },
                      { key: "producto", label: "Producto" },
                      { key: "divisa", label: "Divisa" },
                      { key: "estado", label: "Estado" },
                      { key: "monto", label: "Monto" },
                      { key: "balancecap", label: "Balance Cap." },
                      { key: "capvencido", label: "Cap.Venc." },
                      { key: "interes", label: "Interes" },
                      { key: "mora", label: "Mora" },
                      { key: "pagarhoy", label: "Pagar Hoy" },
                      { key: "fbalance", label: "Balance" },
                      { key: "Opciones", label: "Opcion" },
                    ]}
                    hover
                    scopedSlots={{
                      Opciones: (item) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={(listsocios) =>
                                //seleccionSocio(item.socio, item.nombre)
                                swal(item.cuenta)
                              }
                            >
                              Seleccionar
                            </CButton>
                          </td>
                        );
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
  )
}
