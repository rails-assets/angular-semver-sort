describe('Filter: semverSort', function() {
  var semverSort;

  beforeEach(function() {
    module('semverSort');
    inject(function($filter) {
      semverSort = $filter('semverSort');
    });
  });

  it('should be a function', function() {
    semverSort.should.be.a.Function;
  });

  describe('given an array of semver strings', function() {
    it('should return the array of strings sorted by version number', function() {
      semverSort([
        '12.4.5', '12.10.5', '1.2.5', '0.10.1', '0.2.1', '1.1.1'
      ]).should.be.an.Array.with.lengthOf(6).and.be.eql([
        '0.2.1', '0.10.1', '1.1.1', '1.2.5', '12.4.5', '12.10.5'
      ]);
    });
  });

  describe('given an array of objects with the property being a semver string', function() {
    it('should return the array of the same objects sorted by the version number in the given property', function() {
      semverSort([
        '12.4.5', '12.10.5', '1.2.5', '0.10.1', '0.2.1', '1.1.1'
      ]).should.be.an.Array.with.lengthOf(6).and.be.eql([
        '0.2.1', '0.10.1', '1.1.1', '1.2.5', '12.4.5', '12.10.5'
      ]);
    });
  });

  describe('given an array that contains non-semver strings', function() {
    it('should not throw', function() {
      (function() {
        semverSort([
          '1.0.0', '0.1.1', '0.10.1', 'OH HAI', false
        ]);
      }).should.not.throw();
    });

    it('should return the array of strings sorted alphabetically', function() {
      semverSort([
        '1.2.1', '1.10.1', 'Ć', 'Ą'
      ]).should.be.an.Array.with.lengthOf(4).and.be.eql([
        '1.10.1', '1.2.1', 'Ą', 'Ć'
      ]);
    });
  });

  describe('given an array of objects with the property that contains a non-semver string', function() {
    it('should not throw', function() {
      (function() {
        semverSort([
          { name: 'A', version: '1.0.0' },
          { name: 'B', version: '0.1.1' },
          { name: 'C', version: '0.10.1' },
          { name: 'D', version: 'OH HAI' },
          { name: 'E' }
        ], 'version');
      }).should.not.throw();
    });

    it('should return the array of the same objects sorted alphabetically by the given property', function() {
      semverSort([
        { name: 'A', version: '1.2.1' },
        { name: 'B', version: '1.10.1' },
        { name: 'C', version: 'Ć' },
        { name: 'D', version: 'Ą' }
      ], 'version').should.be.an.Array.with.lengthOf(4).and.be.eql([
        { name: 'B', version: '1.10.1' },
        { name: 'A', version: '1.2.1' },
        { name: 'D', version: 'Ą' },
        { name: 'C', version: 'Ć' }
      ]);
    });
  });
});
