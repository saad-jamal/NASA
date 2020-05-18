function MCPPanel(sim) {
	var self = this;
	self.sim = sim;
	self.components = {
		//Displays
		mcp_ias_mach_ds: new TextDisplay(sim, "mcp_ias_mach_ds"),
		mcp_hdg_ds: new TextDisplay(sim, "mcp_hdg_ds"),
		mcp_alt_ds: new TextDisplay(sim, "mcp_alt_ds"),
		mcp_vert_spd_ds: new TextDisplay(sim, "mcp_vert_spd_ds"),

		//Buttons/LED
		mcp_n1: new LEDButton(sim, "mcp_n1"),
		mcp_spd: new LEDButton(sim, "mcp_spd"),
		mcp_lvl_spd: new LEDButton(sim, "mcp_lvl_spd"),
		mcp_vnav: new LEDButton(sim, "mcp_vnav"),
		mcp_lnav: new LEDButton(sim, "mcp_lnav"),
		mcp_vor_loc: new LEDButton(sim, "mcp_vor_loc"),
		mcp_apprh: new LEDButton(sim, "mcp_apprh"),
		mcp_hdg_sel: new LEDButton(sim, "mcp_hdg_sel"),
		mcp_alt_hld: new LEDButton(sim, "mcp_alt_hld"),
		mcp_vert_spd: new LEDButton(sim, "mcp_vert_spd"),
		mcp_cmd_a: new LEDButton(sim, "mcp_cmd_a"),
		mcp_cmd_b: new LEDButton(sim, "mcp_cmd_b"),
		mcp_cws_a: new LEDButton(sim, "mcp_cws_a"),
		mcp_cws_b: new LEDButton(sim, "mcp_cws_b"),

		//Switches
		mcp_fd_1: new ToggleSwitch(sim, "mcp_fd_1"),
		mcp_fd_2: new ToggleSwitch(sim, "mcp_fd_2"),
		mcp_at_arm: new ToggleSwitch(sim, "mcp_at_arm"),
		mcp_spd_intv: new ToggleSwitch(sim, "mcp_spd_intv"),
		mcp_alt_intv: new ToggleSwitch(sim, "mcp_alt_intv")
	};

	self.render = function() {
		self.renderDisplays();
		self.renderButtons();
		self.renderSwitches();
		
		for (var name in self.components) {
			self.components[name].render();
		}
	}

	self.renderDisplays = function() {
		self.components.mcp_ias_mach_ds.val = self.sim.memory.mcp_ias_mach_ds;
		self.components.mcp_hdg_ds.val = self.sim.memory.mcp_hdg_ds;
		self.components.mcp_alt_ds.val = self.sim.memory.mcp_alt_ds;
		self.components.mcp_vert_spd_ds.val = self.sim.memory.mcp_vert_spd_ds;
	}

	self.renderButtons = function() {
		self.components.mcp_n1.illuminated = self.sim.memory.mcp_n1;
		self.components.mcp_spd.illuminated = self.sim.memory.mcp_spd;
		self.components.mcp_lvl_spd.illuminated = self.sim.memory.mcp_lvl_spd;
		self.components.mcp_vnav.illuminated = self.sim.memory.mcp_vnav;
		self.components.mcp_lnav.illuminated = self.sim.memory.mcp_lnav;
		self.components.mcp_vor_loc.illuminated = self.sim.memory.mcp_vor_loc;
		self.components.mcp_apprh.illuminated = self.sim.memory.mcp_apprh;
		self.components.mcp_hdg_sel.illuminated = self.sim.memory.mcp_hdg_sel;
		self.components.mcp_alt_hld.illuminated = self.sim.memory.mcp_alt_hld;
		self.components.mcp_vert_spd.illuminated = self.sim.memory.mcp_vert_spd;
		self.components.mcp_cmd_a.illuminated = self.sim.memory.mcp_cmd_a;
		self.components.mcp_cmd_b.illuminated = self.sim.memory.mcp_cmd_b;
		self.components.mcp_cws_a.illuminated = self.sim.memory.mcp_cws_a;
		self.components.mcp_cws_b.illuminated = self.sim.memory.mcp_cws_b;
	}

	self.renderSwitches = function() {
		self.components.mcp_fd_1.on = self.sim.memory.mcp_fd_1;
		self.components.mcp_fd_2.on = self.sim.memory.mcp_fd_2;
		self.components.mcp_at_arm.on = self.sim.memory.mcp_at_arm;
		self.components.mcp_spd_intv.on = self.sim.memory.mcp_spd_intv;
		self.components.mcp_alt_intv.on = self.sim.memory.mcp_alt_intv;
	}
}