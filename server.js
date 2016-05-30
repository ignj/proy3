// Require the Express Module
var express = require("express"),
//middleware
    path = require("path"),
    mongoose = require('mongoose'),
    app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
//passport and strategies
var passport = require('passport');
var passportLocal = require('passport-local');
// middleware configuration
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SESSION_SECRET || 'solegood',
                          resave: false,
                          saveUninitialized: false}));
//passport configuration
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/mongoose.js');

require('./server/config/passport.js');

// authentication
require("./server/auth/fb_auth.js");
require("./server/auth/google_auth.js")

//routes
require('./server/config/routes.js')(app);

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));
app.listen(8000, function() {
  console.log('login and reg on: 8000');
});
