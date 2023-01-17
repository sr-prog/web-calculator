function add(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

let displayText = "";
let firstNumber = "";
let secondNumber = "";
let operation = "";

function evaluateDisplay(extra_op) {
  const answer = operate(operation, firstNumber, secondNumber)

  firstNumber = answer;
  operation = ""
  secondNumber = ""

  if (extra_op !== undefined) {
    operation = extra_op
  }
  displayText = firstNumber + " " + operation + " " + secondNumber;
  display.innerText = displayText;
}

function populateDisplay(e) {
  let keyPressed = e.target;
  let isNumber = keyPressed.classList.contains("number-key");
  const display = document.querySelector("#display");

  if (isNumber) {
    const number = keyPressed.innerText;
    if (displayText === "") {
      displayText += number;
      firstNumber += number;
    } else if (secondNumber === "" && operation === "") {
      displayText += number;
      if (firstNumber.includes(".") && number === ".") {
        console.log("INVALID")
      } else {
        firstNumber += number;
      }
    } else {
      displayText += number;
      if (secondNumber.includes(".") && number === ".") {
        console.log("INVALID")
      } else {
        secondNumber += number;
      }
    }
  } else {
    let keyId = keyPressed.id;
    switch (keyId) {
      case "add-key":
      case "subtract-key":
      case "multiply-key":
      case "divide-key":
        let operationKeySet = "";
        switch (keyId) {
          case "add-key":
            operationKeySet = "+";
            break;
          case "subtract-key":
            operationKeySet = "-";
            break;
          case "multiply-key":
            operationKeySet = "*";
            break;
          case "divide-key":
            operationKeySet = "/";
            break;
        }
        if (
          operation === "" && display !== "" && secondNumber === "" &&
          firstNumber !== ""
        ) {
          operation = operationKeySet;
        } else if (firstNumber === "" && keyId === "subtract-key") {
          firstNumber += "-";
        } else {
          if (secondNumber === "" && operation !== "") {
            operation = operationKeySet;
          } else if (secondNumber !== "") {
            evaluateDisplay(operationKeySet);
            return;
          }
        }
        break;
      case "clear-key":
        firstNumber = "";
        secondNumber = "";
        operation = "";
        displayText = "";
        break;
      case "backspace-key":
        if (secondNumber !== "") {
          secondNumber = secondNumber.substring(0, secondNumber.length - 1);
        } else if (operation !== "") {
          operation = operation.substring(0, operation.length - 1);
        } else if (firstNumber !== "") {
          firstNumber = firstNumber.substring(0, firstNumber.length - 1);
        }
        break;
      case "equals-key":
        evaluateDisplay();
        return;
    }
  }
  displayText = firstNumber + " " + operation + " " + secondNumber;
  display.innerText = displayText;
  if (firstNumber !== "" || operation !== "" || secondNumber !== "") {
    display.style.visibility = "visible";
  } else {
    display.innerText = "0";
    display.style.visibility = "hidden";
  }
}

// Event listeners
const keys = document.querySelectorAll(".large-key, .small-key");

keys.forEach((key) => key.addEventListener("click", populateDisplay));
