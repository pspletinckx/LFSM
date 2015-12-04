'use strict';

/**
 * @ngdoc function
 * @name highTechRecruitmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the highTechRecruitmentApp
 */
angular.module('highTechRecruitmentApp')
  .controller('MainCtrl',['$scope', 'daybreakCharacter','$cookies','$timeout', function ($scope,daybreakCharacter,$cookies,$timeout) {
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
    var cookieExpire = new Date();
    cookieExpire.setDate(cookieExpire.getDate() + 7);

  	$cookies.put('123','test',{expires:cookieExpire});


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

    var findBulkPerBattlerank = function(br){
      if(!!$cookies.get(br)){
        //$scope.kandidates.push.apply($scope.kandidates,$cookies.getObject(br));
        doneBr();
        return;
      }     
      getAllBattlerank(br);
    }
  	
  	   // kandidate name, battlerank, online, last played
  	 	var nextPlayer = function(i, battlerank,kandidates){ ///here is an idea to make it more performant, make it go from high to low, then async
 			  	daybreakCharacter.getByBR(battlerank,i).then(
			  		function(data){
			  			if (data.data.returned == 0) { //or i = 10 test
			  				console.log("Done with series, preserving");
                $scope.statusMessage = "Done with series, preserving";
			  				$cookies.putObject(battlerank,kandidates,{cookieExpire});
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
			  			if (!!character.outfit) return; //exit if character is already in an outfit
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
 		//findBattlerank(100);
    var numberOfPlayers =function(lowerBound,upperBound,battlerank){
            console.log("Found lowerBound: "+lowerBound+" and upperbound: "+upperBound+" players for BR "+battlerank);
      var i = lowerBound+Math.round((upperBound - lowerBound)/2);
      daybreakCharacter.getByBR(battlerank,i).then(
            function(data){
              if (data.data.returned ==0){
                 if(lowerBound == upperBound-1) {
                  //nextPlayerAsync(lowerBound,battlerank);  
                  return;
                 }
                numberOfPlayers(lowerBound,i,battlerank);
              };
              if (data.data.returned == 1){
                 if(lowerBound == upperBound-1) {
                  //nextPlayerAsync(upperBound,battlerank);
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
                $scope.kandidates.push(
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
    var getAllBattlerank = function(battlerank){
        var kandidatesPerBattlerank=[];
        daybreakCharacter.getAllByBR(battlerank).then(
          function(response){
            doneBr();
            var arrayOfPlayers =response.data.character_list;
            for (var i = arrayOfPlayers.length - 1; i >= 0; i--) {
              var character= arrayOfPlayers[i];
              //console.log(character);
              if (!!character.character_id_join_outfit_member) ; //exit if character is already in an outfit
              else if (character.character_id_join_characters_world.world_id =="17"){ //only if character is on emerald
                console.log("Pushing a BR"+battlerank+" to the view");
                kandidatesPerBattlerank.push(
                  {
                    name: character.name.first,
                    id: character.character_id,
                    br: character.battle_rank.value,
                    online: character.character_id_join_characters_online_status.online_status
                  });
              };
            };
          //$cookies.putObject(battlerank,kandidatesPerBattlerank,{cookieExpire});
          $scope.kandidates.push.apply($scope.kandidates,kandidatesPerBattlerank);
          if(battlerank!=endBR) getAllBattlerank(battlerank-1);
          //Cookie is tooo large
          },function(){});
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
        var howMany = numberOfPlayers(0,9000000,100); 
      };

    $scope.scanInBulk = function(){
       getAllBattlerank(100);
      // getAllBattlerank(99);
    };

  }]);
