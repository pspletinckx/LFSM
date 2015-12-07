'use strict';

/**
 * @ngdoc service
 * @name highTechRecruitmentApp.binairSearch
 * @description
 * # binairSearch
 * Factory in the highTechRecruitmentApp.
 */
angular.module('highTechRecruitmentApp')
  .factory('binairSearch',['daybreakCharacter', function (daybreakCharacter) {
    var viewArgs;

    var numberOfPlayers =function(lowerBound,upperBound,battlerank){
      console.log("Found lowerBound: "+lowerBound+" and upperbound: "+upperBound+" players for BR "+battlerank);
      var i = lowerBound+Math.round((upperBound - lowerBound)/2);
      daybreakCharacter.getByBR(battlerank,i).then(
        function(data){
          if (data.data.returned ==0){
           if(lowerBound == upperBound-1) {
                  nextPlayerAsync(lowerBound,battlerank);  
                  return;
                }
                numberOfPlayers(lowerBound,i,battlerank);
              };
              if (data.data.returned == 1){
               if(lowerBound == upperBound-1) {
                  nextPlayerAsync(upperBound,battlerank);
                  return;}
                  numberOfPlayers(i,upperBound,battlerank);
                };
              },
              function(){});
    };

    var nextPlayerAsync = function(howMany,battlerank){
      //determinates how big the group of players is
      console.log("getting all BR"+battlerank+" players from 1 to "+howMany);
      
      //starts a request for all
      for (var i = howMany; i > 0; i--) {
        //console.log(i);
        daybreakCharacter.getByBR(battlerank,i).then(
          function(data){
            var character=data.data.character_list[0];
              //testing cases
              if(character.character_id == 5428018587890153185) console.log("we found MementoMortis")
                // console.log(character.name.first);


              if (!!character.outfit) return; //exit if character is already in an outfit
              if (character.world_id =="17"){ //only if character is on emerald
                // console.log(character);
                viewArgs.kandidates.push(
                {
                  name: character.name.first,
                  id: character.character_id,
                  br: character.battle_rank.value,
                  online: character.online_status
                });
              };
            },
            function(){});

        howMany[i]
      };
    };

    return {
      scanAsync : function(vArgs){
        viewArgs = vArgs;
        //add for loop for all lvl, currently just "start"
        var howMany = numberOfPlayers(vArgs.lowerBound,vArgs.upperBound,vArgs.start); 
      }
    };
  }]);
