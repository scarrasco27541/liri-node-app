/*
We're using dotenv to read the .env file into process.env so the program can access our keys
*/
require("dotenv").config();

exports.spotify = {
	id: process.env.SPOTIFY_ID,
	secret: process.env.SPOTIFY_SECRET
};
exports.bandsintown = process.env.BANDSINTOWN_APP_ID;
exports.omdb = process.env.OMDB_KEY