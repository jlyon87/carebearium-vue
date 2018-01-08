import router from "../../routes";
import { authInstance } from "../../data";

const state = {
	user: {},
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
		authInstance.post("/login", creds)
			.then(res => {
				if(!res.data.email) {
					throw new Error("Invalid username or password")
				};
				commit("setUser", res.data);
				router.replace("/");
			})
			.catch(error => console.error);
	},

	autoLogin({ commit }) {
		authInstance.post("/autoLogin")
			.then(res => {
				if (res.status === 200 && !res.data.email) {
					throw new Error("Invalid username or password")
				};
				commit("setUser", res.data);
				router.replace("/");
			})
			.catch(error => console.error);
	},

	logout({ commit }) {
		authInstance.post("/logout")
		.then(res => {
			if (res.status !== 200) throw new Error(res.data);

			commit("setUser", {});
			document.cookie = `name=carebearium.connect.sid;expires=${new Date()};`;
			router.replace("/signin");
		})
		.catch(error => {
			//console.error(error);
		});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};