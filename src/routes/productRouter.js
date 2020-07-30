/* ------- importing Packages -------- */
const productController = require('../controllers/productController');
const express = require('express');
const productRouter = express.Router();
const validate = require('../utils/productValidators');
const { validationResult } = require('express-validator/check');

/* ------- products routes -------- */

/**
 * 'get' route where it has two cases
 * FIRST CASE : gets all the products from the database if it is not includes a query in the url as /products/?code=1234
 * SECOND CASE : gets a particular product if query was included in the request as /products/?code=1234
 */
productRouter.get('/', validate('getProducts'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		//if the user want by code
		if (req.query.code) {
			const code = req.query.code;
			const response = await productController.getProductByCode(code);
			res.json(response).status(200);
		} else {
			const response = await productController.getProducts();
			res.json(response).status(200);
		}
	}
});

/**
 * 'get' route where it gets a particular product by id
 */
productRouter.get('/:id', validate('getProductById'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const id = req.params.id;
		const response = await productController.getProductById(id);
		res.json(response).status(200);
	}
});

/**
 * 'post' route where it posts a new product to the database
 */
productRouter.post('/', validate('postProduct'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const response = await productController.postProduct(req.body);
		res.json(response).status(200);
	}
});

/**
 * 'put' route where it updates particular product information from the database
 */
productRouter.put('/:id', validate('putProduct'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const id = req.params.id;
		const response = await productController.putProduct(id, req.body);
		res.json(response).status(200);
	}
});

/**
 * 'delete' route where it deletes a particular product information
 */
productRouter.delete('/:id', validate('deleteProduct'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const id = req.params.id;
		const response = await productController.deleteProduct(id);
		res.json(response).status(200);
	}
});

/* ------- model exporting -------- */
module.exports = productRouter;
