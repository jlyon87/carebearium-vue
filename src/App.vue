<template>
	<v-app :dark="isDark">
		<v-content>
			<app-header></app-header>

			<v-container fluid>
				<transition name="slide-y-reverse-transition" mode="out-in">
					<router-view ></router-view>
				</transition>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import Header from "./components/shared/Header.vue";
import { authInstance } from "./data";

export default {
	components: {
		appHeader: Header
	},

	computed: {
		isDark() {
			return this.$store.getters.isDark;
		}
	},

	created() {
		authInstance.post("/hasSession")
			.then(res => {
				if(res.status === 200) {
					this.$store.dispatch("autoLogin");
				}
			})
			.catch(err => console.error(err.message));
	}
}
</script>