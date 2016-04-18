// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'wakanda',
    'ui.router',
    'ui.validate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.service('WakandaManager', function($q, $wakanda) {
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
})
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
     controller: 'LoginCtrl'
    }
  )
  // setup an abstract state for the tabs directive
    .state('account', {
    url: '/account',
    templateUrl: 'templates/account.html',
    controller: 'AccountCtrl',
    resolve: {
//    	userID: ['$q', 'WakandaManager', function($q, WakandaManager) {
//                    var deferred = $q.defer();
//                    WakandaManager.ready().then(function() {
//                        var $wakanda = WakandaManager.$wakanda;
//                        var ds = $wakanda.getDatastore();
//                        $wakanda.$currentUser().$promise.then(function(event) {
//                        	console.log(event);
//                            if (event.result === null) {
//                                deferred.reject(false);
//                            }
//                            else {
//                                deferred.resolve(event.result.ID);
//                            }
//                        }); 
//                    });
//                   return deferred.promise;
//            }]
        }
  });

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/account');

}).
    run(['$rootScope', '$state', function ($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function (e, curr, prev) {
          if (curr.name != "login") {
              $state.go('login');
          }
      });
    }]);;
