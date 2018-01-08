<template>
<v-toolbar app>
	<v-toolbar-items>
		<v-btn flat
			to="/"
			exact
			color="primary">
			Carebearium
		</v-btn>
	</v-toolbar-items>

	<v-spacer></v-spacer>

	<v-toolbar-items>
		<v-btn v-if="!isAuth" flat
			to="/signup"
			exact>
		Sign Up</v-btn>
		<v-btn v-if="!isAuth" flat
			to="/signin"
			exact>
		Sign In</v-btn>

		<v-btn v-if="isAuth" flat
			@click="logout">
		Logout</v-btn>

		<!-- <v-btn flat
			@click="sayHi">
		Hello</v-btn> -->

	</v-toolbar-items>
		<!-- <v-switch class="px-auto py-auto mx-auto my-auto"
			:label="theme"
			@click="themeSwitcher"
			v-model="isDark" ></v-switch> -->

</v-toolbar>
</template>

<script>
import axios from "axios";

export default {
	computed: {
		isDark() {
			return this.$store.getters.isDark;
		},
		theme() {
			return this.isDark ? "Light" : "Dark";
		},
		isAuth() {
			return this.$store.getters.isAuthenticated;
		}
	},

	methods: {
		themeSwitcher() {
			this.$store.dispatch("changeTheme");
		},
		logout() {
			this.$store.dispatch("logout");
		},

		sayHi() {
			axios.get("/hello")
				.then(res => console.log(res))
				.catch(err => console.error(err));
		}
	},
}
</script>