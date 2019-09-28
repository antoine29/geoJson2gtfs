const expect = require('chai').expect;
const filesSearcher = require('../../src/fileHandlers/filesSearcher');

describe('filesSearcher tests:', () => {
    it('Should return an array with names of the all geojson files in folder', () => {
        let geoJsonFiles = filesSearcher('./test/fileHandlers_tests/', 'geojson');
        expect(geoJsonFiles).to.be.instanceof(Array).and.to.have.length(2);
    });

    it('Should return an empty array when pass an extension with no files', () => {
        let geoJsonFiles = filesSearcher('./test/fileHandlers_tests/', 'dummy');
        expect(geoJsonFiles).to.be.instanceof(Array).and.to.be.empty;
    });

    it('Should return an empty array when pass an invalid folder path', () => {
        let geoJsonFiles = filesSearcher('./test/invalid_route/', 'dummy');
        expect(geoJsonFiles).to.be.instanceof(Array).and.to.be.empty;
    });
});