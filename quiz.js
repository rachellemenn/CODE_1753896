var assembleKey1 = function(parameters) {
  var para_list = [];
  for (var key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      var para_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
      para_list.push(para_string);
    }

 }
  return para_list.join("&");

}

   var url = "https://qriusity.com/v1/categories";
   let params = {
       limit: "20"
     }

   var query_url = url + "?" + assembleKey1(params);
     console.log(query_url);

   fetch(query_url)
       .then(function(response) {
          return response.json();
       })
       .then(function(data) {
          var results = data;
          console.log(results);
       });

       var assembleKey1 = function(parameters) {
         var para_list = [];
         for (var key in parameters) {
           if (parameters.hasOwnProperty(key)) {
             var para_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
             para_list.push(para_string);
           }

        }
         return para_list.join("&");

       }

          var url = "https://qriusity.com/v1/categories/:id/questions";
          params = {
              id: "rand",
              limit: "5"
            }

          var query_url = url + "?" + assembleKey1(params);
            console.log(query_url);

          fetch(query_url)
              .then(function(response) {
                 return response.json();
              })
              .then(function(data) {
                 var results = data;
                 console.log(results);
              });

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

   query_url = url + "?" + assembleKey1(params);
   console.log(query_url);

   fetch(query_url)
       .then(function(response) {
            return response.json();
       })
       .then(function(data) {
         var results = data;
         console.log(results);
       })
