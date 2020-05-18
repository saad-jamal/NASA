function ModeBar(ctx, location, data) {
	this.ctx = ctx;
	this.loc = location;
	this.data = data;

	this.update = function(data) {
		this.data = data;
	}

	this.draw = function() {
		ctx.font = "15px Arial";
		ctx.fillStyle = "#5afc03";

		ctx.fillText(data.at_eng_mode, 72, 20);
		ctx.fillText(data.fo_roll_eng, 152, 20);
		ctx.fillText(data.fo_pit_eng, 232, 20);

		ctx.fillStyle = "#ffffff";
		ctx.font = "11px Arial";
		ctx.fillText(data.fo_roll_arm, 152, 38);
		ctx.fillText(data.fo_pit_arm, 232, 38);

		ctx.beginPath();
		ctx.moveTo(147, 5);
		ctx.lineTo(147, 45);
		ctx.strokeStyle = "#ffffff";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(225, 5);
		ctx.lineTo(225, 45);
		ctx.strokeStyle = "#ffffff";
		ctx.stroke();

		if (data.fo_cws_roll) {
			ctx.beginPath();
			ctx.fillStyle = "#5afc03";
			ctx.arc(200, 34, 4, 0, 2*Math.PI);
			ctx.fill();
		}

		if (data.fo_cws_pit) {
			ctx.beginPath();
			ctx.fillStyle = "#5afc03";
			ctx.arc(285, 34, 4, 0, 2*Math.PI);
			ctx.fill();
		}
	}

}