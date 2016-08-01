angular
	.module('app')
	.controller('UserController', ['UserService', 'MapService', '$location', '$routeParams', '$interval', function(userService, MapService, $location, $routeParams, $interval) {
		
		var ctrl = this
		
		ctrl.totalTime = 0
		ctrl.totalLayover = 1
		
		//switches back to the big map with the markers of current flights and makes sure that the $interval
		//on the map page is activated
		this.switchPage = function () {
			MapService.setPage()
			$location.path("/map")
		}
	
		//Gets all the itineraries and then puts all user's itineraries in an array
		this.allItens = function() {
			userService.getAllItens()
			.then(function(result){
				ctrl.itens = result.data
				ctrl.userItens = []
				for (var i = 0; i < ctrl.itens.length; i++) {
					if (ctrl.itens[i].name === userService.getUser()) {
						ctrl.userItens.push(ctrl.itens[i])
					}
				}
			})
		}
		
		//for use with the buttons (only for direct one-way flights)
		this.createItens = function(origin, destination, flightTime) {
			var allDest = ctrl.flights
			var validDest = false
			if (userService.getUser() === null) {
				validDest = false	
			} else {
				validDest = true
			}
			if (validDest) {
				ctrl.totalTime = flightTime
				var response = {
						"name": userService.getUser(),
						"origin": origin,
						"destination": destination
				}
				userService.createIten(response)
				.then(function(result){
					ctrl.newItens = result.data
					console.dir(ctrl.newItens)
					alert('New Destination Created!')
					addLine(ctrl.newItens.origin, ctrl.newItens.destination)
				})
			} else {
				alert('You must be signed in to book flights.')
			}
		}
		
		//this is for the form submit of a new iten. Basically the same as the booking button one, but this one is
		//necessary for if you need multiple stops along the way.
		this.manualItens = function() {
			var allDest = ctrl.flights
			var validDest = false
			var available = []
			var matchOrigins = []
			if (userService.getUser() === null) {
				validDest = false	
			} else {
				//gets all flights associated with the destination
				//and all flights associated with the origin
				for (var i = 0; i < allDest.length; i++) {
					if (allDest[i].destination === ctrl.destination) {
						available.push(allDest[i])
					}
					if (allDest[i].origin == ctrl.origin) {
						matchOrigins.push(allDest[i])
					}
				}
				if (available.length > 0) {
					validDest = true
				}
			}
			if (validDest) {
				for (var h = 0; h < available.length; h++) {
					//no midpoint? No problem
					if (available[h].origin === ctrl.origin) {
						ctrl.midpoint = null
						ctrl.totalLayover = 1
						ctrl.totalTime = available[h].flightTime
					} else {
						//sets a midpoint through magic
						for (var j = 0; j < available.length; j++) {
							for (var g = 0; g < matchOrigins.length; g++){
								if (matchOrigins[g].destination === available[j].origin) {
									ctrl.midpoint = matchOrigins[g].destination
									ctrl.totalLayover = 2
									ctrl.totalTime = matchOrigins[g].flightTime + available[j].flightTime
								} //what
							} //is
						} //a
					} //for
				} //loop?
				var response = {
						"name": userService.getUser(),
						"origin": ctrl.origin,
						"destination": ctrl.destination,
						"midpoint": ctrl.midpoint
				}
				userService.createIten(response)
				.then(function(result){
					ctrl.newItens = result.data
					console.dir(ctrl.newItens)
					alert('New Destination Created!')
					addMultiLine(ctrl.newItens.origin, ctrl.newItens.midpoint, ctrl.newItens.destination)
				})
			} else {
				alert('You must be signed in to book flights, or a destination does not exist.')
			}
		}
		
		//just updates the ctrl.flights
		$interval(function() {
			userService.getFlights()
			.then(function(result) {
				ctrl.flights = result.data
			})
		}, 10000);
		
		//initial flight getter
		this.allFlights = function() {
			userService.getFlights()
			.then(function(result) {
				ctrl.flights = result.data
			})
		}
		
		//unused, as the booking list shows all destinations anyway
		this.searchDest = function() {
			ctrl.response = []
			for (var i = 0; i < ctrl.flights.length; i++) {
				if (ctrl.flights[i].origin === ctrl.search) {
					ctrl.response[ctrl.response.length] += ctrl.flights[i].destination
				}
			}
		}
		
		//-------------------------------------------------------------------------------------------
		//-------------------------------------------------------------------------------------------
		//Map part
		
		var map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 7,
	        center: {lat: 27.6648, lng: -81.5158}
	     });
		
		map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 7,
	        center: {lat: 27.6648, lng: -81.5158}
	    });
		
		ctrl.addPoly = function addPoly(pointA, pointB, color) {
		      
	    	geodesicPoly = new google.maps.Polyline({
	            strokeColor: color,
	            strokeOpacity: 1.0,
	            strokeWeight: 3,
	            geodesic: true,
	            map: map
	          });
	    	//almost added a pointC, but then remembered that for multiple flights you need to switch colors...
	    	//dern graphic designers
	    	geodesicPoly.setPath([pointA.getPosition(), pointB.getPosition()]);
	    }
		
		//I kept the variables so that I could use them later. I basically traded in a bunch of promises for a bunch of 
		//if's hahaha
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
		
		//only used for direct origin to destination flights
		var addLine = function(origin, destination) {
			map = new google.maps.Map(document.getElementById('map'), {
		        zoom: 7,
		        center: {lat: 27.6648, lng: -81.5158}
		    });
			MapService.getMarkerByCityName(map, origin)
			.then(function(marker) {
				if (destination === "Jacksonville") 
				{
					ctrl.addPoly(jacksonville, marker, '#F20909')
				} 
				else if (destination === "Miami") 
				{
					ctrl.addPoly(miami, marker, '#F20909')
				}
				else if (destination === "Orlando") 
				{
					ctrl.addPoly(orlando, marker, '#F20909')
				} 
				else if (destination === "Tallahassee")
				{
					ctrl.addPoly(tallahassee, marker,'#F20909')
				}
			})
		}
		
		//I switched curly brace styles not because I like this style but because it was VERY cramped in my normal style.
		//I feel like I've just surrendered to the enemy somehow...
		
		//Only for flights with midpoints
		var addMultiLine = function(origin, midpoint, destination) {
			map = new google.maps.Map(document.getElementById('map'), {
		        zoom: 7,
		        center: {lat: 27.6648, lng: -81.5158}
		    });
			MapService.getMarkerByCityName(map, origin)
			.then(function(marker) {
				 var myMidpoint = midpointConversion(midpoint, destination, origin)
				if (myMidpoint === null) {
					addLine(origin, destination)
				}
				else 
				{
					if (destination === "Jacksonville") 
					{
						ctrl.addPoly(jacksonville, myMidpoint, '#01B6F9')
						ctrl.addPoly(myMidpoint, marker, '#66AB03')
					} 
					else if (destination === "Miami") 
					{
						ctrl.addPoly(miami, myMidpoint, '#01B6F9')
						ctrl.addPoly(myMidpoint, marker, '#66AB03')
					}
					else if (destination === "Orlando") 
					{
						ctrl.addPoly(orlando, myMidpoint, '#01B6F9')
						ctrl.addPoly(myMidpoint, marker, '#66AB03')
					} 
					else if (destination === "Tallahassee")
					{
						ctrl.addPoly(orlando, myMidpoint,'#01B6F9')
						ctrl.addPoly(myMidpoint, marker, '#66AB03')
					}
				}
				
			})
		}
		
		//Takes the string of midpoint and converts it to one of the four preset lat/long variables
		var midpointConversion = function (midpoint, destination, origin) {
			var finalMid
			if (midpoint === "Jacksonville") {
				finalMid = jacksonville
			} else if (midpoint === "Miami") {
				finalMid = miami
			} else if (midpoint === "Tallahassee") {
				finalMid = tallahassee
			} else if (midpoint === "Orlando") {
				finalMid = orlando
			} else if (midpoint === null) {
				finalMid = null
			}
			return finalMid
		}
	
	}])