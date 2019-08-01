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
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  searchKey.url = 'https://api.ipify.org?format=json';
  console.log(searchKey);

  request(searchKey, function(error, response, body) {

    if (error === null && response.statusCode === 200) {
      callback(null,parseJSON(body)["ip"]);
    } else if (error === null && response.statusCode !== 200) {
      const msg200 = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      //HTTP response code only occurs iff there is no error in response

      callback(Error(msg200),null);
    } else {
      callback(error,null);
    }
  });
};

const fetchCoordsByIP = function(ipAdd, callBack) {
  // console.log(ipAdd);
  // ipAdd = '127.0.0.1'; //comment out to test the HTTP response code
  searchKey.url = 'https://ipvigilante.com/json/' + ipAdd;

  // console.log(searchKey);
  let latLong = {};

  request(searchKey, function(error, response, body) {
    console.log("Body: ", body);

    if (error === null && response.statusCode === 200) {
      latLong.latitude = parseJSON(body)["data"][ "latitude"];
      latLong.longitude = parseJSON(body)["data"]["longitude"];
      callBack(null,latLong);
    } else if (error === null && response.statusCode !== 200) {
      const msg200 = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      //HTTP response code only occurs iff there is no error in response

      callBack(Error(msg200),null);
    } else {
      callBack(error,null);
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
const fetchISSFlyOverTimes = function(coords, callback) {
  return(null, "hello");
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

/*
$ curl 'https://api.ipify.org?format=json'
{"ip":"184.68.214.222"}
source: https://www.ipify.org/
*/