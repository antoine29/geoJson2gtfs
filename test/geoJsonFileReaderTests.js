'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const geoJsonFileReader = require('../src/fileHandlers/geoJsonFileReader');
const geoJsonObjectValidator = require('../src/geoJsonObjectUtils/geoJsonObjectValidator');

describe('geoJson file to jsObject tests:', () => {
    it('A geoJson file should be readed into an js object', () => {
        const geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
        expect(geoJsonObject).to.be.an('Object')
    });

    it('A valid geoJson object should be correctly validated', () => {
        const geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
        const validationResult = geoJsonObjectValidator(geoJsonObject);
        assert.strictEqual(validationResult, true, 'Valid geoJson object');
    });

    it('A invalid geoJson object should be correctly validated', () => {
        const geoJsonObject = geoJsonFileReader('./test/invalidGeoJsonTestFile.geojson');
        const validationResult = geoJsonObjectValidator(geoJsonObject);
        assert.strictEqual(validationResult, false, 'inValid geoJson object');
    });
});