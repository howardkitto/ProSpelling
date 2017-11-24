var mongoose = require('mongoose');

const Users = new mongoose.Schema({
    email: {type: String, required:true},
    password: {type: String, required:true},
	displayName: String
});

module.exports = mongoose.model('Users', Users);