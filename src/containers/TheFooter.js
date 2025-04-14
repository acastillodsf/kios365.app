import React from 'react'
import { CFooter } from '@coreui/react'
import moment from 'moment'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
      CoopSys
        <span className="ml-1">&copy; {moment().format('YYYY')} todos los Derechos reservados.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Desarrollado por </span>
        <a href="https://www.dasoft.com.do" target="_blank" rel="noopener noreferrer">Dasoft SRL</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
