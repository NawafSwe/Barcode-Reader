/**
 * since all the request must has validation schema a separate file created to check the schema of a request
 * @module utils/checkSchema
 */

/** @author Nawaf Alsharqi
 * @export
 * @function
 * @name validateSchema.
 * @param {Array<String>}  schemas - list hold all the schema of a particular request.
 * @param {Object} request - request Object that holds the request body.
 * @returns {boolean} if there is no error.
 * @throws {Error} if there is an error.
 * @description validates the schema of a request.
 */
function validateSchema(schemas, request) {
    //the purpose of the unRequiredSchemas is to add any key from the request body inside it;
    let unRequiredSchemas = [];

    //looping throw the object keys
    for (let [key, value] of Object.entries(request.body)) {
        //checking if the key is not in the schema
        if (!schemas.includes(key)) {
            //if there is error we push the key into the list
            unRequiredSchemas.push(key);
        }
    }
    //if there is an error throw with all unRequired schemas else return  by checking if the unRequiredSchemas length is zero;;
    if (unRequiredSchemas.length === 0) {
        return true;
    } else {
        throw new Error(`invalid queries [${unRequiredSchemas}] were included in the request`);
    }
}

/** @author Nawaf Alsharqi
 * @export
 * @function
 * @name validateQuery.
 * @param {Array<String>}  queries - list hold all the schema of a particular request.
 * @param {Object} request - request Object that holds the request query.
 * @returns {boolean} if there is no error.
 * @throws {Error} if there is an error.
 * @description validates the query of a request url
 */
function validateQuery(queries, request) {
    //the purpose of the unRequiredSchemas is to add any key from the request body inside it;
    let unRequiredQueries = [];

    //looping throw the object keys
    for (let [key, value] of Object.entries(request.query)) {
        //checking if the key is not in the schema
        if (!queries.includes(key)) {
            //if there is error we push the key into the list
            unRequiredQueries.push(key);
        }
    }
    //if there is an error throw with all unRequired schemas else return  by checking if the unRequiredSchemas length is zero;;
    if (unRequiredQueries.length === 0) {
        return true;
    } else {
        throw new Error(`invalid queries [${unRequiredQueries}] were included in the request`);
    }
}

/**
 * module that contains functions to validate schema and quires
 * @exports
 * @type {function(Array<String>, Object): Error,function(Array<String>,Object):Error}
 */
module.exports = {validateSchema, validateQuery};
