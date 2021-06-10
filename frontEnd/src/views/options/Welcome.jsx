/************************************ Welcome component  ************************************************/

import
{
    React,NavBar,useLocation,RequestForm,Distribute,PurchaseForm
}
 from '../Import'


const Welcome = () => {

    const location=useLocation();

    return (
        <section className="welcome-section">

            {/* navbar */}
            <div className="nav-bar">
                <NavBar/>
            </div>
           
            {/* content */}
            <div className="content">
                <div className="container mt-5">
                    <div className="row">
                         {
                             (location.pathname === '/request') ? <RequestForm /> :
                             (location.pathname === '/purchase') ? <PurchaseForm/> :
                             (location.pathname === '/distribute') ? <Distribute/> : "Homepage"
                         }   
                    </div>
                </div>
            </div>
        </section>

        
    )
}

export default Welcome
