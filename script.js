const bill = document.getElementById("bill");
const numberOfPeople = document.getElementById("number");

const labelBill = document.querySelector(".label-bill");
const labelNumber = document.querySelector(".label-number");

const billZero = document.getElementById("billZero");
const only2decimals = document.getElementById("only2decimals");
const numberOfPeopleZero = document.getElementById("numberOfPeopleZero");

function checkInput() {
    if(bill.value == 0){
        only2decimals.innerHTML = "";
        billZero.innerHTML = "can't be zero";
        bill.style.borderColor = "red";
    } else {
            bill.style.borderColor = "";
            billZero.innerHTML = "";
            console.log("INFO: Number received, processing..");
            var regex = /^\d*(\.\d{0,2})?$/;
            if(regex.test(bill.value)){
                billZero.innerHTML = "";
                calculate();
            }
            else {
                if(!regex.test(bill.value)){
                billZero.innerHTML = "";
                only2decimals.innerHTML = "only 2 decimals";
                bill.style.borderColor = "red";
                calculate();
                }
            }
    }

    if(numberOfPeople.value < 1){
        numberOfPeopleZero.innerHTML = "can't be zero";
        numberOfPeople.style.borderColor = "red";
    }
        else {
            numberOfPeopleZero.innerHTML = "";
            numberOfPeople.style.borderColor = "";
            numberOfPeople.style.outline = "none";
        }

        const percentageButtons = document.querySelectorAll(".tip-button");
        // Voeg een klikgebeurtenislistener toe aan elke knop
        percentageButtons.forEach(button => {
            button.addEventListener('click', function() {
              // Verwijder de klasse "button-active" van alle knoppen
              percentageButtons.forEach(btn => {
                btn.classList.remove('button-active');
              });
              // Voeg de klasse "button-active" toe aan de geklikte knop
              this.classList.add('button-active');
              const percentage = parseFloat(this.value);
              percentageClick(percentage);
            });
        });

        inputPercentage();
}

const percentageButtons = document.querySelectorAll(".tip-button");
bill.addEventListener("input", calculate);
numberOfPeople.addEventListener("input", calculate);
const customPercentageInput = document.querySelector(".custom");
customPercentageInput.addEventListener("input", inputPercentage);

  // Voeg een inputgebeurtenislistener toe aan het aangepaste percentage-invoerveld
  customPercentageInput.addEventListener("input", function() {
    // Verwijder de klasse "button-active" van alle knoppen als er tekst wordt ingevoerd
    percentageButtons.forEach(btn => {
      btn.classList.remove('button-active');
    });
  });

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
    console.log(customPercentage);
    const numberValue = document.querySelector("#number").value;
    if(numberValue > 0){
    const billCustomTip = (customPercentage * newBill / 100) / numberValue;
    if(isNaN(billCustomTip)){
        document.querySelector(".tip-amount-value").innerHTML = "0.00";
    }
    else {
    document.querySelector(".tip-amount-value").innerHTML = billCustomTip.toFixed(2);
    }
    }
    calculate();
}

function percentageClick(percentage){
    console.log(percentage);
    const customPercentage = document.querySelector(".custom").value = "";
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

function checkDecimals(billValue){
    only2decimals.innerHTML= "";
    bill.style.borderColor = "";
    document.getElementById("bill").value = parseFloat(billValue).toFixed(2);
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

function limitInputLength(inputElement, maxLength) {
    if (inputElement.value.length > maxLength) {
        inputElement.value = inputElement.value.slice(0, maxLength);
    }
}