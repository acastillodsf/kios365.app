import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";
import { toggleMenu } from "../actions/changeAction";
import logo from "../img/CoopQuisqueya-minilogo.png";

import { TheHeaderDropdown } from "./index";
import { useHistory } from "react-router";
import { Icon } from "@iconify/react";
import { TerminalConfig } from "src/views/User/TerminalConfig/TerminalConfig";
import { EnEspera } from "src/views/User/Turnos/EnEspera";



const StatusIndicator = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '2px solid red',
      padding: '2px 8px 2px 10px',
      borderRadius: '8px'
    }}>
      <Icon icon="icon-park-outline:phone-booth" color="red" width={25} />
      <p style={{
        color: 'red',
        margin: 0,
        marginLeft: '10px',
        fontSize: '24px'
      }}>Conexion perdida</p>
    </div>
  );
};


const TheHeader = ({ disconect = false, ws }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.changes.sidebarShow);
  const { autenticado } = useSelector((state) => state.usuario);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(toggleMenu({ type: "poner", sidebarShow: val }));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(toggleMenu({ type: "poner", sidebarShow: val }));
  };

  useEffect(() => {
    if (!autenticado) {
      history.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autenticado]);
  return (
    <CHeader withSubheader style={{ background: disconect ? '#ff000021' : '' }}>
      {/* <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      /> */}
      <CHeaderBrand className="" style={{ borderWidth: 1 }}>
        {disconect && <StatusIndicator />}
        <TerminalConfig ws={ws} />
        <EnEspera />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">


        {/* {settingApp.homepage !== "" && (
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink target="_blank" href={settingApp.homepage}>
              Portal {settingApp.homeName}
            </CHeaderNavLink>
          </CHeaderNavItem>
        )}
        {settingApp.contactpage !== "" && (
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink target="_blank" href={settingApp.contactpage}>
              Contactenos
            </CHeaderNavLink>
          </CHeaderNavItem>
        )}
        {settingApp.referidor !== undefined && settingApp.referidor===1 && (
          <CHeaderNavItem className="px-3">
            <Referidor />
          </CHeaderNavItem>
        )} */}
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>


    </CHeader>
  );
};

export default TheHeader;
