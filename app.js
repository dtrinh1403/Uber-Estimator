//Array price and wait price for each of the car type.
//first kilometer price, second kilometer up to 20km price and above 20km traveled price.
const ARRAY_PRICE_UBER_X = [2.20, 3.80, 4.96];
const WAIT_PRICE_UBER_X = 0.42;

const ARRAY_PRICE_UBER_SUV = [2.45, 4.92, 7.39];
const WAIT_PRICE_UBER_SUV = 0.43;

const ARRAY_PRICE_UBER_BLACK = [2.45, 5.26, 8.07];
const WAIT_PRICE_UBER_BLACK = 0.50;

function carTypeCheck(){
    var uberX = document.getElementById("uberX");
    var uberSUV = document.getElementById("uberSUV");
    var uberBlack = document.getElementById("uberBlack");

    if(uberX.checked){  //ID check
        return "uberX";
    } else if(uberSUV.checked){
        return "uberSUV"
    } else if(uberBlack.checked){
        return "uberBlack";
    }
}

//The fee is repetitively applied after every three minutes of waiting for the customer.
function waitPriceCal(waitTime, waitFee){
    var waitPrice = 0; 
    if (waitTime >= 3){
        waitPrice = Math.round(waitTime / 3) * waitFee;
    }
    return waitPrice;

}

function priceCal(kmTraveled, waitTime, arrayPrice, waitFee){
    var waitPrice = waitPriceCal(waitTime, waitFee);
    

    if(kmTraveled <= 1){
        return arrayPrice[0] + waitPrice;

    }
    else if(kmTraveled > 1 && kmTraveled <= 20){
       return arrayPrice[0] + (kmTraveled -1)*arrayPrice[1] + waitPrice;
    }
    else if (kmTraveled > 20){
        return  arrayPrice[0] + 19 * arrayPrice[1] + (kmTraveled - 20)* arrayPrice[2] + waitPrice;
    }
   
  
    
}

function totalBillCal(){
    var kmTraveled = document.getElementById("kmTraveled").value;
    var waitTime = document.getElementById("waitTime").value;

    kmTraveled = parseFloat(kmTraveled);
    waitTime = parseFloat(waitTime);

    var totalBill = 0;
    var carType = carTypeCheck();

  

    switch(carType){
        case "uberX":
            totalBill = priceCal(kmTraveled, waitTime, ARRAY_PRICE_UBER_X,WAIT_PRICE_UBER_X);
            break;
        case "uberSUV":
            totalBill = priceCal(kmTraveled, waitTime, ARRAY_PRICE_UBER_SUV,WAIT_PRICE_UBER_SUV);
            break;
        case "uberBlack":
            totalBill = priceCal(kmTraveled, waitTime, ARRAY_PRICE_UBER_BLACK,WAIT_PRICE_UBER_BLACK);
            break;
        default:
            alert("Please pick a vehicle type");
    }

    return totalBill;

}
var calculator1 = new calculator();
var validation = new validate();

document.getElementById("btnTotal").onclick = function (){
    var totalBill = totalBillCal();
    document.getElementById("billNoti").style.display = "block";
    document.querySelector(".bill").innerHTML = totalBill;

   calculator1.kmTraveled = document.querySelector("#kmTraveled").value;
   calculator1.waitTime = document.querySelector("#waitTime").value;

//    validation blank check
   var valid = true;
   valid &= validation.requiredCheck(calculator1.kmTraveled,'Kilometers','#errorBlank1') 
         & validation.requiredCheck(calculator1.waitTime,'Wait time','#errorBlank2');

 //    validation number check
   valid &= validation.numberCheck(calculator1.kmTraveled,'Kilometers','#errorNum1')
         & validation.numberCheck(calculator1.waitTime,'Wait time','#errorNum2');
   
  if(!valid){
     alert("Invalid input value");
     return;
  }

 

}


function renderRowKmDetail(carType, arrayKm, arrayPrice, tblBody){
    for(var i = 0; i < arrayKm.length; i++){
       var trKmDetail = document.createElement("tr");

       tdCarType = document.createElement("td");
       tdTraveled = document.createElement("td");
       tdPrice = document.createElement("td");
       tdBill = document.createElement("td");

       tdCarType.innerHTML = carType;
       tdTraveled.innerHTML = arrayKm[i] + " km";
       tdPrice.innerHTML = arrayPrice[i];
       tdBill.innerHTML = arrayPrice[i] * arrayKm[i];

       trKmDetail.appendChild(tdCarType);
       trKmDetail.appendChild(tdTraveled);
       trKmDetail.appendChild(tdPrice);
       trKmDetail.appendChild(tdBill);

       tblBody.appendChild(trKmDetail);



    }
   
}

function renderRowWaitTime(waitTime, waitFee, tblBody){
    var waitPrice = waitPriceCal(waitTime, waitFee);
    var trWaitTime = document.createElement("tr");

    var tdMinTitle = document.createElement("td");
    var tdMin = document.createElement("td");
    var tdWaitFee = document.createElement("td");
    var tdBill = document.createElement("td");

    tdMinTitle.innerHTML = " Wait time: ";
    tdMin.innerHTML = waitTime + " minute";
    tdWaitFee.innerHTML = waitFee;
    tdBill.innerHTML = waitPrice;

  trWaitTime.appendChild(tdMinTitle);
  trWaitTime.appendChild(tdMin);
  trWaitTime.appendChild(tdPrice);
  trWaitTime.appendChild(tdBill);

    tblBody.appendChild(trWaitTime);
}

function renderRowTotal(total, tblBody){
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";

    var tdTotalTitle = document.createElement("td");
    tdTotalTitle.setAttribute("colspan", 3);
    var tdTotal = document.createElement("td");

    tdTotalTitle.innerHTML = " Total Bill: ";
    tdTotal.innerHTML = total;

    trTotal.appendChild(tdTotalTitle);
    trTotal.appendChild(tdTotal);

    tblBody.appendChild(trTotal);
}

function receiptPrint(carType, kmTraveled, waitTime, waitFee, arrayPrice, totalBill){
    var tblBody = document.getElementById("tblBody");
    tblBody.innerHTML = ""; //reset table body

    if(kmTraveled <= 1){
        renderRowKmDetail(carType,[1],arrayPrice, tblBody);
    }
    else if(kmTraveled > 1 && kmTraveled <= 20){
        renderRowKmDetail(carType,[1, kmTraveled -1 ],arrayPrice, tblBody);

    }
    else if(kmTraveled > 20){
        renderRowKmDetail(carType,[1, 19,kmTraveled - 20],arrayPrice, tblBody);

    }

    // waitTime
    if(waitTime > 2){
        renderRowWaitTime(waitTime,waitFee,tblBody);
    }

     // total
     renderRowTotal(totalBill,tblBody);

 
}

document.getElementById("btnPrintReceipt").onclick = function(){
    var kq = getData();
    var totalBill = totalBillCal();
    var carType = carTypeCheck();
    switch(carType){
        case "uberX":
            receiptPrint(carType, kq[0], kq[1], WAIT_PRICE_UBER_X,ARRAY_PRICE_UBER_X, totalBill);
        break;
        case "uberSUV":
            receiptPrint(carType, kq[0], kq[1], WAIT_PRICE_UBER_SUV,ARRAY_PRICE_UBER_SUV, totalBill);
        break;
        case "uberBlack":
            receiptPrint(carType, kq[0], kq[1], WAIT_PRICE_UBER_BLACK,ARRAY_PRICE_UBER_BLACK, totalBill);
        break;
        default:
            alert("Please pick a vehicle type");    
    }
 


}

function getData(){
    var kq = [];
    var kmTraveled = document.getElementById("kmTraveled").value;
    kmTraveled = parseFloat(kmTraveled);
    kq.push(kmTraveled);
    var waitTime = document.getElementById("waitTime").value;
    waitTime = parseFloat(waitTime);
    kq.push(waitTime);
    return kq;
}
