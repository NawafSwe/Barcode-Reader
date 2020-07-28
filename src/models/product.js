/* ------------ importing packages ------------ */
const mongoose = require('mongoose');

/* ------------ Creating Schema ------------ */
const ProductSchema = mongoose.Schema({
	name: { type: String },
	quantity: { type: Number },
	codeUrl: { type: String },
	codeBase64: { type: String },
});

/* ------------ Creating Mongo model ------------ */
const Product = mongoose.model('Product', ProductSchema);

/* ------------ exporting models  ------------ */
module.exports = Product;
