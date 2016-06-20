var mongoose = require('mongoose');

var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var codeAdmin = '2YMZkWs3NDQSBVwyDKdv';
module.exports = (function(){
  return{
    createUser: function(req, res){
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      var user = new User({username: req.body.username, password: req.body.password});
      user.save(function(err){
        if(err){
          res.json({err: err});
        } else {
          res.json(true);
        }
      })
    },
	setAdmin: function(req, res, next){

		if (req.body.value === codeAdmin){
			User.findById(req.user._id, function(err,usr){
				if(!usr)
					return next(new Error('Could not load Document'));
				else{
					usr.type="admin";
					usr.save(function (err){
						if (err)
							return next(new Error('Could not save Document'));
						else
							return res.json(usr)
					});
				}
			});		
		}
		else return next(new Error('Wrong code'));
	},
    getAllUsers: function(req, res){
      User.find({}, function(err, results){
        if(err) {
         console.log(err);
        } else {
         res.json(results);
        }
      })
    }

  }
})();
