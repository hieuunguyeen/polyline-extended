# Polyline Extended

Implementation for Google polyline algorithm with **extra** salt and sugar.

![Demo image](/demo.png)

Documentation for polyline algorithm
 > https://developers.google.com/maps/documentation/utilities/polylinealgorithm

## Example

```javascript
const lib = require('polyline-extended');

lib.encode('ecfnJ_cgwCDnG??{BN?Aq@n@??eEhH@?CYEkCA?gNb@u@??K[CcDXFpE');

lib.decode([[60.123, 24.12312], [60.13123, 25.21312], [lat, lon]]);

lib.length('ecfnJ_cgwCDnG??{BN?Aq@n@??eEhH@?CYEkCA?gNb@u@??K[CcDXFpE', { radius: 400, unit: 'meter' });

lib.mergeTwoPolylines('ecfnJ_cgwCDnG??', '{BN?Aq@n@??eEhH@?CYEkCA');

lib.mergePolylines(['ecfnJ_cgwCDnG??', '{BN?Aq@n@??eEhH@?CYEkCA', '?gNb@u@??K[CcDXFpE']);
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
 * @param {String} polyline - polyline String
 * @param {Int} precision - coordinates precision (number of decimal)
 * @return {Array.Array.Number} coordinates
 */
function decode(polyline, precision)
```

##### Length
```javascript
/**
 * Calculate the distance of the polyline. If radius is not provided, distance is flat, else distance is haversine distance
 * NOTE: Support flat surface and sphere
 *
 * @param {String} polyline - The polyline to calculate from
 * @param {Float} radius - The radius of the sphere, if not input, distance is calculated on flat surface
 * @param {Object} options - {String} options.unit. {Float - default km} options.radius
 * @return {Float} length - unit based on options.radius unit
 */
function length(polyline, options)
```

##### Merge two polylines

```javascript
/**
 * Merge two polylines into one single polyline
 * @param poly1 {String} origin polyline
 * @param poly2 {String} connected polyline
 * @return finalPolyline {String} merged polyline
 */
function mergeTwoPolylines(poly1, poly2)
```

##### Merge multiple polylines

```javascript
/**
 * Merge multiple polylines into a connected one
 * @param polylines {Array.String} Array of multi polylines
 * @return {String} one single merged polyline
 */
function mergePolylines(polylines)
```

##### Haversine

```javascript
/**
 * Calculate haversine from 2 points
 * @param number {Float} input number
 * @return haversine {Float}
 */
function haversine(number)
```

##### Haversine Distance

```javascript
/**
 * Calculate the haversine distance between 2 points
 *
 * @param point1 {Array} [lat,lon] - lat, lon are mandatory
 * @param point2 {Array} [lat,lon] - lat, lon are mandatory
 * @optional radius {Float} Sphere's radius. Default: Earth's radius 6371 km
 * @return distance {Float} distance in unit (depends on radius unit)
 */
function haversineDistance(point1, point2, radius)
```
