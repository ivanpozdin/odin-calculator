const MINUS = "-";
const DECIMAL_POINT = ".";
const numbers = [...document.querySelectorAll(".number")];
const operations = [...document.querySelectorAll(".operation")];
const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");
const allClearBtn = document.querySelector("#all-clear");
const buttons = [...document.querySelectorAll(".calculator-container button")];

const resultElement = document.querySelector("#result-field");

let [number1, number2, operation] = ["", "", ""];

const clearResultField = function () {
  resultElement.textContent = "0";
  [number1, number2, operation] = ["", "", ""];
};

const deleteOneDigit = function () {
  if (number1 && !operation) {
    number1 = number1.slice(0, `${number1}`.length - 1);
    resultElement.textContent = "0";
    if (number1) resultElement.textContent = number1;
  }

  if (operation && number2) {
    number2 = number2.slice(0, -1);
    resultElement.textContent = "0";
    if (number2) resultElement.textContent = number2;
  }
};

clearBtn.addEventListener("click", deleteOneDigit);

allClearBtn.addEventListener("click", clearResultField);

numbers.forEach((numberElement) =>
  numberElement.addEventListener("click", (e) => {
    const currentNumber = numberElement.dataset.number;
    if (!operation) {
      if (currentNumber === DECIMAL_POINT && number1.includes(DECIMAL_POINT)) {
        return;
      }
      number1 += currentNumber;
      resultElement.textContent = number1;
    } else {
      if (currentNumber === DECIMAL_POINT && number2.includes(DECIMAL_POINT)) {
        return;
      }
      number2 += currentNumber;
      resultElement.textContent = number2;
    }
  })
);

operations.forEach((operationElement) =>
  operationElement.addEventListener("click", (e) => {
    if (number1 && number2 && operation) return;
    if (!number1) {
      number1 = MINUS;
      resultElement.textContent = number1;
      return;
    }
    if (operation && !number2) {
      number2 = MINUS;
      resultElement.textContent = number2;
      return;
    }
    operation = operationElement.dataset.operation;
  })
);

equalBtn.addEventListener("click", (e) => {
  if (!number2 && number1) {
    [number2, operation] = ["", ""];
    resultElement.textContent = number1;
  }
  if (!number1 || !operation || !number2) return;
  let result = 0;
  switch (operation) {
    case "-":
      result = +number1 - +number2;
      break;
    case "*":
      result = +number1 * +number2;
      break;
    case "/":
      if (+number2) result = +number1 / +number2;
      else {
        clearResultField();
        resultElement.textContent = "ERR";
        return;
      }
      break;
    default:
      result = +number1 + +number2;
  }
  result = parseFloat(result.toFixed(5));
  resultElement.textContent = result;
  [number1, number2, operation] = [`${result}`, "", ""];
});

buttons.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    btn.style["opacity"] = "80%";
  });
  btn.addEventListener("mouseleave", function (e) {
    btn.style["opacity"] = "100%";
  });
});
