/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, status) {
  return res.status(err.status || status || 500).json({
    message: err.message || 'Internal server error!',
    err: err || new Error(),
  });
}
module.exports = errorHandler;
