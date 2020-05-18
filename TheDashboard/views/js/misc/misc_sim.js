function MiscSim() {
	var self = this;
	self.memory = {
		throttle_1_pos: 0,
		throttle_2_pos: 0,
		flap_angle: 0,
		spoiler_pos: 0,
		mstr_caution: false,
		capt_ap_discon: false,
		fo_ap_discon: false,
		ap_caut_lt: false,
		ap_warn_lt: false,
		ap_discon_horn: false,
		alt_warn_horn: false,
		at_1_discon: false,
		at_2_discon: false,
		at_caut_lt: false,
		at_warn_lt: false,
		FMC_alert_lt: false
	}

	this.draw = function(ctx, ctxWid, ctxHei) {
		//Full Reset
		ctx.clearRect(0, 0, ctxWid, ctxHei);
		ctx.fillStyle = 'black';
		ctx.lineWidth = 10;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(ctxWid/2, 65);
		var r = 80;
		var theta = this.memory.throttle_1_pos * (Math.PI/180)
		var rX = (ctxWid/2) - (r*Math.cos(theta));
		var rY = 65 - (r*Math.sin(theta));
		ctx.lineTo(rX, rY);
		ctx.stroke();

		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(ctxWid/2, 70, ctxWid/3.5, 0, Math.PI, true);
		ctx.fill();

		ctx.font = "14px Arial";
		var textSize = ctx.measureText("THROTTLE #1").width / 2
		ctx.fillText("THROTTLE #1: "+ this.memory.throttle_1_pos.toFixed(1), ctxWid/2 - textSize - 12, ctxWid/3.5 + 38);

		ctx.beginPath();
		ctx.arc(ctxWid/2, 180, ctxWid/3.5, 0, Math.PI, true);
		ctx.fill();

		ctx.lineWidth = 10;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(ctxWid/2, 175);
		var r = 80;
		var theta = this.memory.throttle_2_pos * (Math.PI/180);
		var rX = (ctxWid/2) - (r*Math.cos(theta));
		var rY = 175 - (r*Math.sin(theta));
		ctx.lineTo(rX, rY);
		ctx.stroke();

		ctx.font = "14px Arial";
		var textSize = ctx.measureText("THROTTLE #2").width / 2
		ctx.fillText("THROTTLE #2: "+ this.memory.throttle_2_pos.toFixed(1), ctxWid/2 - textSize - 12, 193);

		ctx.lineWidth = 1;
		ctx.font = "8px Arial";
		ctx.strokeRect(41, 205, 30, 250);
		ctx.strokeRect(91, 205, 30, 125);
		ctx.lineWidth = 0.5;
		var val = this.memory.spoiler_pos;
		for (i = 0; i < 5; i++) {
			ctx.fillText(Math.round(((val + 0.2) - (i/10))*10)/10, 95, 218 + (i*25));
			ctx.beginPath;
			ctx.moveTo(110, 215 + (i*25));
			ctx.lineTo(120, 215 + (i*25));
			ctx.stroke();
		}

        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(120, 265);
        ctx.lineTo(130, 275);
        ctx.lineTo(155, 275);
        ctx.lineTo(155, 255);
        ctx.lineTo(130, 255);
        ctx.lineTo(120, 265);
        ctx.stroke();

        ctx.font = "15px Arial";
        ctx.fillText(this.memory.spoiler_pos, 128, 270);

		ctx.beginPath();
		ctx.fillStyle = 'green';
		if (this.memory.flap_angle >= 0 && this.memory.flap_angle <= 1) {
			var adjustedY = 220 + (this.memory.flap_angle)*35;
		} else if (this.memory.flap_angle <= 5) {
			var adjustedY = 255 + (this.memory.flap_angle)*35/5;
		} else if (this.memory.flap_angle <= 15) {
			var adjustedY = 290 + (this.memory.flap_angle)*35/15;
		} else if (this.memory.flap_angle <= 25) {
			var adjustedY = 325 + (this.memory.flap_angle)*35/25;
		} else if (this.memory.flap_angle <= 30) {
			var adjustedY = 360 + (this.memory.flap_angle)*35/30;
		} else {
			var adjustedY = 395 + (this.memory.flap_angle)*35/45;
		}
		ctx.arc(56, adjustedY, 10, 0, 2*Math.PI);
		ctx.fill();

		ctx.fillStyle = 'black';
		ctx.font = "10px Arial";
		ctx.fillText("UP", 48, 225);
		ctx.fillText("1", 48, 260);
		ctx.fillText("5", 48, 295);
		ctx.fillText("15", 48, 330);
		ctx.fillText("25", 48, 365);
		ctx.fillText("30", 48, 400);
		ctx.fillText("45", 48, 435);

		ctx.fillStyle = 'red';
		ctx.font = "12px Arial";
		var ledger = 475;
		var spacing = 14;
		if (this.memory.mstr_caution) {
			ctx.fillText("▻ MASTER CAUTION", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.capt_ap_discon) {
			ctx.fillText("▻ CAPT A/P DISCON", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.fo_ap_discon) {
			ctx.fillText("▻ FO A/P DISCON", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.ap_caut_lt) {
			ctx.fillText("▻ A/P CAUTION Lt", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.ap_warn_lt) {
			ctx.fillText("▻ A/P WARNING Lt", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.ap_discon_horn) {
			ctx.fillText("▻ A/P DISCON HORN", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.alt_warn_horn) {
			ctx.fillText("▻ ALT WARN HORN", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.alt_1_discon) {
			ctx.fillText("▻ #1 A/T DISCON", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.alt_2_discon) {
			ctx.fillText("▻ #2 A/T DISCON", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.at_caut_lt) {
			ctx.fillText("▻ A/T CAUTION Lt", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.at_warn_lt) {
			ctx.fillText("▻ A/T WARNING Lt", 10, ledger);
			ledger += spacing;
		}
		if (this.memory.FMC_alert_lt) {
			ctx.fillText("▻ FMC ALERT Lt", 10, ledger);
			ledger += spacing;
		}
	}
}