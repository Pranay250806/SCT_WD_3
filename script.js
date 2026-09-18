const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Chennai", "Hyderabad"],
        answer: "New Delhi"
    },
    {
        question: "Which language is mainly used to structure web pages?",
        options: ["CSS", "JavaScript", "HTML", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "Java", "C"],
        answer: "CSS"
    },
    {
        question: "Which language is used to add interactivity to web pages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing Utility"
        ],
        answer: "Central Processing Unit"
    },
    {
        question: "Which data structure follows the LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        answer: "Stack"
    },
    {
        question: "Which data structure follows the FIFO principle?",
        options: ["Stack", "Tree", "Queue", "Graph"],
        answer: "Queue"
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: ["<!--", "//", "/*", "#"],
        answer: "//"
    },
    {
        question: "Which method is used to print output in the browser console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "write()"
        ],
        answer: "console.log()"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<href>", "<a>", "<url>"],
        answer: "<a>"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("score");
const question = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const result = document.getElementById("result");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    question.textContent = current.question;

    optionsContainer.innerHTML = "";

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    current.options.forEach(option => {

        const button = document.createElement("button");

        button.classList.add("option");
        button.textContent = option;

        button.addEventListener("click", () => {
            selectAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });
}

function selectAnswer(button, selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(option => {

        option.disabled = true;

        if (option.textContent === correctAnswer) {
            option.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {

        button.classList.add("correct");
        score++;

        scoreDisplay.textContent = `Score: ${score}`;

    } else {

        button.classList.add("wrong");
    }
}

nextBtn.addEventListener("click", () => {

    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
});

function showResult() {

    question.style.display = "none";
    optionsContainer.style.display = "none";
    nextBtn.style.display = "none";
    questionNumber.style.display = "none";
    scoreDisplay.style.display = "none";

    result.classList.remove("hidden");

    finalScore.textContent =
        `Your Score: ${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    question.style.display = "block";
    optionsContainer.style.display = "flex";
    nextBtn.style.display = "block";
    questionNumber.style.display = "inline";
    scoreDisplay.style.display = "inline";

    result.classList.add("hidden");

    loadQuestion();
});

loadQuestion();