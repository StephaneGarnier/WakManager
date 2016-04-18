'use strict';
angular.module('starter').
    controller('LoginController', ['$rootScope', '$scope', '$wakanda', '$state', function ($rootScope, $scope, $wakanda, $state) {

        $scope.isLoging = false;
        $scope.userId = "john@test.fr";
        $scope.userPassword = "john";
        $scope.errorMessage = "";
        $scope.errorLogMessage = "";

        $scope.login = function () {
			$scope.errorLogMessage = "";
        $scope.isLoging = true;
      			$wakanda.$login($scope.userId, $scope.userPassword).$promise.then(function (e) {
  				if (e.result === true) {
  					$state.go('profile');
  					$scope.isLoging = false;
				  }
				  else {
				    console.log("error");
				    $scope.isLoging = false;
				    $scope.errorLogMessage = "Unauthorized";
				  }
				});
        
        };
   	}]); 