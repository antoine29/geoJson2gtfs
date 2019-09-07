'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const objectFieldsFilter = require('../src/geoJsonObjectUtils/objectFieldsFilter');

let obj = {
    statename: {},
    distance: '0.000',
    elevation: '3698',
    osmtags:
     { wikidata: 'Q955745',
       population: '405492',
       'is-in-state': 'La Paz',
       name: 'Municipio El Alto',
       'admin-level': '8',
       'is-in-province': 'Murillo',
       boundary: 'administrative',
       'is-in-country': 'Bolivia',
       type: 'boundary' },
    state: 'BO',
    latt: '-16.53383',
    city: 'La Paz',
    prov: 'BO',
    geocode: 'PAZ-PHXYH',
    geonumber: '3730723413723',
    country: 'Bolivia',
    stnumber: {},
    staddress: 'Avenida Mario Mercado',
    inlatt: '-16.53383',
    alt: {},
    timezone: 'America/La_Paz',
    region: 'La Paz',
    postal: {},
    poi: { 
        source: 'Reconocimiento cartográfico de campo 2016 por KG.',
        poilat: '-16.5323',
        name: 'Ferretería Calle\'s',
        'addr-street': 'Avenida Mario Mercado',
        shop: 'hardware',
        poilon: '-68.13898',
        id: '4381381318',
        poidist: '0.194' },
    longt: '-68.13811',
    remaining_credits: '-21',
    confidence: '1',
    inlongt: '-68.13811',
    class: 'secondary',
    altgeocode: 'LLOJETABO-PHXYH'
};

describe('objectFieldsFilter tests:', () => {
    it('An object should be filtered by values passed in an array', () => {
        let foundValues = objectFieldsFilter(obj, ['addr-street', 'staddress']);
        assert.isTrue(foundValues.length > 0);
    });
});
