'use strict';

describe('Service: daybreakCharacter', function () {

  // load the service's module
  beforeEach(module('highTechRecruitmentApp'));

  // instantiate service
  var daybreakCharacter;
  beforeEach(inject(function (_daybreakCharacter_) {
    daybreakCharacter = _daybreakCharacter_;
  }));

  it('should do something', function () {
    expect(!!daybreakCharacter).toBe(true);
  });

});
