import {React,Button,MuiThemeProvider,colortheme,Link} from './Import'

const PageNotFound = () => {
    return (
            <div className="container-fluid mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h1 className="text-center display-1 ">404</h1>
                                <h3 className="text-center">oops! Page Not found </h3>  
                                <p  className="text-center">The Page you're looking for does not exist. it might have been moved or deleted</p>

                                {/* GoBack button */}
                                <MuiThemeProvider theme={colortheme}>
                                <div className="text-center"> 
                                    <Button  type="button" variant="contained" color="primary"><Link to='/' className="text-white text-decoration-none">go back</Link></Button>
                                </div>
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>

    )
}

export default PageNotFound;