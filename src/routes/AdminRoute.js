import AdminAddProductPage from "pages/AdminAddProductPage";
import AdminOrderAll from "pages/AdminOrderAll";
import AdminPageLayout from "pages/AdminPageLayout";
import AdminProductDetailPage from "pages/AdminProductDetailPage";
import ProductManagerPage from "pages/ProductManagerPage";
import { Redirect, Route, Switch } from "react-router-dom";

function AdminRoute(props) {
  const { match } = props;
  return (
    <AdminPageLayout>
      <Switch>
        <Redirect from="/admin" exact to="/admin/dashboard" />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route
          path={`${match.path}/products/all`}
          component={ProductManagerPage}
        />
        <Route
          path={`${match.path}/products/add`}
          component={AdminAddProductPage}
        />
        <Route
          path={`${match.path}/products/:id`}
          component={AdminProductDetailPage}
        />
        <Route path={`${match.path}/orders/all`} component={AdminOrderAll} />
        <Route path={`${match.path}/three/one`} component={AdminFive} />
        <Route path={`${match.path}/three/two`} component={AdminSix} />
      </Switch>
    </AdminPageLayout>
  );
}

export default AdminRoute;

const AdminFive = () => <div>Admin Five</div>;
const AdminSix = () => <div>Admin Six</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
