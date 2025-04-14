import React from 'react'
import CIcon from '@coreui/icons-react'
import { Icon } from '@iconify/react'


const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Atender',
    to: '/agente/atender',
    icon: <Icon
      // icon="ion:ticket"
      icon="fluent-emoji-high-contrast:bellhop-bell"
      width={25}
      color="#65a30d"
      style={{ margin: 10, marginLeft: 0 }}
    />
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Reportes",
    route: "#",
    icon: <Icon icon="tabler:report" width={25} color="#65a30d" style={{ marginRight: 10 }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Reporte de Tickets',
        to: '/reportes/ticket',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Ticket Atendido',
      //   to: '/reportes/CuentaPorPagar',
      // },

    ]
  },




  {
    _tag: 'CSidebarNavItem',
    name: 'Salir',
    to: '/logout',
    icon: <Icon icon="system-uicons:exit-left" width={25} color="#65a30d" style={{ marginRight: 10 }} />
  },

  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
