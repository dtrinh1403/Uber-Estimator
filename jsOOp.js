var calculator1 = new calculator();
var validation = new validate();

var submitButton = function(){
   calculator1.kmTraveled = document.querySelector("#kmTraveled");
   calculator1.waitTime = document.querySelector("#waitTime");

   //validation check
   var valid = true;
   
   valid &= validation.requiredCheck(calculator1.kmTraveled, '#errorStatus')
            &validation.requiredCheck(calculator1.waitTime, '#errorStatus');
   
  if(!valid){
     alert("Please fill out the blank input");
     return;
  }
}

// document.querySelector("#btnTotal").onclick = submitButton;


