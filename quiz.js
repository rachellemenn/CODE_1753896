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

var quizQuestion=function() {
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

var xhttp = new XMLHttpRequest();
xhttp.open("GET", query_url);
xhttp.addEventListener("load", function() {
  var response = JSON.parse(this.response);
  console.log(response.results.question);
})
xhttp.send();

// Supposed to call the quiz api when the button is clicked
 var button1 = document.getElementById("button1");
 button1.addEventListener("click", function() {
    console.log("clicked");
  })

}

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

          // var url = "https://qriusity.com/v1/categories/:id/questions";
          // params = {
          //     id: "rand",
          //     limit: "5"
          //   }
          //
          // var query_url = url + "?" + assembleKey1(params);
          //   console.log(query_url);
          //
          // fetch(query_url)
          //     .then(function(response) {
          //        return response.json();
          //     })
          //     .then(function(data) {
          //        var results = data;
          //        console.log(results);
          //     });

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
