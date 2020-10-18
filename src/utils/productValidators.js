/* ------- importing Packages -------- */
const { body, param, query } = require('express-validator/check');
const validator = require('./checkSchema');
const { request } = require('express');
/** @author Nawaf Alsharqi. 
 * @function
 * @name validate
 * @param {String} method name of the case to determine which validation we go with.
 * @throws {Error} throws an error if there is an error.
 * @description validate request before miss with the database.
 */

const validate = (method) => {
	switch (method) {
		case 'getProducts': {
			return [
				/* ----------------- Schema Validation -----------------*/
				body(' ').custom((value, { req }) => {
					const schemas = [undefined];
					if (validator.validateSchema(schemas, req)) {
						return true;
					}
				}),

				/* ----------------- END Schema Validation -----------------*/

				/* ----------------- Query Validation -----------------*/
				query(' ').custom((value, { req }) => {
					const queries = ['code'];
					if (validator.validateQuery(queries, req)) {
						return true;
					}
				}),
				/* ----------------- End Query Validation -----------------*/
			];
		}
		case 'getProductById': {
			return [
				/* ----------------- ID Validation -----------------*/
				param('id', 'id must be exists and of type string and match mongoID pattern')
					.exists()
					.isMongoId(),
					
				/* ----------------- Query Validation -----------------*/
				query(' ').custom((value, { req }) => {
					const queries = [undefined];
					if (validator.validateQuery(queries, req)) {
						return true;
					}
				}),
				/* ----------------- End Query Validation ----------------- */

				/* ----------------- Schema Validation -----------------*/
				body(' ').custom((value, { req }) => {
					const schemas = [undefined];
					if (validator.validateSchema(schemas, req)) {
						return true;
					}
				}),

				/* ----------------- END Schema Validation -----------------*/
			];
		}

		case 'postProduct': {
			return [
				/* ----------------- Schema Validation -----------------*/
				body(' ').custom((value, { req }) => {
					const schemas = ['name', 'quantity', 'code', 'price'];
					if (validator.validateSchema(schemas, req)) {
						return true;
					}
				}),
				/* ----------------- END Schema Validation -----------------*/

				/* ----------------- Query Validation -----------------*/
				query(' ').custom((value, { req }) => {
					const queries = [undefined];
					if (validator.validateQuery(queries, req)) {
						return true;
					}
				}),
				/* ----------------- End Query Validation ----------------- */

				/* ----------------- Name Validation ----------------- */
				body('name', 'name must be exists and be of type String').exists().isString(),
				body('name', 'name of product cannot be empty string').not().equals(''),
				body('name', 'name product cannot be empty string').not().equals(' '),
				/* ----------------- End  name Validation -----------------*/

				/* ----------------- quantity Validation ----------------- */
				body('quantity', 'quantity must be of type integer').optional().isInt(),
				body('quantity')
					.optional()
					.custom((value, { req }) => {
						if (value < 0) {
							throw Error('quantity cannot be less than zero');
						} else {
							return true;
						}
					}),
				/* ----------------- end quantity Validation ----------------- */

				/* ----------------- code Validation ----------------- */
				body('code', 'code must exists and be of type string').exists().isString(),
				body('code', 'code cannot be empty string').not().equals(''),
				body('code', 'code cannot be empty string').not().equals(' '),

				/* ----------------- end code Validation ----------------- */

				/* ----------------- price Validation ----------------- */
				body('price', 'price must be of type number').optional().isNumeric(),

				body('price')
					.optional()
					.custom((value, { req }) => {
						if (value < 0) {
							throw Error('price cannot be less than zero');
						} else {
							return true;
						}
					}),
				/* ----------------- end price Validation ----------------- */
			];
		}

		case 'putProduct': {
			return [
				/* ----------------- ID Validation -----------------*/
				param('id', 'id must be exists and of type string and match mongoID pattern')
					.exists()
					.isMongoId(),

				/* ----------------- Schema Validation -----------------*/
				body(' ').custom((value, { req }) => {
					const schemas = ['name', 'quantity', 'code', 'price'];
					if (validator.validateSchema(schemas, req)) {
						return true;
					}
				}),
				/* ----------------- END Schema Validation -----------------*/

				/* ----------------- Query Validation -----------------*/
				query(' ').custom((value, { req }) => {
					const queries = [undefined];
					if (validator.validateQuery(queries, req)) {
						return true;
					}
				}),
				/* ----------------- End Query Validation ----------------- */

				/* ----------------- Name Validation ----------------- */
				body('name', 'name must be exists and be of type String').optional().isString(),
				body('name', 'name of product cannot be empty string').optional().not().equals(''),
				body('name', 'name product cannot be empty string').optional().not().equals(' '),
				/* ----------------- End  name Validation -----------------*/

				/* ----------------- quantity Validation ----------------- */
				body('quantity', 'quantity must be of type integer').optional().isInt(),
				body('quantity')
					.optional()
					.custom((value, { req }) => {
						if (value < 0) {
							throw Error('quantity cannot be less than zero');
						} else {
							return true;
						}
					}),
				/* ----------------- end quantity Validation ----------------- */

				/* ----------------- code Validation ----------------- */
				body('code', 'code must exists and be of type string').optional().exists().isString(),
				body('code', 'code cannot be empty string').optional().not().equals(''),
				body('code', 'code cannot be empty string').optional().not().equals(' '),

				/* ----------------- end code Validation ----------------- */

				/* ----------------- price Validation ----------------- */
				body('price', 'price must be of type number').optional().isNumeric(),

				body('price')
					.optional()
					.custom((value, { req }) => {
						if (value < 0) {
							throw Error('price cannot be less than zero');
						} else {
							return true;
						}
					}),
				/* ----------------- end price Validation ----------------- */
			];
		}
		case 'deleteProduct': {
			return [
				/* ----------------- ID Validation -----------------*/
				param('id', 'id must be exists and of type string and match mongoID pattern')
					.exists()
					.isMongoId(),

				/* ----------------- Query Validation -----------------*/
				query(' ').custom((value, { req }) => {
					const queries = [undefined];
					if (validator.validateQuery(queries, req)) {
						return true;
					}
				}),
				/* ----------------- End Query Validation ----------------- */

				/* ----------------- Schema Validation -----------------*/
				body(' ').custom((value, { req }) => {
					const schemas = [undefined];
					if (validator.validateSchema(schemas, req)) {
						return true;
					}
				}),

				/* ----------------- END Schema Validation -----------------*/
			];
		}
	}
};
/* ------- model exporting -------- */
module.exports = validate;
