const request = require("request");

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&polygon=1&addressdetails=1`,
      json: true,
      headers: {
        Referer: "https://metamemelord.com",
        "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
      }
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to OpenStreetMaps servers.");
      } else if (!body.length) {
        callback("Unable to find that address.");
      } else if (response.statusCode === 200) {
        callback(undefined, {
          address: body[0].display_name,
          coordinates: {
            latitude: body[0].lat,
            longitude: body[0].lon
          }
        });
      }
    }
  );
};

var geocodeAddressPromise = address => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request(
      {
        url: `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&polygon=1&addressdetails=1`,
        json: true,
        headers: {
          Referer: "https://metamemelord.com",
          "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
        }
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect to OpenStreetMaps servers.");
        } else if (!body.length) {
          reject("Unable to find that address.");
        } else if (response.statusCode === 200) {
          resolve({
            address: body[0].display_name,
            coordinates: {
              latitude: body[0].lat,
              longitude: body[0].lon
            }
          });
        }
      }
    );
  });
};
module.exports = { geocodeAddress, geocodeAddressPromise };
