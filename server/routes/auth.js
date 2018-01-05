const dataAccess = require("../data");

const auth = app => {

	app.get("/user", (req, res) => {

		dataAccess.connect()
		.then(conn => {

			dataAccess.auth.queryUserByEmail(conn, req.query.email)
				.then(cursor => cursor.toArray())
				.then(data => res.send(data))
				.catch(error => {
					console.error("got error", error.message);
					res.send(error.message);
				})
				.finally(() => dataAccess.close(conn));
		})
		.catch(console.error);
	});

	app.get("/user/email/:email", (req, res) => {

		dataAccess.connect()
			.then(conn => {

				dataAccess.auth.queryUserByEmail(conn, req.params.email)
					.then(cursor => cursor.toArray())
					.then(data => res.send(data))
					.catch(error => {
						console.error("got error", error.message);
						res.send(error.message);
					})
					.finally(() => dataAccess.close(conn));
			})
			.catch(console.error);
	});

	app.post("/user", (req, res) => {

		dataAccess.connect()
			.then(conn => {

				dataAccess.auth.insertUser(conn, req.body)
					.then(result => res.send(result))
					.catch(error => {
						console.error("got error", error.message);
						res.send(error.message);
					})
					.finally(() => dataAccess.close(conn));
			})
			.catch(console.error);
	});

	app.post("/verify", (req, res) => {
		dataAccess.connect()
			.then(conn => {
				dataAccess.auth.login(conn, req.body)
					.then(cursor => cursor.toArray())
					.then(data => {
						console.log("data", data)
						res.send(data[0])
					})
					.catch(error => {
						console.error("got error", error.message);
						res.send(error.message);
					})
					.finally(() => dataAccess.close(conn));
			})
			.catch(console.error);
	});
};

module.exports = auth;