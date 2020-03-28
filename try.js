

var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const name = Manish;
if(!regName.test.name){
    alert('Invalid name given.');
}else{
    alert('Valid name given.');
}


function ValidateDOB() {

    //Get the date from the TextBox.
    var dateString = 29/09/1997;
    var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;

    //Check whether valid dd/MM/yyyy Date Format.
    if (regex.test(dateString)) {
        var parts = dateString.split("/");
        var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
        var dtCurrent = new Date();
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
            return false;
        }
            const age1 = dtCurrent.getFullYear() - dtDOB.getFullYear();
            console.log(age1);
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {

            //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
            if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                return false;
            }
            if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                if (dtCurrent.getDate() < dtDOB.getDate()) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
}













// if(alpha.test(user.first_name)){
//     if(alpha.test(user.last_name)){
//         if(pass.test(user.set_Password)){
//             if(user.set_Password === user.confirm_Password){



//             }else{ console.log("set password and confirm password are not same") }
//           } else{ console.log("password strength is weak"); }
//     }else{ console.log("second name is not in the format");} 
//   } else{ res("First name is not in th format"); }
  
  
 