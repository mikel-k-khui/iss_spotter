// index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});

// fetchMyIP((ipError, ip) => {
//   // console.log(`${error} and ${ip}`);
//   if (ipError) {
//     console.log("It didn't work!" , ipError);
//     return;
//   } else {
//     console.log('It worked! Returned IP:' , ip);

//     fetchCoordsByIP(ip, (CoordErr, latLong) => {
//       // console.log(`${error} and ${ip}`);
//       if (CoordErr) {
//         console.log("Fetching the coordinates didn't work!" , CoordErr);
//         return;
//       } else {
//         console.log('It worked! latitude and longitude:' , latLong);
    
//         fetchISSFlyOverTimes(latLong, (flyErr, flyOverTime) => {
//         // console.log(`${error} and ${ip}`);
//           if (flyErr) {
//             console.log("Fetching the ISS Fly Over didn't work!" , flyErr);
//             return;
//           }
//           console.log('It worked! You can expect to see ISS fly over at:' , flyOverTime);
//         });
//       }
//       //end of fetchISSFlyOverTimes(coordinates, function())
//     });
//     // end of fetchCoordsByIP(ip,function())
//   }
// });
// //end of fetchMyIP(function())

