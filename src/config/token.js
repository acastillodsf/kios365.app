import clienteAxios from "./axios";
import CoreAxios from "./axiosCore";

const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["Authorization"] = token;
    CoreAxios.defaults.headers.common["Authorization"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["Authorization"];
    delete CoreAxios.defaults.headers.common["Authorization"];
  }
};

export default tokenAuth;
