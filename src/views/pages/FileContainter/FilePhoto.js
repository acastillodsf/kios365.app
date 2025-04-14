import { CButton, CFormGroup, CImg, CInput, CInputFile, CLabel } from "@coreui/react";
import React, { useState } from "react";

import "./Photos.css";

export const FilePhoto = ({ title,name,onChange }) => {

    const [Files,setFiles] = useState({
        type:'none'
      });
      const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
      };
    
      const handleFileInputChange = e => {
     
       let file = e.target.files[0];
    
        getBase64(file)
          .then(result => {
            file["base64"] = result;
            console.log(file);
            setFiles(file)
            onChange({
                target:{
                    name:name,
                    value: file.base64
                }
            })
          })
          .catch(err => {
            console.log(err);
          });
    
         
      };
  return (
    <div class="photo container">
      <h3>{title}</h3>
      <input type="file" name="file"  onChange={handleFileInputChange} />
      <div class="drag-area">
        <div class="icon">
          <i class="fas fa-images"></i>
        </div>

        <CImg src={Files.base64} />
 
        <input type="file" hidden />
        <span class="support">Supports: JPEG, JPG, PNG</span>
      </div>
    </div>
  );
};
