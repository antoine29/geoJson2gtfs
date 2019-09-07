'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const geoJsonFileReader = require('../src/fileHandlers/geoJsonFileReader');
const geoJsonToStopsFile = require('../src/geoJsonObjectToCsv/geoJsonToStopsFile');

describe('geoJson file to stopsFile tests:', () => {
    it('A geoJson file should be converted to an accurate js stopFileObject', () => {
        const geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
        const stops = geoJsonToStopsFile(geoJsonObject);
        expect(stops).to.be.an('Object');
        expect(stops.fields).to.be.an('Array');
        expect(stops.stops).to.be.an('Array');
    });

    it('An stopFileObject should have accurate lists fields', () => {
        const geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
        const stops = geoJsonToStopsFile(geoJsonObject);
        assert.isTrue(stops.fields.length > 0);
        assert.isTrue(stops.stops.length > 0);
    });
});