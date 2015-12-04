'use strict';

/**
 * @ngdoc directive
 * @name highTechRecruitmentApp.directive:status
 * @description
 * # status
 */
angular.module('highTechRecruitmentApp')
  .directive('status',['daybreakCharacter', function (daybreakCharacter) {
    return {
      template: '<p>{{k.onlineText}}</p>',
      restrict: 'E',
      controller: function($scope){
        	$scope.k.onlineText= "Loading..";
          if($scope.k.online=='17')$scope.k.onlineText = "Online";
          else $scope.k.onlineText="Offline";

        	//console.log($scope.k.id);         
            // $scope.getOnlineText = function(){
            //   if($scope.getProgress ==100){
            //       daybreakCharacter.onlineStatus($scope.k.id)
            //     .then(function(resp){
            //       if(!!resp.data.error) $scope.k.online=resp.data.error;
            //       var onlineStatus=resp.data.characters_online_status_list[0].online_status;
                  
            //       if (onlineStatus == '17'){
            //         $scope.k.online='17';
            //         $scope.k.onlineText = "Online";
            //       }
            //       else {
            //         $scope.k.online='0';
            //         $scope.k.onlineText="Offline";
            //       }
            //     },function(){
            //       $scope.k.onlineText = "error";
            //     }); 
            //   };
            // };
      }
    };
  }]);
    