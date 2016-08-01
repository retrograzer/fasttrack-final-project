angular
	.module('app')
	.service('MapService', ['$http', function($http) {
		
		this.map = true
		
		this.setPage = function() {
			if (this.map === true) {
				this.map = false
			} else {
				this.map = true
			}
			console.log('Map: ' + this.map)
		}
		
		this.getPage = function () {
			return this.map
		}

			this.getMarkerByCityName = function(map, name) {
				return $http.get('location/name', {params: { name : name }}).then(function(result) {
					return new google.maps.Marker({
						map : map,
						position : {
							
							//Use + to turn string to number
							lat : +result.data.latitude,
							lng : +result.data.longitude
						}
					});
				})
			}
			
			this.getAllFlights = function () {
				return $http.get('flights')
			}
			

		} ]);