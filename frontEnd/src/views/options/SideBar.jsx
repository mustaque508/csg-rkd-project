/************************************ SideBar component  ************************************************/


import
{
    React,useState,Link,Collapse,List,ListItem,ListItemIcon,ListItemText,ExpandLess,ExpandMore,AddIcon,
    VisibilityIcon,DeleteIcon,logo

} from '../Import'


const SideBar = () => {

    const [open, setOpen] = useState({
        request:false,
        distribute:false,
        purchase:false
    });


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
                                    <ListItem button>
                                        <ListItemIcon>
                                            <VisibilityIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="View requests" />
                                    </ListItem>

                                    {/* delete or Edit Requests */}
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DeleteIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Delete request" />
                                    </ListItem>

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
                                    <ListItem button>
                                        <ListItemIcon>
                                            <VisibilityIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="View purchases" />
                                    </ListItem>

                                    {/* delete or Edit purchase */}
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DeleteIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Delete purchase" />
                                    </ListItem>

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
                                    <ListItem button>
                                        <ListItemIcon>
                                            <VisibilityIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="View distributes" />
                                    </ListItem>

                                    {/* delete or Edit distribute */}
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DeleteIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Delete distribute" />
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
