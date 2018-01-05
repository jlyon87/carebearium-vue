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

export default {
	components: {
		appHeader: Header
	},

	computed: {
		isDark() {
			return this.$store.getters.isDark;
		}
	}
}
</script>