const request = require('request');
const searchKey = require('./constant');

/**
 * Parse out JSON files and return it in more readable format for ouput
*/
const parseJSON = (requestBody) => JSON.parse(requestBody);

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callIpBack) {
  // use request to fetch IP address from JSON API
  searchKey.url = 'https://api.ipify.org?format=json';
  // console.log(searchKey);

  request(searchKey, function(error, response, body) {

    if (error === null && response.statusCode === 200) {
      callIpBack(null,parseJSON(body)["ip"]);
    } else if (error === null && response.statusCode !== 200) {
      const msg200 = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      //HTTP response code only occurs iff there is no error in response

      callIpBack(Error(msg200),null);
    } else {
      callIpBack(error,null);
    }
  });
};

const fetchCoordsByIP = function(ipAdd, callCoordBack) {
  // console.log(ipAdd);
  // ipAdd = '127.0.0.1'; //comment out to test the HTTP response code
  searchKey.url = `https://ipvigilante.com/json/${ipAdd}`;

  // console.log(searchKey);
  let latLong = {};

  request(searchKey, function(error, response, body) {
    // console.log("Body: ", body);

    if (error === null && response.statusCode === 200) {
      latLong.LAT = parseJSON(body)["data"][ "latitude"];
      latLong.LON = parseJSON(body)["data"]["longitude"];
      callCoordBack(null,latLong);
    } else if (error === null && response.statusCode !== 200) {
      const msg200 = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      //HTTP response code only occurs iff there is no error in response

      callCoordBack(Error(msg200),null);
    } else {
      callCoordBack(error,null);
    }
  });
};
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callISSBack) {
  // coords = {"LAT": '10000000', "LON": 'afad'}; //comment out to test the HTTP response code
  let flyOverTime = [];
  searchKey.url = `http://api.open-notify.org/iss-pass.json?lat=${coords.LAT}&lon=${coords.LON}`;

  request(searchKey, function(error, response, body) {
    // console.log("Body: ", body);

    if (error === null && response.statusCode === 200) {
      flyOverTime = parseJSON(body)["response"];
      callISSBack(null,flyOverTime);
    } else if (error === null && response.statusCode !== 200) {
      const msg200 = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      //HTTP response code only occurs iff there is no error in response

      callISSBack(Error(msg200),null);
    } else {
      callISSBack(error,null);
    }
  });

};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((ipError, ip) => {
    if (ipError) callback(ipError, null);
    
    fetchCoordsByIP(ip, (CoordErr, latLong) => {
      if (CoordErr) callback(CoordErr, null);
      
      fetchISSFlyOverTimes(latLong, (flyErr, flyOverTime) => {

        (flyErr ? callback("Fetching the ISS Fly Over didn't work!" , flyErr) : callback(null,pastTimesString(flyOverTime)));
      });
      //end of fetchISSFlyOverTimes(coordinates, function())
    });
    // end of fetchCoordsByIP(ip,function())
  });
  //end of fetchMyIP(function())
};

const pastTimesString = function(passTimes) {
  let output = "";
  for (const passTime in passTimes) {
    let timeOfDay = new Date(0);
    timeOfDay.setUTCSeconds(passTimes[passTime].risetime);
    output += (`\nNext pass at ${timeOfDay} for ${passTimes[passTime].duration} seconds!\n\r`);
  }
  return output;
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

/*
$ curl 'https://api.ipify.org?format=json'
{"ip":"184.68.214.222"}
source: https://www.ipify.org/
*/