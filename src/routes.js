import store from "./store/store";
import Home from "./components/Home.vue";
import Signup from "./components/auth/Signup.vue";
import Signin from "./components/auth/Signin.vue";

export default [
	{
		path: "/",
		name: "home",
		component: Home,
		beforeEnter(to, from, next) {
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
	}
];