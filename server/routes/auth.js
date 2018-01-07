const bcrypt = require("bcrypt");

const auth = (app, dataAccess) => {
	console.log("init auth routes");
	app.post("/registered", (req, res) => {
		const { email } = req.body;
		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				res.send({
					email: data.email,
					id: data.id
				});
			})
			.catch(error => {
				console.error("Error registered user: ", error.message);
				res.send(error.message);
			});
	});

	app.post("/verify", (req, res) => {
		const { email, password } = req.body;

		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				bcrypt.compare(password, data.password)
					.then(isSame => {
						if (!isSame) {
							throw new Error("Invalid username or password.");
						}

						res.send({
							email: data.email,
							id: data.id
						});
					})
					.catch(error => {
						console.error("Error verifying user: ", error.message);
						res.send(error.message);
					})
			})
			.catch(error => {
				console.error("Error verifying user: ", error.message);
				res.send(error.message);
			});
	});

	app.post("/register", (req, res) => {
		const { email, password } = req.body;
		console.log("register req.body", req.body);
		bcrypt.hash(password, 10)
			.then(hash => {
				return dataAccess.auth.insertUser({ email, password: hash })
			})
			.then(data => {
				console.log("successful insert", data);
				res.send(data);
			})
			.catch(error => {
				console.error("Error inserting new user: ", error.message);
				res.send(error.message);
			});
	});

	app.post("/login", (req, res) => {
		const { email, password } = req.body;
		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				bcrypt.compare(password, data.password)
					.then(isSame => {
						if(!isSame) {
							throw new Error("Invalid username or password.");
						}

						res.send({
							email: data.email,
							id: data.id
						});
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
};

module.exports = auth;