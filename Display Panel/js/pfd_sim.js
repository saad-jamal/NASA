function PFDSim() {
	var self = this;

	self.memory = {
		at_eng_mode: "",
		fo_roll_eng: "",
		fo_roll_arm: "",
		fo_pit_eng: "",
		fo_pit_arm: "",

		fo_cws_pit: false,
		fo_cws_roll: false,

		fo_ap_stat: "",

		fo_cmd_pit_dev: 0,
		fo_cmd_roll_dev: 0,
		ils_2_gs_dev: 0,
		ils_2_loc_dev: 0,
		mcp_ias_mach_ds: 0,
		mcp_alt_ds: 0,
		mcp_vert_spd_ds: 0,
		fo_ef_baro_cur: 0,
		cal_as: 0,
		rate_of_clb: 0,
		pres_alt: 0,
		radio_alt: 0,
		pitch_angle: 0,
		roll_angle: 0,
		hdg_angle: 0
	}
}