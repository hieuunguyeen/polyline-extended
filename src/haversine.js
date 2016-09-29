'use strict';

/**
 * Convert Degree to Radian
 * @param {Float} deg - Degree
 * @return {Float} Radian
 */
function _degToRad(deg) {
  return ((deg * Math.PI) / 180);
}

/**
 * Calculate haversine from 2 points
 * @param number {Float} input number
 * @return haversine {Float}
 */
function haversine(number) {
  if (!isNaN(number)) throw Error(`Input '${number}' is not a number`);
  return Math.pow(Math.sin(number / 2), 2);
}

/**
 * Calculate the haversine distance between 2 points
 * NOTE if radius is not given, using Earth's radius - 6371 km
 *
 * @param point1 {Array} [lat,lon] - lat, lon are mandatory
 * @param point2 {Array} [lat,lon] - lat, lon are mandatory
 * @optional radius {Float - km} Sphere's radius in kilometer
 * @return distance {Float - km}
 */
function haversineDistance(_point1, _point2, _radius) {

  if (_radius && !isNaN(_radius)) throw Error(`Input radius ${_radius} is NaN`);
  if (!_point1 || _point1.length !== 2) throw Error(`Point 1 input is not valid: ${_point1.toString()}`);
  if (!_point2 || _point2.length !== 2) throw Error(`Point 1 input is not valid: ${_point2.toString()}`);

  _point1 = _point1.map(item => {
    if (!isNaN(item)) throw Error(`Input '${item}' is not a number`);
    return _degToRad(item);
  });

  _point2 = _point2.map(item => {
    if (!isNaN(item)) throw Error(`Input '${item}' is not a number`);
    return _degToRad(item);
  });

  const radius = _radius || 6371;
  const point1 = { lat: _point1[0], lon: _point1[1] };
  const point2 = { lat: _point2[0], lon: _point2[1] };

  const a = haversine(point2.lat - point1.lat);
  const b = Math.cos(point1.lat) * Math.cos(point2.lat) * haversine(point2.lon - point1.lon);
  const distance = 2 * radius * Math.sqrt(a + b);

  return distance;
}

module.exports = {
  haversine,
  haversineDistance,
};
