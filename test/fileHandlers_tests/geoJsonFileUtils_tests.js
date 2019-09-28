'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const geoJsonFileUtils = require('../../src/fileHandlers/geoJsonFileUtils');

describe('geoJsonFileUtils tests:', () => {
    it('A geoJson file should be readed into an js object', () => {
        const geoJsonObject = geoJsonFileUtils.geoJsonFileReader('./test/fileHandlers_tests/geoJsonTestFile.geojson');
        expect(geoJsonObject).to.be.an('Object')
    });

    it('A geoJson object should be writed into an file', () => {
        let stubObject = {
            type: "FeatureCollection",
            features: []
        };
        geoJsonFileUtils.geoJsonFileWriter(stubObject, './test/fileHandlers_tests/dummyObject.geojson');
        expect(fs.existsSync('./test/fileHandlers_tests/dummyObject.geojson')).to.be.true;
        fs.unlinkSync('./test/fileHandlers_tests/dummyObject.geojson');
    });
});
