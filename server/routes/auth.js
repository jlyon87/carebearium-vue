const router = require("express").Router();
const bcrypt = require("bcrypt");

const auth = dataAccess => {

	router.post("/registered", (req, res) => {
		if(!email) {
			res.status(403).send();
			return;
		}

		const { email } = req.body;
		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				res.status(200).send({
					email: data.email,
					id: data.id
				});
			})
			.catch(error => {
				console.error("Error registered user: ", error.message);
				res.status(500).send(error.message);
			});
	});

	router.post("/verify", (req, res) => {
		const { email, password } = req.body;

		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				bcrypt.compare(password, data.password)
					.then(isSame => {
						if (!isSame) {
							const err = new Error("Invalid username or password.");
							res.status(403).send(err.message);
							return err;
						}

						res.status(200).send({
							email: data.email,
							id: data.id
						});
					})
					.catch(error => {
						console.error("Error verifying user: ", error.message);
						res.status(500).send(error.message);
					})
			})
			.catch(error => {
				console.error("Error verifying user: ", error.message);
				res.status(500).send(error.message);
			});
	});

	router.post("/register", (req, res) => {
		const { email, password } = req.body;
		bcrypt.hash(password, 10)
			.then(hash => {
				return dataAccess.auth.insertUser({ email, password: hash })
			})
			.then(data => {
				res.status(200).send(data);
			})
			.catch(error => {
				console.error("Error inserting new user: ", error.message);
				res.status(500).send(error.message);
			});
	});

	router.post("/login", (req, res) => {
		const { email, password } = req.body;
		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				bcrypt.compare(password, data.password)
					.then(isSame => {
						if(!isSame) {
							throw new Error("Invalid username or password.");
						}

						const user = {
							email: data.email,
							id: data.id
						};

						req.session.user = user;
						res.status(200).send(user);
					})
					.catch(error => {
						console.error("Error logging in: ", error.message);
						res.send(error.message);
					});;
			})
			.catch(error => {
				console.error("Error logging in: ", error.message);
				res.send(error.message);
			});
	});

	router.post("/logout", (req, res) => {
		req.session.destroy(err => {
			if(err) {
				res.status(500).send("Error terminating session.");
				return;
			}

			res.status(200).send("Success");
		});
	});

	return router;
};

module.exports = auth;