require("dotenv").config();

var keys = require("./keys.js")
var Spotify = require("node-spotify-api");
//console.log(keys);
//console.log(keys.spotify);

var spotify = new Spotify(keys.spotify);

/*
spotify.search({ type:"track", query: "All the small things" }, function(err, data) {
	if (err) {
		return console.log("Error occurred: " + err);
	}
	console.log(data);
});
*/



function concertThis(x) {
	console.log("concertThis(): " + x);	
}
function movieThis(x) {
	console.log("movieThis(): " + x);	
}
function spotifyThisSong(x) {
	console.log("spotifyThisSong(): " + x);	
}



if (process.argv.length < 3) {
	console.log("Please include a command!");
} else {
	var command = process.argv[2];
	var input;
	if (process.argv.length > 3) {
		input = process.argv[3];
	}
	switch(command) {
		case "concert-this":	// Bands in Town, probably?
			concertThis(input);
			break;
		case "spotify-this-song":	// spotify API
			spotifyThisSong(input);
			break;
		case "movie-this":	// OMDB api
			movieThis(input);
			break;
		case "do-what-it-says": // one of the above, depending on input
			console.log("Do do-what-it-says for " + input);
			/*
			Here you would want to:
			1. Read random.txt into an array of commands/inputs
			2. Based on each command, run the appropriate function for the input
			*/
			break;
		default:
			console.log("That's not a valid command!");
	}

}
