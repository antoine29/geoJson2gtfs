const axios = require('axios');

module.exports = async function reverseGeoCodeClient(lat, long) {

    // let long = -68.14408421516418;
    // let lat = -16.53061043296733;   
    
    let response;

    try {
        let url = `http://localhost:3001/MockGeocoder/ReverseGeocode?lat=${lat}&long=${long}`;
        response = await axios.get(url, {timeout: 5000});
    }
    catch (error) {
        console.log(`Error getting direction from coords ${lat} ${long}`);
        response = {
            data: [],
            address: [],
        };
    }
    finally {
        return response.data;
    }
}
