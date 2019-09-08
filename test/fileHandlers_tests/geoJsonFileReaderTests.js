'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const geoJsonFileReader = require('../../src/fileHandlers/geoJsonFileReader');

describe('fileHandlers tests:', () => {
    it('A geoJson file should be readed into an js object', () => {
        const geoJsonObject = geoJsonFileReader('./test/fileHandlers_tests/geoJsonTestFile.geojson');
        expect(geoJsonObject).to.be.an('Object')
    });

    //to do other file handlers
});