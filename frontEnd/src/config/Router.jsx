
/************************ Routing can handle by this file ************************/
import {React,Switch,Route,RequestForm} from '../views/Import'

const Router =() => {
    return (
        <Switch>
            <Route exact path="/" component={RequestForm}></Route>
        </Switch>
    )
}

export default Router
