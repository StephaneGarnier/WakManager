'use strict';
angular.module('starter').
    controller('RegisterController', ['$rootScope', '$scope', 'WakandaManager', '$state', function ($rootScope, $scope, WakandaManager, $state) {

        $scope.isSubmit = false;
        $scope.email = "";
        $scope.password = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.signupUserId = "";
        $scope.signupUserPassword = "";
        $scope.errorMessage = "";
        $scope.errorLogMessage = "";
      
		$scope.submit = function () {
            $scope.errorMessage = "";
            $scope.isSubmit = true;
            
 			WakandaManager.ready().then(function () {
      			var $wakanda = WakandaManager.$wakanda;
      			var ds = $wakanda.getDatastore();
      			ds.Users.create($scope.email, $scope.firstname , $scope.lastname , $scope.password).$promise.then(function(event){
      				if (event.result == true) {
      					$state.go("login");
      				} else {
      					console.log(event);
      					$scope.errorLogMessage = event.result.errorMessage;
      				}
	        		
	        	});
      		});
    	};
   	}]);