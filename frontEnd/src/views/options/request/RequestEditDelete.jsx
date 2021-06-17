/**************************   Request Edit Delete   *******************************/

import {React,useEffect,axios,useCallback,toast,MaterialTable,useState,TextField,plugin_for_contact,
    Select,MenuItem,MuiThemeProvider,colortheme,BootstrapTooltip,Autocomplete,Button,Dialog,DialogTitle,
    DialogContent
} from '../../Import'





const RequestEditDelete = () => {

    //details of requesters
    const [requester_details,setRequester_details]=useState([]);

   

    //dialog
    const [open, setOpen] =useState(false);

    //tooltip
    const[tooltip,setTooltip]=useState(false);

    //row index
    const[index,setIndex]=useState(0);


    //Request Details
    const [Form_details,setForm_details]=useState({
        req_name:'',
        req_contact_no:'',
        card_no:'',
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
        created_date:''

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

     const{
        req_name,req_contact_no,card_no,card_type,dependent_no,children_no,occupation,address,location,jamat_name,
        contact_person,cp_contact_no
     }=Form_details;

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


    //get distinct requester_details
    const fetch_distinct_requester_details = useCallback(
    ()=>{
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
                        sets.mohalla_masjid_jamat.add(data.mohalla_masjid_jamat)
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

      //Rename key
    const renameKey=(data,newkey,oldkey)=>{
        data[newkey]=data[oldkey];
        delete data[oldkey];
    }
  
   
    //get all requester details
    const fetch_requester_details =useCallback(
        ()=>{
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

        },[]
    );

    //validate contact_number based on countrycode
    const validate_contact = (props) =>
    {
         return plugin_for_contact(props);
 
    }
 

    useEffect(() => {

        //get all requster details
        fetch_requester_details();

        //get distinct requester_details
        fetch_distinct_requester_details();


    }, [fetch_requester_details,fetch_distinct_requester_details])


    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        const{name,value}=event.target;
        setForm_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
    }

    //Hide Tooltip
    const hideToolTip =() =>{
        setTooltip(false);
    }

    //plugin for contact
    const plugin=()=>{
        plugin_for_contact(document.querySelector('#req_contact_no'));
        plugin_for_contact(document.querySelector('#cp_contact_no'));
    }

    //material-table coloumns
    const columns =[
        {
            title:'Sr No',
            field:'id'
        },
        {
            title:'Name', 
            field:'req_name'
        },
        {
            title:'Contact no', 
            field:'req_contact_no'
        },
        {
            title:'Aadhar/Ration card no',
            field:'card_no'
        },
        {
            title:'Card type', 
            field:'card_type'
        },
        {
            title:'Number of dependents',
            field:'dependent_no'
        },
        {
            title:'Number of children below 15 years age', 
            field:'children_no'
        },
        {
            title:'Occupation',
            field:'occupation'
        },
        {
            title:'Address',
            field:'address'

        },
        {
            title:'Area/Location',
            field:'location'
        },
        {
            title:'Contact person', 
            field:'contact_person'
        },
        {
            title:'Contact person contact no',
            field:'cp_contact_no'
        },
        {
            title:'Mohalla/Masjid jamat',
            field:'jamat_name'
        },
        {
            title:'Created Date',
            field:'created_date',
            type:'date',
            dateSetting: { locale: "en-GB" }
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
           
        const{req_name,req_contact_no,card_no,card_type,dependent_no,children_no,occupation,address,location,
            contact_person,cp_contact_no,jamat_name,id,created_date
        }=rowData;

        setForm_details({
            req_name,req_contact_no,card_no,card_type,dependent_no,children_no,occupation,address,contact_person,id,
            location,cp_contact_no,jamat_name,created_date
        })


        //set index
        setIndex(rowData.tableData.id);

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
                setTooltip(true);

            }
            else if(res.data.success)
            {
               const dataUpdate=[...requester_details];
               dataUpdate[index]=Form_details;
               setRequester_details([...dataUpdate]);
               toast.success('your record updated successfully');
               setOpen(false);
            }
        })


    }

    


  
    return (   

        <>
            {/* dialog-section */}
            <section className="request-dialog-section">
                <Dialog fullWidth maxWidth="sm" onRendered={()=>{plugin()}} open={open}  aria-labelledby="form-dialog-title">

                    <DialogContent>

                        <div className="container">
                            <div className="row ">
                                <form onSubmit={updateRecord} method="POST" className="form-group" id="submit" autoComplete="off">

                                      {/* Requester Details */}
                                    <MuiThemeProvider theme={colortheme}>
                                        
                                        {/* title */}
                                        <DialogTitle id="form-dialog-title" className="text-center">Edit Requester Details</DialogTitle>
                                        

                                        <div className="row">

                                            {/* Full Name */}
                                            <div>
                                                <label htmlFor="req_name">Full Name</label>
                                                <BootstrapTooltip title={req_name_error} open={tooltip} placement='right-end'>
                                                    <TextField  id="req_name" type="text" name="req_name" className="form-control" onChange={inputEvent} onSelect={hideToolTip} value={req_name} />
                                                </BootstrapTooltip>
                                            </div>

                                            {/* requester Contact */}
                                            <div className="mt-3">
                                                <label htmlFor="req_contact_no">Contact</label>
                                                <BootstrapTooltip title={req_contact_no_error} open={tooltip} placement='right-end'>
                                                    <TextField  id="req_contact_no"   type="text" name="req_contact_no" className="form-control" onChange={inputEvent} onSelect={hideToolTip} value={req_contact_no} />
                                                 </BootstrapTooltip>
                                            </div>

                                            {/* Aadhar Card/Ration Card Number */}
                                            <div className="mt-3">
                                                <label htmlFor="card_no">Aadhar/Ration Card No</label>
                                                <BootstrapTooltip  title={card_no_error} open={tooltip} placement='right-end'>
                                                    <TextField  id="card_no"   type="text" name="card_no" className="form-control  " onChange={inputEvent} onSelect={hideToolTip} value={card_no}/>
                                                </BootstrapTooltip> 
                                            </div>

                                            {/* Card Type */}
                                            <div className="mt-3">
                                                <label htmlFor="card_type"  >Select card-type</label>
                                                <BootstrapTooltip title={req_card_type_error} open={tooltip} placement='right-end'>
                                                    <Select id="card_type" name="card_type" className="w-100 mt-1"  onChange={inputEvent} onSelect={hideToolTip} value={card_type}  >
                                                        <MenuItem value="APL">APL</MenuItem>
                                                        <MenuItem value="BPL">BPL</MenuItem>
                                                    </Select>
                                                </BootstrapTooltip>
                                            </div>

                                            {/* Number of depenedents */}
                                            <div className="mt-3">
                                                <label htmlFor="dependent_no"> Number of depenedents</label>
                                                <BootstrapTooltip title={dependent_no_error} open={tooltip} placement='right-end'>
                                                    <TextField  className="form-control" inputProps={{ min: "0", step: "1" }} id="dependent_no" type="number" name="dependent_no"  onChange={inputEvent} onSelect={hideToolTip} value={dependent_no}/>
                                                </BootstrapTooltip>
                                            </div>

                                            {/* Number of children below 15 years age */}
                                            <div className="mt-3">
                                                <label htmlFor="children_no">Number of children below 15 years age</label>
                                                <BootstrapTooltip title={children_no_error} open={tooltip} placement='right-end'>
                                                    <TextField  className="form-control" inputProps={{ min: "0", step: "1" }} id="children_no" type="number" name="children_no"  onChange={inputEvent} onClick={hideToolTip} value={children_no}/>
                                                </BootstrapTooltip>
                                            </div>

                                            {/* Occupation */}
                                            <div className="mt-3">
                                                <label htmlFor="occupation">Occupation</label>
                                                <BootstrapTooltip title={occupation_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        value={occupation}
                                                        disableClearable
                                                        options={searchArray.occupation.map((data) => data)}
                                                        onSelect={hideToolTip}
                                                        className="mt-1"
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
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
                                                                value={occupation}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                            </div>


                                            {/* Address */}
                                            <div className="mt-3">
                                                <label htmlFor="address">Address</label>
                                                <BootstrapTooltip title={address_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={address}
                                                        options={searchArray.address.map((data) => data)}
                                                        onSelect={hideToolTip}
                                                        className="mt-1"
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
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
                                                                value={address}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                            </div>

                                            {/* Area/location */}
                                            <div className="mt-3">
                                                <label htmlFor="location">Area/Location</label>
                                                <BootstrapTooltip title={location_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={location}
                                                        options={searchArray.area_location.map((data) => data)}
                                                        onSelect={hideToolTip}
                                                        className="mt-1"
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
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
                                                                value={location}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                            </div>
                                        </div>
                                    </MuiThemeProvider>

                                    {/* too contact person details */}
                                    <MuiThemeProvider theme={colortheme}>

                                         {/* title */}
                                         <DialogTitle id="form-dialog-title" className="text-center">Edit Contact Person Details</DialogTitle>

                                         <div className="row">

                                              {/* Contact person */}
                                             <div>
                                                <label htmlFor="contact_person">Contact Person</label>
                                                <BootstrapTooltip title={contact_person_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={contact_person}
                                                        onSelect={hideToolTip}
                                                        className="mt-1"
                                                        options={searchArray.contact_person.map((data) => data)}
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
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
                                                                value={contact_person}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                             </div>

                                             {/* Contact */}
                                             <div className="mt-3">
                                                <label htmlFor="cp_contact_no" >Contact Person Contact No</label>
                                                <BootstrapTooltip title={cp_contact_error} open={tooltip} placement='right-end'>
                                                        <TextField className="form-control mt-1" id="cp_contact_no"  type="text" name="cp_contact_no" onChange={inputEvent} onSelect={hideToolTip} value={cp_contact_no}/>
                                                </BootstrapTooltip>
                                             </div>

                                             {/* Mohalla/Masjid jamat */}
                                             <div className="mt-3">
                                                <label htmlFor="jamat_name">Mohalla/Masjid Jamat</label>
                                                <BootstrapTooltip title={jamat_name_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        disableClearable
                                                        value={jamat_name}
                                                        onSelect={hideToolTip}
                                                        className="mt-1"
                                                        options={searchArray.mohalla_masjid_jamat.map((data) => data)}
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
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
                                                                value={jamat_name}
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip> 
                                             </div>
                                         </div>
                                    </MuiThemeProvider>

                                    {/* submit button */}
                                    <MuiThemeProvider theme={colortheme} >
                                        <div className="row mt-4">
                                            <Button  type="submit" variant="contained" color="primary">Edit</Button> 
                                            <Button  type="button" variant="contained" className="mt-2" onClick={()=>setOpen(false)}>cancel</Button>   
                                        </div>
                                    </MuiThemeProvider>
                                    

                                </form>
                            </div>
                        </div>

                    </DialogContent>
                </Dialog>
            </section>
            

            {/* view section */}
            <section className="request-view-section mt-5 mb-5">
                <div className="container">
                    <div className="row">
                        <MaterialTable 
                            title="Requester Details"
                            data={requester_details}
                            columns={columns}   
                            options={{
                                headerStyle: {
                                backgroundColor: '#DEF3FA',
                                color: 'black',
                                whiteSpace: 'nowrap',
                                },
                                actionsCellStyle:{
                                    backgroundColor: "#F8F9F9",
                                }
                            }}
                            
                            actions={[
                                {
                                    //edit
                                    icon:'edit',
                                    tooltip:'Edit',
                                    onClick:(event,rowData)=>handleRowUpdate(rowData)
                                }
                            ]}
                            editable={{

                                    //delete
                                    onRowDelete: (Data) =>new Promise((resolve) => {
                                    handleRowDelete(Data, resolve);
                                    })
                            }}
                        />
                    </div>
                </div>
            </section>
      </>
    )
}

export default RequestEditDelete
