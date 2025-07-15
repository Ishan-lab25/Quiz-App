const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Earth", "Jupiter"],
    answer: 0,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Tolstoy", "Homer", "Dickens"],
    answer: 0,
  },
  {
    question: "What is 5 + 3?",
    options: ["6", "8", "7", "9"],
    answer: 1,
  },
  {
    question: "Largest ocean on Earth?",
    options: ["Indian", "Atlantic", "Arctic", "Pacific"],
    answer: 3,
  },
  {
    question: "What is H2O?",
    options: ["Salt", "Hydrogen", "Water", "Oxygen"],
    answer: 2,
  },
  {
    question: "Fastest land animal?",
    options: ["Cheetah", "Lion", "Horse", "Ostrich"],
    answer: 0,
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: 2,
  },
  {
    question: "HTML stands for?",
    options: ["HyperText Markup Language", "HighText Marking Language", "HyperTransfer Markup Language", "None"],
    answer: 0,
  },
  {
    question: "CSS is used for?",
    options: ["Structure", "Design", "Logic", "Database"],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <h2 class="text-xl sm:text-2xl font-semibold mb-4">${q.question}</h2>
    <div id="options" class="grid gap-3">
      ${q.options
        .map(
          (opt, i) =>
            `<button class="option bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 py-2 px-4 rounded-xl border border-gray-300 transition-all duration-200" data-index="${i}">${opt}</button>`
        )
        .join("")}
    </div>
  `;
  document.querySelectorAll(".option").forEach((btn) =>
    btn.addEventListener("click", handleAnswer)
  );
}

function handleAnswer(e) {
  const selected = parseInt(e.target.dataset.index);
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    e.target.classList.remove("bg-gray-200");
    e.target.classList.add("bg-green-400", "text-white", "font-semibold");
    score++;
    scoreDisplay.textContent = score;
  } else {
    e.target.classList.remove("bg-gray-200");
    e.target.classList.add("bg-red-400", "text-white", "font-semibold");
    document
      .querySelector(`.option[data-index="${correct}"]`)
      .classList.add("bg-green-400", "text-white", "font-semibold");
  }

  document.querySelectorAll(".option").forEach((btn) => (btn.disabled = true));

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      quizContainer.innerHTML = `<h2 class="text-center text-2xl font-bold text-purple-700">🎉 Quiz Completed! 🎉<br><span class="block mt-2 text-lg">Your Score: ${score}/${questions.length}</span></h2>`;
      restartBtn.classList.remove("hidden");
    }
  }, 1000);
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreDisplay.textContent = score;
  restartBtn.classList.add("hidden");
  showQuestion();
});

showQuestion();
