const axios = require("axios");

const { exec } = require("child_process");

const fs = require("fs");
const mime = require("mime-types");
const path = require("path");
const crypto = require("crypto");




// Función para convertir un archivo a base64
function fileToBase64(filePath) {
  // Lee el archivo
  const fileData = fs.readFileSync(filePath);

  // Convierte el archivo a base64
  const base64Data = fileData.toString("base64");

  return base64Data;
}

const Actualizar = async () => {



  const config = './src/config/coop.config.js';

  // Leer el archivo de configuración
  fs.readFile(config, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }

    // Modificar el valor de produccion a true
    const nuevoContenido = data.replace(/produccion:\s*false/, 'produccion: true');

    // Sobrescribir el archivo con el nuevo contenido
    fs.writeFile(config, nuevoContenido, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
        return;
      }
      console.log('Archivo actualizado con éxito.');
    });
  });




  const file = `${__dirname}/build/coopsys.zip`;
  console.log("Compilando");
  await exec(
    `sh ${__dirname}/actualizar_script.sh`,
    async (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Ha finalizado la Ejecucion de Actualizar')
    }
  );
};

Actualizar();
