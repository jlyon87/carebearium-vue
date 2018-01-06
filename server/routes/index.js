const express = require("express");
const bodyParser = require("body-parser");

const data = require("../data");
const auth = require("./auth");

const router = (app, conn) => {
	const dataAccess = data(conn);

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	auth(app, dataAccess);
};

module.exports = router;