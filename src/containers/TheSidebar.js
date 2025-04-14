import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../actions/changeAction";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import _nav_admin from "./_nav_admin";

import coopsyslogo from "../img/kios365.png";


import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changes.sidebarShow);
  const location = useLocation();




  return (
    <CSidebar
      show={show}
      onShowChange={(val) =>
        dispatch(toggleMenu({ type: "poner", sidebarShow: val }))
      }
    >
      <CSidebarBrand className="d-md-down-none" to="/agente/atender" style={{ flex: "0 0 83px" }}>


        <Icon icon="teenyicons:invoice-outline"
          className="c-sidebar-brand-minimized"
          name="logo-negative"
          width={"50%"}
          color="blue"
          alt="logo Coop"
        />

        <CIcon
          className="c-sidebar-brand-full"
          name="sygnet"
          width={"90%"}
          src={coopsyslogo}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={
            location.pathname.split("/")[1] === "admin" ? _nav_admin : navigation
          }
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
