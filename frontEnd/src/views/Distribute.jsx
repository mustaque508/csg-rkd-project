/****************************** Distribute form *************************************/

import 
{
    React,Header,BootstrapTooltip,TextField,Select,MenuItem,useEffect,plugin_for_contact,useState,MuiThemeProvider,colortheme,
    Button,axios,$
} from './Import'

const Distribute = () => {

    //distribute_details
    const[distribute_details,setDistribute_details]=useState({
        'area':'',
        'qty':'',
        'ngo':'',
        'incharge':'',
        'csg_volnteers':'',
        'data_collected':'',
        'contact_person':'',
        'cp_contact_no':'',
        'vehicle_used':''
    });

    //errors
    const [errors,setErrors]=useState({
        'area_error':'',
        'contact_person_error':'',
        'cp_contact_error':'',
        'csg_volnteers_error':'',
        'data_collected_error':'',
        'incharge_error':'',
        'ngo_error':'',
        'qty_error':'',
        'vehicle_used_error':''
    });

     // Destructing of objects
     const {
            area_error,contact_person_error,cp_contact_error,csg_volnteers_error,data_collected_error,incharge_error,
            ngo_error,qty_error,vehicle_used_error
     }=errors;

    // show tooltip 
    const [open, setOpen] = useState(false);

    const[tooltip_position,setTooltip_position]=useState("top-end");

    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        const{name,value}=event.target;
        setDistribute_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
    }

    

    useEffect(() => {
        plugin_for_contact(document.querySelector('#cp_contact_no'));


        // setTooltip_position (($(window).width()<992) ? "right-end" : "top-end");
        if($(window).width()<992){
            setTooltip_position("right-end");
        }
    }, [])


    //validate contact_number based on countrycode
    const validate_contact = (props) =>
    {
        return plugin_for_contact(props);

    }


      //Hide Tooltip
      const hideToolTip =() =>{
        setOpen(false);
    }

    //submit
    const submit = (event) =>{

        event.preventDefault();

        console.log(distribute_details);
        const cp_contact_error=validate_contact(document.querySelector("#cp_contact_no"));

        //sendData
        axios.post('/store_distribute_details',{distribute_details,cp_contact_error})
        .then((res)=>{

            if(res.data.errors)
            {
                const {
                    area_error,contact_person_error,cp_contact_error,csg_volnteers_error,data_collected_error,incharge_error,
                    ngo_error,qty_error,vehicle_used_error
                }=res.data.errors;

                setErrors({
                    area_error,contact_person_error,cp_contact_error,csg_volnteers_error,data_collected_error,incharge_error,
                    ngo_error,qty_error,vehicle_used_error
                })
                setOpen(true);
            }
        })


    }


    return (
        <section className="ditribute-section">

            {/* header */}
            <Header/>

            {/* content */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        
                        <div className="card">

                            {/* card-title */}
                            <h2 className="text-uppercase font-weight-bold card-title text-center mt-2">Distribute Form</h2><hr/>

                            {/* content */}
                            <div className="card-body">

                                <form onSubmit={submit} method="POST" className="form-group" id="submit" autoComplete="off">

                                    {/* Distriubte Details */}
                                    <div className="card">
                                        <div className="card-body">

                                            {/* heading */}
                                            <h4 className="card-title">Distribute Details</h4>

                                            {/* content */}
                                            <div className="row mt-4">

                                                {/* area */}
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="area">Area</label>
                                                    <BootstrapTooltip title={area_error} open={open} placement={tooltip_position}>
                                                        <TextField type="text" id="area" name="area" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                    </BootstrapTooltip>
                                                    
                                                </div>

                                                {/* quantity */}
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="area">Quantity (kg) </label>
                                                    <BootstrapTooltip title={qty_error} open={open} placement={tooltip_position}>
                                                        <TextField type="number" inputProps={{ min: "0", step: "1" }} id="qty" name="qty" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip}  />
                                                    </BootstrapTooltip>
                                                </div>

                                                {/* NGO */}
                                                <div className="col-lg mt-2">
                                                    <label htmlFor="ngo">NGO </label>
                                                    <BootstrapTooltip title={ngo_error} open={open} placement={tooltip_position}>
                                                        <TextField type="text" id="ngo" name="ngo" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                    </BootstrapTooltip>
                                                </div>

                                            </div>

                                            <div className="row mt-4">

                                                {/* incharge */}
                                                <div className="col-lg mt-2 mb-1">
                                                    <label htmlFor="incharge">Incharge </label>
                                                    <BootstrapTooltip title={incharge_error} open={open} placement={tooltip_position}>
                                                        <TextField type="text" id="incharge" name="incharge" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                    </BootstrapTooltip>
                                                    
                                                </div>

                                                 {/* incharge */}
                                                 <div className="col-lg mt-2 mb-1">
                                                    <label htmlFor="csg_volnteers">Covid support group volunteers</label>
                                                    <BootstrapTooltip title={csg_volnteers_error} open={open} placement={tooltip_position}>
                                                        <TextField type="text" id="csg_volnteers" name="csg_volnteers" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                    </BootstrapTooltip>
                                                </div>

                                                 {/* data collected */}
                                                 <div className="col-lg  mb-1">
                                                    <label htmlFor="data_collected">Data collected ?</label>
                                                    <BootstrapTooltip title={data_collected_error} open={open} placement={tooltip_position}>
                                                        <Select id="data_collected" name="data_collected" value={distribute_details.data_collected} className="form-control border-0" style={{'marginTop':'-0.2rem'}} onChange={inputEvent}  onKeyUp={hideToolTip} >
                                                            <MenuItem value="YES">YES</MenuItem>
                                                            <MenuItem value="NO">NO</MenuItem>
                                                        </Select>
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

                                                  {/* contact person */}
                                                 <div className="col-lg mt-2 mb-1">
                                                    <label htmlFor="contact_person">Contact Person</label>
                                                    <BootstrapTooltip title={contact_person_error} open={open} placement={tooltip_position}>
                                                        <TextField type="text" id="contact_person" name="contact_person" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                    </BootstrapTooltip>
                                                </div>

                                                 {/* Contact */}
                                                 <div className="col-lg mt-2 mb-1">
                                                    <label htmlFor="contact_person">Contact Person Contact No</label>
                                                    <BootstrapTooltip title={cp_contact_error} open={open} placement={tooltip_position}>
                                                        <TextField type="text" id="cp_contact_no" name="cp_contact_no" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} />
                                                    </BootstrapTooltip>
                                                    
                                                </div>

                                                 {/* vehicle Used*/}
                                                 <div className="col-lg mt-2 mb-1">
                                                    <label htmlFor="vehicle_used">Vehicle Used</label>
                                                    <BootstrapTooltip title={vehicle_used_error} open={open} placement={tooltip_position}>
                                                        <TextField type="text" id="vehicle_used" name="vehicle_used" className="form-control" onChange={inputEvent}  onKeyUp={hideToolTip} />
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

export default Distribute
