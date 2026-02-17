const answers = {
    q1: "javascript",
    q2: "let",
    q3: "getelementbyid"
};

function submitQuiz() {
    let score = 0;

    Object.keys(answers).forEach(key => {
        const userAnswer = document.getElementById(key).value.toLowerCase().trim();
        if (userAnswer === answers[key]) score++;
    });

    const result = document.getElementById("result");

    if (score === 3) {
        result.innerHTML = "🎉 Excellent! Score: " + score + "/3";
        result.style.color = "green";
    } else if (score === 2) {
        result.innerHTML = "👍 Good Job! Score: " + score + "/3";
        result.style.color = "orange";
    } else {
        result.innerHTML = "❌ Try Again! Score: " + score + "/3";
        result.style.color = "red";
    }
}

function resetQuiz() {
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.getElementById("result").innerHTML = "";
}
