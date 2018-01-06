import router from "../../routes";
import axios from "../../data";

const state = {
	user: {},
	session: null,
};

const getters = {
	isAuthenticated(state) {
		console.log("state.user.id", state.user.email);
		return state.user.email !== undefined;
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
				console.log("login response data", res.data);
				if(!res.data.email) {
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