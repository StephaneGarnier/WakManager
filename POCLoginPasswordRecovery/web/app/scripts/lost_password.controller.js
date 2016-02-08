'use strict';
angular.module('starter').
    controller('LostPasswordController', ['$rootScope', '$scope', 'WakandaManager', '$state', function ($rootScope, $scope, WakandaManager, $state) {

        $scope.isSubmit = false;
        $scope.userId = "";
        $scope.errorMessage = "";
        $scope.errorLogMessage = "";
      	var currentUser = {};
     	
		 
		$scope.submit = function () {
            $scope.errorMessage = "";
            $scope.isSubmit = true;
            
 			WakandaManager.ready().then(function () {
      			var $wakanda = WakandaManager.$wakanda;
      			var ds = $wakanda.getDatastore();
      			ds.Users.lostPassword($scope.userId).$promise.then(function(event){
      				if (event.result.success == true) {
      					if (event.result.resetID != null) {
      						$state.go("change_password", {guid:event.result.resetID});
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