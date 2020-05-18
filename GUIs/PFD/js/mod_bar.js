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

		ctx.fillText(data.at_eng_mode, 125, 30);
		ctx.fillText(data.fo_roll_eng, 225, 30);
		ctx.fillText(data.fo_pit_eng, 325, 30);

		ctx.fillStyle = "#ffffff";
		ctx.font = "11px Arial";
		ctx.fillText(data.fo_roll_arm, 225, 45);
		ctx.fillText(data.fo_pit_arm, 325, 45);

		ctx.beginPath();
		ctx.moveTo(210, 15);
		ctx.lineTo(210, 55);
		ctx.strokeStyle = "#ffffff";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(310, 15);
		ctx.lineTo(310, 55);
		ctx.strokeStyle = "#ffffff";
		ctx.stroke();

		if (data.fo_cws_roll) {
			ctx.beginPath();
			ctx.fillStyle = "#5afc03";
			ctx.arc(280, 42, 4, 0, 2*Math.PI);
			ctx.fill();
		}

		if (data.fo_cws_pit) {
			ctx.beginPath();
			ctx.fillStyle = "#5afc03";
			ctx.arc(380, 42, 4, 0, 2*Math.PI);
			ctx.fill();
		}
	}

}