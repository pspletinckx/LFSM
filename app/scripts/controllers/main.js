'use strict';

/**
 * @ngdoc function
 * @name highTechRecruitmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the highTechRecruitmentApp
 */
 angular.module('highTechRecruitmentApp')
 .controller('MainCtrl',['$scope','$cookies','highbr','bulk','binairSearch', function ($scope,$cookies,highbr,bulk,binairSearch) {
   var startBR =100;
   var endBR = 56;
   $scope.progress = 0;
   $scope.kandidates=[];
   $scope.statusMessage;

   $scope.getProgress =function(){
    return Math.round($scope.progress);
  };

    var doneBr = function(){
      var increment = 100 / (startBR-endBR+1);
      $scope.progress +=increment;
    };

    $scope.resetCache = function(){
     $cookies.remove(100);
     $scope.kandidates = [];
          //refresh
      };
    $scope.scan = function(){
      $scope.kandidates =[];
      $scope.progress = 0;
      for (var i = startBR; i >= endBR; i--) {
        console.log("starting scan for br "+i)
        findBattlerank(i);
      };
    };
    $scope.scanAsync = function(){
       binairSearch.scanAsync({
        done : doneBr,
        statusMessage : $scope.statusMessage,
        kandidates : $scope.kandidates,
        start: startBR,
        end : endBR,
        lowerBound : 0,
        upperBound : 10000
     });
    };

    $scope.scanInBulk = function(){
     bulk.scanInBulk({
      done : doneBr,
      statusMessage : $scope.statusMessage,
      kandidates : $scope.kandidates,
      start: startBR,
      end : endBR
     });
    };

    $scope.testBackend = function(){
        planetsails.getHighBr().then(function(data){
          console.log(data);
          var arrayOfPlayers =data.data;
          for (var i = arrayOfPlayers.length - 1; i >= 0; i--) {
            var character= arrayOfPlayers[i];
            $scope.kandidates.push(character);        
                };
        },
        function(){});
      console.log("test");
    };

    $scope.testResourceBackend = function(){
      $scope.kandidates= highbr.query({"limit":500});

    };

  }]);
