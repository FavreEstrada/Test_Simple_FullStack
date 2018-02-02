const express = require('express'),
	http = require("http"),
	products = require('./server/products_mod.js');

const app = express();
const server = http.Server(app);

//To let call endpoints using localhost
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	next();
});

app.get('/api/products', function(req, res) {
	let params = req.query;

	products.getProducts(params).then((data) => res.send(data))
		.catch(() => res.status(500).send("Error getting products"));
});

app.use(express.static(__dirname));

server.listen(process.env.PORT || 8080, function() {
	//Initialize products json
	products.generateProducts();
	console.log('Starting server on port: ', process.env.PORT || 8080);
});