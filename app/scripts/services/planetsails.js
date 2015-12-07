'use strict';

/**
 * @ngdoc service
 * @name highTechRecruitmentApp.planetsails
 * @description
 * # planetsails
 * Factory in the highTechRecruitmentApp.
 */
angular.module('highTechRecruitmentApp')
  .factory('planetsails', function ($http) {
      return{//eventualy use resource
        getHighBr :function(){
          return $http({method: "GET", url: 'http://localhost:1337/highbr'});
        },
        postHightBr : function(object){
          console.log(object);
          return $http.post('http://localhost:1337/highbr',
                        object,{headers: {
                          'Content-Type': 'application/json'
                                }});
        }
      };
  });
