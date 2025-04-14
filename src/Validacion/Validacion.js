import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from 'src/actions/settingAction';
import { AlertMensaje, Downloading } from 'src/reusable/Spinner';

export const Validacion = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(getSetting()) }, [])

  const { inicializado, error, statusCode, settingApp } = useSelector((state) => state.appSetting);


  console.log(settingApp)
  if (parseInt(statusCode) === 401) {
    return <AlertMensaje value={error} />
  }

  if (!inicializado) {
    return <Downloading />;
  }

  document.title = settingApp.nameApp;
  document.descripcion = settingApp.nameApp;

  var favicon = document.getElementById("favicon");
  favicon.href = settingApp.favicon;



  return (
    <div></div>
  )
}
