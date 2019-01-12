$("#scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function(data) {
        console.log(data)
        window.location = "/"
    })
});

		



$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'><span>" + data[i].title + "</span><br /> <img class='img-fluid' src='" + data[i].image + "'><br /><br />" + data[i].summary +  "<br /><a target='_blank' href='" + data[i].link + "'>Learn More</a></p>"); 
	
	}
	
});
/*
	 initializeRows();
		function createNewRow(data) {
	    var newPostCardCard = $("<div>");
	    newPostCardCard.addClass("col-lg-3");
	    newPostCardCard.attr('data-id',  data[i]._id  );
	    var newPostCard = $("<div>");
	    newPostCard.addClass("card");
	    newPostCard.css({
	       	//	width: 18rem;
	    	});
	    var newPostCardImage = $("<img>");
	    newPostCardImage.addClass("card-img-top");
	    newPostCardImage.data('src', data[i].image );
		var newPostCardBody = $("<div>");
	    newPostCardBody.addClass("card-body");
	    var newPostTitle = $("<h2>");
	    newPostTitle.text( data[i].title );
	    var newPostParagraph = $("<p>");
	    newPostParagraph.addClass("card-text");
	    newPostParagraph.text( data[i].summary );
		
		
	    newPostCardBody.append(newPostParagraph);
	    newPostCardBody.append(newPostTitle);
	    newPostCard.append(newPostCardBody);
	    newPostCard.append(newPostCardImage);
	    newPostCardCard.append(newPostCard);
	    newPostCardCard.data("data", data);
	    //return newPostCardCard;
	
		};
	}
*/
	
	
 


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      
/*
      <div class="col-lg-4">
      	<div id="notes">
	      	<h2>Trump Says He's Likely To Declare National Emergency If Congress Won't Fund Wall</h2>
	      	<input id="titleinput" name="title">
	      	<textarea id="bodyinput" name="body"></textarea>
	      	<button data-id="5c3815b5e8b5d4fc708cf57b" id="savenote">Save Note</button>
      	</div>
	  </div>
*/

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});