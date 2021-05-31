
/************************ Routing can handle by this file ************************/
import {React,Switch,Route,RequestForm,HomePage,PurchaseForm} from '../views/Import'

const Router =() => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/request" component={RequestForm}></Route>
            <Route exact path="/purchase" component={PurchaseForm}></Route>
        </Switch>
    )
}

export default Router
