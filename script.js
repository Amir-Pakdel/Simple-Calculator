// Navigation
function showCalculator(id) {
    document.querySelectorAll('.calculator-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

// Exchange Rate Calculator
const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const fallbackRates = {
    'IRR': {
        'USD': 0.00002381,
        'EUR': 0.00002174,
        'GBP': 0.00001852,
        'IRR': 1,
        'AED': 0.0000875,
        'TRY': 0.000643,
        'CNY': 0.0001714,
        'JPY': 0.003571
    },
    'USD': {
        'USD': 1,
        'EUR': 0.92,
        'GBP': 0.79,
        'IRR': 42000,
        'AED': 3.67,
        'TRY': 27.5,
        'CNY': 7.2,
        'JPY': 149
    }
};

function calculateExchange() {
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;
    
    fetch(`https://open.er-api.com/v6/latest/${currency_one}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.result === "success" && data.rates && data.rates[currency_two]) {
                const currentRate = data.rates[currency_two];
                rateEl.innerText = `1 ${currency_one} = ${currentRate.toLocaleString('fa-IR', {maximumFractionDigits: 4})} ${currency_two}`;
                amountTwo.value = (amountOne.value * currentRate).toLocaleString('en-US', {maximumFractionDigits: 2});
            } else {
                throw new Error("Rate not found");
            }
        })
        .catch(() => {
            let currentRate = 0;
            
            if (fallbackRates[currency_one] && fallbackRates[currency_one][currency_two]) {
                currentRate = fallbackRates[currency_one][currency_two];
            } else if (fallbackRates[currency_two] && fallbackRates[currency_two][currency_one]) {
                currentRate = 1 / fallbackRates[currency_two][currency_one];
            } else {
                rateEl.innerText = "خطا در دریافت نرخ ارز";
                return;
            }
            
            rateEl.innerText = `1 ${currency_one} = ${currentRate.toLocaleString('fa-IR', {maximumFractionDigits: 4})} ${currency_two} (تقریبی)`;
            amountTwo.value = (amountOne.value * currentRate).toLocaleString('en-US', {maximumFractionDigits: 2});
        });
}

currencyOne.addEventListener("change", calculateExchange);
amountOne.addEventListener("input", calculateExchange);
currencyTwo.addEventListener("change", calculateExchange);
amountTwo.addEventListener("input", calculateExchange);

swap.addEventListener("click", () => {
    const storedValue = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = storedValue;
    calculateExchange();
});

calculateExchange();

// White Calculator
const outputEl = document.querySelector(".text");
const valEl = document.querySelectorAll(".val");
const ClearEl = document.querySelector(".AC");
const deleteEl = document.querySelector(".DEL");
const equalEl = document.querySelector(".equal");

valEl.forEach((val) => {
    val.addEventListener("click", () => {
        outputEl.value += val.value;
    });
});

ClearEl.addEventListener("click", () => {
    outputEl.value = "";
});

deleteEl.addEventListener("click", () => {
    outputEl.value = outputEl.value.slice(0, -1);
});

equalEl.addEventListener("click", () => {
    try {
        outputEl.value = eval(outputEl.value);
    } catch (e) {
        alert("خطا در محاسبه");
    }
});

// BMI Calculator
const btnEl = document.getElementById("btn");
const bmiInputEl = document.getElementById("bmi-result");
const weightConditionEl = document.getElementById("weight-condition");

function calculateBMI() {
    const heightValue = document.getElementById("height").value / 100;
    const weightValue = document.getElementById("weight").value;

    const bmiValue = weightValue / (heightValue * heightValue);

    bmiInputEl.value = bmiValue.toFixed(2);

    if (bmiValue < 18.5) {
        weightConditionEl.innerText = "کمبود وزن";
        weightConditionEl.style.color = "#2196F3";
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        weightConditionEl.innerText = "وزن طبیعی";
        weightConditionEl.style.color = "#2e7d32";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        weightConditionEl.innerText = "اضافه وزن";
        weightConditionEl.style.color = "#f59e0b";
    } else if (bmiValue >= 30) {
        weightConditionEl.innerText = "چاقی";
        weightConditionEl.style.color = "#ef4444";
    }
}

btnEl.addEventListener("click", calculateBMI);