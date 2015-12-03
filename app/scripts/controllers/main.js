'use strict';

/**
 * @ngdoc function
 * @name highTechRecruitmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the highTechRecruitmentApp
 */
angular.module('highTechRecruitmentApp')
  .controller('MainCtrl',['$scope', 'daybreakCharacter','$cookies', function ($scope,daybreakCharacter,$cookies) {
  	var startBR =100;
  	var endBR = 56;
  	$scope.progress = 0;
  	$scope.kandidates=[];
    $scope.statusMessage;
  	$scope.getProgress =function(){
  		return Math.round($scope.progress);
  	}

  	var doneBr = function(){
  		var increment = 100 / (startBR-endBR+1)
  		$scope.progress +=increment;
  	}
  	$cookies.put('123','test');


  	var findBattlerank=function(br){
  		//cookie has value
  		//scope = cookievalue
  		//else start algorithm to bake cookie
  		if(!!$cookies.get(br)){
  			$scope.kandidates.push.apply($scope.kandidates,$cookies.getObject(br));
  			doneBr();
  			return;
  		}
  		
  		var kandidates = [];
  		nextPlayer(1,br,kandidates);
  	}
  	
  	// kandidate name, battlerank, online, last played
  	 	var nextPlayer = function(i, battlerank,kandidates){ ///here is an idea to make it more performant, make it go from high to low, then async
 			  	daybreakCharacter.getByBR(battlerank,i).then(
			  		function(data){
			  			if (data.data.returned == 0) { //or i = 10 test
			  				console.log("Done with series, preserving");
                $scope.statusMessage = "Done with series, preserving";
			  				$cookies.putObject(battlerank,kandidates);
			  				$scope.kandidates.push.apply($scope.kandidates,$cookies.getObject(battlerank));
			  				doneBr();
			  			}
			  			if (data.data.returned ==0) return;
			  			//console.log(data);
			  			//console.log(data.data.character_list[0].world_id);
			  			var character=data.data.character_list[0];
			  			console.log("Checking br "+battlerank+"nr"+i+"...");//checking
              $scope.statusMessage = "Checking br "+battlerank+" - "+i+"...";
			  			nextPlayer(i+1,battlerank,kandidates);
			  			if (!!character.outfit) return;
			  			if (character.world_id =="17"){
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
 		findBattlerank(100);

 	$scope.resetCache = function(){
 		$cookies.remove(100);
 		$scope.kandidates = [];
 		//refresh
 	}
 	$scope.scan = function(){
 		for (var i = startBR - 1; i >= endBR; i--) {
 			console.log("starting scan for br "+i)
 			findBattlerank(i);
 			};
 	}
  }]);
