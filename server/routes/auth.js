const auth = (app, dataAccess) => {

	app.post("/verify", (req, res) => {
		console.log("verify req.body", req.body);

		dataAccess.auth.getUserByEmail(req.body)
			.then(data => {
				console.log("data", data)
				if(data.password !== req.body.password) {
					throw new Error("Invalid email or password");
				}
				res.send(data)
			})
			.catch(error => {
				console.error("got error", error.message);
				res.send(error.message);
			});
	});
};

module.exports = auth;