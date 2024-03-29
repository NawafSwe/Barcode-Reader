/** Mongo connection config module
 * @module configuration/db
 * @requires mongoose
 */

/* ------- importing Packages -------- */
/**
 * mongoose module
 * @type {Mongoose}
 * @const
 * @namespace mongoose
 */

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
         await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`successfully connected to barcodeSystem`);
    } catch (error) {
        console.log(`failed to connect to the database try again later , error : `, error.message);
    }
};

/* ------- exporting modules -------- */
/**
 * A module contains function to connect to the database.
 * @exports
 * @type {function(String): VoidFunction}
 */
module.exports = connection;
