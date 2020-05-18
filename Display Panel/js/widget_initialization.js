// ######## MCP INITIALIZATION ########
var mcpSim = new MCPSim();


// ######## ND INITIALIZATION ########
var ndCvs = document.getElementById("ndCanvas");
var ndCtx = ndCvs.getContext("2d");

var GUAGE_BACKGROUND = "#191921";
var WIDTH = ndCvs.width;
var HEIGHT = ndCvs.height;

ndCtx.fillStyle = "black";
ndCtx.fillRect(0, 0, WIDTH, HEIGHT);

var ndSim = new NDSim();

ndSim.draw(ndCtx, WIDTH, HEIGHT);


// ######## PFD INITIALIZATION ########
	var pfdCvs = document.getElementById("pfdCanvas");
	var pfdCtx = pfdCvs.getContext("2d");

	var GUAGE_BACKGROUND = "#191921";
	var GUAGE_FOREGROUND = 'white';
	var GROUND = "#752E00";
  	var SKY = "#0072B9";
  	var EARTH = "#0B6739"; 
  	var BUG = "#F844F8";
	var WIDTH = pfdCvs.width;
	var HEIGHT = pfdCvs.height;

	pfdCtx.fillStyle = "black";
	pfdCtx.fillRect(0, 0, WIDTH, HEIGHT);

	var data = new PFDSim();

	var guages = [];
	function initGuages() {
		//Attitude Indicator
		guages[0] = new AttitudeIndicator(pfdCtx,
		{
			"x": 72,
			"y": 80,
			"width": 208,
			"height": 224,
		},
		data);
		//Airspeed Digits Tape
		guages[1] = new AirspeedTape(pfdCtx,
		{
			"x": 10,
			"y": 25,
			"width": 52,
			"height": 335
		},
		data);
		//Airspeed Ticker
		guages[2] = new AirspeedTicker(pfdCtx,
		{
			"x": 48,
			"y": 181,
			"width": 35,
			"height": 24
		},
		data);
		//Altimter Digits Tap
		guages[3] = new AltimeterTape(pfdCtx,
		{
			"x": 309,
			"y": 25,
			"width": 52,
			"height": 335
		},
		data);
		//Rate Of Climb Tape
		guages[4] = new ClimbTape(pfdCtx,
		{
			"x": 365,
			"y": 25,
			"width": 30,
			"height": 335
		},
		data);
		//Altimeter Ticker
		guages[5] = new AltimeterTicker(pfdCtx,
		{
			"x": 310,
			"y": 181,
			"width": 45,
			"height": 24
		},
		data);
		//Top Mode Bar
		guages[6] = new ModeBar(pfdCtx,
		{
			"x": 100,
			"y": 12,
			"width": 200,
			"height": 32
		},
		data);
		//Heading Compass
		guages[7] = new HeadingDial(pfdCtx,
		{
			"x": 176,
			"y": 400,
			"width": 64,
			"height": 96
		},
		data);
		//ILS GS/Loc Dev Probes
		guages[8] = new gsProbe(pfdCtx,
		{
			"x": 284,
			"y": 192,
			"width": 10,
			"height": 8
		},
		data);

		guages[9] = new locProbe(pfdCtx,
		{
			"x": 176,
			"y": 314,
			"width": 10,
			"height": 8
		},
		data);
	}

	initGuages();

	for(i = 0; i < guages.length; i++) {
		guages[i].update(data);
		guages[i].draw();
	}