import React from 'react'
import CIcon from '@coreui/icons-react'
import { Icon } from '@iconify/react'


const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Monitoreo"],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Monitor',
    to: '/admin/monitor',
    icon: <Icon icon="whh:homealt" width={25} style={{ marginRight: 10 }} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Conexiones',
    to: '/admin/monitor/conexiones',
    icon: <Icon icon="dashicons:admin-links" width={25} style={{ marginRight: 10 }} />
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Configuraciones"],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Empresa',
    to: '/admin/empresa',
    icon: <Icon icon="ion:business-sharp"
      width={25}
      color="#65a30d"
      style={{ margin: 10, marginLeft: 0 }}
    />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sucursales',
    to: '/admin/sucursal',
    icon: <Icon icon="icon-park-twotone:branch-one"
      width={25}
      color="#65a30d"
      style={{ margin: 10, marginLeft: 0 }}
    />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Menu',
    to: '/admin/setting/menu',
    icon: <Icon icon="jam:menu"
      width={25}
      color="#65a30d"
      style={{ margin: 10, marginLeft: 0 }}
    />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kioscos',
    to: '/admin/setting/kiosco',
    icon: <Icon icon="icon-park-outline:phone-booth"
      width={25}
      color="#65a30d"
      style={{ margin: 10, marginLeft: 0 }}
    />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pantallas',
    to: '/admin/setting/panallas',
    icon: <Icon icon="pepicons-pop:monitor"
      width={25}
      color="#65a30d"
      style={{ margin: 10, marginLeft: 0 }}
    />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Terminales',
    to: '/admin/setting/terminales',
    icon: <Icon icon="pajamas:monitor"
      width={25}
      color="#65a30d"
      style={{ margin: 10, marginLeft: 0 }}
    />
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Reportes",
    route: "#",
    icon: <Icon icon="ic:outline-account-balance" width={25} color="#65a30d" style={{ marginRight: 10 }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Cuenta por Cobrar',
        to: '/reportes/CuentaPorCobrar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cuenta por Pagar',
        to: '/reportes/CuentaPorPagar',
      },

    ]
  },




  {
    _tag: 'CSidebarNavItem',
    name: 'Salir',
    to: '/logout',
    icon: <Icon icon="system-uicons:exit-left" width={25} style={{ marginRight: 10 }} />
  },

  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
