'use strict';

/**
 * @ngdoc service
 * @name highTechRecruitmentApp.linkedList
 * @description
 * # linkedList
 * Factory in the highTechRecruitmentApp.
 */
angular.module('highTechRecruitmentApp')
  .factory('linkedList',['$cookies' ,function ($cookies) {
    var viewArgs;

      var kandidates = [];
      var progress = 0;

      var cookieExpire = new Date();
          cookieExpire.setDate(cookieExpire.getDate() + 7);

          $cookies.put('123','test',{expires:cookieExpire});

      var findBattlerank=function(br){
        //cookie has value
        //scope = cookievalue
        //else start algorithm to bake cookie
        if(!!$cookies.get(br)){
          kandidates.push.apply(kandidates,$cookies.getObject(br));
          doneBr();
          return;
        }     
        var kandidates = [];
        nextPlayer(1,br,kandidates); //uses nextPlayer
      };
             // kandidate name, battlerank, online, last played
      var nextPlayer = function(i, battlerank,kandidates){ ///here is an idea to make it more performant, make it go from high to low, then async
       daybreakCharacter.getByBR(battlerank,i).then(
         function(data){
              if (data.data.returned === 0) { //or i = 10 test
                console.log("Done with series, preserving");
                $scope.statusMessage = "Done with series, preserving";
                $cookies.putObject(battlerank,kandidates,{expires:cookieExpire});
                $scope.kandidates.push.apply($scope.kandidates,$cookies.getObject(battlerank));
                doneBr();
              }
              if (data.data.returned ===0) {
                return;
              }
              //console.log(data);
              //console.log(data.data.character_list[0].world_id);
              var character=data.data.character_list[0];
              console.log("Checking br "+battlerank+"nr"+i+"...");//checking
              $scope.statusMessage = "Checking br "+battlerank+" - "+i+"...";
              nextPlayer(i+1,battlerank,kandidates);
              if (!!character.outfit){} {
               return;
              } //exit if character is already in an outfit
              if (character.world_id =="17"){ //only if character is on emerald
                console.log(character);
               kandidates.push(
               {
                 name: character.name.first,
                 id: character.character_id,
                 br: character.battle_rank.value,
                 online: character.online_status
               });
             }
              console.log(data.data.returned);//1111111
              
            },
            function(){});
      };


    return{
      scan : function(kandidates,progress){
        kandidates =[];
        progress = 0;
        for (var i = startBR; i >= endBR; i--) {
          console.log("starting scan for br "+i)
          findBattlerank(i);
        };
      },
      resetCache : function(kandidates,progress){
         $cookies.remove(100);
         $scope.kandidates = [];
              //refresh
            }
    };
  }]);
