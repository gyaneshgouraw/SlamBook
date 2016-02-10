var CustomerCollection = require('./models/customercollection');
var Slambookollection = require('./models/slambookcollection');
var nodemailer = require('nodemailer');



function getCustomerCollection(res){
	CustomerCollection.find(function(err, cust) {
			if (err)
				res.send(err);
			res.json(cust); // return all todos in JSON format
		});
};
function getSlambookollection(res){
	Slambookollection.find(function(err, slam) {
			if (err)
				res.send(err);
			res.json(slam); // return all todos in JSON format
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
											
app.get('/api/slambookollection', function (req, res) {
		getSlambookollection(res);
	});

app.post('/api/slambookollection/getrecordbyemail', function (req, res) {
			Slambookollection.find({ sendermailid: req.body.sendermailid,recievermailid: req.body.recievermailid}, function(err, character) {
				//console.log(res); // { name: 'Frodo', inventory: { ringOfPower: 1 }}
				if (err)
				res.send(err);
			return res.json(character);
			
			});
	});


app.post('/api/slambookollection', function (req, res) {
		Slambookollection.create(req.body, function(err, cust) {
			if (err)
				res.send(err);
			getSlambookollection(res);

    var maildata = 	{
					"data": "Your friend "+req.body.recievername+" has filled slambook for you.",
					"senderid": req.body.recieverKey,
					"sendermailid":req.body.recievermailid,
					"recieverid": req.body.senderKey ,
					"recievermailid": req.body.sendermailid,
					"reciever": req.body.sendermailid,
					"flag":"slamsubmit" 
						};

			handleSayHello(maildata,res);
		});
	});



											
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
            user: 'myslamrecordbook@gmail.com', // Your email id
            pass: 'debug@apple' // Your password
        }
    });
var mailOptions ={};
var template={path: "<!DOCTYPE html><html><body><img src='http://localhost:3003/images/avatar1.jpg'/></body></html>"}
if(req && req.flag =="slamsubmit"){
	var url="https://myslambook.herokuapp.com/login/disp/slam/"+req.recievermailid+"/"+req.sendermailid;
	 mailOptions = {
    from: 'gyaneshgouraw110899@gmail.com', // sender address//jitibisht.bisht@gmail.com
    to: req.reciever, // list of receivers//mohanmanis@gmail.com
    subject: 'Slam Book Filled', // Subject line
    text: 'Slambook link', //, // plaintext body
    html:'<html> <head> <style>a{color: #44B3C5;}</style> </head> <body> <div style="border:1px solid black;height:100px;background:black" ><img src="https://myslambook.herokuapp.com/images/slam11.png" height="100px"/><img src="https://myslambook.herokuapp.com/images/checkout1.gif" height=25px/></div><div style="border:1px solid #4C4A4A;background:#6D4739;height:300px;color:white"> <div style="width:50%;height:100%;float:left"> <div style="margin:30px"> <p>Hello,</p><p>'+req.sendermailid+'</p><p>We have slambook filled for you by your friend '+req.recievermailid+'</p><p>'+req.data+'</p><p>Please click on given link to visit the page</p><p><a href='+url+'> Click here to visit slambook page✔</a></p></div></div><div style="width:40%;float:left;height:100%"><img src="https://myslambook.herokuapp.com/images/checkout1.gif" height=125px/><img src="https://myslambook.herokuapp.com/images/quote1.jpg" height=300px/></div></div><div style="border:1px solid black;height:100px;background:black;color:white" > <div style="margin:20px"> <p> <small><a href="https://myslambook.herokuapp.com/"> myslambook.herokuapp.com</a></small> </p></div></div></body></html>'
     
};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.json({yo: 'error'});
	    }else{
	        console.log('Message sent: ' + info.response);
	       // res.json({yo: info.response});
	    }
	});
}
	else{
		var url="https://myslambook.herokuapp.com/login/"+ req.body.senderid+"/"+req.body.recieverid+"/"+req.body.sendermailid+"/"+req.body.recievermailid; // You can choose to send an HTML body instead
		  mailOptions = {
    from: 'gyaneshgouraw110899@gmail.com', // sender address//jitibisht.bisht@gmail.com
    to: req.body.reciever, // list of receivers//mohanmanis@gmail.com
    subject: 'Please Fill my slam book', // Subject line
    text: 'Slambook link', //, // plaintext body
      html:'<html> <head> <style>a{color: #44B3C5;}</style> </head> <body> <div style="border:1px solid black;height:100px;background:black" ><img src="https://myslambook.herokuapp.com/images/slam11.png" height="100px"/><img src="https://myslambook.herokuapp.com/images/checkout1.gif" height=25px/></div><div style="border:1px solid #4C4A4A;background:#6D4739;height:300px;color:white"> <div style="width:50%;height:100%;float:left"> <div style="margin:30px"> <p>Hello,</p><p>'+req.body.recievermailid+'</p><p>We have slambook invitation for you sent by your friend '+req.body.sendermailid+'</p><p>He says</p><p>'+req.body.data+'</p><p>Please click on given link to visit the page</p><p><a href='+url+'> Click here to visit slambook page✔</a></p></div></div><div style="width:40%;float:left;height:100%"><img src="https://myslambook.herokuapp.com/images/checkout1.gif" height=125px/><img src="https://myslambook.herokuapp.com/images/quote1.jpg" height=300px/></div></div><div style="border:1px solid black;height:100px;background:black;color:white" > <div style="margin:20px"> <p> <small><a href="https://myslambook.herokuapp.com/"> myslambook.herokuapp.com</a></small> </p></div></div></body></html>'
     
};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.json({yo: 'error'});
	    }else{
	        console.log('Message sent: ' + info.response);
	        res.json({yo: info.response});
	    }
	});
	}
   


}





	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

//=========================================================================================================





};
