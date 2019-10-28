function gtfsAgencyFileFields() {
    return [
        {
            value: 'agencyId',
            label: 'agency_id'
        },
        {
            value: 'agencyName',
            label: 'agency_name'
        },
        {
            value: 'agencyTimeZone',
            label: 'agency_timezone'
        },
        {
            value: 'agencyUrl',
            label: 'agency_url'
        }
    ];
}

function getAgencyId(geoJsonFileIndex) {
    return `A${geoJsonFileIndex + 1}`;
}

function getAgencyName(geoJsonObject) {
    if (geoJsonObject.features[0].properties.agency) return `Agency: ${geoJsonObject.features[0].properties.agency}`;
    if (geoJsonObject.features[0].properties.agencia) return `Agencia: ${geoJsonObject.features[0].properties.agencia}`;
    throw "The geoJson file must have an agency field";
}

function getAgencyTimeZone(settings) {
    if (settings.agencySettings.agencyTimeZone) return settings.agencySettings.agencyTimeZone;
    throw "The settings file must have a agencySettings.agencyTimeZone field";
}

function getAgencyUrl(settings) {
    if (settings.agencySettings.agencyUrl) return settings.agencySettings.agencyUrl;
    throw "The settings file must have a agencySettings.agencyUrl field";
}

exports.exportGetAgencyId = function(geoJsonFileIndex) {
    return getAgencyId(geoJsonFileIndex);
}

exports.agencyObjectGenerator = function(geoJsonObject, settings, geoJsonFileIndex) {
    return {
        fields: gtfsAgencyFileFields(),
        values: [
            {
                agencyId: getAgencyId(geoJsonFileIndex),
                agencyName: getAgencyName(geoJsonObject),
                agencyTimeZone: getAgencyTimeZone(settings),
                agencyUrl: getAgencyUrl(settings)
            }
        ]
    };
}

exports.agencyObjectFields = function() {
    return {
        fields: gtfsAgencyFileFields(),
        values: []
    };
}
