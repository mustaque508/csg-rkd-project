/************************************ SideBar component  ************************************************/


import
{
    React,useState,Link,Collapse,List,ListItem,ListItemIcon,ListItemText,ExpandLess,ExpandMore,AddIcon,
    VisibilityIcon,EditIcon,logo,useHistory,toast,Cookies,HomeIcon,ExitToAppIcon,useEffect,axios

} from '../../Import'




const SideBar = () => {
   
    const [open, setOpen] = useState({
        request:false,
        distribute:false,
        purchase:false,
        other:false
    });

    const[modules,setModules]=useState({
        Requests:{
            read:0,
            write:0,
            delete:0
        },
        Purchases:{
            read:0,
            write:0,
            delete:0  
        },
        Distribute:{
            read:0,
            write:0,
            delete:0
        }
    });


    const {Requests,Purchases,Distribute}=modules;

    const history=useHistory();


    //logout
    const logout = ()=>{

        //clear cookies
        Cookies.remove('email_cookie');
        Cookies.remove('password_cookie');
        Cookies.remove('rememberme_cookie');

        //clear session
        sessionStorage.clear();

        //redirect home
        toast.success(`You have successfully logged out !!`);
        history.push('/');
    }

    useEffect(() => {
        
        const source = axios.CancelToken.source();


         //get role details based on role_id
        const fetch_role_details =async () =>{
            try
            {
                await axios.post('/get_role_detials',{role_id:sessionStorage.getItem("role_id")},{cancelToken: source.token})
                .then((res)=>{
                    if(res.data.result)
                    {
    
                        // set rights to user
                       for (const key in modules) {
                        res.data.result.forEach(element => {
                           if(key === element.module)
                           {
                              
                              setModules((prevState)=>{
                                  return{
                                    ...prevState,
                                    [key]:{
                                        read:parseInt(element.read),
                                        write:parseInt(element.write),
                                        delete:parseInt(element.delete)
                                    }
                                  } 
                              })
                            
                           }
                        });
                       }
    
                     
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
     
        fetch_role_details();
   


        return () => {
            source.cancel('Operation canceled by the user.');
        }

    }, [modules])

   


    return (
            <section className="sidebar-section">
                <div className="card border-0 ">
                    <div className="card-body p-0">
                    
                        {/* heading */}
                        <h5 className="card-title text-uppercase d-flex flex-column align-items-center  ">
                            <img src={logo} alt="logo.png" className="img-fluid"/>  
                        </h5>
                        
                        {/* menu */}
                        <List component="nav"  aria-labelledby="nested-list-subheader">

                            {/* request submenu */}
                            <ListItem button onClick={()=>{setOpen({request: !open.request})}}> 
                               <ListItemText primary="Request"/>
                               {open.request ? <ExpandLess/> :<ExpandMore/> }
                            </ListItem>
                            <Collapse in={open.request} timeout="auto" unmountOnExit >
                                <List component="div" disablePadding >

                                 {/* Add request */}
                                  
                                  {
                                     
                                      (Requests.write) ? 
                                        <Link to="/request" className="text-decoration-none text-dark">
                                            <ListItem button >
                                                <ListItemIcon>
                                                    <AddIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Request Form"/>
                                            </ListItem>
                                        </Link>
                                      :null

                                  }
                                   
                                  

                                {/* view Requests */}

                                  {
                                      (Requests.read) ?
                                        <Link to="/request-view" className="text-decoration-none text-dark">
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <VisibilityIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="View requests" />
                                            </ListItem>
                                        </Link>
                                      :null

                                  }
                                    

                                {/* delete or Edit Requests */}

                                  {
                                        (Requests.delete) ? 
                                            <Link to="/request-edit-delete" className="text-decoration-none text-dark">
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <EditIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Edit/Delete request" />
                                                </ListItem>
                                            </Link>
                                        :null

                                  }
                                   

                                </List>
                            </Collapse>


                            {/* purchase submenu */}
                            <ListItem button onClick={()=>setOpen({purchase: !open.purchase})} > 
                               <ListItemText primary="Purchase"/>
                               {open.purchase ? <ExpandLess/> :<ExpandMore/> }
                            </ListItem>
                            <Collapse in={open.purchase} timeout="auto" unmountOnExit >
                                <List component="div" disablePadding >

                                    {/* Add purchase */}

                                    {
                                        (Purchases.write) ? 
                                        <Link  to="/purchase" className="text-decoration-none text-dark">
                                            <ListItem button >
                                                <ListItemIcon>
                                                    <AddIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Purchase Form" />
                                            </ListItem>
                                        </Link>
                                        :null

                                        
                                    }
                                   
                                   

                                    {/* view purchase */}

                                    {
                                        (Purchases.read) ?
                                        <Link  to="/purchase-view" className="text-decoration-none text-dark">
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <VisibilityIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="View purchases" />
                                            </ListItem>
                                        </Link>
                                        :null
                                    }
                                   

                                    {/* delete or Edit purchase */}
                                    {
                                        (Purchases.delete) ?

                                        <Link to="/purchase-edit-delete" className="text-decoration-none text-dark">
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <EditIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Edit/Delete purchase" />
                                            </ListItem>
                                        </Link>
                                        :null

                                    }
                                   

                                </List>
                            </Collapse>


                            {/* distribute submenu */}
                            <ListItem button onClick={()=>setOpen({distribute: !open.distribute })} > 
                               <ListItemText primary="distribute"/>
                               {open.distribute ? <ExpandLess/> :<ExpandMore/> }
                            </ListItem>
                            <Collapse in={open.distribute} timeout="auto" unmountOnExit >
                                <List component="div" disablePadding >

                                    {/* Add distribute */}
                                    {
                                        (Distribute.write) ?
                                        <Link  to="/distribute" className="text-decoration-none text-dark">
                                            <ListItem button >
                                                <ListItemIcon>
                                                    <AddIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Distribute Form" />
                                            </ListItem>
                                        </Link>
                                        :null

                                    }
                                   
                                   

                                    {/* view distribute */}
                                    {
                                        (Distribute.read) ?
                                        <Link  to="/distribute-view" className="text-decoration-none text-dark">
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <VisibilityIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="View distributes" />
                                            </ListItem>
                                        </Link>
                                        :null

                                    }
                                   

                                    {/* delete or Edit distribute */}
                                    {
                                        (Distribute.delete) ?
                                        <Link to="/distribute-edit-delete" className="text-decoration-none text-dark">
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <EditIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Edit/Delete distribute" />
                                            </ListItem>
                                        </Link>
                                        :null

                                    }
                                    

                                </List>
                            </Collapse>


                            {/* other option menu */}
                            <ListItem button onClick={()=>{setOpen({other: !open.other})}}> 
                                <ListItemText primary="Other options"/>
                                {open.other ? <ExpandLess/> :<ExpandMore/> }
                            </ListItem>
                            <Collapse in={open.other} timeout="auto" unmountOnExit >
                                <List component="div" disablePadding >

                                    {/* homePage */}
                                    <Link to="/welcome" className="text-decoration-none text-dark">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <HomeIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Welcome page" />
                                        </ListItem>
                                    </Link>

                                    {/* Logout */} 
                                    <ListItem button onClick={logout}>
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            
                            
                          
                        </List>
                    </div>
                </div>
            </section>
    )
}

export default SideBar
