/* ------- importing Packages -------- */
const productController = require('../controllers/productController');
const express = require('express');
const productRouter = express.Router();

/* ------- products routes -------- */

productRouter.get('/', async (req, res) => {
	const response = await productController.getProducts();
	res.json(response).status(200);
});

productRouter.post('/', async (req, res) => {
	const response = await productController.postProduct(req.body);
	res.json(response).status(200);
});

/* ------- model exporting -------- */
module.exports = productRouter;
