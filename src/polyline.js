'use strict';

const _haversineDistance = require('./haversine').haversineDistance;

/**
 * Decode a polyline string into an array of coordinates.
 * @see This is adapted from the implementation in Project-OSRM
 * https://github.com/DennisOSRM/Project-OSRM-Web/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
 *
 * @param {string} polyline - polyline string
 * @param {integer} precision - coordinates precision (number of decimal)
 *
 * @return {Array[Array[Number]]} coordinates
 */
function decode(polyline, precision) {
  if (typeof polyline !== 'string') throw new Error(`Input polyline is not a string, got ${polyline}`);
  if (Number(precision) === precision && precision % 1 === 0) throw new Error(`Precision is not an Integer, got ${precision}`);

  let index = 0;
  let lat = 0;
  let lon = 0;
  const coordinates = [];
  let shift = 0;
  let result = 0;
  let byte = null;
  let latitude_change;
  let longitude_change;
  const factor = Math.pow(10, precision || 5);

  while (index < polyline.length) {
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    shift = result = 0;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitude_change;
    lon += longitude_change;

    coordinates.push([lat / factor, lon / factor]);
  }

  return coordinates;
}

function _encodeNumber(num) {
  let encodeString = '';
  while (num >= 0x20) {
    encodeString += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
    num >>= 5;
  }

  encodeString += String.fromCharCode(num + 63);

  return encodeString;
}

function _encodeSignedValue(num) {
  let sgn_num = num << 1;
  if (num < 0) {
    sgn_num = ~sgn_num;
  }

  return _encodeNumber(sgn_num);
}

function _encodePoint(plat, plon, lat, lon) {
  const platE5 = Math.round(plat * 1e5);
  const plonE5 = Math.round(plon * 1e5);
  const latE5 = Math.round(lat * 1e5);
  const lonE5 = Math.round(lon * 1e5);

  const dLon = lonE5 - plonE5;
  const dLat = latE5 - platE5;

  return _encodeSignedValue(dLat) + _encodeSignedValue(dLon);
}

/**
 * Encode pairs of lat and lon into a polyline encoded string
 *
 * @param {Array[Array[lat, lon]]} points
 *
 * @return {string} polyline - encoded polyline
 */
function encode(points) {
  let plat = 0;
  let plon = 0;

  let encoded_point = '';

  points.forEach((val, key) => {
    const lat = val[0];
    const lon = val[1];

    encoded_point += _encodePoint(plat, plon, lat, lon);

    plat = lat;
    plon = lon;
  });

  return encoded_point;
}

/**
 * Calculate the distance of the polyline. If radius is not provided, distance is flat, else distance is haversine distance
 * NOTE: Support flat surface and sphere
 *
 * @param {string} polyline - The polyline to calculate from
 * @param {enum={meter, kilometer}]} [unit=kilometer] - The unit of the response.
 *
 * @return {Float} length - unit based on options.radius unit
 */
function length(polyline, unit) {
  if (typeof polyline !== 'string') throw new Error(`Input polyline is not a string, got ${polyline}`);

  const decodedPolyline = decode(polyline);
  let distance = 0;
  for (let i = 0; i < decodedPolyline.length - 1; i++) {
    const lat = [decodedPolyline[i][0], decodedPolyline[i][1]];
    const lon = [decodedPolyline[i + 1][0], decodedPolyline[i + 1][1]];

    distance += _haversineDistance(lat, lon);
  }
  if (unit) {
    switch (unit) {
      case 'meter':
        return distance * 1000;
      case 'kilometer':
      default:
        return distance;
    }
  }

  return distance;
}

/**
 * Merge two polylines into one single polyline
 * @param {string} poly1 - origin polyline
 * @param {string} poly2 - connected polyline
 *
 * @return {string} finalPolyline - merged polyline
 */
function mergeTwoPolylines(poly1, poly2) {
  const decodedPoly1 = decode(poly1);
  const decodedPoly2 = decode(poly2);

  // Get the last coord from the existing polyline
  const lastPoly1Coord = decodedPoly1[decodedPoly1.length - 1];

  const lastPoly1CoordArray = [lastPoly1Coord];

  // Encode all new coords with coord from exising polyline at the beginning of this new encoding
  decodedPoly2.unshift(lastPoly1Coord);
  const encodedPoly2 = encode(decodedPoly2);

  // Encode the lastPoly1Coord inside an Array
  const encodedLastPoly1CoordArray = encode(lastPoly1CoordArray);

  // Find the string of the last coordinate pair, and remove it from the new encoded polyline
  const newPointsWithoutLastCoord = encodedPoly2.replace(encodedLastPoly1CoordArray, '');

  // And stick the new encoded polyline onto the back of the existing polyline
  const finalPolyline = poly1 + newPointsWithoutLastCoord;

  return finalPolyline;
}

/**
 * Merge multiple polylines into a connected one
 * @param  {Array[string]} polylines - Array of multi polylines
 *
 * @return {string} one single merged polyline
 */
function mergePolylines(polylines) {
  let cachedPolyline = polylines[0];
  for (let i = 1; i < polylines.length; i++) {
    cachedPolyline = mergeTwoPolylines(cachedPolyline, polylines[i]);
  }

  return cachedPolyline;
}

module.exports = {
  decode,
  encode,
  length,
  mergePolylines,
  mergeTwoPolylines,
};
