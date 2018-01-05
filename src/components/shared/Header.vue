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

	</v-toolbar-items>
		<!-- <v-switch class="px-auto py-auto mx-auto my-auto"
			:label="theme"
			@click="themeSwitcher"
			v-model="isDark" ></v-switch> -->

</v-toolbar>
</template>

<script>
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
		}
	},
}
</script>