
/****************************** kit Request form *************************************/

import 
{
    React,TextField,useEffect,plugin_for_contact,Select,MenuItem,MuiThemeProvider,colortheme,Button,useState,axios,toast,
    Autocomplete,BootstrapTooltip,$,FormControlLabel,Checkbox,MuiPickersUtilsProvider,KeyboardDatePicker,MomentUtils
}
from '../../Import'



const RequestForm = () => {

     
    //Request Details
    const [request_details,setRequest_details]=useState({
        req_name:'',
        req_contact_no:'',
        aadhar_card_no:'',
        ration_card_no:'',
        card_type:'',
        dependent_no:'',
        children_no:'',
        occupation:'',
        address:'',
        location:'',
        jamat_name:'',
        contact_person:'',
        cp_contact_no:'',
        delivered_date:'',
        ngo:'',
        religion:'',
        values:[]

    });

    // error_fields
    const[errors,setErrors]=useState({
        address_error:'',
        contact_person_error:'',
        cp_contact_error:'',
        jamat_name_error:'',
        location_error:'',
        occupation_error:'',
        req_card_type_error:'',
        req_contact_no_error:'',
        req_name_error:'',
        aadhar_card_no_error:'',
        ration_card_no_error:'',
        dependent_no_error:'',
        children_no_error:'',
        ngo_error:'',
        religion_error:''

    });

     // Destructing of objects
     const 
     {
         address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
         req_card_type_error,req_contact_no_error,req_name_error,aadhar_card_no_error,dependent_no_error,children_no_error,
         ration_card_no_error,ngo_error,religion_error
     }=errors;



    //used for removing duplicate entries
    const [sets]=useState({
        occupation:new Set(),
        address:new Set(),
        area_location:new Set(),
        contact_person:new Set(),
        mohalla_masjid_jamat:new Set(),
        religion:new Set(),
        ngo:new Set()

    });
  
    const [searchArray]=useState({
        occupation:[],
        address:[],
        area_location:[],
        contact_person:[],
        mohalla_masjid_jamat:[],
        religion:[],
        ngo:[]
    });

    // show tooltip 
    const [open, setOpen] = useState(false);

    const[tooltip_position,setTooltip_position]=useState("top-end");


    //show date 
    const [show,setShow]=useState(false);

    //checkbox
    const [checked, setChecked] = useState(false);

  
    useEffect(() => {

        const source = axios.CancelToken.source();


        //plugin for contact
        plugin_for_contact(document.querySelector("#req_contact_no"));
        plugin_for_contact(document.querySelector('#cp_contact_no'));

        //get all requester_details
        const fetch_requester_details = async () =>{
            try
            {
               await axios.get('/get_distinct_request_details',{cancelToken: source.token})
                .then((res)=>{
                    
                    if(res.data.result)
                    {
                        
                      
        
                        res.data.result.map((data,index)=>{
                            return (
                                sets.occupation.add(data.occupation),
                                sets.address.add(data.address),
                                sets.area_location.add(data.area_location),
                                sets.contact_person.add(data.contact_person),
                                sets.mohalla_masjid_jamat.add(data.mohalla_masjid_jamat),
                                sets.religion.add(data.religion),
                                sets.ngo.add(data.NGO)
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
        
                         //contact_person
                         for (let item of  sets.contact_person) {
                            searchArray.contact_person.push(item);
                        }
        
                         //mohalla_masjid_jamat
                         for (let item of  sets.mohalla_masjid_jamat) {
                            searchArray.mohalla_masjid_jamat.push(item);
                        }

                         //religion
                         for (let item of  sets.religion) {
                          searchArray.religion.push(item);
                        }

                       //NGO
                       for (let item of  sets.ngo) {
                        searchArray.ngo.push(item);
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
                if (axios.isCancel(error)) {
                } else {
                    throw error
                }
            }
        }

        fetch_requester_details();

        // setTooltip_position 
        if($(window).width()<768){
            setTooltip_position("right-end");
        }

        return () => {
            source.cancel('Operation canceled by the user.');
        }

    },[searchArray,sets]);



    
    

    //validate contact_number based on countrycode
    const validate_contact = (props) =>
    {
        return plugin_for_contact(props);

    }

    // change input fields based on [onchange ]
    const inputEvent = (event) =>{

      if(event.target){
        const{name,value}=event.target;
        setRequest_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
      }
      else{
          
      
        setRequest_details((prevValue)=>{
          return {
            ...prevValue,
            delivered_date:event
          }
        })

      }
     
        
    }

    
 

    //Hide Tooltip
    const hideToolTip =() =>{
        setOpen(false);
    }

   
    //change date 
    const handleDate =() =>{
      
      setShow(!show);
      setChecked(!checked);

      //set delivered date to empty string if checkbox is not selected
      setRequest_details((prevValue)=>{
        return {
          ...prevValue,
          delivered_date: (!show) ? new Date() :""
        }
      })
      
    }


    //submit
    const submit = (event) =>{


        event.preventDefault();

     
        const contact_error=validate_contact(document.querySelector("#req_contact_no"));
        const cp_contact_error=validate_contact(document.querySelector("#cp_contact_no"));

        // add type field
        Object.assign(request_details,{contact_error});
        Object.assign(request_details,{cp_contact_error});
        Object.assign(request_details,{type:'insert'});
    
        // send Data
        axios.post('/store_request_details',request_details)
        .then((res)=>{

        
            
            if(res.data.errors)
            {
                const 
                {
                  aadhar_card_no_error,address_error,children_no_error,contact_person_error,cp_contact_error,dependent_no_error,
                  jamat_name_error,location_error,ngo_error,occupation_error,ration_card_no_error,religion_error,req_card_type_error,
                  req_contact_no_error,req_name_error
                }=res.data.errors;
              
                setErrors({
                  aadhar_card_no_error,address_error,children_no_error,contact_person_error,cp_contact_error,dependent_no_error,
                  jamat_name_error,location_error,ngo_error,occupation_error,ration_card_no_error,religion_error,req_card_type_error,
                  req_contact_no_error,req_name_error
                });
                setOpen(true);

            }

            if(res.data.success)
            {
                // reset form
                setRequest_details({
                  req_name:'',
                  req_contact_no:'',
                  aadhar_card_no:'',
                  ration_card_no:'',
                  card_type:'',
                  dependent_no:'',
                  children_no:'',
                  occupation:'',
                  address:'',
                  location:'',
                  jamat_name:'',
                  contact_person:'',
                  cp_contact_no:'',
                  delivered_date:'',
                  ngo:'',
                  religion:'',
                  values:[]
                });
                event.target.reset();
                setShow(false);
                setChecked(false);

                // toast.success(res.data.success);
            }
            else if(res.data.error)
            {
                toast.error(res.data.error,{autoClose: false});
            }

        })
      
    }


    return (
      <section className="request-section mt-5">
        <div className="container">
          <div className="row">
            <form
              onSubmit={submit}
              method="POST"
              className="form-group "
              id="submit"
              autoComplete="off"
            >
              <MuiThemeProvider theme={colortheme}>
                <div className="row">

                 

                  {/* Requester Details */}

                  {/* title */}
                  <div className="title">
                    <h3>Enter Requester Details</h3>
                    <hr />
                  </div>

                   {/* show date */}
                   <div className="col-12 mb-2">
                      <MuiThemeProvider theme={colortheme}>
                      <FormControlLabel  control={<Checkbox color="primary" className="checkbox" checked={checked} onClick={handleDate} /> } label={<span>Kit Delivered</span>}/>
                      </MuiThemeProvider>
                   </div>

                   {/* kit delivered */}
                   <div className="col-12">
                      {
                        (show) ? 
                        <MuiPickersUtilsProvider utils={MomentUtils }>
                            <KeyboardDatePicker 
                              disableToolbar
                              variant="inline"
                              format="DD/MM/YYYY"
                              margin="normal"
                              label="select delivered date"
                              value={request_details.delivered_date}
                              onChange={inputEvent}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}

                            />
                        </MuiPickersUtilsProvider>
                         :null
                      }
                   </div>

                  {/* Full Name */}
                  <div className="col-lg-4 col-md-12 mt-3">
                    <label htmlFor="req_name">Full Name</label>
                    <BootstrapTooltip
                      title={req_name_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <TextField
                        id="req_name"
                        type="text"
                        name="req_name"
                        className="form-control mt-1"
                        onChange={inputEvent}
                        onSelect={hideToolTip}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* requester Contact */}
                  <div className="col-lg-4 col-md-6 mt-3 ">
                    <label htmlFor="req_contact_no">Contact</label>
                    <BootstrapTooltip
                      title={req_contact_no_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <TextField
                        id="req_contact_no"
                        type="text"
                        name="req_contact_no"
                        className="form-control mt-1 "
                        onChange={inputEvent}
                        onSelect={hideToolTip}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* Aadhar card number */}
                  <div className="col-lg-4 col-md-6 mt-3 ">
                    <label htmlFor="aadhar_card_no">Aadhar Card Number</label>
                    <BootstrapTooltip
                      title={ aadhar_card_no_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <TextField
                        id="aadhar_card_no"
                        type="text"
                        name="aadhar_card_no"
                        className="form-control mt-1 "
                        onChange={inputEvent}
                        onSelect={hideToolTip}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/*Ration Card Number */}
                  <div className="col-lg-4 col-md-6 mt-3 ">
                    <label htmlFor="ration_card_no">Ration Card Number</label>
                    <BootstrapTooltip
                      title={ration_card_no_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <TextField
                        id="ration_card_no"
                        type="text"
                        name="ration_card_no"
                        className="form-control mt-1 "
                        onChange={inputEvent}
                        onSelect={hideToolTip}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* Card Type */}
                  <div className="col-lg-4  col-md-6 mt-3 ">
                    <label htmlFor="card_type">Select card-type</label>
                    <BootstrapTooltip
                      title={req_card_type_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <Select
                        id="card_type"
                        name="card_type"
                        className="w-100 mt-1"
                        value={request_details.card_type}
                        onChange={inputEvent}
                        onMouseOver={hideToolTip}
                      >
                        <MenuItem value="APL">APL</MenuItem>
                        <MenuItem value="BPL">BPL</MenuItem>
                      </Select>
                    </BootstrapTooltip>
                  </div>

                  {/* Number of depenedents */}
                  <div className="col-lg-4 col-md-6 mt-3">
                    <label htmlFor="dependent_no"> Number of depenedents</label>
                    <BootstrapTooltip
                      title={dependent_no_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <TextField
                        className="form-control mt-1"
                        inputProps={{ min: "0", step: "1" }}
                        id="dependent_no"
                        type="number"
                        name="dependent_no"
                        onChange={inputEvent}
                        onSelect={hideToolTip}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* Number of children below 15 years age */}
                  <div className="col-lg-4 col-md-6 mt-3 ">
                    <label htmlFor="children_no">
                      Number of children below 15 years age{" "}
                    </label>
                    <BootstrapTooltip
                      title={children_no_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <TextField
                        className="form-control mt-1"
                        inputProps={{ min: "0", step: "1" }}
                        id="children_no"
                        type="number"
                        name="children_no"
                        onChange={inputEvent}
                        onSelect={hideToolTip}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* Occupation */}
                  <div className="col-lg-4 col-md-6 mt-3 ">
                    <label htmlFor="occupation">Occupation</label>
                    <BootstrapTooltip
                      title={occupation_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <Autocomplete
                        freeSolo
                        value={request_details.values}
                        disableClearable
                        options={searchArray.occupation.map((data) => data)}
                        onSelect={hideToolTip}
                        className="mt-1"
                        onChange={(event, value) => {
                          setRequest_details((prevValue) => {
                            return {
                              ...prevValue,
                              occupation: value,
                            };
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="text"
                            name="occupation"
                            id="occupation"
                            onChange={inputEvent}
                            className="form-control"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* religion */}
                  <div className="col-lg-4 col-md-6 mt-3">
                    <label htmlFor="religion">Religion</label>
                    <BootstrapTooltip
                      title={religion_error}
                      open={open}
                      placement={tooltip_position}
                    >

                      <Autocomplete
                        freeSolo
                        value={request_details.values}
                        disableClearable
                        options={searchArray.religion.map((data) => data)}
                        onSelect={hideToolTip}
                        className="mt-1"
                        onChange={(event, value) => {
                          setRequest_details((prevValue) => {
                            return {
                              ...prevValue,
                              religion: value,
                            };
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="text"
                            name="religion"
                            id="religion"
                            onChange={inputEvent}
                            className="form-control"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </BootstrapTooltip>

                  </div>

                  {/* Address */}
                  <div className="col-lg col-md-6 mt-3 ">
                    <label htmlFor="address">Address</label>
                    <BootstrapTooltip
                      title={address_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={request_details.values}
                        options={searchArray.address.map((data) => data)}
                        onSelect={hideToolTip}
                        className="mt-1"
                        onChange={(event, value) => {
                          setRequest_details((prevValue) => {
                            return {
                              ...prevValue,
                              address: value,
                            };
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onChange={inputEvent}
                            name="address"
                            type="text"
                            id="address"
                            className="form-control "
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* Area/location */}
                  <div className="col-lg-4 col-md-6 mt-3 ">
                    <label htmlFor="location">Area/Location</label>
                    <BootstrapTooltip
                      title={location_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={request_details.values}
                        options={searchArray.area_location.map((data) => data)}
                        onSelect={hideToolTip}
                        className="mt-1"
                        onChange={(event, value) => {
                          setRequest_details((prevValue) => {
                            return {
                              ...prevValue,
                              location: value,
                            };
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onChange={inputEvent}
                            name="location"
                            id="location"
                            className="form-control"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* too contact person details */}

                  {/* title */}
                  <div className="title mt-5">
                    <h3>Enter Contact Person Details</h3>
                    <hr />
                  </div>

                  {/* Contact person */}
                  <div className="col-lg-6 col-md-6 mt-3">
                    <label htmlFor="contact_person">Contact Person</label>
                    <BootstrapTooltip
                      title={contact_person_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={request_details.values}
                        onSelect={hideToolTip}
                        className="mt-1"
                        options={searchArray.contact_person.map((data) => data)}
                        onChange={(event, value) => {
                          setRequest_details((prevValue) => {
                            return {
                              ...prevValue,
                              contact_person: value,
                            };
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onChange={inputEvent}
                            name="contact_person"
                            type="text"
                            className="form-control "
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* Contact */}
                  <div className="col-lg-6 col-md-6  mt-3">
                    <label htmlFor="cp_contact_no">
                      Contact Person Contact No
                    </label>
                    <BootstrapTooltip
                      title={cp_contact_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <TextField
                        className="form-control mt-1"
                        id="cp_contact_no"
                        type="text"
                        name="cp_contact_no"
                        onChange={inputEvent}
                        onSelect={hideToolTip}
                      />
                    </BootstrapTooltip>
                  </div>

                  {/* NGO */}
                  <div className="col-lg-6 col-md-6  mt-3">
                    <label htmlFor="jamat_name">NGO</label>
                    <BootstrapTooltip
                      title={ngo_error}
                      open={open}
                      placement={tooltip_position}
                    >

                      <Autocomplete
                        freeSolo
                        value={request_details.values}
                        disableClearable
                        options={searchArray.ngo.map((data) => data)}
                        onSelect={hideToolTip}
                        className="mt-1"
                        onChange={(event, value) => {
                          setRequest_details((prevValue) => {
                            return {
                              ...prevValue,
                              ngo: value,
                            };
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="text"
                            name="ngo"
                            id="ngo"
                            onChange={inputEvent}
                            className="form-control"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </BootstrapTooltip>

                  </div>


                  {/* Mohalla/Masjid jamat */}
                  <div className="col-lg-6 col-md mt-3">
                    <label htmlFor="jamat_name">Mohalla/Masjid Jamat</label>
                    <BootstrapTooltip
                      title={jamat_name_error}
                      open={open}
                      placement={tooltip_position}
                    >
                      <Autocomplete
                        freeSolo
                        disableClearable
                        value={request_details.values}
                        onSelect={hideToolTip}
                        className="mt-1"
                        options={searchArray.mohalla_masjid_jamat.map(
                          (data) => data
                        )}
                        onChange={(event, value) => {
                          setRequest_details((prevValue) => {
                            return {
                              ...prevValue,
                              jamat_name: value,
                            };
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onChange={inputEvent}
                            name="jamat_name"
                            type="text"
                            id="jamat_name"
                            className="form-control"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </BootstrapTooltip>
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
      </section>
    );
}

export default RequestForm



