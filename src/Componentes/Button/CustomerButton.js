import { CButton } from '@coreui/react'
import { Icon } from '@iconify/react'
import React from 'react'

export const ButtonAceptar = ({onClick,text}) => {
  return (
    <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={onClick}
                className="col-2"
                style={{
                    marginRight : 10
                }}
              >
                <Icon icon="material-symbols:save-as-outline" width={25} /> {text}
              </CButton>
  )
}

export const ButtonCancel = ({onClick,text}) => {
    return (
      <CButton
                  type="submit"
                  size="sm"
                  color="danger"
                  onClick={onClick}
                  className="col-2"
                  style={{
                      marginRight : 10
                  }}
                >
                  <Icon icon="material-symbols:cancel-outline"  width={25} /> {text}
                </CButton>
    )
  }
