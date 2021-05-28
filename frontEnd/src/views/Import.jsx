 /****************************** This file contain all dependencies ***************************/

import 'bootstrap/dist/css/bootstrap.min.css'
import '../dist/css/RequestForm.css'
import App from './App'
import React,{ useState,useEffect,useCallback} from 'react'
import ReactDOM from 'react-dom'
import { Link,BrowserRouter,Redirect } from 'react-router-dom'
import HomePage from '../views/HomePage'
import { Route, Switch } from 'react-router'
import Router from '../config/Router'
import RequestForm from './RequestForm'
import TextField from '@material-ui/core/TextField'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import {util} from 'intl-tel-input/build/js/utils'
import { plugin_for_contact} from '../dist/plugins/countrycode'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles"
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()

// color theme for button [login and submit button]
const colortheme = createMuiTheme({
    palette: {
      primary: { main: "#0275d8", contrastText: "#fff" }
    }
  });

export
{
 App,React,ReactDOM,Link,BrowserRouter,Redirect,HomePage,Route,Switch,Router,RequestForm,TextField,intlTelInput,util,useEffect,
 plugin_for_contact,Select,MenuItem,Button,MuiThemeProvider,colortheme,useState,axios,toast,useCallback,Autocomplete
}