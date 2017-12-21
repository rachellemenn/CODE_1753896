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
 
    var url = "https://qriusity.com//v1/categories";
    let params = {
        limit: "20"
      }

  var query_url = url + "?" + assembleKey1(params);
      console.log(query_url);

      fetch(query_url)
         .then(function(response) {
           return response;
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

  var query_url = "https://icanhazdadjoke.com/";
          console.log(query_url);


     fetch(query_url)
        .then(function(response) {
          return response;
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

     var url = "http://quotesondesign.com/wp-json/posts";
     let params = {
        filterOrderbBy: "rand"
        filterPostsPerPage = "1"
       }

   var query_url = url + "?" + assembleKey1(params);
       console.log(query_url);

       fetch(query_url)
          .then(function(response) {
            return response;
          })
        .then(function(data) {
          var results = data;
          console.log(results);

  });
