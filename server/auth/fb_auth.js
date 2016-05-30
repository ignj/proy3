var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

var FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID";
var FACEBOOK_APP_SECRET = "YOUR_FACEBOOK_APP_SECRET";
passport.use(new FacebookStrategy({
		clientID: FACEBOOK_APP_ID,
		clientSecret: FACEBOOK_APP_SECRET,
		callbackURL: "/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
			console.log('fbauth');
		User.findOne({ authId: profile.id }, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				user = new User({
					authId: profile.id,
					username: profile._json.id, //should change this later
					name: profile.displayName,
					provider: profile.provider,
					pictureURL: 'https://graph.facebook.com/'+profile._json.id+'/picture?type=large',
					json_info: profile._json
				});
				user.save(function(err) {
					if(err) {
						console.log(err)
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		})
	}
));
