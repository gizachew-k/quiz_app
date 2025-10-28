// Quiz questions
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
            "String",
            "Boolean",
            "Number",
            "Float"
        ],
        correct: 3
    },
    {
        question: "What is the purpose of the 'alt' attribute in an image tag?",
        options: [
            "To add a title to the image",
            "To specify alternative text for screen readers",
            "To set the image alignment",
            "To define the image source"
        ],
        correct: 1
    },
    {
        question: "Which CSS property controls the space between elements?",
        options: [
            "spacing",
            "margin",
            "padding",
            "gap"
        ],
        correct: 1
    },
    {
        question: "What does the 'DOM' stand for in JavaScript?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Output Module",
            "Document Order Model"
        ],
        correct: 0
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<hyperlink>"
        ],
        correct: 1
    },
    {
        question: "What is the correct way to comment in CSS?",
        options: [
            "// This is a comment",
            "<!-- This is a comment -->",
            "/* This is a comment */",
            "# This is a comment"
        ],
        correct: 2
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: [
            "append()",
            "push()",
            "addToEnd()",
            "insert()"
        ],
        correct: 1
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    }
];

// DOM Elements
const welcomeScreen = document.querySelector('.welcome-screen');
const quizScreen = document.querySelector('.quiz-screen');
const resultsScreen = document.querySelector('.results-screen');
const startBtn = document.querySelector('.start-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const restartBtn = document.querySelector('.restart-btn');
const questionText = document.querySelector('.question-text');
const optionsContainer = document.querySelector('.options-container');
const currentQuestionEl = document.querySelector('.current-question');
const progressBar = document.querySelector('.progress');
const scoreEl = document.querySelector('.score');
const correctAnswersEl = document.querySelector('.correct-answers');
const performanceMessage = document.querySelector('.performance-message');

// Quiz state
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

// Initialize the quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers.fill(null);
    updateProgressBar();
    showQuestion();
}

// Show current question
function showQuestion() {
    const question = quizQuestions[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionEl.textContent = currentQuestion + 1;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create new options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        
        // Check if this option was previously selected
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.classList.toggle('hidden', currentQuestion === 0);
    nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question';
}

// Select an option
function selectOption(optionIndex) {
    // Remove selected class from all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    document.querySelectorAll('.option')[optionIndex].classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestion] = optionIndex;
}

// Move to next question
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgressBar();
    } else {
        calculateScore();
        showResults();
    }
}

// Move to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgressBar();
    }
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Calculate final score
function calculateScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            score++;
        }
    });
}

// Show results screen
function showResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    scoreEl.textContent = `${percentage}%`;
    correctAnswersEl.textContent = score;
    
    // Set performance message based on score
    if (percentage >= 90) {
        performanceMessage.textContent = "Excellent! You're a frontend expert!";
    } else if (percentage >= 70) {
        performanceMessage.textContent = "Great job! You have solid frontend knowledge.";
    } else if (percentage >= 50) {
        performanceMessage.textContent = "Good effort! Keep learning to improve your skills.";
    } else {
        performanceMessage.textContent = "Keep practicing! Frontend development takes time to master.";
    }
    
    // Switch to results screen
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
}

// Event listeners
startBtn.addEventListener('click', () => {
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    initQuiz();
});

nextBtn.addEventListener('click', () => {
    // Make sure an option is selected before proceeding
    if (userAnswers[currentQuestion] === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    nextQuestion();
});

prevBtn.addEventListener('click', previousQuestion);

restartBtn.addEventListener('click', () => {
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
});

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // The quiz will be initialized when the user clicks "Start Quiz"
});