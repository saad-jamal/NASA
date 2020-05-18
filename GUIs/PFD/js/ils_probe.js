function gsProbe(ctx, location, data) {
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

		var rY = y - (200*this.data.ils_2_gs_dev);
		fillTallRhombus(ctx, x, rY, wid, "c");

		//Notches
		startingX = x - (.25*wid)
		endingX = x + (1.5*wid);
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';

		//Middle Notch
		ctx.beginPath();
		ctx.moveTo(startingX, y)
		ctx.lineTo(endingX,y);
		ctx.stroke();

		//Top Two
		startingX = x + 8;
		startingY = y - 50;
		ctx.beginPath();
		ctx.arc(startingX, startingY, wid/2, 0, 2*Math.PI);
		ctx.stroke();

		startingY = y - 100;
		ctx.beginPath();
		ctx.arc(startingX, startingY, wid/2, 0, 2*Math.PI);
		ctx.stroke();

		//Bottom Two
		startingX = x + 8;
		startingY = y + 50;
		ctx.beginPath();
		ctx.arc(startingX, startingY, wid/2, 0, 2*Math.PI);
		ctx.stroke();

		startingY = y + 100;
		ctx.beginPath();
		ctx.arc(startingX, startingY, wid/2, 0, 2*Math.PI);
		ctx.stroke();
	}
}

function locProbe(ctx, location, data) {
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

		var rX = x + (140*this.data.ils_2_loc_dev);
		fillWideRhombus(ctx, rX, y, wid, "#f3b8ff");

		//Notches
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		var startingY = y - (0.8*wid);
		var endingY = y + (0.8*wid);

		//Middle Notch
		ctx.beginPath();
		ctx.moveTo(x, startingY)
		ctx.lineTo(x, endingY);
		ctx.stroke();

		//Right Notch
		startingX = (x + 67.5);
		ctx.strokeRect(startingX, y - wid/2, 5, wid);

		//Right Notch
		startingX = (x - 72.5);
		ctx.strokeRect(startingX, y - wid/2, 5, wid);
	}
}

function fillTallRhombus(ctx, x, y, width, color) {   
	halfWidth = width / 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    x+=8;
    y+=0.5;

    ctx.beginPath();
   	ctx.moveTo(x+0.8, y + halfWidth+5); // Top
    ctx.lineTo(x - halfWidth, y); // Left
    ctx.lineTo(x, y - halfWidth-5); // Bottom
    ctx.lineTo(x + halfWidth, y); // Right
    ctx.lineTo(x-0.8, y + halfWidth+5); // Back to Top
    ctx.fill();
    ctx.stroke();
}


function fillWideRhombus(ctx, x, y, width, color) {   
	halfWidth = width / 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
   	ctx.moveTo(x+.8, y + halfWidth); // Top
    ctx.lineTo(x - halfWidth-5, y); // Left
    ctx.lineTo(x, y - halfWidth); // Bottom
    ctx.lineTo(x + halfWidth+5, y); // Right
    ctx.lineTo(x-.8, y + halfWidth); // Back to Top
    ctx.fill();
    ctx.stroke();
}