myApp.factory('userFactory', function($http, $window){
  var user = {};
  var error = {};
  return{
    createUser : function(input, callback){
      console.log('factory trying to create the user', input);
      $http.post('/users', input).then(function(response){
        console.log(response);
      })
    },
    loginUser: function(input, callback){
      user = {};
      error = {};
      console.log('factory trying to log in with', input);
      $http.post('/login', input).then(function(response){
        console.log(response);
        if(response.data.err){
          console.log('error!');
          error.message = response.data.err;
          console.log(error);
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
    logoutUser: function(){
      user = {};
      $http.post('/logout').then(function(response){
        console.log(response);
      })
    },
    checkLogin: function(callback){
      $http.get('/loggedin').then(function(response){
        console.log(response);
        if(response.data){
          console.log('there is a user');
          user = response.data;
          callback(response);
        } else {
          console.log('no user!');
          callback(response);
        }
      })
    },

    getAllUsers: function (callback){
      $http.get('/getAllUsers').success(function(output){
        console.log(output, 'output in user factory');
        callback(output);
      })
    },

    addFriend: function(friend, user, callback){
      console.log(user, 'current user in user')
      console.log('factory trying to add friend to the user', friend);
      $http.post('/addFriend', friend).then(function(response){
        // console.log(response);
      })
    }
  }
})
