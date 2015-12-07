'use strict';

describe('Service: bulk', function () {

  // load the service's module
  beforeEach(module('highTechRecruitmentApp'));

  // instantiate service
  var bulk;
  beforeEach(inject(function (_bulk_) {
    bulk = _bulk_;
  }));

  it('should do something', function () {
    expect(!!bulk).toBe(true);
  });

});
