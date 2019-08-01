// index.js
const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  // console.log(`${error} and ${ip}`);
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
