const session = require("express-session");
const parseurl = require("parseurl");
const RDBStore = require("session-rethinkdb")(session);
const rdbConfig = require("../config/rethink.config");

const r = require("rethinkdbdash")({
	servers: [
		rdbConfig
	]
});

const ONE_MINUTE = 1000 * 60;
const TEN_MINUTES = ONE_MINUTE * 10;
const SECRET = process.env.SESSION_SECRET || "carebearium-vue";

const store = new RDBStore(r, {
	browserSessionMaxAge: TEN_MINUTES,
	table: "session"
});

const readCookie = (req, res, next) => {
	if(req.session.cookie) {
		//console.log("req.session.cookie", req.session.cookie);
	}
	next();
};

const pageCounter = (req, res, next) => {
	if (!req.session.views) {
		req.session.views = {};
	}

	const pathname = parseurl(req).pathname;
	req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
	next();
};

module.exports = (app) => {

	if(process.env.NODE_ENV === "production") {
		app.set("trust proxy", 1);
		session.cookie.secure = true;
	}

	app.use(session({
		store,
		cookie: {
			maxAge: TEN_MINUTES
		},
		secret: SECRET,
		resave: true,
		saveUninitialized: true,
		name: "carebearium.connect.sid"
	}));

	app.use("/", readCookie);
	app.use("/", pageCounter);

	app.get("/hello", (req, res) => {

	});
}
