'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','$interval',
  function($scope, Global, $interval) {
    $scope.global = Global;
    $scope.sentencesCounter = 0;
      $scope.sentencesActive = 'Que voulez vous voir aujourd\'hui?';

      $scope.sentences = {
          0: 'Que voulez vous learn aujourd\'hui?',
          1 : 'Que voulez vous apprendre aujourd\'hui?',
          2:  'Que voulez vous voir aujourd\'hui?'
      };
      $scope.sentencesExample = {
          1 :  'Exemple: NodeJS',
          2:  'Exemple: AngularJS'
      };

      $interval(function() {
          $scope.sentencesActive = $scope.sentences[$scope.sentencesCounter];
          $scope.sentencesCounter = $scope.sentencesCounter + 1;
          if($scope.sentencesCounter >=3)
              $scope.sentencesCounter = 0;
      }, 5000);



    $scope.sites = {
      'makeapoint':{
        'name':'makeapoint',
        'text':'Makeapoint is a platform to craft and fine-tune ideas and messages providing a graphical experience which brough an offline methodlogy online',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'/theme/assets/img/makeapoint.png'
      },
      'cactus':{
        'name':'Cactus Intranet',
        'text':'Cactus Intranet is an enterprise social network with features like real-time newsfeed, notifications, groups, events, polls, referral system etc. The system has role based permission system, allowing different stakeholders access and controls relevant to them.',
        'author':'QED42',
        'link':'http://www.qed42.com',
        'image':'/theme/assets/img/cactus.png'
      }
    };
    $scope.packages = {
      'gmap':{
        'name':'gmap',
        'text':'gmap lets you add geographical information to your applications objects',
        'author':'linnovate',
        'link':'http://www.qed42.com',
        'image':'/theme/assets/img/gmap.png'
      },
      'upload':{
        'name':'Upload',
        'text':'hello text',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      },
      'socket':{
        'name':'Socket',
        'text':'Socket.io support',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      }
    };

    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i+=1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });
  }
]);
