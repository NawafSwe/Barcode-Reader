/* ------- importing Packages -------- */
const productController = require('../controllers/productController');
const express = require('express');
const productRouter = express.Router();

/* ------- products routes -------- */

/**
 * 'get' route where it has two cases
 * FIRST CASE : gets all the products from the database if it is not includes a query in the url as /products/?code=1234
 * SECOND CASE : gets a particular product if query was included in the request as /products/?code=1234
 */
productRouter.get('/', async (req, res) => {
	//if the user want by code
	if (req.query.code) {
		const code = req.query.code;
		const response = await productController.getProductByCode(code);
		res.json(response).status(200);
	} else {
		const response = await productController.getProducts();
		res.json(response).status(200);
	}
});

/**
 * 'get' route where it gets a particular product by id
 */
productRouter.get('/:id', async (req, res) => {
	const response = await productController.getProductById(req.params.id);
	res.json(response).status(200);
});

/**
 * 'post' route where it posts a new product to the database
 */
productRouter.post('/', async (req, res) => {
	const response = await productController.postProduct(req.body);
	res.json(response).status(200);
});

/**
 * 'put' route where it updates particular product information from the database
 */
productRouter.put('/:id', async (req, res) => {
	const response = await productController.putProduct(id, req.body);
	res.json(response).status(200);
});

/**
 * 'delete' route where it deletes a particular product information
 */
productRouter.delete('/:id', async (req, res) => {
	const response = await productController.deleteProduct(req.params.id);
	res.json(response).status(200);
});

/* ------- model exporting -------- */
module.exports = productRouter;
