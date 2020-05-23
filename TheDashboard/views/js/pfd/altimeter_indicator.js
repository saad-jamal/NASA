function AltimeterTape(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		drawTape(this.loc, 13, true, 1000,
			100, true, 50, this.data.pres_alt, 100);

		ctx.font = "20px Arial";
		ctx.fillStyle = "#e357ff";
		var textWidth = ctx.measureText(data.mcp_alt_ds).width/2;
		ctx.fillText(data.mcp_alt_ds, location.x + 23 - textWidth, location.y - 5);

		ctx.strokeStyle = 'white';
		ctx.fillStyle = 'black';
		ctx.strokeRect(location.x - 5, location.y + location.height + 3, location.width + 8, 22);

		ctx.font = "17px Arial";
		ctx.fillStyle = "#5afc03";

		var pressureText = this.data.fo_ef_baro_cur.toFixed(2);
		var textWidth = ctx.measureText(pressureText).width/2;
		ctx.fillText(pressureText, location.x + 18 - textWidth, location.y + 20 + location.height);

		ctx.font = "10px Arial";
		ctx.fillText("IN", location.x+43, location.y+location.height+20);
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

		var arrowSize = 8;

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
	  	} else {
	  		altitude = Math.floor(altitude);
	  	}
	  	ctx.fillStyle = 'white';
	  	ctx.font = "17px Arial"
	  	var textWidth = ctx.measureText(altitude).width;
	  	ctx.fillText(altitude, x+wid+8-textWidth, y+hei-6);
  		/*var tens = altitude / 10
  		var hundreds = (altitude / 100)
  		var thousands = (altitude / 1000)
  		var thenThousands = (altitude / 10000)

	  	// Draw tens digit place
  		var loc = {}
  		var boxWidth = (wid - arrowSize) - 5
  		loc.x = x + boxWidth * (3 / 4) + 15
  		loc.y = y+2;
  		loc.height = hei-2;
  		loc.width = boxWidth / 4
  		drawTickerDigit(tensList, tens, 1.0, 0, loc, 18);

  		// Draw hundreds digit place
  		loc.x = x + boxWidth * (2 / 4) + 9;
  		drawTickerDigit(onesList, hundreds, 0.1, 30, loc, 18);

  		// Draw thousands digit place
  		loc.x = x + boxWidth * (1 / 4) + 7;
  		drawTickerDigit(onesList, thousands, 0.05, 20, loc, 18);

  		// Draw ten thousands digit place
  		loc.x = x + 6
  		onesList[0] = ""
  		drawTickerDigit(onesList, thenThousands, 0.001, 20, loc, 18);*/
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
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		
		ctx.fillStyle = GUAGE_BACKGROUND;
		ctx.fillRect(x, y, wid, hei);

		ctx.fillStyle = 'black';

		ctx.beginPath();
		ctx.moveTo((x + (wid / 2)), y);
		ctx.lineTo(x + wid + 3, y);
		ctx.lineTo(x + wid + 3, y + 50);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo((x + (wid / 2)), y + hei);
		ctx.lineTo(x + wid + 3, y + hei);
		ctx.lineTo(x + wid + 3, y + hei - 50);
		ctx.fill();

		ctx.fillRect(x, 174, 8, 51);

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8, 200);
		ctx.lineTo(x+20, 200);
		ctx.stroke();

		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x+8, 175);
		ctx.lineTo(x+14, 175);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x+8, 225);
		ctx.lineTo(x+14, 225);
		ctx.stroke();

		//Upper Six Dash
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8, 90);
		ctx.lineTo(x+14, 90);
		ctx.stroke();

		ctx.font = "9px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("6", x+2, 93);

		//Lower Six Dash
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8, 310);
		ctx.lineTo(x+14, 310);
		ctx.stroke();

		ctx.font = "9px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("6", x+2, 313);

		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x+8, 100);
		ctx.lineTo(x+14, 100);
		ctx.stroke();

		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x+8, 300);
		ctx.lineTo(x+14, 300);
		ctx.stroke();

		//Upper Two Dash
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8, 110);
		ctx.lineTo(x+14, 110);
		ctx.stroke();

		ctx.font = "9px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("2", x+2, 113);

		//Lower Two Dash
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8, 290);
		ctx.lineTo(x+14, 290);
		ctx.stroke();

		ctx.font = "9px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("2", x+2, 293);

		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x+8, 130);
		ctx.lineTo(x+14, 130);
		ctx.stroke();

		ctx.beginPath()
		ctx.moveTo(x+8, 270);
		ctx.lineTo(x+14, 270);
		ctx.stroke();

		//Upper One Dash
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8, 150);
		ctx.lineTo(x+14, 150);
		ctx.stroke();

		ctx.font = "9px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("1", x+2, 153);

		//Lower One Dash
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8, 250);
		ctx.lineTo(x+14, 250);
		ctx.stroke();

		ctx.font = "9px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("1", x+2, 253);

		ctx.beginPath();
		ctx.arc(x+wid-2, 200, 2, 0, 2*Math.PI);
		ctx.fill();

		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+wid-2, 200);
		if (this.data.rate_of_clb <= 1000 && this.data.rate_of_clb >= -1000) {
			var yShift = this.data.rate_of_clb / 20;

		} else if (this.data.rate_of_clb <= 2000 && this.data.rate_of_clb >= -2000) {
			var yShift = (this.data.rate_of_clb % 1001)/25;
			if (this.data.rate_of_clb < 0) {
				yShift -= 50;
			} else {
				yShift += 50;
			}
		} else if (this.data.rate_of_clb <= 6000 && this.data.rate_of_clb >= -6000) {
			var yShift = ((this.data.rate_of_clb - 2000) % 4001)/200;
			if (this.data.rate_of_clb < 0) {
				yShift -= 90;
			} else {
				yShift += 90;
			}
		}
		ctx.lineTo(x+12, 200-yShift);
		ctx.stroke();

		ctx.font = "11px Arial";
		ctx.fillStyle = "#e357ff";
		ctx.fillText(data.mcp_vert_spd_ds, location.x, location.y - 5);
	}
}