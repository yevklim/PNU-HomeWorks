/**
 * Об'єкт, що буде симулює сервер.
 * Віддає тестові питання.
 * Перевіряє відповіді на питання.
 */
const Server = new (function () {
    const questions = [
        {
            text: "Державний прапор - синьо-жовтий чи жовто-блакитний?",
            type: "radio",
            answers: [
                ["синьо-жовтий", true],
                ["жовто-блакитний", false],
            ]
        },
        {
            text: "Ідентичність - це:",
            type: "radio",
            answers: [
                ["підвищення власного освітнього рівня", false],
                ["розуміння своєї унікальності, з одного боку, та відчуття належності до певної соціальної групи - з іншого", true],
                ["відчуття себе сучасною людиною", false],
            ]
        },
        {
            text: "Наріжним каменем для світогляду є:",
            type: "checkbox",
            answers: [
                ["знання про навколишній світ", true],
                ["знання про суспільство і людину", false],
                ["погляди на місце і роль людини в світі", true],
                ["погляди на місце і роль суспільства в житті людини", false],
            ]
        },
        {
            text: "На думку класиків античної філософії Платона та Аристотеля, людей спонукала філософствувати:",
            type: "checkbox",
            answers: [
                ["здивування", true],
                ["легковірність", false],
                ["допитливість", true],
                ["марнославство", false],
            ]
        },
        {
            text: "Рік народження Т.Г. Шевченка?",
            type: "number",
            answers: [
                "1814"
            ]
        }, 
        {
            text: "Прізвище останнього гетьмана української історії?",
            type: "text",
            answers: [
                "Скоропадський"
            ]
        },
    ];

    this.getQuestions = function () {
        return questions.map((question, id) => ({
            id,
            text: question.text,
            type: question.type,
            answers: !["text", "number"].includes(question.type)
                ? question.answers.map(
                    answer => Array.isArray(answer)
                    ? answer[0]
                    : answer
                ) : []
        }));
    };

    this.verifyAnswers = function (answeredQuestions) {
        const results = [];
        for (const { id, answers } of answeredQuestions) {
            const question = questions[id];
            const score = rateQuestionAnswers(question, answers);
            results.push({ id, text: question.text, score });
        }
        return results;
    };

    function rateQuestionAnswers(question, answers) {
        switch (question.type) {
            case "radio":
            case "checkbox": {
                const answers_count = answers.length;
                const [
                    correct_answers_count,
                    correct_variants_count
                ] = question.answers.reduce((
                    [correct_answers_count, correct_variants_count],
                    [answer, is_correct]
                ) => {
                    return [
                        correct_answers_count + (is_correct && answers.includes(answer)),
                        correct_variants_count + is_correct
                    ];
                }, [0, 0]);
                const k = correct_answers_count * 2 - answers_count;
                if (k <= 0) {
                    return 0;
                }

                return k / correct_variants_count;
            }
            case "number":
            case "text": {
                return +question.answers.includes(answers[0]);
            }
        }
    }
});

renderQuestions(
    Server.getQuestions(),
    document.querySelector(".questions")
);

document.getElementById("btnTurnIn").addEventListener("click", turnIn);

function renderQuestions(questionsArray, questionsRootElement) {
    questionsRootElement.append(...questionsArray.map(renderQuestion));
}

/**
 * Функція, що перетворює JSON питання на HTML елемент
 */
function renderQuestion(question) {
    const questionName = `question-${question.id}`;
    switch (question.type) {
        case "radio":
        case "checkbox": {
            const div = document.createElement("div");
            div.classList.add("question");
            div.setAttribute("question-id", question.id);

            const text_span = document.createElement("span");
            text_span.classList.add("question-text");
            text_span.innerText = question.text;

            const answers_span = document.createElement("span");
            answers_span.classList.add("question-answers");

            const answers = question.answers.map(answer => {
                const answer_label = document.createElement("label");
                answer_label.classList.add("question-answer");
                const answer_input = document.createElement("input");
                answer_input.type = question.type;
                answer_input.name = questionName;
                answer_input.value = answer;
                answer_label.append(answer_input, answer);
                return answer_label;
            });
            answers_span.append(...answers);

            div.append(text_span, answers_span);
            return div;
        }
        case "text":
        case "number": {
            const label = document.createElement("label");
            label.classList.add("question");
            label.setAttribute("question-id", question.id);

            const text_span = document.createElement("span");
            text_span.classList.add("question-text");
            text_span.innerText = question.text;

            const answers_span = document.createElement("span");
            answers_span.classList.add("question-answers");

            const answer_input = document.createElement("input");
            answer_input.type = question.type;
            answer_input.name = questionName;
            answers_span.append(answer_input);

            label.append(text_span, answers_span);
            return label;
        }
    }
}

function getAnswers() {
    return Array.from(document.querySelectorAll(".question"))
        .map(question => ({
            id: +question.getAttribute("question-id"),
            answers: Array.from(question.querySelectorAll(`
                .question-answers input[type=text],
                .question-answers input[type=number],
                .question-answers input[type=radio]:checked,
                .question-answers input[type=checkbox]:checked
            `)).map(input => input.value)
        }));
}

function turnIn(e) {
    e.preventDefault();
    const answers = getAnswers();
    const results = Server.verifyAnswers(answers);
    renderResults(results);
}

function renderResults(results) {
    const table = document.getElementById("results");
    table.innerHTML = "";
    const headerRow = document.createElement("tr");
    headerRow.append(
        ...["#", "Питання", "Правильність, %"].map(
            text => {
                const th = document.createElement("th");
                th.innerText = text;
                return th;
            }
        )
    )
    const rows = results.map(
        ({id, text, score}) => {
            const row = document.createElement("tr");
            row.append(
                ...[id + 1, text, Math.round(score * 100)].map(
                    text => {
                        const td = document.createElement("td");
                        td.innerText = text;
                        return td;
                    }
                )
            )
            return row;
        }
    );
    const scoreSum = results.reduce((scoreSum, {score}) => {
        return scoreSum + score;
    }, 0);
    const total = Math.round(scoreSum / results.length * 100);
    const footerRow = document.createElement("tr");
    footerRow.append(
        ...["", "", total].map(
            text => {
                const th = document.createElement("th");
                th.innerText = text;
                return th;
            }
        )
    );
    table.append(
        headerRow,
        ...rows,
        footerRow
    );
}