/************************************ Welcome component  ************************************************/

import
{
    React,NavBar,useLocation,RequestForm,Distribute,PurchaseForm,HomePage,RequestView,PurchaseView,DistributeView,
    RequestEditDelete,PurchaseEditDelete,DistributeEditDelete
}
 from '../../Import'


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
                             (location.pathname === '/distribute') ? <Distribute/> :
                             (location.pathname === '/request-view')? <RequestView/> :
                             (location.pathname === '/purchase-view')? <PurchaseView/> :
                             (location.pathname === '/distribute-view')? <DistributeView/> :
                             (location.pathname === '/request-edit-delete')? <RequestEditDelete/> :
                             (location.pathname === '/purchase-edit-delete')? <PurchaseEditDelete/> :
                             (location.pathname === '/distribute-edit-delete')? <DistributeEditDelete/> :<HomePage/>
                         }   
                    </div>
                </div>
            </div>
        </section>

        
    )
}

export default Welcome
