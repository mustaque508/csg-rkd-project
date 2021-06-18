
/************************ Routing can handle by this file ************************/
import {React,Switch,Route,Main,Welcome,useHistory,useLocation,Redirect,PageNotFound} from '../views/Import'

const Router =() => {

    const history=useHistory();

    const location=useLocation();
    

    return (
        <Switch>
        
            <Route exact path="/" component={Main}></Route>

            <Route exact path="/register">
                    {(history.action === "PUSH") ? <Main/> : <Redirect to="/" /> }
            </Route>

            <Route exact path="/welcome">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
    
        

            {/* request */}
            <Route exact path="/request">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            <Route exact path="/request-view">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            <Route exact path="/request-edit-delete">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            
            {/* purchase */}
            <Route exact path="/purchase">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            <Route exact path="/purchase-view">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            <Route exact path="/purchase-edit-delete">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            

            {/* distribute */}
            <Route exact path="/distribute">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            <Route exact path="/distribute-view">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>
            <Route exact path="/distribute-edit-delete">
                    {(sessionStorage.getItem('uname')) ? <Welcome/> : <Redirect to="/" /> }
            </Route>


            <Route component={PageNotFound} />
        
        </Switch>
    )
}

export default Router;
