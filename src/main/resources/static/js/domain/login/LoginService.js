angular
	.module('app')
	.service('LoginService', ['$http', function($http) {
	
		var url = 'user/';
		
		this.getLoginDetails = function(login) { return $http.post(url + "login", login) };
		
		this.createUser = function(register) {return $http.post(url + "create", register) };
	
	}])