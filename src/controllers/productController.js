/* ------- importing Packages -------- */
const Product = require('../models/product');
const QRGenerator = require('../helpers/helper');

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
		const generateBarcode = await QRGenerator.generateBarcodeImage(product.name);
		product.codeUrl = generateBarcode.codeUrl;
		product.codeBase64 = generateBarcode.codeBase64;
		console.log(product.codeUrl);
		console.log(product.codeBase64);
		console.log(product.name);
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

const getProductByBarcode = async (code) => {
	try {
		const response = await Product.find({ codeBase64: code });
		return response;
	} catch (e) {
		console.log(
			`error happen in the product controller at getProductByBarcode()  error is ${e.message}`
		);
	}
};

/* ------- Model Exporting for functions -------- */
module.exports = { getProducts, postProduct, getProductById, putProduct, getProductByBarcode };
