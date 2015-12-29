var mongoose = require('mongoose');

module.exports = mongoose.model('CustomerCollection', {
	name : {type : String, default: ''},
	mobile : {type : String, default: ''},
	phone : {type : String, default: ''},
	address : {type : String, default: ''},
	dob : {type : String, default: ''},
	email : {type : String, default: ''},
});