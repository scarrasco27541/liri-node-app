//This calls up each of the package needed to run application. Var keys links my file keys.js to this file.
var keys = require("./keys.js");
var fs = require('fs');
var axios = require('axios');
var moment = require('moment');


var Spotify = require("node-spotify-api");
//console.log(keys);
//console.log(keys.spotify);

//This takes my keys and spotify api and creates a link to spotify.
var spotify = new Spotify(keys.spotify);



function concertThis(input) {
	// if input wasn't given, warn the user
	if (input==undefined) {
		console.log("No input provided.");
	} else {
		// otherwise, build api url using input and the bandsintown key
		var url = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + keys.bandsintown;	
		// make a request to that url using axios:
		axios.get(url)
			// successful response does this
			.then(response => {
				// dig down in the response data to get the pieces needed:
				console.log(" --- " + input + " --- ");
				// if the response data (which seems to be an array) isn't empty:
				if (response.data.length > 0) {
					// loop through them and get the data for each event
					for (var d=0;d<response.data.length;d++) {
						var venueLocation = response.data[d].venue.city + ", " + response.data[d].venue.region + ", " + response.data[d].venue.country;
						var eventDate = moment(response.data[d].datetime).format('MM/DD/YYYY');
						console.log("Venue: ", response.data[d].venue.name);
						console.log("Location: ", venueLocation);
						console.log("Date: ", eventDate);
						console.log("");
					}
				} else {
					// otherwise just say no events found
					console.log(" No events found. ");
					console.log("");
				}
				
			})
			// this just catches any errors that happen
			.catch(error => {
				console.log(error);
			});
	}
}

function movieThis(input) {
	// if input wasn't included, default it to Mr Nobody
	if (input==undefined) {
		input = "Mr. Nobody";
	}
	// Build url using input and omdb key
	var url = "http://www.omdbapi.com/?t="+input+"&y=&plot=short&apikey=" + keys.omdb
	// send request to the api using axios
	axios.get(url)
		// handle the response by digging down into the different pieces of data that comes back
		.then(response => {			
			console.log(" --- " + input + " --- ");
			console.log("Title: ", response.data.Title);
			// Moment caused a warning about the date format
			console.log("Released: ", response.data.Released);
			console.log("IMDB Rating: ", response.data.imdbRating);
			for (var r in response.data.Ratings) {
				if (response.data.Ratings[r].Source == "Rotten Tomatoes") {
					console.log("Rotten Tomatoes Rating: ", response.data.Ratings[r].Value);
				}
			}
			console.log("Language: ", response.data.Language);
			console.log("Country: ", response.data.Country);
			console.log("Plot: ", response.data.Plot);
			console.log("Actors: ", response.data.Actors);
			console.log(" ");
		
		})
		// just catches any errors again
		.catch(error => {
			console.log(error);
		});



}

function spotifyThisSong(input) {
	// another default
	if (input==undefined) {
		input = "The Sign by Ace of Base";
	}
	// This time not axios, but just use spotify's search function
	// Include options like type, query (input), limit:1 to limit output
	spotify.search({ type:"track", query: input, limit:1 }, function(err, data) {
		// if an err comes back, log it and return.
		if (err) {
			return console.log("Error occurred while trying to Spotify that song: " + err);
		}
		// Otherwise continue on, dig through data and output it.
		console.log(" --- " + input + " --- ");
		console.log("Track Name: ", data.tracks.items[0].name);
		console.log("Artist(s):", data.tracks.items[0].artists[0].name);
		console.log("Album: ", data.tracks.items[0].album.name);
		console.log("Preview Link: ", data.tracks.items[0].preview_url);
		console.log(" ");
	});
}



// We know that we DEFINITELY need a command to do anything, so at least argv[2]
// So argv needs to be at least 3 long (0,1,2)
if (process.argv.length < 3) {
	console.log("Please include a command!");
} else {
	var command = process.argv[2];
	var input;
	if (process.argv.length > 3) {
		input = process.argv[3];
	}
	// Decide what to do based on command and input:
	switch(command) {
		case "concert-this":
			concertThis(input);
			break;
		case "spotify-this-song":
			spotifyThisSong(input);
			break;
		case "movie-this":
			movieThis(input);
			break;
		case "do-what-it-says": // one of the above, depending on input
			console.log("Do do-what-it-says");
			// Read random.txt into an array of commands/inputs
			fs.readFile('random.txt', 'utf8', function(err, content) {
				// get lines (splitting by line break) of each command + input
				var lines = content.split("\n");
				// go through lines and split by "," to get each command/input
				for (var l=0;l<lines.length;l++) {
					var instruction = lines[l].split(",");
					instruction[1] = instruction[1].replace(/"/g,'');
					// if it doesn't split nicely into to, let the user know:
					if (instruction.length!=2) {
						console.log("Ignored an improperly formatted instruction line.");
					} else {
						// Otherwise handle the command and input using one of the functions
						switch(instruction[0]) {
							case "concert-this":
								concertThis(instruction[1]);
								break;
							case "spotify-this-song":
								spotifyThisSong(instruction[1]);
								break;
							case "movie-this":
								movieThis(instruction[1]);
								break;
							default:
								break;
						}
					}
				}
			});
			break;
		default:
			console.log("That's not a valid command!");
	}

}
