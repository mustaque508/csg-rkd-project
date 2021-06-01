/***************** Common validation ********************************/
const validator = require('validator');

//validation for[req_name,occupation,contact_person,jamat_name]
exports.validate_name = (props) =>{


    //check field is empty string ?
    if(validator.isEmpty(props))
    {
        return "required";
    }

    // check field  sholud be atleast 3 characters in length
    else if(props.length<3)
    {
        return "field must be at least 3 characters in length";
    }

    // check field sholud not exceed 50 characters in length
    else if(props.length>225)
    {
        return "field cannot exceed 225 characters in length";
    }

    // check field should not contain more than one white space consecutively
    else if(props.match(/([\s]{2})/))
    {
        return "field should not contain more than one white space consecutively";
    }

    // check field should not contain more than one white space consecutively
    else if(props.match(/([.]{2})/))
    {
        return "field should not contain more than one dot consecutively";
    }
    // check field should not contain more than two letters consecutively
    else if(props.match(/([a-z])\1{2,}/i))
    {
        return "field should not contain more than two repeated alphabetic letters consecutively";
    }
   
    // check field only contain alphabetic letters and spaces
    else if(!(props.match(/^[[a-z\s.]+$/i)))
    {
        return " field  only contain  alphabetical letters and dot";
    }

    else
    {
        return "";
    }
}


//validaton for [card_type,depenedent_no,children_no,address,area_location]
exports.require_validation=(props)=>{

    //check field is empty string ?
    if(validator.isEmpty(props))
    {
        return "required";
    }
    else
    {
        return "";
    }
}

//validate aadhar_card number 
exports.validate_aadhar_card_number = (props)=>{

     //check field is empty string ?
     if(validator.isEmpty(props))
     {
         return "required";
     }
     else if(!props.match(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/))
     {
         return "invalid aadhar card number";
     }
     else
     {
         return "";
     }
}

// check all validations 
exports.checkallvalidation=(props)=>{
    let {req_name_error,req_contact_no_error,req_card_type_error,occupation_error,address_error,location_error,
        jamat_name_error,contact_person_error,cp_contact_error}=props;

    return (validator.isEmpty(req_name_error) && validator.isEmpty(req_contact_no_error) && validator.isEmpty(req_card_type_error)
    && validator.isEmpty(occupation_error) && validator.isEmpty(address_error) && validator.isEmpty(location_error) &&
    validator.isEmpty(jamat_name_error) && validator.isEmpty(contact_person_error) && validator.isEmpty(cp_contact_error)
    )? true : false;

}

