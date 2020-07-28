/* ------- importing Packages -------- */
const Product = require('../models/product');
const productRouter = require('../routes/productRouter');

/* ------- Functions -------- */

const getProducts = async () => {
	try {
		const response = await Product.find({});
		return response;
	} catch (e) {
		console.log(
			`error ocurred in productController at getProducts() , error message : ${e.message}`
		);
	}
};

const postProduct = async (product) => {
	try {
		const response = await Product.create(product);
		return response;
	} catch (e) {
		console.log(
			`error ocurred in productController at postProduct() , error message : ${e.message}`
		);
	}
};

const getProductById = async (id) => {
	try {
		const response = await Product.findById(id);
		return response;
	} catch (e) {
		console.log(
			`error ocurred in productController at getProductById() , error message : ${e.message}`
		);
	}
};

const deleteProduct = async (id) => {
	try {
		const response = await Product.findByIdAndDelete(id);
		return response;
	} catch (e) {
		console.log(
			`error ocurred in productController at deleteProduct() , error message : ${e.message}`
		);
	}
};

const putProduct = async (id, product) => {
	try {
		const response = await Product.findByIdAndUpdate(id, product);
		return response;
	} catch (e) {
		console.log(
			`error ocurred in productController at deleteProduct() , error message : ${e.message}`
		);
	}
};

/* ------- Model Exporting for functions -------- */
module.exports = { getProducts, postProduct, getProductById, putProduct };
