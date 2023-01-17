startTesting();

function *testing(times=10) {
    let score = 0;
    for (let i = 0, x, y; i < times; i++) {
        x = randint(1, 9);
        y = randint(1, 9);
        const answer = yield { x, y, score, scoreMax: i };
        const correct = x * y === answer;
        score += correct;
    }
    return { score, scoreMax: times };
}

function startTesting() {
    const resultsOutput = document.getElementById("results");
    const equationOutput = document.getElementById("equation");
    const answerInput = document.getElementById("answer");
    const buttonNext = document.getElementById("next");
    const buttonRestart = document.getElementById("restart");

    let t;
    start();

    buttonNext.addEventListener("click", iteration);
    buttonRestart.addEventListener("click", start);

    function start() {
        t = testing();
        resultsOutput.innerText = `Загальний рахунок: ${0}% (${0} правильних відповідей з ${0})`;
        iteration();
    }
    function iteration() {
        const answer = +answerInput.value;

        const { x, y, score, scoreMax } = Object.assign({}, t.next(answer).value);
        if (x && y) {
            equationOutput.innerText = `${x} × ${y} = `;
        }
        answerInput.value = "";

        if (score && scoreMax) {
            const percentage = scoreMax == 0 ? 0 : (score / scoreMax * 100).toFixed(0);
            resultsOutput.innerText = `Загальний рахунок: ${percentage}% (${score} правильних відповідей з ${scoreMax})`;
        }
    }
}

function randint(max, min=0) {
    return min + Math.round(Math.random() * (max - min));
}