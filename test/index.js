'use strict';

const expect = require('chai').expect;
const index = require('../index');

describe('Dependency test', function () {

  this.timeout(5000);

  describe('Functions', () => {

    describe('encode', () => {

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

    describe('decode', () => {

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

    describe('length', () => {
      before(done => {

      });
    });

    describe('mergeTwoPolylines', () => {
      before(done => {

      });
    });

    describe('mergePolylines', () => {
      before(done => {

      });
    });
  });

  describe('Support functions', () => {

    describe('haversine', () => {
      before(done => {

      });
    });

    describe('haversineDistance', () => {
      before(done => {

      });
    });

  });
});
