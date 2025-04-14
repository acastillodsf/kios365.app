import { CButton, CCol, CDataTable, CInput, CRow } from "@coreui/react";
import React, { Fragment } from "react";
import NumberFormat from "react-number-format";
import { CustomSelectAccount } from "./CustomSelectAccount";
import { Button } from "@coreui/coreui";
import { Icon } from "@iconify/react";

const lineEmpty = {
  empleado: { value: "", label: "" },
  descripcion: "",
  monto: 0,
  comision: 0,
  montocomision: 0,
  importe: 0,
};

export const RegistroDetalles = ({
  detalle,
  onchange,
  data,
  saldo,
  saldocomision,
}) => {
  const ComponetValor = (campo, item, indx) => {
    return (
      <td>
        <NumberFormat
          className="form-control text-right"
          value={item[campo]}
          name={campo}
          thousandSeparator={true}
          //   prefix={`${divisa}$ `}
          onValueChange={(values) => {
            const { value } = values;

            const seleccion = [];

            // eslint-disable-next-line array-callback-return
            detalle.map((row, index) => {
              if (indx === index) {
                switch (campo) {
                  case "monto":
                    const montocomision =
                      parseFloat(value) * (parseFloat(row.comision) / 100);

                    const importe = parseFloat(value) - montocomision;

                    seleccion.push({
                      ...row,
                      [campo]: value,
                      importe: importe,
                      montocomision: montocomision,
                    });
                    break;
                  default:
                    seleccion.push({
                      ...row,
                      [campo]: parseFloat(value),
                    });
                    break;
                }
              } else {
                seleccion.push({
                  ...row,
                });
              }
            });

            console.log(seleccion);

            onchange(seleccion);
          }}
        />
      </td>
    );
  };

  const change = (e, inx) => {
    const seleccion = [];

    // eslint-disable-next-line array-callback-return

    detalle.map((row, index) => {
      if (inx === index) {
        switch (e.target.name) {
          case "empleado":
            seleccion.push({
              ...row,
              [e.target.name]: e.target.value,
              comision: e.target.value.comision,
            });
            break;
          case "monto":
            const montocomision =
              parseFloat(e.target.value) * (parseFloat(row.comision) / 100);

            const importe = parseFloat(row.monto) - montocomision;

            seleccion.push({
              ...row,
              [e.target.name]: e.target.value,
              importe: importe,
              montocomision: montocomision,
            });
            break;
          default:
            seleccion.push({
              ...row,
              [e.target.name]: e.target.value,
            });
            break;
        }
      } else {
        seleccion.push({
          ...row,
        });
      }
    });

    console.log("Cambios=>", seleccion);

    onchange(seleccion);
  };

  const AgregarLineas = () => {
    const seleccion = detalle;
    seleccion.push(lineEmpty);
    seleccion.push(lineEmpty);
    seleccion.push(lineEmpty);
    onchange(seleccion);
  };

  return (
    <Fragment>
      <CRow>
        <CCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            marginLeft: "-19px",
          }}
        >
          <Icon
            icon="icon-park-outline:history-query"
            width={30}
            color="#65a30d"
            style={{ margin: 10, marginLeft: 0 }}
          />
          <h5>Detalle de la Transaccion</h5>
        </CCol>
      </CRow>
      <CRow>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th style={{ width: "30rem" }}>Chofer</th>
              <th style={{ width: "12rem" }} className="text-center">
                Monto
              </th>
              <th style={{ width: "12rem" }} className="text-center">
                Comision %
              </th>
              <th style={{ width: "12rem" }} className="text-center">
                Monto Comision
              </th>
              <th style={{ width: "12rem" }} className="text-center">
                Importe
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {detalle.map((row, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <CustomSelectAccount
                      data={data}
                      value={row.empleado}
                      //   onchange={(e) => console.log(e)}
                      name="empleado"
                      sview={true}
                      onChange={(e) => {
                        change(e, index);
                      }}
                    />
                  </td>

                  {ComponetValor("monto", row, index)}
                  {ComponetValor("comision", row, index)}
                  <td>
                    <NumberFormat
                      className="form-control text-right"
                      value={row.montocomision}
                      thousandSeparator={true}
                      disabled
                      //   prefix={`${divisa}$ `}
                    />
                  </td>
                  {ComponetValor("importe", row, index)}
                </tr>
              );
            })}
          </tbody>
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th style={{ width: "30rem" }}></th>
              <th style={{ width: "12rem" }} className="text-center">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(saldo)
                  .replace("$", "RD$ ")}
              </th>
              <th style={{ width: "12rem" }} className="text-center"></th>
              <th style={{ width: "12rem" }} className="text-center">
              {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(saldocomision)
                  .replace("$", "RD$ ")}
              </th>
              <th style={{ width: "12rem" }} className="text-center">
              {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(saldo-saldocomision)
                  .replace("$", "RD$ ")}
              </th>
              <th></th>
            </tr>
          </thead>
          
        </table>
      </CRow>
      <CRow style={{ marginTop: 10 }}>
        <CCol style={{ padding: 0 }}>
          <CButton color="primary" variant="outline" onClick={AgregarLineas}>
            Agregar linea
          </CButton>
        </CCol>
         
      </CRow>
    </Fragment>
  );
};
