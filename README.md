# Barcode-Reader Backend

# project overview :

this is a backend project for barcode reader where it was developed using MEN stack which stands for mongo database ,express ,nodejs
the project is well structured where all the backend files are listed in the `src` folder I will walk through the project structure

<ul>

- `controllers` : this folder has one file called `productController` where it has all the logic required to interact with the data base all the code is well documented and commented for simplicity

* `helpers`: has a file called `helper` where there is a helper function , not used but it is there it is for generating a 2d qr barcode

* `routes` : routes has the file `productRouter`
  where all the end points are listed there,
  In this project we followed a `restful api` which is a well known standard in the naming convention
  and the design pattern of the routes all the code is well documented and commented you can read each end point and its description

* `utils` : utils has two files where its main functionality is to validate the request before we go to call the database to save time and resources express validator was used to validate the request
  you can read about the express validator in the following link
  `https://express-validator.github.io/docs/index.html` it is to simple and useful , also the code is well documented and explained you can walk through it and experience with it

* `index` : index file holds all the app configuration it is well documented and commented you can walk through it and change it if you would like
* `env files` : in the env files we have three files and I will explain each one of them
  first `.env` file is used usually in the development mode where you run the server locally not in production by running the command `npm run dev` the `.env` will be used to set the configuration of the project, I have filled all the necessary variables inside it like the url of the database, port number , host.
  second the env `.env.production` this file will be used when you host your project to the cloud it its the same as the `.env` but it used for the production mode I have set the variables for you but you need to customize it more to put your own database url after creating a cluster, I have prepare it for you, all you have to do is just to fill the blanks after generating your own database url,

# start project to run :

you have to follow along to run it successfully

- first make sure that you have nodejs installed in your machine
- make sure you have mongodb installed in your machine
- first in your terminal/command line prompt run the command `npm install`
- then run `npm run dev` if you want to run the project locally
  or run `npm start:prod` to run the project in the cloud in production mode

- note I recommend that you go to mongoAtlas for hosting the db
- note I recommend that you host the backend on heroku

* furthermore, you can test the end points using postman where I lef a collection file for all the endpoints
to test it locally feel free to change it later on or play with it
</ul>
