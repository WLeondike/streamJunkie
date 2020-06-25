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

$("button").on('click', (evt) => {
    evt.preventDefault();
    let genreId = $("#genre").val();
    let movieYear = $("#movie_name").val();
    console.log(`Locals ${genreId} and ${movieYear}`);
    //Ajax
    var queryURL = "https://api.themoviedb.org/3/discover/movie/?with_genres=" + genreId + "&primary_release_year=" + movieYear + "&api_key=52cc32f4af978457c9927f10c080f307&language=en-US";
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
    }).then(function (response) {
        console.log(`Response for movies ${JSON.stringify(response)}`);
        //storing the data from the ajax request in the genre variable
        console.log(response);
    })
});
