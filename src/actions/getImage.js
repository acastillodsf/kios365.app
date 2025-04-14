import axios from "axios";
import clienteAxios from "src/config/axios";

export const GetImagen =  async (url) => {
  try {
    const data =  await clienteAxios.get("/getfile", {
      responseType: "blob",
      params: { imagen: url },
    });

    const blob = new Blob([data.data], { type: "image/jpeg" });
    

    const fileUrl = window.URL.createObjectURL(blob);


    return fileUrl;
  } catch (error) {
    return "";
  }
};

