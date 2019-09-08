const { Parser } = require('json2csv');

module.exports = function geoJsonObjectToCsv(geoJsonObject) {

    const fields = geoJsonObject.fields;

    const values = geoJsonObject.values;
    
    const json2csvParser = new Parser({ fields, quote: '' });

    const csv = json2csvParser.parse(values);

    return csv;
}