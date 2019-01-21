const request = require("request");

module.exports.getWeather = (lat, lon, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/6e1e40e7c20133c4396bd2a57731c6ca/${lat},${lon}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to darksky.net server.");
      } else if (response.statusCode === 403) {
        callback("Invalid API Key");
      } else if (response.statusCode === 400) {
        callback("Invalid location parameters");
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }
  );
};
