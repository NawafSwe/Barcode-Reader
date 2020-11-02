/* ------- importing Packages -------- */
const mongoose = require('mongoose');

/* ------- Functions Packages -------- */
/** @author Nawaf Alsharqi. 
 * @async
 * @function
 * @name connection
 * @param {String} MONGO_URI the database URL.
 * @return {Void} Void function.
 * @throws {Error} returns an error message if there is any.
 * @description establishes a connection to mongo database.
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
