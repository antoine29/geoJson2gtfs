#!/usr/bin/env node

const yargs = require("yargs");
const geojson2gtfs = require('..');

const options = yargs
 .usage("Usage: - <folder input>")
 .option("f", { alias: "folder", describe: "Folder containing geoJson files.", type: "string", demandOption: true })
 .option("s", { alias: "settings", describe: "Aditional settings file to handle the GTFS feed creation.", type: "string", demandOption: true })
 .argv;

 console.log(`Input folder: ${options.folder}`);
 console.log(`Settings file: ${options.settings}`);
