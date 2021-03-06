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

  //route to test if the user is logged in or not
  app.get('/loggedin', function(req, res){
    return res.json(req.isAuthenticated() ? req.user : null);
  });

  app.post('/logout', function(req,res){

    req.logOut();

    res.send(200);
  })

  //para volver admin a un usuario
  app.post('/setAdmin', users.setAdmin);

  //definicion de parametros para las query de abajo
  app.param('movie', movies.getMovieById);
  app.param('relatedMovie', movies.getMovieById);

  //rutas de manejo de peliculas
  app.post('/movies', movies.createMovie);
  app.get('/movies', movies.getAllMovies);
  app.get('/movies/:movie', movies.getLinkedObjectsOfMovie);
  app.put('/movies', movies.editMovie);
  app.delete('/movies/:movie', movies.deleteMovie);

  //rutas de manejo de peliculas relacionadas
  app.post('/movies/:movie/relatedMovies/', movies.addRelatedMovie);
  app.delete('/movies/:movie/relatedMovies/:relatedMovie', movies.deleteRelatedMovie);

  //rutas para el manejo de comentarios
  app.post('/movies/:movie/comments/', movies.addComment);
  app.get('/movies/:movie/comments', movies.getComments);
  app.delete('/movies/:movie/comments/:comment', movies.deleteComment);
};
