const configs = require('../configs');
const helper = require("../../../shared/utils")(configs);
const messages = require("../../../shared/messages");

// Basic Route Testing
module.exports.helloWorld = async (req, res) => {
  try {
    return helper.sendResponse(res, messages.SUCCESS, null, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

module.exports.test = async (req, res) => {
  try {
    const { mom } = req.body;
    const message = `Hello world from ${mom}`;
    return helper.sendResponse(res, messages.SUCCESS, message, configs.serviceName);

  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};