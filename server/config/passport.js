var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var User = mongoose.model('User');
//teach passport how to verify local username and credentials
passport.use(new passportLocal.Strategy(function(username, password, done){
  User.findOne({ username: username},
    function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)){return done(null, false)}
      return done(null, user); //there is a record
    });
}));

//teach passport how to serialize and deserialize users
//passport will invoke this function for us
passport.serializeUser(function(user, done){

  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  
  User.findOne({_id: id}, function(err, user){
  
    done(null, user);
  });
});
