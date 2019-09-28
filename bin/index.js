#!/usr/bin/env node

const yargs = require("yargs");
const geojson2gtfs = require('..');
const jsonReader = require('../src/fileHandlers/geoJsonFileUtils');

const options = yargs
 .usage("Usage: - <input>")
 .option("i", { alias: "input", describe: "Input path to folder containing geoJson files.", type: "string", demandOption: true })
 .option("s", { alias: "settings", describe: "Aditional settings file to handle the GTFS feed creation.", type: "string", demandOption: true })
 .argv;

 console.log(`Input folder: ${options.input}`);
 console.log(`Settings file: ${options.settings}`);
 
 let settings = jsonReader.geoJsonFileReader(options.settings);
