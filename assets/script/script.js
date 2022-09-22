const question = document.getElementById('question');
const a = document.getElementById('a+');
const b = document.getElementById('b+');
const c = document.getElementById('c+');
const d = document.getElementById('d+');
var btn = document.getElementById('submit');
const all_answer = document.querySelectorAll('.answers');
const Timer_Text= document.getElementsByClassName(`timer-text`)[0];


/*quiz information */
const quizData = [
    {
      question: 'Read directions, when ready to start select go and click submit',
      a: 'bored',
      b: 'go',
      c: 'no',
      d: `yes`,
      correct: 'b',
    },  
  {
      question: 'How many kids does Aaron have ?',
      a: '1',
      b: '2',
      c: '3',
      d: `4`,
      correct: 'b',
    },
    {
      question: 'How old is Gary ?',
      a: '25',
      b: '35',
      c: '56',
      d: `to old`,
      correct: 'c',
    },
    {
      question: 'What color is the Sea ?',
      a: 'Green ',
      b: 'Blue ',
      c: 'Red ',
      d: `Yellow `,
      correct: 'b',
    },
    {
      question: 'What is Garys degree in?',
      a: 'English ',
      b: 'Under water basket weaving ',
      c: 'Coding ',
      d: 'He doesnt have one',
      correct: 'a',
    },
  ];

let index = 0;
let score = 0;

function selectans() {
  let ans = undefined;
  all_answer.forEach((el) => {
    if (el.checked) {
      ans = el.id;
    }
  });
  return ans;
}

function unselectans() {
  all_answer.forEach((el) => {
    el.checked = false;
  });
}

function getquiz() {
  unselectans();
  question.innerText = quizData[index].question;
  a.innerText = quizData[index].a;
  b.innerText = quizData[index].b;
  c.innerText = quizData[index].c;
  d.innerText = quizData[index].d;
}

var timer= null;
var timerCount= 60;
function startTimer(){
  timer= setInterval(function() {
    timerCount--;
    if(timerCount === 0) { 
      clearInterval(timer);
    }
    Timer_Text.innerHTML=timerCount;
  }, 1000);
}
console.log(timerCount)
btn.addEventListener("click", function(event) {
  startTimer();
});

console.log(timer)

function startquiz() {
  btn.addEventListener('click', () => {
    let ans = selectans();
    if (ans) {
      if (ans == quizData[index].correct) {
        score++;
      }
    }
    index++;
    if (index < quizData.length) {
      getquiz();
    } else {
      alert('score :' + score);
      location.reload();
    }
  });
}
getquiz();
startquiz();




