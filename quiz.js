// var parseResponse = function() {
//   var response = JSON.parse(this.response);
//   console.log(response);
// }

var assembleQuery1 = function(parameters) {
   var query_string = [];
  for (var key in parameters) {
     if (parameters.hasOwnProperty(key)) {
       var param_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
       query_string.push(param_string);
     }

  }
   return query_string.join("&");
 }

 // var extractParameters = function() {
 //   var query = window.location.hash.substring(1);
 //   var params = query.split ("&");

   var return_data = {};
   for(var i = 0; i (params.length; i++) {
       var question = results[0];
       return_data[keyvalue[0]] = question["question"];
   }
   return return_data;
 }

  // var processResponse = function() {
   // var output_div = document.querySelector("#output")
 //   var question = params[i].split(":");
 //   processResponse[question[3] = question[1] ];
 // }
 // return processResponse

   // response.items;
   // for(var i = 0; i < question.length; i ++) {
   //   var question = question[i].question;


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
        .then(function(data) {
           var results = data;
           console.log(results);
        });

// var quizQuestion=function() {
//  var xhttp = new XMLHttpRequest();
//  xhttp.addEventListener("load", parseResponse());
//  xhttp.open("GET", url);
//  xhttp.send();
//     console.log(response);
//     processResponse(response);
//  }
//
// if

// Supposed to call the quiz api when the button is clicked
   var button1 = document.getElementById("button1");
   button1.addEventListener("click", function());


        // var assembleKey1 = function(parameters) {
        //   var para_list = [];
        //   for (var key in parameters) {
        //     if (parameters.hasOwnProperty(key)) {
        //       var para_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
       //       para_list.push(para_string);
       //     }
       //
       //  }
       //   return para_list.join("&");

       // }

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
          console.log(results);

        });

   // The link as been altered so that the error was bypassed
   // url = "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts";
   // params = {
   //     filterOrderBy: "rand",
   //     filterPostsPerPage: "1"
   // };
   //
   // query_url = url + "?" + assembleQuery1(params);
   // console.log(query_url);
   //
   // fetch(query_url)
   //     .then(function(response) {
   //          return response.json();
   //     })
   //     .then(function(data) {
   //       var results = data;
   //       console.log(results);
   //     })
