function enterData() {
	// MCP Entry
	var i = data_index;
	mcpSim.memory.mcp_ias_mach_ds = format_mcp_dials(raw_memory[i]["\"mcp_ias_mach_ds\""]);
	mcpSim.memory.mcp_hdg_ds = format_mcp_dials(raw_memory[i]["\"mcp_hdg_ds\""]);
	mcpSim.memory.mcp_alt_ds = format_mcp_dials(raw_memory[i]["\"mcp_alt_ds\""]);
	mcpSim.memory.mcp_vert_spd_ds = format_mcp_dials(raw_memory[i]["\"mcp_vert_spd_ds\""]);

	mcpSim.memory.mcp_n1 = zero_or_one(raw_memory[i]["\"mcp_n1\""]);
	mcpSim.memory.mcp_spd = zero_or_one(raw_memory[i]["\"mcp_spd\""]);
	mcpSim.memory.mcp_lvl_spd = zero_or_one(raw_memory[i]["\"mcp_lvl_spd\""]);
	mcpSim.memory.mcp_vnav = zero_or_one(raw_memory[i]["\"mcp_vnav\""]);
	mcpSim.memory.mcp_lnav = zero_or_one(raw_memory[i]["\"mcp_lnav\""]);
	mcpSim.memory.mcp_vor_loc = zero_or_one(raw_memory[i]["\"mcp_vor_loc\""]);
	mcpSim.memory.mcp_apprh = zero_or_one(raw_memory[i]["\"mcp_apprh\""]);
	mcpSim.memory.mcp_hdg_sel = zero_or_one(raw_memory[i]["\"mcp_hdg_sel\""]);
	mcpSim.memory.mcp_alt_hld = zero_or_one(raw_memory[i]["\"mcp_alt_hld\""]);
	mcpSim.memory.mcp_vert_spd = zero_or_one(raw_memory[i]["\"mcp_vert_spd\""]);
	mcpSim.memory.mcp_cmd_a = zero_or_one(raw_memory[i]["\"mcp_cmd_a\""]);
	mcpSim.memory.mcp_cmd_b = zero_or_one(raw_memory[i]["\"mcp_cmd_b\""]);
	mcpSim.memory.mcp_cws_a = zero_or_one(raw_memory[i]["\"mcp_cws_a\""]);
	mcpSim.memory.mcp_cws_b = zero_or_one(raw_memory[i]["\"mcp_cws_b\""]);
	mcpSim.memory.mcp_fd_1 = zero_or_one(raw_memory[i]["\"mcp_fd_1\""]);
	mcpSim.memory.mcp_fd_2 = zero_or_one(raw_memory[i]["\"mcp_fd_2\""]);
	mcpSim.memory.mcp_at_arm = zero_or_one(raw_memory[i]["\"mcp_at_arm\""]);
	mcpSim.memory.mcp_spd_intv = zero_or_one(raw_memory[i]["\"mcp_spd_intv\""]);
	mcpSim.memory.mcp_alt_intv = zero_or_one(raw_memory[i]["\"mcp_alt_intv\""]);

	//Misc Entry
	miscSim.memory.throttle_1_pos = format_misc(raw_memory[i]["\"throttle_1_pos\""]);
	miscSim.memory.throttle_2_pos = format_misc(raw_memory[i]["\"throttle_2_pos\""]);
	miscSim.memory.flap_angle = format_misc(raw_memory[i]["\"flap_angle\""]);
	miscSim.memory.spoiler_pos = format_misc(raw_memory[i]["\"spoiler_pos\""]);

	miscSim.memory.mstr_caution = zero_or_one(raw_memory[i]["\"mstr_caution\""]);
	miscSim.memory.capt_ap_discon = zero_or_one(raw_memory[i]["\"capt_ap_discon\""]);
	miscSim.memory.fo_ap_discon = zero_or_one(raw_memory[i]["\"fo_ap_discon\""]);
	miscSim.memory.ap_caut_lt = zero_or_one(raw_memory[i]["\"ap_caut_lt\""]);
	miscSim.memory.ap_warn_lt = zero_or_one(raw_memory[i]["\"ap_warn_lt\""]);
	miscSim.memory.ap_discon_horn = zero_or_one(raw_memory[i]["\"ap_discon_horn\""]);
	miscSim.memory.alt_warn_horn = zero_or_one(raw_memory[i]["\"alt_warn_horn\""]);
	miscSim.memory.at_1_discon = zero_or_one(raw_memory[i]["\"at_1_discon\""]);
	miscSim.memory.at_2_discon = zero_or_one(raw_memory[i]["\"at_2_discon\""]);
	miscSim.memory.at_caut_lt = zero_or_one(raw_memory[i]["\"at_caut_lt\""]);
	miscSim.memory.at_warn_lt = zero_or_one(raw_memory[i]["\"at_warn_lt\""]);
	miscSim.memory.FMC_alert_lt = zero_or_one(raw_memory[i]["\"FMC_alert_lt\""]);
	// ND Entry
	ndSim.memory.fo_ef_nd_mode = format_nd(raw_memory[i]["\"fo_ef_nd_mode\""]);
	ndSim.memory.fo_ef_rnge = format_nd(raw_memory[i]["\"fo_ef_rnge\""]);
	ndSim.memory.true_as = format_pfd_round(raw_memory[i]["\"true_as\""]);
	ndSim.memory.gnd_spd = format_pfd_round(raw_memory[i]["\"gnd_spd\""]);
	ndSim.memory.hdg_angle = format_nd(raw_memory[i]["\"hdg_angle\""]);
	ndSim.memory.lat = format_nd(raw_memory[i]["\"lat\""]);
	ndSim.memory.long = format_nd(raw_memory[i]["\"long\""]);
	ndSim.memory.mag_track_angle = format_nd(raw_memory[i]["\"mag_track_angle\""]);
	ndSim.memory.mag_hdg_angle = format_nd(raw_memory[i]["\"mag_hdg_angle\""]);
	ndSim.memory.wind_dir_at_ac = format_nd(raw_memory[i]["\"wind_dir_at_ac\""]);
	ndSim.memory.wind_spd_at_ac = format_nd(raw_memory[i]["\"wind_spd_at_ac\""]);
	ndSim.memory.fo_vsd_on = zero_or_one(raw_memory[i]["\"fo_vsd_on\""]);
	ndSim.memory.fo_bel_gs_lt = format_nd(raw_memory[i]["\"fo_bel_gs_lt\""]);

	// PFD Entry
	pfdSim.memory.at_eng_mode = pfd_strings(raw_memory[i]["\"at_eng_mode\""]);
	pfdSim.memory.fo_roll_eng = pfd_strings(raw_memory[i]["\"fo_roll_eng\""]);
	pfdSim.memory.fo_roll_arm = pfd_strings(raw_memory[i]["\"fo_roll_arm\""]);
	pfdSim.memory.fo_pit_eng = pfd_strings(raw_memory[i]["\"fo_pit_eng\""]);
	pfdSim.memory.fo_pit_arm = pfd_strings(raw_memory[i]["\"fo_pit_arm\""]);
	pfdSim.memory.fo_ap_stat = pfd_strings(raw_memory[i]["\"fo_ap_stat\""]);

	pfdSim.memory.fo_cws_pit = format_pfd_preserve(raw_memory[i]["\"o_cws_pit\""]);
	pfdSim.memory.fo_cws_roll = format_pfd_preserve(raw_memory[i]["\"fo_cws_roll\""]);
	pfdSim.memory.fo_cmd_pit_dev = format_pfd_preserve(raw_memory[i]["\"fo_cmd_pit_dev\""]);
	pfdSim.memory.fo_cmd_roll_dev = format_pfd_preserve(raw_memory[i]["\"fo_cmd_roll_dev\""]);
	pfdSim.memory.ils_2_gs_dev = format_pfd_preserve(raw_memory[i]["\"ils_2_gs_dev\""]);
	pfdSim.memory.ils_2_loc_dev = format_pfd_preserve(raw_memory[i]["\"ils_2_loc_dev\""]);
	pfdSim.memory.mcp_ias_mach_ds = format_pfd_preserve(raw_memory[i]["\"mcp_ias_mach_ds\""]);
	pfdSim.memory.mcp_alt_ds = format_pfd_preserve(raw_memory[i]["\"mcp_alt_ds\""]);
	pfdSim.memory.mcp_vert_spd_ds = format_pfd_preserve(raw_memory[i]["\"mcp_vert_spd_ds\""]);
	pfdSim.memory.fo_ef_baro_cur = format_pfd_preserve(raw_memory[i]["\"fo_ef_baro_cur\""]);
	pfdSim.memory.cal_as = format_pfd_preserve(raw_memory[i]["\"cal_as\""]);
	pfdSim.memory.rate_of_clb = format_pfd_preserve(raw_memory[i]["\"rate_of_clb\""]);
	pfdSim.memory.pres_alt = format_pfd_preserve(raw_memory[i]["\"pres_alt\""]);
	pfdSim.memory.pitch_angle = format_pfd_preserve(raw_memory[i]["\"pitch_angle\""]);
	pfdSim.memory.roll_angle = format_pfd_preserve(raw_memory[i]["\"roll_angle\""]);

	pfdSim.memory.hdg_angle = format_pfd_round(raw_memory[i]["\"hdg_angle\""]);
	pfdSim.memory.radio_alt = format_pfd_round(raw_memory[i]["\"radio_alt\""]);
}
function zero_or_one(val) {
		if (val == "") {
			return false;
		} else if (val == "1") {
			return true;
		} else {
			return false;
		}
	}

function format_mcp_dials(val) {
	if (val == "" || isNaN(val)) {
		return "";
	} else {
		return Math.round(val);
	}
}

function format_nd(val) {
	if (val == "" || isNaN(val)) {
		return "";
	} else {
		return Math.round(val * 10) / 10;
	}
}

function format_pfd_round(val) {
	if (val == "" || !val || isNaN(val)) {
		return 0;
	} else {
		return Math.round(val);
	}
}

function format_pfd_preserve(val) {
	if (val == "" || !val || isNaN(val)) {
		return 0;
	} else {
		var rounded = Math.round(val * 1000) / 1000
		return rounded;
	}
}

function pfd_strings(val) {
	if (val == "") {
		return "";
	} else {
		return val.replace(/['"\s]+/g, '');
	}
}

function format_misc(val) {
	if (val == "") {
		return "";
	} else {
		return Math.round(val * 1000000) / 1000000;
	}
}
enterData();