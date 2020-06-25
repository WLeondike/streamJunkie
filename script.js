//GLOBALS

$("usrSearch").on('click', (evt) => {
    evt.preventDefault();
    let titleSearch = $("#usersTitle").val().trim();
    console.log(titleSearch);
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + titleSearch + "&country=us",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "14965806bdmsh587117962fb477cp1bb00bjsn47c1f05c6733"
        }
    }

    $.ajax(settings).then(function (response) {
        console.log(JSON.stringify(response));

        console.log(response.results[i].locations[i].display_name);

    });

});

//This function is picking out what movie genre the user wants
$("button").on('click', (evt) => {
    evt.preventDefault();
    let genreId = $("#genre").val();
    let movieYear = $("#movie_name").val();
    console.log(`Locals ${genreId} and ${movieYear}`);
    //Ajax
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/discover/movie/?with_genres=" + genreId + "&primary_release_year=" + movieYear + "&api_key=52cc32f4af978457c9927f10c080f307&language=en-US";
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
    }).then(function (response) {
        console.log(`Response for movies ${JSON.stringify(response)}`);
        //storing the data from the ajax request in the genre variable
        console.log(response);
        for (let i = 0; response.results[i].vote_average > 5; i++) {
            $("#movie-name").html("Movie Name: " + response.results[i].original_title);
            $("#movieDetails").html(response.results[i].overview);
            $("#movieReleaseDate").html(response.results[i].release_date);
            $("#current-pic").attr("src", "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + response.results[i].poster_path)
        }
    });
});
