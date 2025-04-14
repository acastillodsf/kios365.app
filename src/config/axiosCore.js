import axios from "axios";
import { coopSettings } from "./coop.config";

 
const CoreAxios = axios.create({
  baseURL: 'https://api.coopsys.com.do/core/1.0/access/',
});
CoreAxios.defaults.headers.common["Authorization"] = coopSettings.Autorization;

CoreAxios.interceptors.response.use(function (response) {
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

export default CoreAxios;
