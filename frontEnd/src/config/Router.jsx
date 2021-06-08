
/************************ Routing can handle by this file ************************/
import {React,Switch,Route,RequestForm,HomePage,PurchaseForm,Distribute,Main,Welcome} from '../views/Import'

const Router =() => {
    return (
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/register" component={Main}></Route>
            <Route exact path="/welcome" component={Welcome}></Route>
            <Route exact path="/request" component={RequestForm}></Route>
            <Route exact path="/purchase" component={PurchaseForm}></Route>
            <Route exact path="/distribute" component={Distribute}></Route>
        </Switch>
    )
}

export default Router
