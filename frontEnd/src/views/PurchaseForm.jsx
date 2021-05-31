/****************************** Purchase form *************************************/

import 
{
    React,Header,TextField,MuiThemeProvider,colortheme,Button,useState,axios,toast,useCallback,useEffect
}
from './Import'

const PurchaseForm = () => {

    //purchase_details
    const[purchase_details,setPurchase_details]=useState({
        'supplier':'',
        'qty':'',
        'rate':'',
        'delivered_by':'',
        'recieved_by':'',
        'loaded_by':'',
        'unloaded_by':'',
        'vehicle_used':'',
        'values':""
    })

    //search array
    const [searchArray,setSearchArray]=useState([]);

    //get all requester_details
    const fetch_purchase_details = useCallback(
        ()=>{
            axios.get('/get_purchase_details')
            .then((res)=>{
                
                if(res.data.result)
                {
                    console.log(res.data.result);
                    setSearchArray(res.data.result);
                }
                else if(res.data.error)
                {
                    toast.error(res.data.error,{autoClose: false}); 
                }

            }).catch((err)=>{
                toast.error(err,{autoClose: false});  
            })
        },[]
    )

    useEffect(() => {
        fetch_purchase_details();
    }, [fetch_purchase_details])
    
    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        const{name,value}=event.target;
        setPurchase_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
    }

    //submit
    const submit = (event) =>{

        event.preventDefault();
       
        //send data
        axios.post('/store_purchase_details',purchase_details)
        .then((res)=>{
            if(res.data.success)
            {
                setPurchase_details({
                    'supplier':'',
                    'qty':'',
                    'rate':'',
                    'delivered_by':'',
                    'recieved_by':'',
                    'loaded_by':'',
                    'unloaded_by':'',
                    'vehicle_used':'',
                    'values':[]
                });
                event.target.reset();
                toast.success(res.data.success);
            }
            else if(res.data.error)
            {
                toast.error(res.data.error,{autoClose: false});
            }

        }).catch((err)=>{
            toast.error(err,{autoClose: false});
        });
    }
    
    return (
        <section className="purchase_section">

            {/* header */}
            <Header/>

            {/* content */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">

                            {/* card-title */}
                            <h2 className="text-uppercase font-weight-bold card-title text-center mt-2">purchase Form</h2><hr/>

                            <div className="card-body">

                                <form onSubmit={submit} method="POST" className="form-group" id="submit" autoComplete="off">

                                    {/* purchase Details */}
                                    <div className="card">
                                        <div className="card-body">

                                            {/* heading */}
                                            <h4 className="card-title">Purchase Details</h4>

                                            <div className="row mt-4">

                                                {/* Supplier */}
                                                <div className="col-lg">
                                                    <label htmlFor="supplier">Supplier</label>
                                                    <TextField size="small" variant="outlined" className="form-control mt-2" type="text"  name="supplier" id="supplier" onChange={inputEvent} required={true} />
                                                </div>

                                                {/* quantity */}
                                                <div className="col-lg">
                                                    <label htmlFor="qty" >Quantity</label>
                                                    <TextField size="small" variant="outlined" className="form-control mt-2" type="text"  name="qty" id="qty" onChange={inputEvent} required={true} />
                                                </div>

                                                {/* Rate */}
                                                <div className="col-lg">
                                                    <label htmlFor="rate" >Rate</label>
                                                    <TextField  size="small" variant="outlined" className="form-control mt-2" type="text"  name="rate" id="rate" onChange={inputEvent} required={true} />
                                                </div>

                                            </div>

                                            <div className="row mt-2">

                                                {/* Delivered By */}
                                                <div className="col-lg">
                                                    <label htmlFor="delivered_by" >Delivered By</label>
                                                    <TextField  size="small" variant="outlined" className="form-control mt-2" type="text"  name="delivered_by" id="delivered_by" onChange={inputEvent} required={true} />
                                                </div>

                                                {/* Recieved By */}
                                                <div className="col-lg">
                                                    <label htmlFor="recieved_by" >Recieved By</label>
                                                    <TextField  size="small" variant="outlined" className="form-control mt-2" type="text"  name="recieved_by" id="recieved_by" onChange={inputEvent} required={true} />
                                                </div>

                                                 {/* Loaded By */}
                                                 <div className="col-lg">
                                                    <label htmlFor="loaded_by" >Loaded By</label>
                                                    <TextField  size="small" variant="outlined" className="form-control mt-2" type="text"  name="loaded_by" id="loaded_by" onChange={inputEvent} required={true} />
                                                </div>

                                            </div>

                                            <div className="row mt-2">

                                                 {/* Unloaded By */}
                                                 <div className="col-lg">
                                                    <label htmlFor="unloaded_by" >Unloaded By</label>
                                                    <TextField  size="small" variant="outlined" className="form-control mt-2" type="text"  name="unloaded_by" id="unloaded_by" onChange={inputEvent} required={true} />
                                                </div>

                                                 {/* Vehicle Used */}
                                                 <div className="col-lg">
                                                    <label htmlFor="vehicle_used" >Vehicle Used</label>
                                                    <TextField  size="small" variant="outlined" className="form-control mt-2" type="text"  name="vehicle_used" id="vehicle_used" onChange={inputEvent} required={true} />
                                                </div>


                                            </div>

                                            <div className="row mt-1">
                        
                                                {/* submit button */}
                                                <MuiThemeProvider theme={colortheme}>
                                                    <Button  type="submit" variant="contained" color="primary" className="mt-4">submit</Button>  
                                                </MuiThemeProvider>

                                             </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default PurchaseForm
