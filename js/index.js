$(function() {

  // searchWiki takes the value from the input and makes a call to the Wikipedia API
  function searchWiki() {
    var term = $("input").val();
    var apiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=40&search=' + term + '&callback=?';

    $.getJSON(apiUrl, success).fail(error);
    
    // on success, create a new array of WikiEntry objects from the returned data
    function success(data) {
      console.log(data);
      var result = [];
      for (var i = 0; i < data[1].length; i++) {
        result.push(new WikiEntry([data[1][i], data[2][i], data[3][i]]));
      }
      // pass the array of WikiEntry objects on to be displayed
      displayResults(result);
    }

    function error() {
      alert("Error accessing Wikipedia. Please reload the page or try again later.");
    }
  }

  // displayResults accepts an array of WikiEntry objects and inserts them into the DOM
  function displayResults(arr) {
    $(".results").empty();

      $(".results").append("<div id='result-count' class='col-sm-8 col-sm-offset-2'><h3>Top "   + arr.length +  " results</h3></div>");
      $("#result-count").fadeIn("slow");
    
    arr.forEach(function(entry, index) {
      var id = "result-" + index;
      var divId = "#" + id;
      var insert = "<div id='" + id + "'class='col-sm-8 col-sm-offset-2'><a href='" + entry.link + "' target='_blank'><div class='entry'><h2>" + entry.title + "</h2><p>" + entry.desc + "</p></div></a></div>"
      $(".results").append(insert);
      $(divId).fadeIn('slow');
    });
    $(".entry").filter(":odd").addClass("odd");
  }

  // WikiEntry object contstructor
  function WikiEntry(arr) {
    this.title = arr[0];
    this.desc = arr[1];
    this.link = arr[2];
  }

  $(document).on("submit", "form", function(e) {
    e.preventDefault();
    searchWiki();  
  });

});