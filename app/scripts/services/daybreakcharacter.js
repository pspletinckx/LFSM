'use strict';

/**
 * @ngdoc service
 * @name highTechRecruitmentApp.daybreakCharacter
 * @description
 * # daybreakCharacter
 * Factory in the highTechRecruitmentApp.
 */
angular.module('highTechRecruitmentApp')
  .factory('daybreakCharacter', function ($http) {
    var factionId = 2; //New Conglomerate
    
    return {
      getByBR: function (battlerank,itt) {
        return $http(
          {method:"GET"
          ,url:'https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/character/?faction_id='+factionId+'&battle_rank.value='+battlerank+'&c:start='+itt+'&c:resolve=outfit'});
      }};
  });
