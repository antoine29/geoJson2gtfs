var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'locationiq',
 
  // Optional depending on the providers
  httpAdapter: 'https',         // Default
  apiKey: '5266cc346bf77c',     // for Mapquest, OpenCage, Google Premier
  timeout: 5000
};
 
var geocoder = NodeGeocoder(options);
 
module.exports = async function reverseGeoCode(lati, long) {

    // let long = -68.14408421516418;
    // let lat = -16.53061043296733;   
    
    let response;

    await geocoder.reverse({lat:lati, lon:long}, function(err, res) {
        if (err) {
            console.log(`Error getting direction from coords ${lati} ${long}`)
            console.log(err)
            response = {
                address: [],
            };
        }
        else {
            response = res[0];
        }
    });

    return response;
}
