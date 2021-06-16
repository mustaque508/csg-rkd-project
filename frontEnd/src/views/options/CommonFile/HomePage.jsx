
/***************************** HomePage component ***********************************/

import {React,useLocation} from '../../Import'

const HomePage = () => {

    const location=useLocation();
    return (
            <section className="homepage-section mt-5">
                <div className="container">
                    <div className="row">
                        <h3>Welcome Back, <span className="text-muted">{location.state.username}</span></h3> 
                    </div>
                </div>
            </section>
        
    )
}

export default HomePage
