const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1f78b41db6b11f96a0b41a42fffd2546&query=${lat},${long}&units=f`;

  //In the object json converts the response JSON to parse it
   request({ url, json: true }, (error,{body}) => {   //1st argument is the inputs as object and 2nd argument is the response as a function takes 2 args err and response
     if(error) {
       callback(`Unable to connect to the weather server. Check your Internet Connection`, undefined);
     } else if(body.error) { //Incorrect input query fields you will get in response
       callback(`Please specify a valid location identifier using the query parameter.`, undefined);
     } else {
       callback(undefined, `${body.current.weather_descriptions[0]}. The actual temperature is ${body.current.temperature} and the feel like temperature is ${body.current.feelslike}`);
     }
   });
}

module.exports = forecast;
