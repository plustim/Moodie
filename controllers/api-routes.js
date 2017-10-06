var db = require("../models");
var base64ToImg = require('base64-to-image');
var fs = require("fs");
var https = require("https");
https.post = require("https-post");

module.exports = function(app) {
	var baseURL = "https://mooodie.herokuapp.com";

	// receives image and processes it, then sends link for face++ assessment
	app.post("/api/judge", function(req, res){
		// get image in base64
		var imageURI = req.body.face;
		var emotion = req.body.target;

		// start saving the base64 image to a text file (for use later)
		var newName = new Date().getTime();
		fs.writeFile("public/temp/"+newName+".txt", imageURI, "utf8", (err) => {
			console.log(err || "The file was succesfully saved!");
		}); 
	
		// convert image to JPEG and save
		var image = base64ToImg(imageURI, "public/temp/", {debug: true})
		var imageUrl = baseURL + "/temp/" + image.fileName;

		// send image link to face++ for evaluation
		var fppParams = {
			api_key: "6rH88UB11ggkHwhuljdWC0Bl0vujjUfs",
			api_secret: "gsKKbx40EBR2AbhWf4xVrX1wwAbzLAzU",
			return_attributes: "emotion",
			image_url: imageUrl
		};
		https.post("https://api-us.faceplusplus.com/facepp/v3/detect", fppParams, function(response){
			response.setEncoding('utf8');
			response.on('data', function(chunk) {
				var faceObj = JSON.parse(chunk);
				// send scores back to client
				if( faceObj.hasOwnProperty("faces") && emotion === "all" ){
					var feedback = {
						id: newName,
						score: faceObj.faces[0].attributes.emotion,
					};
				}else if( faceObj.hasOwnProperty("faces") ){
					var feedback = {
						id: newName,
						score: faceObj.faces[0].attributes.emotion[emotion],
						all: faceObj.faces[0].attributes.emotion
					};
				}else{
					var feedback = {
						id: newName,
						score: 0,
						all: {sadness: 0, neutral: 0, disgust: 0, anger: 0, surprise: 0, fear: 0, happiness: 0}
					};
				};
				res.send(feedback);
			});
		})
	});

	// save record for image with base64
	app.post("/api/save", function(req, res){
		// remember the base64 encoded image?
		fs.readFile("public/temp/" + req.body.id + ".txt", 'utf8', function(err, data) {
			if(err){
				console.log(err);
			};
			// create new database record for this image
			var query = {
				url: data,
				emotion: req.body.emotion,
				score: req.body.score
			};
			db.Gallery.create(query).then((result)=>{
				res.send(result);
			});
		})
	});

	// save record for image and move jpeg to permanent url
	app.post("/api/saveimage", function(req, res){
		// move the file somewhere more permanent
		var newName = new Date().getTime() + ".jpg";
		fs.rename("public/temp/" + req.body.id, "public/photos/" + newName, (err)=>{
			if(err){
				console.log(err);
			};
			// create new database record for this image
			var query = {
				url: baseURL + "/photos/" + newName,
				emotion: req.body.emotion,
				score: req.body.score
			};
			db.Gallery.create(query).then((result)=>{
				res.send(result);
			});
		})
	});
};
