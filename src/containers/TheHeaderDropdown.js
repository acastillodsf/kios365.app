import React, { useEffect, useState } from "react";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// redux
import { useDispatch } from "react-redux";
import { cerrarSesionAction } from "../actions/usuarioAction";
import clienteAxios from "src/config/axios";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [info, setInfo] = useState({})
  const logOut = () => dispatch(cerrarSesionAction());

  useEffect(() => {
    clienteAxios.get('/Auth/currentUser').then(({ data }) => {
      setInfo(data)
      console.log(data)
    })
  }, [])


  const handleClick = (e) => { logOut() };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>

        {info.fullName}
        <div className="c-avatar m-3">
          <CIcon name="cil-applications-settings" className="mfe-2" />
        </div>

      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem
          onClick={() => history.push('/admin/monitor')}
        >
          <Icon icon="hugeicons:configuration-01"
            width={20} className="mr-2 text-success" color="#2eb85c" />
          Configuracion
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleClick}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Cerrar Seccion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
