/****************************** Purchase form *************************************/

import 
{
    React,Header,TextField,MuiThemeProvider,colortheme,Button,useState,axios,toast,useCallback,useEffect,$,
    BootstrapTooltip,Autocomplete
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
        'values':[]
    })

    // error_fields
    const[errors,setErrors]=useState({
        'delivered_by_error':'',
        'loaded_by_error':'',
        'qty_error':'',
        'rate_error':'',
        'recieved_by_error':'',
        'supplier_error':'',
        'unloaded_by_error':'',
        'vehicle_used_error':''

    });

    // Destructing of objects
    const 
    {
        delivered_by_error,loaded_by_error,qty_error,rate_error,recieved_by_error,supplier_error,
        unloaded_by_error,vehicle_used_error
    }=errors;


    // show tooltip 
    const [open, setOpen] = useState(false);

    const[tooltip_position,setTooltip_position]=useState("top-end");


    //Hide Tooltip
    const hideToolTip =() =>{
        setOpen(false);
    }

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
    const fetch_purchase_details = useCallback(
        ()=>{
            axios.get('/get_purchase_details')
            .then((res)=>{
                
                if(res.data.result)
                {
                    
                    res.data.result.map((data,index)=>{
                        sets.delivered_by.add(data.delivered_by);
                        sets.loaded_by.add(data.loaded_by);
                        sets.qty.add(data.qty);
                        sets.rate.add(data.rate);
                        sets.recieved_by.add(data.recieved_by);
                        sets.supplier.add(data.supplier);
                        sets.unloaded_by.add(data.unloaded_by);
                        sets.vehicle_used.add(data.vehicle_used);
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
        },[searchArray,sets]
    )

    useEffect(() => {
        fetch_purchase_details();

        // setTooltip_position
        if($(window).width()<992){
            setTooltip_position("right-end");
        }
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
                    setOpen(true);
                }

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
        })
    
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
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="supplier">Supplier</label>
                                                    <BootstrapTooltip title={supplier_error} open={open} placement={tooltip_position}>
                                                        <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.supplier.map((data) => data)}
                                                            onSelect={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        supplier:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="supplier"
                                                                    id="supplier"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        />
                                                    </BootstrapTooltip>
                                                   
                                                </div>

                                                {/* quantity */}
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="qty" >Quantity (Kg) </label>
                                                    <BootstrapTooltip title={qty_error} open={open} placement={tooltip_position}>
                                                        <TextField  type="number" name="qty" id="qty"  inputProps={{ min: "0", step: "1" }} onChange={inputEvent} className="form-control"  onSelect={hideToolTip} />
                                                        {/* <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.qty.map((data) => data)}
                                                            onKeyUp={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        qty:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="number"
                                                                    name="qty"
                                                                    id="qty"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    onKeyUp={hideToolTip}
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        /> */}
                                                    </BootstrapTooltip>
                                                </div>

                                                {/* Rate */}
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="rate" >Rate (Rs) </label>
                                                    <BootstrapTooltip title={rate_error} open={open} placement={tooltip_position}>
                                                        <TextField  type="number" name="rate" id="rate"  inputProps={{ min: "0", step: "1" }} onChange={inputEvent} className="form-control"  onSelect={hideToolTip} />
                                                        {/* <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.rate.map((data) => data)}
                                                            onKeyUp={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        rate:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="rate"
                                                                    id="rate"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    onKeyUp={hideToolTip}
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        /> */}
                                                    </BootstrapTooltip>
                                                </div>

                                            </div>

                                            <div className="row mt-2">

                                                {/* Delivered By */}
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="delivered_by" >Delivered By</label>
                                                    <BootstrapTooltip title={delivered_by_error} open={open} placement={tooltip_position}>
                                                        <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.delivered_by.map((data) => data)}
                                                            onSelect={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        delivered_by:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="delivered_by"
                                                                    id="delivered_by"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        />
                                                    </BootstrapTooltip>
                                                </div>

                                                {/* Recieved By */}
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="recieved_by" >Recieved By</label>
                                                    <BootstrapTooltip title={recieved_by_error} open={open} placement={tooltip_position}>
                                                        <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.recieved_by.map((data) => data)}
                                                            onSelect={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        recieved_by:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="recieved_by"
                                                                    id="recieved_by"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        />
                                                    </BootstrapTooltip>
                                                </div>

                                                 {/* Loaded By */}
                                                 <div className="col-lg mt-2">
                                                    <label htmlFor="loaded_by" >Loaded By</label>
                                                    <BootstrapTooltip title={loaded_by_error} open={open} placement={tooltip_position}>
                                                        <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.loaded_by.map((data) => data)}
                                                            onSelect={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        loaded_by:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="loaded_by"
                                                                    id="loaded_by"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        />
                                                    </BootstrapTooltip>
                                                </div>

                                            </div>

                                            <div className="row mt-2">

                                                 {/* Unloaded By */}
                                                 <div className="col-lg mt-2">
                                                    <label htmlFor="unloaded_by" >Unloaded By</label>
                                                    <BootstrapTooltip title={unloaded_by_error} open={open} placement={tooltip_position}>
                                                        <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.unloaded_by.map((data) => data)}
                                                            onSelect={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        unloaded_by:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="unloaded_by"
                                                                    id="unloaded_by"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        />
                                                    </BootstrapTooltip>
                                                </div>

                                                 {/* Vehicle Used */}
                                                 <div className="col-lg mt-2">
                                                    <label htmlFor="vehicle_used" >Vehicle Used</label>
                                                    <BootstrapTooltip title={vehicle_used_error} open={open} placement={tooltip_position}>
                                                        <Autocomplete
                                                            freeSolo
                                                            value={purchase_details.values}
                                                            disableClearable
                                                            options={searchArray.vehicle_used.map((data) => data)}
                                                            onSelect={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setPurchase_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        vehicle_used:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="vehicle_used"
                                                                    id="vehicle_used"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        />
                                                    </BootstrapTooltip>
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
