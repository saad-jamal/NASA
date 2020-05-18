function AttitudeIndicator(ctx, location, data) {
	this.ctx = ctx;
	this.data = data;
	this.loc = location;
	this.pixelsPerDegree = 5;
	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		this.drawBackground(this.data.pitch_angle, this.data.roll_angle);
		this.drawForeground(0, this.data.fo_cmd_pit_dev, this.data.fo_cmd_roll_dev); //The argument to this function can change the circle in the wings.
		this.drawMisc(this.data.fo_ap_stat);	
	}

	this.drawBackground = function(pitchAngle, rollAngle) {
		var ctx = this.ctx;

		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		ctx.save();
		ctx.rect(x, y, wid, hei);
		ctx.clip();

		ctx.translate(x + wid / 2, y + hei / 2);
		ctx.rotate(rollAngle * Math.PI / 180);
		ctx.translate(0, this.pixelsPerDegree * pitchAngle); //5 Represents the pixels per degree

		ctx.fillStyle = SKY;
		ctx.fillRect(- wid, -1000, 2 * wid, 1000);
		ctx.fillStyle = GROUND;
		ctx.fillRect(-wid, 0, 2 * wid, 1000);
		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.fillRect(- wid, 0, 2*wid, 1);

		var WIDTH_TEN = 100;
		var WIDTH_FIVE = 50;

		for (var i = -90; i < 90; i += 5)
		{
			ctx.fillStyle = GUAGE_FOREGROUND;
			ctx.font = "15px Arial";
			ctx.textAlign = "center"
			ctx.textBaseline = 'middle';
			var newY = - i * (this.pixelsPerDegree)
			if (i % 10 == 0 && i != 0)
			{
				ctx.fillRect(- WIDTH_TEN / 2, newY, WIDTH_TEN, 1);
				ctx.fillText(i, - WIDTH_TEN / 2 - 20, newY);
				ctx.fillText(i, + WIDTH_TEN / 2 + 20, newY);
			}
			else if (i != 0)
			{
				ctx.fillRect(- WIDTH_FIVE / 2, newY, WIDTH_FIVE, 1);
			}
		}

		ctx.restore();
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 2;
		ctx.strokeRect(x,y,wid,hei);
		ctx.lineWidth = 1;
	}

	this.drawForeground = function(turnCoordinationAngle, pDev, rDev) {
		turnCoordinationAngle = 0;
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		ctx.save();
		ctx.translate(x + wid / 2, y + hei / 2);

		//pDev and rDev drawings
		ctx.strokeStyle = "#e357ff";
		ctx.fillStyle = "#e357ff";

		//pDev
		pDev = pDev * -5 * this.pixelsPerDegree;
		var widthPDev = 200;
		var xPDev = 0 - (widthPDev/2);
		var heiPDev = 5;
		var YaddFactor = pDev;
		var yPDev = YaddFactor - (heiPDev/2);
		ctx.fillRect(xPDev, yPDev, widthPDev, heiPDev);

		rDev = rDev * 5 * this.pixelsPerDegree;
		var XAddFactor = rDev;
		var widthPDev = 5;
		var heiPDev = 200;
		var xPDev = XAddFactor - (widthPDev/2);
		var yPDev = 0 - (heiPDev / 2);
		ctx.fillRect(xPDev, yPDev, widthPDev, heiPDev);

		//Wings
		ctx.fillStyle = "#000";
		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		ctx.moveTo(-125 + 50, -3);
		ctx.lineTo(-50 + 20, -3);
		ctx.lineTo(-50 + 20, 20);
		ctx.lineTo(-56 + 20, 20);
		ctx.lineTo(-56 + 20, 3);
		ctx.lineTo(-125 + 50, 3);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(125 - 50, -3);
		ctx.lineTo(50 - 20, -3);
		ctx.lineTo(50 - 20, 20);
		ctx.lineTo(56 - 20, 20);
		ctx.lineTo(56 - 20, 3);
		ctx.lineTo(125 - 50, 3);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		var boxWidth = 8;

		//Finish box of wing
		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.fillStyle = "#000";
		ctx.rect(-boxWidth, -boxWidth, 2 * boxWidth, 2 * boxWidth);
		ctx.stroke();
		ctx.fill();

		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		ctx.arc(turnCoordinationAngle * this.pixelsPerDegree, 0, boxWidth - 2, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();

		ctx.restore();


	}

	this.drawMisc = function(ap_stat) {
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;
		ctx.strokeStyle = 'white';
		ctx.strokeRect(x + (wid/2) - 45, y - 35, 90, 35);

		ctx.font = "30px Arial";
		ctx.fillStyle = "#5afc03";
		var subfactor = ctx.measureText(ap_stat).width;
		ctx.fillText(ap_stat, x + (wid/2) - (subfactor/2), y - 6);

	}
}