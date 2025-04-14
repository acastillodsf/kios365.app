import React, { useEffect, useState } from 'react'
import clienteAxios from 'src/config/axios';
import { Nacionalidades } from 'src/data/nacionalidades';
import { ProvinciaRD } from 'src/data/provincia';



const Dbconfig = () => {


    useEffect(() => {
        configuracion(); 
    }, [])

    const [estado,setEstado] = useState('');

    const configuracion = async() =>{

        setEstado('Enviando configuracion');

        const config = {
            nacionalidades : Nacionalidades,
            provincia : ProvinciaRD
        };

        try {
            const peticion = await clienteAxios.post("/auth/config", config);
            setEstado(peticion.data);
          } catch (error) {
            setEstado(error.response.statusText);
            console.log('->');
            console.log(error.response);
            console.log(error.response.data);
          }
    }


    return (
        <div>
            <h>{estado}</h>
        </div>
    )
}



export default Dbconfig;