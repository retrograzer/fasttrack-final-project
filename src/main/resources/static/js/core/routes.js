angular.
  module('app').
  config(['$routeProvider', 'baseRoute',
    function config($routeProvider, baseRoute) {

      $routeProvider.
      	when('/map', {
          
          templateUrl: baseRoute + "map/template.html",
          controller: 'MapController',
          controllerAs: 'mapController'
          
        }).
        when('/login', {
            
            templateUrl: baseRoute + "login/loginTemplate.html",
            controller: 'LoginController',
            controllerAs: 'loginController'
            
        }).
        when('/user', {
          
          templateUrl: baseRoute + "user/userTemplate.html",
          controller: 'UserController',
          controllerAs: 'userController'
          
        }).
        otherwise('/login');
    }
  ]);