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