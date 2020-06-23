function moviesearch() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=us",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "14965806bdmsh587117962fb477cp1bb00bjsn47c1f05c6733"
        }
    }

    $.ajax({
        url: settings,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}

moviesearch();


function imdbsearch() {
    var queryURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=52cc32f4af978457c9927f10c080f307&language=en-US&page=1";
    console.log(queryURL)
    //Performing an Ajax request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
        //after the data comes back from the request
    }).then(function (response) {
        console.log(response);
    }
    )     
}
imdbsearch();