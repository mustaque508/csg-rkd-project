/************************ Purchase View ***********************************/

import {React,useState,useCallback,axios,toast,useEffect,MaterialTable} from '../../Import'

const PurchaseView = () => {
    const [purchase_details,setPurchase_details]=useState([]);

    //get all purchase details
    const fetch_purchase_details =useCallback(
        ()=>{
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

        },[]
    );

    useEffect(() => {

        //get all purchase details
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

        
        <section className="request-view-section mt-5 mb-5">
            <div className="container">
                <div className="row">
                    <MaterialTable  
                        title="Purchase Details"
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
