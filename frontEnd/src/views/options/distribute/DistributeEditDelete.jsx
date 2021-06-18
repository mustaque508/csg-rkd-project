/*************************************  Distribute Edit delete  **********************************/

import {React,useEffect,axios,useCallback,toast,MaterialTable,useState,TextField,MuiThemeProvider,Select,MenuItem,
    colortheme,BootstrapTooltip,Autocomplete,Button,Dialog,DialogTitle,DialogContent,plugin_for_contact
} from '../../Import'

const DistributeEditDelete = () => {

    const [distribute_details,setDistribute_details]=useState([]);

    //dialog
    const [open, setOpen] =useState(false);

    //tooltip
    const[tooltip,setTooltip]=useState(false);

    //row index
    const[index,setIndex]=useState(0);


    //distribute_details
    const[Form_details,setForm_details]=useState({
        area:'',
        qty:'',
        ngo:'',
        incharge:'',
        csg_volunteers:'',
        data_collected:'',
        contact_person:'',
        cp_contact_no:'',
        vehicle_used:'',
        jamat_name:'',
        distribution_date:'',
        id:''
    });

    //errors
    const [errors,setErrors]=useState({
        area_error:'',
        contact_person_error:'',
        cp_contact_error:'',
        csg_volunteers_error:'',
        data_collected_error:'',
        incharge_error:'',
        ngo_error:'',
        qty_error:'',
        vehicle_used_error:'',
        jamat_name_error:'',
    });

    // Destructing of objects
    const {
        area_error,contact_person_error,cp_contact_error,csg_volunteers_error,data_collected_error,incharge_error,
        ngo_error,qty_error,vehicle_used_error,jamat_name_error
    }=errors;

    const{
        area,qty,ngo,incharge,csg_volunteers,data_collected,contact_person,cp_contact_no,vehicle_used,jamat_name
    }=Form_details;

    //used for removing duplicate entries
    const [sets]=useState({
        area:new Set(),
        ngo:new Set(),
        incharge:new Set(),
        csg_volunteers:new Set(),
        contact_person:new Set(),
        mohalla_masjid_jamat:new Set(),
        vehicle_used:new Set()

    });

    const [searchArray]=useState({
        area:[],
        ngo:[],
        incharge:[],
        csg_volunteers:[],
        contact_person:[],
        mohalla_masjid_jamat:[],
        vehicle_used:[]
    });


    //Rename key
    const renameKey=(data,newkey,oldkey)=>{
        data[newkey]=data[oldkey];
        delete data[oldkey];
    }

    //get distinct distribution_details
   const fetch_distinct_distribution_details = useCallback(
    ()=>{
        axios.get('/get_distinct_distribute_details')
        .then((res)=>{
            
            console.log(res.data.result);
            if(res.data.result)
            {
                    res.data.result.map ((data,index)=>{
                        return(
                            sets.area.add(data.area),
                            sets.ngo.add(data.NGO),
                            sets.incharge.add(data.incharge),
                            sets.csg_volunteers.add(data.csg_volunteers),
                            sets.contact_person.add(data.contact_person),
                            sets.mohalla_masjid_jamat.add(data.mohalla_masjid_jamat),
                            sets.vehicle_used.add(data.vehicle_used)
                        )
                        
                    })

                    //area
                    for (let item of  sets.area) {
                        searchArray.area.push(item);
                    }

                    //ngo
                    for (let item of  sets.ngo) {
                        searchArray.ngo.push(item);
                    }

                    //incharge
                    for (let item of  sets.incharge) {
                        searchArray.incharge.push(item);
                    }

                    //csg_volunteers
                    for (let item of  sets.csg_volunteers) {
                        searchArray.csg_volunteers.push(item);
                    }

                    //contact_person
                    for (let item of  sets.contact_person) {
                        searchArray.contact_person.push(item);
                    }

                    //mohalla_masjid_jamat
                    for (let item of  sets.mohalla_masjid_jamat) {
                        searchArray.mohalla_masjid_jamat.push(item);
                    }

                    //vehicle_used
                    for (let item of  sets.vehicle_used) {
                        searchArray.vehicle_used.push(item);
                    }

                    console.log(searchArray);
            }
            else if(res.data.error)
            {
                toast.error(res.data.error,{autoClose: false}); 
            }
        })
    },[searchArray,sets]
    )


    //get all distribution details
    const fetch_distribute_details =useCallback(
        ()=>{
            axios.get('get_all_distribute_details')
            .then((res)=>{
                if(res.data.result)
                {

                    res.data.result.forEach(element => {
                        renameKey(element,'ngo','NGO');
                        renameKey(element,'cp_contact_no','cp_phone');
                        renameKey(element,'jamat_name','mohalla_masjid_jamat');
                    });

                    setDistribute_details(res.data.result);
                    
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

    useEffect(() => {

        //get all distribute details
        fetch_distribute_details();

        //get distinct distribution details
        fetch_distinct_distribution_details();

    }, [fetch_distribute_details,fetch_distinct_distribution_details])

    //validate contact_number based on countrycode
    const validate_contact = (props) =>
    {
         return plugin_for_contact(props);
 
     }

   //Hide Tooltip
   const hideToolTip =() =>{
        setTooltip(false);
    }

    //update data to form based on row click
    const handleRowUpdate = (rowData) =>{
        console.log(rowData);

        const {area,qty,ngo,incharge,csg_volunteers,data_collected,contact_person,cp_contact_no,vehicle_used,
            jamat_name,id,distribution_date}=rowData;

        setForm_details({area,qty,ngo,incharge,csg_volunteers,data_collected,contact_person,cp_contact_no,vehicle_used,
            jamat_name,id,distribution_date});

        //set index
        setIndex(rowData.tableData.id);

        setOpen(true);
    }

    //material-table coloumns
    const columns =[
        {
            title:'Sr No',
            field:'id'
        },
        {
            title:'Incharge', 
            field:'incharge'
        },
        {
            title:'CSG Volunteers', 
            field:'csg_volunteers'
        },
        {
            title:'NGO', 
            field:'ngo'
        },
        {
            title:'Quantity (kg)', 
            field:'qty'
        },
        {
            title:'Data Collected ?', 
            field:'data_collected'
        },
        {
            title:'Area', 
            field:'area'
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
            title:'Mohalla/Masjid jamat ', 
            field:'jamat_name'
        },
        {
            title:'Vehicle used', 
            field:'vehicle_used'
        },
        {
            title:'Distribution date', 
            field:'distribution_date',
            type: "date",
            dateSetting: { locale: "en-GB" }
        }
    ];

    //delete record
    const handleRowDelete = (Data,resolve)=>{

        axios.post('delete_distribute_details',{id:Data.id})
        .then((res)=>{

            if(res.data.success)
            {
                //update table
                const updatedRows=[...distribute_details];
                const index=Data.tableData.id;
                updatedRows.splice(index,1);
                setTimeout(()=>{
                    setDistribute_details(updatedRows);
                    resolve();
                },2000)

            }
            else if(res.data.error)
            {
                toast.error(res.data.error,{autoClose: false});
            }
        })
        
    }

    //update record
    const updateRecord = (event) =>{
        event.preventDefault();

        const cp_contact_error=validate_contact(document.querySelector("#cp_contact_no"));

        //add type field
        Object.assign(Form_details,{cp_contact_error});

        axios.post('/update_distribute_details',Form_details)
        .then((res)=>{
          
            if(res.data.errors)
            {
                const 
                {
                    area_error,contact_person_error,cp_contact_error,csg_volunteers_error,data_collected_error,incharge_error,
                    ngo_error,qty_error,vehicle_used_error,jamat_name_error
                }=res.data.errors;
              
                setErrors({
                    area_error,contact_person_error,cp_contact_error,csg_volunteers_error,data_collected_error,incharge_error,
                    ngo_error,qty_error,vehicle_used_error,jamat_name_error
                });
                setTooltip(true);

            }
            else if(res.data.success)
            {
               const dataUpdate=[...distribute_details];
               dataUpdate[index]=Form_details;
               setDistribute_details([...dataUpdate]);
               toast.success('your record updated successfully');
               setOpen(false);
            }
        })

    }

    return (
        <>
            {/* dialog-section */}
            <section className="distribute-dialog-section">

                <Dialog fullWidth maxWidth="sm" onRendered={()=>plugin_for_contact(document.querySelector('#cp_contact_no'))} open={open} aria-labelledby="form-dialog-title">
                    <DialogContent>

                        <div className="container">
                            <div className="row">
                                <form onSubmit={updateRecord} method="POST" className="form-group" id="submit" autoComplete="off">

                                     {/* Distributer Details */}
                                     <MuiThemeProvider theme={colortheme}>

                                        {/* title */}
                                        <DialogTitle id="form-dialog-title" className="text-center">Edit Distributer Details</DialogTitle>

                                        <div className="row">

                                            {/* incharge */}
                                            <div>
                                                <label htmlFor="incharge">Incharge </label>
                                                <BootstrapTooltip title={incharge_error} open={tooltip} placement='right-end'>
                                                        <Autocomplete
                                                            freeSolo
                                                            value={incharge}
                                                            disableClearable
                                                            options={searchArray.incharge.map((data) => data)}
                                                            onSelect={hideToolTip}
                                                            onChange={(event,value)=>{
                                                                setForm_details((prevValue)=>{
                                                                    return{
                                                                        ...prevValue,
                                                                        incharge:value
                                                                    }
                                                                })
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    type="text"
                                                                    name="incharge"
                                                                    id="incharge"
                                                                    onChange={inputEvent}
                                                                    className="form-control"
                                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                                />
                                                            )}
                                                        />
                                                </BootstrapTooltip>
                                            </div>

                                            {/* Covid support group volunteers */}
                                            <div className="mt-3">
                                                <label htmlFor="csg_volnteers">Covid support group volunteers</label>
                                                <BootstrapTooltip title={csg_volunteers_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        value={csg_volunteers}
                                                        disableClearable
                                                        options={searchArray.csg_volunteers.map((data) => data)}
                                                        onSelect={hideToolTip}
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    csg_volunteers:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                type="text"
                                                                name="csg_volunteers"
                                                                id="csg_volunteers"
                                                                onChange={inputEvent}
                                                                className="form-control"
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>
                                            </div>

                                            {/* NGO */}
                                            <div className="mt-3">
                                                <label htmlFor="ngo">NGO </label>
                                                <BootstrapTooltip title={ngo_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        value={ngo}
                                                        disableClearable
                                                        options={searchArray.ngo.map((data) => data)}
                                                        onSelect={hideToolTip}
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    ngo:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                type="text"
                                                                name="ngo"
                                                                id="ngo"
                                                                onChange={inputEvent}
                                                                className="form-control"
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>   
                                            </div>

                                            {/* quantity */}
                                            <div className="mt-3">
                                                <label htmlFor="area">Quantity (kg) </label>
                                                <BootstrapTooltip title={qty_error} open={tooltip} placement='right-end'>
                                                    <TextField type="number" inputProps={{ min: "0", step: "1" }} id="qty" name="qty" className="form-control" onChange={inputEvent}   onSelect={hideToolTip} value={qty}  />
                                                </BootstrapTooltip>
                                            </div>

                                            {/* data collected */}
                                            <div className="mt-3">
                                                <label htmlFor="data_collected">Data collected ?</label>
                                                <BootstrapTooltip title={data_collected_error} open={tooltip} placement='right-end'>
                                                    <Select id="data_collected" name="data_collected" value={data_collected} className="w-100 "  onChange={inputEvent}   onSelect={hideToolTip} >
                                                        <MenuItem value="YES">YES</MenuItem>
                                                        <MenuItem value="NO">NO</MenuItem>
                                                    </Select>
                                                </BootstrapTooltip>
                                            </div>

                                            {/*Mohalla/Masjid Jamat */}
                                            <div className="mt-3">
                                                <label htmlFor="jamat_name">Mohalla/Masjid Jamat</label>
                                                <BootstrapTooltip title={jamat_name_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        value={jamat_name}
                                                        disableClearable
                                                        options={searchArray.mohalla_masjid_jamat.map((data) => data)}
                                                        onSelect={hideToolTip}
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
                                                                type="text"
                                                                name="jamat_name"
                                                                id="jamat_name"
                                                                onChange={inputEvent}
                                                                className="form-control"
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip> 
                                            </div>

                                            {/* area */}
                                            <div className="mt-3">
                                                <label htmlFor="area">Area</label>
                                                <BootstrapTooltip title={area_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        value={area}
                                                        disableClearable
                                                        options={searchArray.area.map((data) => data)}
                                                        onSelect={hideToolTip}
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
                                                                return{
                                                                    ...prevValue,
                                                                    area:value
                                                                }
                                                            })
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                type="text"
                                                                name="area"
                                                                id="csg_volunteers"
                                                                onChange={inputEvent}
                                                                className="form-control"
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
                                                        value={contact_person}
                                                        disableClearable
                                                        options={searchArray.contact_person.map((data) => data)}
                                                        onSelect={hideToolTip}
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
                                                                type="text"
                                                                name="contact_person"
                                                                id="contact_person"
                                                                onChange={inputEvent}
                                                                className="form-control"
                                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                            />
                                                        )}
                                                    />
                                                </BootstrapTooltip>  
                                             </div>

                                             {/* Contact */}
                                             <div className="mt-3">
                                                <label htmlFor="contact_person">Contact Person Contact No</label>
                                                <BootstrapTooltip title={cp_contact_error} open={tooltip} placement='right-end'>
                                                    <TextField type="text" id="cp_contact_no" name="cp_contact_no" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} value={cp_contact_no} />
                                                </BootstrapTooltip>
                                             </div>

                                             <div className="mt-3">
                                                <label htmlFor="vehicle_used">Vehicle Used</label>
                                                <BootstrapTooltip title={vehicle_used_error} open={tooltip} placement='right-end'>
                                                    <Autocomplete
                                                        freeSolo
                                                        value={vehicle_used}
                                                        disableClearable
                                                        options={searchArray.vehicle_used.map((data) => data)}
                                                        onSelect={hideToolTip}
                                                        onChange={(event,value)=>{
                                                            setForm_details((prevValue)=>{
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
             <section className="distirbute-view-section mt-5 mb-5">
                    <MaterialTable  
                        title="Distribution Details"
                        data={distribute_details}
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
             </section>
        </>
    )
}

export default DistributeEditDelete