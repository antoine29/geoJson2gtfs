const fs = require('fs');

exports.geoJsonFileReader = function(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    }
    catch (error) {
        throw new Error(`Could not read input file: ${path} \n ${error.message}`);
    }
};

exports.geoJsonFileWriter = function(geoJsonObject, path) {
    try {
        const jsonString = JSON.stringify(geoJsonObject, null, "\t");
        fs.writeFileSync(path, jsonString);
    }
    catch (error) {
        throw new Error(`Could not write in file: ${path} \n ${error.message}`);
    }
};
