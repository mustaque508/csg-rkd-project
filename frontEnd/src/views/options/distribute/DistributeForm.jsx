/****************************** Distribute form *************************************/

import 
{
    React,TextField,MenuItem,useEffect,plugin_for_contact,useState,MuiThemeProvider,colortheme,
    Button,axios,toast,Autocomplete,useCallback
} from '../../Import'

const DistributeForm = () => {

    

    //distribute_details
    const[distribute_details,setDistribute_details]=useState({
        area:'',
        qty:'',
        ngo:'',
        incharge:'',
        csg_volunteers:'',
        data_collected:'',
        contact_person:'',
        cp_contact_no:'',
        vehicle_used:'',
        jamat_name:''
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
        jamat_name_error:''
    });

     // Destructing of objects
     const {
            area_error,contact_person_error,cp_contact_error,csg_volunteers_error,data_collected_error,incharge_error,
            ngo_error,qty_error,vehicle_used_error,jamat_name_error
     }=errors;


     const {
      area,ngo,incharge,csg_volunteers,contact_person,vehicle_used,jamat_name,
     }=distribute_details



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


    //fetch all distribution_details
    const fetch_distribution_details=useCallback(
      () => {
        try
        {
             axios.get('/get_distinct_distribute_details')
            .then((res)=>{
              
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
    
                       
                }
                else if(res.data.error)
                {
                    toast.error(res.data.error,{autoClose: false}); 
                }
            })
        }
        catch (error) {
          toast.error(error,{autoClose: false}); 
        }
      },
      [searchArray,sets],
    )


    useEffect(() => {

      
        plugin_for_contact(document.querySelector('#cp_contact_no'));

        fetch_distribution_details();

    }, [fetch_distribution_details])


    //validate contact_number based on countrycode
    const validate_contact = (props) =>
    {
        return plugin_for_contact(props);

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
               
            }
            else if(res.data.success){

                setDistribute_details({
                  area:'',
                  qty:'',
                  ngo:'',
                  incharge:'',
                  csg_volunteers:'',
                  data_collected:'',
                  contact_person:'',
                  cp_contact_no:'',
                  vehicle_used:'',
                  jamat_name:''
                });

                setErrors({
                  area_error:'',
                  contact_person_error:'',
                  cp_contact_error:'',
                  csg_volunteers_error:'',
                  data_collected_error:'',
                  incharge_error:'',
                  ngo_error:'',
                  qty_error:'',
                  vehicle_used_error:'',
                  jamat_name_error:''
                });

                event.target.reset();

                plugin_for_contact(document.querySelector('#cp_contact_no'));

                searchArray.area=[];
                searchArray.ngo=[];
                searchArray.incharge=[];
                searchArray.csg_volunteers=[];
                searchArray.contact_person=[];
                searchArray.mohalla_masjid_jamat=[];
                searchArray.vehicle_used=[];
                
                fetch_distribution_details();
                
                // toast.success(res.data.success);
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
                      
                        <Autocomplete
                          freeSolo
                         inputValue={incharge}
                          disableClearable
                          options={searchArray.incharge.map((data) => data)}
                         
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
                              error={(incharge_error) ? true : false}
                              helperText={incharge_error}
                            />
                          )}
                        />
                      
                    </div>

                    {/* Covid support group volunteers */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="csg_volnteers">
                        Covid support group volunteers
                      </label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={csg_volunteers}
                          disableClearable
                          options={searchArray.csg_volunteers.map(
                            (data) => data
                          )}
                         
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
                              error={(csg_volunteers_error) ? true : false}
                              helperText={csg_volunteers_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* NGO */}
                    <div className="col-lg-4 col-md-6 mt-3">
                      <label htmlFor="ngo">NGO </label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={ngo}
                          disableClearable
                          options={searchArray.ngo.map((data) => data)}
                         
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
                              error={(ngo_error) ? true : false}
                              helperText={ngo_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* quantity */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="area">Quantity </label>
                     
                        <TextField
                          type="number"
                          inputProps={{ min: "0",  step: "0.01"}}
                          id="qty"
                          name="qty"
                          className="form-control mt-1"
                          onChange={inputEvent}
                          onWheelCapture={(e)=>e.target.blur()}
                          error={(qty_error) ? true : false}
                          helperText={qty_error}
                        />
                     
                    </div>

                    {/* data collected */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="data_collected">Data collected ?</label>
                   
                       <TextField 
                      select
                      className="form-control mt-1"
                      onChange={inputEvent}
                      id="data_collected"
                      name="data_collected"
                      value={distribute_details.data_collected}
                      error={(data_collected_error) ? true : false }
                      helperText={data_collected_error}

                    >
                       <MenuItem value="YES">YES</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                    </TextField>
                        {/* <Select
                          id="data_collected"
                          name="data_collected"
                          value={distribute_details.data_collected}
                          className="w-100 mt-1"
                          onChange={inputEvent}
                          onMouseOver={hideToolTip}
                        >
                          <MenuItem value="YES">YES</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                        </Select> */}
                     
                    </div>

                    {/*Mohalla/Masjid Jamat */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="jamat_name">Mohalla/Masjid Jamat</label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={jamat_name}
                          disableClearable
                          options={searchArray.mohalla_masjid_jamat.map(
                            (data) => data
                          )}
                         
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
                              error={(jamat_name_error) ? true : false}
                              helperText={jamat_name_error}
                            />
                          )}
                        />
                     
                    </div>

                    {/* area */}
                    <div className="col-lg mt-3">
                      <label htmlFor="area">Area</label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={area}
                          disableClearable
                          options={searchArray.area.map((data) => data)}
                         
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
                              error={(area_error)? true : false}
                              helperText={area_error}
                            />
                          )}
                        />
                      
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
                    
                        <Autocomplete
                          freeSolo
                          inputValue={contact_person}
                          disableClearable
                          options={searchArray.contact_person.map(
                            (data) => data
                          )}
                         
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
                              error={(contact_person_error) ? true : false}
                              helperText={contact_person_error}
                            />
                          )}
                        />
                      
                    </div>

                    {/* Contact */}
                    <div className="col-lg-4 col-md-6  mt-3">
                      <label htmlFor="contact_person">
                        Contact Person Contact No
                      </label>
                      
                        <TextField
                          type="text"
                          id="cp_contact_no"
                          name="cp_contact_no"
                          className="form-control mt-1 "
                          onChange={inputEvent}
                         
                          error={(cp_contact_error) ? true : false}
                          helperText={cp_contact_error}
                        />
                     
                    </div>

                    {/* vehicle Used*/}
                    <div className="col-lg-4 mt-3">
                      <label htmlFor="vehicle_used">Vehicle Used</label>
                     
                        <Autocomplete
                          freeSolo
                          inputValue={vehicle_used}
                          disableClearable
                          options={searchArray.vehicle_used.map((data) => data)}
                         
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
                              error={(vehicle_used_error) ? true : false}
                              helperText={vehicle_used_error}
                            />
                          )}
                        />
                     
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
