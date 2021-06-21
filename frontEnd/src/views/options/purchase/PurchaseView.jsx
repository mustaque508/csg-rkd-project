/************************ Purchase View ***********************************/

import {React,useState,axios,toast,useEffect,MaterialTable} from '../../Import'

const PurchaseView = () => {
    const [purchase_details,setPurchase_details]=useState([]);

 

    useEffect(() => {

        const source = axios.CancelToken.source();

        //get all purchase details
        const fetch_purchase_details = async () =>{
            try
            {
               await axios.get('get_all_purchase_details',{cancelToken: source.token})
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
                if (axios.isCancel(error)) {
                } else {
                    throw error
                }
            }
        };

        fetch_purchase_details();

        return () => {
            source.cancel('Operation canceled by the user.');
          }
    }, [])


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
            title:'Quantity(kg)', 
            field:'qty'
        },
        {
            title:'Rate(Rs)', 
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
                        title=""
                        data={purchase_details}
                        columns={columns}
                        options={{
                            headerStyle: {
                                backgroundColor: '#DEF3FA',
                                color: 'Black',
                                whiteSpace: 'nowrap'
                            },
                            exportButton: true
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

export default PurchaseView
