import router from "../../routes";
import axios from "../../data";

const state = {
	user: {},
	session: null,
};

const getters = {
	isAuthenticated(state) {
		console.log("state.user.email", state.user.email);
		return state.user.email !== undefined;
	},
	user() {
		return state.user;
	}
};

const mutations = {
	setUser(state, user) {
		state.user = user;
	}
};

const actions = {
	login({ commit }, creds) {
		axios.post("/login", creds)
			.then(res => {
				if(!res.data.email) {
					throw new Error("Invalid username or password")
				};
				commit("setUser", res.data);
				router.replace("/");
			})
			.catch(error => console.error);
	},

	logout({ commit }) {
		axios.post("/logout")
		.then(res => {
			if (res.status !== 200) throw new Error(res.data);

			commit("setUser", {});
			document.cookie = `name=carebearium.connect.sid;expires=${new Date()};`;
			router.replace("/signin");
		})
		.catch(error => console.error);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};