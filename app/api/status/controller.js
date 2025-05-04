const mongoose = require('mongoose');

exports.currentStatus = function (req, res) {
  if (mongoose.connection.readyState === 1) {
    res.status(200).send({ status: 'OK' });
  } else {
    res.status(503).send({ status: 'Database not connected' });
  }
}
