'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const geoJsonFileReader = require('../src/geoJsonFileReader');
const geoJsonToStopsFile = require('../src/geoJsonToStopsFile');

describe('geoJson file to stopsFile tests:', () => {
    it('A geoJson file should be converted to an accurate js object list', () => {
        const geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
        const stops = geoJsonToStopsFile(geoJsonObject);
        expect(stops).to.be.an('Array');
        assert.isTrue(stops.length > 0);
    });
});