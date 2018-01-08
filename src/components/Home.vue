<template>
	<v-layout>
		<v-flex xs12>
			<v-card>
				<v-card-title>Home</v-card-title>

				<v-card-text>
					Welcome! {{ userEmail }}

					<transition name="slide-y-reverse-transition" mode="out-in">
						<router-view ></router-view>
					</transition>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: ""
		}
	},

	computed: {
		userEmail() {
			return this.$store.getters.user.email;
		}
	}
}
</script>
