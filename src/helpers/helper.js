/* ----------- Importing packages  -------------------- */

const QRCode = require('qrcode');

/* ----------- Functions -------------------- */
const generateBarcodeImage = async (text) => {
	try {
		const generateQR = await QRCode.toDataURL('I am a pony!');
		const url = await QRCode.toString(text, { type: 'png' });
		return {
			codeUrl: url,
			codeBase64: generateQR,
		};
	} catch (error) {
		console.log(`error happen while generating barCode image  error , ${e.message}`);
	}
};
/* ----------- exporting functions -------------------- */
module.exports = { generateBarcodeImage };
