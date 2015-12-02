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
			  			//console.log(data.data.character_list[0].world_id);
			  			var character=data.data.character_list[0];
			  			console.log(i+". Checking...");//checking
			  			nextPlayer(i+1);
			  			if (!!character.outfit) return;
			  			if (character.world_id =="17"){
			  				console.log(character);
				  			$scope.kandidates.push(
				  				{
				  					name: character.name.first,
				  					id: character.character_id,
				  					br: character.battle_rank.value
				  				});
				  		}
			  			console.log(data.data.returned);//1111111
			  			if (data.data.returned == 0) i=-1;
			  		},
			  		function(){});
 			  };
 		nextPlayer(1); //start
  }]);
