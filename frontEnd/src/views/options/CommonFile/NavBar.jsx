/************************************ NavBar component  ************************************************/

import 
{
    React,AppBar,Toolbar,IconButton,MenuIcon,Typography,useStyles,AccountCircle,Drawer,useState,SideBar
} from '../../Import'





const NavBar = (props) => {

    const classes = useStyles();

    const[open,setOpen]=useState(false);

    const toggleDrawer = (open)=>(event)=>{
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }

        setOpen(open);
    }


    return (

        <section className="navbar-section">

                {/* navigation Bar */}
                <div className={classes.root}>
                    <AppBar position="fixed" className="bg-primary">
                        <Toolbar>

                            {/* Hamburger button */}
                            <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer(true)} >
                                <MenuIcon/>
                            </IconButton>

                            {/* side-bar */}
                            <Drawer anchor="left" open={open} classes={{paper: classes.drawerPaper}} onClose={toggleDrawer(false)} >
                                <SideBar/>
                            </Drawer>

                            {/* heading */}
                            <Typography variant="subtitle1" className={classes.title}>
                               covid support group
                            </Typography>

                            {/* login icon */}
                            <IconButton color="inherit">
                                <AccountCircle />
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                </div>
        </section>
    )
}

export default NavBar
