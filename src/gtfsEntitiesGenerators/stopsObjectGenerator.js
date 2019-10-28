const agencyObjectGenerator = require('./agencyObjectGenerator');

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

function getStopId(geoJsonObjectIndex, stopIndex){
    return `${geoJsonObjectIndex}_${stopIndex}`;
}

function getStopLat(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[1];
}

function getStopLong(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[0];
}

exports.stopsObjectGenerator = function(geoJsonObject, geoJsonObjectIndex) {
    let stops = [];
    let lat, long;
    for (let i=0; i<geoJsonObject.features[0].geometry.coordinates.length; i++) {
        lat = getStopLat(geoJsonObject, i);
        long = getStopLong(geoJsonObject, i);
        stops.push({
            stopId: getStopId(geoJsonObjectIndex, i),
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
