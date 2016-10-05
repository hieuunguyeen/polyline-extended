'use strict';

const expect = require('chai').expect;
const index = require('../index');

function isFloat(number) {
  return Number(number) === number && number % 1 !== 0;
}

describe('Functional test', function () {

  this.timeout(5000);

  describe('Functions', () => {

    describe('[+] encode', () => {

      let result1;
      let result2;

      before(done => {
        const input1 = [[60.19731, 24.92249], [60.19381, 24.92600], [60.19112, 24.91613], [60.19385, 24.90429], [60.20170, 24.89940]];
        const input2 = [[60.22353, 24.78627], [60.22191, 24.78679], [60.21961, 24.78610], [60.21692, 24.78782]];
        result1 = index.encode(input1);
        result2 = index.encode(input2);
        done();
      });

      it('encoded data set no.1 should be returned as expected', () => {
        expect(result1).to.equal('ehlnJqtbwCzT}TxOt|@aP~hAap@p]');
      });

      it('encoded data set no.2 should be returned as expected', () => {
        expect(result2).to.equal('alqnJeahvCbIgBjMhCxOwI');
      });
    });

    describe('[+] decode', () => {

      let result;

      before(done => {
        result = index.decode('asgnJcidwCti@a{@wJimAcQcAkT|Li\\jDaWaNwKa{@}Etu@~FjmA{T~\\cq@qG');
        done();
      });

      it('decoded data should be an array', () => {
        expect(result).to.be.an('array');
      });

      it('decoded data should contains 12 points', () => {
        expect(result).to.have.lengthOf(12);
      });

      it('last decoded point should have correct lat / lon pair', () => {
        expect(result[result.length - 1]).to.deep.equal([60.19675, 24.93759]);
      });
    });

    describe('[+] length', () => {

      let result;
      let result2;

      before(done => {
        result = index.length('asgnJcidwCti@a{@wJimAcQcAkT|Li\\jDaWaNwKa{@}Etu@~FjmA{T~\\cq@qG');
        result2 = index.length('');
        done();
      });

      it('should return a float with input "asgnJcidwCti@a{@wJimAcQcAkT|Li\\jDaWaNwKa{@}Etu@~FjmA{T~\\cq@qG"', () => {
        expect(result).to.be.a('number');
        expect(isFloat(result)).to.be.true;
      });

      it('empty polyline input should return 0 km as length', () => {
        expect(result2).to.be.a('number');
        expect(result2).to.equal(0);
      });

    });

    describe('[-] length', () => {

      const input = [undefined, null, 123, new Date(12312312)];

      input.forEach(item => {
        describe(`calculate length for polyline input '${item}' should throw an error`, () => {

          let result;
          let error;

          before(done => {
            try {
              result = index.length(item);
            } catch (e) {
              error = e;
            }
            done();
          });

          it('should not return any response', () => {
            expect(result).to.be.undefined;
          });

          it('should throw a valid error', () => {
            expect(error).to.not.be.undefined;
            expect(error.message).to.equal(`Input polyline is not a string, got ${item}`);
          });
        });
      });
    });
    //
    // describe('[+] mergeTwoPolylines', () => {
    //   before(done => {
    //
    //   });
    // });
    //
    // describe('[-] mergePolylines', () => {
    //   before(done => {
    //
    //   });
    // });
  });

  describe('Support functions', () => {

    describe('[+] haversine', () => {
      let result;

      before(done => {
        result = index.haversine(12312);
        done();
      });

      it('should return a valid response', () => {
        expect(result).to.not.be.undefined;
        expect(result).to.be.a('number');
      });
    });

    describe('[-] haversine', () => {

      let result;
      let error;

      before(done => {
        try {
          result = index.haversine('asdasd');
        } catch (e) {
          error = e;
        }
        done();
      });

      it('should not return a response', () => {
        expect(result).to.be.undefined;
      });

      it('should return an error', () => {
        expect(error).not.to.be.undefined;
        expect(error.message).to.equal('Input \'asdasd\' is not a number');
      });
    });

    describe('[+] haversineDistance', () => {

      let result;

      before(done => {
        result = index.haversineDistance([60.2204151, 24.7763345], [60.1657541, 24.9417641]);
        done();
      });

      it('should return a valid float number', () => {
        expect(isFloat(result)).to.be.true;
      });
    });

    describe('[-] haversineDistance', () => {

      let result;
      let result2;
      let error;
      let error2;
      const input = ['asdas', [60.1657541, 24.9417641]];
      const input2 = [[60.1657541, 24.9417641]];

      before(done => {
        try {
          result = index.haversineDistance(input[0], input[1]);
        } catch (_error) {
          try {
            result2 = index.haversineDistance(input2[0]);
          } catch (_error2) {
            error2 = _error2;
          }
          error = _error;
        }
        done();
      });

      it('all test input should not return any response', () => {
        expect(result).to.be.undefined;
        expect(result2).to.be.undefined;
      });

      it('should throw an error for all test input', () => {
        expect(error).to.not.be.undefined;
        expect(error2).to.not.be.undefined;
        expect(error.message).to.equal(`Point 1 input is not valid: ${input[0]}`);
        expect(error2.message).to.equal('Cannot read property \'toString\' of undefined');
      });
    });

  });
});
