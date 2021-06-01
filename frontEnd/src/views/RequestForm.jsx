
/****************************** kit Request form *************************************/

import 
{
    React,TextField,useEffect,plugin_for_contact,Select,MenuItem,MuiThemeProvider,colortheme,Button,useState,axios,toast,
    useCallback,Autocomplete,Header,BootstrapTooltip
}
from './Import'


const RequestForm = () => {

     
    //Request Details
    const [request_details,setRequest_details]=useState({
        'req_name':'',
        'req_contact_no':'',
        'card_no':'',
        'card_type':'',
        'dependent_no':'',
        'children_no':'',
        'occupation':'',
        'address':'',
        'location':'',
        'jamat_name':'',
        'contact_person':'',
        'cp_contact_no':'',
        'values':""

    });

    // error_fields
    const[errors,setErrors]=useState({
        'address_error':'',
        'contact_person_error':'',
        'cp_contact_error':'',
        'jamat_name_error':'',
        'location_error':'',
        'occupation_error':'',
        'req_card_type_error':'',
        'req_contact_no_error':'',
        'req_name_error':'',
        'card_no_error':''

    });

     // Destructing of objects
     const 
     {
         address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
         req_card_type_error,req_contact_no_error,req_name_error,card_no_error
     }=errors;


    //search array
    const [searchArray,setSearchArray]=useState([]);

    // show tooltip 
    const [open, setOpen] = useState(false);

   //get all requester_details
   const fetch_requester_details = useCallback(
    ()=>{
        axios.get('/get_request_details')
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

    // display country_code based on country in phone input_field 
    useEffect(() => {

        //plugin for contact
        plugin_for_contact(document.querySelector("#req_contact_no"));
        plugin_for_contact(document.querySelector('#cp_contact_no'));

        //get all requester_details
        fetch_requester_details();

    },[fetch_requester_details]);



    
    

    //validate contact_number based on countrycode
    const validate_contact = (props) =>
    {
        return plugin_for_contact(props);

    }

    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        const{name,value}=event.target;
        setRequest_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
    }
 

    //Hide Tooltip
    const hideToolTip =() =>{
        setOpen(false);
    }

   

    //submit
    const submit = (event) =>{

        event.preventDefault();
        const contact_error=validate_contact(document.querySelector("#req_contact_no"));
        const cp_contact_error=validate_contact(document.querySelector("#cp_contact_no"));
    
        
        // send Data
        axios.post('/store_request_details',{request_details,contact_error,cp_contact_error})
        .then((res)=>{
            
            if(res.data,errors)
            {
                const 
                {
                    address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
                    req_card_type_error,req_contact_no_error,req_name_error,card_no_error
                }=res.data.errors;
              
                setErrors({
                    address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
                    req_card_type_error,req_contact_no_error,req_name_error,card_no_error  
                });
                setOpen(true);

            }
        })
        // .then((res)=>{
        //     if(res.data.success)
        //     {
        //         setRequest_details({
        //             'req_name':'',
        //             'req_contact_no':'',
        //             'card_no':'',
        //             'card_type':'',
        //             'dependent_no':'',
        //             'children_no':'',
        //             'occupation':'',
        //             'address':'',
        //             'location':'',
        //             'jamat_name':'',
        //             'contact_person':'',
        //             'cp_contact_no':'',
        //             'values':[]
        //         });
        //         event.target.reset();
        //         toast.success(res.data.success);
        //     }
        //     else if(res.data.error)
        //     {
        //         toast.error(res.data.error,{autoClose: false});
        //     }

        // }).catch((err)=>{
        //     toast.error(err,{autoClose: false});
        // });
    }


    return (
        <section className="request-section">

            {/* Header component */}
            <Header/>

            {/* content */}
            <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="card">

                        {/* card-title */}
                        <h2 className="text-uppercase font-weight-bold card-title text-center mt-2">kit request form</h2><hr/>

                        <form onSubmit={submit} method="POST" className="form-group" id="submit" autoComplete="off">

                            <div className="card-body">

                                {/* Requester Details */}
                                <div className="card">
                                    <div className="card-body">

                                        {/* heading */}
                                        <h4 className="card-title">Requester Details</h4>

                                        <div className="row mt-4">

                                            {/* Full Name */}
                                            <div className="col-lg">
                                                <label htmlFor="req_name">Full Name</label>
                                                <BootstrapTooltip title={req_name_error} open={open} placement="top-end">
                                                    <TextField  className="form-control mt-2 mb-2 "  id="req_name" type="text" name="req_name"  onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                </BootstrapTooltip>
                                               
                                            </div>

                                            {/* requester Contact */}
                                            <div className="col-lg">
                                                <label htmlFor="req_contact_no">Contact</label>
                                                <BootstrapTooltip title={req_contact_no_error} open={open} placement="top-end">
                                                    <TextField className="form-control mt-2 mb-2" id="req_contact_no"   type="text" name="req_contact_no" onChange={inputEvent} onKeyUp={hideToolTip}/>
                                                </BootstrapTooltip>
                                                
                                            </div>
                                            
                                            {/* Aadhar Card/Ration Card Number */}
                                            <div className="col-lg">
                                                <label htmlFor="card_no">Aadhar/Ration Card No</label>
                                                <BootstrapTooltip  title={card_no_error} open={open} placement="top-end">
                                                    <TextField  className="form-control mt-2 mb-2"  type="text" name="card_no"  onChange={inputEvent} onKeyUp={hideToolTip} />
                                                </BootstrapTooltip> 
                                            </div>

                                              {/* Card Type */}
                                              <div className="col-lg">
                                                <label htmlFor="card_type">Select Card-type</label>
                                                <BootstrapTooltip title={req_card_type_error} open={open} placement="top-end">
                                                    <Select id="card_type" name="card_type" className="form-control border-0" style={{'marginTop':'-0.2rem'}} value={request_details.card_type} onChange={inputEvent} onKeyUp={hideToolTip} >
                                                        <MenuItem value="APL">APL</MenuItem>
                                                        <MenuItem value="BPL">BPL</MenuItem>
                                                    </Select>
                                                </BootstrapTooltip>
                                                
                                            </div>
                                        </div>

                                        <div className="row mt-4  d-flex justify-content-between">


                                          

                                            {/* Number of depenedents */}
                                            <div className="col-lg-3">
                                                <label htmlFor="dependent_no"> Number of depenedents</label>
                                                <TextField  className="form-control mt-2 mb-2" inputProps={{ min: "0"}} id="dependent_no" type="number" name="dependent_no"  onChange={inputEvent}/>
                                                
                                            </div>

                                            {/* Number of children below 15 years age */}
                                            <div className="col-lg-4">
                                                <label htmlFor="children_no">Number of children below 15 years age</label>
                                                <TextField  className="form-control mt-2 mb-2" inputProps={{ min: "0"}} id="children_no"  type="number" name="children_no" onChange={inputEvent}  />
                                            </div>   

                                            {/* Occupation */}
                                            <div className="col-lg">
                                                <label htmlFor="occupation">Occupation</label>
                                                <BootstrapTooltip title={occupation_error} open={open} placement="top-end">
                                                    <Autocomplete
                                                        freeSolo
                                                        value={request_details.values}
                                                        disableClearable
                                                        options={searchArray.map((option) => option.occupation)}
                                                        onKeyUp={hideToolTip}
                                                        onChange={(event,value)=>{
                                                            setRequest_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    occupation:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                type="text"
                                                                name="occupation"
                                                                id="occupation"
                                                                onChange={inputEvent}
                                                                className="form-control mt-2 mb-0"
                                                                onKeyUp={hideToolTip}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                                
                                            </div>                                        
                                        </div>

                                        <div className="row  mt-4">

                                            {/* Address */}
                                            <div className="col-lg">
                                                <label htmlFor="address">Address</label>
                                                <BootstrapTooltip title={address_error} open={open} placement="top-end">
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={request_details.values}
                                                        onKeyUp={hideToolTip}
                                                        options={searchArray.map((option) => option.address)}
                                                        onChange={(event,value)=>{
                                                            setRequest_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    address:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                onChange={inputEvent}
                                                                name="address"
                                                                type="text"
                                                                id="address"
                                                                className="form-control mt-2 mb-2"
                                                                onKeyUp={hideToolTip}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip> 
                                            </div>

                                            {/* Area/location */}
                                            <div className="col-lg">
                                                <label htmlFor="location">Area/Location</label>
                                                <BootstrapTooltip title={location_error} open={open} placement="top-end">
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={request_details.values}
                                                        options={searchArray.map((option) => option.area_location)}
                                                        onKeyUp={hideToolTip}
                                                        onChange={(event,value)=>{
                                                            setRequest_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    location:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                onChange={inputEvent}
                                                                name="location"
                                                                id="location"
                                                                className="form-control mt-2"
                                                                onKeyUp={hideToolTip}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                            </div>      
                                        </div>  
                                    </div>
                                </div>
                           
                            {/* too contact person details */}
                            <div className="card mt-4">
                                <div className="card-body">

                                        {/* heading */}
                                        <h4 className="card-title">Contact Person Details</h4>

                                        <div className="row mt-4">

                                            {/* Contact person */}
                                            <div className="col-lg">
                                                <label htmlFor="contact_person">Contact Person</label>
                                                <BootstrapTooltip title={contact_person_error} open={open} placement="top-end">
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={request_details.values}
                                                        onKeyUp={hideToolTip}
                                                        options={searchArray.map((option) => option.contact_person)}
                                                        onChange={(event,value)=>{
                                                            setRequest_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    contact_person:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                onChange={inputEvent}
                                                                name="contact_person"
                                                                type="text"
                                                                className="form-control mt-2 mb-2"
                                                                onKeyUp={hideToolTip}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                               
                                            </div>

                                        {/* Contact */}
                                        <div className="col-lg">
                                                <label htmlFor="cp_contact_no" >Contact Person Contact No</label>
                                                <BootstrapTooltip title={cp_contact_error} open={open} placement="top-end">
                                                    <TextField className="form-control mt-2" id="cp_contact_no"  type="text" name="cp_contact_no" onChange={inputEvent}   onKeyUp={hideToolTip}/>
                                                </BootstrapTooltip>
                                        </div>


                                         {/* Mohalla/Masjid jamat */}
                                         <div className="col-lg">
                                                <label htmlFor="jamat_name" >Mohalla/Masjid Jamat</label>
                                                <BootstrapTooltip title={jamat_name_error} open={open} placement="top-end">
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={request_details.values}
                                                        onKeyUp={hideToolTip}
                                                        options={searchArray.map((option) => option.mohalla_masjid_jamat)}
                                                        onChange={(event,value)=>{
                                                            setRequest_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    jamat_name:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                onChange={inputEvent}
                                                                name="jamat_name"
                                                                type="text"
                                                                id="jamat_name"
                                                                className="form-control mt-2 mb-2"
                                                                onKeyUp={hideToolTip}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                                
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row mt-1">
                        
                                    {/* submit button */}
                                    <MuiThemeProvider theme={colortheme}>
                                        <Button  type="submit" variant="contained" color="primary" className="mt-4">submit</Button>  
                                    </MuiThemeProvider>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </section>
        
    )
}

export default RequestForm
