'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.videos').factory('Videos', ['$resource',
    function ($resource) {
        return $resource('videos/:videoId', {
            videoId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
])
    .factory('youtubeParserFactory', function ($http, $q) {
        var factoryvideo = {
            fVideodata : false,
            getInfoVideobyId : function(videoId){
                var deferred = $q.defer();
                $http.get('http://gdata.youtube.com/feeds/api/videos/'+ videoId +'?v=2&alt=jsonc')
                    .success(function(data){
                        factoryvideo.fVideodata = data;
                        deferred.resolve(factoryvideo.fVideodata);
                    })
                    .error(function(error){
                        console.log(error);

                    });
                return deferred.promise;
            }
        };

    return factoryvideo;
    });

