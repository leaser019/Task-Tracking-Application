const Dotenv = require('dotenv');
const path = require('path');

module.exports = {
 resolve: {
  fallback: {
   "path": require.resolve("path-browserify"),
   "crypto": require.resolve("crypto-browserify")
  }
 },
 plugins: [
  new Dotenv({
   path: './.env' // default is .env
  })
 ],
};