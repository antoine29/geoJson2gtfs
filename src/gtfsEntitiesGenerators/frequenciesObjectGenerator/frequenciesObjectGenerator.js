function gtfsFrequenciesFileFields() {
    return [
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
        },
        {
            value: 'startTime',
            label: 'start_time'
        },
        {
            value: 'tripId',
            label: 'trip_id'
        }
    ];
}

function getFrequenciesEndTime(settings) {
    if (settings.frequenciesSettings.endTime) return settings.frequenciesSettings.endTime;
    throw "The settings file must have a frequenciesSettings.endTime field";
}

function getFrequenciesExactTimes(settings) {
    if (settings.frequenciesSettings.exacTimes) return settings.frequenciesSettings.exacTimes;
    throw "The settings file must have a frequenciesSettings.exacTimes field";
}

function getFrequenciesHeadwaySecs(settings) {
    if (settings.frequenciesSettings.headwaySecs) return settings.frequenciesSettings.headwaySecs;
    throw "The settings file must have a frequenciesSettings.headwaySecs field";
}

function getFrequenciesStartTime(settings) {
    if (settings.frequenciesSettings.startTime) return settings.frequenciesSettings.startTime;
    throw "The settings file must have a frequenciesSettings.startTime field";
}

exports.calendarObjectGenerator = function(settings) {
    return {
        fields: gtfsFrequenciesFileFields(),
        values: [
            {
                serviceId: getFrequenciesEndTime(settings),
                startDate: getFrequenciesExactTimes(settings),
                headwaySecs: getFrequenciesHeadwaySecs(settings),
            }
        ]
    };
}

exports.calendarObjectFieldsGenerator = function() {
    return gtfsFrequenciesFileFields();
}

exports.calendarObjectValuesGenerator = function(settings) {
    return [
        {
            serviceId: getFrequenciesEndTime(settings),
            startDate: getFrequenciesExactTimes(settings),
            headwaySecs: getFrequenciesHeadwaySecs(settings),
        }
    ];
}