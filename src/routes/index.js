import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AdminLogIn = React.lazy(() => import('../pages/AdminLogIn'))
const AdminRoute = React.lazy(() => import('./AdminRoute'))
const NormalRoute = React.lazy(() => import('./NormalRoute'))

function MainRoute(){
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>
        <Switch>
          <Route path='/admin/login' exact component={AdminLogIn} />
          <Route path='/admin' component={AdminRoute}/>
          <Route path='/*' component={NormalRoute} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default MainRoute;