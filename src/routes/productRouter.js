/* ------- importing Packages -------- */
const productController = require('../controllers/productController');
const express = require('express');
const productRouter = express.Router();

/* ------- products routes -------- */

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

productRouter.get('/:id', async (req, res) => {
	const response = await productController.getProductById(req.params.id);
	res.json(response).status(200);
});

productRouter.post('/', async (req, res) => {
	const response = await productController.postProduct(req.body);
	res.json(response).status(200);
});

/* ------- model exporting -------- */
module.exports = productRouter;
