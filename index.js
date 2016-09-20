'use strict';

const polyline = require('./src/polyline');
const haversine = require('./src/haversine');

module.exports = {
  decode: polyline.decode,
  encode: polyline.encode,
  length: polyline.length,
  mergeTwoPolylines: polyline.mergeTwoPolylines,
  mergePolylines: polyline.mergePolylines,
  haversine: haversine.haversine,
  haversineDistance: haversine.haversineDistance,
};
