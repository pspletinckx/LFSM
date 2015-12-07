'use strict';

/**
 * @ngdoc service
 * @name highTechRecruitmentApp.daybreakCharacter
 * @description
 * # daybreakCharacter
 * Factory in the highTechRecruitmentApp.
 */
angular.module('highTechRecruitmentApp')
  .factory('daybreakCharacter',['$http', function ($http) {
    var factionId = 2; //New Conglomerate
    
    return {
      getByBR: function (battlerank,itt) {
        return $http(
          {method:"GET"
          ,url:'https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/character/?c:start='+itt+'&faction_id='+factionId+'&battle_rank.value='+battlerank+'&c:resolve=outfit,world,online_status'});
        //,url:'https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/character/?faction_id='+factionId+'&battle_rank.value='+battlerank+'&c:start='+itt+'&c:resolve=outfit,world,online_status'});
      },
      onlineStatus: function (playerid){
      	return $http(
      		{method:"GET"
	      	,url:'https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/characters_online_status?character_id='+playerid

	      	});
      },
      getAllByBR: function (battlerank) {
        return $http(
          {method:"JSONP"
          ,url:'https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/character/?c:limit=7000&faction_id=2&battle_rank.value='+battlerank+'&c:join=character_id^outfit_member,characters_online_status,characters_world^terms:world_id=17^outer:0&callback=JSON_CALLBACK'});
        //https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/character/?c:limit=10&faction_id=2&battle_rank.value=100&c:join=character_id^outfit_member,characters_world^terms:world_id=17^outer:0
        
      },
      getAllOnlineStatus: function(StringArrayIds){
        
      }
  };
  }]);
