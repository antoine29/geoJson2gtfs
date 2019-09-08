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

function getAgencyId(geoJsonObject) {
    if (geoJsonObject.features[0].properties.agency) return geoJsonObject.features[0].properties.agency;
    if (geoJsonObject.features[0].properties.agencia) return geoJsonObject.features[0].properties.agencia;
    return '';
}

function getAgencyTimeZone(settings) {
    if (settings.agencySettings.agencyTimeZone) return settings.agencySettings.agencyTimeZone;
    return 'undefined';
}

function getAgencyUrl(settings) {
    if (settings.agencySettings.agencyUrl) return settings.agencySettings.agencyUrl;
    return 'undefined';
}

module.exports = function gtfsAgencyGenerator(geoJsonObject, settings) {
    return {
        fields: gtfsAgencyFileFields(),
        values: [
            {
                agencyId: getAgencyId(geoJsonObject),
                agencyName: getAgencyId(geoJsonObject),
                agencyTimeZone: getAgencyTimeZone(settings),
                agencyUrl: getAgencyUrl(settings)
            }
        ]
    };
}