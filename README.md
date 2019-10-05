# Polyline Extended

Implementation for Google polyline algorithm with **extra** salt and sugar.

![Demo image](/demo.png)

Documentation for polyline algorithm

> https://developers.google.com/maps/documentation/utilities/polylinealgorithm

## Example

```javascript
const lib = require("polyline-extended");

lib.decode("ecfnJ_cgwCDnG??{BN?Aq@n@??eEhH@?CYEkCA?gNb@u@??K[CcDXFpE");
lib.encode([[60.123, 24.12312], [60.13123, 25.21312], ...[lat, lon]]);

lib.length("ecfnJ_cgwCDnG??{BN?Aq@n@??eEhH@?CYEkCA?gNb@u@??K[CcDXFpE", "meter");

lib.mergeTwoPolylines("ecfnJ_cgwCDnG??", "{BN?Aq@n@??eEhH@?CYEkCA");

lib.mergePolylines([
  "ecfnJ_cgwCDnG??",
  "{BN?Aq@n@??eEhH@?CYEkCA",
  "?gNb@u@??K[CcDXFpE"
]);
```

## API

### Core

```
✓ Encoding
✓ Decoding
✓ Length
✓ Merging
  ✓ Merge two polylines
  ✓ Merge multiple polylines
```

### Supporting functions

```
✓ Haversine
✓ Haversine distance
```

### Documentation

##### Encoding

```javascript
/**
 * Encode pairs of lat and lon into a polyline encoded string
 * @param points {Array.Array[lat, lon]}
 * @return encoded polyline {String}
 */
function encode(points)
```

##### Decoding

```javascript
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
function decode(polyline, precision)
```

##### Length

```javascript
/**
 * Calculate the distance of the polyline. If radius is not provided, distance is flat, else distance is haversine distance
 * NOTE: Support flat surface and sphere
 *
 * @param {string} polyline - The polyline to calculate from
 * @param {enum={meter, kilometer}]} [unit=kilometer] - The unit of the response.
 *
 * @return {Float} length - unit based on options.radius unit
 */
function length(polyline, unit)
```

##### Merge two polylines

```javascript
/**
 * Merge two polylines into one single polyline
 * @param {string} poly1 - origin polyline
 * @param {string} poly2 - connected polyline
 *
 * @return {string} finalPolyline - merged polyline
 */
function mergeTwoPolylines(poly1, poly2)
```

##### Merge multiple polylines

```javascript
/**
 * Merge multiple polylines into a connected one
 * @param  {Array[string]} polylines - Array of multi polylines
 *
 * @return {string} one single merged polyline
 */
function mergePolylines(polylines)
```

##### Haversine

```javascript
/**
 * Calculate haversine of a number
 *
 * @param {float} number - input number
 * @return {float} haversine
 */
function haversine(number)
```

##### Haversine Distance

```javascript
/**
 * Calculate the haversine distance between 2 points
 * on the Earth, using radius of 6371 km
 *
 * @param {Array[{ lat,lon }]} point1 - lat, lon are mandatory
 * @param {Array[{ lat,lon }]} point2 - lat, lon are mandatory
 * @return {float} distance
 */
function haversineDistance(_point1, _point2)
```
