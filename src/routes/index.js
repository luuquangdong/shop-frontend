import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AdminLogIn = React.lazy(() => import("../pages/AdminLogIn"));
const AdminRoute = React.lazy(() => import("./AdminRoute"));
const NormalRoute = React.lazy(() => import("./NormalRoute"));

function MainRoute() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin/login" exact component={AdminLogIn} />
          <ProtectedRoute
            roles={["ADMIN"]}
            path="/admin*"
            component={AdminRoute}
          />
          <Route path="/*" component={NormalRoute} />
          <Route path="/not-found" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default MainRoute;
