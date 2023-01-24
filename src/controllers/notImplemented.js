const httpStatus = require('http-status');

const notImplemented = async (req, res) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).end();
};

module.exports = notImplemented;
