// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  // console.log(`${error} and ${ip}`);
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    console.log('It worked! Returned IP:' , ip);
    // fetchCoordsByIP(ip, (error, data) => {
    //   // console.log(`${error} and ${ip}`);
    //   if (error) {
    //     console.log("Fetching the coordinates didn't work!" , error);
    //     return;
    //   }
    //   console.log('It worked! latitude and longitude:' , data);
    // });
    // end of fetchCoordsByIP(ip,function())
  }
});

