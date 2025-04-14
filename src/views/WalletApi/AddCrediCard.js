import { CButton, CCol, CModal, CModalBody, CModalFooter } from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const AddCrediCard = () => {
  const dispatch = useDispatch();
  const { addCard,SettingCarNet } = useSelector((state) => state.Wallet);



  const {UniqueID,CaptureURL,PublickKey,PWCheckout} = SettingCarNet;


  
  return (
    <CModal
      show={addCard}
      onClose={() => dispatch({ type: "wallet-addCard", show: false })}
    //   closeOnBackdrop={false}
      centered
       style={{
        padding : 0,
        height: 560,
        width: 300,
        borderRadius:10
      }}
      // size=""
    >
      <CModalBody style={{
        padding : 10,
        height: "100%",
        width: "100%"
      }}>
          <iframe
            style={{
              width: "100%",
              height: "100%",
              border: 0,
            }}
            src={CaptureURL}
          />
      </CModalBody>
      
    </CModal>
  );
};
