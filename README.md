# geojson2gtfs 

Geojson2gtfs is a tiny shell application (written in javascript and distributed as a npm package) to transform [geoJson](https://geojson.org/) files (describing [Hail and Ride](https://en.wikipedia.org/wiki/Hail_and_ride) transport routes) to a [GTFS](https://gtfs.org/) data set.

## How It Works
1. Each geoJson file should have an **'Agency'** or **'Agencia'** field, this field is
    used to generate a GTFS agency and route. Else the application will ignore that file.
2. Each geoJson file should have only one geoJson line. Else the application will ignore
    that file.
3. You could use the awesome **geojson.io** tool to draw your routes and
    generate the corresponding geojson files.
4. Since an on demand transport route have not a defined number of stops, we recommend
    draw a point for each block/corner of the route.
5. The application will set one GTFS stop for each point of the geojson line and one
    route for each geojson file.
6. Additionally you must provide a `*.json` file with some extra settings for the GTFS generation. The settings file must follow the next format: 

  ```sh
      {
  	    "agencySettings": {
  	    	"agencyTimeZone": "America/Caracas",
  	    	"agencyUrl": "https://github.com/antoine29"
  	    },
  	    "calendarSettings": [{
  	    	"serviceId": "mon-sun",
  	    	"startDate": "20120101",
  	    	"endDate": "20301212",
  	    	"serviceDays": [1, 1, 1, 1, 1, 1, 1]
  	    }, {
  	    	"serviceId": "mon-fri",
  	    	"startDate": "20120101",
  	    	"endDate": "20301212",
  	    	"serviceDays": [1, 1, 1, 1, 1, 0, 0]
  	    }],
  	    "frequencies": [{
  	    	"startTime": "00:00:00",
  	    	"endTime": "24:00:00",
  	    	"exactTimes": 0,
  	    	"headwaySecs": 600
  	    }]
      }
  ```
## Usage

#### * You'll need a **nodeJs v10** and **npm** working installation.
#### * The application was developed/tested in a Debian/Linux enviroment. The functionally was not tested in a Windows enviroment.

1. Install the application (npm package) globally:

    ```sh
    $ npm install geojson2gtfs -g
    ```

2. If the installation went well, you should be able to see the geojson2gtfs version

    ```sh
    $ geojson2gtfs --version
    1.0.1
    ```

3. You can see the available options using the `geojson2gtfs -h` command.
    ```sh
    $ geojson2gtfs -h

      Usage: geojson2gtfs -i [folder] -s [jsonFile]
      Options:
      --version              Show version number                           [boolean]
      -h, --help             Show help                                     [boolean]
      -i, --input            Input path to folder containing geoJson files.
                                                                 [string] [required]
      -s, --settings         Aditional settings file to handle the GTFS feed
                             creation.                           [string] [required]
      --fr, --forceReload    Force the reload of the geoJson files         [boolean]
      -z, --zip compression  Compress the generated files in a zip file    [boolean]
    ```
  
4. To generate a GTFS dataset you must pass at least these two flags:
    * `-i {geojsonFilesFolder}` the folder containing the geojson files.
    * `-s {aditionalSettings}` a file with aditional settings.

5. Aditionally you could pass the `-z` flag to generate a `GTFS.zip` dataset file. Else a folder called `GTFS` containing all generated files will be created. Both (folder or zip file) will be generated at the same route where the command was executed.

6. Next is an example using the geojson files of some of the infomal transport routes from La Paz city. These files can be founded in this [repository](https://github.com/antoine29/LaPazPublicTransportRoutes)

    `$ geojson2gtfs -i LaPazPublicTransportRoutes/Routes/ -s settings.json -z`

    <p align="center">
      <img src="./example.gif" alt="Size Limit CLI" width="738">
    </p>


## WP:

  * Unitests
  * Adding more GTFS fields using the `settings.json` file
  * Refactor the transformation methods using the strategy pattern or another design pattern.