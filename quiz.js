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

// when the quiz starts it will start at
// index -1 and there will be 0 correct answer
var questions;
var state = {
  nextQuestion: -1,
  correctAnswers: 0
}

// This function makes sure that the quiz continues
// until the question limit is reached (5).
// Then the quiz will end
function NextQuestion() {
  state.nextQuestion++;
  if (state.nextQuestion >= questions.length) {
    // var newButton = document.getElementById("button");
    // newButton += '<input type="button" onclick="location.href='results.html';" value="SUBMIT"';

    // document.getElementById("button1")

    //done
    // set questions to -1
    // document.navigate where I will be able to tell how many correct questions there are
    // sessionid attach it to every request
  } else {
    if (state.nextQuestion === 0) {
      state.correctAnswers = 0;
    }

    // Creates a radio button into which the question and answers are inputed
    document.getElementById("question").innerHTML = questions[state.nextQuestion].question;
    var radioHtml = '<br><br>';

    for (var i in questions[state.nextQuestion].answers) {
      radioHtml += '<input type="radio" name="answerValue" value="' + i + '"';
      if (i == 0) {
        radioHtml += ' checked="checked"';
      }
      radioHtml += '/><label>' + questions[state.nextQuestion].answers[i].value + '</label><br/>';
    }
    console.log(radioHtml);
    document.getElementById("answers").innerHTML = radioHtml
  }

}
// prints to the html
var extractParameters = function() {
  var query = window.location.hash.substring(1);
  var params = query.split("&");

  var return_data = {};
  for (var i = 0; i < params.length; i++) {
    var question = results[0];
    return_data[keyvalue[0]] = question["question"];
  }
  return return_data;
}


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
    console.log(data);
    shuffle(questions);
    console.log(questions);
    NextQuestion();
  });



function checkResult() {
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

  NextQuestion();
}

// Supposed to call the quiz api when the button is clicked
var button1 = document.getElementById("button1");
button1.addEventListener("click", checkResult);





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
    var results = data;
    var correct = data.results[i];
    for (var i in data.results) {
      if (correct_answers >= 3) {
        console.log(results);
        // above supposed to attempt to print the joke
        // if over three correct

      }
    }

  });

// The link as been altered so that the error was bypassed
 url = "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts";
 params = {
     filterOrderBy: "rand",
     filterPostsPerPage: "1"
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
     })
