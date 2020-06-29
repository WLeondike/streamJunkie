$(document).ready(function () {
    //materialize js for genre select option
    $('select').formSelect();

    $("button").on('click', (evt) => {
        $(".sourceOutput").empty();
        evt.preventDefault();
        let genreId = $("#genre").val();
        let movieYear = $("#movie_name").val();
        //first ajax call
        var queryURL = "https://api.themoviedb.org/3/discover/movie/?with_genres=" + genreId + "&primary_release_year=" + movieYear + "&api_key=52cc32f4af978457c9927f10c080f307&language=en-US";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp"
        }).then(function (response) {
            //storing the data from the ajax request in the genre variable
            let recArray = [];
            // Check for highly voted movies 
            // Loop over the movies with a vote average above 5
            for (let i = 0; response.results[i]; i++) {
                if (response.results[i].vote_average > 5) {
                    // Add the highly voted movies to an array
                    recArray.push(response.results[i])
                }
            }

            //Get recommended movie 
            let recommended = recArray[Math.floor(Math.random() * recArray.length)];

            //Show the movie information on the page
            $("#movie-name").html(recommended.original_title);
            $("#movieDetails").html(recommended.overview);
            $("#movieReleaseDate").html(recommended.release_date);
            $("#current-pic").attr("src", "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + recommended.poster_path)
            
            //ajax call for second api
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + recommended.original_title + "&country=us",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                    "x-rapidapi-key": "14965806bdmsh587117962fb477cp1bb00bjsn47c1f05c6733"
                }
            }
            //for loop to loop through the contents of the response array
            $.ajax(settings).done(function (response) {
                $(".streamTitle").html("Movie is available at: ")
                for (let i = 0; i < response.results[0].locations.length; i++) {
                    $(".sourceOutput").append(`<p> ${response.results[0].locations[i].display_name} </p>`);
                }
            });
        });
    })
});