/****************************** Purchase form *************************************/

import 
{
    React,TextField,MuiThemeProvider,colortheme,Button,useState,axios,toast,useEffect,Autocomplete,useCallback
}
from '../../Import'

const PurchaseForm = () => {

    //purchase_details
    const[purchase_details,setPurchase_details]=useState({
        supplier:'',
        qty:'',
        rate:'',
        delivered_by:'',
        recieved_by:'',
        loaded_by:'',
        unloaded_by:'',
        vehicle_used:'',
    })

    // error_fields
    const[errors,setErrors]=useState({
        delivered_by_error:'',
        loaded_by_error:'',
        qty_error:'',
        rate_error:'',
        recieved_by_error:'',
        supplier_error:'',
        unloaded_by_error:'',
        vehicle_used_error:''

    });

    // Destructing of objects
    const 
    {
        delivered_by_error,loaded_by_error,qty_error,rate_error,recieved_by_error,supplier_error,
        unloaded_by_error,vehicle_used_error
    }=errors;

    const
    {
        supplier,delivered_by,recieved_by,loaded_by,unloaded_by,vehicle_used,
    }=purchase_details;


    


   
    //used for removing duplicate entries
     const [sets]=useState({
        delivered_by:new Set(),
        loaded_by:new Set(),
        qty:new Set(),
        rate:new Set(),
        recieved_by:new Set(),
        supplier:new Set(),
        unloaded_by:new Set(),
        vehicle_used:new Set()

    });
  
    const [searchArray]=useState({
        delivered_by:[],
        loaded_by:[],
        qty:[],
        rate:[],
        recieved_by:[],
        supplier:[],
        unloaded_by:[],
        vehicle_used:[]
    });


    //get all purchase_details
    const fetch_purchase_details=useCallback(
        () => {
            try
            {
                axios.get('/get_distinct_purchase_details')
                .then((res)=>{
                    
                    if(res.data.result)
                    {
                        
                        res.data.result.map((data,index)=>{
                            return(
                                sets.delivered_by.add(data.delivered_by),
                                sets.loaded_by.add(data.loaded_by),
                                sets.qty.add(data.qty),
                                sets.rate.add(data.rate),
                                sets.recieved_by.add(data.recieved_by),
                                sets.supplier.add(data.supplier),
                                sets.unloaded_by.add(data.unloaded_by),
                                sets.vehicle_used.add(data.vehicle_used)
                            )
                           
                        })
    
                     
                        //delivered_by
                        for (let item of  sets.delivered_by) {
                            searchArray.delivered_by.push(item);
                        }
    
                        //loaded_by
                        for (let item of  sets.loaded_by) {
                            searchArray.loaded_by.push(item);
                        }
    
                        //qty
                        for (let item of  sets.qty) {
                            searchArray.qty.push(item);
                        }
    
                        //rate
                        for (let item of  sets.rate) {
                            searchArray.rate.push(item);
                        }
    
                        //recieved_by
                        for (let item of  sets.recieved_by) {
                            searchArray.recieved_by.push(item);
                        }
    
                        //supplier
                        for (let item of  sets.supplier) {
                            searchArray.supplier.push(item);
                        }
    
                        //unloaded_by
                        for (let item of  sets.unloaded_by) {
                            searchArray.unloaded_by.push(item);
                        }
    
                        //vehicle_used
                        for (let item of  sets.vehicle_used) {
                            searchArray.vehicle_used.push(item);
                        }
                    }
                    else if(res.data.error)
                    {
                        toast.error(res.data.error,{autoClose: false}); 
                    }
    
                }).catch((err)=>{
                    toast.error(err,{autoClose: false});  
                })
            }
            catch (error) {
                toast.error(error,{autoClose: false});  
            }
        },
        [searchArray,sets],
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
            
                if(res.data.errors)
                {
                    const {
                        delivered_by_error,loaded_by_error,qty_error,rate_error,recieved_by_error,supplier_error,
                        unloaded_by_error,vehicle_used_error
                    }=res.data.errors;

                    setErrors({
                        delivered_by_error,loaded_by_error,qty_error,rate_error,recieved_by_error,supplier_error,
                        unloaded_by_error,vehicle_used_error
                    });
                   
                }

                if(res.data.success)
                {
                    setPurchase_details({
                        supplier:'',
                        qty:'',
                        rate:'',
                        delivered_by:'',
                        recieved_by:'',
                        loaded_by:'',
                        unloaded_by:'',
                        vehicle_used:'',
                       
                    });

                    setErrors({
                      delivered_by_error:'',
                      loaded_by_error:'',
                      qty_error:'',
                      rate_error:'',
                      recieved_by_error:'',
                      supplier_error:'',
                      unloaded_by_error:'',
                      vehicle_used_error:''
                    });

                   searchArray.delivered_by=[];
                   searchArray.loaded_by=[];
                   searchArray.qty=[];
                   searchArray.rate=[];
                   searchArray.recieved_by=[];
                   searchArray.supplier=[];
                   searchArray.unloaded_by=[];
                   searchArray.vehicle_used=[];

                   fetch_purchase_details();
                    
                    event.target.reset();
                    // toast.success(res.data.success);
                }
                else if(res.data.error)
                {
                    toast.error(res.data.error,{autoClose: false});
                }
        })
    
    }
    
    return (
      <section className="purchase_section mt-5">
        <div className="container">
          <div className="row ">
            {/* content */}
            <div className="content mt-3">
              <form
                onSubmit={submit}
                method="POST"
                className="form-group"
                id="submit"
                autoComplete="off"
              >
                {/* purchase Details */}
                <MuiThemeProvider theme={colortheme}>
                  <div className="row">
                    <div className="title">
                      <h3>Enter Purchase Details</h3>
                      <hr />
                    </div>

                    {/* Supplier */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="supplier">Supplier</label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={supplier}
                          disableClearable
                          options={searchArray.supplier.map((data) => data)}
                          
                          className="mt-1"
                          onChange={(event, value) => {
                            setPurchase_details((prevValue) => {
                              return {
                                ...prevValue,
                                supplier: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="supplier"
                              id="supplier"
                              onChange={inputEvent}
                              className="form-control"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                              error={(supplier_error) ? true : false}
                              helperText={supplier_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* quantity */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="qty">Quantity </label>
                      
                        <TextField
                          type="number"
                          name="qty"
                          id="qty"
                          inputProps={{ min: "0", step: "0.01" }}
                          onChange={inputEvent}
                          onWheelCapture={(e)=>e.target.blur()}
                          className="form-control mt-1"
                          error={(qty_error) ? true : false}
                          helperText={qty_error}
                        />
                     
                    </div>

                    {/* Rate */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="rate">Rate </label>
                      
                        <TextField
                          type="number"
                          name="rate"
                          id="rate"
                          inputProps={{ min: "0", step: "0.01" }}
                          onWheelCapture={(e)=>e.target.blur()}
                          onChange={inputEvent}
                          className="form-control mt-1"
                          error={(rate_error) ? true : false}
                          helperText={rate_error}
                        />
                      
                    </div>

                    {/* Delivered By */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="delivered_by">Delivered By</label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={delivered_by}
                          disableClearable
                          options={searchArray.delivered_by.map((data) => data)}
                          
                          className="mt-1"
                          onChange={(event, value) => {
                            setPurchase_details((prevValue) => {
                              return {
                                ...prevValue,
                                delivered_by: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="delivered_by"
                              id="delivered_by"
                              onChange={inputEvent}
                              className="form-control"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                              error={(delivered_by_error) ? true : false}
                              helperText={delivered_by_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* Recieved By */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="recieved_by">Recieved By</label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={recieved_by}
                          disableClearable
                          options={searchArray.recieved_by.map((data) => data)}
                          
                          className="mt-1"
                          onChange={(event, value) => {
                            setPurchase_details((prevValue) => {
                              return {
                                ...prevValue,
                                recieved_by: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="recieved_by"
                              id="recieved_by"
                              onChange={inputEvent}
                              className="form-control"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                              error={(recieved_by_error) ? true : false}
                              helperText={recieved_by_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* Loaded By */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="loaded_by">Loaded By</label>
                    
                        <Autocomplete
                          freeSolo
                          inputValue={loaded_by}
                          disableClearable
                          options={searchArray.loaded_by.map((data) => data)}
                          
                          className="mt-1"
                          onChange={(event, value) => {
                            setPurchase_details((prevValue) => {
                              return {
                                ...prevValue,
                                loaded_by: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="loaded_by"
                              id="loaded_by"
                              onChange={inputEvent}
                              className="form-control"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                              error={(loaded_by_error) ? true : false}
                              helperText={loaded_by_error}
                            />
                          )}
                        />
                    
                    </div>

                    {/* Unloaded By */}
                    <div className="col-lg col-md-6 mt-3">
                      <label htmlFor="unloaded_by">Unloaded By</label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={unloaded_by}
                          disableClearable
                          options={searchArray.unloaded_by.map((data) => data)}
                          
                          className="mt-1"
                          onChange={(event, value) => {
                            setPurchase_details((prevValue) => {
                              return {
                                ...prevValue,
                                unloaded_by: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="unloaded_by"
                              id="unloaded_by"
                              onChange={inputEvent}
                              className="form-control"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                              error={(unloaded_by_error) ? true : false}
                              helperText={unloaded_by_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* Vehicle Used */}
                    <div className="col-lg col-md-6 mt-3">
                      <label htmlFor="vehicle_used">Vehicle Used</label>
                      
                        <Autocomplete
                          freeSolo
                          inputValue={vehicle_used}
                          disableClearable
                          options={searchArray.vehicle_used.map((data) => data)}
                        
                          className="mt-1"
                          onChange={(event, value) => {
                            setPurchase_details((prevValue) => {
                              return {
                                ...prevValue,
                                vehicle_used: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="vehicle_used"
                              id="vehicle_used"
                              onChange={inputEvent}
                              className="form-control"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                              error={(vehicle_used_error) ? true : false}
                              helperText={vehicle_used_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* submit button */}
                    <div className=" mt-1 mb-5">
                      <MuiThemeProvider theme={colortheme}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="mt-4"
                        >
                          submit
                        </Button>
                      </MuiThemeProvider>
                    </div>
                  </div>
                </MuiThemeProvider>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}

export default PurchaseForm
