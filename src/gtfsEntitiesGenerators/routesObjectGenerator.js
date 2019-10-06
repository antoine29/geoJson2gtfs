function gtfsRoutesFileFields() {
    return [
        {
            value: 'agencyId',
            label: 'agency_id'
        },
        {
            value: 'routeId',
            label: 'route_id'
        },
        {
            value: 'routeLongName',
            label: 'route_long_name'
        },
        {
            value: 'routeShortName',
            label: 'route_short_name'
        },
        {
            value: 'routeType',
            label: 'route_type'
        }
    ];
}

function getAgencyId(geoJsonFileIndex) {
    return `A_${geoJsonFileIndex + 1}`;
}

function getRouteID(geoJsonFileIndex) {
    return `R_${geoJsonFileIndex}`;
}

function getRouteLongName(geoJsonObject) {
    if (geoJsonObject.features[0].properties.agency) return `Route:${geoJsonObject.features[0].properties.agency}`;
    if (geoJsonObject.features[0].properties.agencia) return `Ruta:${geoJsonObject.features[0].properties.agencia}`;
    throw "The geoJson file must have an agency field";
}

function getRouteShortName(geoJsonObject) {
    if (geoJsonObject.features[0].properties.agency) return `${geoJsonObject.features[0].properties.agency}`;
    if (geoJsonObject.features[0].properties.agencia) return `${geoJsonObject.features[0].properties.agencia}`;
    throw "The geoJson file must have an agency field";
}

function getRouteType() {
    // 3 is the magic number to identify a bus type route
    return 3;
}

exports.routesObjectGenerator = function(geoJsonObject, geoJsonFileIndex) {
    return {
        fields: gtfsRoutesFileFields(),
        values: [
            {
                agencyId: getAgencyId(geoJsonFileIndex),
                routeId: getRouteID(geoJsonFileIndex),
                routeLongName: getRouteLongName(geoJsonObject),
                routeShortName: getRouteShortName(geoJsonObject),
                routeType: getRouteType()
            }
        ]
    };
}

exports.routesObjectFields = function() {
    return {
        fields: gtfsRoutesFileFields(),
        values: []
    };
}
