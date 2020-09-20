var validate = function(){

    this.requiredCheck = function(value,name,error_Status){
        if(value.trim() === ''){
            document.querySelector(error_Status).innerHTML = name + " is required !";
            document.querySelector(error_Status).style.display = "block";
            return false;
        }
        document.querySelector(error_Status).innerHTML = " ";
        document.querySelector(error_Status).style.display = "none";

        return true;

        
    }

    this.numberCheck = function(value,name,error_Status){
        var regex = /^[0-9]+$/;
        if(regex.test(value)){
            document.querySelector(error_Status).innerHTML = "";
            document.querySelector(error_Status).style.display = "none";
            return true;
        }
        document.querySelector(error_Status).innerHTML = name + " must be numbers !";
        document.querySelector(error_Status).style.display = "block";

        return false;

        
    }

}