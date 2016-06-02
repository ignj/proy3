var users = require('../controllers/users');
var movies = require('../controllers/movies');
var passport = require('passport');
module.exports = function(app) {
	
  app.post('/users', users.createUser);
  //OAUTH routes
  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get("/auth/facebook/callback",
    passport.authenticate("facebook",
      { failureRedirect: "/", successRedirect:"/" }));

  app.get("/auth/google",
        passport.authenticate("google",
          { scope: ["https://www.googleapis.com/auth/plus.login",
                    'https://www.googleapis.com/auth/userinfo.email']
  }));
  app.get("/auth/google/callback",
    passport.authenticate("google",
      { failureRedirect: "/", successRedirect:"/" }));
	  
  //local auth route
  app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
      if(err){return next(err);}
      if(!user) {
        console.log('incorrect user pass combo!');
        return res.json({err: 'Invalid username and/or password combination!'});
      }
      req.logIn(user, function(err){
        if(err){ return next(err);}
        console.log('success');
        console.log(req.isAuthenticated());
        console.log(req.user);
        console.log('req session:', req.session);
        return res.json({data:user});
      });
    })(req,res,next);
  });

  app.post('/logout', function(req,res){
    console.log('logging out ', req.session.passport.user);
    req.logOut();
    console.log('are they still logged in?', req.isAuthenticated());
    res.send(200);
  })

  //route to test if the user is logged in or not
  app.get('/loggedin', function(req, res){
    console.log('loggedin?', req.isAuthenticated());
    return res.json(req.isAuthenticated() ? req.user : null);
  });

  app.get('/getAllUsers', users.getAllUsers);
  app.post('/addFriend', users.addFriend);
  
  //definicion de parametros para las query de abajo
  app.param('movie', movies.getMovieById);
  
  //rutas de manejo de peliculas
  app.post('/movies', movies.createMovie);
  app.get('/movies', movies.getAllMovies);    
  app.get('/movies/:movie', movies.getLinkedObjectsOfMovie);
  app.put('/movies', movies.editMovie);

};
