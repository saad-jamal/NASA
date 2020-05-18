var express = require('express');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs')
var app = express();
var fileUpload = require('express-fileupload');

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/views/'));
app.use(fileUpload());

app.get('/', function(req, res) {
	res.render('homepage.ejs');
});

app.get('/info', function(req, res) {
	res.render('info.ejs');
});

app.get('/initialize', function(req, res) {
	res.render('init.ejs');
});

app.post('/upload', function(req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	let sampleFile = req.files.sampleFile;
	sampleFile.mv("data/input.csv", function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log("Parsing file.");
		csvHandler();
		res.redirect("/initialize");
	})
});

app.post('/vid-upload', function(req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	let sampleFile = req.files.sampleFile;
	sampleFile.mv("data/overShoulder.mp4", function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log("Uploading video file.");
		res.redirect("/initialize");
	})
});

app.get('/simulation', function(req, res) {
	fs.readFile("data/initialized.txt", function(err, data) {
		if (err) return console.log(err);;
		res.render("framebuild.ejs", {data: data});
	});
});

app.listen(app.get('port'), function() {
	console.log("Server started. Press Ctrl-C to terminate.");
});

function csvHandler() {
	fs.readFile('data/input.csv', function(err, data){
		if (err) {
			return console.log(err);
		}
		var bufferString = data.toString();
		var arr = bufferString.split('\n');
		var jsonObj = [];
	    var headers = arr[1].split(',');
	    for(var i = 3; i < arr.length; i += 3) {
	    	var data = arr[i].split(',');
	    	var obj = {};
	    	for(var j = 0; j < data.length; j++) {
	        	obj[headers[j].trim()] = data[j].trim();
	    	}
	    	jsonObj.push(obj);
	    }

	    fs.writeFile('data/initialized.txt', JSON.stringify(jsonObj), function(err) {
	    	if (err) throw err;
	    });
	});
	console.log("Input data successfully parsed.")
}