const state = {
	isDark: true
};

const getters = {
	isDark(state) {
		return state.isDark;
	}
};

const mutations = {
	toggleIsDark(state) {
		state.isDark = !state.isDark;
	}
};

const actions = {
	changeTheme({ commit }) {
		commit("toggleIsDark");
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};