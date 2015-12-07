'use strict';

/**
 * @ngdoc service
 * @name highTechRecruitmentApp.bulk
 * @description
 * # bulk
 * Factory in the highTechRecruitmentApp.
 */
angular.module('highTechRecruitmentApp')
  .factory('bulk',['daybreakCharacter','planetsails' ,function (daybreakCharacter,planetsails) {
    var viewArg;


   var getAllBattlerank = function(battlerank){
      var kandidatesPerBattlerank=[];
      daybreakCharacter.getAllByBR(battlerank).then(
        function(response){
          viewArg.done();
          var arrayOfPlayers =response.data.character_list;
          for (var i = arrayOfPlayers.length - 1; i >= 0; i--) {
            var character= arrayOfPlayers[i];
              //console.log(character);
              if (!!character.character_id_join_outfit_member) ; //exit if character is already in an outfit
              else if (character.character_id_join_characters_world.world_id =="17"){ //only if character is on emerald
                console.log("Pushing a BR"+battlerank+" to the view");
                viewArg.statusMessage ="BR"+battlerank;
                var player = {
                  "name": character.name.first,
                  "id": character.character_id,
                  "br": character.battle_rank.value,
                  "online": character.character_id_join_characters_online_status.online_status
                };
                // var backend = new highbr();
                // backend.name = player.name;
                // backend.id =player.id;
                // backend.br = player.br;
                // backend.$save();
                // console.log(player);


                kandidatesPerBattlerank.push(player);

                planetsails.postHightBr(player);
              };
            };
          //$cookies.putObject(battlerank,kandidatesPerBattlerank,{cookieExpire});
          viewArg.kandidates.push.apply(viewArg.kandidates,kandidatesPerBattlerank);
          if(battlerank!=viewArg.end) getAllBattlerank(battlerank-1);
          //Cookie is tooo large
        },function(){});
    };
    return {
      scanInBulk : function(vArgs){
        viewArg = vArgs;
        getAllBattlerank(viewArg.start);
      }
    };
  }]);
