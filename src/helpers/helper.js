/* ----------- notes -------------------- */
/*
	Important: Accessing getUserMedia requires a 
	secure origin in most browsers, meaning that http:// 
	can only be used on localhost. All other hostnames need to be served via https://. 
	You can find more information in the Chrome M47 WebRTC Release Notes.
*/
/* ----------- Importing packages  -------------------- */
const QRCode2D = require('qrcode');

/* ----------- Functions -------------------- */
/**
 * 'generateBarcode2D' function that create a 2d Qr barcode
 * @param {String} text the text to create from it a barcode
 * @return {String} returns a coded BASE64 String if there is no error
 * @return {Error} returns an error message if there is any
 */
const generateBarcode2D = async (text) => {
	try {
		const generateQR = await QRCode2D.toDataURL('I am a pony!');
		const url = await QRCode2D.toString(text, { type: 'png' });
		return {
			codeUrl: url,
			codeBase64: generateQR,
		};
	} catch (error) {
		console.log(`error happen while generating barCode image  error , ${e.message}`);
	}
};

/* ----------- exporting functions -------------------- */
module.exports = { generateBarcode2D: generateBarcode2D };
