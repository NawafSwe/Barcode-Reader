/** Express router providing product related routes
 * @module routes/productRouter
 * @requires express
 * @requires validate
 * @requires validationResult
 * @requires productController
 */
/* ------- importing Packages -------- */

const productController = require('../controllers/productController');
/**
 * express module
 * @const
 * @namespace express
 */

const express = require('express');

/**
 * Express router to mount word related functions on.
 * @type {object}
 * @const
 * @namespace productRouter
 */
const productRouter = express.Router();
/**
 *  validate object has functions to validate requests before going to mess with database.
 * @type {object}
 * @const
 * @namespace validate
 */

const validate = require('../utils/productValidators');

/**
 *  express validation result object holds the result after validation a request using express validator.
 * @const
 * @type {Object}
 * @namespace validationResult
 */
const {validationResult} = require('express-validator/check');


/* ------- products routes -------- */

/**
 * Route getting all products.
 * @name get/products
 * @function
 * @memberOf module:routes/productRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
productRouter.get('/', validate('getProducts'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        //FIRST CASE : gets all the products from the database if it is not includes a query in the url as /products/?code=1234
        //if the user want by code
        if (req.query.code) {
            const code = req.query.code;
            const response = await productController.getProductByCode(code);
            res.json(response).status(200);
            // SECOND CASE : gets a particular product if query was included in the request as /products/?code=1234
        } else {
            const response = await productController.getProducts();
            res.json(response).status(200);
        }
    }
});

/**
 * Route getting product by id.
 * @name get/products/:id
 * @function
 * @memberOf module:routes/productRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */

productRouter.get('/:id', validate('getProductById'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const id = req.params.id;
        const response = await productController.getProductById(id);
        res.json(response).status(200);
    }
});

/**
 * Route post new product.
 * @name post/products
 * @function
 * @memberOf module:routes/productRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
productRouter.post('/', validate('postProduct'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const response = await productController.postProduct(req.body);
        res.json(response).status(200);
    }
});

/**
 * Route updating product by id.
 * @name put/products/:id
 * @function
 * @memberOf module:routes/productRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
productRouter.put('/:id', validate('putProduct'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const id = req.params.id;
        const response = await productController.putProduct(id, req.body);
        res.json(response).status(200);
    }
});

/**
 * Route deleting product by id.
 * @name delete/products/:id
 * @function
 * @memberOf module:routes/productRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
productRouter.delete('/:id', validate('deleteProduct'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const id = req.params.id;
        const response = await productController.deleteProduct(id);
        res.json(response).status(200);
    }
});

/* ------- model exporting -------- */
/**
 * this module exports the products route endpoints
 * @exports
 * @type {Object}
 */
module.exports = productRouter;
