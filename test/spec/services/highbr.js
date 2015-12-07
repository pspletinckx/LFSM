'use strict';

describe('Service: highbr', function () {

  // load the service's module
  beforeEach(module('highTechRecruitmentApp'));

  // instantiate service
  var highbr;
  beforeEach(inject(function (_highbr_) {
    highbr = _highbr_;
  }));

  it('should do something', function () {
    expect(!!highbr).toBe(true);
  });

});
