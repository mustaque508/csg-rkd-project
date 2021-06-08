
/***************************** HomePage component ***********************************/

import {React,Header,useLocation} from './Import'

const HomePage = () => {

    const location=useLocation();
    return (
            <>
                <Header/>
                <p>{location.state.username}</p> 
            </>
           
        
    )
}

export default HomePage
