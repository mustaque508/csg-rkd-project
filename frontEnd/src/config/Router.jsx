
/************************ Routing can handle by this file ************************/
import {React,Switch,Route,Main,Welcome} from '../views/Import'

const Router =() => {
    return (
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/register" component={Main}></Route>
            <Route exact path="/welcome" component={Welcome}></Route>

            {/* request */}
            <Route exact path="/request" component={Welcome}></Route>
            <Route exact path="/request-view" component={Welcome}></Route>
            <Route exact path="/request-edit-delete" component={Welcome}></Route>

            {/* purchase */}
            <Route exact path="/purchase" component={Welcome}></Route>
            <Route exact path="/purchase-view" component={Welcome}></Route>
            <Route exact path="/purchase-edit-delete" component={Welcome}></Route>

            {/* distribute */}
            <Route exact path="/distribute" component={Welcome}></Route>
            <Route exact path="/distribute-view" component={Welcome}></Route>
            <Route exact path="/distribute-edit-delete" component={Welcome}></Route>

        </Switch>
    )
}

export default Router
