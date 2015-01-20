'use strict';

//Setting up route
angular.module('mean.videos').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('waiting', {
                url: '/waiting',
                templateUrl: 'videos/views/waitingValidation.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('all videos', {
                url: '/videos',
                templateUrl: 'videos/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create video', {
                url: '/videos/create',
                templateUrl: 'videos/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit video', {
                url: '/videos/:videoId/edit',
                templateUrl: 'videos/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('search', {
                url : '/videos/search/:tag',
                templateUrl: 'videos/view/search.html'
            })
            .state('video by id', {
                url: '/videos/:videoId',
                templateUrl: 'videos/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
