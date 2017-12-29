(function(){

  var app = angular.module('Timer',['ngMaterial'])

  app.controller('timerCtrl',timerCtrl)

  function timerCtrl($scope,$log,$http,$mdToast){
    // GET VIDEO parameters
    //
    //https://www.googleapis.com/youtube/v3/videos?part=snippet&id=wlsdMpnDBn8&key=AIzaSyC7Be_qvABg-l_DQNuhwkMwtL-d96VLNbc
    //
    //
    $scope.id = "Hi! We use cookies on this website to help operate our site and for analytics purposes. For more on how we use cookies and your cookie choices, go ";

    var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };

    $scope.toastPosition = angular.extend({},last);

    $scope.getToastPosition = function() {
      sanitizePosition();

      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;
      last = angular.extend({},current);
    }

    $scope.searchCards = [];

    $scope.cards = [
      // {
      //   img_url: "http://img.youtube.com/vi/YRLw55eGMn8/mqdefault.jpg",
      //   title: "Wander | A Chill Mix"
      // },
      // {
      //   img_url: "http://img.youtube.com/vi/RitPNjYthT8/mqdefault.jpg",
      //   title: "Wander | A Alon Hochman"
      // },
      // {
      //   img_url: "http://img.youtube.com/vi/DjWnx1uSkkY/mqdefault.jpg",
      //   title: "Wander | A Alon Hochman"
      // },
      // {
      //   img_url: "http://img.youtube.com/vi/6VE33eYgVzw/mqdefault.jpg",
      //   title: "Wander | A Alon Hochman"
      // },
      // {
      //   img_url: "http://img.youtube.com/vi/sRAvQVf33Xo/mqdefault.jpg",
      //   title: "Wander | A Alon Hochman"
      // }
    ];

    $scope.add = function(){

      if ($scope.searchCards.length == 0){
        url = 'https://www.googleapis.com/youtube/v3/search';

        $http.get(url+"?part=snippet&q="+ $scope.input +"&maxResults=6&order=viewCount&type=video&key=AIzaSyC7Be_qvABg-l_DQNuhwkMwtL-d96VLNbc")
          .success(function(data){
            var adder = data.items[0];

            $log.info("adding..  |  " + adder.snippet.title);

            var pinTo = $scope.getToastPosition();

            $mdToast.show(
              $mdToast.simple()
                .textContent('adding  ' + adder.snippet.title)
                .position(pinTo)
                .hideDelay(500)
            );

            $scope.input = "";

            $scope.cards.push(
              {
                img_url: "http://img.youtube.com/vi/" + adder.id.videoId + "/mqdefault.jpg",
                title: adder.snippet.title,
                yt_id: adder.id.videoId
              }
            );
          });
      } else {
        $log.info("adding..  |  " + $scope.searchCards[0].snippet.title);

        var pinTo = $scope.getToastPosition();

        $mdToast.show(
          $mdToast.simple()
            .textContent('adding  ' + $scope.searchCards[0].snippet.title)
            .position(pinTo)
            .hideDelay(500)
        );

        $scope.input = "";

        $scope.cards.push(
          {
            img_url: "http://img.youtube.com/vi/" + $scope.searchCards[0].id.videoId + "/mqdefault.jpg",
            title: $scope.searchCards[0].snippet.title,
            yt_id: $scope.searchCards[0].id.videoId
          }
        );
        $scope.input = "";
        $scope.searchCards = [];
      }
    }

    $scope.addFromSearch = function(index){
      $log.info("adding..  |  " + $scope.searchCards[index].snippet.title);

      var pinTo = $scope.getToastPosition();

      $mdToast.show(
        $mdToast.simple()
          .textContent('adding..   ' + $scope.searchCards[index].snippet.title )
          .position(pinTo)
          .hideDelay(500)
      );

      $scope.input = "";

      $scope.cards.push(
        {
          img_url: "http://img.youtube.com/vi/" + $scope.searchCards[index].id.videoId + "/mqdefault.jpg",
          title: $scope.searchCards[index].snippet.title,
          yt_id: $scope.searchCards[index].id.videoId
        }
      );
    }

    $scope.Search = function(){
      //
      if($scope.input <= 1) {
        $scope.searchCards = [];
        return;
      }

      url = 'https://www.googleapis.com/youtube/v3/search';

      $http.get(url+"?part=snippet&q="+ $scope.input +"&maxResults=6&order=viewCount&type=video&key=AIzaSyC7Be_qvABg-l_DQNuhwkMwtL-d96VLNbc")
        .success(function(data){
          $scope.searchCards = data.items;
        });
      //
    }

    $scope.Remove = function(index){
      $log.info("Removing.. "+index);

      var pinTo = $scope.getToastPosition();
      $mdToast.show(
        $mdToast.simple()
          .textContent('removed..   ' + $scope.cards[index].title)
          .position(pinTo)
          .hideDelay(500)
      );

      $scope.cards.splice(index,1);
    }

  }
}())
