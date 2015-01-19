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
    })
.factory('vimeoParserFactory', function ($http, $q) {
    var factoryvideo = {
        fVideodata : false,
        getInfoVideobyId : function(videoId){
            var deferred = $q.defer();
            $http.get('http://vimeo.com/api/v2/video/'+ videoId +'.json')
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
})
    .factory('dailymotionParserFactory', function ($http, $q) {
        var factoryvideo = {
            fVideodata : false,
            getInfoVideobyId : function(videoId){
                var deferred = $q.defer();
                $http.get('https://api.dailymotion.com/video/' + videoId + '?fields=channel,channel.name%2Cclaimer.website_url%2Cdescription%2Cduration%2Clanguage%2Ctags%2Cthumbnail_360_url%2Ctitle%2Cupdated_time%2C')
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

