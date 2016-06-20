myApp.factory('userFactory', function($http, $window, $rootScope){
  var user = {};
  var error = {};
  return{
    createUser : function(input, callback){
      $http.post('/users', input).then(function(response){

      })
    },
    loginUser: function(input, callback){
      user = {};
      error = {};      
      $http.post('/login', input).then(function(response){        
        if(response.data.err){          
          error.message = response.data.err;          
          callback(response.data);
        } else {
          user = response.data.data;
          callback(response.data.data);
        }
      })
    },
    getUser: function(callback){
      callback(user);
    },
    logoutUser: function(callback){
      user = {};      
      $http.post('/logout').then(function(response){        
        callback(response);
      })
    },
    checkLogin: function(callback){
      $http.get('/loggedin').then(function(response){
        if(response.data){
          user = response.data;
          callback(user);
        } else {
          callback(user);
        }
      })
    },

    getUserLogin: function(callback){
      $http.get('/loggedin').then(function(response){
        if(response.data){
          user = response.data;          
          callback(user);
        } else {
        }
      })
    },

    getAllUsers: function (callback){
      $http.get('/getAllUsers').success(function(output){        
        callback(output);
      })
    },
    
    setAdmin: function(input, user, callback){
      $http.post('/setAdmin',input, user)
		  .then(function(response){
			callback(response);
		  })
    }
  }
})
