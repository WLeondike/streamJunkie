$(document).ready(function () {

    $('select').formSelect();

    // $("#movieSearch").on("click", function () {
        // const usrSearch = $("#streamServ").val()
        // const settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=jackass3d&country=us",
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        //         "x-rapidapi-key": "14965806bdmsh587117962fb477cp1bb00bjsn47c1f05c6733"
        //     }
        // }


        // $.ajax(settings).done(function (response) {
        //     console.log(response);


        //     for (let i = 0; i < response.results.length; i++) {
        //         console.log(response.results[0].locations[0]["display_name"]);
        //         for (let j = 0; j < response.results[i].locations.length; j++) {
        //             console.log(response.results[i].locations[j].display_name);
        //             // $(".sourceOutput").text(response.results[i].locations[j].display_name);
        //             $(".sourceOutput").append(`<p> ${response.results[i].locations[j].display_name} </p>`);
        //         }

        //     }
        // });
    // });

    //     $.ajax(settings).done(function (response) {
    //         const data = response
    //         // console.log(response);

    //         // results[0].locations
    //      for (let i = 0; i < data.results[i].locations[i].length; i++) {
    //             console.log("Movie Results: ", data.results[i].locations[i]["display_name"]);
    //             $(".sourceOutput").html(response.results[0].locations[i]["display_name"]);    
    //         }
    //     });
    // });

    // This function is picking out what movie genre the user wants
    $("#random").on('click', (evt) => {
        $(".sourceOutput").empty();
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
            // console.log(response);
            let recArray = [];
            // array.filter(result => result.vote_average > 5)
            // Check for highly voted movies 
            // Loop over the movies with a vote average above 5
            for (let i = 0; response.results[i]; i++) {
                if (response.results[i].vote_average > 5) {
                    // Add the highly voted movies to an array
                    recArray.push(response.results[i])
                }
            }
            console.log(recArray);

            //Get recommended movie 
            let recommended = recArray[Math.floor(Math.random() * recArray.length)];
            console.log("The movie is: " + recommended.original_title)
            //Show the movie information on the page
            $("#movie-name").html("Movie Name: " + recommended.original_title);
            $("#movieDetails").html(recommended.overview);
            $("#movieReleaseDate").html(recommended.release_date);
            $("#current-pic").attr("src", "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + recommended.poster_path)
            const usrSearch = $("#streamServ").val()
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


            $.ajax(settings).done(function (response) {
                console.log("response: ", response);


                for (let i = 0; i < response.results[0].locations.length; i++) {
                    console.log(response.results[0].locations[i].display_name);
                    // $(".sourceOutput").text(response.results[i].locations[j].display_name);
                    $(".sourceOutput").append(`<p> ${response.results[0].locations[i].display_name} </p>`);
                }
            });
        });
    })
});