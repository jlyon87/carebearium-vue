const rDB = require("rethinkdb");
const auth = require("./auth");

module.exports = conn => {

	return {
		auth: auth(rDB, conn),
		close() {
			rDB.close(conn);
		}
	};
}

