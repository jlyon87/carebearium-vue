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
								() => $v.email.required || 'This field is required',
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
								() => $v.password.required || 'This field is required']"
							required ></v-text-field>
							<div>
								{{ $v.password.required }}
							</div>
							<div>
								{{
									isError
								}}
							</div>

							<div v-if="isError">
								{{ errorMessage }}
							</div>

						<v-btn @click="submit"
							:disabled="$v.$invalid && isError"
							>Login</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import { required, email, unique, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
	data() {
		return {
			email: "",
			password: "",
			isError: false,
			errorMessage: "Invalid username or password."
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
			const formData = {
				email: this.email,
				password: this.password
			};

			axios.post("/verify", { email: this.email, password: this.password})
				.then(res => {
					console.log("verify response", res.data);
					this.isError = res.data.email === undefined;
					console.log("this.isError", this.isError);
					if(!this.isError) {
						this.$store.dispatch("login", formData);
					}
				})
				.catch(error => console.error(error.message));
			// this.$store.dispatch("login", {
			// 	email: this.email,
			// 	password: this.password
			// });
		}
	}
}
</script>
