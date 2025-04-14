import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { cerrarSesionAction } from 'src/actions/usuarioAction';

export const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const logOut = () => dispatch(cerrarSesionAction());
  

    useEffect(()=>{
        logOut();
        setTimeout(()=>{history.push('/login')},100)
    },[])
  return (
    <div>logout</div>
  )
}


export default Logout;