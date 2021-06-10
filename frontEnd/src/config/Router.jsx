
/************************ Routing can handle by this file ************************/
import {React,Switch,Route,Main,Welcome} from '../views/Import'

const Router =() => {
    return (
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/register" component={Main}></Route>
            <Route exact path="/welcome" component={Welcome}></Route>
            <Route exact path="/request" component={Welcome}></Route>
            <Route exact path="/purchase" component={Welcome}></Route>
            <Route exact path="/distribute" component={Welcome}></Route>
        </Switch>
    )
}

export default Router
