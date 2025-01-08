const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
    marked: false,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    marked: false,
  },
  {
    id: 3,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    answer: "Harper Lee",
    marked: false,
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
    marked: false,
  },
  {
    id: 5,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
    marked: false,
  },
  {
    id: 6,
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "HO"],
    answer: "H2O",
    marked: false,
  },
  {
    id: 7,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
    marked: false,
  },
  {
    id: 8,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: "Diamond",
    marked: false,
  },
  {
    id: 9,
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    answer: "300,000 km/s",
    marked: false,
  },
  {
    id: 10,
    question: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    answer: "Albert Einstein",
    marked: false,
  },
];

const menuPage = document.querySelector(".menu");
const game = document.querySelector(".game-container");
const startButton = document.querySelector(".start-btn");
const nextButton = document.querySelector(".nxt-question");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const prevButton = document.querySelector(".prev-question");

let optionChoosed = "";

let count = 0;
let score = 0;

function randomQuestion() {
  let quesNumber = Math.floor(Math.random() * 10);

  const question = quizQuestions[quesNumber];

  if (question.marked) {
    return randomQuestion();
  } else {
    question.marked = true;
    return question;
  }
}

function gameOn() {
  options.innerHTML = "";
  questionSet = randomQuestion();
  console.log(questionSet);

  question.textContent = `${count + 1}. ${questionSet.question}`;

  questionSet.options.map((option, index) => {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.id = `option-${index}`;
    radio.value = option;

    const label = document.createElement("label");
    label.htmlFor = `option-${index}`;
    label.textContent = option;

    options.appendChild(radio);
    options.appendChild(label);
  });

  const optionSelect = document.querySelectorAll("input[type='radio']");

  optionSelect.forEach((radioButton) => {
    radioButton.addEventListener("click", (e) => {
      optionChoosed = e.target.value; // Store the selected option
    });
  });

  prevButton.addEventListener("click", prevQuestion);

  nextButton.addEventListener("click", nextQuestion);
}

function prevQuestion() {
  // use stack to implement these function :)
  if (optionChoosed === quizQuestions[count].answer) {
    score++;
  }
  console.log(score);

  if (count < quizQuestions.length - 1 && count > 0) {
    count--;
    gameOn();
  }
}

function nextQuestion() {
  if (optionChoosed === quizQuestions[count].answer) {
    score++;
  }
  // console.log(score);

  if (count < quizQuestions.length - 1) {
    count++;
    gameOn();
  } else {
    // console.log(score)
    endGame();
  }
}

function endGame() {
  game.innerHTML = ` <h2>Score:${score}/${quizQuestions.length}</h2>
      <button class="reset">Reset</button>`;
  const resetButton = document.querySelector(".reset");

  resetButton.addEventListener("click", () => {
    // quizQuestions = quizQuestions.slice(4,8) + quizQuestions.slice(0,4)+quizQuestions.slice(8,11);
    location.reload();
    // console.log(quizQuestions);
  });
}

startButton.addEventListener("click", () => {
  menuPage.style.display = "none";
  game.style.display = "block";

  gameOn();
});
