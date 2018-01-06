module.exports = (rDB, conn) => {

	const getUserByEmail = ({ email, password }) => {
		return rDB.table("users")
			.get(email)
			.run(conn);
	};

	return {
		getUserByEmail
	};
};