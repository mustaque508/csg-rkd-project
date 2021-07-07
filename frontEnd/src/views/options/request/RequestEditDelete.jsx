/**************************   Request Edit Delete   *******************************/

import {React,useEffect,axios,toast,MaterialTable,useState,TextField,plugin_for_contact,
    MenuItem,MuiThemeProvider,colortheme,Autocomplete,Button,Dialog,DialogTitle,
    DialogContent,MuiPickersUtilsProvider,MomentUtils,KeyboardDatePicker,useCallback
} from '../../Import'





const RequestEditDelete = () => {

    //details of requesters
    const [requester_details,setRequester_details]=useState([]);

   

    //dialog
    const [open, setOpen] =useState(false);

    //show hide delivery date
    const [Date, setDate]=useState('');

   

  


    //Request Details
    const [Form_details,setForm_details]=useState({
        req_name:'',
        req_contact_no:'',
        aadhar_card_no:'',
        card_type:'',
        dependent_no:'',
        children_no:'',
        occupation:'',
        address:'',
        location:'',
        jamat_name:'',
        contact_person:'',
        cp_contact_no:'',
        id:'',
        created_date:'',
        delivery_date:'',
        ngo:'',
        ration_card_no:'',
        religion:'',
        delivery_status:''


    });

    // error_fields
    const[errors,setErrors]=useState({
        address_error:'',
        contact_person_error:'',
        cp_contact_error:'',
        jamat_name_error:'',
        location_error:'',
        occupation_error:'',
        req_contact_no_error:'',
        req_name_error:'',
        aadhar_card_no_error:'',
        ration_card_no_error:'',
        ngo_error:'',
        dependent_no_error:'',
        children_no_error:'',
        religion_error:''

    });

    // Destructing of objects
    const 
    {
         address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
         req_contact_no_error,req_name_error,aadhar_card_no_error,dependent_no_error,ngo_error,
         children_no_error,ration_card_no_error,religion_error
     }=errors;

     const{
        req_name,req_contact_no,aadhar_card_no,card_type,dependent_no,children_no,occupation,address,location,jamat_name,
        contact_person,cp_contact_no,ngo,ration_card_no,delivery_date,religion,delivery_status
     }=Form_details;



    //used for removing duplicate entries
    const [sets]=useState({
        occupation:new Set(),
        address:new Set(),
        area_location:new Set(),
        contact_person:new Set(),
        mohalla_masjid_jamat:new Set(),
        ngo:new Set(),
        religion:new Set()

    });
  
    const [searchArray]=useState({
        occupation:[],
        address:[],
        area_location:[],
        contact_person:[],
        mohalla_masjid_jamat:[],
        ngo:[],
        religion:[]
    });


   
      //Rename key
    const renameKey=(data,newkey,oldkey)=>{
        data[newkey]=data[oldkey];
        delete data[oldkey];
    }
  
   
    
    //validate contact_number based on countrycode
    const validate_contact = (props) =>
    {
         return plugin_for_contact(props);
 
    }
 
    //get all requester_details
    const fetch_requester_details=useCallback(
      () => {
        try
            {
                axios.get('get_all_request_details')
                .then((res)=>{
                    if(res.data.result)
                    {
                       //rename object_keys
                       res.data.result.forEach(element => {
                           renameKey(element,'req_name','full_name');
                           renameKey(element,'req_contact_no','contact_no');
                           renameKey(element,'card_no','aadhar_rationcard_no');
                           renameKey(element,'card_type','APL_BPL');
                           renameKey(element,'dependent_no','no_of_dependents');
                           renameKey(element,'children_no','no_of_children_below_15years_age');
                           renameKey(element,'location','area_location');
                           renameKey(element,'jamat_name','mohalla_masjid_jamat');
                           renameKey(element,'cp_contact_no','cp_phone');
                           renameKey(element,'ngo','NGO');
                       });
                    
                       setRequester_details(res.data.result);
                      
                
                    }
                    else
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
      [],
    )


    //fetch distinct values
    const fetch_distinct_requester_details=useCallback(
      () => {
        try
        {
            axios.get('/get_distinct_request_details')
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
                            sets.ngo.add(data.NGO),
                            sets.religion.add(data.religion)
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

                    //NGO
                      for (let item of  sets.ngo) {
                        searchArray.ngo.push(item);
                    }

                      //NGO
                      for (let item of  sets.religion) {
                        searchArray.religion.push(item);
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

        fetch_requester_details();
        fetch_distinct_requester_details();


    }, [fetch_requester_details,fetch_distinct_requester_details])


    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
      if(event.target){
        const{name,value}=event.target;
        setForm_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
      }
      else{

      
        setForm_details((prevValue)=>{
          return {
            ...prevValue,
            delivery_date:event
          }
        })

      }
     
    }

   
    //plugin for contact
    const plugin=()=>{
        plugin_for_contact(document.querySelector('#req_contact_no'));
        plugin_for_contact(document.querySelector('#cp_contact_no'));
    }

    //material-table coloumns
    const columns = [
      {
        title: "Sr No",
        field: "id"
      },
      {
        title: "Full Name",
        field: "req_name"
      },
      {
        title: "Contact number",
        field: "req_contact_no"
      },
      {
        title: "Aadhar Card no",
        field: "aadhar_card_no"
      },
      {
        title: "Ration Card no",
        field: "ration_card_no"
      },
      {
        title: "Card type",
        field: "card_type"
      },
      {
        title: "Number of dependents",
        field: "dependent_no"
      },
      {
        title: "Number of children below 15 years age",
        field: "children_no"
      },
      {
        title: "Occupation",
        field: "occupation"
      },
      {
        title: "Religion",
        field: "religion"
      },
      {
        title: "Address",
        field: "address"
      },
      {
        title: "Area/Location",
        field: "location"
      },
      {
        title: "Contact person", 
        field: "contact_person" 
      },
      { 
          title: "Contact person contact no", 
          field: "cp_contact_no"
      },
      { 
        title: "NGO", 
        field: "ngo"
      },
      { 
          title: "Mohalla/Masjid jamat", 
          field: "jamat_name" 
      },
      {
        title: "Created Date",
        field: "created_date",
        type: "date",
        dateSetting: { locale: "en-GB" }
      },
      {
        title: "Delivery Date",
        field: "delivery_date",
        type: "date",
        dateSetting: { locale: "en-GB" }
      },
      {
        title: "Delivery status", 
        field: "delivery_status",
        cellStyle:(e,rowData)=>{
          return (rowData.delivery_status === "delivered") ? {color:"green"} : {color:"red"}
        } 
      }
    ];

    //delete record
    const handleRowDelete = (Data,resolve)=>{

        axios.post('delete_requester_details',{id:Data.id})
        .then((res)=>{

            if(res.data.success)
            {
                //update table
                const updatedRows=[...requester_details];
                const index=Data.tableData.id;
                updatedRows.splice(index,1);
                setTimeout(()=>{
                    setRequester_details(updatedRows);
                    resolve();
                },2000)

            }
            else if(res.data.error)
            {
                toast.error(res.data.error,{autoClose: false});
            }
        })
        
    }


   //update data to form based on row click
    const handleRowUpdate=(rowData)=>{
           
        const{req_name,req_contact_no,aadhar_card_no,card_type,dependent_no,children_no,occupation,address,location,
            contact_person,cp_contact_no,jamat_name,id,created_date,ration_card_no,ngo,delivery_date,religion,delivery_status
        }=rowData;

        
        setDate(delivery_date);

        setForm_details({
            req_name,req_contact_no,aadhar_card_no,card_type,dependent_no,children_no,occupation,address,contact_person,id,
            location,cp_contact_no,jamat_name,created_date,ration_card_no,ngo,delivery_date,religion,delivery_status
        })

        
        setOpen(true);


    }

    // update record
    const updateRecord=(event)=>{
        event.preventDefault();
       
        const contact_error=validate_contact(document.querySelector("#req_contact_no"));
        const cp_contact_error=validate_contact(document.querySelector("#cp_contact_no"));

        //add type field
        Object.assign(Form_details,{type:'update'},{contact_error},{cp_contact_error});


        axios.post('/update_requester_details',Form_details)
        // .then((res)=>{
        //   console.log(res);
        // })
        .then((res)=>{
          
            if(res.data.errors)
            {
                const 
                {
                    address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
                    req_contact_no_error,req_name_error,aadhar_card_no_error,ration_card_no_error,religion_error,
                    ngo_error,dependent_no_error,children_no_error,

                }=res.data.errors;
              
                setErrors({
                    address_error,contact_person_error,cp_contact_error,jamat_name_error,location_error,occupation_error,
                    req_contact_no_error,req_name_error,aadhar_card_no_error,dependent_no_error,children_no_error,
                    ration_card_no_error,religion_error,ngo_error
                });
               

            }
            else if(res.data.success)
            {
              fetch_requester_details();
              setOpen(false);
            }
        })


    }

    


  
    return (
      <>
        {/* dialog-section */}
        <section className="request-dialog-section">
          <Dialog
            fullWidth
            maxWidth="sm"
            onRendered={() => {
              plugin();
            }}
            open={open}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <div className="container">
                <div className="row ">
                  <form
                    onSubmit={updateRecord}
                    method="POST"
                    className="form-group"
                    id="submit"
                    autoComplete="off"
                  >
                    {/* Requester Details */}
                    <MuiThemeProvider theme={colortheme}>
                      {/* title */}
                      <DialogTitle
                        id="form-dialog-title"
                        className="text-center"
                      >
                        Edit Requester Details
                      </DialogTitle>

                      <div className="row">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="req_name">Full Name</label>
                          
                            <TextField
                              id="req_name"
                              type="text"
                              name="req_name"
                              className="form-control"
                              onChange={inputEvent}
                              value={req_name}
                              error={(req_name_error) ? true : false }
                              helperText={req_name_error}
                            />
                         
                        </div>

                        {/* requester Contact */}
                        <div className="mt-3">
                          <label htmlFor="req_contact_no">Contact</label>
                          
                            <TextField
                              id="req_contact_no"
                              type="text"
                              name="req_contact_no"
                              className="form-control"
                              onChange={inputEvent}
                              value={req_contact_no}
                              error={(req_contact_no_error) ? true : false }
                              helperText={req_contact_no_error}
                            />
                          
                        </div>

                        {/* Aadhar Card Number */}
                        <div className="mt-3">
                          <label htmlFor="aadhar_card_no">Aadhar Card No</label>
                         
                            <TextField
                              id="aadhar_card_no"
                              type="text"
                              name="aadhar_card_no"
                              className="form-control  "
                              onChange={inputEvent}
                            
                              value={aadhar_card_no}
                              error={(aadhar_card_no_error) ? true : false }
                              helperText={aadhar_card_no_error}
                            />
                          
                        </div>

                        {/* ration Card Number */}
                        <div className="mt-3">
                          <label htmlFor="ration_card_no">Ration Card No</label>
                         
                            <TextField
                              id="ration_card_no"
                              type="text"
                              name="ration_card_no"
                              className="form-control  "
                              onChange={inputEvent}
                             
                              value={ration_card_no}
                              error={(ration_card_no_error) ? true : false}
                              helperText={ration_card_no_error}
                            />
                         
                        </div>

                        {/* Card Type */}
                        <div className="mt-3">
                          <label htmlFor="card_type">Select card-type</label>
                         
                            <TextField 
                            select
                            className="form-control mt-1"
                            onChange={inputEvent}
                            value={card_type}
                            id="card_type"
                            name="card_type"


                            >
                              <MenuItem value="APL">APL</MenuItem>
                              <MenuItem value="BPL">BPL</MenuItem>
                            </TextField>
                         
                        </div>

                        {/* Number of depenedents */}
                        <div className="mt-3">
                          <label htmlFor="dependent_no">
                            {" "}
                            Number of depenedents
                          </label>
                         
                            <TextField
                              className="form-control"
                              inputProps={{ min: "0", step: "1" }}
                              id="dependent_no"
                              type="number"
                              name="dependent_no"
                              onChange={inputEvent}
                              value={dependent_no}
                              error={(dependent_no_error) ? true : false }
                              helperText={dependent_no_error}

                            />
                         
                        </div>

                        {/* Number of children below 15 years age */}
                        <div className="mt-3">
                          <label htmlFor="children_no">
                            Number of children below 15 years age
                          </label>
                         
                            <TextField
                              className="form-control"
                              inputProps={{ min: "0", step: "1" }}
                              id="children_no"
                              type="number"
                              name="children_no"
                              onChange={inputEvent}
                              error={(children_no_error) ? true : false}
                              helperText={children_no_error}
                              value={children_no}
                            />
                         
                        </div>

                        {/* Occupation */}
                        <div className="mt-3">
                          <label htmlFor="occupation">Occupation</label>
                          
                            <Autocomplete
                              freeSolo
                             inputValue={occupation}
                              disableClearable
                              options={searchArray.occupation.map(
                                (data) => data
                              )}
                             
                              className="mt-1"
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
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
                                  value={occupation}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(occupation_error) ? true : false}
                                  helperText={occupation_error}
                                />
                              )}
                            />
                         
                        </div>


                        {/* Religion */}
                        <div className="mt-3">
                          <label htmlFor="occupation">Religion</label>
                         
                            <Autocomplete
                              freeSolo
                              inputValue={religion}
                              disableClearable
                              options={searchArray.religion.map(
                                (data) => data
                              )}
                             
                              className="mt-1"
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
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
                                  value={religion}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(religion_error) ? true : false }
                                  helperText={religion_error}
                                />
                              )}
                            />
                         
                        </div>

                        {/* Address */}
                        <div className="mt-3">
                          <label htmlFor="address">Address</label>
                          
                            <Autocomplete
                              freeSolo
                              disableClearable
                              inputValue={address}
                              options={searchArray.address.map((data) => data)}
                             
                              className="mt-1"
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
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
                                  value={address}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(address_error) ? true : false}
                                  helperText={address_error}
                                />
                              )}
                            />
                         
                        </div>

                        {/* Area/location */}
                        <div className="mt-3">
                          <label htmlFor="location">Area/Location</label>
                         
                            <Autocomplete
                              freeSolo
                              disableClearable
                              inputValue={location}
                              options={searchArray.area_location.map(
                                (data) => data
                              )}
                             
                              className="mt-1"
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
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
                                  value={location}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(location_error) ? true : false}
                                  helperText={location_error}
                                />
                              )}
                            />
                         
                        </div>

                        {/* delivery Date */}
                        <div className="mt-3">
                          <label htmlFor="delivery_date">
                            Delivery date
                          </label>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker 
                              disableToolbar
                              variant="inline"
                              format="DD/MM/YYYY"
                              margin="normal"
                              className="form-control"
                              value={delivery_date}
                              onChange={inputEvent}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}

                            />
                            </MuiPickersUtilsProvider>
                        </div>

                          {/* show  delivery status  if delivery date is not empty*/}
                          {
                            (Date) 
                            ?
                            <div className="mt-3">
                              <label htmlFor="card_type">Delivery Status</label>
                         
                                <TextField 
                                select
                                className="form-control mt-1"
                                onChange={inputEvent}
                                value={delivery_status}
                                id="delivery_status"
                                name="delivery_status"
                                
                                >
                                  <MenuItem value="delivered">delivered</MenuItem>
                                  <MenuItem value="pending">pending</MenuItem>
                                </TextField>
                         
                           </div>

                           : null

                          }
                         
                      </div>
                    </MuiThemeProvider>

                    {/* too contact person details */}
                    <MuiThemeProvider theme={colortheme}>
                      {/* title */}
                      <DialogTitle
                        id="form-dialog-title"
                        className="text-center"
                      >
                        Edit Contact Person Details
                      </DialogTitle>

                      <div className="row">
                        {/* Contact person */}
                        <div>
                          <label htmlFor="contact_person">Contact Person</label>
                          
                            <Autocomplete
                              freeSolo
                              disableClearable
                              inputValue={contact_person}
                              
                              className="mt-1"
                              options={searchArray.contact_person.map(
                                (data) => data
                              )}
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
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
                                  value={contact_person}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(contact_person_error) ? true : false}
                                  helperText={contact_person_error}
                                />
                              )}
                            />
                         
                        </div>

                        {/* Contact */}
                        <div className="mt-3">
                          <label htmlFor="cp_contact_no">
                            Contact Person Contact No
                          </label>
                         
                            <TextField
                              className="form-control mt-1"
                              id="cp_contact_no"
                              type="text"
                              name="cp_contact_no"
                              onChange={inputEvent}
                             
                              value={cp_contact_no}
                              error={(cp_contact_error) ? true : false}
                              helperText={cp_contact_error}
                            />
                          
                        </div>

                          {/* NGO */}
                          <div className="mt-3">
                          <label htmlFor="ngo">
                            NGO
                          </label>
                          
                            <Autocomplete
                              freeSolo
                              disableClearable
                              inputValue={ngo}
                             
                              className="mt-1"
                              options={searchArray.ngo.map(
                                (data) => data
                              )}
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
                                  return {
                                    ...prevValue,
                                    ngo: value,
                                  };
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onChange={inputEvent}
                                  name="ngo"
                                  type="text"
                                  id="ngo"
                                  className="form-control"
                                  value={ngo}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(ngo_error) ? true : false}
                                  helperText={ngo_error}
                                />
                              )}
                            />
                          
                        </div>
                     
                        {/* Mohalla/Masjid jamat */}
                        <div className="mt-3">
                          <label htmlFor="jamat_name">
                            Mohalla/Masjid Jamat
                          </label>
                         
                            <Autocomplete
                              freeSolo
                              disableClearable
                              inputValue={jamat_name}
                              
                              className="mt-1"
                              options={searchArray.mohalla_masjid_jamat.map(
                                (data) => data
                              )}
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
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
                                  value={jamat_name}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(jamat_name_error) ? true : false}
                                  helperText={jamat_name_error}
                                />
                              )}
                            />
                         
                        </div>
                      </div>
                    </MuiThemeProvider>

                    {/* submit button */}
                    <MuiThemeProvider theme={colortheme}>
                      <div className="row mt-4">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          save
                        </Button>
                        <Button
                          type="button"
                          variant="contained"
                          className="mt-2"
                          onClick={() => setOpen(false)}
                        >
                          cancel
                        </Button>
                      </div>
                    </MuiThemeProvider>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* view section */}
        <section className="view-section  mt-5 mb-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Requester Details</h3>
              <hr />
              <MaterialTable
                data={requester_details}
                columns={columns}
                options={{
                  headerStyle: {
                    backgroundColor: "#DEF3FA",
                    color: "black",
                    whiteSpace: "nowrap",
                  },
                  actionsCellStyle: {
                    backgroundColor: "#F8F9F9",
                  },
                  showTitle:false
                }}
                actions={[
                  {
                    //edit
                    icon: "edit",
                    tooltip: "Edit",
                    onClick: (event, rowData) => handleRowUpdate(rowData),
                  },
                ]}
                editable={{
                  //delete
                  onRowDelete: (Data) =>
                    new Promise((resolve) => {
                      handleRowDelete(Data, resolve);
                    }),
                }}
              />
            </div>
          </div>
        </section>
      </>
    );
}

export default RequestEditDelete
