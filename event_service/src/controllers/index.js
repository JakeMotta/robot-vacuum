const configs = require('../configs');
const helper = require("../../../shared/utils")(configs);
const messages = require("../../../shared/messages");
const axios = require('axios');

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

    // Lookup the vacuum by id  
    const foundVacuum = helper.parseHTTPResponse(await axios.get(`http://localhost:4000/vacuum/${vacuumId}`));

    if(foundVacuum?._id) {
      let obj = { vacuumId, priority, instructions, status: configs.jobStatus.TO_DO }
      const job = new req.app.models("jobs")(obj);
      await job.save();
      return helper.sendResponse(res, messages.SUCCESS, obj, configs.serviceName);
    } else {
      return helper.sendResponse(res, messages.DATA_NOT_FOUND, null, configs.serviceName);
    }   
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};