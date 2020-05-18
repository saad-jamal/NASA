function AltimeterTape(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		drawTape(this.loc, 15, true, 1000,
			100, true, 50, this.data.pres_alt, 100);

		ctx.font = "20px Arial";
		ctx.fillStyle = "#e357ff";
		ctx.fillText(data.mcp_alt_ds, location.x, location.y - 5);

		ctx.strokeStyle = 'white';
		ctx.fillStyle = 'black';
		ctx.strokeRect(location.x - 5, location.y + location.height + 3, location.width + 5, 30);

		ctx.font = "25px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText(data.fo_ef_baro_cur, location.x, location.y + 28 + location.height);
	}
}

function AltimeterTicker(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		this.drawAltitimeterDigits(this.data.pres_alt);
	}

	this.drawAltitimeterDigits = function(altitude) {
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		var arrowSize = 15;

		var ctx = this.ctx;
		ctx.fillStyle = GUAGE_BACKGROUND;
		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();

		ctx.moveTo(x, y + hei / 2);
		ctx.lineTo(x + arrowSize, y);
		ctx.lineTo(x + arrowSize + wid, y);
		ctx.lineTo(x + arrowSize + wid, y + hei);
		ctx.lineTo(x + arrowSize, y + hei);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

  		// Data to print
	  	var tensList = []
	  	for (var i = 0; i < 10; i++)
	  	{
	  		tensList[i] = i + "0"
	  	}

	  	var onesList = []
	  	for (var i = 0; i < 10; i++)
	  	{
	  		onesList[i] = i + ""
	  	}  

	  	if (altitude < 0)
	  	{
	  		altitude = 0;
	  	}
  		var tens = altitude / 10
  		var hundreds = (altitude / 100)
  		var thousands = (altitude / 1000)
  		var thenThousands = (altitude / 10000)

	  	// Draw tens digit place
  		var loc = {}
  		var boxWidth = (wid - arrowSize)
  		loc.x = x + boxWidth * (3 / 4) + 22
  		loc.y = y
  		loc.height = hei
  		loc.width = boxWidth / 4
  		drawTickerDigit(tensList, tens, 1.0, 0, loc, 20);

  		// Draw hundreds digit place
  		loc.x = x + boxWidth * (2 / 4) + 15
  		drawTickerDigit(onesList, hundreds, 0.1, 30, loc, 20);

  		// Draw thousands digit place
  		loc.x = x + boxWidth * (1 / 4) + 15
  		drawTickerDigit(onesList, thousands, 0.05, 20, loc, 20);

  		// Draw ten thousands digit place
  		loc.x = x + 15
  		onesList[0] = ""
  		drawTickerDigit(onesList, thenThousands, 0.001, 20, loc, 20);
	}
}

function ClimbTape(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		drawTape(this.loc, 8, false, 100,
			10, true, 40, this.data.rate_of_clb, 100);

		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		ctx.fillStyle = 'black';
		ctx.strokeStyle = 'black';

		ctx.beginPath();
		ctx.moveTo((x + (wid / 2)), y);
		ctx.lineTo(x + wid + 3, y);
		ctx.lineTo(x + wid + 3, y + 50);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo((x + (wid / 2)), y + hei);
		ctx.lineTo(x + wid + 3, y + hei);
		ctx.lineTo(x + wid + 3, y + hei - 50);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.font = "11px Arial";
		ctx.fillStyle = "#e357ff";
		ctx.fillText(data.mcp_vert_spd_ds, location.x, location.y - 5);
	}
}