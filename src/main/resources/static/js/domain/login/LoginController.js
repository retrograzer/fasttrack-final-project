angular
  .module('app')
  .controller('LoginController', ['LoginService', 'UserService', '$location','$routeParams', function(loginService, userService, $location, $routeParams) {
	  
	var ctrl = this;
	
	this.login = function() {
	  var login = {
			  "username" : ctrl.username,
			  "password" : ctrl.password,
	  }
	  loginService.getLoginDetails(login)
	  .then(function(result) {
		ctrl.user = result.data
		console.dir(ctrl.user)
		if (ctrl.user !== null) {
			userService.setUser(ctrl.username)
			$location.path("/map")
		}
	  })
	}
	
	this.register = function() {
		var register = {
				"password": ctrl.Rpassword,
				"username": ctrl.Rusername,
		}
		loginService.createUser(register)
		.then(function(result) {
			ctrl.user = result.data
			console.dir(ctrl.user)
			alert('New User Created!')
		})
	}
}])