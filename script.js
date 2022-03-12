// Time set in seconds
let currentQuestionIndex = null
let timer = null
let remainingTime = 60
let playerScore = 0

// Quiz questions with correct answers from 0-3
let questions = [{
        questionText: 'Commonly used data types DO NOT include:',
        answers: [
            'strings', 'booleans', 'alerts', 'numbers'
        ],
        correctAnswer: 2
    },
    {
        questionText: 'The condition in an if / else statement is enclosed within _____.',
        answers: [
            'quotes', 'curly brackets', 'parentheses', 'square brackets'
        ],
        correctAnswer: 2
    },
    {
        questionText: 'Arrays in JavScript can be used to store______.',
        answers: [
            'numbers and strings', 'other arrays', 'booleans', 'all of the above'
        ],
        correctAnswer: 3
    },
    {
        questionText: 'String values must be enclosed within _______ when being assigned to variables.',
        answers: [
            'commas', 'quotes', 'curly brackets', 'parentheses'
        ],
        correctAnswer: 1
    },
    {
        questionText: 'Which of the following is a very useful tool used during development for printing content to the debugger?',
        answers: [
            'console.log', 'terminal / bash', 'for loops', 'JavaScript'
        ],
        correctAnswer: 0
    }
]

// Function to show remaining time, stop timer and display high scores
let tick = function() {
    remainingTime--
    if (remainingTime <= 0) {
    
        endGame();
    }
    let displayTime = document.getElementById('timer-display');
    if (displayTime) {
        displayTime.textContent = remainingTime;
    }
}

// Function to Start Quiz and Show Next Question

function startQuiz(event) {

    document.getElementById('start-btn').style.display = "none";
    document.getElementById('instructions').style.display = "none";

    currentQuestionIndex = 0;

    showNextQuestion();

    document.getElementById('questions').style.display = "block";
    document.getElementById('answers').style.display = "block";

    timer = setInterval(tick, 1000);
}

// Function to respond to user after answer is selected, for correct answer, increase in user's score, or decrease timer by 5 seconds remaining for each incorrect answer
function answerClick(event) {

    let answerId = event.target.id;
    
    let answerIndex = parseInt(answerId.substring(6)) - 1;

    let correctAnswerIndex = questions[currentQuestionIndex].correctAnswer;

    if (answerIndex === correctAnswerIndex) {
        document.getElementById('feedback').textContent = "You chose the right answer!";
        playerScore = playerScore + 1;
    } else {
        document.getElementById('feedback').textContent = "Sorry!! You chose the wrong answer! -5 seconds from timer";
        remainingTime = remainingTime - 5;
    }
        currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
    
        endGame();
    } else {
        
        showNextQuestion();
    }
}

// Function to continue quiz and show next question
function showNextQuestion() {

    let question = questions[currentQuestionIndex];

    document.getElementById('questions').textContent = question.questionText;
    document.getElementById('answer1').textContent = question.answers[0];
    document.getElementById('answer2').textContent = question.answers[1];
    document.getElementById('answer3').textContent = question.answers[2];
    document.getElementById('answer4').textContent = question.answers[3];
}

function endGame() {
    if (timer) {
        stopTimer(timer);
    }
    // Hide questions, answers and feedback for user's performance
    document.getElementById('questions').style.display = "none";
    document.getElementById('answers').style.display = "none";
    document.getElementById('feedback').style.display = "none";

    // shows input to enter player initials and player scores
    document.getElementById('initials').style.display = "block";
}

function submitYourScore() {
    // Prompt user for initials input to submit the user's score on the leaderboard

    let name = document.getElementById("myText").value;

    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({
        name: name,
        score: playerScore
    })
    // Save scores in localstorage
    localStorage.setItem("scores", JSON.stringify(scores));
    showHiScores(scores);
}

// Function to display high scores
function showHiScores(playerScoreList) {

    let playerDiv = document.createElement('div')
    playerDiv.textContent = 'Player Scores'

    let listWrapper = document.createElement('ol')

    for (let i = 0; i < playerScoreList.length; i++) {
        let thisScore = playerScoreList[i]
        let listElement = document.createElement('li')

        listElement.textContent = `${thisScore.name} --- ${thisScore.score}`

        listWrapper.appendChild(listElement)

    }

    document.getElementById("scores").textContent = "";

    document.getElementById("scores").appendChild(playerDiv);

    document.getElementById("scores").appendChild(listWrapper);

    document.getElementById('timer-display').style.display = "none";
}


document.getElementById('start-btn').addEventListener("click", startQuiz);

    let answerButtons = document.querySelectorAll('.answer-button');

    for (let i = 0; i < answerButtons.length; i++) {

        answerButtons[i].addEventListener("click", answerClick);
}

document.getElementById('submitScore').addEventListener("click", submitYourScore);