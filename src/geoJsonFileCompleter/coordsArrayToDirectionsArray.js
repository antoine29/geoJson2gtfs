const nodeGeocoderClient = require('./reverseGeoCodeClient/node-geocoder-client');
const geoCodeXyzClient = require('./reverseGeoCodeClient/geocodexyz-client');
const objectFieldsFilter = require('../geoJsonObjectUtils/objectFieldsFilter');
// const objectFieldsFilter = require('../../../json2csvPoC/objectFieldsFilter');

let lastValidDirection = "";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getAddressFromResponse(obj, fields) {
    let receivedAddresses = objectFieldsFilter(obj, fields);
    if (receivedAddresses.length === 0 ) return lastValidDirection+"*";
    if (receivedAddresses[0] === undefined) return lastValidDirection+"*";
    lastValidDirection = receivedAddresses[0];
    return receivedAddresses[0];
}

module.exports = async function coordsArrayToDirectionsArray(coords) {
    
    let totalSize = coords.length;
    let direction;
    let directions = [];
    let coord, lati, long;
    let response;

    for (let index=0; index<coords.length; index++) {

        coord = coords[index];
        long = coord[0];
        lati = coord[1];

        response = await geoCodeXyzClient(lati, long);
        // response = await nodeGeocoderClient(lati, long);
        direction = getAddressFromResponse(
            response, 
            [
                'addr-street', 'staddress', // geocode.xyz endpoint fields
                'streetName',               // geocoder npm fields
                'neighbourhood', 'road'     // locationIQ endpoint fields
            ]
        );
        directions.push(direction);
        console.log(`${index+1}/${totalSize} coords processed`);
        await timeout(700); // we have to wait at least one second to make the next req
    }

    return directions;
}
