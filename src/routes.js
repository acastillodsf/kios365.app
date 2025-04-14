import React from 'react';

const Pacientes = React.lazy(() => import('./views/Pacientes/Dispositivos'));
const KioscosList = React.lazy(() => import('./views/admin/setting/kioscos/KioscosList'));
const ListadoTurnos = React.lazy(() => import('./views/User/Turnos/ListadoTurnos'));

const ConexionesList = React.lazy(() => import('./views/admin/setting/Conexiones/ConexionesList'));




const SettupEmpresa = React.lazy(() => import('./views/Settup/SettupEmpresa'));
const SettupSucursales = React.lazy(() => import('./views/Settup/SettupSucursales'));


const routes = [

  { path: '/agente/atender', name: 'Ticket', component: ListadoTurnos, exact: true },



  { path: '/admin/monitor/conexiones', name: 'Conexiones Activas', component: ConexionesList, exact: true },
  { path: '/admin/monitor', name: 'Dashboard', component: Pacientes, exact: true },
  { path: '/admin/setting/kiosco', name: 'Listado de Kioscos', component: KioscosList, exact: true },




  { path: '/admin/empresa', name: 'Configuracion Datos de Empresa', component: SettupEmpresa, exact: true },

  { path: '/admin/sucursal', name: 'Configuracion Datos de Sucursales', component: SettupSucursales, exact: true },



];

export default routes;
