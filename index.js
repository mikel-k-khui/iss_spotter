// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('/iss');

fetchMyIP((ipError, ip) => {
  // console.log(`${error} and ${ip}`);
  if (ipError) {
    console.log("It didn't work!" , ipError);
    return;
  } else {
    console.log('It worked! Returned IP:' , ip);

    fetchCoordsByIP(ip, (CoordErr, latLong) => {
      // console.log(`${error} and ${ip}`);
      if (CoordErr) {
        console.log("Fetching the coordinates didn't work!" , CoordErr);
        return;
      } else {
        console.log('It worked! latitude and longitude:' , latLong);
    
        fetchCoordsByIP(latLong, (flyErr, flyOverTime) => {
        // console.log(`${error} and ${ip}`);
          if (flyErr) {
            console.log("Fetching the coordinates didn't work!" , flyErr);
            return;
          }
          console.log('It worked! latitude and longitude:' , flyOverTime); 
        });
      }
      //end of fetchISSFlyOverTimes(coordinates, function())
    });
    // end of fetchCoordsByIP(ip,function())
  }
});
//end of fetchMyIP(function())

