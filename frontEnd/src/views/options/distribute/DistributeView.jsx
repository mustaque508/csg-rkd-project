/********************************** Distribute View ************************************************/

import {React,useState,axios,toast,useEffect,MaterialTable,useCallback} from '../../Import'

function DistributeView() {
    const [distribute_details,setDistribute_details]=useState([]);


    //get all distribute details
    const fetch_distribute_details=useCallback(
        () => {
            try
            {
                 axios.get('get_all_distribute_details')
                .then((res)=>{
                    if(res.data.result)
                    {
                        setDistribute_details(res.data.result);
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
                toast.error(error,{autoClose: false});
            }
        },
        [],
    )

    useEffect(() => {

        fetch_distribute_details();  
        
    }, [fetch_distribute_details])


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
            field:'NGO'
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
            field:'cp_phone'
        },
        {
            title:'Mohalla/Masjid jamat ', 
            field:'mohalla_masjid_jamat'
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

  
    return (

        
        <section className="view-section  mt-5 mb-5">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Distribution Details</h3>
                    <hr />
                    <MaterialTable
                        data={distribute_details}
                        columns={columns}
                        options={{
                            headerStyle: {
                                backgroundColor: '#DEF3FA',
                                color: 'Black',
                                whiteSpace: 'nowrap'
                            },
                            showTitle:false
                            // exportButton: true
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

export default DistributeView
