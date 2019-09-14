const { Parser } = require('json2csv');

module.exports = function geoJsonObjectToCsv(geoJsonObject, withHeaders) {

    const fields = geoJsonObject.fields;

    const values = geoJsonObject.values;
    
    let options = withHeaders ? { fields, quote: '' } : { fields, quote: '', header: false } 

    const json2csvParser = new Parser(options);

    const csv = json2csvParser.parse(values);

    return csv;
}