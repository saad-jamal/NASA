function MCPSim() {
	var self = this;

	self.memory = {
		//Displays
		mcp_ias_mach_ds: 0,
		mcp_hdg_ds: 0,
		mcp_alt_ds: 0,
		mcp_vert_spd_ds: 0,

		//Buttons
		mcp_n1: false,
		mcp_spd: false,
		mcp_lvl_spd: false,
		mcp_vnav: false,
		mcp_lnav: false,
		mcp_vor_loc: false,
		mcp_apprh: false,
		mcp_hdg_sel: false,
		mcp_alt_hld: false,
		mcp_vert_spd: false,
		mcp_cmd_a: false,
		mcp_cmd_b: false,
		mcp_cws_a: false,
		mcp_cws_b: false,

		//Switches
		mcp_fd_1: false,
		mcp_fd_2: false,
		mcp_at_arm: false,
		mcp_spd_intv: false,
		mcp_alt_intv: false
	}

	self.panel = new MCPPanel(self);
	self.panel.render();
}