import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer } from "@coreui/react";
import { useSelector } from "react-redux";

// routes config
import routes from "../routes";
import Page404 from "src/views/pages/page404/Page404";
import { coopSettings } from "src/config/coop.config";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = ({ ws }) => {
  const { autenticado, error401 } = useSelector((state) => state.usuario);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) =>
                      autenticado ? (
                        <route.component {...props} ws={ws} />
                      ) : error401 ? (
                        <Redirect to={{ pathname: "/401" }} />
                      ) : (
                        <Redirect to={{ pathname: "/auth/login" }} />
                      )
                    }
                  />
                )
              );
            })}
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
