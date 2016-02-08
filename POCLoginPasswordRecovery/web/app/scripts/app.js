var app = angular.module('starter', [
    'wakanda',
    'ui.router',
    'ui.validate'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            resolve: {}
        });
    $stateProvider
        .state('lost_password', {
            url: '/lost_password',
            templateUrl: 'views/lost_password.html',
            controller: 'LostPasswordController',
            resolve: {}
        });
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterController',
            resolve: {}
        });
    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileController',
            resolve: {
                userID: ['$q', 'WakandaManager', function($q, WakandaManager) {
                    var deferred = $q.defer();
                    WakandaManager.ready().then(function() {
                        var $wakanda = WakandaManager.$wakanda;
                        var ds = $wakanda.getDatastore();
                        $wakanda.$currentUser().$promise.then(function(event) {
                            if (event.result === null) {
                                deferred.reject(false);
                            }
                            else {
                                deferred.resolve(event.result.ID);
                            }
                        }); 
                    });
                   return deferred.promise;
                }]
            }
        });
    $stateProvider
        .state('change_password', {
            url: '/change_password/:guid?',
            templateUrl: 'views/change_password.html',
            controller: 'ChangePasswordController',
            resolve: {}
        });
}]).
    run(['$rootScope', '$state', function ($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function (e, curr, prev) {
          if (curr.name != "login") {
              $state.go('login');
          }
      });
    }]);

app.service('WakandaManager', function($q, $wakanda) {
    var _this = this;
    var initPromise = $wakanda.init();
    this.$wakanda = $wakanda;

    this.ready = function() {
        var deferred = $q.defer();

        initPromise
            .then(function() {
                deferred.resolve(_this);
            })
            .catch(function(e) {
                deferred.reject(e);
            });

        return deferred.promise;
    };
});

app.controller('myController', function($scope, WakandaManager) {
    WakandaManager.ready().then(function() {
        var $wakanda = WakandaManager.$wakanda;

        //var ds = $wakanda.getDatastore();
        //$scope.employees = ds.Employee.$find({select: 'company'});
    });
});