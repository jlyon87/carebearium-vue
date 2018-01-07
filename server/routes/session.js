const session = require("express-session");
const parseurl = require("parseurl");
const RDBStore = require("session-rethinkdb")(session);
const r = require("rethinkdbdash")({
	servers: [
		{ host: "localhost", port: 28015, db: "carebearium" }
	]
});

const ONE_MINUTE = 1000 * 60;
const TEN_MINUTES = ONE_MINUTE * 10;

const store = new RDBStore(r, {
	browserSessionMaxAge: TEN_MINUTES,
	table: "session"
});

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
		secret: "carebearium-vue",
		resave: true,
		saveUninitialized: true,
		name: "carebearium.connect.sid"
	}));

	app.use("/", pageCounter);
}
