const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather_api = require("./weather_api/weather_api");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log("Address:", results.address);
//     console.log(
//       JSON.stringify({ coordinates: results.coordinates }, undefined, 4)
//     );
//     weather_api.getWeather(
//       results.coordinates.latitude,
//       results.coordinates.longitude,
//       function(errorMessage, result) {
//         if (errorMessage) {
//           console.log(errorMessage);
//         } else {
//           console.log(
//             `It's ${result.temperature} and feels like ${
//               result.apparentTemperature
//             }.`
//           );
//         }
//       }
//     );
//   }
// });

geocode
  .geocodeAddressPromise(argv.address)
  .then(results => {
    console.log("Address:", results.address);
    console.log(
      JSON.stringify({ coordinates: results.coordinates }, undefined, 4)
    );
    weather_api.getWeather(
      results.coordinates.latitude,
      results.coordinates.longitude,
      function(errorMessage, result) {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(
            `It's ${result.temperature} and feels like ${
              result.apparentTemperature
            }.`
          );
        }
      }
    );
  })
  .catch(errorMessage => {
    console.log(errorMessage);
  });
