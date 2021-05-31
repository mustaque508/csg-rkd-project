
/****************************** kit Request form *************************************/

import 
{
    React,TextField,useEffect,plugin_for_contact,Select,MenuItem,MuiThemeProvider,colortheme,Button,useState,axios,toast,
    useCallback,Autocomplete,Header
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

    //search array
    const [searchArray,setSearchArray]=useState([]);

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
        // plugin_for_contact(document.querySelector('#free-solo-2-demo'));

        //get all requester_details
        fetch_requester_details();

    },[fetch_requester_details]);
    
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
 


    //submit
    const submit = (event) =>{
        event.preventDefault();
        
        console.log(request_details);
        // send Data
        axios.post('/store_request_details',request_details)
        .then((res)=>{
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

        }).catch((err)=>{
            toast.error(err,{autoClose: false});
        });
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
                                                <TextField size="small" variant="outlined" className="form-control mt-2 "  id="req_name" type="text"   name="req_name"  onChange={inputEvent} required={true} />
                                            </div>

                                            {/* requester Contact */}
                                            <div className="col-lg">
                                                <label htmlFor="req_contact_no">Contact</label>
                                                <TextField  size="small" variant="outlined" className="form-control mt-2" id="req_contact_no"   type="text" name="req_contact_no" onChange={inputEvent} required={true}/>
                                            </div>
                                            
                                            {/* Aadhar Card/Ration Card Number */}
                                            <div className="col-lg">
                                                <label htmlFor="card_no">Aadhar/Ration Card No</label>
                                                <TextField id="outlined-basic card_no" size="small" variant="outlined" className="form-control mt-2"  type="text" name="card_no"  onChange={inputEvent} required={true} />
                                            </div>

                                            {/* Card Type */}
                                            <div className="col-lg">
                                                <label htmlFor="card_type">Select Card-type</label>
                                                <Select id="card_type" name="card_type" className="form-control mt-1" value={request_details.card_type} onChange={inputEvent} required={true}>
                                                    <MenuItem value="APL">APL</MenuItem>
                                                    <MenuItem value="BPL">BPL</MenuItem>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="row mt-4">

                                            {/* Number of depenedents */}
                                            <div className="col-lg-3">
                                                <label htmlFor="dependent_no"> Number of depenedents</label>
                                                <TextField size="small" variant="outlined" className="form-control mt-2" id="dependent_no" type="number" name="dependent_no"  onChange={inputEvent} required={true}  />
                                            </div>

                                            {/* Number of children below 15 years age */}
                                            <div className="col-lg-4">
                                                <label htmlFor="children_no">Number of children below 15 years age</label>
                                                <TextField size="small" variant="outlined" className="form-control mt-2" id="children_no"  type="number" name="children_no" onChange={inputEvent}  required={true}/>
                                            </div>   

                                            {/* Occupation */}
                                            <div className="col-lg">
                                                <label htmlFor="occupation">Occupation</label>
                                                <Autocomplete
                                                    freeSolo
                                                    id="free-solo-2-demo"
                                                    value={request_details.values}
                                                    disableClearable
                                                    options={searchArray.map((option) => option.occupation)}
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
                                                            required={true}
                                                            className="form-control mt-2"
                                                            size="small"
                                                            variant="outlined" 
                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                        />
                                                    )}
                                                />
                                            </div>                                        
                                        </div>

                                        <div className="row mt-4">

                                            {/* Address */}
                                            <div className="col-lg-6">
                                                <label htmlFor="address">Address</label>
                                                <Autocomplete
                                                    freeSolo
                                                    id="free-solo-2-demo"
                                                    disableClearable
                                                    value={request_details.values}
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
                                                            required={true}
                                                            size="small"
                                                            variant="outlined" 
                                                            className="form-control mt-2"
                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                        />
                                                    )}
                                                />  
                                            </div>

                                            {/* Area/location */}
                                            <div className="col-lg-6">
                                                <label htmlFor="location">Area/Location</label>
                                                <Autocomplete
                                                    freeSolo
                                                    id="free-solo-2-demo"
                                                    disableClearable
                                                    value={request_details.values}
                                                    options={searchArray.map((option) => option.area_location)}
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
                                                            size="small"
                                                            variant="outlined" 
                                                            className="form-control mt-2"
                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                        />
                                                    )}
                                                 />
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

                                            {/* Mohalla/Masjid jamat */}
                                            <div className="col-lg">
                                                <label htmlFor="jamat_name" >Mohalla/Masjid Jamat</label>
                                                <Autocomplete
                                                    freeSolo
                                                    id="free-solo-2-demo"
                                                    disableClearable
                                                    value={request_details.values}
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
                                                            required={true}
                                                            size="small" 
                                                            variant="outlined" 
                                                            className="form-control mt-2"
                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            {/* Contact person */}
                                            <div className="col-lg">
                                                <label htmlFor="contact_person">Contact Person</label>
                                                <Autocomplete
                                                    freeSolo
                                                    id="free-solo-2-demo"
                                                    disableClearable
                                                    value={request_details.values}
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
                                                            size="small" 
                                                            variant="outlined" 
                                                            className="form-control mt-2"
                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                        />
                                                    )}
                                                />
                                            </div>

                                        {/* Contact */}
                                        <div className="col-lg">
                                                <label htmlFor="cp_contact_no" >Contact Person Contact No</label>
                                                <Autocomplete
                                                    freeSolo
                                                    id="free-solo-2-demo"
                                                    disableClearable
                                                    value={request_details.values}
                                                    options={searchArray.map((option) => option.cp_phone)}
                                                    onChange={(event,value)=>{
                                                        setRequest_details((prevValue)=>{
                                                            return{
                                                                ...prevValue,
                                                                cp_contact_no:value
                                                            }
                                                        })
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            onChange={inputEvent}
                                                            name="cp_contact_no"
                                                            type="text"
                                                            id="cp_contact_no"
                                                            required={true}
                                                            size="small" 
                                                            variant="outlined" 
                                                            className="form-control mt-2"
                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                        />
                                                    )}
                                                />
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
