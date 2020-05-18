function HeadingDial(ctx, location, data) {
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

		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.arc(x, y + 25, wid + 20, 0, Math.PI, true);
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x,401);
		ctx.strokeStyle = 'white';
		theta = (this.data.hdg_angle) * (Math.PI/180);
		var adjustmentFactor = 10*Math.abs(Math.cos(0.75*theta))
		var r = wid + adjustmentFactor - 5;
		var newX = x - (r*Math.cos(theta));
		var newY = y - (r*Math.sin(theta));
		ctx.lineTo(newX, newY);
		ctx.stroke();

		ctx.fillStyle = 'white';
		ctx.fillRect(x - 25, y - wid + 1, 50, 20);

		ctx.fillStyle = 'black';
		ctx.fillRect(x - 23, y - wid + 3, 46, 16);

		ctx.font = "15px Arial";
		ctx.fillStyle = 'white';
		var l = ctx.measureText(this.data.hdg_angle)['width'];
		ctx.fillText(this.data.hdg_angle, x - (l/2), y - wid + 17);

		ctx.font = "14px Arial";
		ctx.fillStyle = "#5afc03";
		var l = ctx.measureText(this.data.radio_alt)['width'];
		ctx.fillText(this.data.radio_alt, x - (l/2), y-wid-1);

	}
}