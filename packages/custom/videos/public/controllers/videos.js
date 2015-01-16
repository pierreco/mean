'use strict';

angular.module('mean.videos').controller('VideosController', ['$scope', '$stateParams', '$location', 'Global', 'Videos', 'youtubeParserFactory',
    function($scope, $stateParams, $location, Global, Videos, youtubeParserFactory) {
        $scope.global = Global;
        $scope.dataVideos = '';

        $scope.hasAuthorization = function( video) {
            if (!video || !video.user) return false;
            return $scope.global.isAdmin || video.user._id === $scope.global.user._id;
        };

        $scope.createRazVideo = function(){
            $scope.title = '' ;
            $scope.content= '';
            $scope.url = '';
            $scope.createThumbnailVideo = 'http://localhost:3000/theme/assets/img/cactus.png';
            $scope.author = '';
            $scope.youtube = '';
            $scope.tag = '';
        };

        $scope.change = function(){
            console.log($scope.url);
            var regex = new RegExp(/(?:\?v=)([^&]+)(?:\&)*/);

            var matches = regex.exec($scope.url);

            if(matches[1]){
                console.log(matches[1]);
                youtubeParserFactory.getInfoVideobyId(matches[1]).then(function(data){
                  console.log(data);
                    $scope.dataVideos = data;
                    $scope.createThumbnailVideo = data.data.thumbnail.hqDefault;
                    $scope.title = data.data.title ;
                    $scope.content = data.data.description;
                    $scope.youtube = data.data.uploader;
                    $scope.tag = data.data.category;
                }, function(msg){
                    $scope.dataVideos = null;
                    console.log(msg);
                });
            }else{
                $scope.dataVideos = null;
            }

        };

        $scope.create = function(isValid) {
            if (isValid) {
                var video = new Videos({
                    title: this.title,
                    content: this.content,
                    url: this.url,
                    author: { twitter : this.twitter, youtube : this.youtube},
                });
                video.$save(function(response) {
                    $location.path('videos/' + response._id);
                });

                this.title = '';
                this.content = '';
                this.url = '';
                this.author = '';
                this.twitter = '';
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

