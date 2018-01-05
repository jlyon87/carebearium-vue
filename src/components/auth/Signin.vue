<template>
	<v-layout>
		<v-flex md2 offset-md5 xs12 sm6 offset-sm3>
			<v-card>
				<v-card-text>
					<v-form class="text-xs-center">
						<v-text-field
							label="Email"
							v-model="email"
							required ></v-text-field>

						<v-text-field
							label="Password"
							v-model="password"
							required ></v-text-field>

						<v-btn
							>Login</v-btn>
					</v-form>
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
	}
}
</script>
