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

	<v-menu v-if="isAuth" :nudge-width="100">
		<v-toolbar-title slot="activator">

			<v-icon dark>more_vert</v-icon>
		</v-toolbar-title>
		<v-list>
			<v-list-tile v-for="item in items" :key="item" :to="item" >
				<v-list-tile-title v-text="item"></v-list-tile-title>
			</v-list-tile>
		</v-list>
	</v-menu>

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
	data() {
		return {
			items: ["Home", "Characters"]
		};
	},

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