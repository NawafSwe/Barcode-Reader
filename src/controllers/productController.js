/**
 * The functionalities of the product collection.
 * @module controllers/productController
 * @requires Product
 */

/* ------------------------ importing Packages ------------------------ */
const Product = require('../models/product');

/* ------------------------ Functions ------------------------ */

/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name getProducts
 * @return {Promise<Array<Product>>} array of products data if there is no error
 * @throws {Error} throws an error if there is an error.
 * @description gets all the products that registered in the database.
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

/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name postProduct
 * @param {Object>} product object that contains all the information of particular product
 * @return {Promise<Object<Product>>} returns the product info after posting it to the database if there is no error.
 * @throws {Error} returns an error message if there is any.
 * @description post new product to the database.
 */
const postProduct = async (product) => {
	try {
		const findProductByCodeResponse = await Product.findOne({ code: product.code });
		console.log(findProductByCodeResponse);
		if (findProductByCodeResponse == null) {
			const response = await Product.create(product);
			return response;
		}
		return {
			data: { ...findProductByCodeResponse },
			message: `product with code: ${product.code} is already exist`,
			status: 304,
		};
	} catch (e) {
		console.log(
			`error ocurred in productController at postProduct() , error message : ${e.message}`
		);
	}
};

/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name getProductById
 * @param {String} id of particular product.
 * @return {Promise<Object<Product>>} returns a product object if there is no error.
 * @throws {Error} returns an error message if there is any.
 * @description returns a product from the database by its id.
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

/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name deleteProduct.
 * @param {String} id of the product to be deleted.
 * @return {Promise<Object<Product>>} returns the deleted object from the database if there is no error.
 * @throws {Error} returns error message if there is any.
 * @description deletes a product from a database by its id.
 */
const deleteProduct = async (id) => {
	try {
		const response = await Product.findByIdAndRemove(id);
		return response;
	} catch (e) {
		console.log(
			`error ocurred in productController at deleteProduct() , error message : ${e.message}`
		);
	}
};

/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name putProduct.
 * @param {String} id of the product to be updated
 * @param {Object} product the new product information like (quantity or code or name)
 * @return {Promise<Object<Product>>} returns the updated product if there is no error
 * @throws {Error} returns error message if there is any error
 * @description updates particular product information from the database by id
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

/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name getProductByCode.
 * @param {String} code
 * @return {Promise<Object<Product>>} returns a product object if there is no error
 * @throws {Error} returns an error message if there is any
 * @description gets a particular product by its code from the database
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
/**
 * this module exports all functions to call database on product collection
 * @exports
 * @type {{getProductByCode: (function(String): Promise<Object<Product>>),
 * putProduct: (function(String, Object): Promise<Object<Product>>),
 * getProducts: (function(): Promise<Array<Product>>),
 * postProduct: (function(*=): Promise<Object<Product>>),
 * deleteProduct: (function(String): Promise<Object<Product>>),
 * getProductById: (function(String): Promise<Object<Product>>)}}
 */
module.exports = {
	getProducts,
	postProduct,
	getProductById,
	putProduct,
	getProductByCode,
	deleteProduct,
};
