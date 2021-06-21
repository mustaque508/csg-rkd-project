/******************************************* View all details of requester ************************************/

import {React,useEffect,axios,toast,MaterialTable,useState} from '../../Import'

const RequestView = () => {

    const [requester_details,setRequester_details]=useState([]);

   

    useEffect(() => {

      const source = axios.CancelToken.source();

        //get all requster details
       const   fetch_requester_details = async() =>{

        try
        {
            await axios.get('get_all_request_details',{cancelToken: source.token})
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

      fetch_requester_details();

      return () => {
        source.cancel('Operation canceled by the user.');
      }
    }, [])


    //material-table coloumns
    const columns = [
      {
        title: "Sr No",
        field: "id",
      },
      {
        title: "Name",
        field: "full_name",
      },
      {
        title: "Contact no",
        field: "contact_no",
      },
      {
        title: "Aadhar/Ration card no",
        field: "aadhar_rationcard_no",
      },
      {
        title: "Card type",
        field: "APL_BPL",
      },
      {
        title: "Number of dependents",
        field: "no_of_dependents",
      },
      {
        title: "Number of children below 15 years age",
        field: "no_of_children_below_15years_age",
      },
      {
        title: "Occupation",
        field: "occupation",
      },
      {
        title: "Address",
        field: "address",
      },
      {
        title: "Area/Location",
        field: "area_location",
      },
      {
        title: "Contact person", 
        field: "contact_person" 
      },
      { 
          title: "Contact person contact no", 
          field: "cp_phone" 
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
      },
    ];

  
    return (
      <section className="view-section  mt-5 mb-5">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Requester Details</h3>
            <hr />
            <MaterialTable
              title=""
              data={requester_details}
              columns={columns}
              options={{
                headerStyle: {
                  backgroundColor: "#DEF3FA",
                  color: "black",
                  whiteSpace: "nowrap",
                },
                exportButton: true,
              }}
            />
          </div>
        </div>
      </section>
    );
}

export default RequestView
