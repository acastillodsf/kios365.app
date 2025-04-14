import axios from "axios";
import { coopSettings } from "./coop.config";
 

const clienteAxios = axios.create({
  baseURL: coopSettings.baseURL,
});
// clienteAxios.defaults.headers.common["Authorization"] = coopSettings.Autorization;

clienteAxios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const token = localStorage.getItem("token");

  if (token && 401 === error.response.status) {

   
      localStorage.removeItem("token");
      localStorage.removeItem("uname");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      window.location = '/';


 
  } else {
      return Promise.reject(error);
  }
});

export default clienteAxios;
