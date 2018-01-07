const auth = (app, dataAccess) => {

	app.post("/registered", (req, res) => {
		const { email } = req.body;
		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				res.send(data);
			})
			.catch(error => {
				console.error("got error", error.message);
				res.send(error.message);
			});
	});

	app.post("/verify", (req, res) => {
		const { email, password } = req.body;
		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				if(data.password !== password) {
					throw new Error("Invalid email or password");
				}
				res.send(data);
			})
			.catch(error => {
				console.error("got error", error.message);
				res.send(error.message);
			});
	});

	app.post("/register", (req, res) => {
		const { email, password } = req.body;
		dataAccess.auth.insertUser({ email, password })
			.then(data => {
				res.send(data);
			})
			.catch(error => {
				console.error("got error", error.message);
				res.send(error.message);
			});
	});

	app.post("/login", (req, res) => {
		const { email, password } = req.body;
		dataAccess.auth.getUserByEmail(email)
			.then(data => {
				if (data.password !== password) {
					throw new Error("Invalid email or password");
				}
				res.send(data);
			})
			.catch(error => {
				console.error("got error", error.message);
				res.send(error.message);
			});
	});
};

module.exports = auth;