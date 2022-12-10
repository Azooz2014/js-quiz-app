const data = [
  {
    id: 1,
    question: "Which of these fish is actually a fish?",
    answers: [
      { answer: "swordfish", isCorrect: true },
      { answer: "jellyfish", isCorrect: false },
      { answer: "starfish", isCorrect: false },
      { answer: "crayfish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of:",
    answers: [
      { answer: "bees", isCorrect: false },
      { answer: "penguins", isCorrect: false },
      { answer: "butterflies", isCorrect: true },
      { answer: "camels", isCorrect: false },
    ],
  },
  {
    id: 1,
    question: "A group of which animals is referred to as a wake?",
    answers: [
      { answer: "bats", isCorrect: false },
      { answer: "vultures", isCorrect: true },
      { answer: "ants", isCorrect: false },
    ],
  },
];

const gameContainer = document.querySelector(".game");
const answersContainer = document.querySelector(".answers");
const resultContainer = document.querySelector(".result");
const questionText = document.querySelector(".question");
const correctText = document.querySelector(".correct");
const wrongText = document.querySelector(".wrong");
const scoreText = document.querySelector(".score");
const submitBtn = document.querySelector(".submitBtn");
const playBtn = document.querySelector(".playBtn");

let questionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let totalScore = 0;
let selectedAnswer;

const getQuestion = (questionNumber) => {
  if (questionNumber === data.length) return showResult();
  selectedAnswer = null;
  questionText.textContent = data[questionNumber]?.question;
};

const getAnswers = (questionNumber) => {
  answersContainer.innerHTML = data[questionNumber]?.answers
    .map(
      (item, index) =>
        `
        <div class="answer">
              <input type="radio" name="Answer" id="${index}" value="${item.isCorrect}" />
              <label for="${index}">${item.answer}</label>
            </div>
        `
    )
    .join("");
  handleAnswerInput();
};

const startGame = (questionNumber) => {
  getQuestion(questionNumber);
  getAnswers(questionNumber);
};

const handleAnswerInput = () => {
  answersContainer.querySelectorAll("input").forEach((input) => {
    input.addEventListener("click", (event) => {
      selectedAnswer = event.target.value;
    });
  });
};

const submitAnswer = () => {
  submitBtn.addEventListener("click", () => {
    if (selectedAnswer !== null) {
      selectedAnswer === "true" ? correctCount++ : wrongCount++;
      questionIndex++;
      startGame(questionIndex);
    } else alert("Select Answer please!");
  });
};

const showResult = () => {
  resultContainer.style.display = "block";
  gameContainer.style.display = "none";

  correctText.textContent = `Correct Answers: ${correctCount}`;
  wrongText.textContent = `Wrong Answers: ${wrongCount}`;
  scoreText.textContent = `Score: ${(correctCount - wrongCount) * 10}`;
};

const resetGame = () => {
  questionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  totalScore = 0;
  startGame(questionIndex);
};

const playAgain = () => {
  playBtn.addEventListener("click", () => {
    gameContainer.style.display = "block";
    resultContainer.style.display = "none";
    resetGame();
  });
};

startGame(questionIndex);
submitAnswer();
playAgain();
