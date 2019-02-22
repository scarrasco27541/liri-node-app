require("dotenv").config();

var keys = require("./keys.js")
var Spotify = require("node-spotify-api");
//console.log(keys);
//console.log(keys.spotify);

var spotify = new Spotify(keys.spotify);

spotify.search({ type:"track", query: "All the small things" }, function(err, data) {
	if (err) {
		return console.log("Error occurred: " + err);
	}
	console.log(data);
});
