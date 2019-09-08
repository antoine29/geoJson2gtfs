'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const geoJsonObjectValidator = require('../../src/geoJsonObjectUtils/geoJsonObjectValidator');

describe('geoJsonObjecUtils tests:', () => {
    
    const validGeoJsonObject = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "agency": "A"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -68.14319372177124,
                            -16.529108760139184
                        ],
                        [
                            -68.14467430114746,
                            -16.53016816067664
                        ]
                    ]
                }
            }
        ]
    };

    const invalidGeoJsonObject = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -68.14319372177124,
                            -16.529108760139184
                        ],
                        [
                            -68.14467430114746,
                            -16.53016816067664
                        ]
                    ]
                }
            }
        ]
    };

    it('A valid geoJson object should be correctly validated', () => {
        const validationResult = geoJsonObjectValidator(validGeoJsonObject);
        assert.strictEqual(validationResult, true, 'Valid geoJson object');
    });

    it('A invalid geoJson object should be correctly validated', () => {
        const validationResult = geoJsonObjectValidator(invalidGeoJsonObject);
        assert.strictEqual(validationResult, false, 'inValid geoJson object');
    });
});