const agencyObjectGenerator = require('../agencyGenerator/agencyObjectGenerator');

function gtfsStopsFileFields() {
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

function getDirectionFromCoords(geoJsonObject, index){
    return geoJsonObject.gtfs.addressNames[index];
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

exports.stopsObjectGenerator = function(geoJsonObject) {
    let stops = [];
    let lat, long;
    for (let i=0; i<geoJsonObject.features[0].geometry.coordinates.length; i++) {
        lat = getStopLat(geoJsonObject, i);
        long = getStopLong(geoJsonObject, i);
        stops.push({
            stopId: getStopId(geoJsonObject, i),
            lat: lat,
            long: long,
            streetName: getDirectionFromCoords(geoJsonObject, i)
        });
    }
    
    return {
        fields: gtfsStopsFileFields(),
        values: stops
    };
};

exports.stopsObjectFields = function() {
    return {
        fields: gtfsStopsFileFields(),
        values: []
    };
};

exports.stopsObjectValues = function(geoJsonObject) {
    let stops = [];
    let lat, long;
    for (let i=0; i<geoJsonObject.features[0].geometry.coordinates.length; i++) {
        lat = getStopLat(geoJsonObject, i);
        long = getStopLong(geoJsonObject, i);
        stops.push({
            stopId: getStopId(geoJsonObject, i),
            lat: lat,
            long: long,
            streetName: getDirectionFromCoords(geoJsonObject, i)
        });
    }
    
    return {
        fields: [],
        values: stops
    };
};