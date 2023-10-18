const bill = document.getElementById("bill");
const numberOfPeople = document.getElementById("number");

const labelBill = document.querySelector(".label-bill");
const labelNumber = document.querySelector(".label-number");

const billZero = document.getElementById("billZero");
const only2decimals = document.getElementById("only2decimals");
const numberOfPeopleZero = document.getElementById("numberOfPeopleZero");

// Functie om de ingevoerde waarden te controleren
function checkInput() {
    if (bill.value == 0) {
        only2decimals.innerHTML = "";
        billZero.innerHTML = "can't be zero";
        bill.style.borderColor = "red";
    } else {
        bill.style.borderColor = "";
        billZero.innerHTML = "";
        console.log("INFO: Number received, processing..");
        var regex = /^\d*(\.\d{0,2})?$/;
        if (regex.test(bill.value)) {
            billZero.innerHTML = "";
        } else {
            billZero.innerHTML = "";
            only2decimals.innerHTML = "only 2 decimals";
            bill.style.borderColor = "red";
        }
    }

    if (numberOfPeople.value < 1) {
        numberOfPeopleZero.innerHTML = "can't be zero";
        numberOfPeople.style.borderColor = "red";
    } else {
        numberOfPeopleZero.innerHTML = "";
        numberOfPeople.style.borderColor = "";
        numberOfPeople.style.outline = "none";
    }
}

// Selecteer alle percentageknoppen en voeg event listeners toe
const percentageButtons = document.querySelectorAll(".tip-button");
const customPercentageInput = document.querySelector(".custom");
const tipAmountValue = document.querySelector(".tip-amount-value");
const totalPersonValue = document.querySelector(".total-person-value");

percentageButtons.forEach(button => {
    button.addEventListener("click", handlePercentageButtonClick);
});

customPercentageInput.addEventListener("input", () => {
    percentageButtons.forEach(button => button.classList.remove('button-active'));
    calculate();
});

bill.addEventListener("input", calculate);
numberOfPeople.addEventListener("input", calculate);

// Event handler voor het klikken op een percentageknop
function handlePercentageButtonClick() {
    percentageButtons.forEach(button => button.classList.remove('button-active'));
    this.classList.add('button-active');
    customPercentageInput.value = "";
    calculate();
}

// Functie om de berekening uit te voeren
function calculate() {
    // Voer de validatie opnieuw uit om te controleren of zowel bill als numberOfPeople geldige waarden hebben
    if (bill.value == 0 || numberOfPeople.value < 1) {
        tipAmountValue.innerHTML = "0.00";
        totalPersonValue.innerHTML = "0.00";
        return;
    }

    const billAmount = parseFloat(bill.value) || 0;
    const people = parseFloat(numberOfPeople.value) || 1;

    let percentage = 0;
    if (customPercentageInput.value) {
        percentage = parseFloat(customPercentageInput.value) || 0;
    } else {
        const selectedPercentageButton = document.querySelector(".button-active");
        percentage = selectedPercentageButton ? parseFloat(selectedPercentageButton.value) : 0;
    }

    const tipAmount = (percentage * billAmount / 100) / people;
    tipAmountValue.innerHTML = tipAmount.toFixed(2);

    if (billAmount > 0 && people > 0) {
        const totalAmount = (billAmount / people) + tipAmount;
        totalPersonValue.innerHTML = totalAmount.toFixed(2);
    } else {
        totalPersonValue.innerHTML = "0.00";
    }
}

// Initialisatie van de knoppen
handlePercentageButtonClick(); // Initialiseer met de eerste knop

// Functie om het aantal decimalen te controleren
function checkDecimals(billValue) {
    only2decimals.innerHTML = "";
    bill.style.borderColor = "";
    document.getElementById("bill").value = parseFloat(billValue).toFixed(2);
}

// Functie om alle invoervelden te resetten
function reset() {
    bill.value = "0";
    numberOfPeople.value = "0";
    custom.value = "";
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

// Functie om de lengte van de invoer te beperken
function limitInputLength(inputElement, maxLength) {
    if (inputElement.value.length > maxLength) {
        inputElement.value = inputElement.value.slice(0, maxLength);
    }
}