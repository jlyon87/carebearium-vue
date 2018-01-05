const rDB = require("rethinkdb");
const config = require("../config/rethink.config");

const auth = require("./auth")(rDB);

const connectRethinkDB = () => {
	return rDB.connect(config);
};

const closeDbConnection = conn => {
	conn.close();
};

module.exports = {
	connect: connectRethinkDB,
	close: closeDbConnection,
	auth
}

