import React, { Component, useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import "./assets/css/custom.css";

import tokenAuth from "./config/token";
import domainAuth from "./config/domain";

import Referidor from "./views/pages/clubReferidor/clubReferidor";
import Felicitaciones from "./views/pages/confirmacion/felicitacionesSuscripcion";
import Profiles from "./views/pages/profile/Profiles";
import Dbconfig from "./views/dbconfig";
import Rescues from "./views/pages/login/Rescues";
import Rescueprofile from "./views/pages/login/Rescueprofile";
import { Validacion } from "./Validacion/Validacion";
import Spinner, { Downloading, TokenUnistall } from "./reusable/Spinner";

import {
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import Logout from "./views/pages/login/logout";
import Register0 from "./views/pages/register/Register_Default";
import { useSelector } from "react-redux";
import PantallasView from "./views/public/Pantallas/Pantallas";

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const TurnoTouch = React.lazy(() => import("./views/getTurno/TurnoTouch"));




const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}
const domain = localStorage.getItem("domain");
if (domain) {
  domainAuth(domain);
}

const LoadingBlue = () => {
  return (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
};
const Loading = () => {
  return (
    <HashRouter>
      <React.Suspense fallback={<LoadingBlue />}>
        <Switch>
          <Route
            exact
            path="/auth/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/turno/:id"
            name="Login Page"
            render={(props) => <TurnoTouch {...props} />}
          />
          <Route
            exact
            path="/view/:id"
            name="Login Page"
            render={(props) => <PantallasView {...props} />}
          />




          <Route
            exact
            path="/auth/valid-mail/:id"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/auth/register"
            name="Register Page"
            render={(props) => <Register0 {...props} />}
          />


          <Route
            exact
            path="/auth/rescue"
            name="Recuperacion de Cuenta"
            render={(props) => <Rescues {...props} />}
          />
          <Route
            exact
            path="/RescueAccount/:idRescue"
            name="Recuperacion de Cuenta"
            render={(props) => <Rescueprofile {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/createProfiles/:idSolicitud"
            name="Profiles"
            render={(props) => <Profiles {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            exact
            path="/clubReferidor/:solicitud"
            name="ClubReferidor"
            render={(props) => <Referidor {...props} />}
          />
          <Route
            exact
            path="/felicitaciones/:solicitud"
            name="Felicitaciones"
            render={(props) => <Felicitaciones {...props} />}
          />


          <Route
            path="/bienvenido"
            name="Suscriptor"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path="/logout"
            name="Logout"
            render={(props) => <Logout {...props} />}
          />

          <Route
            path="/"
            name="Home"
            render={(props) => <LayoutProtegido props={props} />}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

const LayoutProtegido = (props) => {
  const { autenticado } = useSelector((state) => state.usuario);

  if (autenticado) {
    return <TheLayout {...props} />;
  } else {
    return <Redirect to={{ pathname: "/auth/login" }} />;
  }
};

function removeIframes() {
  // Obtener todos los iframes dentro del body
  const iframes = document.querySelectorAll('body iframe');

  // Eliminar cada iframe encontrado
  iframes.forEach(iframe => {
    if (!iframe.id) {
      iframe.remove();
    }
  });
}

setInterval(removeIframes, 5000); // Ejecutar cada 5 segundos

class App extends Component {
  // componentDidMount() {
  //   // Evitar clic derecho
  //   document.addEventListener("contextmenu", this.disableRightClick);

  //   // Evitar pulsaciones largas en pantallas táctiles
  //   // document.addEventListener("touchstart", this.disableLongPress, { passive: false });
  // }

  // componentWillUnmount() {
  //   // Eliminar eventos al desmontar el componente
  //   document.removeEventListener("contextmenu", this.disableRightClick);
  //   document.removeEventListener("touchstart", this.disableLongPress);
  // }

  // disableRightClick = (event) => {
  //   event.preventDefault();
  // };

  // disableLongPress = (event) => {
  //   event.preventDefault();
  // };
  render() {
    return <Loading />;
  }
}

export default App;
