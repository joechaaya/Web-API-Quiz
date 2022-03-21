// start button variables
var startBtn = document.querySelector("#startBtn");
var displayQuestion = document.getElementById("quizArea");
var displayScoreAndName = document.getElementById("scoreNameInput");

// variables for time and score
var score = 0;
var timeRemaining = 0;
var currentQuestion = -1;

//questions and answers
var questionsArr = [
    {
      question: "What does HTML stand for?",
      choices: ["HyperText Markup Language", 
      "Hairy things move low", 
      "Helping the movers listen", 
      "HyperText Multiple Lists"],
      answer: "HyperText Markup Language",
    },
    {
      question: "What does CSS stand for",
      choices: [
        "Clearly Strong Students",
        "Creating Simple Structure",
        "Cascading Style Sheets",
        "Calling Style Sheets"],
      answer: "Cascading Style Sheets",
    },
    {
      question:
        "Which Tag is used to create an ordered list?",
      choices: [
        "Hr",
        "Ol",
        "Br",
        "H1"],
      answer: "Ol",
    },
    {
      question: "Which heading level displays the largest text size",
      choices: ["h1", 
                "h2", 
                "h5", 
                "h6"],
      answer: "h1",
    },
    {
      question: 'How do you display "Hello World" in an alert box?',
      choices: [
        'msg("Hello World");',
        'alertbox("Hello World");',
        'alert("Hello World");',
        'msgbox("Hello World");',
      ],
      answer: 'alert("Hello World");',
    },
  ];

 // displays score leader
  window.onload = function () {
    var scoreAndNameInput = localStorage.getItem("scoreNameInput");
  
    if (!scoreAndNameInput) {
      displayScoreAndName.textContent = "N/A";
    } else {
      displayScoreAndName.textContent = scoreAndNameInput;
    }
  };

  // starts quiz
  function startQuiz() {
    timeRemaining = 60;
    timer = setInterval(function () {
      document.getElementById("timer").innerHTML = timeRemaining;
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(timer);
        document.getElementById("timer").textContent = "0";
        endQuiz();
      }
    }, 1000);
  
    startBtn.remove();
    startQuestions();
  }

  // displays questions after start of quiz
  function startQuestions() {
    currentQuestion++;
  
    if (currentQuestion < questionsArr.length && timeRemaining > 0) {
      displayQuestion.innerHTML = questionsArr[currentQuestion].question;
      createChoicesBtns();
    } else {
      endQuiz();
    }
  };

  //displays multiple answer choices for question
  function createChoicesBtns() {
    var btnsDiv = document.createElement("div");
    console.log(score);
  
    for (var i = 0; i < questionsArr[currentQuestion].choices.length; i++) {
      var choicesBtn = document.createElement("button");
      choicesBtn.className = "button";
      choicesBtn.textContent = questionsArr[currentQuestion].choices[i];
      btnsDiv.appendChild(choicesBtn);
      displayQuestion.append(btnsDiv);
      choicesBtn.setAttribute("onclick", "answerVerify(questionsArr[currentQuestion].answer, event.target.textContent)");
    };
  };

  // checks if answer is correct
  function answerVerify(answer,userChoice) {
    if (answer == userChoice) {
      score = score + 20;
    } else {
      incorrect();
    }
    startQuestions();
  };

  //subtracts time if incorrect answer is input
  var incorrect = function() {
    timeRemaining -= 10; 
    return;
  };

  //ends quiz
  function endQuiz() {
    timeRemaining = 0;
  
    displayQuestion.innerHTML =
      "<h2>Thank you for playing!</h2><h3>You've achieved a score of " +
      score +
      "/100!</h3><div><input type=text id='name' placeholder='Enter Initials Here'><button class='button' id='scoreBtn' onclick='saveScore()'>Submit Score</button></div>";
  };

  //saves score to local storage
  function saveScore() {
    localStorage.setItem("scoreNameInput", document.getElementById("name").value + " " + score+"pts");
    location.reload();
  };

  //event listener to listen for click on start quiz
  startBtn.addEventListener("click", startQuiz);