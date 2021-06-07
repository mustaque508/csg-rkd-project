/************************** Main page  of this project ***************************/

import {React,Stayhome,RegisterForm} from './Import'

const Main = () => {

    return (
        <section className="main-section mt-4">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center flex-wrap">

                    {/* image */}
                    <div className="content_img col-sm-6 d-flex align-items-center">
                        <img src={Stayhome} alt="stayhome.png"  className="img-fluid"/>
                    </div>

                    {/* content */}
                    <div className="content col-sm-4">
                        <RegisterForm/>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Main
