'use strict';
angular.module('starter').
controller('ProfileController', ['$scope', 'WakandaManager', '$state', 'userID', function($scope, WakandaManager, $state, userID) {
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
}]);