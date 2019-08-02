const request = require('request-promise-native');
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
const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIP = function(body) {
  // console.log(parseJSON(body).ip);
  return request(`https://ipvigilante.com/json/${parseJSON(body).ip}`);
};

// /**
//  * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
//  * Input:
//  *   - An object with keys `latitude` and `longitude`
//  *   - A callback (to pass back an error or the array of resulting data)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly over times as an array of objects (null if error). Example:
//  *     [ { risetime: 134564234, duration: 600 }, ... ]
//  */

const fetchISSFlyOverTimes = function(body) {
  // console.log(parseJSON(body).data.latitude, parseJSON(body).data.longitude);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${parseJSON(body).data.latitude}&lon=${parseJSON(body).data.longitude}`);
};

// /**
//  * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
//  * Input:
//  *   - A callback with an error or results.
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly-over times as an array (null if error):
//  *     [ { risetime: <number>, duration: <number> }, ... ]
//  */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((flyOverTimes) => {
      console.log(pastTimesString(parseJSON(flyOverTimes).response));
    });
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

module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

// /*
// $ curl 'https://api.ipify.org?format=json'
// {"ip":"184.68.214.222"}
// source: https://www.ipify.org/
// */