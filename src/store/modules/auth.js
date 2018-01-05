import axios from "../../data";
import router from "../../routes";

const state = {
	user: {},
	session: null,
};

const getters = {
	isAuthenticated(state) {
		console.log("state.user.id", state.user.id);
		return state.user.id !== undefined;
	},
};

const mutations = {
	setUser(state, user) {
		state.user = user;
	}
};

const actions = {
	signup({ commit }, user) {

	},

	login({ commit, dispatch }, creds) {
		axios.post("/verify", creds)
			.then(res => {
				console.log(res.data);
				if(!res.data.id) {
					throw new Error("Invalid username or password")
				};

				commit("setUser", res.data);
				router.replace("/");
			})
			.catch(error => console.error);
	},

	logout({ commit }) {
		commit("setUser", {});
		router.replace("/signin");
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};