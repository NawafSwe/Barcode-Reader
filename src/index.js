/* ------- importing Packages -------- */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db_connection = require('./db');
const productRouter = require('./routes/productRouter');

/* -------App Configuration-------- */
const app = express();
app.use(bodyParser.json());
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
app.get('/', async (req, res) => {
	res.render('home', { data: '' });
});

app.get('/qr', async (req, res) => {
	const BrowserQRCodeReader = require('@zxing/library').BrowserQRCodeReader;
	const codeReader = new BrowserQRCodeReader();
	try {
		const result = await codeReader.decodeFromImage(req.body.image);
		console.log(result);
	} catch (err) {
		console.error(err);
	}

	
});

/* -------------- App Routers---------------------- */
app.use('/products', productRouter);

/* -------------- establishing server connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
