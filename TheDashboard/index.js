var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var fs = require('fs');
var ejs = require('ejs')
var app = express();
var fileUpload = require('express-fileupload');

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname + '/views/'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));

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

app.post('/event-upload', function(req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	let sampleFile = req.files.sampleFile;
	sampleFile.mv("events/eventIndicators.csv", function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log("Uploading event file.");
		res.redirect("/initialize");
	})
});

app.post('/vid-upload', function(req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	let sampleFile = req.files.sampleFile;
	sampleFile.mv("views/video/overShoulder.mp4", function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log("Uploading video file.");
		res.redirect("/initialize");
	})
});

app.get('/simulation', function(req, res) {
	event_data = eventIndicatorHandler();
	if (!fs.existsSync('data/initialized.txt')) {
		sim_data = [];
	} else {
		sim_data = fs.readFileSync("data/initialized.txt", "utf8");
	}

	res.render("framebuild.ejs", {data: sim_data, event_data: event_data});
});

app.post('/event-download', function(req, res) {
	if (req.body.eventFlags != null) {
		headers = "";
		for (key in req.body.eventFlags[0]) {
			headers = headers + key + ",";
		}
		headers = headers.substring(0, headers.length - 1);

		output = headers + "\n";
		for (i = 0; i < req.body.eventFlags.length; i++) {
			line = "";
			for (key in req.body.eventFlags[i]) {
				var value = req.body.eventFlags[i][key];
				line = line + value + ",";
			}
			line = line.substring(0, line.length - 1);
			output = output + line + "\n";
		}

		fs.writeFile('events/eventIndicators.csv', output, function(err) {
			if (err) throw err;
		});
		console.log("Sucessfully wrote CSV file of event indicators");

		res.send(output);
	}
})

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

function eventIndicatorHandler() {
	if (!fs.existsSync('events/eventIndicators.csv')) {
		return 0;
	}
	var bufferString = fs.readFileSync('events/eventIndicators.csv', 'utf8');
	var arr = bufferString.split('\n');
	var jsonObj = [];
    var headers = arr[0].split(',');
    for(var i = 1; i < arr.length; i += 1) {
    	var data = arr[i].split(',');
    	var obj = {};
    	for(var j = 0; j < data.length; j++) {
        	obj[headers[j].trim()] = data[j].trim();
    	}
    	jsonObj.push(obj);
    }
    return JSON.stringify(jsonObj);
}