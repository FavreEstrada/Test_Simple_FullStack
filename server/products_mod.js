const cool = require('cool-ascii-faces'),
	deferred = require('deferred'),
	productsPerPage = 25;
let productCatalog;

function getProducts(params) {
	let q = deferred();
	let res;
	let page = parseInt(params.page) || 1;
	let sortBy = params.sortBy || 'size';

	//Adding Timeout to simulate DB call
	setTimeout(function() {
		sortBy === 'size' ? productCatalog.sort((a,b)=>a.size - b.size) : productCatalog.sort((a,b)=>a.price - b.price);

		let maxPage = Math.round(productCatalog.length / productsPerPage);
		let products = productCatalog.slice((page - 1) * productsPerPage, page * productsPerPage);
		res = {
			products,
			maxPage,
			page
		};
		q.resolve(res);
	}, 1800)

	return q.promise;
}

function generateProducts() {
	let prods = cool.faces;
	productCatalog = prods.map(prod => {
		let price = getPrice(),
			size = getSize(),
			date = generateDate();
		return {
			image: prod,
			price,
			size,
			date
		};
	})
}

function getPrice() {
	let min = 2.50,
		max = 100;
	return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function getSize() {
	let min = 1,
		max = 10;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDate() {
	let start = new Date(2018, 0, 1),
		end = new Date();
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
	getProducts: getProducts,
	generateProducts: generateProducts
};