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
			console.log("Do concert-this for " + input);
			break;
		case "spotify-this-song":	// spotify API
			console.log("Do spotify-this-song for " + input);
			break;
		case "movie-this":	// OMDB api
			console.log("Do movie-this for " + input);
			break;
		case "do-what-it-says": // one of the above, depending on input
			console.log("Do do-what-it-says for " + input);
			break;
		default:
			console.log("That's not a valid command!");
	}

}
