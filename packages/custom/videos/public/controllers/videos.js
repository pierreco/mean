'use strict';

angular.module('mean.videos').controller('VideosController', ['$scope', '$stateParams', '$location', 'Global', 'Videos', 'youtubeParserFactory','vimeoParserFactory', 'dailymotionParserFactory',
    function($scope, $stateParams, $location, Global, Videos, youtubeParserFactory, vimeoParserFactory, dailymotionParserFactory) {
        $scope.global = Global;
        $scope.statusUrl = null;
        $scope.hasAuthorization = function( video) {
            if (!video || !video.user) return false;
            return $scope.global.isAdmin || video.user._id === $scope.global.user._id;
        };

        $scope.searchart = function() {
            Videos.query({tag:'Tutoriel'}, function(videos){
                //$scope.articles = articles;
                console.log(videos);
            });
        };

        $scope.searchart();



        $scope.createRazVideo = function(){
            $scope.title = '' ;
            $scope.content= '';
            $scope.url = '';
            $scope.thumbnail = 'http://localhost:3000/theme/assets/img/cactus.png';
            $scope.author = '';
            $scope.youtube = '';
            $scope.tag = '';
            $scope.twitter = '';
            $scope.facebook = '';
            $scope.vimeo = '';
            $scope.dailymotion = '';

        };

        $scope.change = function(){
           // $scope.createRazVideo();

            $scope.statusUrl = true;
            console.log($scope.url);
            if(!$scope.url)
            return;

            if ($scope.url.indexOf('youtube.com/watch') !== -1) {

                var regex = new RegExp(/(?:\?v=)([^&]+)(?:\&)*/);

                var matches = regex.exec($scope.url);

                if ( matches && matches[1].length === 11 ){
                    console.log(matches[1]);

                    youtubeParserFactory.getInfoVideobyId(matches[1]).then(function(data){
                        console.log(data);
                        $scope.thumbnail = data.data.thumbnail.hqDefault;
                        $scope.title = data.data.title ;
                        $scope.content = data.data.description;
                        $scope.youtube = data.data.uploader;
                        $scope.tag = data.data.category;
                        $scope.platform = 'youtube';
                        $scope.duration = data.data.duration;
                        $scope.platformUpload = data.data.uploaded;
                    }, function(msg) {
                        console.log(msg);
                    });
                } else{
                    console.log('Could not extract video ID.');
                }
            } else if ($scope.url.match(/vimeo.com\/(\d+)/)) {
               // var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

                var match = /vimeo.*\/(\d+)/i.exec( $scope.url );
                console.log(match[1]);
                vimeoParserFactory.getInfoVideobyId(match[1]).then(function(data){
                    console.log(data[0]);
                    $scope.title = data[0].title;
                    $scope.thumbnail = data[0].thumbnail_large;
                    $scope.content = data[0].description;
                    $scope.tag = data[0].tags;
                    $scope.vimeo = data[0].user_name;
                    $scope.platform = 'vimeo';
                    $scope.duration = data[0].duration;
                    $scope.platformUpload = data[0].upload_date;
                },function(msg){
                    console.log(msg);
                });
            } else if($scope.url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/)){
                var m = $scope.url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                var videoID = '';
                if (m !== null) {
                    if(m[4] !== undefined) {
                        videoID = m[4];
                    }
                    videoID = m[2];
                    dailymotionParserFactory.getInfoVideobyId(videoID).then(function(data){
                        console.log(data);
                        $scope.title = data.title;
                        $scope.thumbnail = data.thumbnail_360_url;
                        $scope.content = data.description;
                        $scope.tag = data.tags;
                       // $scope.vimeo = data.user_name;
                        $scope.platform = 'dailymotion';
                        $scope.duration = data.duration;
                        $scope.platformUpload = data.updated_time;
                    },function(msg){
                        console.log(msg);
                    });


                }

            }
            else{
                console.log('platform not supported');
            }
        };

        $scope.create = function(isValid) {
            console.log('valis',isValid);
            if (isValid) {
                var video = new Videos({
                    title: this.title,
                    content: this.content,
                    url: this.url,
                    author: { youtube : this.youtube, vimeo : this.vimeo, dailymotion : this.dailymotion, twitter : this.twitter, facebook : this.facebook},
                    platform : this.platform,
                    duration : this.duration,
                    thumbnail : this.thumbnail,
                    platformUpload: this.platformUpload
                });
                video.$save(function(response) {
                    $location.path('videos/' + response._id);
                   // $location.path('waiting/');
                });

               /* this.title = '';
                this.content = '';
                this.url = '';
                this.author = '';
                this.twitter = '';
                this.facebook = '';
                this.vimeo = '';
                this.dailymotion = '';
                this.thumbnail = '';
                */
                $scope.createRazVideo();
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(video) {
            if (video) {
                video.$remove(function(response) {
                    for (var i in $scope.videos) {
                        if ($scope.videos[i] === video) {
                            $scope.videos.splice(i, 1);
                        }
                    }
                    $location.path('videos');
                });
            } else {
                $scope.video.$remove(function(response) {
                    $location.path('videos');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var video = $scope.video;
                if (!video.updated) {
                    video.updated = [];
                }
                video.updated.push(new Date().getTime());

                video.$update(function() {
                    $location.path('videos/' + video._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Videos.query(function(videos) {
                $scope.videos = videos;
            });
        };

        $scope.findOne = function() {
            Videos.get({
                videoId: $stateParams.videoId
            }, function(video) {
                $scope.video = video;
            });
        };
    }
]);

