var questions;
var joke;
var quote;

//Find question and answers pane and the submit button
var answersDiv = document.getElementById("answers");
var questionDiv = document.getElementById("question");
var button = document.getElementById("button1");

//Hide answer section
answersDiv.style.visibility = "hidden";
answersDiv.innerHTML = "";

button.addEventListener("click", checkResult);

//Init state
var state = {
    nextQuestion: -1,
    correctAnswers: 0
};

// Defines how the url will be constructed
var assembleQuery1 = parameters => {
    var query_string = [];
    for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            var param_string = key + "=" + encodeURIComponent(parameters[key]);
            query_string.push(param_string);
        }
    }

    // Calls to construct url
    return query_string.join("&");
};

// Shuffles an array randomly
function shuffle(a) {
    for (var counter = a.length; counter > 0;) {
        var target = Math.floor(Math.random() * counter);
        counter--;
        var nextOne = a[counter];
        a[counter] = a[target];
        a[target] = nextOne;
    }
}

// Reload data
function reloadData() {
    console.log("loading data");
    // Code to assemble api link request correctly
    var url = "https://opentdb.com/api.php";
    let params = {
      amount: "5"
    };

    var query_url = url + "?" + assembleQuery1(params);
    console.log(query_url);

    fetch(query_url)
        .then(response => response.json())
        // Creates a new function to store an array of questions
        .then(data => {
            questions = new Array();
            for (var i in data.results) {
                // Grabs a question
                var question = data.results[i];
                var q = new Array();
                for (var j in question.incorrect_answers) {
                    // pushes incorrect answers into a new array
                    q.push({
                        correct: 0,
                        value: question.incorrect_answers[j]
                    });
                }
                q.push({
                    correct: 1,
                    value: question.correct_answer
                });
                // shuffles answers so correct answer isn't always in the same place
                shuffle(q);
                // after shuffling push into an object with a question and an array of answers
                questions.push({
                    question: question.question,
                    answers: q
                });
            }

            shuffle(questions);
        });

    // code to request dad joke api
    query_url = "https://icanhazdadjoke.com/";
    console.log(query_url);
    var request = new Request(query_url, {
        headers: new Headers({
            'Accept': 'text/plain'
        })
    });

    fetch(request)
        .then( response => response.text())
        .then(data => {
            joke = data;
            console.log(data);
        });

    // The link as been altered so that the error was bypassed
    url = "https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts";
    params = {
        "filter[orderby]": "rand",
        "filter[posts_per_page]": "1"
    };

    query_url = url + "?" + assembleQuery1(params);
    console.log(query_url);

    fetch(query_url)
        .then(response => response.json())
        .then(data => {
            var results = data;
            console.log(results);
            quote = {
                author: results[0].title,
                quote: results[0].content

            };
        });

    state = {
        nextQuestion: -1,
        correctAnswers: 0
    };
}

// This function makes sure that the quiz continues
// until the question limit is reached (5).
// Then the quiz will end
function nextQuestion() {
    // Advance
    state.nextQuestion++;

    // All done, no more questions
    if (state.nextQuestion >= questions.length) {

        // Hide answers section
        answersDiv.style.visibility = "hidden";
        answersDiv.innerHTML = "";

        // If 4 or 5 correct answers -- pass
        if (state.correctAnswers > 3) {
            questionDiv.innerHTML = joke;
            button.value = "Good Job! Play Again?";
        }
        // If 3 or less incorrect answers -- fail
        else {
            questionDiv.innerHTML = quote.quote + "<br><br>" + quote.author;
            button.value = "You Suck. Play Again?"
        }

        // Get new data
        reloadData();
    } else {
        // First Question, make sure answers are visible and button says NEXT
        if (state.nextQuestion === 0) {
            state.correctAnswers = 0;
            answersDiv.style.visibility = "visible";
            button.value = "NEXT";
        }
        //Last question -- Make sure the button is SUBMIT
        else if (state.nextQuestion === questions.length - 1) {
            button.value = "SUBMIT";
        }

        //Set the question
        questionDiv.innherHTML = questions[state.nextQuestion].question;

        //Create HTML for answers
        var radioHtml = '<table>';
        for (var i in questions[state.nextQuestion].answers) {
            radioHtml += '<tr><td><input type="radio" name="answerValue" value="' + i + '"';
            //The First answer is always checked
            if (i === "0") {
                radioHtml += ' checked="checked"';
            }

            radioHtml += '/><span>' + questions[state.nextQuestion].answers[i].value + '</span></label></td></tr>';
        }
        radioHtml += "</table>";
        answersDiv.innerHTML = radioHtml;
    }
}

function checkResult() {
    if (state.nextQuestion < questions.length - 1 && state.nextQuestion >= 0) {
        console.log("another answer");
        var answers = document.getElementsByName("answerValue");
        var selectedAnswer;

        for (var i in answers) {
            if (answers[i].checked) {
                selectedAnswer = answers[i].value;
            }
        }

        if (questions[state.nextQuestion].answers[selectedAnswer].correct) {
            state.correctAnswers++;
        }
    } else {
        console.log("Not an answer");
    }

    nextQuestion();
}

 questionDiv.innerHTML = "Answer at least 4 questions correctly and you will be rewarded with a dad joke. &nbsp; &nbsp; &nbsp; <br><br> Answer at least 3 inccorectly and you will be punished with an inspirational quote. <br><br>";
 button.value = "LET'S PLAY";
 // b.style.fontsize = "40px";
 // b.style.paddingtop = "0px";
 // b.style.paddingbottom = "0px";

console.log("Loading data");
//Get new data
reloadData();
