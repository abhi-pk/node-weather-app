const request = require('request');

const geoCode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWJoaTE0MDUiLCJhIjoiY2tlMmo3OXN3MDlzaTJ1cGRjYWJmcTJqeCJ9.Zsby4Xs6sTiP4pem05jAaA&limit=1`;

  request({ url, json: true }, (error,{body}) => {
    if(error) {
      callback('Unable to connect to the geolocation server. Check your Internet Connection', undefined);
    } else if (body.features.length === 0) {
      callback('Please specify a valid location identifier using the query parameter to get the lat and longtiudes.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};


module.exports = geoCode;
