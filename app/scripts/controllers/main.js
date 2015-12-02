'use strict';

/**
 * @ngdoc function
 * @name highTechRecruitmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the highTechRecruitmentApp
 */
angular.module('highTechRecruitmentApp')
  .controller('MainCtrl',['$scope', 'daybreakCharacter', function ($scope,daybreakCharacter) {
  	$scope.kandidates = [];
  	// kandidate name, battlerank, online, last played
  	 	var nextPlayer = function(i){
 			  	daybreakCharacter.getByBR(100,i).then(
			  		function(data){
			  			if (data.data.returned ==0) return;
			  			//console.log(data);
			  			//console.log(data.data.character_list[0]);
			  			var character=data.data.character_list[0];
			  			if (data.data.returned ==0) return;
			  			nextPlayer(i+1);
			  			if (!!character.outfit) return;
			  			console.log(character);

			  			$scope.kandidates.push(
			  				{
			  					name: character.name.first,
			  					id: character.character_id,
			  					br: character.battle_rank.value
			  				});
			  			console.log(data.data.returned);
			  			if (data.data.returned == 0) i=-1;
			  		},
			  		function(){});
 			  };
 		nextPlayer(1);
  }]);
