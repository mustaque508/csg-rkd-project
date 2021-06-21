/************************************************** RegisterForm  ******************************************************/

import 
{
    React,TextField,MuiThemeProvider,colortheme,Button,Popover,OverlayTrigger,InfoSharpIcon,useState,plugin_for_contact,
    useEffect,axios,BootstrapTooltip,toast,useHistory
} from '../Import'



const RegisterForm = () => {

    const history=useHistory();

    // get input fields
    const [register_details, setregister_details] = useState({
        'uname':'',
        'contact':'',
        'email_id':'',
        'password':'',
        'cpassword':''
    
    });
    
    // error_fields
    const[errors,setErrors]=useState({
        'name_error':'',
        'phone_error':'',
        'email_error':'',
        'pass_error':'',
        'cpass_error':''
    });

    //  Destructing of objects
    const {name_error,phone_error,email_error,pass_error,cpass_error}=errors;

    // show tooltip 
    const [open, setOpen] = useState(false);

    // display country_code based on country in phone input_field 
    useEffect(() => {
    plugin_for_contact(document.querySelector("#contact"));
    },[]);


    //validate contact_number based on countrycode
    const validate_contact = () =>
    {
        return plugin_for_contact(document.querySelector("#contact"));

    }

    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        const{name,value}=event.target;
        setregister_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
    }

    //Hide Tooltip
    const hideToolTip =() =>{
        setOpen(false);
    }

    // popover for password rules
    const popover = (
        <Popover id="popover-basic">
        <Popover.Title as="h1">The password must include</Popover.Title>
        <Popover.Content>
                <ul className="list-unstyled">
                    <li>length should be minimum 8 characters.</li>
                    <li>atleast one numeric character.</li>
                    <li>atleast one Alphabetic letter.</li>
                    <li>atleast one capital letter.</li>
                    <li>one special character.</li>
                    <li>should not contain white space.</li>
                </ul>
        </Popover.Content>
        </Popover>
    );

    const submit = (event) =>{
        event.preventDefault();
        const intlTelInput_error=validate_contact();
       
        //send data
        axios.post('/store_register_details',{register_details,intlTelInput_error})
        .then((res)=>{

              if(res.data.errors)
              {
                const {name_error,phone_error,email_error,serial_key_error,pass_error,cpass_error}=res.data.errors;
                setErrors({
                    name_error,phone_error,email_error,serial_key_error,pass_error,cpass_error
                });
                setOpen(true);
               }

               if(res.data.success)
               {
                   setregister_details({
                        'uname':'',
                        'contact':'',
                        'email_id':'',
                        'password':'',
                        'cpassword':''
                   });
                   event.target.reset();
                   history.push({
                       pathname:'/'
                   });
                   toast.success(res.data.success);
                   
               }
               else if(res.data.error)
               {
                   toast.error(res.data.error,{autoClose: false});
               }
               
        })
    }





    return (
       <section className="register-section">
           <div className="card border-0">
               <div className="card-body">

                   {/* card-title */}
                   <h2 className="card-title text-capitalize text-center">sign up</h2>

                   {/* content */}
                   <form onSubmit={submit} method="POST" className="form-group mt-4" id="submit" autoComplete="off">

                        {/* Full Name */}
                        <label htmlFor="uname">Full Name</label>
                        <BootstrapTooltip title={name_error} placement="right-end" open={open}>
                            <TextField className="form-control" type="text" name="uname" id="uname" onChange={inputEvent} onKeyUp={hideToolTip} />
                        </BootstrapTooltip>

                        {/* Contact */}
                        <label htmlFor="contact" className="mt-3">Contact</label>
                        <BootstrapTooltip title={phone_error} placement="right-end" open={open}>
                            <TextField  className="form-control"  type="text" name="contact" id="contact" onChange={inputEvent} onKeyUp={hideToolTip} />
                        </BootstrapTooltip>

                        {/* Email Address */}
                        <label htmlFor="email_id" className="mt-3" >Email Address</label>
                        <BootstrapTooltip title={email_error} placement="right-end" open={open}>
                            <TextField className="form-control"  type="email" name="email_id" id="email_id" onChange={inputEvent} onKeyUp={hideToolTip} />
                        </BootstrapTooltip>

                        {/* Password */}
                        <label htmlFor="password" className="mt-3" >Password</label>
                        <BootstrapTooltip title={pass_error} placement="right-end" open={open}>
                            <TextField className="form-control mt-0"  type="password" name="password" id="password" onChange={inputEvent} onKeyUp={hideToolTip}  />
                        </BootstrapTooltip>

                        {/* Confirm  Password */}
                        <label htmlFor="password" className="mt-3">Confirm Password</label>
                        <BootstrapTooltip title={cpass_error} placement="right-end" open={open}>
                            <TextField className="form-control" type="password" name="cpassword" id="cpassword" onChange={inputEvent} onKeyUp={hideToolTip}  />
                        </BootstrapTooltip>

                        {/* display password rules */}
                        <OverlayTrigger trigger={['hover','focus']}  placement="left" overlay={popover}>
                        <InfoSharpIcon  className="position-absolute text-primary" style={{'right':'1rem','cursor':'pointer','marginTop':'-4.1rem'}} id="info"/>
                        </OverlayTrigger>

                        {/* submit button */}
                        <MuiThemeProvider theme={colortheme}>
                            <Button  type="submit" variant="contained" color="primary" className="mt-4">submit</Button>  
                        </MuiThemeProvider>

                   </form>

               </div>
           </div>
       </section>
    )
}

export default RegisterForm
