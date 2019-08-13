'use strict';

const expect = require('chai').expect;
const geoJsonFileReader = require('../src/geoJsonFileReader') ;

describe('geoJsonFileReader tests:', () => {
    it('A geoJson file should be readed into an object', () => {
        const geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
        expect(typeof geoJsonObject === 'object')
    });

    it('A geoJson object should have a accurate \'type\' field', () => {
        const geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
        console.log(geoJsonObject);
        // expect(geoJsonObject.type && typeof geoJsonObject.type === 'string' && geoJsonObject.type === 'FeatureCollection');
        expect(geoJsonObject.to.have.property('type'));
    });

    // it('A geoJson object should have a accurate \'features\' field', () => {
    //     let geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
    //     console.log(geoJsonObject);
    //     expect(geoJsonObject.features && typeof geoJsonObject.features === 'object' && geoJsonObject.features.length > 0);
    // });

    // it('A geoJson object should have a accurate \'random\' field', () => {
    //     let geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
    //     console.log(geoJsonObject);
    //     expect(geoJsonObject.random !== undefined && typeof geoJsonObject.random === 'object' && geoJsonObject.random.length > 0);
    // });

    // it('A geoJson object should have a geometry field with LineString field equals to LineString', () => {
    //     let geoJsonObject = geoJsonFileReader('./test/geoJsonTestFile.geojson');
    //     expect(typeof geoJsonObject.features[0]. === 'object')
    // });
});