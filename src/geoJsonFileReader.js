const fs = require('fs');

module.exports = function geJsonFileReader(name) {
    try {
        return JSON.parse(fs.readFileSync(name));
    }
    catch (error) {
        throw new Error(`Could not read input file: ${error.message}`);
    }
};
