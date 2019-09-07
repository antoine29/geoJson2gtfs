const nodeGeocoderClient = require('./reverseGeoCodeClient/node-geocoder-client');
const geoCodeXyzClient = require('./reverseGeoCodeClient/geocodexyz-client');
const objectFieldsFilter = require('../geoJsonObjectUtils/objectFieldsFilter');
// const objectFieldsFilter = require('../../../json2csvPoC/objectFieldsFilter');

let lastValidDirection = "";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDirection(obj, fields) {
    let receivedDirections = objectFieldsFilter(obj, fields);
    if (receivedDirections.length === 0 ) return lastValidDirection+"*";
    if (receivedDirections[0] === undefined) return lastValidDirection+"*";
    lastValidDirection = receivedDirections[0];
    return receivedDirections[0];
}

module.exports = async function coordsArrayToDirectionsArray(coords) {
    
    let totalSize = coords.length;
    let direction;
    let directions = [];
    let coord, lati, long;
    let response;

    console.log(`starting to process ${coords.length} coords`);

    for (let index=0; index<5; index++) {

        coord = coords[index];
        long = coord[0];
        lati = coord[1];

        response = await geoCodeXyzClient(lati, long);
        // response = await nodeGeocoderClient(lati, long);
        direction = getDirection(
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
