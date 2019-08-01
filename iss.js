/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const searchKey = require('./constant');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request(searchKey, function(error, response, body) {
    response.statusCode = 201;
    if (error === null && response.statusCode === 200) {
      callback(null,parseJSON(body, "ip"));
    } else if (error === null && response.statusCode !== 200) {
      const msg200 = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      //HTTP response code only occurs iff there is no error in response

      callback(Error(msg200),null);
    } else {
      callback(error,null);
    }
  });
};

const parseJSON = (requestBody, field) => JSON.parse(requestBody)[field];

module.exports = { fetchMyIP };

/*
$ curl 'https://api.ipify.org?format=json'
{"ip":"184.68.214.222"}
source: https://www.ipify.org/
*/