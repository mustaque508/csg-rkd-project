/****************************** Distribute form *************************************/

import 
{
    React,BootstrapTooltip,TextField,Select,MenuItem,useEffect,plugin_for_contact,useState,MuiThemeProvider,colortheme,
    Button,axios,$,toast,Autocomplete
} from '../../Import'

const DistributeForm = () => {

    

    //distribute_details
    const[distribute_details,setDistribute_details]=useState({
        'area':'',
        'qty':'',
        'ngo':'',
        'incharge':'',
        'csg_volunteers':'',
        'data_collected':'',
        'contact_person':'',
        'cp_contact_no':'',
        'vehicle_used':'',
        'jamat_name':'',
        'values':[]
    });

    //errors
    const [errors,setErrors]=useState({
        'area_error':'',
        'contact_person_error':'',
        'cp_contact_error':'',
        'csg_volunteers_error':'',
        'data_collected_error':'',
        'incharge_error':'',
        'ngo_error':'',
        'qty_error':'',
        'vehicle_used_error':'',
        'jamat_name_error':'',
    });

     // Destructing of objects
     const {
            area_error,contact_person_error,cp_contact_error,csg_volunteers_error,data_collected_error,incharge_error,
            ngo_error,qty_error,vehicle_used_error,jamat_name_error
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


    


    useEffect(() => {

        const source = axios.CancelToken.source();

        plugin_for_contact(document.querySelector('#cp_contact_no'));


        // setTooltip_position (($(window).width()<992) ? "right-end" : "top-end");
        if($(window).width()<768){
            setTooltip_position("right-end");
        }

        //fetch all distribution_details
        const fetch_distribution_details =async ()=>{
            try
            {
                await axios.get('/get_distinct_distribute_details',{cancelToken: source.token})
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
            }
            catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error
                }
            }
        }

        fetch_distribution_details();

        return () => {
            source.cancel('Operation canceled by the user.');
        }
    }, [searchArray,sets])


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

       
        const cp_contact_error=validate_contact(document.querySelector("#cp_contact_no"));

        //add type field
        Object.assign(distribute_details,{cp_contact_error});

        //sendData
        axios.post('/store_distribute_details',distribute_details)
        .then((res)=>{

            if(res.data.errors)
            {
                const {
                    area_error,contact_person_error,cp_contact_error,csg_volunteers_error,data_collected_error,incharge_error,
                    ngo_error,qty_error,vehicle_used_error,jamat_name_error
                }=res.data.errors;

                setErrors({
                    area_error,contact_person_error,cp_contact_error,csg_volunteers_error,data_collected_error,incharge_error,
                    ngo_error,qty_error,vehicle_used_error,jamat_name_error
                })
                setOpen(true);
            }
            else if(res.data.success){
                setDistribute_details({
                    'area':'',
                    'qty':'',
                    'ngo':'',
                    'incharge':'',
                    'csg_volnteers':'',
                    'data_collected':'',
                    'contact_person':'',
                    'cp_contact_no':'',
                    'vehicle_used':'',
                    'jamat_name':'',
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
      <section className="ditribute-section mt-5">
        <div className="container">
          <div className="row ">
            {/* content */}
            <div className="content mt-3">
              <form
                onSubmit={submit}
                method="POST"
                className="form-group"
                id="submit"
                autoComplete="off"
              >
                {/* Distriubte Details */}
                <MuiThemeProvider theme={colortheme}>
                  <div className="row">
                    {/* title */}
                    <div className="title">
                      <h3>Enter Distribute Details</h3>
                      <hr />
                    </div>

                    {/* incharge */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="incharge">Incharge </label>
                      <BootstrapTooltip
                        title={incharge_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Autocomplete
                          freeSolo
                          value={distribute_details.values}
                          disableClearable
                          options={searchArray.incharge.map((data) => data)}
                          onSelect={hideToolTip}
                          className="mt-1"
                          onChange={(event, value) => {
                            setDistribute_details((prevValue) => {
                              return {
                                ...prevValue,
                                incharge: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="incharge"
                              id="incharge"
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

                    {/* Covid support group volunteers */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="csg_volnteers">
                        Covid support group volunteers
                      </label>
                      <BootstrapTooltip
                        title={csg_volunteers_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Autocomplete
                          freeSolo
                          value={distribute_details.values}
                          disableClearable
                          options={searchArray.csg_volunteers.map(
                            (data) => data
                          )}
                          onSelect={hideToolTip}
                          className="mt-1"
                          onChange={(event, value) => {
                            setDistribute_details((prevValue) => {
                              return {
                                ...prevValue,
                                csg_volunteers: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="csg_volunteers"
                              id="csg_volunteers"
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

                    {/* NGO */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="ngo">NGO </label>
                      <BootstrapTooltip
                        title={ngo_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Autocomplete
                          freeSolo
                          value={distribute_details.values}
                          disableClearable
                          options={searchArray.ngo.map((data) => data)}
                          onSelect={hideToolTip}
                          className="mt-1"
                          onChange={(event, value) => {
                            setDistribute_details((prevValue) => {
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

                    {/* quantity */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="area">Quantity (kg) </label>
                      <BootstrapTooltip
                        title={qty_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <TextField
                          type="number"
                          inputProps={{ min: "0", step: "1" }}
                          id="qty"
                          name="qty"
                          className="form-control mt-1"
                          onChange={inputEvent}
                          onSelect={hideToolTip}
                        />
                      </BootstrapTooltip>
                    </div>

                    {/* data collected */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="data_collected">Data collected ?</label>
                      <BootstrapTooltip
                        title={data_collected_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Select
                          id="data_collected"
                          name="data_collected"
                          value={distribute_details.data_collected}
                          className="w-100 mt-1"
                          onChange={inputEvent}
                          onMouseOver={hideToolTip}
                        >
                          <MenuItem value="YES">YES</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                        </Select>
                      </BootstrapTooltip>
                    </div>

                    {/*Mohalla/Masjid Jamat */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="jamat_name">Mohalla/Masjid Jamat</label>
                      <BootstrapTooltip
                        title={jamat_name_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Autocomplete
                          freeSolo
                          value={distribute_details.values}
                          disableClearable
                          options={searchArray.mohalla_masjid_jamat.map(
                            (data) => data
                          )}
                          onSelect={hideToolTip}
                          className="mt-1"
                          onChange={(event, value) => {
                            setDistribute_details((prevValue) => {
                              return {
                                ...prevValue,
                                jamat_name: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="jamat_name"
                              id="jamat_name"
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

                    {/* area */}
                    <div className="col-lg mt-3">
                      <label htmlFor="area">Area</label>
                      <BootstrapTooltip
                        title={area_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Autocomplete
                          freeSolo
                          value={distribute_details.values}
                          disableClearable
                          options={searchArray.area.map((data) => data)}
                          onSelect={hideToolTip}
                          className="mt-1"
                          onChange={(event, value) => {
                            setDistribute_details((prevValue) => {
                              return {
                                ...prevValue,
                                area: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="area"
                              id="csg_volunteers"
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

                    {/* too contact person details */}

                    {/* title */}
                    <div className="title mt-5">
                      <h3>Enter Contact Person Details</h3>
                      <hr />
                    </div>

                    {/* Contact person */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="contact_person">Contact Person</label>
                      <BootstrapTooltip
                        title={contact_person_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Autocomplete
                          freeSolo
                          value={distribute_details.values}
                          disableClearable
                          options={searchArray.contact_person.map(
                            (data) => data
                          )}
                          onSelect={hideToolTip}
                          className="mt-1"
                          onChange={(event, value) => {
                            setDistribute_details((prevValue) => {
                              return {
                                ...prevValue,
                                contact_person: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="contact_person"
                              id="contact_person"
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

                    {/* Contact */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="contact_person">
                        Contact Person Contact No
                      </label>
                      <BootstrapTooltip
                        title={cp_contact_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <TextField
                          type="text"
                          id="cp_contact_no"
                          name="cp_contact_no"
                          className="form-control mt-1 "
                          onChange={inputEvent}
                          onKeyUp={hideToolTip}
                        />
                      </BootstrapTooltip>
                    </div>

                    {/* vehicle Used*/}
                    <div className="col-lg-4 mt-3">
                      <label htmlFor="vehicle_used">Vehicle Used</label>
                      <BootstrapTooltip
                        title={vehicle_used_error}
                        open={open}
                        placement={tooltip_position}
                      >
                        <Autocomplete
                          freeSolo
                          value={distribute_details.values}
                          disableClearable
                          options={searchArray.vehicle_used.map((data) => data)}
                          onSelect={hideToolTip}
                          className="mt-1"
                          onChange={(event, value) => {
                            setDistribute_details((prevValue) => {
                              return {
                                ...prevValue,
                                vehicle_used: value,
                              };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name="vehicle_used"
                              id="vehicle_used"
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
        </div>
      </section>
    );
}

export default DistributeForm
