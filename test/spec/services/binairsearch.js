'use strict';

describe('Service: binairSearch', function () {

  // load the service's module
  beforeEach(module('highTechRecruitmentApp'));

  // instantiate service
  var binairSearch;
  beforeEach(inject(function (_binairSearch_) {
    binairSearch = _binairSearch_;
  }));

  it('should do something', function () {
    expect(!!binairSearch).toBe(true);
  });

});
