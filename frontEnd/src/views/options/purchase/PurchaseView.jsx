/************************ Purchase View ***********************************/

import {React,useState,axios,toast,useEffect,MaterialTable,useCallback} from '../../Import'

const PurchaseView = () => {

    const [purchase_details,setPurchase_details]=useState([]);

 
    //get all purchase details
    const fetch_purchase_details=useCallback(
        () => {
            try
            {
                axios.get('get_all_purchase_details')
                .then((res)=>{
                    if(res.data.result)
                    {
                        setPurchase_details(res.data.result);
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
        fetch_purchase_details();
    }, [fetch_purchase_details])


    //material-table coloumns
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

        
        <section className="view-section  mt-5 mb-5">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Purchase Details</h3>
                    <hr />

                    <MaterialTable
                        data={purchase_details}
                        columns={columns}
                        options={{
                            headerStyle: {
                                backgroundColor: '#DEF3FA',
                                color: 'Black',
                                whiteSpace: 'nowrap'
                            },
                            showTitle:false,
                            // exportButton: true
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

export default PurchaseView
