/* ------------------------ importing Packages ------------------------ */
const Product = require('../models/product');

/* ------------------------ Functions ------------------------ */

/**
 *  'getProducts' function gets all the products that registered in the database
 * @return {Array} array of products data if there is no error
 * @return {Error} returns error message if there is any
 *
 */

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

/**
 * 'postProduct' function that posts new product to the database
 * @param {Object} product object that contains all the information of particular product
 * @return {Object} returns the product info after posting it to the database if there is no error
 * @return {Error} returns an error message if there is any
 */
const postProduct = async (product) => {
	try {
		console.log(product);
		const response = await Product.create(product);
		return response;
	} catch (e) {
		console.log(
			`error ocurred in productController at postProduct() , error message : ${e.message}`
		);
	}
};

/**
 * 'getProductById' function that returns a product from the database by its id
 * @param {String} id of particular product
 * @return {Object} returns a product object if there is no error
 * @return {Error} returns an error message if there is any
 */
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

/**
 * 'deleteProduct' function that deletes a product from a database by its id
 * @param {String} id of the product to be deleted
 * @return {Object} returns the deleted object from the database if there is no error
 * @return {Error} returns error message if there is any
 */
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

/**
 * 'putProduct' function that updates particular product information from the database by id
 * @param {String} id of the product to be updated
 * @param {Object} product the new product information like (quantity or code or name)
 * @return {Object} returns the updated product if there is no error
 * @return {Error} returns error message if there is any error
 *
 */

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

/**
 * 'getProductByCode' function that gets a particular product by its code from the database
 * @param {String} code
 * @return {Object} returns a product object if there is no error
 * @return {Error} returns an error message if there is any
 */
const getProductByCode = async (code) => {
	try {
		const response = await Product.findOne({ code: code });
		const result = {
			product: response,
			code: 200,
			status: 'OK',
		};
		return result;
	} catch (e) {
		console.log(
			`error ocurred in productController at getProductByCode() , error message : ${e.message} `
		);
	}
};

/* ------- Model Exporting for functions -------- */
module.exports = {
	getProducts,
	postProduct,
	getProductById,
	putProduct,
	getProductByCode,
	deleteProduct,
};
