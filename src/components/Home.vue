<template>
	<v-layout>
		<v-flex xs12>
			<v-card>
				<v-card-title>Home</v-card-title>

				<v-card-text>
					Welcome! {{ userEmail }}
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
