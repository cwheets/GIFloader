var gifArray = ["birthday", "funny", "yes", "cat", "random"];
var gifLocation = $(".gifs");
var buttonsDiv = $(".buttons-div")
$(document).ready(function(){

$("#add-item").on("click", function(event){
    
    event.preventDefault();
    var newButton = $("#add-button").val().trim()
        if(!gifArray.includes(newButton)){
            gifArray.push(newButton)
            buttonsDiv.empty()
            buttonDisplay()
            $("#add-button").val('')
    }
})


buttonDisplay = function() {
  for (let i = 0; i < gifArray.length; i++) {
    var gifButton = $("<button>").append(gifArray[i]);
    gifButton.attr("class", "gif-buttons");
    gifButton.attr("button-number", i);
    buttonsDiv.append(gifButton);
  }
};
buttonDisplay();

buttonsDiv.on("click", ".gif-buttons", function() {
    gifLocation.empty()
    var gifIndex = parseInt($(this).attr("button-number"))
    var specificGif = gifArray[gifIndex]
    console.log(specificGif);

   
   var queryUrl =
  "https://api.giphy.com/v1/gifs/search?q=" +
  specificGif +
  "&api_key=sIjIaVse1p30ZNjUAF1USwpsxUnIH59H";
   
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var image = $("<img>");
      image.attr("src", results[i].images.fixed_height.url);
      gifDiv.append(p);
      gifDiv.append(image);
      gifLocation.prepend(gifDiv);
    }
  });
});
})