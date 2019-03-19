var queryURL = "https://api.giphy.com/v1/gifs/trending?r=g&api_key=dc6zaTOxFJmzC";
var yoDOM = $("#yo")
var topics = ["Baseball", "Basketball", "Hockey", "Football", "Tennis", "Gymnastics", "Soccer", "Chess"]

function renderButtons() {
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>")
    button.addClass("sports")
    button.attr("data-sports", topics[i])
    button.text(topics[i])
    $("#buttons").append(button)
  }
}

$(document).on("click", ".sports", function (event) {
  // event.preventDefault()
  var sport = $(this).attr("data-sports")
  console.log(sport)
  yoDOM.empty()
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&rating=g&limit=10&q=" + sport,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {

      // console.log(response.data[i].images.fixed_width.url);
      var img = $("<img>")
      img.addClass("gif")
      img.attr("src", response.data[i].images.fixed_width.url)
      img.attr("data-still", response.data[i].images.fixed_width_still.url)
      img.attr("data-animate", response.data[i].images.fixed_width.url)
      yoDOM.append(img)
    }

  })

})

renderButtons()

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function (response) {

//   for (var i = 0; i < response.data.length; i++) {
//     console.log(response.data[i])
//     // console.log(response.data[i].images.fixed_width.url);
//     var img = $("<img src=" + response.data[i].images.fixed_width.url + ">")
//     img.addClass("gif")
//     yoDOM.append(img)
//   }
// });

$(document).on("click", ".gif", function (event) {
  // event.preventDefault()
  console.log(this);

  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});


