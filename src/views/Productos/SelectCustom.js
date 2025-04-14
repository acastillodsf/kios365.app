import { CCol, CFormGroup, CInputRadio, CLabel, CRow } from "@coreui/react";
import React, { Fragment } from "react";

export const CustomSelect = ({
  id,
  name,
  value,
  label,
  onChange,
  text,
 
}) => {
 

  return (
    <CFormGroup
      variant="checkbox"
      name={name}
      style={{
        padding: "7px 15px",
        border:
          id === value
            ? "2px solid #673de6"
            : "1px solid rgb(218, 217, 218)",
        margin: "9px 0 5px 0",
        borderRadius: "4px",
        background: id === 0 ? "rgb(213 211 227)" : "",
        fontWeight: id === 0 ? "bold" : "",
      }}
      onClick={() => onChange()}
    >
      <CRow
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
 
          <Fragment>
            <CCol md={text===undefined ? 12 : 6} xs="9">
              <CInputRadio
                className="form-check-input"
                id={id}
                name={name}
                value="option1"
                checked={id === value}
              />
              <CLabel variant="checkbox" htmlFor="radio1">
                {label}  
              </CLabel>
            </CCol>
            <CCol md="6" xs="3" style={{ background:"red", textAlign: "right",display: text===undefined ? "none" : "" }}>
              <CLabel>
                {text}
              </CLabel>
            </CCol>
          </Fragment>
      </CRow>
    </CFormGroup>
  );
};

export const SelectCustom = ({ data, value, onChange, name }) => {
  return (
    <>
      {data.map((r, index) => {
        return <CustomSelect id={r.value} value={value} label={r.name} text={r.text} onChange={()=>onChange({target: {
            name : name,
            value : r.value
        }})} />;
      })}
    </>
  );
};
