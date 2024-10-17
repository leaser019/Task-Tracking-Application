const Dotenv = require('dotenv-webpack');

module.exports = {
 plugins: [
  new Dotenv({
   path: './some.other.env' // default is .env
  })
 ]
};