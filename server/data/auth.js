module.exports = (rDB, conn) => {

	const getUserByEmail = email => {
		return rDB.table("users")
			.get(email)
			.run(conn);
	};

	const insertUser = ({ email, password }) => {
		const id = Math.random().toString(36);
		return rDB.table("users")
			.insert({ email, password, id })
			.run(conn);
	}

	return {
		getUserByEmail,
		insertUser
	};
};