var NodeGeocoder = require('node-geocoder');
const settingsHandler = require('../../settingsHandler/settingsHandler');
const colorprint = require("colorprint");

// var options = {
//   provider: 'locationiq',
 
//   // Optional depending on the providers
//   httpAdapter: 'https',         // Default
//   apiKey: '5266cc346bf77c',     // for Mapquest, OpenCage, Google Premier
//   timeout: 5000
// };
 
module.exports = async function reverseGeoCode(lati, long) {

    var geocoder;

    try {
        let options = settingsHandler.getSettings().geocoderOptions;
        geocoder = NodeGeocoder(options);
    }
    catch {
        colorprint.error('error trying to initialize the geocoder using the settings passed');
        return 'S/N';
    }

    // let long = -68.14408421516418;
    // let lat = -16.53061043296733;   
    
    let response = [];

    await geocoder.reverse({lat:lati, lon:long}, function(err, res) {
        if (err) {
            colorprint.error(`Error getting direction from coords ${lati} ${long}`);
        }
        else {
            response = res[0];
        }
    });

    return response;
}
