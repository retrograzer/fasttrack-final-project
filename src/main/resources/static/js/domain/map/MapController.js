angular
	.module('app')
	.controller('MapController', ['MapService', '$interval', '$location', function(MapService, $interval, $location) {
	
		var ctrl = this;
		
		this.switchPage = function () {
			MapService.setPage()
			console.log('Do')
			$location.path("/user")
		}
		
		//Map object
		var map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 7,
	        center: {lat: 27.6648, lng: -81.5158}
	      });
		
		
		//Sample data
		var jacksonville = new google.maps.Marker({
		        map: map,
		        position: {lat: 30.3322, lng: -81.6557}
		      });
		
		var miami = new google.maps.Marker({
	        map: map,
	        position: {lat: 25.7617, lng: -80.1918}
	      });
		
		var tallahassee = new google.maps.Marker({
			map: map,
			position: {lat: 30.4383, lng: -84.2807}
		})
		
		var orlando = new google.maps.Marker({
			map: map,
			position: {lat: 28.5383, lng: -81.3792}
		})
	
		
		//Add a line to the map
	    ctrl.addPoly = function addPoly(pointA, pointB, color) {
	      
	    	geodesicPoly = new google.maps.Polyline({
	            strokeColor: color,
	            strokeOpacity: 1.0,
	            strokeWeight: 3,
	            geodesic: true,
	            map: map
	          });
	    	
	    	geodesicPoly.setPath([pointA.getPosition(), pointB.getPosition()]);
	    }	
		
		$interval(function() {
			MapService.getAllFlights()
			.then(function(result){
				ctrl.flights = result.data
				console.log('tick')
			})
		}, 9000)
		
		$interval(function() {
			//for some reason, I found that a for loop going over the MapService.getMarkerByCityName
			//didn't work, as it seemed that the loop would increment faster than a promise could return, which forced me to do
			//one promise at a time. It wasn't pretty, but it was the best solution I could find
			if (MapService.getPage()) {
			map = new google.maps.Map(document.getElementById('map'), {
		        zoom: 7,
		        center: {lat: 27.6648, lng: -81.5158}
		      });
			var i = 0
			MapService.getMarkerByCityName(map, ctrl.flights[i].origin)
			.then(function(marker) {
				if (ctrl.flights[i].destination === "Jacksonville") {
					ctrl.addPoly(jacksonville, marker, '#E43009');
				} else if (ctrl.flights[i].destination === "Miami") {
					ctrl.addPoly(miami, marker, '#495CFA');
				} else if (ctrl.flights[i].destination === "Orlando") {
					ctrl.addPoly(orlando, marker, '#FF3388');
				} else if (ctrl.flights[i].destination === "Tallahassee") {
					ctrl.addPoly(tallahassee, marker, '#FF3388');
				}
				i = 1
				MapService.getMarkerByCityName(map, ctrl.flights[i].origin)
				.then(function(marker) {
					if (ctrl.flights[i].destination === "Jacksonville") {
						ctrl.addPoly(jacksonville, marker, '#E43009');
					} else if (ctrl.flights[i].destination === "Miami") {
						ctrl.addPoly(miami, marker, '#495CFA');
					} else if (ctrl.flights[i].destination === "Orlando") {
						ctrl.addPoly(orlando, marker, '#E11A1A');
					} else if (ctrl.flights[i].destination === "Tallahassee") {
						ctrl.addPoly(tallahassee, marker, '#6EB507');
					}
					i = 2
					MapService.getMarkerByCityName(map, ctrl.flights[i].origin)
					.then(function(marker) {
						if (ctrl.flights[i].destination === "Jacksonville") {
							ctrl.addPoly(jacksonville, marker, '#E43009');
						} else if (ctrl.flights[i].destination === "Miami") {
							ctrl.addPoly(miami, marker, '#495CFA');
						} else if (ctrl.flights[i].destination === "Orlando") {
							ctrl.addPoly(orlando, marker, '#E11A1A');
						} else if (ctrl.flights[i].destination === "Tallahassee") {
							ctrl.addPoly(tallahassee, marker, '#6EB507');
						}
						i = 3
						MapService.getMarkerByCityName(map, ctrl.flights[i].origin)
						.then(function(marker) {
							if (ctrl.flights[i].destination === "Jacksonville") {
								ctrl.addPoly(jacksonville, marker, '#E43009');
							} else if (ctrl.flights[i].destination === "Miami") {
								ctrl.addPoly(miami, marker, '#495CFA');
							} else if (ctrl.flights[i].destination === "Orlando") {
								ctrl.addPoly(orlando, marker, '#E11A1A');
							} else if (ctrl.flights[i].destination === "Tallahassee") {
								ctrl.addPoly(tallahassee, marker, '#6EB507');
							}
							i = 4
							MapService.getMarkerByCityName(map, ctrl.flights[i].origin)
							.then(function(marker) {
								if (ctrl.flights[i].destination === "Jacksonville") {
									ctrl.addPoly(jacksonville, marker, '#E43009');
								} else if (ctrl.flights[i].destination === "Miami") {
									ctrl.addPoly(miami, marker, '#495CFA');
								} else if (ctrl.flights[i].destination === "Orlando") {
									ctrl.addPoly(orlando, marker, '#E11A1A');
								} else if (ctrl.flights[i].destination === "Tallahassee") {
									ctrl.addPoly(tallahassee, marker, '#6EB507');
								}
							})
						})
					})
				})
			})
			}
		}, 10000)

}]);