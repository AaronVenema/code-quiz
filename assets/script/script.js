var resultsEl = document.getElementById("result");
var questionsEl = document.getElementById("questions");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");
var startButton = document.getElementById("startBtn");
var startQuizDiv = document.getElementById("startPg");
var quizTimer = document.getElementById("timer");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("hsS")
var hsCont = document.getElementById("hsCont");
var hsPg = document.getElementById("hsPg");
var highscoreInputName = document.getElementById("initials");
var hsInit = document.getElementById("hsInit");
var endBtns = document.getElementById("endBtns");
var submitScoreBtn = document.getElementById("submitScore");
var hsS = document.getElementById("hsS");
var fSEl = document.getElementById("fS");
var gameoverDiv = document.getElementById("gameover");
var quizBody = document.getElementById("quiz");
/*quiz information */
var quizData = [
    {
      question: "Who's Garys favorite student?",
      a: "Joe",
      b: "Julia",
      c: "Aaron",
      d: "Tyler",
      correctAnswer: "b",
    },  
  {
      question: "How many kids does Aaron have ?",
      a: "1",
      b: "2",
      c: "3",
      d: "4",
      correctAnswer: "b",
    },
    {
      question: "How old is Gary ?",
      a: "25",
      b: "35",
      c: "56",
      d: "to old",
      correctAnswer: "c",
    },
    {
      question: "What color is the Sea ?",
      a: "Green",
      b: "Blue",
      c: "Red",
      d: "Yellow",
      correctAnswer: "b",
    },
    {
      question: "What is Garys degree in?",
      a: "English",
      b: "Under water basket weaving",
      c: "Coding",
      d: "He doesnt have one",
      correctAnswer: "a",
    },
    {
      question: "What is Garys alcohol of choice?",
      a: "Malt liquor",
      b: "Coors",
      c: "All of them",
      d: "Tequila",
      correctAnswer: "d",
    },
    {
      question: "Whos going to pass this bootcamp?",
      a: "No one",
      b: "Not Julia",
      c: "Everybody",
      d: "Just Joe",
      correctAnswer: "c",
    },
  ];
  var finalQuestionIndex = quizData.length;
  var currentQuestionIndex = 0;
  var score = 0;
  var correct;
  var timerInterval;
  var timeLeft= 60;

function generateQuestion(){
  gameoverDiv.style.display = "none";
  if(currentQuestionIndex === finalQuestionIndex){
    return showScore();
  } 
  var currentQuestion = quizData[currentQuestionIndex];
      questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
      btnA.innerHTML = currentQuestion.a;
      btnB.innerHTML = currentQuestion.b;
      btnC.innerHTML = currentQuestion.c;
      btnD.innerHTML = currentQuestion.d;
};

function startQuiz(){
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  generateQuestion();

timerInterval = setInterval(function() {
  timeLeft--;
  quizTimer.textContent = "Time left: " + timeLeft;
  if(timeLeft === 0) {
    clearInterval(timerInterval);
    showScore();
  }
}, 1000);
quizBody.style.display = "flex";
}

function showScore(){
  quizBody.style.display = "none"
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  fSEl.innerHTML = "You got " + score + " out of " + quizData.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){    
  if(highscoreInputName.value === "") {
      alert("Must provide name");
      return false;
  }else{
      var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
      var currentUser = highscoreInputName.value.trim();
      var currentHighscore = {
          name : currentUser,
          score : score
      };
      gameoverDiv.style.display = "none";
      hsCont.style.display = "flex";
      hsPg.style.display = "flex";
      endBtns.style.display = "flex";
      savedHighscores.push(currentHighscore);
      localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
      generateHighscores();
  } 
});

function generateHighscores(){
  hsInit.innerHTML = "";
  hsS.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i=0; i<highscores.length; i++){
      var newNameSpan = document.createElement("li");
      var newScoreSpan = document.createElement("li");
      newNameSpan.textContent = highscores[i].name;
      newScoreSpan.textContent = highscores[i].score;
      hsInit.appendChild(newNameSpan);
      hsS.appendChild(newScoreSpan);
  }
}
function showHighscore(){
  startQuizDiv.style.display = "none"
  gameoverDiv.style.display = "none";
  hsCont.style.display = "flex";
  hsPg.style.display = "flex";
  endBtns.style.display = "flex";

  generateHighscores();
}
// Clears scores and local storage
function clearScore(){
  window.localStorage.clear();
  hsInit.textContent = "";
  hsS.textContent = "";
}

// replay this quiz
function replayQuiz(){
  hsCont.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}
// Function checks answer in HTML
function checkAnswer(answer){
  correct = quizData[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
      score++;
      alert("That Is Correct!");
      currentQuestionIndex++;
      generateQuestion();
      //displays the answer is correct.
  }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
      alert("That Is Incorrect.")
      currentQuestionIndex++;
      timeLeft-=5;
      generateQuestion();
      //displays the answer is wrong.
  }else{
      showScore();
  }
}
startButton.addEventListener("click",startQuiz);