/*************************************** Purchase Edit Delete ****************************************************** */

import {React,useEffect,axios,toast,MaterialTable,useState,TextField,MuiThemeProvider,
    colortheme,Autocomplete,Button,Dialog,DialogTitle,DialogContent,useCallback
} from '../../Import'

const PurchaseEditDelete = () => {

    //purchase details
    const[purchase_details,setPurchasedetails]=useState([]);

    //dialog
    const [open, setOpen] =useState(false);

  

    //row index
    const[index,setIndex]=useState(0);

    //purchase_details
    const[Form_details,setForm_details]=useState({
        supplier:'',
        qty:'',
        rate:'',
        delivered_by:'',
        recieved_by:'',
        loaded_by:'',
        unloaded_by:'',
        vehicle_used:'',
        id:'',
        purchase_date:''

    })


    // error_fields
    const[errors,setErrors]=useState({
        delivered_by_error:'',
        loaded_by_error:'',
        qty_error:'',
        rate_error:'',
        recieved_by_error:'',
        supplier_error:'',
        unloaded_by_error:'',
        vehicle_used_error:''

    });

    // Destructing of objects
    const 
    {
        delivered_by_error,loaded_by_error,qty_error,rate_error,recieved_by_error,supplier_error,
        unloaded_by_error,vehicle_used_error
    }=errors;

    const{
        supplier,qty,rate,delivered_by,recieved_by,loaded_by,unloaded_by,vehicle_used
    }=Form_details;


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



     //used for removing duplicate entries
     const [sets]=useState({
        delivered_by:new Set(),
        loaded_by:new Set(),
        qty:new Set(),
        rate:new Set(),
        recieved_by:new Set(),
        supplier:new Set(),
        unloaded_by:new Set(),
        vehicle_used:new Set()

    });
  
    const [searchArray]=useState({
        delivered_by:[],
        loaded_by:[],
        qty:[],
        rate:[],
        recieved_by:[],
        supplier:[],
        unloaded_by:[],
        vehicle_used:[]
    });


  

   
    //get all purchase details
    const fetch_purchase_details =useCallback(
        () => {
            try
            {
                 axios.get('/get_all_purchase_details')
                .then((res)=>{
    
                    setPurchasedetails(res.data.result);
    
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

    //get distinct purchase details
    const fetch_distinct_purchase_details=useCallback(
        () => {
            try
            {
                 axios.get('/get_distinct_purchase_details')
                .then((res)=>{
                    
                    if(res.data.result)
                    {
                        
                        res.data.result.map((data,index)=>{
                            return(
                                sets.delivered_by.add(data.delivered_by),
                                sets.loaded_by.add(data.loaded_by),
                                sets.qty.add(data.qty),
                                sets.rate.add(data.rate),
                                sets.recieved_by.add(data.recieved_by),
                                sets.supplier.add(data.supplier),
                                sets.unloaded_by.add(data.unloaded_by),
                                sets.vehicle_used.add(data.vehicle_used)
                            )
                           
                        })
    
                     
                        //delivered_by
                        for (let item of  sets.delivered_by) {
                            searchArray.delivered_by.push(item);
                        }
    
                        //loaded_by
                        for (let item of  sets.loaded_by) {
                            searchArray.loaded_by.push(item);
                        }
    
                        //qty
                        for (let item of  sets.qty) {
                            searchArray.qty.push(item);
                        }
    
                        //rate
                        for (let item of  sets.rate) {
                            searchArray.rate.push(item);
                        }
    
                        //recieved_by
                        for (let item of  sets.recieved_by) {
                            searchArray.recieved_by.push(item);
                        }
    
                        //supplier
                        for (let item of  sets.supplier) {
                            searchArray.supplier.push(item);
                        }
    
                        //unloaded_by
                        for (let item of  sets.unloaded_by) {
                            searchArray.unloaded_by.push(item);
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
        fetch_purchase_details();
        fetch_distinct_purchase_details();
    }, [fetch_purchase_details,fetch_distinct_purchase_details]);


    //update data to form based on row click
    const handleRowUpdate = (rowData) =>{

        const{delivered_by,id,loaded_by,purchase_date,qty,rate,recieved_by,supplier,unloaded_by,vehicle_used}=rowData;

        setForm_details({delivered_by,id,loaded_by,purchase_date,qty,rate,recieved_by,supplier,unloaded_by,vehicle_used});

        //set index
        setIndex(rowData.tableData.id);
        setOpen(true);
    }

    //update record
    const updateRecord =(event)=>{
        event.preventDefault();


        axios.post('/update_purchase_details',Form_details)
        .then((res)=>{
          
            if(res.data.errors)
            {
                const 
                {
                    delivered_by_error,loaded_by_error,qty_error,rate_error,recieved_by_error,supplier_error,
                    unloaded_by_error,vehicle_used_error
                }=res.data.errors;
              
                setErrors({
                    delivered_by_error,loaded_by_error,qty_error,rate_error,recieved_by_error,supplier_error,
                    unloaded_by_error,vehicle_used_error
                });
               
            }
            else if(res.data.success)
            {
               const dataUpdate=[...purchase_details];
               dataUpdate[index]=Form_details;
               setPurchasedetails([...dataUpdate]);
            //    toast.success('your record updated successfully');

              searchArray.delivered_by=[];
              searchArray.loaded_by=[];
              searchArray.qty=[];
              searchArray.rate=[];
              searchArray.recieved_by=[];
              searchArray.supplier=[];
              searchArray.unloaded_by=[];
              searchArray.vehicle_used=[];

              fetch_distinct_purchase_details();

               setOpen(false);
            }
        })
        
    }

    //delete record
    const handleRowDelete = (Data,resolve)=>{

        axios.post('delete_purchase_details',{id:Data.id})
        .then((res)=>{

            if(res.data.success)
            {
                //update table
                const updatedRows=[...purchase_details];
                const index=Data.tableData.id;
                updatedRows.splice(index,1);
                setTimeout(()=>{
                    setPurchasedetails(updatedRows);
                    resolve();
                },2000)

            }
            else if(res.data.error)
            {
                toast.error(res.data.error,{autoClose: false});
            }
        })

    }
    // material_table coloumns
    const columns =[
        {
            title:'Sr No',
            field:'id'
        },
        {
            title:'Supplier', 
            field:'supplier'
        },
        {
            title:'Quantity', 
            field:'qty'
        },
        {
            title:'Rate', 
            field:'rate'
        },
        {
            title:'Delivered by', 
            field:'delivered_by'
        },
        {
            title:'Recieved by', 
            field:'recieved_by'
        },
        {
            title:'Loaded by', 
            field:'loaded_by'
        },
        {
            title:'Unloaded by', 
            field:'unloaded_by'
        },
        {
            title:'Vehicle used', 
            field:'vehicle_used'
        },
        {
            title:'Purchase date', 
            field:'purchase_date',
            type: "date",
            dateSetting: { locale: "en-GB" }
        }
    ];
    
    return (
      <>
        {/* dialog-section */}
        <section className="purchase-dialog-section">
          <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <div className="container">
                <div className="row">
                  <form
                    onSubmit={updateRecord}
                    method="POST"
                    className="form-group"
                    id="submit"
                    autoComplete="off"
                  >
                    {/* purchase Details */}
                    <MuiThemeProvider theme={colortheme}>
                      {/* title */}
                      <DialogTitle
                        id="form-dialog-title"
                        className="text-center"
                      >
                        Edit Purchase Details
                      </DialogTitle>

                      <div className="row">
                        {/* Supplier */}
                        <div>
                          <label htmlFor="supplier">Supplier</label>

                          <Autocomplete
                            freeSolo
                            inputValue={supplier}
                            disableClearable
                            options={searchArray.supplier.map((data) => data)}
                            
                            onChange={(event, value) => {
                              setForm_details((prevValue) => {
                                return {
                                  ...prevValue,
                                  supplier: value,
                                };
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                type="text"
                                name="supplier"
                                id="supplier"
                                onChange={inputEvent}
                                className="form-control"
                                InputProps={{
                                  ...params.InputProps,
                                  type: "search",
                                }}
                                error={supplier_error ? true : false}
                                helperText={supplier_error}
                              />
                            )}
                          />
                        </div>

                        {/* quantity */}
                        <div className="mt-3">
                          <label htmlFor="qty">Quantity </label>
                         
                            <TextField
                              type="number"
                              name="qty"
                              id="qty"
                              inputProps={{ min: "0", step: "1" }}
                              onWheelCapture={(e)=>e.target.blur()}
                              onChange={inputEvent}
                              className="form-control"
                              
                              value={qty}
                              error={(qty_error) ? true : false}

                            />
                         
                        </div>

                        {/* Rate */}
                        <div className="mt-3">
                          <label htmlFor="rate">Rate </label>
                        
                            <TextField
                              type="number"
                              name="rate"
                              id="rate"
                              inputProps={{ min: "0", step: "1" }}
                              onChange={inputEvent}
                              className="form-control"
                              onWheelCapture={(e)=>e.target.blur()}
                              value={rate}
                              error={(rate_error) ? true : false}
                              helperText={rate_error}
                            />
                         
                        </div>

                        {/* Delivered By */}
                        <div className="mt-3">
                          <label htmlFor="delivered_by">Delivered By</label>
                          
                            <Autocomplete
                              freeSolo
                              inputValue={delivered_by}
                              disableClearable
                              options={searchArray.delivered_by.map(
                                (data) => data
                              )}
                              
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
                                  return {
                                    ...prevValue,
                                    delivered_by: value,
                                  };
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  name="delivered_by"
                                  id="delivered_by"
                                  onChange={inputEvent}
                                  className="form-control"
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(delivered_by_error) ? true : false}
                                  helperText={delivered_by_error}
                                />
                              )}
                            />
                         
                        </div>

                        {/* Recieved By */}
                        <div className="mt-3">
                          <label htmlFor="recieved_by">Recieved By</label>
                         
                            <Autocomplete
                              freeSolo
                              inputValue={recieved_by}
                              disableClearable
                              options={searchArray.recieved_by.map(
                                (data) => data
                              )}
                              
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
                                  return {
                                    ...prevValue,
                                    recieved_by: value,
                                  };
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  name="recieved_by"
                                  id="recieved_by"
                                  onChange={inputEvent}
                                  className="form-control"
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(recieved_by_error) ? true : false}
                                  helperText={recieved_by_error}
                                />
                              )}
                            />
                         
                        </div>

                        {/* Loaded By */}
                        <div className="mt-3">
                          <label htmlFor="loaded_by">Loaded By</label>
                          
                            <Autocomplete
                              freeSolo
                              inputValue={loaded_by}
                              disableClearable
                              options={searchArray.loaded_by.map(
                                (data) => data
                              )}
                              
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
                                  return {
                                    ...prevValue,
                                    loaded_by: value,
                                  };
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  name="loaded_by"
                                  id="loaded_by"
                                  onChange={inputEvent}
                                  className="form-control"
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(loaded_by_error) ? true : false}
                                  helperText={loaded_by_error}
                                />
                              )}
                            />
                         
                        </div>

                        {/* Unloaded By */}
                        <div className="mt-3">
                          <label htmlFor="unloaded_by">Unloaded By</label>
                         
                            <Autocomplete
                              freeSolo
                              inputValue={unloaded_by}
                              disableClearable
                              options={searchArray.unloaded_by.map(
                                (data) => data
                              )}
                              
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
                                  return {
                                    ...prevValue,
                                    unloaded_by: value,
                                  };
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  name="unloaded_by"
                                  id="unloaded_by"
                                  onChange={inputEvent}
                                  className="form-control"
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                  error={(unloaded_by_error) ? true : false}
                                  helperText={unloaded_by_error}
                                />
                              )}
                            />
                        
                        </div>

                        {/* Vehicle Used */}
                        <div className="mt-3">
                          <label htmlFor="vehicle_used">Vehicle Used</label>
                         
                            <Autocomplete
                              freeSolo
                              inputValue={vehicle_used}
                              disableClearable
                              options={searchArray.vehicle_used.map(
                                (data) => data
                              )}
                              
                              onChange={(event, value) => {
                                setForm_details((prevValue) => {
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
        <section className="view-section mt-5 mb-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Purchase Details</h3>
              <hr />
              <MaterialTable
                data={purchase_details}
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
                  showTitle: false,
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

export default PurchaseEditDelete
