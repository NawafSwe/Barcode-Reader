/* ------------ importing packages ------------ */
const mongoose = require('mongoose');

/* ------------ Creating Schema ------------ */
const ProductSchema = mongoose.Schema({
	name: { type: String },
	quantity: { type: Number },
	code: {type:String}
});

/* ------------ Creating Mongo model ------------ */
const Product = mongoose.model('Product', ProductSchema);

/* ------------ exporting models  ------------ */
module.exports = Product;
