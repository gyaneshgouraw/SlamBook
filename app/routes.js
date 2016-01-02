var CustomerCollection = require('./models/customercollection');
var nodemailer = require('nodemailer');



function getCustomerCollection(res){
	CustomerCollection.find(function(err, cust) {
			if (err)
				res.send(err)
			res.json(cust); // return all todos in JSON format
		});
};

module.exports = function(app) {

	//--------====================================--customer collection------start------------=======================--------------

	app.get('/api/customercollection', function (req, res) {
		getCustomerCollection(res);
	});
	app.post('/api/customercollection', function (req, res) {
		CustomerCollection.create(req.body, function(err, cust) {
			if (err)
				res.send(err);
			getCustomerCollection(res);
		});
	});

	app.delete('/api/customercollection/:_id', function (req, res) {
	    CustomerCollection.remove({
	        _id: req.params._id
	    }, function (err, todo) {
	        if (err)
	            res.send(err);
	        getCustomerCollection(res);
	    });
	});

	app.post('/api/update/customercollection/:_id', function (req, res) {
	    CustomerCollection.update({
	        _id: req.params._id
	    },
        req.body,
         function (err, raw) {
             if (err) return handleError(err);
             console.log('The raw response from Mongo was ', raw);

             getCustomerCollection(res);
         });
	});
											////////////////////////
											///slambookcollection //
											////////////////////////
											





											
							          ////////////////////////////////
							          // ---------------mail helper //
							          ////////////////////////////////

/**
 * @get route handler for mail helper
 */
	app.post('/test',handleSayHello);
 // handle the route at yourdomain.com/sayHello
/**
 * [handleSayHello description]
 * @param  {[object]} req [takes input parameters]
 * @param  {[object]} res [gives output]
 * @return {[type]}     [description]
 */
function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'gyaneshgouraw1108@gmail.com', // Your email id
            pass: 'erwerewrrrwwrr' // Your password
        }
    });

    var mailOptions = {
    from: 'gyaneshgouraw110899@gmail.com', // sender address//jitibisht.bisht@gmail.com
    to: req.body.reciever, // list of receivers//mohanmanis@gmail.com
    subject: 'Please Fill my slam book', // Subject line
    text: 'Slambook link', //, // plaintext body
    html:req.body.data+"</br>"+
     "<a href=http://localhost:3003/login/"+ req.body.senderid+"/"+req.body.recieverid+"> Click to visit slambook page✔</a>" // You can choose to send an HTML body instead
};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.json({yo: 'error'});
	    }else{
	        console.log('Message sent: ' + info.response);
	        res.json({yo: info.response});
	    };
	});
}





	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

//=========================================================================================================





};
