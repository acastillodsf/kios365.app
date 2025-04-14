import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const ListaCuenta2 = ({ data }) => {
  const history = useHistory();
  return (
    <CCard borderColor="success">
      <CCardHeader>Mis Cuentas</CCardHeader>
      <CCardBody>
        <CDataTable
          items={data}
          fields={[
            { key: "cuenta", label: "Cuenta" },
            { key: "producto", label: "Producto" },
            { key: "divisa", label: "Divisa" },
            { key: "balance", label: "Balance" },
            { key: "disponible", label: "Disponible" },
            { key: "Opciones", label: "Opcion" },
          ]}
          hover
          sorter
          scopedSlots={{
            Opciones: (item) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => history.push(`/account/AH/${item.id}`)}
                  >
                    Seleccionar
                  </CButton>
                </td>
              );
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

const MobileView = ({data,match,form,history})=>{
  return (
  <table className="table table-hover table-outline d-block d-sm-block d-md-none" style={{width:'100%'}}>
          <thead className="thead-light">
            <tr>
              <th  style={{width:'100%'}}>Cuenta</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((row) => {
              if (
                match.params.filtro === "" ||
                (match.params.filtro === "aportaciones" &&
                  row.tipocuenta === 2) ||
                (match.params.filtro === "cuentas" && row.tipocuenta === 1) ||
                (match.params.filtro === "certificados" &&
                  row.tipocuenta === 4) ||
                match.params.filtro === undefined
              ) {
                return (
                  <tr>
                    <td>
                      <div>{row.producto}</div>
                      <small>{row.cuenta}</small> <br />
                      <small>
                        Balance{" "}
                        {row.tipocuenta === 4
                          ? ""
                          : Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: row.divisa,
                            }).format(row.balance)}
                      </small>
                    </td>
 
                     
                     
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        disabled={row.tipocuenta === 4}
                        onClick={() => history.push(`${form}/${row.id}`)}
                      >
                        Consultar
                      </CButton>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
  )
}
export const ListaCuenta = ({ data, match }) => {
  const history = useHistory();
  return (
    <CCard borderColor="success">
      <CCardBody style={{ padding: "31px 0px" }}>
        <CCol>
          <div class="text-md-left mt-0">
            <h3 class="text-primary">Productos</h3>
          </div>
        </CCol>

        {/* <table className="table table-hover table-outline mb-0 d-none d-sm-table"> */}
        {/* Mobile  */}
        <MobileView data={data} match={match} form="/account/AH" history={history} />

        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th>Cuenta</th>
              <th>Producto</th>
              <th>Balance</th>
              <th>Disponible</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              if (
                match.params.filtro === "" ||
                (match.params.filtro === "aportaciones" &&
                  row.tipocuenta === 2) ||
                (match.params.filtro === "cuentas" && row.tipocuenta === 1) ||
                (match.params.filtro === "certificados" &&
                  row.tipocuenta === 4) ||
                match.params.filtro === undefined
              ) {
                return (
                  <tr>
                    <td>
                      <div>{row.cuenta}</div>
                    </td>
                    <td className="text-left">
                      <div>{row.producto}</div>
                    </td>
                    <td className="text-right">
                      {row.tipocuenta === 4
                        ? ""
                        : Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: row.divisa,
                          }).format(row.balance)}
                    </td>
                    <td className="text-right">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: row.divisa,
                      }).format(row.disponible)}
                    </td>
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                         onClick={() => {
                          if(row.tipocuenta === 4){
                            history.push(`/estado/certificado/${row.id}`)
                          }else{
                            history.push(`/estado/cuenta/${row.id}`)
                          }
                          
                        }}
                      >
                        Consultar
                      </CButton>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </CCardBody>
    </CCard>
  );
};

export const ListaCertificados = ({ data }) => {
  console.log(data);
  const history = useHistory();
  return (
    <CCard borderColor="success">
      <CCardBody style={{ padding: "31px 0px" }}>
        <CCol>
          <div class="text-md-left mt-0">
            <h3 class="text-primary">Certificados </h3>
          </div>
        </CCol>
        
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th>Cuenta</th>
              <th>Producto</th>
              <th>Ultimo Pago</th>
              <th>Monto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr>
                  <td>
                    <div>{row.cuenta}</div>
                  </td>
                  <td className="text-left">
                    <div>{row.producto}</div>
                  </td>
                  <td className="text-right">{row.ultimopago}</td>
                  <td className="text-right">{row.fbalance} </td>
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`/account/${row.id}`)}
                    >
                      Consultar
                    </CButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CCardBody>
    </CCard>
  );
};

const Fnumber = (e) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(e);
};
export const ListaPrestamos = ({ data }) => {
  const history = useHistory();
  return (
    <CCard borderColor="success">
      <CCardBody style={{ padding: "31px 0px" }}>
        <CCol>
          <div class="text-md-left mt-0">
            <h3 class="text-primary">Prestamos </h3>
          </div>
        </CCol>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th>Cuenta</th>
              <th>Producto</th>
              <th>Divisa</th>
              <th>Estado</th>
              <th>Monto</th>
              <th>Bal.Capital</th>
              <th>Cap.venc.</th>
              <th>Interes</th>
              <th>Mora</th>
              <th>Pagar Hoy</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr>
                  <td>
                    <div>{row.cuenta}</div>
                  </td>
                  <td className="text-left">
                    <div>{row.producto}</div>
                  </td>
                  <td>{row.estado}</td>
                  <td>{Fnumber(row.monto)}</td>
                  <td className="text-right">{Fnumber(row.balancecap)}</td>
                  <td className="text-right">{Fnumber(row.capvencido)}</td>
                  <td className="text-right">{Fnumber(row.interes)} </td>
                  <td className="text-right">{Fnumber(row.mora)} </td>
                  <td className="text-right">{Fnumber(row.pagarhoy)} </td>
                  <td className="text-right">{Fnumber(row.balance)} </td>
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`/estado/prestamo/${row.id}`)}
                    >
                      Consultar
                    </CButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CCardBody>
    </CCard>
  );
};
