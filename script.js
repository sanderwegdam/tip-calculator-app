const bill = document.getElementById("bill");
const numberOfPeople = document.getElementById("number");

const labelBill = document.querySelector(".label-bill");
const labelNumber = document.querySelector(".label-number");

const billZero = document.getElementById("billZero");
const only2decimals = document.getElementById("only2decimals");
const numberOfPeopleZero = document.getElementById("numberOfPeopleZero");

function checkInput() {    
    document.querySelector(".tip-amount-value").innerHTML = "0.00";
 
    if(bill.value < 1){  
        billZero.innerHTML = "can't be zero";
        bill.style.borderColor = "red";
    } else {
        if(bill.value == ""){
            bill.style.borderColor = "";
            billZero.innerHTML = ""; 
            console.log("ERROR: No number was input.");
        }
        else{
            bill.style.borderColor = "";
            console.log("INFO: Number received, processing..");
            var regex = /^\d*(\.\d{0,2})?$/;        
            if(regex.test(bill.value)){ 
                billZero.innerHTML = "";  
                calculate();                       
            }
            else {     
                if(!regex.test(bill.value)){          
                only2decimals.innerHTML = "only 2 decimals";               
                calculate();
                }                            
            }  
        }            
    }  

    if(!isNaN(bill.value)){
    if(numberOfPeople.value < 1){
        numberOfPeopleZero.innerHTML = "can't be zero";
        numberOfPeople.style.borderColor = "red";
        if(isNaN(numberOfPeople.value)){
            document.querySelector(".total-person-value").innerHTML = "0.00"; 
        }
        else{
            document.querySelector(".total-person-value").innerHTML = "0.00"; 
        }
    }
        else{            
            numberOfPeopleZero.innerHTML = "";
            numberOfPeople.style.borderColor = "";
            numberOfPeople.style.outline = "none";
        }
    }
}

function calculate(){  
    const tipAmountValue = document.querySelector(".tip-amount-value").innerHTML;
    const amount = (parseFloat(bill.value) / parseFloat(numberOfPeople.value) + parseFloat(tipAmountValue)); 
    console.log("check = " + typeof amount);      
    if(isNaN(amount)){
        document.querySelector(".total-person-value").innerHTML = "0.00";
    }
    else{
        document.querySelector(".total-person-value").innerHTML = amount.toFixed(2); 
    }  
}

function inputPercentage() {  
    const newBill = bill.value;
    const customPercentage = document.querySelector(".custom").value;
    const numberValue = document.querySelector("#number").value;
    if(numberValue > 0){        
    console.log(customPercentage);
    console.log(newBill);
    const billCustomTip = (customPercentage * newBill / 100) / numberValue;
    if(isNaN(billCustomTip)){
        document.querySelector(".tip-amount-value").innerHTML = "0.00";
    }
    else {
    document.querySelector(".tip-amount-value").innerHTML = billCustomTip.toFixed(2);
    }
    calculate();  
    } 
}

function percentage(percentage){ 
    const billValue = document.querySelector("#bill").value;  
    const numberValue = document.querySelector("#number").value;
    if(numberValue > 0){
    const billClickedTip = (billValue * percentage / 100) / numberValue; 
    if(isNaN(billClickedTip)){ 
        document.querySelector(".tip-amount-value").innerHTML = "0.00";   
    }
    else {
        document.querySelector(".tip-amount-value").innerHTML = billClickedTip.toFixed(2);
    }
    calculate() 
    }     
}

function checkDecimals(bill){
    only2decimals.innerHTML= "";
    document.getElementById("bill").value = parseFloat(bill).toFixed(2);     
}

function reset(){    
    bill.value = "0";
    numberOfPeople.value = "0";
    custom.value = ""
    document.querySelector(".tip-amount-value").innerHTML = "0.00";
    document.querySelector(".total-person-value").innerHTML = "0.00";
    numberOfPeopleZero.innerHTML = "";
    billZero.innerHTML = "";
    bill.style.borderColor = "";
    numberOfPeople.style.borderColor = "";
}