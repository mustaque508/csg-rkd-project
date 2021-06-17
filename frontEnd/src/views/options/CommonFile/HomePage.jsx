
/***************************** HomePage component ***********************************/

import {React} from '../../Import'

const HomePage = () => {


    return (
            <section className="homepage-section mt-5">
                <div className="container">
                    <div className="row">
                        <h3>Welcome Back, <span className="text-muted">{sessionStorage.getItem('uname')}</span></h3> 
                    </div>
                </div>
            </section>
        
    )
}

export default HomePage
