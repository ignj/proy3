var mongoose = require('mongoose');

var Comment = mongoose.model('Comment');

module.exports = (function(){
	return{
		
		createComment: function(req,respuesta){
			console.log(req.body);
			var comment = new Comment({
				body : req.body.comment,
				author: "pasame un autor",
				idAuthor: 9999,
				rating: req.body.rate,
			});
			comment.save(function(err,comment){
				if (err){
					respuesta = err;					
				}
				else{
					console.log("comentario ",comment);
					respuesta = comment;
				}
					
			})
		}
		
	}
})();