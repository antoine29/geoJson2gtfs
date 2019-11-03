'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const settings = require('../../src/settingsHandler/settingsHandler');

describe('geoJsonObjecUtils tests:', () => {

    it('A settings object should be correctly loaded', () => {
        let stubSettings = {
            'provider': 'google',
            'api': 'adasdasdasd'
        };

        settings.setSettings(stubSettings);

        assert.strictEqual(settings.getSettings().provider, stubSettings.provider, 'settings dont loaded');
    });

});