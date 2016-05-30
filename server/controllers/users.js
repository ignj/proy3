var mongoose = require('mongoose');

var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
module.exports = (function(){
  return{
    createUser: function(req, res){
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      console.log('in users controller');
      console.log(req.body);
      var user = new User({username: req.body.username, password: req.body.password});
      user.save(function(err){
        if(err){
          res.json({err: err});
        } else {
          res.json(true);
        }
      })
    },
    getAllUsers: function(req, res){
      User.find({}, function(err, results){
        if(err) {
         console.log(err);
        } else {
         res.json(results);
        }
      })
    },
    addFriend: function(req, res){
      User.findOne({_id: req.user.id}, function(err, user){
        user.friend.push(req.body);
        user.save(function(err){
          res.json(err);
        })
      console.log(req.user, 'current user in add Friend model');
      console.log(req.body, 'req in user model');
      })
    } 
  }
})();
