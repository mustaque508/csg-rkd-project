/************************************ Form User details *******************/


import 
{
    React,MuiThemeProvider,TextField,Button,colortheme,Select,MenuItem,useEffect,plugin_for_contact,Autocomplete,
    axios,useState,useCallback,toast,BootstrapTooltip,validator
}
 from '../../Import'

const FormUserDetails = ({nextStep,handleChange,request_details,setRequest_details,errors,open,setErrors,setOpen,hideToolTip}) => {
 
    // Destructing of objects
    const 
    {
        address_error,location_error,occupation_error,req_card_type_error,req_contact_no_error,req_name_error,
        card_no_error,dependent_no_error,children_no_error
    }=errors;

    
    //used for removing duplicate entries
    const [sets]=useState({
        occupation:new Set(),
        address:new Set(),
        area_location:new Set()
    });

    const [searchArray]=useState({
        occupation:[],
        address:[],
        area_location:[]
    });

    //get all requester_details
   const fetch_requester_details = useCallback(
    ()=>{
        axios.get('/get_request_details')
        .then((res)=>{
            
            if(res.data.result)
            {
                

                res.data.result.map((data,index)=>{
                    return (
                        sets.occupation.add(data.occupation),
                        sets.address.add(data.address),
                        sets.area_location.add(data.area_location)
                    )
                    

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

        plugin_for_contact(document.querySelector("#req_contact_no"));

        //get all requester_details
        fetch_requester_details();

    }, [fetch_requester_details])

     
    //validate contact_number based on countrycode
     const validate_contact = (props) =>
     {
         return plugin_for_contact(props);
 
     }
    
    //on submit
    const submit = (event) =>{
        event.preventDefault();
        const contact_error=validate_contact(document.querySelector("#req_contact_no"));
       

        //send data 
        axios.post('/store_request_details',{request_details,contact_error})
        .then((res)=>{
                if(res.data.errors)
                {
                    console.log(res.data.errors);
                    const 
                    {
                        address_error,location_error,occupation_error,req_card_type_error,req_contact_no_error,
                        req_name_error,card_no_error,dependent_no_error,children_no_error
                    }=res.data.errors;

                    setErrors({
                        address_error,location_error,occupation_error,req_card_type_error,req_contact_no_error,
                        req_name_error,card_no_error,dependent_no_error,children_no_error  
                    });
                    setOpen(true);

                    //perform next step
                    if
                    (
                        validator.isEmpty(address_error) && validator.isEmpty(location_error) && validator.isEmpty(occupation_error) &&
                        validator.isEmpty(req_card_type_error) && validator.isEmpty(req_contact_no_error) && validator.isEmpty(req_name_error) && 
                        validator.isEmpty(card_no_error) && validator.isEmpty(dependent_no_error) && validator.isEmpty(children_no_error)
                    )
                    nextStep();
                }

        })
    }

    return (

        <section className="user_details-section mt-5">
            <div className="container">
                <div className="row ">
                    
                    {/* title */}
                    <div className="title">
                        <h3>Enter User Details</h3>
                        <hr />
                    </div>
                    
                    {/* content */}
                    <div className="content mt-3">
                        <form onSubmit={submit}  method="POST" className="form-group" id="submit" autoComplete="off">
                            <MuiThemeProvider theme={colortheme}>

                                <div className="row">

                                    {/* Full Name */}
                                    <div className="col-sm-4 mt-2">
                                        <label htmlFor="req_name">Full Name</label>
                                        <BootstrapTooltip title={req_name_error} open={open} placement="top-end">
                                            <TextField  id="req_name" type="text" name="req_name" className="form-control" onChange={handleChange} onSelect={hideToolTip} />
                                        </BootstrapTooltip>
                                       
                                    </div>

                                    {/* requester Contact */}
                                    <div className="col-sm-4 mt-2 ">
                                        <label htmlFor="req_contact_no">Contact</label>
                                        <BootstrapTooltip title={req_contact_no_error} open={open} placement="top-end">
                                            <TextField  id="req_contact_no"   type="text" name="req_contact_no" className="form-control" onChange={handleChange} onSelect={hideToolTip} />
                                        </BootstrapTooltip>
                                        
                                    </div>

                                    {/* Aadhar Card/Ration Card Number */}
                                    <div className="col-sm-4 mt-2 ">
                                        <label htmlFor="card_no">Aadhar/Ration Card No</label>
                                        <BootstrapTooltip  title={card_no_error} open={open} placement="top-end">
                                            <TextField  id="card_no"   type="text" name="card_no" className="form-control" onChange={handleChange} onSelect={hideToolTip} />
                                        </BootstrapTooltip>
                                       
                                    </div>

                                    {/* Card Type */}
                                    <div className="col-sm-4 mt-3 "> 
                                        <label htmlFor="card_type"  >Select card-type</label>
                                        <BootstrapTooltip title={req_card_type_error} open={open} placement="top-end">
                                            <Select id="card_type" name="card_type" className="w-100 mt-3" value={request_details.card_type}  onChange={handleChange} onMouseOver={hideToolTip}  >
                                                <MenuItem value="APL">APL</MenuItem>
                                                <MenuItem value="BPL">BPL</MenuItem>
                                            </Select>
                                        </BootstrapTooltip>
                                       
                                    </div>

                                    {/* Number of depenedents */}
                                    <div className="col-sm-4 mt-3 ">
                                        <label htmlFor="dependent_no"> Number of depenedents</label>
                                        <BootstrapTooltip title={dependent_no_error} open={open} placement="top-end">
                                            <TextField  className="form-control mt-3" inputProps={{ min: "0", step: "1" }} id="dependent_no" type="number" name="dependent_no"  onChange={handleChange} onSelect={hideToolTip}/>
                                        </BootstrapTooltip>
                                       
                                    </div>

                                    {/* Number of children below 15 years age */}
                                    <div className="col-sm-4 mt-3 ">
                                        <label htmlFor="children_no">Number of children below 15 years age</label>
                                        <BootstrapTooltip title={children_no_error} open={open} placement="top-end">
                                            <TextField  className="form-control mt-3" inputProps={{ min: "0", step: "1" }} id="children_no" type="number" name="children_no"  onChange={handleChange} onClick={hideToolTip}/>
                                        </BootstrapTooltip>
                                       
                                    </div>

                                    {/* Occupation */}
                                    <div className="col-sm-4 mt-3 ">
                                        <label htmlFor="occupation">Occupation</label>
                                        <BootstrapTooltip title={occupation_error} open={open} placement="top-end">
                                            <Autocomplete
                                                freeSolo
                                                value={request_details.values}
                                                disableClearable
                                                options={searchArray.occupation.map((data) => data)}
                                                onSelect={hideToolTip}
                                                className="mt-3"
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
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                                    />
                                                )}
                                            />
                                        </BootstrapTooltip>
                                    </div>

                                    {/* Address */}
                                    <div className="col-sm-8 mt-3 ">
                                        <label htmlFor="address">Address</label>
                                        <BootstrapTooltip title={address_error} open={open} placement="top-end">
                                            <Autocomplete
                                                freeSolo
                                                disableClearable
                                                value={request_details.values}
                                                options={searchArray.address.map((data) => data)}
                                                onSelect={hideToolTip}
                                                className="mt-3"
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
                                                        onChange={handleChange}
                                                        name="address"
                                                        type="text"
                                                        id="address"
                                                        className="form-control "
                                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                                    />
                                                )}
                                            />
                                        </BootstrapTooltip>
                                    </div>

                                    {/* Area/location */}
                                    <div className="col-sm-12 mt-3 ">
                                        <label htmlFor="location">Area/Location</label>
                                        <BootstrapTooltip title={location_error} open={open} placement="top-end">
                                            <Autocomplete
                                                freeSolo
                                                disableClearable
                                                value={request_details.values}
                                                options={searchArray.area_location.map((data) => data)}
                                                onSelect={hideToolTip}
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
                                                        onChange={handleChange}
                                                        name="location"
                                                        id="location"
                                                        className="form-control"
                                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                                    />
                                                )}
                                            />
                                        </BootstrapTooltip>
                                    </div>

                                    {/* continue button */}
                                    <div className="d-flex justify-content-end mt-2">

                                        <div className="continue-button">
                                            <Button  type="submit" variant="contained" color="primary">continue</Button>
                                        </div>
                                        
                                    </div>

                                </div>
                            </MuiThemeProvider>
                        </form>
                    </div>
                   
            
                </div>
            </div>
        </section>
    )
}

export default FormUserDetails
