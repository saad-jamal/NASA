function AirspeedTape(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		drawTape(this.loc, 15, false, 100,
			10, false, 50, this.data.cal_as, 100);

		ctx.font = "20px Arial";
		ctx.fillStyle = "#e357ff";
		var textWidth = ctx.measureText(data.mcp_ias_mach_ds).width/2
		ctx.fillText(data.mcp_ias_mach_ds, location.x + 28 - textWidth, location.y - 3);
	}
}

function AirspeedTicker(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		this.drawAirspeedDigits(this.data.cal_as);
	}

	this.drawAirspeedDigits = function(airspeed) {
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		var arrowSize = 9;

		var ctx = this.ctx;
  		ctx.fillStyle = GUAGE_BACKGROUND;
 		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();


		ctx.moveTo(x, y + (hei / 2));
		ctx.lineTo(x - arrowSize, y);
		ctx.lineTo(x - arrowSize - wid, y);
		ctx.lineTo(x - arrowSize - wid, y + hei);
		ctx.lineTo(x - arrowSize, y + hei);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

	  	var onesList = []
	  	for (var i = 0; i < 10; i++)
	  	{
	  		onesList[i] = i;
	  	}  

	  	if (airspeed < 0)
	  	{
	  		airspeed = 0;
	  	} else {
	  		airspeed = Math.floor(airspeed);
	  	}
	  	ctx.fillStyle = 'white';
	  	ctx.font = "20px Arial"
	  	var textWidth = ctx.measureText(airspeed).width/2;
	  	ctx.fillText(airspeed, x - textWidth - 25, y+hei-5);
  		/*var ones = airspeed / 1;
  		var tens = (airspeed / 10); 
  		var hundreds = airspeed / 100;

	  	// Draw tens digit place
  		var loc = {}
  		var boxWidth = (wid - arrowSize)
  		loc.x = x - arrowSize - (boxWidth) + 17;
  		loc.y = y+1;
  		loc.height = hei-1;
  		loc.width = boxWidth / 3;
  		drawTickerDigit(onesList, ones, 1.0, 0, loc, 20);

  		// Draw tens digit place
  		loc.x -= (1 / 3 * boxWidth) + 3;
  		drawTickerDigit(onesList, tens, 0.2, 30, loc, 20);

  		// Draw hundreds digit place
  		onesList[0] = "";
  		loc.x -= (1 / 3 * boxWidth) + 3;
  		drawTickerDigit(onesList, hundreds, 0.01, 20, loc, 20);

  		//Jank bug fix
  		if (Math.floor(airspeed) % 10 == 9) {
  			ctx.fillStyle = 'white';
  			ctx.font = "20px Arial";
  			var char = Math.floor(airspeed / 10) % 10;
  			ctx.fillText(char, 25, 271);
  		}*/
	}
}