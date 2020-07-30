/* ------- importing Packages -------- */
const mongoose = require('mongoose');

/* ------- Functions Packages -------- */
/**
 * 'connection' function where it establishes a connection to mongo database
 * @param {String} MONGO_URI the database URL
 * @return {Error} returns an error message if there is any
 */
const connection = async (MONGO_URI) => {
	try {
		const connect_db = await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log(`successfully connected to barcodeSystem `);
	} catch (error) {
		console.log(`failed to connect to the database try again later , error : `, e.message);
	}
};

/* ------- exporting modules -------- */
module.exports = connection;
