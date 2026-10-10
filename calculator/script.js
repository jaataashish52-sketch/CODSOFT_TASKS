
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");
const message = document.getElementById("message");

let current = "0";
let firstNumber = null;
let operator = null;
let waitingForNumber = false;
let lastOperator = null;
let lastOperand = null;

function updateDisplay() {
  display.value = current;
}

function clearAll() {
  current = "0";
  firstNumber = null;
  operator = null;
  waitingForNumber = false;
  lastOperator = null;
  lastOperand = null;

  message.textContent = "";
  updateDisplay();
}

function formatNumber(number) {
  if (!Number.isFinite(number)) {
    throw new Error("Invalid calculation");
  }

  return String(Number(number.toPrecision(10)));
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "*":
      return a * b;

    case "/":
      if (b === 0) {
        throw new Error("Cannot divide by zero");
      }
      return a / b;

    default:
      return b;
  }
}

function inputNumber(number) {
  message.textContent = "";

  if (current === "Error") {
    clearAll();
  }

  if (waitingForNumber) {
    current = number;
    waitingForNumber = false;
  } else if (current === "0") {
    current = number;
  } else if (current.replace("-", "").length < 15) {
    current += number;
  }

  updateDisplay();
}

function inputDecimal() {
  message.textContent = "";

  if (current === "Error" || waitingForNumber) {
    current = "0.";
    waitingForNumber = false;
  } else if (!current.includes(".")) {
    current += ".";
  }

  updateDisplay();
}

function chooseOperator(nextOperator) {
  message.textContent = "";

  if (current === "Error") {
    clearAll();
    return;
  }

  const inputValue = Number(current);

  if (operator !== null && !waitingForNumber) {
    try {
      current = formatNumber(
        calculate(firstNumber, inputValue, operator)
      );
    } catch (error) {
      current = "Error";
      message.textContent = error.message;
      firstNumber = null;
      operator = null;
      waitingForNumber = true;
      updateDisplay();
      return;
    }
  }

  firstNumber = Number(current);
  operator = nextOperator;
  waitingForNumber = true;

  lastOperator = null;
  lastOperand = null;

  updateDisplay();
}

function performCalculation() {
  message.textContent = "";

  if (current === "Error") return;

  let op = operator;
  let a = firstNumber;
  let b = Number(current);

  // Repeat the last operation when = is pressed again.
  if (op === null && lastOperator !== null) {
    op = lastOperator;
    a = Number(current);
    b = lastOperand;
  }

  if (op === null || a === null) return;

  try {
    const result = calculate(a, b, op);

    lastOperator = op;
    lastOperand = b;

    current = formatNumber(result);
    firstNumber = null;
    operator = null;
    waitingForNumber = true;

    updateDisplay();
  } catch (error) {
    current = "Error";
    message.textContent = error.message;

    firstNumber = null;
    operator = null;
    waitingForNumber = true;

    updateDisplay();
  }
}

function deleteDigit() {
  message.textContent = "";

  if (waitingForNumber || current === "Error") {
    current = "0";
    waitingForNumber = false;
  } else if (current.length > 1) {
    current = current.slice(0, -1);

    if (current === "-") {
      current = "0";
    }
  } else {
    current = "0";
  }

  updateDisplay();
}

function toggleSign() {
  if (current === "Error" || Number(current) === 0) return;

  current = current.startsWith("-")
    ? current.slice(1)
    : "-" + current;

  message.textContent = "";
  updateDisplay();
}

function percentage() {
  if (current === "Error") return;

  const value = Number(current);
  let result = value / 100;

  // For example: 200 + 10% = 220
  if (
    firstNumber !== null &&
    operator !== null &&
    (operator === "+" || operator === "-")
  ) {
    result = firstNumber * value / 100;
  }

  current = formatNumber(result);
  waitingForNumber = false;

  message.textContent = "";
  updateDisplay();
}

// One click handler for all calculator buttons.
buttons.addEventListener("click", function(event) {
  const button = event.target.closest("button");

  if (!button || !buttons.contains(button)) return;

  // Number buttons
  if (button.dataset.number !== undefined) {
    inputNumber(button.dataset.number);
    return;
  }

  // Operation buttons
  if (button.dataset.operator !== undefined) {
    chooseOperator(button.dataset.operator);
    return;
  }

  // Other buttons
  switch (button.dataset.action) {
    case "clear":
      clearAll();
      break;

    case "delete":
      deleteDigit();
      break;

    case "decimal":
      inputDecimal();
      break;

    case "sign":
      toggleSign();
      break;

    case "percent":
      percentage();
      break;

    case "equals":
      performCalculation();
      break;
  }
});

// Show the initial value.
updateDisplay();

console.log("Calculator is ready!");
