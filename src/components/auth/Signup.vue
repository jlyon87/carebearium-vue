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
								() => $v.email.email || 'Invalid email.',
								() => $v.email.unique || 'This email is already registered.']"
							required ></v-text-field>

						<v-text-field
							label="Password"
							type="password"
							v-model="password"
							validate-on-blur
							@blur="$v.password.$touch()"
							:error="$v.password.$error"
							:rules="[
								() => $v.password.required || 'This field is required.',
								() => $v.password.minLength || 'Password must be at least six characters.']"
							required ></v-text-field>

						<v-text-field
							label="Confirm Password"
							type="password"
							v-model="confirmPassword"
							validate-on-blur
							@blur="$v.confirmPassword.$touch()"
							:error="$v.confirmPassword.$error"
							:rules="[
								() => $v.confirmPassword.sameAs || 'Passwords don\'t match.']"
							required ></v-text-field>

						<v-btn @click="submit"
							:disabled="$v.$invalid">
							Register</v-btn>
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
			confirmPassword: ""
		}
	},

	validations: {
		email: {
			required,
			email,
			unique: (val) => {
				if(val === "") return true;

				return axios.post("/registered", { email: val })
					.then(res => {
						const isNotRegistered = res.data.email === undefined;
						return isNotRegistered;
					})
					.catch(error => console.error(error.message));
			}
		},
		password: {
			required,
			minLength: minLength(6)
		},
		confirmPassword: {
			sameAs: sameAs("password")
		}
	},

	methods: {
		submit() {
			this.errorMessage = undefined;
			const formData = {
				email: this.email,
				password: this.password
			};

			axios.post("/register", { email: this.email, password: this.password})
				.then(res => {
					if(res.data.inserted === 1) {
						this.$store.dispatch("login", formData);
					}
				})
				.catch(error => console.error(error.message));
		}
	}
}
</script>
