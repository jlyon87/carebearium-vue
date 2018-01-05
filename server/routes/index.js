const express = require("express");
const bodyParser = require("body-parser");

const auth = require("./auth");

const router = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());

	auth(app);
};

module.exports = router;