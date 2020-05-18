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
        ctx.fillText("GS", 5, 20);

        ctx.font = "18px Arial";
        ctx.fillText(this.memory.gnd_spd, 25, 20);

        ctx.font = "12px Arial";
        ctx.fillText("TAS", 64, 20);

        ctx.font = "18px Arial";
        ctx.fillText(this.memory.true_as, 88, 20);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, 24);
        ctx.lineTo(60, 2);
        ctx.stroke();

        ctx.fillStyle = '#5afc03';
        ctx.font = "15px Arial";
        ctx.fillText(this.memory.wind_dir_at_ac, 5, 38);
        ctx.fillText(this.memory.wind_spd_at_ac, 64, 38);

        ctx.strokeStyle = 'white';
        ctx.strokeRect((ctxWid/2) - 45, -1, 90, 32);

        ctx.font = "30px Arial";
        ctx.fillStyle = 'white';
        var textSize = ctx.measureText(this.memory.mag_track_angle).width / 2;
        ctx.fillText(this.memory.mag_track_angle, (ctxWid/2) - textSize, 26);

        ctx.font = "14px Arial";
        ctx.fillStyle = "#5afc03";
        ctx.fillText("TRK", 124, 32);
        ctx.fillText("MAG", 247, 32);

        ctx.strokeStyle = 'white';
        ctx.strokeRect(247, 40, 45, 22);

        ctx.font = "18px Arial"
        ctx.fillStyle = 'white';
        var textSize = ctx.measureText(this.memory.hdg_angle).width / 2
        ctx.fillText(this.memory.hdg_angle, 270 - textSize, 58);
        ctx.fillStyle = "#5afc03";
        ctx.fillText(this.memory.mag_hdg_angle, 294, 63);

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(200, 290);
        ctx.lineTo(230, 380);
        ctx.lineTo(170, 380);
        ctx.lineTo(200, 290);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(200, 290);
        ctx.lineTo(200, 72);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(200, 272, 200, -5*Math.PI/6, -Math.PI/6);
        ctx.stroke();

        var coeff = ((this.memory.hdg_angle - 90)/8) % 1;
        for (i = 0; i < 9; i++) {
            var angle = Math.PI*(i - 10 + coeff)/12; 
            var xFactor = 200*Math.cos(angle);
            var yFactor = 200*Math.sin(angle);
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            if (i % 2 == 0) {
                ctx.moveTo(200+(0.8*xFactor), 272+(0.8*yFactor));
            } else {
                ctx.moveTo(200+(0.9*xFactor), 272+(0.9*yFactor));
            }
            if (xFactor <= 175 && xFactor >= -220) {
                ctx.lineTo(200 + xFactor, 272 + yFactor);
                ctx.stroke();
            }
        }
        
        ctx.beginPath();
        ctx.moveTo(342, 380);
        ctx.lineTo(360, 380);
        ctx.lineTo(360, 345);
        ctx.lineTo(342, 345);
        ctx.lineTo(360, 345);
        ctx.lineTo(360, 310);
        ctx.lineTo(342, 310);
        ctx.stroke();

        strokeWideRhombus(ctx, 373, 345, 8, "#f4b8ff");

        ctx.font = "12px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText("LAT", 235, 362);
        ctx.fillText("LONG", 235, 380);

        ctx.font = "18px Arial";
        ctx.fillStyle = '#5afc03';
        ctx.fillText(this.memory.lat, 275, 362);
        ctx.fillText(this.memory.long, 275, 380);

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
        ctx.fillText(string, 5, 348);
        ctx.fillText(self.memory.fo_ef_rnge, 5, 368);
        ctx.fillText("-------", 5, 384);

        if (this.memory.fo_bel_gs_lt != 0) {
            ctx.beginPath();
            ctx.fillStyle = "#5afc03";
            ctx.arc(288, 298, 3, 0, 2*Math.PI);
            ctx.fill();

            ctx.font = "12px Arial";
            ctx.fillText("BELOW G/S", 294, 303);
        }

        if (this.memory.fo_vsd_on) {
            var coverX = (ctxWid/5) - 5;
            var coverY = (ctxHei/1.75) - 25;
            var coverWid = (ctxWid*3/5) + 10;
            var coverHei = ctxHei - coverY - 15;
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