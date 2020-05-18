function NDSim() {
	var self = this;

	self.memory = {
		fo_ef_nd_mode: 0,
		fo_ef_rnge: 0,
		true_as: 0,
		gnd_spd: 0,
		hdg_angle: 0,
		lat: 0,
		long: 0,
		mag_track_angle: 0,
		mag_hdg_angle: 0,
		wind_dir_at_ac: 0,
		wind_spd_at_ac: 0,

		fo_vsd_on: false,
		fo_bel_gs_lt: 0
	}

	this.draw = function(ctx, ctxWid, ctxHei) {
		//Full reset.
		ctx.clearRect(0, 0, ctxWid, ctxHei);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		//Modal Bar
		ctx.font = "12px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText("GS", 15, 25);

		ctx.font = "20px Arial";
		ctx.fillText(this.memory.gnd_spd, 35, 25);

		ctx.font = "12px Arial";
		ctx.fillText("TAS", 80, 25);

		ctx.font = "20px Arial";
		ctx.fillText(this.memory.true_as, 103, 25);

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(75, 30);
		ctx.lineTo(75, 8);
		ctx.stroke();

		ctx.fillStyle = '#5afc03';
		ctx.font = "15px Arial";
		ctx.fillText(this.memory.wind_dir_at_ac, 15, 45);
		ctx.fillText(this.memory.wind_spd_at_ac, 80, 45);

		ctx.strokeStyle = 'white';
		ctx.strokeRect((ctxWid/2) - 60, -1, 120, 40);

		ctx.font = "35px Arial";
		ctx.fillStyle = 'white';
		var textSize = ctx.measureText(this.memory.mag_track_angle).width / 2;
		ctx.fillText(this.memory.mag_track_angle, (ctxWid/2) - textSize, 32);

		ctx.font = "20px Arial";
		ctx.fillStyle = "#5afc03";
		ctx.fillText("TRK", 147, 40);
        ctx.fillText("MAG", 313, 40);

        ctx.strokeStyle = 'white';
        ctx.strokeRect(313, 55, 50, 25);

        ctx.font = "20px Arial"
        ctx.fillStyle = 'white';
        var textSize = ctx.measureText(this.memory.hdg_angle).width / 2
        ctx.fillText(this.memory.hdg_angle, 338 - textSize, 75);
        ctx.fillStyle = "#5afc03";
        ctx.fillText(this.memory.mag_hdg_angle, 368, 80);

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(250, 370);
        ctx.lineTo(285, 470);
        ctx.lineTo(215, 470);
        ctx.lineTo(250, 370);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250, 370);
        ctx.lineTo(250, 90);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(250, 340, 250, -5*Math.PI/6, -Math.PI/6);
        ctx.stroke();

        var coeff = ((this.memory.hdg_angle - 90)/8) % 1;
		for (i = 0; i < 9; i++) {
			var angle = Math.PI*(i - 10 + coeff)/12; 
			var xFactor = 250*Math.cos(angle);
			var yFactor = 250*Math.sin(angle);
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			if (i % 2 == 0) {
				ctx.moveTo(250+(0.8*xFactor), 340+(0.8*yFactor));
			} else {
				ctx.moveTo(250+(0.9*xFactor), 340+(0.9*yFactor));
			}
			if (xFactor <= 217 && xFactor >= -218) {
				ctx.lineTo(250 + xFactor, 340 + yFactor);
				ctx.stroke();
			}
		}

        ctx.beginPath();
        ctx.moveTo(430, 470);
        ctx.lineTo(450, 470);
        ctx.lineTo(450, 430);
        ctx.lineTo(430, 430);
        ctx.lineTo(450, 430);
        ctx.lineTo(450, 390);
        ctx.lineTo(430, 390);
        ctx.stroke();

        strokeWideRhombus(ctx, 465, 430, 10, "#f4b8ff");

        ctx.font = "12px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText("LAT", 290, 450);
        ctx.fillText("LONG", 290, 470);

        ctx.font = "20px Arial";
        ctx.fillStyle = '#5afc03';
        ctx.fillText(this.memory.lat, 330, 450);
        ctx.fillText(this.memory.long, 330, 470);

        var string = "";
        if (this.memory.fo_ef_nd_mode == 1) {
        	string = "APP";
        } else if (this.memory.fo_ef_nd_mode == 2) {
        	string = "VOR";
        } else if (this.memory.fo_ef_nd_mode == 3) {
        	string = "MAP";
        } else if (this.memory.fo_ef_nd_mode == 4) {
        	string = "PLAN";
        }
        ctx.fillText(string, 15, 435);
        ctx.fillText(self.memory.fo_ef_rnge, 15, 460);
        ctx.fillText("-------", 15, 480);

        if (this.memory.fo_bel_gs_lt != 0) {
        	ctx.beginPath();
			ctx.fillStyle = "#5afc03";
			ctx.arc(376, 376, 4, 0, 2*Math.PI);
			ctx.fill();

			ctx.font = "12px Arial";
			ctx.fillText("BELOW G/S", 384, 380);
        }

        if (this.memory.fo_vsd_on) {
        	var coverX = ctxWid/5;
        	var coverY = (ctxHei/1.75);
        	var coverWid = (ctxWid*3/5);
        	var coverHei = ctxHei - coverY - 10;
        	ctx.strokeStyle = 'white'; 
        	ctx.lineWidth = 5;
        	ctx.strokeRect(coverX, coverY, coverWid, coverHei);
        	ctx.fillStyle = 'black';
        	ctx.fillRect(coverX, coverY, coverWid, coverHei);

        	var vsd_img = document.getElementById("vsd_img");
        	ctx.drawImage(vsd_img, coverX, coverY, coverWid, coverHei);
        }
	}
}


function strokeWideRhombus(ctx, x, y, width, color) {   
	halfWidth = width / 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
   	ctx.moveTo(x+.8, y + halfWidth); // Top
    ctx.lineTo(x - halfWidth-5, y); // Left
    ctx.lineTo(x, y - halfWidth); // Bottom
    ctx.lineTo(x + halfWidth+5, y); // Right
    ctx.lineTo(x-.8, y + halfWidth); // Back to Top
    ctx.stroke();
}