// ######## Eyetracking Canvas Initialization ########
var eyeCvs = document.getElementById("eyeCanvas");
var eyeCtx = eyeCvs.getContext("2d");
var ctxWid = 1256;
var ctxHei = 809;

trackerQueue = [];
hold = 0;
initRadius = 40;
initOpacity = 1;
initDecay = 0.60;
initStyle = "stroke";
initFixations = 10;
cross = true;
linearDecay = true;

function drawTracking() {
	var object_being_viewed = raw_memory[data_index]["\"PGaze_Object_ID\""];
	var confidence = parseFloat(raw_memory[data_index]["\"Gaze_Confidence\""]);
	var x = parseFloat(raw_memory[data_index]["\"PGaze_X_Intersection\""]);
	var y = parseFloat(raw_memory[data_index]["\"PGaze_Y_Intersection\""]);

	//Reset
	resetBorders();
	eyeCtx.clearRect(0, 0, ctxWid, ctxHei);

	if (object_being_viewed === "0") {
		console.log("Pilot Is Viewing: Off AOI");
		eyeCtx.strokeStyle = "rgba(128,128,128," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(128,128,128," + initOpacity + ")";
		$(".offAOIDiv").css("border", "6px solid #ff0000");
	} else if (confidence < 0.85) {
		console.log("Pilot Is Viewing: NoData");
		eyeCtx.strokeStyle = "rgba(128,128,128," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(128,128,128," + initOpacity + ")";
		$(".noDataDiv").css("border", "6px solid #ff0000");
	} else if (object_being_viewed === "1003") {
		console.log("Pilot Is Viewing: PFD");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1003", x: 851, y: 715, wid: 400, hei: 400, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	} else if (object_being_viewed === "1004") {
		console.log("Pilot Is Viewing: ND");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1004", x: 445, y: 715, wid: 400, hei: 400, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	} else if (object_being_viewed === "1005") {
		console.log("Pilot Is Viewing: OTW");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1005", x: 2, y: 151, wid: 1060, hei: 150, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	} else if (object_being_viewed === ("1006")) {
		console.log("Pilot Is Viewing: Upper EICAS");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1006", x: 2, y: 556, wid: 250, hei: 243, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	} else if (object_being_viewed === ("1007")) {
		console.log("Pilot Is Viewing: EFIS");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1007", x: 1013, y: 307, wid: 200, hei: 150, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	} else if (object_being_viewed === ("1008")) {
		console.log("Pilot Is Viewing: FMS");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1008", x: 260, y: 807, wid: 182, hei: 306, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	} else if (object_being_viewed === ("1009")) {
		console.log("Pilot Is Viewing: MCP");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1009", x: 2, y: 306, wid: 1010, hei: 152, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	} else if (object_being_viewed === ("1010")) {
		console.log("Pilot Is Viewing: Lower EICAS");
		eyeCtx.strokeStyle = "rgba(200,0,0," + initOpacity + ")";
		eyeCtx.fillStyle = "rgba(200,0,0," + initOpacity + ")";
		origin = {id: "1010", x: 2, y: 807, wid: 250, hei: 243, pgazeX: x, pgazeY: y};
		hold = data_index;
		trackerQueue.push(origin);
	}
	drawTrackers();
}

function drawTrackers() {
	opacity = initOpacity;
	radius = initRadius;
	if ((data_index - hold) >= (2700 / sim_speed)) {
		trackerQueue = [];
		return;
	}
	for (i = 0; i < (trackerQueue.length - 1); i++)  {
		var firstX  = trackerQueue[i].x + (trackerQueue[i].wid * trackerQueue[i].pgazeX);
		var firstY = trackerQueue[i].y - (trackerQueue[i].hei * trackerQueue[i].pgazeY);

		var secondX  = trackerQueue[i+1].x + (trackerQueue[i+1].wid * trackerQueue[i+1].pgazeX);
		var secondY = trackerQueue[i+1].y - (trackerQueue[i+1].hei * trackerQueue[i+1].pgazeY);

		eyeCtx.beginPath();
		eyeCtx.lineWidth = 4;
		eyeCtx.moveTo(firstX, firstY);
		eyeCtx.lineTo(secondX, secondY);
		eyeCtx.stroke();
	}
	trackerQueue.reverse();
	for (i = 0; i < trackerQueue.length; i++) {
		var specX  = trackerQueue[i].x + (trackerQueue[i].wid * trackerQueue[i].pgazeX);
		var specY = trackerQueue[i].y - (trackerQueue[i].hei * trackerQueue[i].pgazeY);

		eyeCtx.beginPath();
		eyeCtx.lineWidth = 5;
		eyeCtx.arc(specX, specY, radius, 0, 2*Math.PI);
		if (initStyle == "stroke") {
			eyeCtx.stroke();
		} else if (initStyle == "fill") {
			eyeCtx.fill();
		}

		if (cross) {
			eyeCtx.beginPath();
			eyeCtx.moveTo(specX - 8, specY);
			eyeCtx.lineTo(specX + 8, specY);
			eyeCtx.stroke();
			eyeCtx.beginPath();
			eyeCtx.moveTo(specX, specY - 8);
			eyeCtx.lineTo(specX, specY + 8);
			eyeCtx.stroke();
		}
		if (linearDecay) {
			if (i == 0) {
				radius = radius * initDecay;
			} else {
				radius -= 2;
			}
		} else {
			radius = radius * initDecay;
		}
	}
	trackerQueue.reverse();
	sliceVal = -1 * (initFixations - 1);
	trackerQueue = trackerQueue.slice(sliceVal);
}

function resetBorders() {
	$(".noDataDiv").css("border", "2px solid black");
	$(".offAOIDiv").css("border", "2px solid black");
	$(".offAOIDiv").css("height", "73px");
}