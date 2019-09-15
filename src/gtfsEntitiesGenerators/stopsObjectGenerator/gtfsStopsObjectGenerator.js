const agencyObjectGenerator = require('../agencyGenerator/agencyObjectGenerator');

function getStopsFileFields() {
    return [
        {
            value: 'stopId',
            label: 'stop_id'
        },
        {
            value: 'lat',
            label: 'stop_lat'
        },
        {
            value: 'long',
            label: 'stop_lon'
        },
        {
            value: 'streetName',
            label: 'stop_name'
        }
    ];
}

function getDirectionFromCoords(lat, long){
    return "thisIsAnDirection";
}

function getStopId(geoJsonObject, i){
    return ""+agencyObjectGenerator.exportGetAgencyId(geoJsonObject)+i;
}

function getStopLat(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[0];
}

function getStopLong(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[1];
}

module.exports = function gtfsStopsObjectGenerator(geoJsonObject) {
    let stops = [];
    let lat, long;
    for (let i=0; i<geoJsonObject.features[0].geometry.coordinates.length; i++) {
        lat = getStopLat(geoJsonObject, i);
        long = getStopLong(geoJsonObject, i);
        stops.push({
            stopId: getStopId(geoJsonObject, i),
            lat: lat,
            long: long,
            streetName: getDirectionFromCoords(lat, long)
        });
    }
    
    return {
        fields: getStopsFileFields(),
        values: stops
    };
};