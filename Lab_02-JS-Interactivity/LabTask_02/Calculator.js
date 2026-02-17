function calculate() {
    const n1 = parseFloat(num1.value);
    const n2 = parseFloat(num2.value);
    const op = operation.value;
    const resultBox = document.getElementById("result");

    if (isNaN(n1) || isNaN(n2)) {
        resultBox.innerHTML = "⚠ Enter valid numbers!";
        resultBox.style.background = "rgba(255,0,0,0.4)";
        return;
    }

    if (op === "/" && n2 === 0) {
        resultBox.innerHTML = "❌ Cannot divide by zero!";
        resultBox.style.background = "rgba(255,0,0,0.4)";
        return;
    }

    let result = eval(n1 + op + n2);

    resultBox.innerHTML = "Result: " + result;
    resultBox.style.background = result >= 0 
        ? "rgba(0,255,0,0.3)" 
        : "rgba(255,0,0,0.3)";
}
