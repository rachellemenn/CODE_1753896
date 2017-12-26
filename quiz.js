var questions;
var state;
var joke;
var quote;

// Defines how the url will be constructed
var assembleQuery1 = function(parameters) {
  var query_string = [];
  for (var key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      var param_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
      query_string.push(param_string);
    }
  }

  // Calls to construct url
  return query_string.join("&");
}

// Shuffles an array randomly
function shuffle(a) {
  var counter;
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
  }

  var query_url = url + "?" + assembleQuery1(params);
  console.log(query_url);

  fetch(query_url)
    .then(function(response) {
      return response.json();
    })
    // Creates a new function to store an array of questions
    .then(function(data) {
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
      // console.log(data);
      shuffle(questions);
      // console.log(questions);
      // NextQuestion();
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
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      joke = data;
      console.log(data);
    });

  // The link as been altered so that the error was bypassed
  url = "https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts";
  params = {
    filterId: "randID",
    filteOrderBy: "rand",
    filterPostsPerPage: "20",
    cache: false
  };

  query_url = url + "?" + assembleQuery1(params);
  console.log(query_url);

  fetch(query_url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var results = data;
      console.log(results);
      quote = {
        author: results[0].title,
        quote: results[0].content

      };
    })

  state = {
    nextQuestion: -1,
    correctAnswers: 0
  }
}

// This function makes sure that the quiz continues
// until the question limit is reached (5).
// Then the quiz will end
function nextQuestion() {
  // Advance
  state.nextQuestion++;

  // All done, no more questions
  if (state.nextQuestion >= questions.length) {

    // Find and hide answers section
    var a = document.getElementById("answers");
    a.style.visibility = "hidden";

    // Find question pane and the button
    var q = document.getElementById("question");
    var b = document.getElementById("button1");

    // If 4 or 5 correct answers - we passed
    if (state.correctAnswers > 3) {
      q.innerHTML = joke;
      b.value = "Good Job! Play Again?"
      // document.getElementById("answers").appendChild(document.getElementById(button)
      //  );
    }
    // 3 or less -- failed
    else {
      q.innerHTML = quote.quote + "<br><br>" + quote.author;
      b.value = "You Suck. Play Again?"
      // document.getElementById("answers").appendChild(document.getElementById(button)
      //  );
    }

    // Get new data
    reloadData();
  } else {
    // First Question, make sure answers are visible and button says NEXT
    if (state.nextQuestion === 0) {
      state.correctAnswers = 0;
      var a = document.getElementById("answers");
      a.style.visibility = "visible";
      var b = document.getElementById("button1");
      b.value = "NEXT";
    }
    //Last question -- Make sure the button is SUBMIT
    else if (state.nextQuestion == questions.length - 1) {
      var b = document.getElementById("button1");
      b.value = "SUBMIT";
    }

    //Set the question
    document.getElementById("question").innerHTML = questions[state.nextQuestion].question;

    //Create HTML for answers
    var radioHtml = '<table>';
    for (var i in questions[state.nextQuestion].answers) {
      radioHtml += '<tr><td><input type="radio" name="answerValue" value="' + i + '"';
      //The First answer is always checked
      if (i == 0) {
        radioHtml += ' checked="checked"';
      }

      radioHtml += '/><span>' + questions[state.nextQuestion].answers[i].value + '</span></label></td></tr>';
    }
    radioHtml += "</table>";
    document.getElementById("answers").innerHTML = radioHtml;
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

console.log("Loading data");
//Find and hide answer section
var a = document.getElementById("answers");
a.style.visibility = "hidden";
// document.getElementById("answers").appendChild(document.getElementById(button1)
//  );


//Find question pane and the button
var q = document.getElementById("question");
var b = document.getElementById("button1");
b.addEventListener("click", checkResult);

state = {
  nextQuestion: -1,
  correctAnswers: 0
}
 q.innerHTML = "Answer at least 4 questions correctly and you will be rewarded with a dad joke. &nbsp; &nbsp; &nbsp; <br><br> Answer at least 3 inccorectly and you will be punished with an inspirational quote. <br><br>";
 b.value = "LET'S PLAY";
 b.style.fontsize = "40px";
 b.style.paddingtop = "0px";
 b.style.paddingbottom = "0px";

//Get new data
reloadData();
