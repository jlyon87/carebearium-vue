const router = require("express").Router();
const bcrypt = require("bcrypt");

const auth = dataAccess => {

	router.post("/registered", (req, res) => {
		console.log("/registered body", req.body);
		const { email } = req.body;
		if(!email) {
			res.status(403).send();
			return;
		}

		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				console.log("getUserByEmail data", data);
				if(data) {
					res.status(200).send();
				} else {
					res.status(204).send();
				}
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
							res.status(204).send(err);
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
				res.status(201).send(data);
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
							const err = new Error("Invalid username or password.");
							res.status(403).send(err);
							return;
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

router.post("/hasSession", (req, res) => {
	if(req.session.user) {
		console.log("has sessionId and cookie");
		console.log("req.session.user", req.session.user);
		res.status(200)
	} else {
		res.status(204)
	}
	res.send();
});

router.post("/autoLogin", (req, res) => {
	if(!req.session.user) {
		return;
	}

	res.status(200).send(req.session.user);
});

module.exports = auth;