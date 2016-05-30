var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  authId: Number,
  name: String,
  friends: [],
  provider: String,
  pictureURL: String,
  json_info: Object,
  created_at: {type: Date, default: Date.now}
})

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
	console.log(password, 'in model user');
	console.log(this.password, 'password in database');

    return bcrypt.compareSync(password, this.password);
};


var User = mongoose.model('User', UserSchema)
