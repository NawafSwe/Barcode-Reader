/* ------------ importing packages ------------ */
const mongoose = require('mongoose');

/**
 * @description creating the product schema using mongoose.
 */
/* ------------ Creating Schema ------------ */
const ProductSchema = mongoose.Schema({
	name: { type: String },
	quantity: { type: Number },
	code: { type: String },
	price: { type: Number },
});

/* ------------ Creating Mongo model ------------ */
const Product = mongoose.model('Product', ProductSchema);

/* ------------ exporting models  ------------ */
module.exports = Product;
