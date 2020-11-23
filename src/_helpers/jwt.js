const expressJwt = require('express-jwt');

function jwt() {
  const { secret } = process.env;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
  }).unless({
    path: [
      // public routes that don't require authentication
      '/user/login',
      '/user/signup',
      '/eth/test',
    ],
  });
}
module.exports = jwt;
