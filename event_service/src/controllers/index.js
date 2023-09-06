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

// Creates a new job
module.exports.createJob = async (req, res) => {
  try {
    const { vacuumId, priority, instructions } = req.body;

    let obj = { vacuumId, priority, instructions }
    const jobDoc = new req.app.models("jobDoc")(obj);
    await jobDoc.save();
    return helper.sendResponse(res, messages.SUCCESS, obj, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};