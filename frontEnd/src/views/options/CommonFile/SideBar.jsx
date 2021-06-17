/************************************ SideBar component  ************************************************/


import
{
    React,useState,Link,Collapse,List,ListItem,ListItemIcon,ListItemText,ExpandLess,ExpandMore,AddIcon,
    VisibilityIcon,EditIcon,logo,useHistory,toast,Cookies,HomeIcon,ExitToAppIcon

} from '../../Import'




const SideBar = () => {
   
    const [open, setOpen] = useState({
        request:false,
        distribute:false,
        purchase:false,
        other:false
    });

    const history=useHistory();


    //logout
    const logout = ()=>{

        //clear cookies
        Cookies.remove('email_cookie');
        Cookies.remove('password_cookie');
        Cookies.remove('rememberme_cookie');

        //redirect home
        toast.success(`You have successfully logged out !!`);
        history.push('/');
    }


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
                                    <Link to="/request" className="text-decoration-none text-dark">
                                        <ListItem button >
                                            <ListItemIcon>
                                                <AddIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Request Form" />
                                        </ListItem>
                                    </Link>
                                  

                                    {/* view Requests */}
                                    <Link to="/request-view" className="text-decoration-none text-dark">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <VisibilityIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="View requests" />
                                        </ListItem>
                                    </Link>

                                    {/* delete or Edit Requests */}
                                    <Link to="/request-edit-delete" className="text-decoration-none text-dark">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <EditIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Edit/Delete request" />
                                        </ListItem>
                                    </Link>

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
                                    <Link  to="/purchase" className="text-decoration-none text-dark">
                                        <ListItem button >
                                            <ListItemIcon>
                                                <AddIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Purchase Form" />
                                        </ListItem>
                                    </Link>
                                   

                                    {/* view purchase */}
                                    <Link  to="/purchase-view" className="text-decoration-none text-dark">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <VisibilityIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="View purchases" />
                                        </ListItem>
                                    </Link>

                                    {/* delete or Edit purchase */}
                                    <Link to="/purchase-edit-delete" className="text-decoration-none text-dark">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <EditIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Edit/Delete purchase" />
                                        </ListItem>
                                    </Link>

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
                                    <Link  to="/distribute" className="text-decoration-none text-dark">
                                        <ListItem button >
                                            <ListItemIcon>
                                                <AddIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Distribute Form" />
                                        </ListItem>
                                    </Link>
                                   

                                    {/* view distribute */}
                                    <Link  to="/distribute-view" className="text-decoration-none text-dark">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <VisibilityIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="View distributes" />
                                        </ListItem>
                                    </Link>

                                    {/* delete or Edit distribute */}
                                    <Link to="/distribute-edit-delete" className="text-decoration-none text-dark">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <EditIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Edit/Delete distribute" />
                                        </ListItem>
                                    </Link>

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
