angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope, WakandaManager, $state) {
	var userID= "56BB5D308D684EF98877E4F0CF60719F";
  $scope.settings = {
    enableFriends: true
  };
  $scope.notEditable = true;
    WakandaManager.ready().then(function() {
        var $wakanda = WakandaManager.$wakanda;
        var ds = $wakanda.getDatastore();
            ds.Users.$find(userID).$promise.then(function(event) {
                $scope.info = event.result;
               
            });
    });

    $scope.save = function() {
        $scope.notEditable = true;

        WakandaManager.ready().then(function() {
            var $wakanda = WakandaManager.$wakanda;
            var ds = $wakanda.getDatastore();
            ds.Users.edit(userID, $scope.info.firstname, $scope.info.lastname, $scope.info.country).$promise.then(function(event) {
				$scope.uploadFile();
            });
        });

    };

    $scope.logout = function() {
        WakandaManager.ready().then(function() {
            var $wakanda = WakandaManager.$wakanda;
            $wakanda.$logout().$promise.then(function() {
                $state.go("login");
            });
        });
    };

    $scope.uploadFile = function() {
        WakandaManager.ready().then(function() {
            var $wakanda = WakandaManager.$wakanda;
            var ds = $wakanda.getDatastore();
            ds.Users.$find(userID).$promise.then(function(user) {
                var file = document.getElementById('fileInput').files[0];
                user.result.photo.$upload(file).$promise.then(function() {
                    user.result.$save().$promise.then(function() {
                        $state.reload();
                    });
                });
            });
        });
    };
})
.controller('LoginCtrl', function($rootScope, $scope, $wakanda, $state, WakandaManager) {
    $scope.isLoging = false;
        $scope.user = {
        	Id : "",
        	Password : ""
    	}
        $scope.errorMessage = "";
        $scope.errorLogMessage = "";

        $scope.login = function () {
			$scope.errorLogMessage = "";
        $scope.isLoging = true;
      			$wakanda.$login($scope.user.Id, $scope.user.Password).$promise.then(function (e) {
  				if (e.result === true) {
  					
  					$state.go('account');
  					$scope.isLoging = false;
				  }
				  else {
				    console.log("error");
				    $scope.isLoging = false;
				    $scope.errorLogMessage = "Unauthorized";
				  }
				});
        
        };
});
