var users = require('../controllers/users');
var movies = require('../controllers/movies');
var passport = require('passport');
module.exports = function(app) {
	
  app.get("/auth/google",
        passport.authenticate("google",
          { scope: ["https://www.googleapis.com/auth/plus.login",
                    'https://www.googleapis.com/auth/userinfo.email']
  }));
  app.get("/auth/google/callback",
    passport.authenticate("google",
      { failureRedirect: "/", successRedirect:"/" }));	  

	  
	//estos dos metodos sacarlos mas adelante
  app.get('/getAllUsers', users.getAllUsers);
  app.post('/addFriend', users.addFriend);
  
  //definicion de parametros para las query de abajo
  app.param('movie', movies.getMovieById);
  
  //rutas de manejo de peliculas
  app.post('/movies', movies.createMovie);
  app.get('/movies', movies.getAllMovies);    
  app.get('/movies/:movie', movies.getLinkedObjectsOfMovie);
  app.put('/movies', movies.editMovie);
  app.delete('/movies/:movie', movies.deleteMovie);

};
