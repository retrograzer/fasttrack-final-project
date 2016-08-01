angular
	.module('app')
	.service('UserService', ['$http', function($http){
		
		var ctrl = this
		
		ctrl.myUser = null
		
		this.getAllItens = function(){
			return $http.get('iten/get')
		}
		
		this.createIten = function(response) {
			return $http.post('iten/create', response)
		}
		
		this.setUser = function(username) {
			ctrl.myUser = username
		}
		
		this.getUser = function() {
			return ctrl.myUser
		}
		
		this.getFlights = function() {
			return $http.get('flights')
		}
		
//		if (final_exam_stress && no_sleep) {
//			writeStupidComments(iAmAnIdiot)
//		}
		
	}])