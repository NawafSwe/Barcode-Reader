/* ------- importing Packages -------- */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);

/* -------App Configuration-------- */
const app = express();
app.use(bodyParser.json());
app.use(cors());

/* -------------- choosing Env ---------------------- */
if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
	require('custom-env').env(process.env.NODE_ENV);
} else {
	require('dotenv').config();
}

/* -------------- checking backend connectivity ---------------------- */
app.get('/', async (req, res) => {
	res.send('I Am Working OKAY!').status(200);
});

/* -------------- establishing server connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
