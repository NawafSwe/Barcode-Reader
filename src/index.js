/* ------- importing Packages -------- */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db_connection = require('./db');
const productRouter = require('./routes/productRouter');
const _methodOverride;

/* -------App Configuration-------- */
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

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
app.get('/', async (req, res) => {
	res.send('I Am Working OKAY!').status(200);
});

/* -------------- App Routers---------------------- */
app.use('/products',productRouter);

/* -------------- establishing server connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
