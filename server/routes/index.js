const bodyParser = require("body-parser");

const data = require("../data");

const session = require("./session");
const auth = require("./auth");

const router = (app, conn) => {
	const dataAccess = data(conn);

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	session(app);
	auth(app, dataAccess);
};

module.exports = router;