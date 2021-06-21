/************************** Main page  of this project ***************************/

import {React,Stayhome,RegisterForm,LoginForm,useLocation} from './Import'

const Main = () => {

    return (
        <section className="main-section mt-5">
            <div className="container">
                <div className="row d-flex justify-content-center flex-wrap">

                    {/* image */}
                    <div className="content_img col-md-6 col-xl-5 d-flex align-items-center">
                        <img src={Stayhome} alt="stayhome.png"  className="img-fluid"/>
                    </div>

                    {/* content */}
                    <div className="content col-md-6  col-xl-4 mt-3">
                        {
                             (useLocation().pathname === "/register") ? <RegisterForm/> : <LoginForm/> 
                        }
                   
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Main
