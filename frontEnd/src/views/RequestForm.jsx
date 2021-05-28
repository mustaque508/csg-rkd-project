
/****************************** kit Request form *************************************/

import 
{
    React,TextField,useEffect,plugin_for_contact,Select,MenuItem,MuiThemeProvider,colortheme,Button,useState,axios,toast
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
        'cp_contact_no':''

    });

    // display country_code based on country in phone input_field 
    useEffect(() => {
        plugin_for_contact(document.querySelector("#req_contact_no"));
        plugin_for_contact(document.querySelector("#cp_contact_no"));
    },[]);
    
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
        
        //send Data
        axios.post('/storeData',request_details)
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
                    'cp_contact_no':''
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">

                        {/* card-title */}
                        <h2 className="text-uppercase font-weight-bold card-title text-center mt-2">kit request form</h2><hr/>

                        <form onSubmit={submit} method="POST" className="form-group" id="submit" autoComplete="off">

                            <div className="card-body">

                                {/* Requester Details */}
                                <div className="card">
                                    <div className="card-body">

                                        {/* heading */}
                                        <h3 className="card-title">Requester Details</h3>

                                        <div className="row mt-4">

                                            {/* Full Name */}
                                            <div className="col-lg">
                                                <label htmlFor="req_name" className="mt-2">Full Name</label>
                                                <TextField className="form-control" type="text" style={{'marginTop':'0.8rem'}}  name="req_name" id="req_name" onChange={inputEvent} required={true} />
                                            </div>

                                            {/* requester Contact */}
                                            <div className="col-lg">
                                                <label htmlFor="req_contact_no" className="mt-2">Contact</label>
                                                <TextField className="form-control"  style={{'marginTop':'0.8rem'}}  type="text" name="req_contact_no" id="req_contact_no" onChange={inputEvent} required={true}/>
                                            </div>
                                            
                                            {/* Aadhar Card/Ration Card Number */}
                                            <div className="col-lg">
                                                <label htmlFor="card_no" className="mt-2">Aadhar/Ration Card No</label>
                                                <TextField className="form-control" style={{'marginTop':'0.8rem'}} type="text" name="card_no" id="card_no" onChange={inputEvent} required={true} />
                                            </div>

                                            {/* Card Type */}
                                            <div className="col-lg">
                                                <label htmlFor="card_type" className="mt-2">Select Card-type</label>
                                                <Select name="card_type" id="card_type" className="form-control border-0" value={request_details.card_type} onChange={inputEvent} required={true}>
                                                    <MenuItem value="APL">APL</MenuItem>
                                                    <MenuItem value="BPL">BPL</MenuItem>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="row mt-4">

                                            {/* Number of depenedents */}
                                            <div className="col-lg-3">
                                                <label htmlFor="dependent_no" className="mt-2"> Number of depenedents</label>
                                                <TextField className="form-control" type="number" name="dependent_no" id="dependent_no" onChange={inputEvent} required={true}  />
                                            </div>

                                            {/* Number of children below 15 years age */}
                                            <div className="col-lg-4">
                                                <label htmlFor="children_no" className="mt-2">Number of children below 15 years age</label>
                                                <TextField className="form-control"  type="number" name="children_no" id="children_no" onChange={inputEvent}  required={true}/>
                                            </div>   

                                            {/* Occupation */}
                                            <div className="col-lg">
                                                <label htmlFor="occupation" className="mt-2">Occupation</label>
                                                <TextField className="form-control"  type="text" name="occupation" id="occupation" onChange={inputEvent} required={true} />
                                            </div>                                        
                                        </div>

                                        <div className="row mt-4">

                                            {/* Address */}
                                            <div className="col-lg-6">
                                                <label htmlFor="address" className="mt-2">Address</label>
                                                <TextField className="form-control mt-0" type="text" name="address" id="address" onChange={inputEvent} required={true}  />
                                            </div>

                                            {/* Area/location */}
                                            <div className="col-lg-6">
                                                <label htmlFor="location" className="mt-2">Area/Location</label>
                                                <TextField className="form-control mt-0" type="text" name="location" id="location" onChange={inputEvent} required={true} />
                                            </div>      
                                        </div>  
                                    </div>
                                </div>
                           
                            {/* too contact person details */}
                            <div className="card mt-4">
                                <div className="card-body">

                                        {/* heading */}
                                        <h3 className="card-title">Contact Person Details</h3>

                                        <div className="row mt-4">

                                            {/* Mohalla/Masjid jamat */}
                                            <div className="col-lg">
                                                <label htmlFor="jamat_name" className="mt-2" >Mohalla/Masjid Jamat</label>
                                                <TextField className="form-control mt-0" type="text" name="jamat_name" id="jamat_name" onChange={inputEvent} required={true}  />
                                            </div>

                                            {/* Contact person */}
                                            <div className="col-lg">
                                                <label htmlFor="contact_person" className="mt-2" >Contact Person</label>
                                                <TextField className="form-control mt-0"  type="text" name="contact_person" id="contact_person" onChange={inputEvent}  required={true} />
                                            </div>

                                        {/* Contact */}
                                        <div className="col-lg">
                                                <label htmlFor="cp_contact_no" className="mt-2">Contact Person Contact No</label>
                                                <TextField className="form-control"  type="text" name="cp_contact_no" id="cp_contact_no" onChange={inputEvent} required={true} />
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
    )
}

export default RequestForm
