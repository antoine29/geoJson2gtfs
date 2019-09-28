// 'use strict';

// const expect = require('chai').expect;
// const assert = require('chai').assert;
// const geoJsonToStopsFile = require('../src/geoJsonObjectToCsv/geoJsonToStopsFile');
// const geoJsonToStopsFile = require('../src/geoJsonObjectToCsv/geoJsonObjectToCsv');

// describe('geoJsonToStopsFile tests:', () => {
//     it('A geoJson file should be converted to an accurate js stopFileObject', () => {
//         const geoJsonObject = {
//             "type": "FeatureCollection",
//             "features": [
//                 {
//                     "type": "Feature",
//                     "properties": {},
//                     "geometry": {
//                         "type": "LineString",
//                         "coordinates": [
//                             [
//                                 -68.14319372177124,
//                                 -16.529108760139184
//                             ],
//                             [
//                                 -68.14467430114746,
//                                 -16.53016816067664
//                             ]
//                         ]
//                     }
//                 }
//             ]
//         };
//         const stops = geoJsonToStopsFile(geoJsonObject);
//         expect(stops).to.be.an('Object');
//         expect(stops.fields).to.be.an('Array');
//         expect(stops.stops).to.be.an('Array');
//     });
    
//     it('An stopFileObject should have accurate lists fields', () => {
//         const geoJsonObject = {
//             "type": "FeatureCollection",
//             "features": [
//                 {
//                     "type": "Feature",
//                     "properties": {},
//                     "geometry": {
//                         "type": "LineString",
//                         "coordinates": [
//                             [
//                                 -68.14319372177124,
//                                 -16.529108760139184
//                             ],
//                             [
//                                 -68.14467430114746,
//                                 -16.53016816067664
//                             ]
//                         ]
//                     }
//                 }
//             ]
//         };
//         const stops = geoJsonToStopsFile(geoJsonObject);
//         assert.isTrue(stops.fields.length > 0);
//         assert.isTrue(stops.stops.length > 0);
//     });
// });