/******************************************* View all details of requester ************************************/


import {React,useEffect,axios,toast,MaterialTable,useState,MuiThemeProvider,colortheme,Button} from '../../Import'

const RequestView = () => {

    const [requester_details,setRequester_details]=useState([]);


    //selected record
    const[selected_record,setSelected_record]=useState([]);
    

     //get all requster details
     const  fetch_requester_details = async() =>{

    
      try
      {
          await axios.get('get_all_request_details')
          .then((res)=>{
              if(res.data.result)
              {
                  setRequester_details(res.data.result);
                  console.log(res.data.result);
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
        if (axios.isCancel(error)) {
        } else {
            throw error
        }
      }

    }



    useEffect(() => {
      fetch_requester_details();
    }, [])


    //material-table coloumns
    const columns = [
      {
        title: "Sr No",
        field: "id",
        filtering:false
      },
       {
        title: "Delivery Date",
        field: "delivery_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        filtering:false
      },
      {
        title: "Delivery status", 
        field:"delivery_status",
        cellStyle:(e,rowData)=>{
          return (rowData.delivery_status === "delivered") ? {color:"green"} : {color:"red"}
        }
      },
      {
        title: "Full Name",
        field: "full_name",
        filtering:false
      },
      {
        title: "Contact number",
        field: "contact_no",
        filtering:false
      },
      {
        title: "Aadhar Card no",
        field: "aadhar_card_no",
        filtering:false
      },
      {
        title: "Ration Card no",
        field: "ration_card_no",
        filtering:false
      },
      {
        title: "Card type",
        field: "APL_BPL",
        filtering:false
      },
      {
        title: "Number of dependents",
        field: "no_of_dependents",
        filtering:false
      },
      {
        title: "Number of children below 15 years age",
        field: "no_of_children_below_15years_age",
        filtering:false
      },
      {
        title: "Occupation",
        field: "occupation",
        filtering:false
      },
      {
        title: "Religion",
        field: "religion",
        filtering:false
      },
      {
        title: "Address",
        field: "address",
        filtering:false
      },
      {
        title: "Area/Location",
        field: "area_location"
      },
      {
        title: "Contact person", 
        field: "contact_person" ,
        filtering:false
      },
      { 
          title: "Contact person contact no", 
          field: "cp_phone",
          filtering:false
      },
      { 
        title: "NGO", 
        field: "NGO"
      },
      { 
          title: "Mohalla/Masjid jamat", 
          field: "mohalla_masjid_jamat" 
      },
      {
        title: "Created Date",
        field: "created_date",
        type: "date",
        dateSetting: { locale: "en-GB" },
        filtering:false
      }
    ];
 


    //update selected record
    const updateSelectedRecord = (event) =>{
      event.preventDefault();

      if(selected_record.length === 0){
          alert("please select row");
      }

      axios.post('/update_selected',selected_record)
      .then((res)=>{
            
            if(res.data.success)
            {
              //fetch requester_details
               fetch_requester_details();

              //reset selected record
               setSelected_record([]);
            }
            else if(res.data.error)
            {
                toast.error(res.data.error,{autoClose: false});
            }

      }).catch((err)=>{
        toast.error(`getting error when updating selected row : ${err}`);
      })
    }

  
    return (
      <section className="view-section  mt-5 mb-5">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Requester Details</h3>
            <hr />
            <MuiThemeProvider theme={colortheme}>
              <MaterialTable
                data={requester_details}
                columns={columns}
                options={{
                  headerStyle: {
                    backgroundColor: "#DEF3FA",
                    color: "black",
                    whiteSpace: "nowrap",
                  },
                  filtering:true,
                  selection: true,
                  showSelectAllCheckbox:false,
                  showTitle:false,
                  selectionProps:rowData =>({
                   disabled:rowData.delivery_date === null
                  }) 
                }}
                onSelectionChange={(rowData)=>{setSelected_record(rowData)}}
              />
              <Button
                  type="button"
                  onClick={updateSelectedRecord}
                  variant="contained"
                  color="primary"
                  className="mt-4"
              >
               save
              </Button>
            </MuiThemeProvider>
          </div>
        </div>
      </section>
    );
}

export default RequestView
