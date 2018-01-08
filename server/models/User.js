var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const User = new mongoose.Schema({
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    displayName: {type: String, required:true},
    role: { type: String, default: 'user' }
}, {timestamps:{}}); 


//encrypt the password when the user is saved
User.pre('save', function (next) {
    const user = this;
  
    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) return next();
  
    return bcrypt.genSalt((saltError, salt) => {
      if (saltError) { return next(saltError); }
  
      return bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) { return next(hashError); }
  
        // replace a password string with hash value
        user.password = hash;
  
        return next();
      });
    });
  });

  User.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compare(password, this.password)
    .then((isMatch)=>{return isMatch})
  };

module.exports = mongoose.model('User', User);