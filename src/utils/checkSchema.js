/* eslint-disable indent */
/*          ------------------- EXPLANATION -------------------
 since all the request must has validation schema a separate file created to check the schema of a request;
*/

/* ------------------- functions ------------------- */

/**
 * this function 'validateSchema' validates the schema of a request.
 * @param {list}  schemas - list hold all the schema of a particular request.
 * @param {Object} request - request Object that holds the request body
 * @returns {boolean} if there is no error
 * @returns {Error} if there is an error
 *
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
	if (unRequiredSchemas.length == 0) return true;
	else throw new Error(`invalid queries [${unRequiredSchemas}] were included in the request`);
}

module.exports = validateSchema;
