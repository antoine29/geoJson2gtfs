const fs = require('fs');

module.exports = function geJsonFileWriterr(geoJsonObject, path) {
    try {
        const jsonString = JSON.stringify(geoJsonObject, null, "\t");
        fs.writeFileSync(path, jsonString);
    }
    catch (error) {
        throw new Error(`Could not write in file: ${error.message}`);
    }
};
