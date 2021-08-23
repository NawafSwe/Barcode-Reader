/** index module to config express app server
 * @module src/index
 * @requires express
 * @requires bodyParser
 * @requires cors
 * @requires db_connection
 */

/* ------- importing Packages -------- */
/**
 * express module
 * @const
 * @namespace express
 */

const express = require('express');

/**
 * cors module
 * @type {Object}
 * @const
 * @namespace cors
 */

const cors = require('cors');

/**
 * Object has function to connect to a mongoDB
 * @type {Object}
 * @const
 * @namespace db_connection
 */
const db_connection = require('./configuration/db');




/* -------App Configuration-------- */
const app = express();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

/* -------------- choosing Env ---------------------- */
if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
    require('custom-env').env(process.env.NODE_ENV);
} else {
    require('dotenv').config();
}

/* -------------- Database Connection ---------------------- */
const MONGO_URI = process.env.MONGO_URI;
db_connection(MONGO_URI);

/* -------------- checking backend connectivity ---------------------- */
/**
 * Route get backend health.
 * @name get/
 * @function
 * @memberOf module:src/index~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

app.get('/', async (req, res) => {
    res.render('home');
});

/* -------------- App Routers---------------------- */

/**
 * wordRouter to use word route endpoints
 * @type {Object}
 * @const
 * @namespace productRouter
 */

const productRouter = require('./routes/productRouter');
app.use('/products', productRouter);

/* -------------- establishing server connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
