
/****************************** kit Request form *************************************/

import 
{
    React,TextField,useEffect,plugin_for_contact,Select,MenuItem,MuiThemeProvider,colortheme,Button,useState,axios,toast,
    useCallback,Autocomplete,Header,BootstrapTooltip,$
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
        'values':[]

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
        'card_no_error':'',
        'dependent_no_error':'',
        'children_no_error':''

    });

     // Destructing of objects
     const 
     {
         address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
         req_card_type_error,req_contact_no_error,req_name_error,card_no_error,dependent_no_error,children_no_error
     }=errors;



    //used for removing duplicate entries
    const [sets]=useState({
        occupation:new Set(),
        address:new Set(),
        area_location:new Set(),
        contact_person:new Set(),
        mohalla_masjid_jamat:new Set()

    });
  
    const [searchArray]=useState({
        occupation:[],
        address:[],
        area_location:[],
        contact_person:[],
        mohalla_masjid_jamat:[]
    });

    // show tooltip 
    const [open, setOpen] = useState(false);

    const[tooltip_position,setTooltip_position]=useState("top-end");

   //get all requester_details
   const fetch_requester_details = useCallback(
    ()=>{
        axios.get('/get_request_details')
        .then((res)=>{
            
            if(res.data.result)
            {
                

                res.data.result.map((data,index)=>{
                    sets.occupation.add(data.occupation);
                    sets.address.add(data.address);
                    sets.area_location.add(data.area_location);
                    sets.contact_person.add(data.contact_person);
                    sets.mohalla_masjid_jamat.add(data.mohalla_masjid_jamat);

                })

            
                //occupation
                for (let item of  sets.occupation) {
                    searchArray.occupation.push(item);
                }

                 //address
                 for (let item of  sets.address) {
                    searchArray.address.push(item);
                }
               

                 //area_location
                 for (let item of  sets.area_location) {
                    searchArray.area_location.push(item);
                }

                 //contact_person
                 for (let item of  sets.contact_person) {
                    searchArray.contact_person.push(item);
                }

                 //mohalla_masjid_jamat
                 for (let item of  sets.mohalla_masjid_jamat) {
                    searchArray.mohalla_masjid_jamat.push(item);
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

    // display country_code based on country in phone input_field 
    useEffect(() => {

        //plugin for contact
        plugin_for_contact(document.querySelector("#req_contact_no"));
        plugin_for_contact(document.querySelector('#cp_contact_no'));

        //get all requester_details
        fetch_requester_details();

        // setTooltip_position 
        if($(window).width()<992){
            setTooltip_position("right-end");
        }

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
            
            if(res.data.errors)
            {
                const 
                {
                    address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
                    req_card_type_error,req_contact_no_error,req_name_error,card_no_error,dependent_no_error,children_no_error
                }=res.data.errors;
              
                setErrors({
                    address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
                    req_card_type_error,req_contact_no_error,req_name_error,card_no_error,dependent_no_error,children_no_error  
                });
                setOpen(true);

            }

            if(res.data.success)
            {
                setRequest_details({
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
        <section className="request-section">

            {/* Header */}
            <Header/>

            {/* content */}
            <div className="container mt-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                 {/* card-title */}
                                <h2 className="text-uppercase font-weight-bold card-title text-center mt-2">kit request form</h2><hr/>

                                {/* content */}
                                <div className="card-body">
                                    <form onSubmit={submit} method="POST" className="form-group" id="submit" autoComplete="off">

                                        {/* Requester Details */}
                                        <div className="card">
                                            
                                            <div className="card-body">

                                                {/* heading */}
                                                <h4 className="card-title">Requester Details</h4>

                                                <div className="row mt-4">

                                                    {/* Full Name */}
                                                    <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="req_name">Full Name</label>
                                                        <BootstrapTooltip title={req_name_error} open={open} placement={tooltip_position}>
                                                            <TextField  className="form-control"  id="req_name" type="text" name="req_name"  onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                        </BootstrapTooltip>
                                                    </div>

                                                    {/* requester Contact */}
                                                    <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="req_contact_no">Contact</label>
                                                        <BootstrapTooltip title={req_contact_no_error} open={open} placement={tooltip_position}>
                                                            <TextField className="form-control" id="req_contact_no"   type="text" name="req_contact_no" onChange={inputEvent} onKeyUp={hideToolTip}/>
                                                        </BootstrapTooltip> 
                                                    </div>

                                                    {/* Aadhar Card/Ration Card Number */}
                                                    <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="card_no">Aadhar/Ration Card No</label>
                                                        <BootstrapTooltip  title={card_no_error} open={open} placement={tooltip_position}>
                                                            <TextField  className="form-control"  type="text" name="card_no"  onChange={inputEvent} onKeyUp={hideToolTip} />
                                                        </BootstrapTooltip> 
                                                    </div>

                                                    {/* Card Type */}
                                                    <div className="col-lg mb-1">
                                                        <label htmlFor="card_type">Select Card-type</label>
                                                        <BootstrapTooltip title={req_card_type_error} open={open} placement={tooltip_position}>
                                                            <Select id="card_type" name="card_type" className="form-control border-0" style={{'marginTop':'-0.2rem'}} value={request_details.card_type} onChange={inputEvent} onKeyUp={hideToolTip} >
                                                                <MenuItem value="APL">APL</MenuItem>
                                                                <MenuItem value="BPL">BPL</MenuItem>
                                                            </Select>
                                                        </BootstrapTooltip>
                                                    </div>
                                                </div>

                                                <div className="row mt-4  d-flex justify-content-between">

                                                    {/* Number of depenedents */}
                                                    <div className="col-lg-3 mt-2 mb-1">
                                                        <label htmlFor="dependent_no"> Number of depenedents</label>
                                                        <BootstrapTooltip title={dependent_no_error} open={open} placement={tooltip_position}>
                                                            <TextField  className="form-control" inputProps={{ min: "0", step: "1" }} id="dependent_no" type="number" name="dependent_no"  onChange={inputEvent} onKeyUp={hideToolTip}/>
                                                        </BootstrapTooltip>
                                                    </div>

                                                     {/* Number of children below 15 years age */}
                                                    <div className="col-lg-4 mt-2 mb-1">
                                                        <label htmlFor="children_no">Number of children below 15 years age</label>
                                                        <BootstrapTooltip title={children_no_error} open={open} placement={tooltip_position}>
                                                            <TextField  className="form-control" inputProps={{ min: "0", step: "1" }} id="children_no"  type="number" name="children_no" onChange={inputEvent} onKeyUp={hideToolTip}  />
                                                        </BootstrapTooltip>
                                                    </div>  

                                                    {/* Occupation */}
                                                    <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="occupation">Occupation</label>
                                                        <BootstrapTooltip title={occupation_error} open={open} placement={tooltip_position}>
                                                            <Autocomplete
                                                                freeSolo
                                                                value={request_details.values}
                                                                disableClearable
                                                                options={searchArray.occupation.map((data) => data)}
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
                                                                        className="form-control"
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
                                                    <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="address">Address</label>
                                                        <BootstrapTooltip title={address_error} open={open} placement={tooltip_position}>
                                                            <Autocomplete
                                                                freeSolo
                                                                disableClearable
                                                                value={request_details.values}
                                                                onKeyUp={hideToolTip}
                                                                options={searchArray.address.map((data) => data)}
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
                                                                        className="form-control "
                                                                        onKeyUp={hideToolTip}
                                                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                                                    />
                                                                )}
                                                            />
                                                        </BootstrapTooltip> 
                                                    </div>

                                                    {/* Area/location */}
                                                    <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="location">Area/Location</label>
                                                        <BootstrapTooltip title={location_error} open={open} placement={tooltip_position}>
                                                            <Autocomplete
                                                                freeSolo
                                                                disableClearable
                                                                value={request_details.values}
                                                                options={searchArray.area_location.map((data) => data)}
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
                                                                        className="form-control"
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

                                                {/* content */}
                                                <div className="row mt-4">

                                                    {/* Contact person */}
                                                    <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="contact_person">Contact Person</label>
                                                        <BootstrapTooltip title={contact_person_error} open={open} placement={tooltip_position}>
                                                            <Autocomplete
                                                                freeSolo
                                                                disableClearable
                                                                value={request_details.values}
                                                                onKeyUp={hideToolTip}
                                                                options={searchArray.contact_person.map((data) => data)}
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
                                                                        className="form-control "
                                                                        onKeyUp={hideToolTip}
                                                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                                                    />
                                                                )}
                                                            />
                                                        </BootstrapTooltip>
                                                    </div>

                                                    {/* Contact */}
                                                    <div className="col-lg mt-2 mb-1">
                                                            <label htmlFor="cp_contact_no" >Contact Person Contact No</label>
                                                            <BootstrapTooltip title={cp_contact_error} open={open} placement={tooltip_position}>
                                                                <TextField className="form-control" id="cp_contact_no"  type="text" name="cp_contact_no" onChange={inputEvent}   onKeyUp={hideToolTip}/>
                                                            </BootstrapTooltip>
                                                    </div>

                                                    {/* Mohalla/Masjid jamat */}
                                                <div className="col-lg mt-2 mb-1">
                                                        <label htmlFor="jamat_name">Mohalla/Masjid Jamat</label>
                                                        <BootstrapTooltip title={jamat_name_error} open={open} placement={tooltip_position}>
                                                            <Autocomplete
                                                                freeSolo
                                                                disableClearable
                                                                value={request_details.values}
                                                                onKeyUp={hideToolTip}
                                                                options={searchArray.mohalla_masjid_jamat.map((data) => data)}
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
                                                                        className="form-control"
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

        </section>
        
    )
}

export default RequestForm
