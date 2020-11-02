/* ------------------- IMPORTANT  VARIABLES -------------------  */

//local uri for the database you can use it during the testing phase not in production
const LOCAL_API = `http://127.0.0.1:8000/products/`;

//if you host your own database in your lovely cloud , I recommend to use mongoAtlas and heroku
const HOSTED_SERVER = ``;

// LookingForProduct to control the calls to the database if the product was found no need to call it again
let LookingForProduct = true;
/* ------------------- IMPORTANT  VARIABLES -------------------  */

/* ------------------- essential elements -------------------  */

//the camera box where the live stream starts , feel free to put your own elements
let camera = document.querySelector('#camera');

/* ------------------- essential elements -------------------  */

/* ------------------- Testing variables -------------------  */

//for the seek of testing you can use it if you want to test on my front-end page `home.ejs`
let productName = document.querySelector('#product-name');
let productCode = document.querySelector('#product-code');
let productQuantity = document.querySelector('#product-quantity');
let productNameValue = '';
let productCodeValue = '';
let productQuantityValue = '';

/* ------------------- Testing variables -------------------  */

/* ------------------- HELPER FUNCTIONS -------------------  */

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name fetchProducts
 * @return {Array}  returns array of products
 * @throws {Error} returns an error message if there is any.
 * @description get all products from the data base.
 */
const fetchProducts = async () => {
    try {
        //feel free to fetch from your own hosted database
        const response = await fetch(`${LOCAL_API}`);
        const result = await response.json();
        //for testing I have consoled the result feel free to remove it
        console.log('result is : ', result);
        return result;
    } catch (error) {
        console.log(
            `error happened while fetching product  at the function fetchProducts() , error ${error.message}`
        );
    }
};

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name fetchProductById
 * @param {String} id the id of the product
 * @return {Object} returns the product if there is no error
 * @throws {Error} returns an error message if there is any.
 * @description gets a product by its id
 */

const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${LOCAL_API}/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(
            `error happened while fetching product  at the function fetchProductById() , error ${error.message}`
        );
    }
};

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name fetchProductByCode
 * @param {String} code of product.
 * @return {Object} returns the founded product if there is no error.
 * @throws {Error} returns an error if there is any.
 * @description  gets a product by its code
 * NOTE : this function it is an IMPORTANT Function where you can benefit from its response in many cases
 * case 1 : if you want to delete a product from the database it is easy just call this function then take the id
 * if the response then pass it to the delete function
 * case 2 : if you want to update a product info for example you decreased the quantity or changed the price
 * all you have to do call this function then pass the id to the update productFunction
 * case 3 : you have the accessability to the data where you can place the info in the front end if you prefer to
 */
const fetchProductByCode = async (code) => {
    try {
        //the response where we passed the code as query
        const response = await fetch(`${LOCAL_API}/?code=${code}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(
            `error happened while fetching product  at the function fetchProductById() , error ${error.message}`
        );
    }
};

/** @author Nawaf Alsharqi
 * @function
 * @name activateCamera
 * @return {Void} void function.
 * @description activates the webcam again , note this is my own work flow feel free to change it.
 */
function activateCamera() {
    //it will call the StartQuagga() function again
    StartQuagga();
}

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name startLookingForProduct
 * @param {String} code
 * @return {Object} returns product object if there is no error.
 * @throws {Error} returns an error message if there is any.
 * @description looks up for a product by the code that scanned from the webcam
 * the process is to simple where we have a control variable to check if the element was found stop checking the database and stop the setTimeOut function.
 */
const startLookingForProduct = async (code) => {
    //first we check startLookingForProduct as mentioned above it is a controller variable
    //if it was true we call setTimeOut function to run
    //SetTimeOut takes two args 1-Call Back Function , 2-time in milliseconds where it will be called
    //in arg1 where you start searching process
    //in arg2 I proffered to call the database every 10000 milliseconds which is 1 second , feel free to change it but try to not minimize it too much
    //to read more about the setTimeOut I recommend you to go to this docs https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
    //not there are many javaScripts timer but this is my favorite feel free to choose yours from here https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Code_snippets/Timers

    setTimeout(async () => {
        //we cheek if the product was found or not
        if (LookingForProduct) {
            const response = await fetchProductByCode(code);
            //we check if the product was found or not
            if (response.product != null) {
                const product = await response.product;

                //after we found it finally we set the control variable to be false which means stop looking
                LookingForProduct = false;
                //and stop the camera , this is my work flow feel free to play with it but it will continue scan
                Quagga.stop();

                //for the seek of testing I have used these variables for updating the ui and visualize the result
                productNameValue = await product.name;
                productCodeValue = await product.code;
                productQuantityValue = await product.quantity;

                //for the seek of testing I have console the result feel free to delete it
                console.log(product);
                //for the seek of testing I have used this function for updating the ui and visualize the result
                updateUI();

                //last exit the function and return the found product
                return product;
            }
        }
    }, 1000);
};

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name postProduct
 * @param {Object} data the product data where the product should have price , name ,code ,quantity
 * @return {Object} returns the posted product if the request was successfully done , NOTE YOU HAVE  to check for the response if the product was added or not
 * @throws {Error} returns error message in the console if there is any, feel free to customize your message error
 * @description post new product to the database
 */
async function postProduct(data) {
    try {
        //for the seek of testing this method later on you can put your own variables from the front-end by pasting the data as a whole product
        const price = 1.5;
        const name = 'orange juice';
        const code = '1234567895';
        const quantity = 1;
        const product = {
            price: price,
            name: name,
            code: code,
            quantity: quantity,
        };

        //posting the data in json format to the url 'LOCAL_API' , feel free to change the url

        //note use data instead of product just pass the data as an object like the product above
        const response = await fetch(`${LOCAL_API}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(product),
        });
        //taking the result of the post request you can check if it was done successfully or not
        const result = await response.json();
        //for testing proposes I have consoled the result , feel free to remove it
        console.log(result);
    } catch (e) {
        console.log(`error happened in postProduct() ${e.message}`);
    }
}

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name deleteProduct
 * @param {String} id of the product you can achieve it by getting hold of it after the scanning where you will get a full response that contains all the info of a product
 * including the id
 * @return {Object} returns the deleted object from the database.
 * @throws {Error} returns an error if any error was found.
 * @description deletes a product from the database by id.
 *   */
async function deleteProduct(id) {
    try {
        const response = await fetch(`${LOCAL_API}/${id}`, {
            method: 'DELETE',
        });

        return response;
    } catch (e) {
        console.log(
            `error happen in while deleting product , error in deleteProduct() , error : ${e.message} `
        );
    }
}

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name updateProduct.
 * @param {String} id of the product you can achieve it by getting hold of it after the scanning where you will get a full response that contains all the info of a product
 * including the id
 * @param {Object} data the new data you want to update
 * @return {Object} returns the product that has been updated from the database not the product with the new info updated
 * @throws {Error} returns an error message if there is any.
 * @description updates the data of a product to the database.
 */

async function updateProduct(id, data) {

    //for the seek of testing I have provided two variables for example I want to update the quantity and the price
    //please note names must match same names in the database
    const price = 30;
    const quantity = 20;
    const product = {
        price: price,
        quantity: quantity,
    };

    try {
        const response = await fetch(`${LOCAL_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8', // Indicates the content
            },
            body: JSON.stringify(product), // We send data in JSON format
        });
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(
            `error happen in while deleting product , error in updateProduct() , error : ${e.message}`
        );
    }
}

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name updateUI.
 * @return {void} void function.
 * @description updates the UI , was implemented for the seek of Testing proposes, feel free to use it and replace my elements with yours
 */
function updateUI() {
    productName.textContent = `product name : ${productNameValue}`;
    productQuantity.textContent = `product quantity : ${productQuantityValue}`;
    productCode.textContent = `product quantity : ${productCodeValue}`;
}

/* ------------------- HELPER FUNCTIONS -------------------  */

/* ------------------- Quagga Configuration ------------------- */

/**@author Nawaf Alsharqi
 * @async
 * @function
 * @name StartQuagga.
 * @return {Error} return an error if the user rejects the permission to access the camera
 * @description  initalizilize the webcam of the user.
 * @summary  it provide many options where you can control the size of the camera box and more things and functions you can read the docs
 *  https://serratus.github.io/quaggaJS/.
 */
function StartQuagga() {
    //setting the looking for product condition to be true again
    LookingForProduct = true;
    Quagga.init(
        {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: camera, // Or '#yourElement' (optional), you can customize your element
            },
            decoder: {
                readers: [
                    'code_128_reader',
                    'ean_reader',
                    'ean_8_reader',
                    'code_39_reader',
                    'code_39_vin_reader',
                    'upc_reader',
                    'upc_e_reader',
                    'i2of5_reader',
                ],
            },
        },
        function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Initialization finished. Ready to start');
            //starting the webcam
            Quagga.start();
        }
    );

    //this event for Detection any scan where many codes will goes there , my recommendation is to use setTimeOut after every second scan again
    //or after every second ask the user if he wants to scan again in case of assigning a product to the database. to take the code correctly
    //because of human accuracy and the webcam quality itself
    Quagga.onDetected(async function (data) {
        //stop after dedication by setting time interval every second call db
        const code = data.codeResult.code;
        await startLookingForProduct(code);
    });
}

/* ------------------- Quagga Configuration ------------------- */

/* ------------------- Starting Scan ------------------- */
//start webcam
StartQuagga();

/* ------------------- Starting Scan ------------------- */

/* ------------------- EVENTS ------------------- */

//starting again if the div was clicked
//this is my own workflow feel free to remove it or come up with something nice
camera.addEventListener('click', () => activateCamera());
/* ------------------- EVENTS ------------------- */
