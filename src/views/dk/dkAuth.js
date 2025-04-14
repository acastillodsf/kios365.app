import { CButton } from "@coreui/react";
import React, { useState } from "react";
import clienteAxios from "src/config/axios";
import { DisabledAutorization } from "src/reusable/Spinner";

export const DkAuth = () => {
  const [activeDigital, setactivate] = useState(false);
 
  const someFunctionToCallWhenPopUpCloses = async(SeccionID) => {
     try {
      const peticion = await clienteAxios.post("/dk_register", {SeccionID});
        console.log(peticion.data);
    } catch (error) {
       console.log(error.response.data);
    }
  };

  const ram = (length)=>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
  }

  return (
    <div>
      {activeDigital && <DisabledAutorization />}

      <CButton
        onClick={() => {
            const seccionID = ram(100);
          var win = window.open(
            `https://oficinav2.digitalkingdomgroup.com/api/DKG/terminos.php?uri=https://api.coopsys.com.do/core/TransCard/dk.php&SeccionID=${seccionID}`,
            "_blank",
            "titlebar=Hola,toolbar=0,location=0,menubar=0,width=450,height=700"
          );

          setactivate(true);
          var pollTimer = window.setInterval(function () {
            if (win.closed !== false) {
              // !== is required for compatibility with Opera
              window.clearInterval(pollTimer);
              setactivate(false);
              someFunctionToCallWhenPopUpCloses(seccionID);
            }
          }, 200);

          // ventana.onload = function() {
          //     // Ya se cargó la página y se puede asignar el evento final
          //     console.log('Se c ');

          //     ventana.onunload = function() {
          //         console.log('Se cerró la ventana o el usuario cambió de página');
          //     }
          // };
        }}
      >
        Vincular
      </CButton>
    </div>
  );
};
