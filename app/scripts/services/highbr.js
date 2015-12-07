'use strict';

/**
 * @ngdoc service
 * @name highTechRecruitmentApp.highbr
 * @description
 * # highbr
 * Factory in the highTechRecruitmentApp.
 */
angular.module('highTechRecruitmentApp')
  .factory('highbr', function ($resource) {
    return $resource("http://localhost:1337/highbr/:id",{},{});
  });
