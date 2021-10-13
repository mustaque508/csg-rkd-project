/***************** Common validation ********************************/
const validator = require("validator");

//validation for[req_name,occupation,contact_person,jamat_name]
exports.validate_name = (props) => {
  //check field is empty string ?
  if (validator.isEmpty(props)) {
    return "required";
  }

  // check field  sholud be atleast 3 characters in length
  else if (props.length < 3) {
    return "field must be at least 3 characters in length";
  }

  // check field sholud not exceed 50 characters in length
  else if (props.length > 225) {
    return "field cannot exceed 225 characters in length";
  }

  // check field should not contain more than one white space consecutively
  else if (props.match(/([\s]{2})/)) {
    return "field should not contain more than one white space consecutively";
  }

  // check field should not contain more than one white space consecutively
  else if (props.match(/([.]{2})/)) {
    return "field should not contain more than one dot consecutively";
  }
  // check field should not contain more than two letters consecutively
  else if (props.match(/([a-z])\1{2,}/i)) {
    return "field should not contain more than two repeated alphabetic letters consecutively";
  }

  // check field only contain alphabetic letters and spaces
  else if (!props.match(/^[[a-z\s.]+$/i)) {
    return " field  only contain  alphabetical letters and dot";
  } else {
    return "";
  }
};

//validaton for [card_type,depenedent_no,children_no,address,area_location]
exports.require_validation = (props) => {
  //check field is empty string ?
  if (validator.isEmpty(props)) {
    return "required";
  } else {
    return "";
  }
};

//validate aadhar_card number
exports.validate_aadhar_card_number = (props) => {
  //check field is empty string ?
  if (validator.isEmpty(props)) {
    return "required";
  } else if (!props.match(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/)) {
    return "invalid card number";
  } else {
    return "";
  }
};

//email validation
exports.validate_email = (props) => {
  if (validator.isEmpty(props)) {
    return "required";
  } else if (!validator.isEmail(props)) {
    return "Please enter valid email id";
  } else {
    return "";
  }
};

//password validation
exports.validate_password = (props) => {
  if (validator.isEmpty(props)) {
    return "required";
  }

  //password length should be minimum 8 characters.
  else if (props.length < 8) {
    return "Length should be minimum 8 characters";
  }

  //check password contain atleast one numeric character
  else if (!props.match(/[0-9]+/)) {
    return "The password must include atleast one numeric character";
  }

  //check password contain atleast one alphabetic letter
  else if (!props.match(/[a-z]+/)) {
    return "The password must include atleast one Alphabetic letter";
  }

  // check password contain atleast one capital letter
  else if (!props.match(/[A-Z]+/)) {
    return "The password must include atleast one capital letter";
  }

  // check password contain atleast one special character
  else if (!props.match(/[\W]+/)) {
    return "The password must include atleast one special character";
  }

  // check password should not contain any white space
  else if (props.match(/[\s]/)) {
    return "The password should not contain white space";
  } else {
    return "";
  }
};

//confirm password validation
exports.validate_confirm_password = (password, cpassword) => {
  //check confirm-password is empty string ?
  if (validator.isEmpty(password)) {
    return "required";
  } else if (password !== cpassword) {
    return "mismatch password";
  } else {
    return "";
  }
};

// check all validations
exports.checkallvalidation = (props) => {
  for (let items in props) {
    if (!validator.isEmpty(props[items])) {
      return false;
    }
  }
  return true;
};
