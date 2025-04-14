import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CImg,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import clienteAxios from "src/config/axios";
import gauth from "../../img/digiplatinum.png";

export const DigiPlaninum = () => {
  const [DigiAccount, setDigiAccount] = useState([]);

    const history = useHistory();
    useEffect(()=>dkConsulta(),[])
    const dkConsulta = async () => {
      try { 
        const peticion = await clienteAxios.get("/dk_consulta");
        setDigiAccount(peticion.data);
      } catch (error) {
         
      }
    };

    if(DigiAccount.length!==0){
      return null;
    }
 
  return (
    <CCol xs="12" sm="6" md="12">
      <CCard borderColor="primary">
          <CImg width="100%" src={gauth} />
            <CButton 
            style={{
                position :'absolute',
                right : 50,
                top : '40%',
                padding : 10,
            }} 
            onClick={() => history.push('/digi/account/digiplatinum')} size="sm" color="success">
              Aquierelo Ya !
            </CButton>
      </CCard>
    </CCol>
  );
};
