/****************************** This file contain all dependencies ***************************/

import 
{
  TextField,Select,MenuItem,Button,createMuiTheme,MuiThemeProvider,makeStyles,Tooltip,
  Checkbox,FormControlLabel,AppBar,IconButton,Toolbar,Typography,Drawer,Collapse, List, ListItem,
  ListItemIcon, ListItemText
} 
from '@material-ui/core'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../dist/css/RequestForm.css'
import App from './App'
import React,{ useState,useEffect,useCallback} from 'react'
import ReactDOM from 'react-dom'
import { Link,BrowserRouter,Redirect } from 'react-router-dom'
import HomePage from './options/HomePage'
import { Route, Switch } from 'react-router'
import Router from '../config/Router'
import RequestForm from './options/request/RequestForm'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import {util} from 'intl-tel-input/build/js/utils'
import { plugin_for_contact} from '../dist/plugins/countrycode'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {Navbar,Container,Nav} from 'react-bootstrap'
import PurchaseForm from './options/purchase/PurchaseForm'
import validator from 'validator'
import $ from 'jquery'
import Distribute from './options/distribute/Distribute'
import Main from './Main'
import Stayhome from '../dist/img/stayhome.png'
import RegisterForm from '../views/Register/RegisterForm'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import InfoSharpIcon from '@material-ui/icons/InfoSharp'
import LoginForm from './login/LoginForm'
import { useLocation,useHistory} from 'react-router'
import Cookies from 'js-cookie'
import Welcome from './options/Welcome'
import SideBar from './options/SideBar'
import NavBar from './options/NavBar'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {Accordion} from 'react-bootstrap'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'
import logo from '../dist/img/logo.png'
import FormUserDetails from './options/request/FormUserDetails'


toast.configure()

//navbar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: 240,
  }
}));

// color theme for button [login and submit button]
const colortheme = createMuiTheme({
    palette: {
      primary: { main: "#0275d8", contrastText: "#fff" }
    }
  });

 //bootstrap 
 const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color:"red"
  },
  tooltip: {
    backgroundColor:"red",
    fontSize: "0.8rem"
  }
}));



function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} disableFocusListener disableHoverListener disableTouchListener />;
}

export
{
 App,React,ReactDOM,Link,BrowserRouter,Redirect,HomePage,Route,Switch,Router,RequestForm,TextField,intlTelInput,util,useEffect,
 plugin_for_contact,Select,MenuItem,Button,MuiThemeProvider,colortheme,useState,axios,toast,useCallback,Autocomplete,
 Navbar,Container,Nav,PurchaseForm,validator,BootstrapTooltip,$,Distribute,Main,Stayhome,RegisterForm,Popover,OverlayTrigger,
 InfoSharpIcon,LoginForm,useLocation,useHistory,Checkbox,FormControlLabel,Cookies,Welcome,SideBar,NavBar,AppBar,IconButton,
 MenuIcon,Toolbar,Typography,useStyles,AccountCircle,Drawer,Accordion,Collapse,List,ListItem,ListItemIcon,ListItemText,ExpandLess,
 ExpandMore,AddIcon,VisibilityIcon,DeleteIcon,logo,FormUserDetails
}