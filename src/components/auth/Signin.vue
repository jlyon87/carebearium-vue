<template>
	<v-layout>
		<v-flex md2 offset-md5 xs12 sm6 offset-sm3>
			<v-card>
				<v-card-text>
					<v-form class="text-xs-center">
						<v-text-field
							label="Email"
							type="email"
							v-model="email"
							validate-on-blur
							@blur="$v.email.$touch()"
							:error="$v.email.$error"
							:rules="[
								() => $v.email.required || 'This field is required.',
								() => $v.email.email || 'Invalid email.']"
							required ></v-text-field>

						<v-text-field
							label="Password"
							type="password"
							v-model="password"
							validate-on-blur
							@blur="$v.password.$touch()"
							:error="$v.password.$error"
							:rules="[
								() => $v.password.required || 'This field is required.']"
							:error-messages="errorMessage"
							required ></v-text-field>

						<v-btn @click="submit"
							:disabled="$v.$invalid" >
							Login</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
	data() {
		return {
			email: "",
			password: "",
			isError: false,
			errorMessage: undefined
		}
	},

	validations: {
		email: {
			required,
			email
		},
		password: {
			required
		},
	},

	methods: {
		submit() {
			this.errorMessage = undefined;
			const formData = {
				email: this.email,
				password: this.password
			};

			axios.post("/verify", { email: this.email, password: this.password})
				.then(res => {
					this.isError = res.data.email === undefined;
					if(!this.isError) {
						this.$store.dispatch("login", formData);
					} else { 
						this.errorMessage = "Invalid username or password.";
					}
				})
				.catch(error => console.error(error.message));
		}
	}
}
</script>
