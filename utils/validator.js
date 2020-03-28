const ex = {};
const db = require("../db/db").getDb();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
let age;

// should use "for of"
// should use "for in" only when you need index

const regexAll = (testString, type = "name") => {
  const alpha = /^[a-zA-Z]{0,15}$/;
  const alphas = /^[a-zA-Z ]{0,15}$/g;
  const emailcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  const address = /^[a-zA-Z0-9\s,'-]{0,25}$/;
  const username = /^[a-zA-Z,'-]{0,16}$/;
  const zipcode = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;

  switch (type) {
    case "email":
      return getParsedResult(
        new RegExp(emailcheck).test(testString),
        testString,
        type
      );
    case "phone":
      return getParsedResult(
        new RegExp(phone).test(testString),
        testString,
        type
      );
    case "name":
      return getParsedResult(
        new RegExp(alpha).test(testString),
        testString,
        type
      );
    case "names":
      return getParsedResult(
        new RegExp(alphas).test(testString),
        testString,
        type
      );
    case "address":
      return getParsedResult(
        new RegExp(address).test(testString),
        testString,
        type
      );
    case "username":
      return getParsedResult(
        new RegExp(username).test(testString),
        testString,
        type
      );
    case "zipcode":
      return getParsedResult(
        new RegExp(zipcode).test(testString),
        testString,
        type
      );
    default:
      return 0;
  }
};

const getParsedResult = (isValid, value, type) => {
  return isValid
    ? { value, isValid }
    : { value, isValid, message: `not a valid ${type}` };
};

const gendercheck = gender => {
  let a;
  switch (gender) {
    case "M":
    case "m":
    case "male":
    case "Male":
    case "MALE":
      a = {
        value: "m",
        isValid: true
      };
      break;
    case "F":
    case "f":
    case "female":
    case "Female":
    case "FEMALE":
      a = {
        value: "f",
        isValid: true
      };
      break;
    case "T":
    case "t":
    case "transgender":
    case "Transgender":
      a = {
        value: "t",
        isValid: true
      };
      break;
  }
  return a;
};

function passwords(setpassword, confirmpassword) {
  const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  // try not to frequently set hardcoded values
  const tests = pass.test(setpassword);
  if (tests) {
    if (setpassword === confirmpassword)
      // {} not neccasary if only one statement insoide if or else
      return {
        hash: bcrypt.hashSync(setpassword, salt),
        isvalid: tests
      };
    else
      return {
        value: setpassword,
        isvalid: tests,
        message: "password not matched"
      };
  } else {
    return {
      value: setpassword,
      isvalid: tests,
      message: "password not in format"
    };
  }
}
// don't use seperator comments

function ValidateDOB(dateString, agegiven) {
  const dob = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
  if (dob.test(dateString)) {
    const parts = dateString.split("/");
    const dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    const dtCurrent = new Date();
    age = dtCurrent.getFullYear() - dtDOB.getFullYear();
    // please use === instead of ==
    if (age === agegiven) {
      if (age > 1) {
        return {
          value: agegiven,
          isValid: true
        };
      } else {
        console.log("age is less than 1");
        return {
          value: agegiven,
          isValid: false,
          message: "age is less than 1"
        };
      }
    } else {
      return {
        value: agegiven,
        isValid: false,
        message: "age and given DOB is not matching"
      };
    }
  } else {
    return {
      value: dateString,
      isValid: false,
      message: "dob is not in the given format"
    };
  }
}

//-------------------------------------------//

ex.signup = user => {
  console.log(user.last_name);
  return new Promise((resolve, reject) => {
    console.log((age = age));
    const user1 = {
      first_name: regexAll(user.first_name),
      last_name: regexAll(user.last_name),
      dob: ValidateDOB(user.dob, user.age),
      email: regexAll(user.email, "email"),
      user_name: regexAll(user.user_name, "username"),
      phone: regexAll(user.phone, "phone"),
      gender: gendercheck(user.gender),
      address_line1: regexAll(user.address_line1, "address"),
      address_line2: regexAll(user.address_line2, "address"),
      password: passwords(user.set_password, user.confirm_password),
      state: regexAll(user.state, "names"),
      country: regexAll(user.country, "names"),
      zipcode: regexAll(user.zipcode, "zipcode")
    };

    db.collection("users").insertOne(user1, function(err, res) {
      if (err) return reject(err);
      return resolve(res.ops);
    });
  });
};

module.exports = ex;
