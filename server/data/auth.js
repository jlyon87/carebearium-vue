module.exports = rDB => {
	const queryUserByEmail = (conn, userEmail) => {
		return rDB.table("users")
			.filter({
				email: userEmail
			})
			.pluck("id")
			.run(conn);
	};

	const insertUser = (conn, user) => {
		return rDB.table("users")
			.insert(user)
			.run(conn);
	};

	const login = (conn, { email, password }) => {
		return rDB.table("users")
			.filter({
				email,
				password
			})
			.run(conn);
	};

	return {
		queryUserByEmail,
		insertUser,
		login
	};
};