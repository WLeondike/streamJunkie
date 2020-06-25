//GLOBALS
i = 0;

function streamSearch() {
    const titleSearch = $(this).attr("title-name")
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + titleSearch + "&country=us",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "14965806bdmsh587117962fb477cp1bb00bjsn47c1f05c6733"
        }
    }

    $.ajax(settings).then(function (response) {
        console.log(response);

        // console.log(results.locations[i].display_name[i]);

    });
}
streamSearch();


//This function is picking out what movie genre the user wants

$("#data-mdb").on("click", (evt) => {
    evt.preventDefault();
    let genreId = $("#genre").val();
    let movieYear = $("movie_name").val();
    
    console.log(`Locals ${genreId} and ${movieYear}`);
    
    let genreId = genreId.toLowerCase();
    //Ajax
    var queryURL = "https://api.themoviedb.org/3/discover/movie/?with_genres=" + genreId + "&primary_release_year=" + movieYear + "&api_key=52cc32f4af978457c9927f10c080f307&language=en-US";
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
        //after the data comes back from the request
    }).then(function (response) {
        //making sure we are logging out our request and its functional
        console.log(queryURL);
        console.log(response);
        //storing the data from the ajax request in the genre variable
        var mdbsearchLower = mdbsearch.toLowerCase();
        //comparing what the user input to make sure its a valid value
      
        if (response.genre(mdbsearchLower) === "movie"){

            alert("Great here are the genres for Movies:");
        }
        //comparing what the user input to make sure it is a valid value
        else if (response.genre(mdbsearchLower) === "tv") {
            alert("Great here are the genres for TV shows:")
        }
        //if the user input an incorrect value it would return with null and make user input again
        else {
            alert("invalid")
        }
        //This is going to push all of the different genres to the mdbDiv
        for (var i = 0; i < response.genre.length; i++) {
            console.log(response.genre[i]);
            $("#mdbDiv").html(response.genre[i])
        }
    })
});
