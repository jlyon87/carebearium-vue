const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPassword = "test";
const otherPassword = "test2";

console.log("\n\n*****")

let saltedpw;
bcrypt.hash(myPassword, saltRounds)
	.then(hash => {
		console.log("promise salted pw", hash);
		saltedpw = hash;

		bcrypt.compare(myPassword, saltedpw).then(res => {
			console.log("is same", res);
		});

		bcrypt.compare(otherPassword, saltedpw).then(res => {
			console.log("is same", res);
		});

	});


//fs, net, tls