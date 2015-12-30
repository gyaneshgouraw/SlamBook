// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var nodemailer = require('nodemailer');



// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 3003; // set our port
 mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes


//===================>mailhelper<==================

//var router = express.Router();
//app.use('/sayHello', router);
//router.post('/test', handleSayHello);



//======================>end<===============================
// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app


//api key --AIzaSyBezu8yhFapVnQ6_PYhk2LJ5XCtVbmljZI


// Here is your client ID
// 651347370973-gjqgapp9jlpgj7eol94gku9rvvdr30p3.apps.googleusercontent.com
// Here is your client secret
// OmsoiNTQcfHHpRxt4XY4-s56
// 
// node-debug -p 5859 server.js