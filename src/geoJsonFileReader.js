const fs = require('fs');

module.exports = function geJsonFileReader(name) {
    try {
        return JSON.parse(fs.readFileSync(name));
    }
    catch (error) {
        throw new Error(`Could not read input file: ${error.message}`);
    }

    // fs.readFile(name, (error, data) => {
    //     if(error) throw new Error(`Could not read input file: ${error.message}`);
    //     console.log("readed geoJson");
    //     console.log(JSON.parse(data));
    //     return JSON.parse(data);
    // })
};