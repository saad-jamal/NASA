function LEDButton(sim, domID) {
	var self = this;
	self.sim = sim;
	self.domID = domID;
	self.q = "#" + self.domID;
	self.illuminated = false;

	self.render = function() {
		if (self.illuminated) {
			$(self.q).addClass("on");
		} else {
			$(self.q).removeClass("on");
		}
	}
}

function ToggleSwitch(sim, domID) {
	var self = this;
	self.sim = sim;
	self.domID = domID;
	self.q = "#" + self.domID;
	self.on = false;

	self.render = function() {
		if (self.on) {
			$(self.q).addClass("on");
		} else {
			$(self.q).removeClass("on");
		}
	}
}

function TextDisplay(sim, domID) {
	var self = this;
	self.val = "0";
	self.domID = domID;
	self.q = "#" + self.domID;

	self.render = function() {
		$(self.q).text(self.val);
	}
}