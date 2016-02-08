'use strict';
angular.module('starter').
    controller('ChangePasswordController', ['$rootScope', '$scope', 'WakandaManager', '$state','$stateParams', function ($rootScope, $scope, WakandaManager, $state, $stateParams) {

        $scope.isSubmit = false;
        $scope.password = "";
        $scope.signupUserPassword = "";
        $scope.errorMessage = "";
        $scope.errorLogMessage = "";
        $scope.guid = $stateParams.guid || null;
      	$scope.currentUserId = "";
     	WakandaManager.ready().then(function () {
      		var $wakanda = WakandaManager.$wakanda;
      		var ds = $wakanda.getDatastore();
      		$wakanda.$currentUser().$promise.then(function (event) {
      			if (event.result != null)
  					$scope.currentUserId = event.result.ID;
			});
		 });
		 
		$scope.submit = function () {
            $scope.errorMessage = "";
            $scope.isSubmit = true;
            
 			WakandaManager.ready().then(function () {
      			var $wakanda = WakandaManager.$wakanda;
      			var ds = $wakanda.getDatastore();
      			ds.Users.changePassword($scope.currentUserId, $scope.password, $scope.guid).$promise.then(function(event){
      				if (event.result == true) {
      					if ($scope.currentUserId != ""){
      						$state.go("profile");
      					} else {
      						$state.go("login");
      					}
      				} else {
      					console.log(event);
      					$scope.errorLogMessage = event.result.errorMessage;
      				}
	        		
	        	});
      		});
    	};
   	}]);