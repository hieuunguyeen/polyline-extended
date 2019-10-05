'use strict';

/**
 * Convert Degree to Radian
 * @param {float} deg - Degree
 * @return {float} Radian
 */
function _degToRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Calculate haversine of a number
 *
 * @param {float} number - input number
 * @return {float} haversine
 */
function haversine(number) {
  if (isNaN(number)) throw Error(`Input '${number}' is not a number`);
  return Math.pow(Math.sin(number / 2), 2);
}

/**
 * Calculate the haversine distance between 2 points
 * on the Earth, using radius of 6371 km
 *
 * @param {Array[{ lat,lon }]} point1 - lat, lon are mandatory
 * @param {Array[{ lat,lon }]} point2 - lat, lon are mandatory
 * @return {float} distance
 */
function haversineDistance(_point1, _point2) {
  if (!_point1 || _point1.length !== 2) throw Error(`Point 1 input is not valid: ${_point1.toString()}`);
  if (!_point2 || _point2.length !== 2) throw Error(`Point 2 input is not valid: ${_point2.toString()}`);

  _point1 = _point1.map(item => {
    if (isNaN(item)) throw Error(`Point 1 input '${item}' is not a number`);
    return _degToRad(item);
  });

  _point2 = _point2.map(item => {
    if (isNaN(item)) throw Error(`Point 2 input '${item}' is not a number`);
    return _degToRad(item);
  });

  const radius = 6371;
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
