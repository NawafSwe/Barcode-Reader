/**
 * The data-layer for a product
 * @module product
 * @requires mongoose
 */
/* ------------ importing packages ------------ */
/**
 * mongoose module to create collections in the database
 * @type {Mongoose}
 * @const
 * @namespace mongoose
 */
const mongoose = require('mongoose');


/* ------------ Creating Schema ------------ */

/**
 *  product schema
 * @constructor Language
 */

const ProductSchema = mongoose.Schema({
    //name: product name
    name: {type: String},
    //quantity: quantity of product
    quantity: {type: Number},
    //code: code of product
    code: {type: String,unique:true},
    //price: price of product
    price: {type: Number},
});

/* ------------ Creating Mongo model ------------ */
const Product = mongoose.model('Product', ProductSchema);

/* ------------ exporting models  ------------ */
/**
 * this module exports product model
 * @exports
 * @type {Object<Product>}
 */
module.exports = Product;
