import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Signup from "./components/auth/Signup.vue";
import Signin from "./components/auth/Signin.vue";

import Characters from "./components/characters/Characters.vue"

import store from "./store/store";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		children: [
			{
				path: "/characters",
				component: Characters
			}
		],
		beforeEnter(to, from, next) {
			console.log("store.getters.isAuthenticated", store.getters.isAuthenticated);
			if(!store.getters.isAuthenticated) {
				next("/signin");
			} else {
				next();
			}
		}
	},
	{
		path: "/signup",
		name: "signup",
		component: Signup
	},
	{
		path: "/signin",
		name: "signin",
		component: Signin
	},
	{
		path: "*",
		redirect: "/"
	}
];

export default new VueRouter({
	mode: "history",
	routes
});