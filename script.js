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
            }
            else {
                billZero.innerHTML = "";
                only2decimals.innerHTML = "only 2 decimals";
                bill.style.borderColor = "red";
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
    percentageButtons.forEach(button => {
      button.classList.remove('button-active');
    });
  });

function inputPercentage() {
    const customPercentage = parseFloat(document.querySelector(".custom").value);
    if (numberOfPeople.value > 0) {
        let billTip;
        if (!isNaN(customPercentage)) {
            billTip = (customPercentage * parseFloat(bill.value) / 100) / numberOfPeople.value;
        } else {
            // Als er geen aangepast percentage is ingevoerd, gebruik een standaardpercentage
            const percentage = parseFloat(document.querySelector(".button-active").value);
            billTip = (percentage * parseFloat(bill.value) / 100) / numberOfPeople.value;
        }
        if (isNaN(billTip)) {
            document.querySelector(".tip-amount-value").innerHTML = "0.00";
        } else {
            document.querySelector(".tip-amount-value").innerHTML = billTip.toFixed(2);
        }
    }
    calculate();
}

let percentage = 0;

function percentageClick() {
    // Deze functie zal worden gebruikt als event handler voor de knoppen
    function buttonClickHandler() {
        // Verwijder de klasse "button-active" van alle knoppen
        percentageButtons.forEach(button => {
            button.classList.remove('button-active');
        });

        // Voeg de klasse "button-active" toe aan de geklikte knop
        this.classList.add('button-active');
        percentage = parseFloat(this.value);
        inputPercentage();

        // Bereken de tip
        if (numberOfPeople.value > 0) {
            const billClickedTip = (parseFloat(bill.value) * percentage / 100) / numberOfPeople.value;
            if (isNaN(billClickedTip)) {
                document.querySelector(".tip-amount-value").innerHTML = "0.00";
            } else {
                document.querySelector(".tip-amount-value").innerHTML = billClickedTip.toFixed(2);
            }
        }
        calculate();
    }

    // Voeg de klikgebeurtenislistener toe aan elke knop
    percentageButtons.forEach(button => {
        button.addEventListener('click', buttonClickHandler);
    });
}

// Roep de percentageClick-functie aan om de knoppen te initialiseren
percentageClick();

function calculate(){
    const tipAmountValue = document.querySelector(".tip-amount-value").innerHTML;
    console.log("check = " + typeof amount);
    if(numberOfPeople.value == 0){
        document.querySelector(".total-person-value").innerHTML = "0.00";
        document.querySelector(".tip-amount-value").innerHTML = "0.00";
    }
    else{
        const amount = (parseFloat(bill.value) / parseFloat(numberOfPeople.value) + parseFloat(tipAmountValue));
        document.querySelector(".total-person-value").innerHTML = amount.toFixed(2);
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
    percentageButtons.forEach(button => {
        button.classList.remove('button-active');
    });
}

function limitInputLength(inputElement, maxLength) {
    if (inputElement.value.length > maxLength) {
        inputElement.value = inputElement.value.slice(0, maxLength);
    }
}