function gtfsTripsFileFields() {
    return [
        {
            value: 'tripId',
            label: 'trip_id'
        },
        {
            value: 'routeId',
            label: 'route_id'
        },
        {
            value: 'serviceId',
            label: 'service_id'
        },
        {
            value: 'tripHeadSign',
            label: 'trip_headsign'
        }
    ];
}

function getTripId(geoJsonFileIndex) {
    return `T${geoJsonFileIndex + 1}`;
}

// function getRouteID(geoJsonFileIndex) {
function getRouteID(route) {
    return route.values[0].routeId;
}

function getServiceId(settings, serviceIndex) {
    if (settings.calendarSettings[serviceIndex].serviceId) return settings.calendarSettings[serviceIndex].serviceId;
    throw "The settings file must have a valid serviceId field";
}

function getTripHeadSign(geoJsonObject) {
    if (geoJsonObject.features[0].properties.agency) return `${geoJsonObject.features[0].properties.agency}`;
    if (geoJsonObject.features[0].properties.agencia) return `${geoJsonObject.features[0].properties.agencia}`;
    throw "The geoJson file must have an agency field";
}

exports.tripsObjectGenerator = function(geoJsonObject, settings, geoJsonFileIndex, route) {
    return {
        fields: gtfsTripsFileFields(),
        values: [
            {
                tripId: getTripId(geoJsonFileIndex),
                routeId: getRouteID(route),
                serviceId: getServiceId(settings, 0),
                tripHeadSign: getTripHeadSign(geoJsonObject)
            }
        ]
    };
}

exports.tripsObjectFields = function() {
    return {
        fields: gtfsTripsFileFields(),
        values: []
    };
}
