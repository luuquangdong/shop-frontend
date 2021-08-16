import NormalLayout from "pages/NormalLayout"
import { Route, Switch } from "react-router-dom";

function NormalRoute(props) {
  return (
    <NormalLayout>
      <div>Hello world!</div>
      <Switch>
        <Route path='/one' component={NormalOne}/>
        <Route path='/two' component={NormalTwo}/>
        <Route path='/three' component={NormalThree}/>
      </Switch>
    </NormalLayout>
  )
}

export default NormalRoute

const NormalOne = () => (<div>Normal one</div>)
const NormalTwo = () => (<div>Normal two</div>)
const NormalThree = () => (<div>Normal three</div>)