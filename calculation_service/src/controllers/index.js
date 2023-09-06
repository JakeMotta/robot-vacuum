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