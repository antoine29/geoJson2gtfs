'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const settings = require('../../src/settingsHandler/settingsHandler');
const coordsArrayToDirectionsArray = require('../../src/geoJsonFileCompleter/coordsArrayToDirectionsArray');

describe('coordsArrayToDirections.js tests:', () => {

    it('If we dont have geocoder options an empty array should be returned', async () => {

        let stubSettings = {
            geocoderOptions: {
                provider: "locationiq",
                httpAdapter: "https",
                apiKey: "5266cc346bf77c",
                timeout: "5000"
            }
        }
        
        settings.setSettings(stubSettings);

        let directions = await coordsArrayToDirectionsArray([]);

        expect(directions).to.be.empty
    });

});