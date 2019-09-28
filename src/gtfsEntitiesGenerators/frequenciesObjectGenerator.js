function gtfsFrequenciesFileFields() {
    return [
        {
            value: 'tripId',
            label: 'trip_id'
        },
        {
            value: 'startTime',
            label: 'start_time'
        },
        {
            value: 'endTime',
            label: 'end_time'
        },
        {
            value: 'exactTimes',
            label: 'exact_times'
        },
        {
            value: 'headwaySecs',
            label: 'headway_secs'
        }
    ];
}

exports.frequenciesObjectGenerator = function(trip, settings) {
    return {
        fields: gtfsFrequenciesFileFields(),
        values: [
            {
                tripId: trip.tripId,
                startTime: settings[0].startTime,
                endTime: settings[0].endTime,
                exactTimes: settings[0].exactTimes,
                headwaySecs: settings[0].headwaySecs
            }
        ]
    };
}

exports.frequenciesObjectFields = function(settings) {
    return {
        fields: gtfsFrequenciesFileFields(),
        values: []
    };
}
