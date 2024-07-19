const calculatorDisplay = document.querySelector(".display");
const calculatorResultDisplay = document.querySelector(".result");
const calculatorBtns = document.querySelector(".calculator__btns");

let canOperator = false;
let canDecimal = true;

const printToDisplay = (value) => (calculatorDisplay.textContent += value);

const calcResult = () => {
  try {
    const result = eval(calculatorDisplay.textContent);
    if (result === NaN) throw Error("Cant divide by zero");
    calculatorResultDisplay.classList.remove("error");
    calculatorResultDisplay.textContent = "";
    calculatorDisplay.textContent = result;
  } catch (error) {
    calculatorResultDisplay.classList.add("error");
    calculatorResultDisplay.textContent = "Invalid";
  }
};

calculatorBtns.addEventListener("mousedown", ({ target }) => {
  if (!target.classList.contains("btn")) return;

  if (target.classList.contains("btn-clear")) {
    calculatorDisplay.textContent = "0";
    calculatorResultDisplay.textContent = "&nbsp;";
    calculatorResultDisplay.classList.remove("error");
    canOperator = false;
    canDecimal = false;
  } else if (target.classList.contains("btn-equal")) {
    if (!calculatorDisplay.textContent.includes(".")) canDecimal = true;
    canOperator = true;
    calcResult();
  } else if (target.classList.contains("btn-operator")) {
    if (!canOperator) {
      const expression = calculatorDisplay.textContent.slice(0, -1);
      calculatorDisplay.textContent = expression;
    }
    canDecimal = true;
    canOperator = false;
    printToDisplay(target.dataset.value);
  } else if (target.classList.contains("btn-decimal")) {
    if (!canDecimal) return;
    canDecimal = false;
    printToDisplay(".");
  } else {
    if (calculatorDisplay.textContent === "0")
      calculatorDisplay.textContent = "";
    canOperator = true;
    printToDisplay(target.dataset.value);
  }

  try {
    const result = eval(calculatorDisplay.textContent);
    calculatorResultDisplay.textContent = result;
  } catch (error) {}
});
