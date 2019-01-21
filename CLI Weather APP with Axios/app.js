const yargs = require("yargs");
const axios = require("axios");

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&polygon=1&addressdetails=1`;

axios
  .get(geocodeURL)
  .then(response => {
    if (!response.data.length) {
      throw new Error("Unable to locate the address");
    }
    var lat = response.data[0].lat;
    var lon = response.data[0].lon;
    var weatherUrl = `https://api.darksky.net/forecast/6e1e40e7c20133c4396bd2a57731c6ca/${lat},${lon}`;
    return axios.get(weatherUrl);
  })
  .then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's ${temperature} and feels like ${apparentTemperature}.`);
  })
  .catch(error => {
    if (error.code === "ENOTFOUND") {
      console.log("Unable to connect to API servers.");
    } else {
      console.log(error.message);
    }
  });
