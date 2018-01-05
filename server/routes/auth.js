const dataAccess = require("../data");

const auth = app => {

	app.get("/user", (req, res) => {

		dataAccess.connect()
		.then(conn => {

			dataAccess.auth.queryUserByEmail(conn, "jlyon@test.com")
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
};

module.exports = auth;