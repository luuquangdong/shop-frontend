import AdminPageLayout from "pages/AdminPageLayout"
import { Route, Switch } from "react-router-dom";

function AdminRoute(props) {
  const { match } = props;
  console.log(match)
  return (
    <AdminPageLayout>
      <Switch>
        <Route path={`${match.path}/one`} component={AdminOne}/>
        <Route path={`${match.path}/two`} component={AdminTwo}/>
        <Route path={`${match.path}/three`} component={AdminThree}/>
      </Switch>
    </AdminPageLayout>
  )
}

export default AdminRoute

const AdminOne = () => (<div>Admin One</div>)
const AdminTwo = () => (<div>Admin Two</div>)
const AdminThree = () => (<div>Admin Three</div>)