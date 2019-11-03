const jsonReader = require('../../src/fileHandlers/geoJsonFileUtils');

var settings = {};
  
exports.setSettings = function (settings) {
    this.settings = settings;
}

exports.getSettings = function () {
    return this.settings;
}
